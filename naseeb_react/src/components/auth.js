import React from 'react';
import axios from 'axios';

const text="Hello Expat Elite Singles. Kindly issue me with the Authorization Code to complete my sign up.".split(' ').join('%20')
const whatsapp = "https://api.whatsapp.com/send/?phone=19088971181&text="+text+"+&type=phone_number";

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export default function AuthEntrypage() {
    const [authcode, setAuthcode] = React.useState("")
    
    function handleSubmit(event) {
        event.preventDefault()
        const url = 'https://expatelitesingles.com/checkauth';
        const formData = new FormData();
        formData.append('authcode', authcode);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        console.log(formData)
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                alert("Authorization Confirmed.")
                window.location.replace('/html/signup_form.html')
            } else {
                alert("You have no authorization. Please contact support for assistance.")
            }
        });

    }
    return (
        <div>
            <button class="mt-32 md:mt-0 col-12 w-full py-2 px-20 bg-primary-500 border border-white text-white text-center text-xl font-bold">
                ENTER YOUR AUTHORIZATION CODE
            </button>

            <form onSubmit={handleSubmit} class="flex flex-col my-2">
                <input type="text" class="bg-white text-black placeholder-gray-600 p-2 my-1 rounded-full" placeholder='Auth Code:' onChange={(e) => setAuthcode(e.target.value)}/>
                <button type="submit" class="w-full text-black bg-white p-2 rounded-full my-1">Check</button>
            </form>

            <p class="text-white text-center text-sm md:text-xl font-bold">
                Please click the WhatsApp button below to receive your authorization code, which you will use to complete the sign-up process.
            </p>

            <a class="w-full py-2 mx-1 my-3 rounded-md px-4 bg-gradient-to-r from-teal-400 to-gray-800 text-white text-xs text-center md:text-xl font-bold flex flex-col items-center justify-center" href={whatsapp}>
                    <i class="fa-brands fa-whatsapp"></i>
                    <p class="mt-1">whatsapp</p>
            </a>
        </div>
    )
}

export function AuthAdd() {
    const [authcode, setAuthcode] = React.useState(makeid(10))
    const [loading, setLoading] = React.useState(false)
    const [authcodes, setAuthcodes] = React.useState([])
    
    function loadAuthcodes() {
        setLoading(true)
        axios.post("/sirri_api/getauthcodes").then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                setAuthcodes(response.data.authcodes)
                setLoading(false)
            } 
        });
    }

    React.useEffect(loadAuthcodes, [])

    function geturl(type) {
        if (!type) {
            return 'https://expatelitesingles.com/sirri_api/addauth'
        } else {
            return 'https://expatelitesingles.com/sirri_api/deleteauth'
        }
    }

    function handleSubmit(event, type) {
        event.preventDefault()
        const url = geturl(type);
        const formData = new FormData();
        formData.append('authcode', authcode);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        console.log(formData)
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                alert("Authorization code added.")
                loadAuthcodes()
                setAuthcode(makeid(10))
            } else {
                alert("Something went wrong.")
            }
        });
    }

    return (
        <div>
            {loading
                ?   <p class="text-white text-base uppercase">loading</p>
                :  <div class="flex flex-col">
                    {authcodes.map((item) => (
                        <p class="mt-1 text-white bg-gray-700 text-base">{item}</p>
                    ))}
                   </div>
            }

            <form onSubmit={handleSubmit} class="flex flex-col">
                <p class="text-white text-base uppercase">{authcode}</p>
                <input type="text" class="bg-black placeholder-gray-600 text-white p-3" placeholder='Auth Code:' defaultValue={authcode} onChange={(e) => setAuthcode(e.target.value)}/>
                <button type="submit" class="text-black bg-white p-2 m-2">Add</button>
                <button onClick={() => handleSubmit(event, "DELETE")} class="text-white bg-red-500 p-2 m-2">Delete</button>
            </form>
        </div>
    )
}