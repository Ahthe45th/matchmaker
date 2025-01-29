import React from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import FormComponent, { ImageFormComponent } from './menimagesform';
import { Base64, calculateDaysHoursMinutes, fillerprofiledata } from './misc.js';
// import "./../fontstyles.css";
import { useParams } from 'react-router-dom';
// import ReCAPTCHA from 'react-google-recaptcha'
import { Loader } from './profile.js';
// import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function fillerfunction () {
    // pretends to do something so form doesnt auto submit after option select
    console.log('Ayo')
}

function CoolOption(props) {
    const [selected, setSelected] = React.useState(props.alreadyselected || false)
    console.log("Rerendering ", selected)
    function onselection() {
        setSelected(true)
        props.setField(props.text, props.fieldid, "choice", props.pick, props.numberselected, props.setNumberSelected)
        
        console.log("Number to pick: ", props.pick)
        console.log("Number selected: ", props.numberselected)
        
        if (props.text === "Other") {
            props.setSelectedOther(true)
        } else {
            setTimeout(function () {
                if (props.numberselected+1 >= props.pick) {
                    props.nextstep()
                }
            }, 1000)
        }
    }

    return (
        <>
            {selected
                ? <button class="w-full p-2 mb-2 bg-green-300 border-white text-black kanit-thin rounded-full" onClick={() => {setSelected(false);props.setField(props.text, props.fieldid, "choice", props.pick, props.numberselected, props.setNumberSelected)}}>{props.text}</button>
                : <button class="w-full p-2 mb-2 bg-white border-white text-black kanit-thin rounded-full" onClick={() => onselection()}>{props.text}</button>
            }
        </>
    )
}

function FormQuestion(props) {
    function checkifanswerisntoftheoptions() {
        if (props.item.type === "choice") {
            const field = props.answers[props.item.fieldid]
            if (field) {
                const items = props.item.answers
                if (!items.includes(field)) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }
    }
    const recaptcha = props.recaptcha
    const [numberselected, setNumberSelected] = React.useState(0)
    const [rangeslider, setRangeSlider] = React.useState(props.answers[props.item.fieldid] || 18)
    const [selectedother, setSelectedOther] = React.useState(checkifanswerisntoftheoptions())

    const pick = props.item.pick || 1

    function checkfieldisntpresent(thefield, valuetocheck, valuecorrectimportant) {
        const field = props.answers[thefield]
        if (field) {
            const isvalue = field === valuetocheck 
            if (valuecorrectimportant) {
                return isvalue
            } else {
                return true
            }
        } else {
            return false
        }
    }

    function renderAccQuestion() {
        if (props.item.type === "choice") {
            return (
                <>
                {props.men
                    ? <>
                        {props.item.sectionshow
                            ? <p class="text-white text-xl mt-1 text-center">{props.item.section}</p>
                            : null
                        }
                        <p class="text-white text-base mb-2 text-center">{props.item.question}</p>
                      </>
                    : <>
                        <p class="text-white text-xl mt-1 text-center">{props.item.section}</p>
                        <p class="text-white text-base mb-2 text-center">{props.item.question}</p>
                      </>
                }
                
                {props.laststep
                    ? <>
                        {props.item.answers.map((item) => (
                            <CoolOption 
                                text={item} setField={props.setField} 
                                fieldid={props.item.fieldid} pick={pick} 
                                numberselected={numberselected} setNumberSelected={setNumberSelected} 
                                nextstep={fillerfunction} setSelectedOther={setSelectedOther} 
                                alreadyselected={checkfieldisntpresent(props.item.fieldid, item, true)}/>
                        ))}
                      </>
                    : <>
                        {props.item.answers.map((item) => (
                            <CoolOption 
                                text={item} setField={props.setField} 
                                fieldid={props.item.fieldid} pick={pick} 
                                numberselected={numberselected} setNumberSelected={setNumberSelected} 
                                nextstep={props.ForwardStep} setSelectedOther={setSelectedOther} 
                                alreadyselected={checkfieldisntpresent(props.item.fieldid, item, true)}/>
                        ))}
                      </>
                }

                {selectedother
                    ? <>
                        {checkifanswerisntoftheoptions()
                            ? <input class="bg-white text-black placeholder-gray-600 p-2 my-2 rounded-full" defaultValue={props.answers[props.item.fieldid]} placeholder={'Please expand:'} onChange={(e) => props.setField(e.target.value, props.item.fieldid)}/>
                            : <input class="bg-white text-black placeholder-gray-600 p-2 my-2 rounded-full" placeholder={'Please expand:'} onChange={(e) => props.setField(e.target.value, props.item.fieldid)}/>
                        }
                      </>
                    : null
                }
                
                {!props.firststep
                    ? <>
                        {props.men ? null 
                            : <div class="grid grid-cols-2 mt-3 gap-2">
                                <button onClick={() => props.MinusStep()} class="w-full text-black bg-white p-2 rounded-full">Prev</button>
                                <button onClick={() => props.ForwardStep()} class="w-full text-black bg-white p-2 rounded-full">Next</button>
                              </div>
                        }
                      </>
                    : null
                }
                </>
            )
        } else if (props.item.type === "age") {
            const min = props.item.min || 1
            const max = props.item.max || 150
            return (
                <>
                {props.item.sectionshow
                    ? <p class="text-white text-xl mt-1">{props.item.section}</p>
                    : null
                }
                {props.men ? null
                    : <p class="text-white text-xl mt-1">{props.item.section}</p>
                }
                <label for="steps-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.item.question}: {rangeslider}</label>
                <input type="range" min={min} max={max} step="1" class="w-full h-2 bg-gray-200 mt-1 mb-3 rounded-lg appearance-none cursor-pointer" value={rangeslider} onChange={(e) => {setRangeSlider(e.target.value);props.setField(e.target.value, props.item.fieldid)}}/>
                </>
            )
        } else if (props.item.type === "pass") {
            return (
                <>
                    {props.men
                        ? <>
                            {props.item.sectionshow
                                ? <p class="text-white text-xl mt-1">{props.item.section}</p>
                                : null
                            }
                            <input class="bg-white text-black placeholder-gray-600 p-2 my-2 rounded-full" placeholder={props.item.question+':'} type='password' defaultValue={props.answers[props.item.fieldid] || ""} onChange={(e) => props.setField(e.target.value, props.item.fieldid)}/>
                          </>
                        : <>
                            <p class="text-white text-xl">{props.item.section}</p>
                            <p class="text-white text-base">{props.item.question}</p>
                            <input class="bg-white text-black placeholder-gray-600 p-2 rounded-full" placeholder='Enter Text:' type='password' onChange={(e) => props.setField(e.target.value, props.item.fieldid)}/>
                          </>
                    }
                </>
            )
        } else if (props.item.type === "longtext") {
            return (
                <>
                    {props.men
                        ? <>
                            {props.item.sectionshow
                                ? <p class="text-white text-xl mt-1">{props.item.section}</p>
                                : null
                            }
                            <textarea class="bg-white text-black placeholder-gray-600 p-2 my-2 w-full h-64" placeholder={props.item.question+':'} type='password' defaultValue={props.answers[props.item.fieldid] || ""} onChange={(e) => props.setField(e.target.value, props.item.fieldid)}/>
                          </>
                        : <>
                            <p class="text-white text-xl">{props.item.section}</p>
                            <p class="text-white text-base">{props.item.question}</p>
                            <textarea class="bg-white text-black placeholder-gray-600 p-2 w-full h-64" placeholder='Enter Text:' defaultValue={props.answers[props.item.fieldid] || ""} onChange={(e) => props.setField(e.target.value, props.item.fieldid)}/>
                          </>
                    }
                </>
            )
        } else if (props.item.type === "image") {
            const fullname1 = props.answers.fullname1
            const EMAIL = props.answers.EMAIL
            const therandomUUID = crypto.randomUUID()
            console.log("Current State of things at image form component show.");
            console.log("Email:", EMAIL);
            console.log("Full name:", fullname1);
            console.log("ID:", therandomUUID);
            
            return (
                <>
                    {props.men
                        ? <>
                            {props.item.sectionshow
                                ? <p class="text-white text-xl mt-1">{props.item.section}</p>
                                : null
                            }
                            <p class="text-white text-base mt-1">{props.item.question}</p>
                            <ImageFormComponent EMAIL={EMAIL} id={therandomUUID} fullname1={fullname1} allanswers={props.answers} gender={props.gender}/>
                          </>
                        : <>
                            <p class="text-white text-xl">{props.item.section}</p>
                            <p class="text-white text-base">{props.item.question}</p>
                            <ImageFormComponent EMAIL={EMAIL} id={therandomUUID} fullname1={fullname1} allanswers={props.answers} gender={props.gender}/>
                          </>
                    }
                </>
            )
        } else if (props.item.type === "captcha") {
            return (
                <>
                    <p class="text-white text-base mt-1">{props.item.question}</p>
                    <ReCAPTCHA ref={recaptcha} sitekey={"6LfTO2YqAAAAAEJnKMWW2zz_wK972wr7z4yZEVSh"} />
                </>
            )
        } else {
            return (
                <>
                    {props.men
                        ? <>
                            {props.item.sectionshow
                                ? <p class="text-white text-xl mt-1">{props.item.section}</p>
                                : null
                            }
                            <input class="bg-white text-black placeholder-gray-600 p-2 my-2  w-full rounded-full" placeholder={props.item.question+':'} defaultValue={props.answers[props.item.fieldid] || ""} onChange={(e) => props.setField(e.target.value, props.item.fieldid)}/>
                          </>
                        : <>
                            <p class="text-white text-xl">{props.item.section}</p>
                            <p class="text-white text-base">{props.item.question}</p>
                            <input class="bg-white text-black placeholder-gray-600 p-2 rounded-full" placeholder='Enter Text:' defaultValue={props.answers[props.item.fieldid] || ""} onChange={(e) => props.setField(e.target.value, props.item.fieldid)}/>
                          </>
                    }
                </>
            )
        }
    }
    
    return (
        <>
        {props.showitem
            ? <motion.div 
                class="flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{duration:1}}
              >
                {renderAccQuestion()}
                
                {props.rendersequentially
                    ? <>
                        {props.firststep
                            ? <button onClick={() => props.ForwardStep()} class="w-full text-black bg-white p-2 rounded-full mt-3">Next</button>
                            : <>
                                {props.item.type !== "choice"
                                    ? <div class="grid grid-cols-2 mt-3 gap-2">
                                        <button onClick={() => props.MinusStep()} class="w-full text-black bg-white p-2 rounded-full">Prev</button>
                                        <button onClick={() => props.ForwardStep()} class="w-full text-black bg-white p-2 rounded-full">Next</button>
                                      </div>
                                    : null
                                }
                              </>
                        }
                      </>
                    : null
                }

                {props.rendersequentially
                    ? null
                    : <>
                        {props.laststep
                            ? <button onClick={() => props.ForwardStep()} class="w-full text-black bg-white p-2 rounded-full mt-3">Submit</button>
                            : null
                        }
                      </>
                }
                
              </motion.div>
            : null
        }
        </>
    )
}

export default function Signup(props) {
    
    function fillornot() {
        if (props.og_data) {
            return props.og_data
        } else {
            if (props.mensform) {
                return fillerprofiledata()
            } else {
                return {}
            }
        }
    }
    const recaptcha = React.useRef()
    const captchapresent = props.captchapresent || false 

    const [allanswers, setAllAnswers] = React.useState(fillornot())
    const [currentstep, setCurrentStep] = React.useState(0)
    
    const numberofsteps = props.allquestions.length
    
    function ForwardStep() {
        // 13 country
        console.log("Thew current step:", currentstep)
        if (currentstep === 29) {
            console.log("We have arrived at the skipping point")
            console.log("The value of the kids var: ", allanswers['children1'])
            if (allanswers['children1']) {
                if (allanswers['children1'][0]==="No") {
                    const storenextstep = currentstep + 2
                    setCurrentStep(storenextstep)
                } else {
                    const storenextstep = currentstep + 1
                    setCurrentStep(storenextstep)
                }
            } else {
                const storenextstep = currentstep + 1
                setCurrentStep(storenextstep)
            }
        } else {
            const storenextstep = currentstep + 1
            setCurrentStep(storenextstep)
        }
    }
    function MinusStep() {
        const storenextstep = currentstep - 1
        setCurrentStep(storenextstep)
    }

    function setField(value, field, type, picknumber, numberselected, setNumberSelected) {
        var currentanswers = allanswers;
        console.log("Newthing ", currentanswers);
        if (type !== 'choice') {
            var currentanswers = allanswers
            currentanswers[field] = value
            setAllAnswers(currentanswers)
            console.log(allanswers)
        } else {
            var currentanswers = allanswers
            console.log("Newthing ", currentanswers)
            if (!currentanswers[field]) {
                var currentanswers = allanswers
                currentanswers[field] = [value]

                setAllAnswers(currentanswers)
                setNumberSelected(numberselected + 1)

                console.log(allanswers)
                console.log(numberselected)
            } else {
                var currentanswers = allanswers
                var newlength = currentanswers[field].length +1 
                var currentlypresent = currentanswers[field] || []
                if (currentlypresent.includes(value)) {
                    currentlypresent = currentlypresent.filter(item => item !== value)
                    currentanswers[field] = currentlypresent

                    setAllAnswers(currentanswers)
                    setNumberSelected(numberselected-1)

                    console.log(allanswers)
                    console.log(numberselected)
                } else {
                    var currentanswers = allanswers
                    if (newlength>picknumber) {
                        alert("You've picked too many options, please deselect something first.")
                    } else {
                        currentlypresent.push(value)
                        currentanswers[field] = currentlypresent

                        setAllAnswers(currentanswers)
                        setNumberSelected(numberselected+1)

                        console.log(allanswers)
                        console.log(numberselected)
                    }
                }
            }
        }
    }

    function checkcaptcha() {
        if (captchapresent) {
            const captchaValue = recaptcha.current.getValue()
            return captchaValue
        } else {
            return true
        }
    }
    function handleSubmit(event) {
        if (event) event.preventDefault()
        const captchaValue = checkcaptcha()
        if (!captchaValue) {
            alert('Please verify the reCAPTCHA!')
        } else {
            // make form submission
            const url = props.url;
            const formData = new FormData();
            var currentanswers = allanswers
            if (!currentanswers['fullname1']) {
                currentanswers['fullname1'] = `${currentanswers['firstname1']} ${currentanswers['middlename1']} ${currentanswers['lastname1']}`
            }
            for (var key in currentanswers) {
                formData.append(key, currentanswers[key]) 
            }
            
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            console.log(formData)
            axios.post(url, formData, config).then((response) => {
                console.log(response.data);
                if (response.data.responsecode === 200) {
                    if (props.edit === true) {
                        window.location.replace('/editssuccessful')
                    } else {
                        if (props.mensform !== true) {
                            window.location.replace('/registrationsuccess')
                        } else {
                            window.location.replace('/sirri_api/mensignup.html')
                        }
                    }
                } else {
                    alert("Something went wrong. Please contact support.")
                }
            });
        }

    }
    
    if (props.mensform) {
        return (
            <div class="mb-3">
                {props.allquestions.map(function(item, index) {
                    if (index === numberofsteps-1) {
                        return (
                            <FormQuestion 
                                index={index} 
                                item={item} 
                                men={true}
                                ForwardStep={handleSubmit} 
                                MinusStep={MinusStep} 
                                setField={setField}
                                laststep={true} 
                                firststep={(index===0)} 
                                showitem={true}
                                rendersequentially={false}
                                answers={allanswers}
                                gender={props.gender}
                                recaptcha={recaptcha}
                            />
                        )
                    } else {
                        return (
                            <FormQuestion 
                                index={index} 
                                item={item} 
                                men={true}
                                ForwardStep={ForwardStep} 
                                MinusStep={MinusStep} 
                                laststep={false}
                                setField={setField} 
                                firststep={(index===0)} 
                                showitem={true}
                                rendersequentially={false}
                                answers={allanswers}
                                gender={props.gender}
                                recaptcha={recaptcha}
                            />
                        )
                    }
                })}
            </div>
        )
    } else {
        return (
            <div class="mb-3">
                {props.allquestions.map(function(item, index) {
                    if (index === numberofsteps-1) {
                        return (
                            <FormQuestion 
                                index={index} 
                                item={item} 
                                ForwardStep={handleSubmit} 
                                MinusStep={MinusStep} 
                                setField={setField}
                                laststep={true} 
                                firststep={(index===0)} 
                                showitem={(index===currentstep)}
                                rendersequentially={true}
                                answers={allanswers}
                                recaptcha={recaptcha}
                            />
                        )
                    } else {
                        return (
                            <FormQuestion 
                                index={index} 
                                item={item} 
                                ForwardStep={ForwardStep} 
                                MinusStep={MinusStep} 
                                laststep={false}
                                setField={setField} 
                                firststep={(index===0)} 
                                showitem={(index===currentstep)}
                                rendersequentially={true}
                                answers={allanswers}
                                recaptcha={recaptcha}
                            />
                        )
                    }
                })}
            </div>
        )
    }
}

export function Login(props) {
    const [allanswers, setAllAnswers] = React.useState(fillerprofiledata())
    
    function setField(value, field) {
        var currentanswers = allanswers;
        console.log("Newthing ", currentanswers);
        currentanswers[field] = value
        setAllAnswers(currentanswers)
        console.log(allanswers)
    }

    function handleSubmit(event) {
        if (event) event.preventDefault()
        const url = props.url;
        const formData = new FormData();
        for (var key in allanswers) {
            formData.append(key, allanswers[key]) 
        }
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        console.log(formData)
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                window.location.replace('/myprofile/'+Base64.encode(allanswers['EMAIL']))
            } else if (response.data.responsecode === 404) {
                alert("Your email is invalid.")
            } else if (response.data.responsecode === 403) {
                alert("Your password is incorrect. You can click forgot password if you've forgotten it. Otherwise, please try again.")
            } else {
                alert("Something went wrong. Please contact support.")
            }
        });

    }
    return (
        <div class="mb-3">
            <motion.form
                class="flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{duration:1}}
                onSubmit={handleSubmit}
              >
                <input class="bg-white text-black placeholder-gray-600 p-2 my-2 rounded-full" placeholder='Email:' onChange={(e) => setField(e.target.value, "EMAIL")}/>
                <input class="bg-white text-black placeholder-gray-600 p-2 my-2 rounded-full" placeholder='Password:' type='password' onChange={(e) => setField(e.target.value, "password")}/>

                <button type='submit' class="w-full text-black bg-white p-2 my-3 rounded-full">LOGIN</button>
                <a href='/forgottenpassword' class="w-full text-black text-xs bg-white p-1 my-1 rounded-full">FORGOT PASSWORD</a>
            </motion.form>
        </div>
    )
}

export function GoogleEnabledLogin(props) {
    const [allanswers, setAllAnswers] = React.useState(fillerprofiledata())
    
    const handleSuccess = (credentialResponse) => {
        const url = "/api/googleauth"
        console.log("Here:", credentialResponse);
        const decryptedjwt = jwtDecode(credentialResponse.credential)
        console.log("Decrypted:", decryptedjwt)
        const formData = new FormData();
        for (var key in decryptedjwt) {
            formData.append(key, decryptedjwt[key]) 
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        console.log(formData)
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                window.location.replace('/myprofile/'+Base64.encode(allanswers['EMAIL']))
            } else if (response.data.responsecode === 404) {
                alert("Your email is invalid.")
            } else {
                alert("Something went wrong. Please contact support.")
            }
        }).catch((err) => {
            console.log("Something went wrong: ", err)
        });
    };
    
    
    const handleError = () => {
        console.log('Login Failed');
    };

    function setField(value, field) {
        var currentanswers = allanswers;
        console.log("Newthing ", currentanswers);
        currentanswers[field] = value
        setAllAnswers(currentanswers)
        console.log(allanswers)
    }

    function handleSubmit(event) {
        if (event) event.preventDefault()
        const url = props.url;
        const formData = new FormData();
        for (var key in allanswers) {
            formData.append(key, allanswers[key]) 
        }
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        console.log(formData)
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                window.location.replace('/myprofile/'+Base64.encode(allanswers['EMAIL']))
            } else if (response.data.responsecode === 404) {
                alert("Your email is invalid.")
            } else if (response.data.responsecode === 403) {
                alert("Your password is incorrect. You can click forgot password if you've forgotten it. Otherwise, please try again.")
            } else {
                alert("Something went wrong. Please contact support.")
            }
        });

    }
    return (
        <div class="mb-3">
            <motion.form
                class="flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{duration:1}}
                onSubmit={handleSubmit}
              >
                <input class="bg-white text-black placeholder-gray-600 p-2 my-2 rounded-full" placeholder='Email:' onChange={(e) => setField(e.target.value, "EMAIL")}/>
                <input class="bg-white text-black placeholder-gray-600 p-2 my-2 rounded-full" placeholder='Password:' type='password' onChange={(e) => setField(e.target.value, "password")}/>

                <button type='submit' class="w-full text-black bg-white p-2 my-3 rounded-full">LOGIN</button>
                <a href='/forgottenpassword' class="w-full text-black text-xs bg-white p-1 my-1 rounded-full">FORGOT PASSWORD</a>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            </motion.form>
        </div>
    )
}

export function Resettingpassword(props) {
    const { emailid } = useParams()
    const [allanswers, setAllAnswers] = React.useState({})
    
    function setField(value, field) {
        var currentanswers = allanswers;
        console.log("Newthing ", currentanswers);
        currentanswers[field] = value
        setAllAnswers(currentanswers)
        console.log(allanswers)
    }

    function handleSubmit(event) {
        if (event) event.preventDefault()
        const url = props.url;
        const formData = new FormData();
        formData.append('EMAIL', Base64.decode(emailid))
        
        for (var key in allanswers) {
            formData.append(key, allanswers[key]) 
        }
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        console.log(formData)
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                window.location.replace('/resetpasswordsuccess')
            } else {
                alert("Something went wrong. Please contact support.")
            }
        });

    }
    return (
        <div class="mb-3">
            <motion.form
                class="flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{duration:1}}
                onSubmit={handleSubmit}
              >
                <input class="bg-white text-black placeholder-gray-600 p-2 my-2 rounded-full" placeholder='Password:' type='password' onChange={(e) => setField(e.target.value, "password")}/>
                <input class="bg-white text-black placeholder-gray-600 p-2 my-2 rounded-full" placeholder='Confirm Password:' type='password' onChange={(e) => setField(e.target.value, "confirmpassword")}/>

                <button type='submit' class="w-full text-black bg-white p-2 my-3 rounded-full">RESET PASSWORD</button>
                {/* <a href='/forgottenpassword' class="w-full text-black text-xs bg-white p-1 my-1 rounded-full">FORGOT PASSWORD</a> */}
            </motion.form>
        </div>
    )
}

export function ForgotPassword(props) {
    const [allanswers, setAllAnswers] = React.useState(fillerprofiledata())
    
    function setField(value, field) {
        var currentanswers = allanswers;
        console.log("Newthing ", currentanswers);
        currentanswers[field] = value
        setAllAnswers(currentanswers)
        console.log(allanswers)
    }

    function handleSubmit(event) {
        if (event) event.preventDefault()
        const url = props.url;
        const formData = new FormData();
        for (var key in allanswers) {
            formData.append(key, allanswers[key]) 
        }
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        console.log(formData)
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                window.location.replace('/forgottenpasswordsubmitted')
            } else {
                alert("Something went wrong. Please contact support.")
            }
        });

    }
    return (
        <div class="mb-3">
            <motion.form
                class="flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{duration:1}}
                onSubmit={handleSubmit}
              >
                <input class="bg-white text-black placeholder-gray-600 p-2 my-2 rounded-full" placeholder='Email:' onChange={(e) => setField(e.target.value, "EMAIL")}/>

                <button type='submit' class="w-full text-black bg-white p-2 my-2 rounded-full">RECOVER ACCOUNT</button>
              </motion.form>
        </div>
    )
}

function Individual(props) {
    const [showallinfo, setShowAllInfo] = React.useState(false);
    const [thepackage, setPackage] = React.useState(props.item.package1)

    function handleSubmit() {
        var formdata = new FormData()
        formdata.append('EMAIL', props.item.fullname1)
        formdata.append('package', thepackage)
        
        const url = "/sirri_api/change_package"
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formdata, config).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                alert("Package changed.")
                window.location.reload()
            } 
        });
    }

    return (
        <div class="mt-3 mx-4 w-full flex flex-col justify-center items-center border border-white border-1 rounded-lg p-3">
            <img class="w-full mb-2" src={'/profilepic/0?EMAIL='+props.item.fullname1}/>
            <p class="text-white text-xs mb-1">{props.item.fullname1}</p>
            
            <div class='grid grid-cols-2 mt-1'>
                <select onChange={(e) => setPackage(e.target.value)} class="text-white border-white border-1 p-3 bg-black rounded-md text-xs w-full my-1">
                    <option>{props.item.package1}</option>
                    <option>Bronze</option>
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                    <option>Diamond</option>
                </select>
                
                <button onClick={() => handleSubmit()} class="text-white border-white border-1 p-3 bg-black rounded-md text-xs w-full my-1">Submit</button>
            </div>

            <a class="bg-red-800 text-white p-2 rounded-full w-full text-center" href={"/profile/"+Base64.encode(props.item.fullname1)}>Visit Profile</a>
            {showallinfo
                ? <>
                    {Object.keys(props.item).filter(function(indivkey) {
                        return ['__id', 'timestamp'].includes(indivkey) === false
                    }).map(function(item) {
                        const thequestion = props.allquestions.filter(function(question) {
                            return question.fieldid == item
                        });
                        if (thequestion.length > 0) {
                            return (
                                <div class="my-2">
                                    <p class="text-white text-base">{thequestion[0].question}:</p>
                                    <p class="text-white text-base">{props.item[item]}</p>
                                </div>
                            )
                        } else {
                            return (
                                <div class="my-2">
                                    <p class="text-white text-base">{item}:</p>
                                    <p class="text-white text-base">{props.item[item]}</p>
                                </div>
                            )
                        }
                    })}
                    <a class="bg-green-800 text-white mt-2 p-2 text-center" href={'/profile/'+Base64.encode(props.item.fullname1)}>VIEW PROFILE</a>
                  </>  
                : null
            }
        </div>
    )
}

export function WomenInfoPage() {
    const [menprofiles, setMenProfiles] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    
    function load() {
        setLoading(true)
        axios.post("/sirri_api/get_women").then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                setMenProfiles(response.data.acc)
                setLoading(false)
            } 
        });
    }

    React.useEffect(load, [])

    return (
        <div class="w-full">
            {loading
                ? <p class="text-base text-white">Loading</p>
                : <div class="w-full grid grid-cols-2">{menprofiles.sort((a, b) => a.timestamp - b.timestamp).map((item) => <Individual item={item}/>)}</div>
            }
        </div>
    )
}

export function MenSignupPage(props) {
    const [menprofiles, setMenProfiles] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    
    function load() {
        setLoading(true)
        axios.post("/sirri_api/get_men").then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                setMenProfiles(response.data.acc)
                setLoading(false)
            } 
        });
    }

    React.useEffect(load, [])

    return (
        <div>

            <Signup 
                url="https://expatelitesingles.com/sirri_api/store_data" 
                allquestions={props.questions}
                mensform={true}
                gender="Male"
            />
            
            {loading
                ? <p class="text-base text-white">Loading</p>
                : <div class="w-full grid grid-cols-3 md:grid-cols-5 gap-2">{menprofiles.sort((a, b) => a.timestamp - b.timestamp).map((item) => <Individual item={item} allquestions={props.questions}/>)}</div>
            }
        </div>
    )
}

export function MenDashboard(props) {
    const [menprofiles, setMenProfiles] = React.useState([])
    const [search, setSearch] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    
    function load() {
        setLoading(true)
        axios.post("/sirri_api/get_men").then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                setMenProfiles(response.data.acc)
                setLoading(false)
            } 
        });
    }

    React.useEffect(load, [])

    return (
        <div>
            <input class="bg-white text-black placeholder-gray-600 p-2 my-2  w-full rounded-full" placeholder="Search for a specific gentleman:" onChange={(e) => setSearch(e.target.value)}/>
            {loading
                ? <Loader/>
                : <div class="w-full grid grid-cols-2 md:grid-cols-5 gap-2">
                    {menprofiles.sort((a, b) => a.timestamp - b.timestamp).map(function(item){
                        if (search==="") {
                            return (
                                <Individual item={item} allquestions={props.questions}/>
                            )
                        } else {
                            if (item.fullname1.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <Individual item={item} allquestions={props.questions}/>
                                )
                            }
                        }
                    })}
                  </div>
            }
        </div>
    )
}

function IndividualIndividual(props) {
    const [thepackage, setPackage] = React.useState(props.item.package1)
    const [showdiagnosticinfo, setShowDiagnosticInfo] = React.useState(false)

    function handleSubmit() {
        var formdata = new FormData()
        formdata.append('EMAIL', props.item.EMAIL)
        formdata.append('package', thepackage)
        
        const url = "/sirri_api/change_package"
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formdata, config).then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                alert("Package changed.")
                window.location.reload()
            } 
        });
    }
    
    return (
        <div class="mt-3 mx-4 w-full flex flex-col justify-center items-center border border-white border-1 rounded-sm p-3">
            <img class="w-1/4 h-auto mb-2" src={'/profilepic/1?EMAIL='+props.item.EMAIL}/>

            <p class="text-white text-sm mb-1">Name: {props.item.fullname1} - {props.item.age1}</p>
            <p class="text-white text-xs mb-1">EMAIL: {props.item.EMAIL}</p> 
            
            <p class="text-white text-xs mb-1">Occupation: {props.item.currentoccupation1}</p>       
            <p class="text-white text-xs mb-1">Financial Background: {props.item.financialbackground1}</p>       
            <p class="text-white text-xs mb-1">Marital status: {props.item.familybackground4}</p> 

            {props.item.children1
                ? <>
                    {props.item.children1 === "Yes"
                        ? <p class="text-white text-xs mb-1">Kids: {props.item.howmanychildren2}</p>  
                        : <p class="text-white text-xs mb-1">No kids.</p>  
                    }   
                  </>
                : null
            }
            
            <div class='grid grid-cols-1 mt-1'>
                <button class="bg-red-800 text-white text-xs p-1 rounded-md text-center w-full" onClick={() => setShowDiagnosticInfo(!showdiagnosticinfo)}>{showdiagnosticinfo ? "Hide" : "Show"} Extra Info</button>
            </div>

            {showdiagnosticinfo
                ? <>
                    <p class="text-white text-xs mb-1">Phone: {props.item.phonenumber1}</p> 
                    <p class="text-white text-xs mb-1">Package: {props.item.package1}</p>
                    {props.item.lastlogin !== undefined
                        ? <>
                            <p class="text-white text-xs mb-1">Last Login: {calculateDaysHoursMinutes(props.item.lastlogin, Math.floor(Date.now() / 1000))}</p>
                            <p class="text-white text-xs mb-1">Signup: {calculateDaysHoursMinutes(props.item.timestamp, Math.floor(Date.now() / 1000))}</p>
                        </>
                        : <>
                            <p class="text-white text-xs mb-1">Last Login: Not tracking.</p>
                            <p class="text-white text-xs mb-1">Signup: {calculateDaysHoursMinutes(props.item.timestamp, Math.floor(Date.now() / 1000))}</p>
                        </>
                    } 

                    {props.item.last_messaged_timestamp !== undefined
                        ? <p class="text-white text-xs mb-1">Last message sent: {calculateDaysHoursMinutes(props.item.last_messaged_timestamp, Math.floor(Date.now() / 1000))}</p>
                        : <p class="text-white text-xs mb-1">Last message sent: Not tracking.</p>
                    }
                  </>
                : null
            } 
                        
            <div class='grid grid-cols-2 mt-2'>
                <a class="bg-red-800 text-white text-xs p-1 rounded-md text-center" href={"/profile/"+Base64.encode(props.item.EMAIL)}>Profile</a>
                <a class="bg-red-800 text-white text-xs p-1 rounded-md text-center" href={"/myprofile/"+Base64.encode(props.item.EMAIL)}>As she sees it</a>
            </div>

            <div class='grid grid-cols-2 mt-1'>
                <select onChange={(e) => setPackage(e.target.value)} class="text-white border-white border-1 p-3 bg-black rounded-md text-xs w-full my-1">
                    <option>{props.item.package1}</option>
                    <option>Bronze</option>
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                    <option>Diamond</option>
                </select>
                
                <button onClick={() => handleSubmit()} class="text-white border-white border-1 p-3 bg-black rounded-md text-xs w-full my-1">Submit</button>
            </div>
        </div>
    )
}


export function PurgatoryActivations() {
    const [profiles, setProfiles] = React.useState([])
    const [activatedprofiles, setActivatedProfiles] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [search, setSearch] = React.useState('');
    const [search2, setSearch2] = React.useState('');
    
    function load() {
        setLoading(true)
        axios.post("/sirri_api/get_purgatory").then((response) => {
            console.log(response.data);
            if (response.data.responsecode === 200) {
                setProfiles(response.data.acc)
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

    React.useEffect(load, [])

    return (
        <div class="flex flex-col items-center justify-center">
            <a class="bg-red-800 text-white p-2 rounded-full text-xl my-2" href={"/sirri_api/mensdashboard"}>Change Mens Packages</a>
            <input class="bg-white text-black placeholder-gray-600 p-2 my-2  w-full rounded-full" placeholder="Search for a specific woman:" onChange={(e) => setSearch2(e.target.value.toLowerCase())}/>

            {profiles.length === 0 ? null
                : <p class="text-2xl text-white mt-2">Activatable Profiles</p>
            }

            {loading
                ? <p class="text-base text-white">Loading</p>
                : <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
                    {profiles.sort((a, b) => a.timestamp - b.timestamp).map(function (item) {
                        if ((item.fullname1.includes(search2)) || (item.EMAIL.includes(search2)) || search2 === '') {
                            return (
                                <div class="mt-3 mx-4 w-full flex flex-col justify-center items-center border border-white border-1 rounded-sm p-3">
                                    <img class="w-1/4 h-auto mb-2" src={'/profilepic/1?EMAIL='+item.EMAIL}/>
                                    
                                    <p class="text-white text-sm mb-1">Name: {item.fullname1} - {item.age1}</p>
                                    <p class="text-white text-xs mb-1">EMAIL: {item.EMAIL}</p>       
                                    <p class="text-white text-xs mb-1">Occupation: {item.currentoccupation1}</p>       
                                    <p class="text-white text-xs mb-1">Financial background: {item.financialbackground1}</p>       
                                    <p class="text-white text-xs mb-1">Marital status: {item.familybackground4}</p>       
                                    {item.children1
                                        ? <>
                                            {item.children1 === "Yes"
                                                ? <p class="text-white text-xs mb-1">Kids: {item.howmanychildren2}</p>  
                                                : <p class="text-white text-xs mb-1">No kids.</p>  
                                            }   
                                        </>
                                        : null
                                    }   
                                    
                                    <a class="bg-red-800 text-white p-2 rounded-full w-full text-center" href={"/sirri_api/activate/"+item.EMAIL}>ACTIVATE</a>
                                </div>
                            )
                        }
                    })}
                  </div>
            }

            <p class="text-2xl text-white mt-5">Activated Profiles</p>
            <input class="bg-white text-black placeholder-gray-600 p-2 my-2  w-full rounded-full" placeholder="Search for a specific woman:" onChange={(e) => setSearch(e.target.value.toLowerCase())}/>
            {loading
                ? <p class="text-base text-white">Loading</p>
                : <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-2">
                    {activatedprofiles.sort((a, b) => a.timestamp - b.timestamp).map(function(item) {
                        if ((item.fullname1.includes(search)) || item.EMAIL.includes(search) || search === "") {
                            return <IndividualIndividual item={item}/>
                        }
                    })}
                  </div>
            }
        </div>
    )
}