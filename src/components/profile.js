import React from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { useParams, useSearchParams } from 'react-router-dom';
import { ChatInterface, loadprofile } from '../pages/Chats';
import { Base64, countryList, femaleeditquestions, getMultiples, SmartImageComponent, timestamptodate, turntoacronym } from './misc';
import Signup from './signup';
import { ImageFormComponent } from './menimagesform';

export default function Profile(props) {
    const { profileid } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    console.log("Loading ", btoa(profileid))

    const [profiledata, setProfileData] = React.useState({})
    const [womandata, setWomanData] = React.useState({nothing:"nothing"})

    const [loading, setLoading] = React.useState(true)

    const [individualchatvisible, setIndividualchatvisible] = React.useState(false)
    const [individualchattitle, setIndividualChatTitle] = React.useState({})

    const [showeditprofilemodal, setEditProfileModal] = React.useState(false)
    const [showeditimages, setEditimages] = React.useState(false)

    function load() {
        const url = `/api/getprofile/${profileid}`;
        const email = searchParams.get('EMAIL')

        axios.post(url).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                setProfileData(response.data.data)
                if (!email) {
                    setLoading(false)
                }
            } else {
                alert("Something went wrong. Please contact support.")
            }
        });

        if (email) {
            const womanurl = `/api/getprofile/${email}`;
            console.log("Load url:", womanurl)
            loadprofile(womanurl, setWomanData, setLoading)
        }

    }

    function deleteimages() {
        const url = "/deletepics?EMAIL="+profiledata.EMAIL;
        
        axios.post(url).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                alert("Images deleted sucessfully. You can now upload new ones.")
                setEditimages(false)
            } else {
                alert("Something went wrong. Please contact support.")
            }
        });

    }

    function messageManFunction() {
        setIndividualChatTitle(profiledata)
        setIndividualchatvisible(true)
    }

    function editManFunction() {
        setEditProfileModal(true)
    }

    function checkgendermale() {
        if (profiledata.gender1) {
            if (profiledata.gender1 === "Male") {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }

    React.useEffect(load, []);

    if (loading) {
        return (
            <div class="max-w-2xl mx-4 sm:max-w-sm md:max-w-xl lg:max-w-xl xl:max-w-xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-gray-900 shadow-xl rounded-lg text-gray-900 flex flex-col justify-center items-center">
            <div class="rounded-t-lg w-1/2 h-auto overflow-hidden">
                <SmartImageComponent cssclasses="object-cover object-top w-full rounded-full m-1" src={"https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"} id="Woman looking front" backup={true}/>
            </div>

            <div class="text-center mt-2">
                <p class="text-gray-500 mb-1 flex flex-col items-center justify-center"><Loader/></p>
                <p class="text-gray-500 mb-1 flex flex-col items-center justify-center"><Loader/></p>
                <p class="text-gray-500 mb-1 flex flex-col items-center justify-center"><Loader/></p>
                <p class="text-gray-500 mb-1">RELIGION: LOADING</p>
                <p class="text-gray-500 mb-1">OCCUPATION: LOADING</p>
                <p class="text-gray-500 mb-1">PACKAGE: LOADING</p>
            </div>
            <ul class="py-4 mt-2 text-gray-700 flex grid grid-cols-3 gap-3">
                <li class="flex flex-col items-center justify-around">
                        <svg class="w-4 fill-current text-white" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"/></svg>
                        <div class="text-white">Loading</div>
                      </li>
                <li class="flex flex-col items-center justify-between">
                        <svg class="w-4 fill-current text-white" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 1H1V15H3V11H5V15H15V9H11V1ZM5 3H3V5H5V3ZM9 3H7V5H9V3ZM7 7H9V9H7V7ZM11 11H13V13H11V11Z" />
                        </svg>
                        <div class="text-white flex flex-col items-center justify-center">
                            <Loader/>
                        </div>
                    </li>

                    <li class="flex flex-col items-center justify-around">
                        <svg class="w-4 fill-current text-white" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                            viewBox="0 0 512 512"  xmlSpace="preserve">
                        <g>
                            <path class="st0" d="M454.111,193.473c-3.617,3.21-7.4,6.252-11.391,9.095c-9.236,6.546-14.26,10.143-17.404,12.866
                                c9.216,20.58,14.875,43.094,15.996,66.857h-66.418h-17.61h-92.449V170.384h-17.671h-70.307c2.769-6.606,5.732-12.886,8.915-18.731
                                c9.522-17.564,20.753-31.484,32.724-40.786c0.901-0.7,1.802-1.321,2.703-1.975c5.479-1.028,11.064-1.749,16.696-2.296
                                c-0.327-3.737-0.554-7.487-0.554-11.257c0-8.348,0.814-16.503,2.322-24.417c-54.439,3.977-103.533,27.693-139.848,64.022
                                c-39.939,39.919-64.702,95.252-64.689,156.184c-0.014,60.932,24.75,116.265,64.689,156.184
                                c39.912,39.939,95.245,64.703,156.184,64.689c60.939,0.014,116.266-24.75,156.184-64.689
                                c39.938-39.918,64.695-95.251,64.689-156.184C476.879,256.1,468.658,222.935,454.111,193.473z M124.813,159.941
                                c17.27-17.264,37.903-31.09,60.812-40.492c-10.918,14.133-20.213,31.404-27.76,50.936h-42.661
                                C118.287,166.794,121.463,163.284,124.813,159.941z M101.731,188.054h49.955c-8.708,28.134-13.86,60.165-14.634,94.238H70.688
                                C72.322,247.478,83.52,215.248,101.731,188.054z M94.504,382.422c-13.92-24.55-22.408-52.538-23.816-82.46h66.424
                                c0.674,29.435,4.624,57.275,11.317,82.46H94.504z M124.813,422.314c-6.886-6.887-13.2-14.334-18.938-22.221h47.833
                                c4.691,14.053,10.17,27.193,16.529,38.931c4.711,8.675,9.876,16.616,15.422,23.803
                                C162.737,453.424,142.097,439.584,124.813,422.314z M247.164,476.433c-8.835-0.414-17.496-1.475-25.958-3.07
                                c-0.908-0.654-1.808-1.274-2.71-1.968c-17.971-13.948-34.206-38.357-45.664-69.701c-0.186-0.52-0.353-1.081-0.547-1.602h74.879
                                V476.433z M247.164,382.422H166.68c-7-24.758-11.251-52.725-11.965-82.46h92.449V382.422z M247.164,282.292h-92.509
                                c0.814-34.54,6.453-66.744,15.568-94.238h76.94V282.292z M264.835,299.963h92.509c-0.701,29.729-4.985,57.702-11.985,82.46h-80.524
                                V299.963z M293.503,471.395c-0.894,0.694-1.802,1.314-2.71,1.968c-8.462,1.595-17.123,2.656-25.958,3.07v-76.34h74.898
                                c-3.964,11.044-8.488,21.28-13.506,30.509C316.705,448.165,305.474,462.079,293.503,471.395z M387.193,422.314
                                c-17.283,17.264-37.91,31.097-60.825,40.506c11.691-15.135,21.574-33.792,29.388-55.04c0.921-2.496,1.749-5.112,2.603-7.688h47.766
                                C400.385,407.98,394.073,415.427,387.193,422.314z M417.495,382.422H363.69c6.673-25.165,10.584-53.051,11.257-82.46h66.365
                                C439.904,329.885,431.409,357.872,417.495,382.422z"/>
                            <path class="st0" d="M313.762,173.741c22.468,15.949,27.434,19.746,35.341,34.833c6.253,11.945,16.39,32.885,16.39,32.885
                                c0.48,0.954,1.448,1.562,2.522,1.562c1.061,0,2.049-0.608,2.522-1.562c0,0,10.143-20.94,16.396-32.885
                                c7.894-15.088,12.866-18.884,35.341-34.833c24.63-17.47,41.086-45.911,41.086-78.402C463.359,42.688,420.665,0,368.014,0
                                c-52.658,0-95.332,42.688-95.332,95.339C272.682,127.83,289.125,156.27,313.762,173.741z M368.014,55.013
                                c22.275,0,40.332,18.058,40.332,40.326c0,22.274-18.057,40.332-40.332,40.332c-22.275,0-40.326-18.058-40.326-40.332
                                C327.689,73.071,345.739,55.013,368.014,55.013z"/>
                        </g>
                        </svg>
                        <div class="text-white">Loading</div>
                      </li>
            </ul>


            <div class="p-4 border-t mx-8 mt-2">
                        <button class="w-full block mx-auto rounded-full bg-gray-100 hover:shadow-lg font-semibold text-black px-6 py-2">Loading</button>
            </div>
        </div>
        )
    } else {
        return (
            <>
             <GeneralModal 
                showModal={individualchatvisible} maintitle={turntoacronym(individualchattitle.fullname1)}
                notdisableproceed={false} canceltext="Back"
                setShowModal={setIndividualchatvisible}
            >
               <ChatInterface 
                    womandata={womandata}
                    male={individualchattitle}
                    chatdata={[]}
                />
            </GeneralModal>

            <GeneralModal 
                showModal={showeditprofilemodal} maintitle="Edit Profile"
                notdisableproceed={false} canceltext="Back"
                setShowModal={setEditProfileModal}
            >
                <div class="w-full bg-black p-3 rounded-full">
                    <Signup 
                        allquestions={femaleeditquestions}
                        url="https://expatelitesingles.com/api/edit_data"
                        mensform={true}
                        og_data={profiledata}
                        gender="Female"
                        edit={true}
                    />
                </div>
            </GeneralModal>

            <div class="max-w-2xl mx-4 sm:max-w-sm md:max-w-xl lg:max-w-xl xl:max-w-xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-gray-900 shadow-xl rounded-lg text-gray-900 flex flex-col justify-center items-center">
                <div class="rounded-t-lg w-1/2 h-auto overflow-hidden">
                    {!checkgendermale()
                        ? <SmartImageComponent cssclasses="object-cover object-top w-full rounded-full m-1" src={"/profilepic/0?EMAIL="+profiledata.EMAIL} id="Woman looking front" backup={true}/>
                        : <SmartImageComponent cssclasses="object-cover object-top w-full rounded-full m-1" src={"/profilepic/0?EMAIL="+profiledata.fullname1} id="Woman looking front" backup={true}/>
                    }
                </div>

                <div class="text-center mt-2">
                    {!checkgendermale()
                        ? <h2 class="font-semibold text-white mb-1">{profiledata.fullname1}</h2>
                        : <h2 class="font-semibold text-white mb-1">{turntoacronym(profiledata.fullname1)}</h2>
                    }
                    
                    {!checkgendermale()
                        ? <p class="text-gray-500 mb-1">{profiledata.EMAIL}</p>
                        : null
                    }
                    <p class="text-gray-500 mb-1">{profiledata.dateofbirth1}</p>
                    <p class="text-gray-500 mb-1">ETHNICITY: {profiledata.ethnicity1}</p>
                    <p class="text-gray-500 mb-1">{profiledata.zodiacsign}</p>
                    <p class="text-gray-500 mb-1">RELIGION: {profiledata.religion1}</p>
                    <p class="text-gray-500 mb-1">OCCUPATION: {profiledata.currentoccupation1}</p>
                    <p class="text-gray-500 mb-1">PACKAGE: {profiledata.package1}</p>
                </div>
                <ul class="py-4 mt-2 text-gray-700 flex grid grid-cols-3 gap-3">
                    {profiledata.age1==="" ? null
                        : <li class="flex flex-col items-center justify-around">
                            <svg class="w-4 fill-current text-white" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"/></svg>
                            <div class="text-white">Age: {profiledata.age1}</div>
                          </li>
                    }
                    {profiledata.city1==="" ? null
                        : <li class="flex flex-col items-center justify-between">
                            <svg class="w-4 fill-current text-white" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11 1H1V15H3V11H5V15H15V9H11V1ZM5 3H3V5H5V3ZM9 3H7V5H9V3ZM7 7H9V9H7V7ZM11 11H13V13H11V11Z" />
                            </svg>
                            <div class="text-white">{profiledata.city1}</div>
                        </li>
                    }
                    {profiledata.country1==="" ? null
                        : <li class="flex flex-col items-center justify-around">
                            <svg class="w-4 fill-current text-white" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                                viewBox="0 0 512 512"  xmlSpace="preserve">
                            <g>
                                <path class="st0" d="M454.111,193.473c-3.617,3.21-7.4,6.252-11.391,9.095c-9.236,6.546-14.26,10.143-17.404,12.866
                                    c9.216,20.58,14.875,43.094,15.996,66.857h-66.418h-17.61h-92.449V170.384h-17.671h-70.307c2.769-6.606,5.732-12.886,8.915-18.731
                                    c9.522-17.564,20.753-31.484,32.724-40.786c0.901-0.7,1.802-1.321,2.703-1.975c5.479-1.028,11.064-1.749,16.696-2.296
                                    c-0.327-3.737-0.554-7.487-0.554-11.257c0-8.348,0.814-16.503,2.322-24.417c-54.439,3.977-103.533,27.693-139.848,64.022
                                    c-39.939,39.919-64.702,95.252-64.689,156.184c-0.014,60.932,24.75,116.265,64.689,156.184
                                    c39.912,39.939,95.245,64.703,156.184,64.689c60.939,0.014,116.266-24.75,156.184-64.689
                                    c39.938-39.918,64.695-95.251,64.689-156.184C476.879,256.1,468.658,222.935,454.111,193.473z M124.813,159.941
                                    c17.27-17.264,37.903-31.09,60.812-40.492c-10.918,14.133-20.213,31.404-27.76,50.936h-42.661
                                    C118.287,166.794,121.463,163.284,124.813,159.941z M101.731,188.054h49.955c-8.708,28.134-13.86,60.165-14.634,94.238H70.688
                                    C72.322,247.478,83.52,215.248,101.731,188.054z M94.504,382.422c-13.92-24.55-22.408-52.538-23.816-82.46h66.424
                                    c0.674,29.435,4.624,57.275,11.317,82.46H94.504z M124.813,422.314c-6.886-6.887-13.2-14.334-18.938-22.221h47.833
                                    c4.691,14.053,10.17,27.193,16.529,38.931c4.711,8.675,9.876,16.616,15.422,23.803
                                    C162.737,453.424,142.097,439.584,124.813,422.314z M247.164,476.433c-8.835-0.414-17.496-1.475-25.958-3.07
                                    c-0.908-0.654-1.808-1.274-2.71-1.968c-17.971-13.948-34.206-38.357-45.664-69.701c-0.186-0.52-0.353-1.081-0.547-1.602h74.879
                                    V476.433z M247.164,382.422H166.68c-7-24.758-11.251-52.725-11.965-82.46h92.449V382.422z M247.164,282.292h-92.509
                                    c0.814-34.54,6.453-66.744,15.568-94.238h76.94V282.292z M264.835,299.963h92.509c-0.701,29.729-4.985,57.702-11.985,82.46h-80.524
                                    V299.963z M293.503,471.395c-0.894,0.694-1.802,1.314-2.71,1.968c-8.462,1.595-17.123,2.656-25.958,3.07v-76.34h74.898
                                    c-3.964,11.044-8.488,21.28-13.506,30.509C316.705,448.165,305.474,462.079,293.503,471.395z M387.193,422.314
                                    c-17.283,17.264-37.91,31.097-60.825,40.506c11.691-15.135,21.574-33.792,29.388-55.04c0.921-2.496,1.749-5.112,2.603-7.688h47.766
                                    C400.385,407.98,394.073,415.427,387.193,422.314z M417.495,382.422H363.69c6.673-25.165,10.584-53.051,11.257-82.46h66.365
                                    C439.904,329.885,431.409,357.872,417.495,382.422z"/>
                                <path class="st0" d="M313.762,173.741c22.468,15.949,27.434,19.746,35.341,34.833c6.253,11.945,16.39,32.885,16.39,32.885
                                    c0.48,0.954,1.448,1.562,2.522,1.562c1.061,0,2.049-0.608,2.522-1.562c0,0,10.143-20.94,16.396-32.885
                                    c7.894-15.088,12.866-18.884,35.341-34.833c24.63-17.47,41.086-45.911,41.086-78.402C463.359,42.688,420.665,0,368.014,0
                                    c-52.658,0-95.332,42.688-95.332,95.339C272.682,127.83,289.125,156.27,313.762,173.741z M368.014,55.013
                                    c22.275,0,40.332,18.058,40.332,40.326c0,22.274-18.057,40.332-40.332,40.332c-22.275,0-40.326-18.058-40.326-40.332
                                    C327.689,73.071,345.739,55.013,368.014,55.013z"/>
                            </g>
                            </svg>
                            <div class="text-white">{profiledata.country1}</div>
                          </li>
                    }
                </ul>

                <p class="text-white p-4">{profiledata.futurespouse1}</p>

                <div class="p-4 border-t mx-8 mt-2">
                    {checkgendermale()
                        ? <button class="w-full block mx-auto rounded-full bg-blue-300 hover:shadow-lg font-semibold text-black px-6 py-2" onClick={()=>messageManFunction()}>Message</button>
                        : null
                    }
                    {checkgendermale() ? null
                        : <>
                            <button class="w-full block mx-auto rounded-full bg-gray-100 hover:shadow-lg font-semibold text-black px-6 py-2" onClick={()=>editManFunction()}>Edit</button>
                            <button class="w-full block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2" onClick={()=>setEditimages(true)}>Edit Images</button>

                            {showeditimages
                                ? <div class="w-full flex flex-col justify-center items-center">
                                    <div class="rounded-t-lg w-1/3 h-auto overflow-hidden">
                                        <p class="text-white">To Edit Your Images first please delete them by pressing the button below then reupload</p>
                                        <button class="w-full block mx-auto rounded-full bg-red-900 hover:shadow-lg font-semibold text-white px-6 py-2" onClick={()=>deleteimages()}>Delete</button>

                                        <SmartImageComponent cssclasses="object-cover object-top w-full rounded-full m-1" src={"/profilepic/1?EMAIL="+profiledata.EMAIL} id="Woman looking front" backup={true}/>
                                        {/* <SmartImageComponent cssclasses="object-cover object-top w-full rounded-full m-1" src={"/profilepic/2?EMAIL="+profiledata.EMAIL} id="Woman looking front" backup={true}/> */}

                                        <p>Image</p>
                                        <ImageFormComponent EMAIL={profiledata.EMAIL} id={crypto.randomUUID()} fullname1={profiledata.fullname1} allanswers={profiledata}/>
                                        {/* <p>Image 2</p>
                                        <ImageFormComponent EMAIL={profiledata.EMAIL} id={crypto.randomUUID()} fullname1={profiledata.fullname1} allanswers={profiledata}/>
                                        <p>Image 3</p>
                                        <ImageFormComponent EMAIL={profiledata.EMAIL} id={crypto.randomUUID()} fullname1={profiledata.fullname1} allanswers={profiledata}/> */}
                                    </div>
                                   </div>
                                : null
                            }
                          </>
                    }
                </div>
            </div>
            </>
        )
    }
}

function ProfileCard(props) {
    const profiledata = props.profiledata

    function messageManFunction() {
        props.setIndividualChatTitle(profiledata)
        props.setIndividualchatvisible(true)
    }

    return (
        <div class="w-11/12 md:w-1/2 mt-2 bg-gray-900 shadow-xl rounded-lg text-gray-900 mx-6">
                <div class="rounded-t-lg h-32 w-auto overflow-hidden flex justify-center items-center mt-3">
                    <SmartImageComponent cssclasses="object-cover object-top h-full w-auto rounded-full m-1" src={"/profilepic/0?EMAIL="+profiledata.fullname1} id={"Pic of:" + profiledata.fullname1} backup={true}/>
                </div>
                <div class="text-center mt-2">
                    <h2 class="font-semibold text-white mb-1">{turntoacronym(profiledata.fullname1)}</h2>
                    
                    <p class="text-gray-500 mb-1">{profiledata.dateofbirth1}</p>
                    <p class="text-gray-500 mb-1">{profiledata.ethnicity1}</p>
                    <p class="text-gray-500 mb-1">{profiledata.zodiacsign}</p>
                    {profiledata.religion1 !== ""
                        ? <p class="text-gray-500 mb-1">RELIGION: {profiledata.religion1}</p>
                        : null
                    }
                </div>
                <ul class="py-3 mt-1 text-gray-700 flex flex-col items-center justify-around">
                    {/* <li class="flex flex-col items-center justify-around">
                        <svg class="w-4 fill-current text-white" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"/></svg>
                        <div class="text-white">Age: {profiledata.age1}</div>
                    </li>
                    <li class="flex flex-col items-center justify-between">
                        <svg class="w-4 fill-current text-white" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 1H1V15H3V11H5V15H15V9H11V1ZM5 3H3V5H5V3ZM9 3H7V5H9V3ZM7 7H9V9H7V7ZM11 11H13V13H11V11Z" />
                        </svg>
                        <div class="text-white">{profiledata.city1}</div>
                    </li>
                    <li class="flex flex-col items-center justify-around">
                        <svg class="w-4 fill-current text-white" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                            viewBox="0 0 512 512"  xmlSpace="preserve">
                        <g>
                            <path class="st0" d="M454.111,193.473c-3.617,3.21-7.4,6.252-11.391,9.095c-9.236,6.546-14.26,10.143-17.404,12.866
                                c9.216,20.58,14.875,43.094,15.996,66.857h-66.418h-17.61h-92.449V170.384h-17.671h-70.307c2.769-6.606,5.732-12.886,8.915-18.731
                                c9.522-17.564,20.753-31.484,32.724-40.786c0.901-0.7,1.802-1.321,2.703-1.975c5.479-1.028,11.064-1.749,16.696-2.296
                                c-0.327-3.737-0.554-7.487-0.554-11.257c0-8.348,0.814-16.503,2.322-24.417c-54.439,3.977-103.533,27.693-139.848,64.022
                                c-39.939,39.919-64.702,95.252-64.689,156.184c-0.014,60.932,24.75,116.265,64.689,156.184
                                c39.912,39.939,95.245,64.703,156.184,64.689c60.939,0.014,116.266-24.75,156.184-64.689
                                c39.938-39.918,64.695-95.251,64.689-156.184C476.879,256.1,468.658,222.935,454.111,193.473z M124.813,159.941
                                c17.27-17.264,37.903-31.09,60.812-40.492c-10.918,14.133-20.213,31.404-27.76,50.936h-42.661
                                C118.287,166.794,121.463,163.284,124.813,159.941z M101.731,188.054h49.955c-8.708,28.134-13.86,60.165-14.634,94.238H70.688
                                C72.322,247.478,83.52,215.248,101.731,188.054z M94.504,382.422c-13.92-24.55-22.408-52.538-23.816-82.46h66.424
                                c0.674,29.435,4.624,57.275,11.317,82.46H94.504z M124.813,422.314c-6.886-6.887-13.2-14.334-18.938-22.221h47.833
                                c4.691,14.053,10.17,27.193,16.529,38.931c4.711,8.675,9.876,16.616,15.422,23.803
                                C162.737,453.424,142.097,439.584,124.813,422.314z M247.164,476.433c-8.835-0.414-17.496-1.475-25.958-3.07
                                c-0.908-0.654-1.808-1.274-2.71-1.968c-17.971-13.948-34.206-38.357-45.664-69.701c-0.186-0.52-0.353-1.081-0.547-1.602h74.879
                                V476.433z M247.164,382.422H166.68c-7-24.758-11.251-52.725-11.965-82.46h92.449V382.422z M247.164,282.292h-92.509
                                c0.814-34.54,6.453-66.744,15.568-94.238h76.94V282.292z M264.835,299.963h92.509c-0.701,29.729-4.985,57.702-11.985,82.46h-80.524
                                V299.963z M293.503,471.395c-0.894,0.694-1.802,1.314-2.71,1.968c-8.462,1.595-17.123,2.656-25.958,3.07v-76.34h74.898
                                c-3.964,11.044-8.488,21.28-13.506,30.509C316.705,448.165,305.474,462.079,293.503,471.395z M387.193,422.314
                                c-17.283,17.264-37.91,31.097-60.825,40.506c11.691-15.135,21.574-33.792,29.388-55.04c0.921-2.496,1.749-5.112,2.603-7.688h47.766
                                C400.385,407.98,394.073,415.427,387.193,422.314z M417.495,382.422H363.69c6.673-25.165,10.584-53.051,11.257-82.46h66.365
                                C439.904,329.885,431.409,357.872,417.495,382.422z"/>
                            <path class="st0" d="M313.762,173.741c22.468,15.949,27.434,19.746,35.341,34.833c6.253,11.945,16.39,32.885,16.39,32.885
                                c0.48,0.954,1.448,1.562,2.522,1.562c1.061,0,2.049-0.608,2.522-1.562c0,0,10.143-20.94,16.396-32.885
                                c7.894-15.088,12.866-18.884,35.341-34.833c24.63-17.47,41.086-45.911,41.086-78.402C463.359,42.688,420.665,0,368.014,0
                                c-52.658,0-95.332,42.688-95.332,95.339C272.682,127.83,289.125,156.27,313.762,173.741z M368.014,55.013
                                c22.275,0,40.332,18.058,40.332,40.326c0,22.274-18.057,40.332-40.332,40.332c-22.275,0-40.326-18.058-40.326-40.332
                                C327.689,73.071,345.739,55.013,368.014,55.013z"/>
                        </g>
                        </svg>
                        <div class="text-white">{profiledata.country1}</div>
                    </li> */}
                </ul>
                <div class="p-3 border-t mx-8 mt-1">
                        <button class="w-full block mx-auto rounded-full bg-blue-300 hover:shadow-lg font-semibold text-black px-6 py-2 text-center" onClick={()=>messageManFunction()}>Message</button>
                        <a class="w-full block mx-auto rounded-full bg-white hover:shadow-lg font-semibold text-black px-6 py-2 text-center mt-1 text-sm" href={'/profile/'+Base64.encode(profiledata.fullname1)+"?id="+props.herid+"&EMAIL="+Base64.encode(props.heremail)}>Visit Profile</a>
                </div>
            </div>
    )
}

export function GeneralModal(props){
    return (
      <>
        {props.showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="h-[calc(100%-3rem)] relative w-auto my-6 mx-auto max-w-3xl">
                <div className="max-h-full overflow-hidden border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-center justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      {props.maintitle}
                    </h3>
                    {props.lilbutton
                        ? <a className="px-3 py-2 ml-auto bg-black border-0 text-white float-right text-xl leading-none font-semibold outline-none focus:outline-none" href={props.lilbuttonlink}>
                            {props.lilbuttontext}
                          </a>
                        : <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => props.setShowModal(false)}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                            </span>
                          </button>
                    }
                  </div>
                  <div className="relative p-4 flex-auto overflow-y-auto">
                    {props.children}
                  </div>
                  <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {props.setShowModal(false), props.onClose()}}
                    >
                      {props.canceltext}
                    </button>
                    {props.notdisableproceed
                      ? <SubmitButton
                          type="button"
                          onClick={() => {props.setShowModal(false)}}
                        >
                          {props.submittext}
                        </SubmitButton> 
                      : null
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
}

function IndividualSection({section, men, minage, maxage, country, mainpackage, relationshipstatus, setIndividualChatTitle, setIndividualchatvisible, herid, heremail}) {
    const sectionclasses = {
        "All Men": "bg-gradient-to-r from-yellow-400 to-pink-600", 
        "Your Matches": "bg-gradient-to-r from-pink-500 to-rose-500", 
        "Loading": "bg-gradient-to-r from-grey-100 to-grey-400", 
        // "Bronze": "bg-gradient-to-r from-yellow-600 to-amber-800 text-white", 
        // "Silver": "bg-ggradient-to-r from-slate-300 to-slate-500 text-white", 
        // "Gold": "bg-gradient-to-r from-amber-200 to-yellow-500 text-black", 
        // "Platinum": "bg-gradient-to-r from-slate-500 to-slate-800 text-white", 
        // "Diamond": "bg-gradient-to-r from-violet-500 to-purple-500 text-white"
    }
    const [showsection, setShowsection] = React.useState(true)

    function checkitem(item) {
        var maxagematches = true
        var minagematches = true
        var countrymatches = true
        var packagematches = true
        var statusmatches = true

        if (minage!=="") {
            if (!(Number(item["age1"]) >= Number(minage))) {
                console.log("Age not in filter")
                minagematches = false
            }
        } 

        if (maxage!=="") {
            if (!(Number(item["age1"]) <= Number(maxage))) {
                console.log("Age not in filter")
                maxagematches = false
            }
        }

        if (country!=="") {
            if (!(item["country1"] === country)) {
                countrymatches = false
            }
        }

        if (mainpackage!=="") {
            if (!(item["package1"] === mainpackage)) {
                packagematches = false
            }
        }

        if (relationshipstatus!=="") {
            if (!(item["relationshipstatus1"] === relationshipstatus)) {
                statusmatches = false
            }
        }
        
        console.log("The guys name: ", item['fullname1'])
        console.log("The guys age: ", item['age1'])

        if (item["age1"] === "") {
            minagematches = false
        }
        console.log("The guys country: ", item['country1'])
        if (item["country1"] === "") {
            minagematches = false
        }
        console.log("The guys package: ", item['package1'])
        // if (item["package1"] === "") {
        //     minagematches = false
        // }
        console.log("The guys relationship status: ", item['relationshipstatus1'])
        if (item["relationshipstatus1"] === "") {
            minagematches = false
        }
        
        console.log("After the check.")
        console.log("Minage:", minagematches)
        console.log("Maxage:", maxagematches)
        console.log("Country:", countrymatches)
        console.log("Relationship Status:", statusmatches)
        
        if (maxagematches === true && minagematches === true && countrymatches === true && statusmatches === true && packagematches === true) {
            return true
        } else {
            return false
        }

    }
    return (
        <div class={"flex flex-col px-10 py-4 "+sectionclasses[section]}>
            <div class="grid grid-cols-2">
                <p class="text-xl text-white">{section}</p>
                {showsection
                    ? <button class="w-full mx-auto rounded-full bg-black hover:shadow-lg font-semibold text-white px-6 py-2" onClick={() => setShowsection(false)}><i class="fa-solid fa-eye-slash"></i></button>
                    : <button class="w-full mx-auto rounded-full bg-white hover:shadow-lg font-semibold text-black px-6 py-2" onClick={() => setShowsection(true)}><i class="fa-solid fa-eye"></i></button>
                }
            </div>
            {showsection
                ? <div class="flex flex-col overflow-x-auto justify-center items-center">
                    {men.map(function(item){
                        if (checkitem(item)) {
                            return (
                                <ProfileCard 
                                    profiledata={item}
                                    setIndividualChatTitle={setIndividualChatTitle}
                                    setIndividualchatvisible={setIndividualchatvisible}
                                    herid={herid}
                                    heremail={heremail}
                                />
                            )
                        }
                    })}
                  </div>
                : null
            }
        </div>
    )
}

export function Loader() {
    return (
        <div role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-white animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    )
}

export function PersonalProfile() {
    const { profileid } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const packageslist = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
    
    // Basic Loading
    const [profiledata, setProfileData] = React.useState({})
    const [mendata, setMenData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [menloading, setMenLoading] = React.useState(true)

    // Chat loading 
    const [chatdata, setChatData] = React.useState([])
    const [chatloading, setChatLoading] = React.useState(true)

    // Modal related
    const [notifmodalvisible, setNotifModalVisible] = React.useState(false)
    const [chatsvisible, setChatsVisible] = React.useState(false)
    const [individualchatvisible, setIndividualchatvisible] = React.useState(false)
    const [individualchattitle, setIndividualChatTitle] = React.useState({})
    
    // Filters
    const [minage, setMinAge] = React.useState("")
    const [mainpackage, setMainPackage] = React.useState("")
    const [country, setCountry] = React.useState("")
    const [relationshipstatus, setRelationshipStatus] = React.useState("")
    const [maxage, setMaxAge] = React.useState("")
    const [showfilters, setShowFilters] = React.useState(false)

    function loadprofile() {
        const url = `/api/getprofile/${profileid}`;
        const menurl = '/api/get_men'

        axios.post(url).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                const profiledata = response.data.data
                setProfileData(profiledata)
                
                console.log("The notifs:", profiledata.notifications)
                const url = `/get_chats?id=${profiledata.__id}`;
        
                axios.post(url).then((response) => {
                    if (response.data.responsecode === 200) {
                        console.log("Here are all the chats: ", response.data.chats_data)
                        
                        setChatData(response.data.chats_data)
                        setChatLoading(false)
                        
                        var theguymaybe = searchParams.get('male')
                        theguymaybe = theguymaybe || false
                        console.log("The guy: ", theguymaybe)
                        
                        if (!theguymaybe) {
                            setLoading(false)
                        } else {
                            messageManFunction(theguymaybe)
                        }
                    } else {
                        alert("Something went wrong. Please contact support.")
                    }
                });
            } else {
                alert("Something went wrong. Please contact support.")
            }
        });

        axios.post(menurl).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                setMenData(response.data.acc)
                setMenLoading(false)
            } else {
                alert("Something went wrong. Please contact support.")
            }
        });
    }

    function numberofnewmessages() {
        function checkitem(item) {
            const thelastmessage = item.messages[item.messages.length -1]
            
            console.log('The last message:', thelastmessage)

            if ((thelastmessage["Guy Sent"]) && !thelastmessage.read) {
                return true
            }
        }

        const evenNumbers = chatdata.filter(checkitem);
        return evenNumbers.length
    }

    function messageManFunction(male) {
        console.log("Starting chat with:", male)
        const url = `/api/getprofile/${Base64.encode(male)}`;
        const setreadurl = `/api/chat/setread`;
        

        const formmData = new FormData()
        formmData.append('malename', male)
        formmData.append('id', profiledata.__id)

        axios.post(url).then((response) => {
            if (response.data.responsecode === 200) {
                setIndividualChatTitle(response.data.data)
                setLoading(false)
                setChatsVisible(false)
                setIndividualchatvisible(true)
            } else {
                alert("Something went wrong loading up chat. Please contact support.")
            }
        });

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        axios.post(setreadurl,formmData,config).then((response) => {
            if (response.data.responsecode === 200) {
                console.log('Message set as read')
            } else {
                console.log('Could not set message as read')
            }
        });
    }

    function reset_notifs() {
        const url = `/api/reset_notifications/${Base64.decode(profileid)}`;
        
        axios.post(url).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                console.log("Resetting notifications.")
            }
        });
    }

    React.useEffect(loadprofile, []);

    if (loading) {
        return (
            <div class="flex flex-col w-full">
                <div class="w-full mt-0 text-gray-400 flex flex-row justify-between border border-white border-1">
                            <button onClick={() => setNotifModalVisible(true)} class="border border-white border-1 px-5 text-white">
                                <Loader/>
                            </button>
                            <button onClick={() => setChatsVisible(true)} class="border border-white border-1 px-5 py-2 text-white flex flex-col items-center justify-center">
                                <Loader/>
                            </button>
                            <a href={'/profile/'+profileid} class="border border-white border-1 px-5 py-2 text-white">
                                <i class="fa-solid fa-user"></i>
                            </a>
                </div>

                <div class="w-full mt-4 md:mt-10 bg-black shadow-xl rounded-lg text-gray-400">
                    <div class="rounded-t-lg h-32 overflow-hidden w-full bg-gradient-to-r from-grey-200 to-grey-600">
                        <SmartImageComponent id="Background image" cssclasses="hidden" src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"/>
                    </div>

                    <div class="mx-auto w-32 h-32 relative -mt-8 md:-mt-16 border-4 border-white rounded-full overflow-hidden">
                        <SmartImageComponent src={'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'} cssclasses="object-cover object-center h-32 w-full" id="Acc profile picture"/>
                    </div>
                    <div class="p-4 flex flex-col justify-center items-center">
                        <button onClick={() => setShowFilters(!showfilters)} class="border border-white border-1 px-5 text-white">
                            FILTERS FOR MEN: {showfilters ? "ON" : "OFF"}<br/>
                            CLICK TO TURN {showfilters ? "OFF" : "ON"}
                        </button>
                    </div>

                    <div>
                            <IndividualSection 
                                section={"Loading"} 
                                men={[]}
                                minage={profiledata.minage1}
                                maxage={profiledata.maxage1}
                                country={country}
                                mainpackage={mainpackage}
                                relationshipstatus={relationshipstatus}
                                setIndividualchatvisible={setIndividualchatvisible}
                                setIndividualChatTitle={setIndividualChatTitle}
                                herid={"Notactual"}
                                heremail={"fofoo@mo.com"}
                            />
                            <IndividualSection 
                                section={"Loading"} 
                                men={[]}
                                minage={profiledata.minage1}
                                maxage={profiledata.maxage1}
                                country={country}
                                mainpackage={mainpackage}
                                relationshipstatus={relationshipstatus}
                                setIndividualchatvisible={setIndividualchatvisible}
                                setIndividualChatTitle={setIndividualChatTitle}
                                herid={"Notactual"}
                                heremail={"fofoo@mo.com"}
                            />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <>
            <GeneralModal 
                showModal={chatsvisible} maintitle="Chats" 
                notdisableproceed={false} canceltext="Back"
                setShowModal={setChatsVisible} onClose={function (){setIndividualChatTitle({})}}
            >
                {chatloading
                    ? <Loader/>
                    : <p class="text-black">{chatdata.length} chats total.</p>
                }
                <div class="flex flex-col w-full">
                    {chatdata.map(function (item) {
                        const thelastmessage = item.messages[item.messages.length -1]
                        
                        console.log('The last message:', thelastmessage)

                        if (thelastmessage["Guy Sent"]) {
                            return (
                                <button class="p-3 bg-black text-white flex flex-row justify-between rounded w-full my-2" onClick={() => messageManFunction(item.male)}>
                                    <SmartImageComponent id="Profile picture" cssclasses="w-8 h-8 rounded-full" src={"/profilepic/0?EMAIL="+item.male}/>
                                    <p class="text-white w-full ">Him: {thelastmessage["Guy Sent"].message}</p>
                                </button>
                            )
                        } else {
                            return (
                                <button class="p-3 bg-black text-white flex flex-row justify-between rounded w-full my-2" onClick={() => messageManFunction(item.male)}>
                                    <SmartImageComponent id="Profile picture" cssclasses="w-8 h-8 rounded-full" src={"/profilepic/0?EMAIL="+item.male}/>
                                    <p class="text-white w-full">You: {thelastmessage["Girl Sent"].message}</p>
                                </button>
                            )
                        }
                    })}
                </div>

            </GeneralModal>

            <GeneralModal 
                showModal={individualchatvisible} maintitle={turntoacronym(individualchattitle.fullname1) || ""}
                notdisableproceed={false} canceltext="Back"
                setShowModal={setIndividualchatvisible} onClose={function (){setIndividualChatTitle({})}}
                lilbutton={true} lilbuttonlink={'/profile/'+Base64.encode(individualchattitle.fullname1) || ''}
                lilbuttontext="View Profile"
            >
               {individualchatvisible
                    ? <ChatInterface 
                            womandata={profiledata}
                            male={individualchattitle}
                            chatdata={[]}
                        />
                    : null
               }
            </GeneralModal>
            
            <GeneralModal 
                showModal={notifmodalvisible} maintitle="Notifications" 
                notdisableproceed={false} canceltext="Back"
                setShowModal={setNotifModalVisible} onClose={function (){setIndividualChatTitle({})}}
            >
                {profiledata.notifications !== undefined
                    ? <>
                        {profiledata.notifications.length === 0 
                            ? <p class="text-black">No notifications currently</p>
                            : <div class="flex flex-col">
                                {Object.prototype.toString.call(profiledata.notifications) === '[object Array]'
                                    ? <>
                                        {profiledata.notifications.map(function (item) {
                                            return (
                                                <div class="p-3 border border-b border-b-1 text-black my-2">
                                                    <p class="text-black text-base">{item.text}</p>
                                                    <p class="text-black text-base">{timestamptodate(item.timestamp)}</p>
                                                </div>
                                            )
                                        })}
                                      </>
                                    : <p class="text-black">There's something wrong with your notifications. Please refresh your profile by refreshing this page or contact support.</p>
                                }
                              </div>
                        }
                      </>
                    : <p class="text-black">No notifications currently</p>
                }
            </GeneralModal>

                <div class="flex flex-col w-full">
                    <div class="w-full mt-0 text-gray-400 flex flex-row justify-between border border-white border-1">
                        <button onClick={() => {setNotifModalVisible(true);reset_notifs()}} class="border border-white border-1 px-5 text-white">
                            <i class="fa-solid fa-bell mr-2"></i>
                            {profiledata.notifications
                                ? <>
                                    {Object.prototype.toString.call(profiledata.notifications) !== '[object Array]' ? "0"
                                        : <>{profiledata.notifications.length || "0"}</>
                                    }
                                  </>
                                : null
                            }
                        </button>
                        <button onClick={() => setChatsVisible(true)} class="border border-white border-1 px-5 py-2 text-white">
                            <i class="fa-solid fa-comment mr-2"></i>
                            {chatloading ? null
                                : <>{numberofnewmessages()}</>
                            }
                        </button>
                        <a href={'/profile/'+profileid} class="border border-white border-1 px-5 py-2 text-white">
                            <i class="fa-solid fa-user"></i>
                        </a>
                    </div>

                    <div class="w-full mt-4 md:mt-10 bg-black shadow-xl rounded-lg text-gray-400">
                        <div class="rounded-t-lg h-32 overflow-hidden w-full bg-gradient-to-r from-yellow-400 to-pink-600">
                            <SmartImageComponent id="Background image" cssclasses="hidden" src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"/>
                        </div>

                        <div class="mx-auto w-32 h-32 relative -mt-8 md:-mt-16 border-4 border-white rounded-full overflow-hidden">
                            <SmartImageComponent src={"/profilepic/0?EMAIL="+profiledata.EMAIL} cssclasses="object-cover object-center h-32 w-full" id="Acc profile picture"/>
                        </div>
                        <div class="p-4 flex flex-col justify-center items-center">
                            <button onClick={() => setShowFilters(!showfilters)} class="border border-white border-1 px-5 text-white">
                                FILTERS FOR MEN: {showfilters ? "ON" : "OFF"}<br/>
                                CLICK TO TURN {showfilters ? "OFF" : "ON"}
                            </button>
                            {showfilters
                                ? <div class='my-3 gap-1 grid grid-cols-1 md:grid-cols-4'>
                                        <div class="grid grid-cols-2">
                                            <select class="bg-white text-black w-full p-2 rounded-full" onChange={(e) => setMinAge(e.target.value)}>
                                                <option>Min Age</option>
                                                {getMultiples(1,100).map((item) => <option>{item}</option>)}
                                            </select>
                                            <select class="bg-white text-black w-full p-2 rounded-full" onChange={(e) => setMaxAge(e.target.value)}>
                                                <option>Max Age</option>
                                                {getMultiples(1,100).map((item) => <option>{item}</option>)}
                                            </select>
                                        </div>
                                        <select class="bg-black text-white border-white border-1 w-full p-2 rounded-full" onChange={(e) => setMainPackage(e.target.value)}>
                                                <option>Package</option>
                                                {packageslist.map((item) => <option>{item}</option>)}
                                        </select>
                                        <select class="bg-white text-black w-full p-2 rounded-full" onChange={(e) => setRelationshipStatus(e.target.value)}>
                                                <option>Relationship Status</option>
                                                <option>Single</option>
                                                <option>Divorced</option>
                                        </select>
                                        <select class="bg-black text-white border-white border-1 w-full p-2 rounded-full" onChange={(e) => setCountry(e.target.value)}>
                                                <option>Country</option>
                                                {countryList.map((item) => <option>{item}</option>)}
                                        </select>
                                    </div>
                                : null
                            }
                        </div>

                        <div>
                                <IndividualSection 
                                    section={"Your Matches"} 
                                    men={mendata}
                                    minage={profiledata.minage1}
                                    maxage={profiledata.maxage1}
                                    country={country}
                                    mainpackage={mainpackage}
                                    relationshipstatus={relationshipstatus}
                                    setIndividualchatvisible={setIndividualchatvisible}
                                    setIndividualChatTitle={setIndividualChatTitle}
                                    herid={profiledata.__id}
                                    heremail={profiledata.EMAIL}
                                />
                                 <IndividualSection 
                                    section={"All Men"} 
                                    men={mendata}
                                    minage={minage}
                                    maxage={maxage}
                                    country={country}
                                    mainpackage={mainpackage}
                                    relationshipstatus={relationshipstatus}
                                    setIndividualchatvisible={setIndividualchatvisible}
                                    setIndividualChatTitle={setIndividualChatTitle}
                                    herid={profiledata.__id}
                                    heremail={profiledata.EMAIL}
                                />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}