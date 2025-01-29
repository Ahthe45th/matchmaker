import React from 'react';
import axios from 'axios';

import { makeid } from './misc';

export default function FormComponent() {
    const [file, setFile] = React.useState()
    const [thename, setTheName] = React.useState("")
    
    function handleChange(event) {
        setFile(event.target.files[0])
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        const url = 'https://expatelitesingles.com/sirri_api/uploadFile';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('name', thename);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        console.log(formData)
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            alert("Saved successfully")
        });

    }
    return (
        <div class="mb-3">
            <form onSubmit={handleSubmit} class="flex flex-col">
                <p class="text-base text-white">This form is specifically for uploading images. When you want to edit a profile, click on one of the images and you'll be given the option to delete the image or edit the profile to make it a proper file.</p>

                <label class="block mb-2 text-sm font-medium text-gray-100" for="file_input">Upload file</label>
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none mb-3" id="file_input" type="file" onChange={handleChange}/>

                <input type="text" class="bg-white placeholder-gray-600 text-black p-3 rounded-full" placeholder='The Name:' onChange={(e) => setTheName(e.target.value)}/>
                <button type="submit" class="text-black bg-white p-2 m-2 rounded-full">Upload</button>
            </form>
        </div>
    )
}

export function ImageFormComponent(props) {
    const [successfulupload, setSuccessfulUpload] = React.useState(false)
    const [errorpresent, setErrorPresent] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    function handleChange(event) {
        event.preventDefault()
        setLoading(true)
        
        const url = 'https://expatelitesingles.com/sirri_api/uploadFile';
        const formData = new FormData();
        
        formData.append('file', event.target.files[0]);
        formData.append('fileName', `${makeid(10)}.png`);
        
        if (props.gender === "Male") {
            formData.append('name', props.fullname1);
        } else {
            formData.append('name', props.EMAIL);
        }
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        console.log(formData)

        axios.post(url, formData, config).then((response) => {
            setSuccessfulUpload(false)
            setErrorPresent(false)
            console.log(response.data);

            if (response.data.responsecode !== 500) {
                setSuccessfulUpload(true)
                setLoading(false)
                setTimeout(() => {
                    props.nextstep()
                }, 1000);
            } else {
                setErrorPresent(true)
                setLoading(false)
            }
        });

    }
    return (
        <div class="mb-3">
                {successfulupload
                    ? <p class="bg-green-500 text-base">Uploaded successfully</p>
                    : null
                }
                {errorpresent
                    ? <p class="bg-green-500 text-base">Upload failed. Contact support.</p>
                    : null
                }
                {loading
                    ? <p class="bg-yellow-500 text-base">Uploading, please wait</p>
                    : null
                }
                <label class="block mb-2 text-sm font-medium text-gray-100" for="file_input">Upload file</label>
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none mb-3" id={"file_input"+props.id} type="file" onChange={handleChange}/>
        </div>
    )
}