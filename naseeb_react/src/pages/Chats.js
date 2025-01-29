import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Base64, SmartImageComponent } from "../components/misc";
import { GeneralModal, Loader } from "../components/profile";

const packageslist = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"]

const savedreplis = [
    "Hi [her name], I couldn’t help but notice your smile – it’s contagious! How’s your day going?",
    "Hey there, I read your profile, and I’m curious – what’s one thing that always makes you smile?",
    "Hi [her name], your energy seems really positive. What’s something you’re passionate about these days?",
    "Hey, I see we both love [shared interest]. Have you found any hidden gems related to that recently?",
    "Hi [her name], I have to ask – what’s one thing you absolutely cannot start your day without?"
]

export function loadprofile(url, setCallback, setLoadingCallback) {
    console.log(setLoadingCallback)
    axios.post(url).then((response) => {
        
        console.log("With url: ", url)
        console.log(response.data);

        if (response.data.responsecode === 200) {
            setCallback(response.data.data)
            setLoadingCallback(false)
        } else {
            alert("Something went wrong. Please contact support.")
        }
    });

}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

function MansMessage(props) {
    return (
        <div className="flex justify-start mb-4" key={props.key} onClick={() => props.onClick()}>
                {props.male
                    ? <SmartImageComponent cssclasses="object-cover h-8 w-8 rounded-full" src={"/profilepic/1?EMAIL="+props.male.fullname1} id={"Pic of:" + props.male.fullname1} backup={props.hideimage||true} onClickFunction={function() {navigate("/profile/"+Base64.encode(props.male.fullname1))}}/>
                    : null
                }
                <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white text-base normal-case">
                    {props.text}
                </div>

                {/* <div className="text-gray-200 text-xs">{props.delivered ? <>Delivered</> : <>Sending</>}</div> */}
        </div>
    )
}

function WomansMessage(props) {
    const navigate = useNavigate()
    return (
        <div className="flex justify-end mb-4" key={props.key} onClick={()=>props.onClick()}>
                {props.male
                    ? <SmartImageComponent cssclasses="object-cover h-8 w-8 rounded-full" src={"/profilepic/1?EMAIL="+props.womandata.EMAIL} id={"Pic of:" + props.womandata.EMAIL} backup={props.hideimage||true} onClickFunction={function() {navigate("/profile/"+Base64.encode(props.womandata.EMAIL))}}/>
                    : null
                }
                <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white text-base normal-case">
                    <p>{props.text}</p>
                    <p className="text-gray-300 text-xs">{props.delivered ? <>Delivered</> : <>Sending</>}</p>
                </div>
        </div>
    )
}

export default function AllChats() {
    const [chatdata, setChatData] = React.useState([])
    const [activatedprofiles, setActivatedProfiles] = React.useState([])

    const [loading, setLoading] = React.useState(true)

    function loadchats() {
        const url = `/sirri_api/chats/responder/<package>/1`;
        
        axios.get(url).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                console.log("Here are all the chats: ", response.data.chats_data)
                setChatData(response.data.chats_data)
            } else {
                alert("Something went wrong. Please contact support.")
            }
        });
        axios.post("/sirri_api/get_women").then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                setActivatedProfiles(response.data.acc)
                setLoading(false)
            } 
        });
    }

    React.useEffect(loadchats, []);

        return (
            <div class="flex flex-col items-center justify-center">
                <p class="text-white text-2xl mb-3 text-center">Active Chats</p>
                {loading ? <Loader/>
                    :   <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
                            {Object.keys(chatdata).map((item, index) => (
                                <div class="bg-black text-white w-full flex flex-col rounded-lg p-3 my-2" key={index}>
                                    <div class="flex flex-col justify-center items-center">
                                        <SmartImageComponent id="Profile picture" cssclasses="w-8 h-8 rounded-full" src={"/profilepic/1?EMAIL="+chatdata[item].email}/>
                                        <p>{item}</p>
                                        <p>Chats: {chatdata[item].all_num_msg}</p>
                                        <p>Last Message: {timeConverter(chatdata[item].time)}</p>

                                        <a class="bg-white text-black w-full flex flex-col rounded-sm p-3" href={"/sirri_api/chat/"+chatdata[item].email}>
                                            See Messages
                                        </a>

                                        <a class="bg-white text-black w-full flex flex-col rounded-sm p-3 mt-3" href={"/sirri_api/chatasman/"+chatdata[item].email}>
                                            Message As Man
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                }

                <p class="text-white text-2xl mb-3 text-center">Other profiles</p>
                {loading ? <Loader/>
                    :   <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
                            {activatedprofiles.map((item, index) => (
                                <div class="bg-black text-white w-full flex flex-col rounded-lg p-3 my-2" key={index}>
                                    <div class="flex flex-col justify-center items-center">
                                        <SmartImageComponent id="Profile picture" cssclasses="w-8 h-8 rounded-full" src={"/profilepic/1?EMAIL="+item.EMAIL}/>
                                        <p>{item.fullname1}</p>
                                        <p>{item.EMAIL}</p>

                                        <a class="bg-white text-black w-full flex flex-col rounded-sm p-3 mt-3" href={"/sirri_api/chatasman/"+item.EMAIL}>
                                            Message As Man
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                }
            </div>
        )
}

export function ChatInterface({womandata, male, chatdata, gender}) {
    const [specificchatdata, setSpecificChatdata] = React.useState({messages:[]}) 
    const [loading, setLoading] = React.useState(true)
    const [message, setMessage] = React.useState("")
    
    const thegender = gender || "Female";

    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);

    console.log("Woman data", womandata)

    function loadchat() {
        console.log("All the chat data ever:", chatdata)
        console.log("The dude: ", male)

        // CHecking if its a list.
        const url = "/api/getaveryspecificchat"
        const formData = new FormData();
        
        formData.append('id', womandata.__id)
        formData.append('name', male.fullname1)
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        
        axios.post(url, formData, config).then((response) => {
            console.log("Response getting chats:", response.data);
            if (response.data.responsecode === 200) {
                setSpecificChatdata(response.data.chats_data)
                setLoading(false)
            } else if (response.data.responsecode === 302) {
                setSpecificChatdata({messages:[]})
                setLoading(false)  
            } else {
                alert("You have reached the limit of bachelor contacts your package allows.")
            }
        });
    }

    function onSend () {
        const url = 'https://expatelitesingles.com/send_message';
        const formData = new FormData();
        
        formData.append('message', message);
        formData.append('name', male.fullname1);
        formData.append('woman', JSON.stringify(womandata))

        if (womandata.__id) {
            formData.append('ip', womandata.__id);
        } else {
            formData.append('ip', params.get('id'));
        }

        if (thegender==="Male") {
            formData.append('womanname', 'test')
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        console.log("The formdata before submitting: ", formData)
        var holdthis = specificchatdata
        setSpecificChatdata(holdthis)
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            
            if (response.data.responsecode === 200) {
                if (thegender==="Female") {
                    holdthis.messages.push({"Girl Sent":{"message":message, 'delivered':true}})
                } else {
                    holdthis.messages.push({"Guy Sent":{"message":message, 'delivered': true}})
                }
                
                setSpecificChatdata(holdthis)
                setMessage("")
            } else if (response.data.responsecode == 602){
                alert("To contact this bachelor, you would need to be on a package similar to or higher than his. Contact WhatsApp support to guide you on the matter of upgrading your account.")
                setMessage("")
                setLoading(false)
            }
        });
    }

    React.useEffect(loadchat, []);

    return (
        <div className="container mx-auto shadow-lg rounded-sm">
            <div className="flex flex-row justify-between bg-white">
                <div className="w-full px-5 flex flex-col justify-between">
                    <div className="flex flex-col mt-5">
                        {loading ? <Loader/>
                            : <>
                                {specificchatdata.messages.map(function(item, index) {
                                    if (item["Guy Sent"]) {
                                        return <MansMessage text={item["Guy Sent"].message} male={male} key={index} lastmessage={index === specificchatdata.messages.length-1} delivered={item["Guy Sent"].delivered || true}/>
                                    } else {
                                        return <WomansMessage text={item["Girl Sent"].message} womandata={womandata} key={index} lastmessage={index === specificchatdata.messages.length-1} delivered={item["Girl Sent"].delivered || true}/>
                                    }
                                })}
                            </>
                        }
                    </div>

                    <div className="py-3">
                        <input
                            className="w-full bg-gray-300 py-2 px-1 rounded-xl"
                            type="text"
                            placeholder="type your message here..."
                            defaultValue={message}
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <button class="w-full bg-primary-600 p-3" onClick={() => onSend()}>Send Message</button>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export function ChatInterfaceMan({womandata, male, chatdata, gender}) {
    const [specificchatdata, setSpecificChatdata] = React.useState({messages:[]})
    const [loading, setLoading] = React.useState(true)
    const [showsavedreplies, setSavedReplies] = React.useState(false)
    const [message, setMessage] = React.useState("")

    const [generatedresponses, setGeneratedResponses] = React.useState([])
    const [showgeneratedresponses, setShowGeneratedResponses] = React.useState(false)
    const [generatedresponsesloading, setGeneratedResponsesLoading] = React.useState(false)
    
    const thegender = gender || "Female";

    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);

    console.log("Woman data", womandata)

    function loadchat() {
        console.log("All the chat data ever:", chatdata)
        console.log("The dude: ", male)

        // CHecking if its a list.
        const url = "/api/getaveryspecificchat"
        const formData = new FormData();
        
        formData.append('id', womandata.__id)
        formData.append('name', male.fullname1)
        formData.append('woman', JSON.stringify(womandata))

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        
        axios.post(url, formData, config).then((response) => {
            console.log("Response getting chats:", response.data);
            if (response.data.responsecode === 200) {
                setSpecificChatdata(response.data.chats_data)
                setLoading(false)
            } else if (response.data.responsecode === 302) {
                setSpecificChatdata({messages:[]})
                setLoading(false)  
            } else {
                alert("You have reached the limit of bachelor contacts your package allows.")
            }
        });
    }

    function generatesomeresponses() {
        setGeneratedResponsesLoading(true)
        

        // CHecking if its a list.
        const url = "/sirri_api/generate_suggestions"
        const formData = new FormData();
        
        formData.append('__id', womandata.__id)
        formData.append('male', male.fullname1)

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        
        axios.post(url, formData, config).then((response) => {
            console.log("Response getting chats:", response.data);
            if (response.data.responsecode === 200) {
                setGeneratedResponses(response.data.generatedresponses)
                setGeneratedResponsesLoading(false)
                setShowGeneratedResponses(true)
            } else {
                alert("Something has gone wrong with the ai integration. Contact Support.")
            }
        });
    }

    function onSend () {
        const url = 'https://expatelitesingles.com/send_message_';
        const formData = new FormData();
        
        formData.append('message', message);
        formData.append('name', male.fullname1);
        
        if (womandata.__id) {
            formData.append('ip', womandata.__id);
        } else {
            formData.append('ip', params.get('id'));
        }

        if (thegender==="Male") {
            formData.append('womanname', 'test')
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        console.log("The formdata before submitting: ", formData)
        
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                console.log('HU!!')
                var holdthis = specificchatdata
                console.log(holdthis)
                
                if (thegender==="Female") {
                    holdthis.messages.push({"Girl Sent":{"message":message}})
                } else {
                    holdthis.messages.push({"Guy Sent":{"message":message}})
                }
                
                setSpecificChatdata(specificchatdata)
                setMessage("")
            } else if (response.data.responsecode === 602) {
                alert("You cannot message this man on your current package.")
            } else if (response.data.responsecode === 403) {
                alert("You have reached the limit of bachelor contacts your package allows.")
            }
        });
    }

    React.useEffect(loadchat, []);

    return (
        <div className="container mx-auto shadow-lg rounded-lg">
            <div className="flex flex-row justify-between bg-white">

            <div className="w-full px-2 flex flex-col justify-between">
                <div className="flex flex-col mt-5">
                    {loading ? <Loader/>
                        : <>
                            {specificchatdata.messages.map(function(item, index) {
                                if (item["Guy Sent"]) {
                                    return <MansMessage text={item["Guy Sent"].message} male={male} key={index}/>
                                } else {
                                    return <WomansMessage text={item["Girl Sent"].message} womandata={womandata} key={index}/>
                                }
                            })}
                          </>
                    }
                    <div>
                        <button class="w-full bg-black rounded-lg p-2 flex flex-col items-center justify-center" onClick={() => generatesomeresponses()}>
                            {generatedresponsesloading
                                ? <Loader/>
                                : <p class="text-white">Generate AI responses</p>
                            }
                        </button>
                        {showgeneratedresponses
                            ? <>
                                {generatedresponses.length === 0
                                    ? <p class="text-white">No generated responses</p>
                                    : <>
                                        <p class="text-white">Click a response to use as a message</p>
                                        {generatedresponses.map(function(item, index) {
                                            return (
                                                <MansMessage text={item} key={index} onClick={(function () {setMessage(item)})} hideimage={false} male={{fullname1:"nothing"}}/>
                                            )
                                        })}
                                      </>
                                }
                              </>
                            : null
                        }
                    </div>
                </div>

                <div className="py-3">
                    <input
                        className="w-full bg-gray-300 py-2 px-1 rounded-xl"
                        type="text"
                        placeholder="type your message here..."
                        defaultValue={message}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <button class="w-full bg-primary-600 p-2" onClick={() => onSend()}>Send Message</button>
                </div>
            </div>
            </div>
        </div>  
    )
}

export function SpecificPersonsChat() {
    const { email } = useParams();

    const [chatdata, setChatData] = React.useState([])
    const [selectedchat, setSelectedChat] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const [maledata, maleData] = React.useState([])
    const [maleloading, setmaleLoading] = React.useState(false)

    const [femaledata, femaleData] = React.useState([])
    const [femaleloading, setfemaleLoading] = React.useState(false)

    const [individualchatvisible, setIndividualchatvisible] = React.useState(false)

    function loadprofile(url, setCallback, setLoadingCallback) {
        console.log(setLoadingCallback)
        axios.post(url).then((response) => {
            
            console.log("With url: ", url)
            console.log(response.data);

            if (response.data.responsecode === 200) {
                setCallback(response.data.data)
                setLoadingCallback(false)
            } else {
                alert("Something went wrong. Please contact support.")
            }
        });
    
    }

    function messagePerson(item) {
        setmaleLoading(true)
        setfemaleLoading(true) 
        console.log('The mans name: ', item.male)
        const womenmenurl = `/api/getprofile/${Base64.encode(email)}`;
        const menurl = `/api/getprofile/${Base64.encode(item.male)}`;
        
        loadprofile(menurl, maleData, setmaleLoading)
        loadprofile(womenmenurl, femaleData, setfemaleLoading)
        
        setIndividualchatvisible(true)
        setSelectedChat(item)
    }

    function loadchats() {
        const url = `/chats/responder/${email}`;
        
        axios.get(url).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                console.log("Here are all the chats: ", response.data.chats_data)
                setChatData(response.data.chats_data)
                setLoading(false)
            } else {
                alert("Something went wrong. Please contact support.")
            }
        });
    }

    React.useEffect(loadchats, []);

        return (
            <>
            {maleloading === false && femaleloading === false
                ? <GeneralModal 
                    showModal={individualchatvisible} maintitle={maledata.fullname1}
                    notdisableproceed={false} canceltext="Back"
                    setShowModal={setIndividualchatvisible}
                  >
                  <ChatInterfaceMan
                        womandata={femaledata}
                        male={maledata}
                        chatdata={selectedchat}
                        gender={"Male"}
                    />
                  </GeneralModal>
                : null
            }

            <div class="flex flex-col w-full">
                <a class="bg-black text-white p-3 w-full flex flex-col rounded-lg" href="/sirri_api/chats">
                    <div class="flex flex-col justify-center items-center">
                        <p>BACK TO ALL CHATS</p>
                    </div>
                </a>

                <a class="bg-white text-black p-3 w-full flex flex-col rounded-lg my-2" href={"/profile/"+Base64.encode(email)}>
                    <div class="flex flex-col justify-center items-center">
                        <p>VISIT PROFILE</p>
                    </div>
                </a>
                
                <div class="my-3 flex flex-col bg-black p-3 justify-center items-center">
                    <SmartImageComponent id="Profile picture" cssclasses="w-32 h-32 rounded-full" src={"/profilepic/1?EMAIL="+email}/>
                    <p class="text-white text-xl">Chat Viewer for {loading ? null : Object.keys(chatdata).map((item) => <>{item}</>)}</p>
                </div>
                
                {loading 
                    ? <Loader />
                    :   <div class="grid grid-cols-2 md:grid-cols-3 gap-1">
                            {Object.keys(chatdata).map((item) => (
                                <>
                                    {chatdata[item].map((chatitem) => (
                                        <button class="bg-black text-white w-full flex flex-col rounded-lg p-4" onClick={() => messagePerson(chatitem)}>
                                            <div class="flex flex-col justify-center items-center">
                                                <SmartImageComponent id="Profile picture" cssclasses="w-8 h-8 rounded-full" src={chatitem.guys_pic}/>
                                                <p>{chatitem.female} - {chatitem.male}</p>
                                                <p>Messages: {chatitem.all_num_msg}</p>
                                            </div>
                                        </button>
                                    ))}
                                </>
                            ))}
                        </div>
                }
            </div>
            </>
        )
}

export function SpecificPersonsChatAsMan() {
    const { email } = useParams();
    const womenmenurl = `/api/getprofile/${Base64.encode(email)}`;

    const [menprofiles, setMenProfile] = React.useState([])
    const [selectedchat, setSelectedChat] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const [maledata, maleData] = React.useState([])
    const [maleloading, setmaleLoading] = React.useState(false)

    const [femaledata, femaleData] = React.useState([])
    const [femaleloading, setfemaleLoading] = React.useState(false)

    const [individualchatvisible, setIndividualchatvisible] = React.useState(false)

    function checkpackage(thepackage) {
        if (thepackage === "Bronze") {
            return ["Bronze", "Silver", "Gold", "Platinum", "Diamond"]
        } else if (thepackage === "Silver") {
            return ["Silver", "Gold", "Platinum", "Diamond"]
        } else if (thepackage === "Gold") {
            return ["Gold", "Platinum", "Diamond"]
        } else if (thepackage === "Platinum") {
            return ["Platinum", "Diamond"]
        } else if (thepackage === "Diamond") {
            return ["Diamond"]
        } else {
            return ["Bronze", "Silver", "Gold", "Platinum", "Diamond"]
        }
    }

    function messagePerson(item) {
        setmaleLoading(true)
        setfemaleLoading(true) 

        const menurl = `/api/getprofile/${Base64.encode(item.fullname1)}`;
        
        loadprofile(menurl, maleData, setmaleLoading)
        loadprofile(womenmenurl, femaleData, setfemaleLoading)
        
        setIndividualchatvisible(true)
        setSelectedChat([])
    }

    function loadchats() {
        const url = `/api/get_men`;
        
        loadprofile(womenmenurl, femaleData, setfemaleLoading)
        
        axios.get(url).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                setMenProfile(response.data.acc)
                setLoading(false)
            } else {
                alert("Something went wrong. Please contact support.")
            }
        });
    }

    React.useEffect(loadchats, []);

        return (
            <>
            {maleloading === false && femaleloading === false
                ? <GeneralModal 
                    showModal={individualchatvisible} maintitle={maledata.fullname1}
                    notdisableproceed={false} canceltext="Back"
                    setShowModal={setIndividualchatvisible}
                  >
                  <ChatInterfaceMan
                        womandata={femaledata}
                        male={maledata}
                        chatdata={selectedchat}
                        gender={"Male"}
                    />
                  </GeneralModal>
                : null
            }

            <div class="flex flex-col">
                <div class='grid grid-cols-2'>
                <a class="bg-black text-white text-sm p-3 w-full flex flex-col rounded-lg" href="/sirri_api/chats">
                    <div class="flex flex-col justify-center items-center">
                        <p>BACK TO ALL CHATS</p>
                    </div>
                </a>

                <a class="bg-black text-white p-3 text-sm w-full flex flex-col rounded-lg" href={"/profile/"+Base64.encode(email)}>
                    <div class="flex flex-col justify-center items-center">
                        <p>VISIT WOMANS PROFILE</p>
                    </div>
                </a>
                </div>
                
                <div class="my-3 flex flex-col bg-black p-3 justify-center items-center">
                    <SmartImageComponent id="Profile picture" cssclasses="h-16 w-auto" src={"/profilepic/1?EMAIL="+email}/>
                    <p class="flex flex-col items-center justify-center">
                        {femaleloading
                            ? <p class="text-white text-sm">{"Texting as a man"}</p>
                            : <>
                                <p class="text-white text-sm">{"Texting "+femaledata.fullname1 +" as a man"}</p>
                                <p class="text-white text-sm">{"Package: "+femaledata.package1}</p>
                                <p class="text-white text-sm">Age preference: {femaledata.minage1} - {femaledata.maxage1}</p>
                              </>
                        }
                    </p>
                </div>
                
                <p class="text-white text-xl">Direct Matches</p>
                {loading 
                    ? <Loader />
                    :   <div class="grid grid-cols-3 md:grid-cols-4 gap-1">
                            {menprofiles.map(function (item) {
                                if ((Number(item.age1) <= Number(femaledata.maxage1)) && (Number(item.age1) >= Number(femaledata.minage1))) {
                                    const packages = checkpackage(femaledata.package1)
                                    console.log("Available packages:", packages)
                                    console.log(femaledata.fullname1+" package: " +femaledata.package1 + ". The guy: "+item.package1)
                                    if (packages.includes(item.package1)) {
                                        return (
                                            <div class="bg-black text-white w-full flex flex-col rounded-lg p-4 my-2">
                                                <div class="flex flex-col justify-center items-center">
                                                    <SmartImageComponent id="Profile picture" cssclasses="w-8 h-8 rounded-full" src={"/profilepic/1?EMAIL="+item.fullname1}/>
                                                    
                                                    <p>{item.fullname1}</p>
                                                    <p>Package: {item.package1}</p>
                                                    <p>Age: {item.age1}</p>
                                                    
                                                    <a class="bg-black text-white p-2 w-full flex flex-col justify-center items-center border border-white border-1 rounded-lg my-2" href={"/profile/"+Base64.encode(item.fullname1)}>
                                                        <p>VISIT MANS PROFILE</p>
                                                    </a>
        
                                                    <button class="bg-black text-white w-full flex flex-col justify-center items-center border border-white border-1 rounded-lg p-4 my-2" onClick={() => messagePerson(item)}>
                                                        Message
                                                    </button>

                                                    <button class="bg-black text-white w-full flex flex-col justify-center items-center border border-white border-1 rounded-lg p-4 my-2" onClick={() => messagePerson(item)}>
                                                                Edit (doesnt work yet)
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                            })}
                        </div>
                        }

                        <p class="text-white text-xl">Non Direct Matches</p>
                        {loading 
                            ? <Loader />
                            :   <div class="grid grid-cols-3 md:grid-cols-4 gap-1">
                                    {menprofiles.map(function (item) {
                                        if ((Number(item.age1) >= Number(femaledata.maxage1)) || (Number(item.age1) <= Number(femaledata.minage1))) {
                                            const packages = checkpackage(femaledata.package1)
                                            console.log("Available packages:", packages)
                                            console.log(femaledata.fullname1+" package: " +femaledata.package1 + ". The guy: "+item.package1)
                                            if (packages.includes(item.package1)) {
                                                return (
                                                    <div class="bg-black text-white w-full flex flex-col rounded-lg p-4 my-2">
                                                        <div class="flex flex-col justify-center items-center">
                                                            <SmartImageComponent id="Profile picture" cssclasses="w-8 h-8 rounded-full" src={"/profilepic/1?EMAIL="+item.fullname1}/>
                                                            
                                                            <p>{item.fullname1}</p>
                                                            <p>Package: {item.package1}</p>
                                                            <p>Age: {item.age1}</p>
                                                            
                                                            <a class="bg-black text-white p-3 w-full flex flex-col justify-center items-center border border-white border-1 rounded-lg my-2" href={"/profile/"+Base64.encode(item.fullname1)}>
                                                                <p>VISIT MANS PROFILE</p>
                                                            </a>

                                                            <button class="bg-black text-white w-full flex flex-col justify-center items-center border border-white border-1 rounded-lg p-4 my-2" onClick={() => messagePerson(item)}>
                                                                Message
                                                            </button>

                                                            <button class="bg-black text-white w-full flex flex-col justify-center items-center border border-white border-1 rounded-lg p-4 my-2" onClick={() => messagePerson(item)}>
                                                                Edit (doesnt work yet)
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }
                                    })}
                                </div>
                                }
            </div>
            </>
        )
}