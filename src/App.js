import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import "./App.css"
// import MenComponent from "./components/mens.js";
// import FaqComponent from "./components/faqs.js";
// import TestimonialComponent from './components/testimonials.js';
// import FormComponent from './components/menimagesform.js';
// import AuthEntrypage, { AuthAdd } from './components/auth.js';
// import Signup, { ForgotPassword, GoogleEnabledLogin, Login, MenDashboard, MenSignupPage, PurgatoryActivations, Resettingpassword, WomenInfoPage } from './components/signup.js'
// import RegistrationSuccess from './components/registrationucess.js';
// import LoginPlease, { EditsSuccessful, VerificationFailed, VerificationSuccessful } from './components/loginsignupplease.js';
// import { malequestions, femalequestions } from './components/misc.js';
// import Profile, { PersonalProfile } from './components/profile.js';
import IndexPage from './pages/IndexPage.js';
// import HowItWorks, { HowItWorksSpecificCarousel } from './pages/HowItWorks.js';
// import Terms from './pages/Terms.js';
// import AllChats, { SpecificPersonsChat, SpecificPersonsChatAsMan } from './pages/Chats.js';
// import PassResetLinkToBeRecieved, { PassResetSuccessful } from './components/forgottenpassword.js';
// import ReCAPTCHA from 'react-google-recaptcha';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import PrivacyPolicy from './pages/PrivacyPolicy.js';

function App() {
    console.log('The app component is rendering.')
    return (
        // <GoogleOAuthProvider clientId="712037829667-sclerk28eeptlbdtad4o02okjoh6mjm8.apps.googleusercontent.com">
        <Router>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                {/* <Route path="/howitworks" element={<HowItWorks />} />
                <Route path="/howitworks/:thecarousel" element={<HowItWorksSpecificCarousel />} />
                <Route path="/login" element={<GoogleEnabledLogin url="/passcheck" />} />
                <Route path="/recaptcha" element={<ReCAPTCHA sitekey={"6LfTO2YqAAAAAEJnKMWW2zz_wK972wr7z4yZEVSh"} />} />
                <Route path="/forgottenpassword" element={<ForgotPassword url="/api/forgottenpassword" />} />
                <Route path="/resetpassword/:emailid" element={<Resettingpassword url="/api/resettingpassword" />} />
                <Route path="/resetpasswordsuccess" element={<PassResetSuccessful />} />
                <Route path="/forgottenpasswordsubmitted" element={<PassResetLinkToBeRecieved />} />
                <Route path="/forgottenpassword" element={<ForgotPassword url="/api/forgottenpassword" />} />
                <Route path="/men" element={<MenComponent />} />
                <Route path="/alltestimonials" element={<TestimonialComponent />} />
                <Route path="/faq" element={<FaqComponent />} />
                <Route path="/registrationsuccess" element={<RegistrationSuccess />} />
                <Route path="/loginplease" element={<LoginPlease />} />
                <Route path="/editssuccessful" element={<EditsSuccessful />} />

                <Route path="/html/signup_form.html" element={<Signup url="https://expatelitesingles.com/api/store_data" allquestions={femalequestions} gender="Female"/>} />
                <Route path="/html/authcode.html" element={<AuthEntrypage />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />

                <Route path="/profile/:profileid" element={<Profile />} />
                <Route path="/myprofile/:profileid" element={<PersonalProfile />} />

                <Route path="/sirri_api/men_images_form" element={<FormComponent />} />
                <Route path="/sirri_api/mensdashboard" element={<MenDashboard />} />
                <Route path="/sirri_api/mensignup.html" element={<MenSignupPage questions={malequestions} gender="Male"/>} />
                <Route path="/sirri_api/activations" element={<PurgatoryActivations/>} />
                <Route path="/sirri_api/womeninfo" element={<WomenInfoPage />} />
                <Route path="/sirri_api/addauth" element={<AuthAdd />} />
                <Route path="/sirri_api/chats" element={<AllChats />} />
                <Route path="/sirri_api/chat/:email" element={<SpecificPersonsChat />} />
                <Route path="/sirri_api/chatasman/:email" element={<SpecificPersonsChatAsMan />} />
                
                <Route path="/verificationsuccessful" element={<VerificationSuccessful />} />
                <Route path="/verificationfailed" element={<VerificationFailed />} /> */}
            </Routes>
        </Router>
        // </GoogleOAuthProvider>
    );
}

export default App;