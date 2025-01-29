import React from 'react';
import axios from 'axios';

export default function LoginPlease() {
    return (
        <div>
            <p class="text-xl text-white">Please <a class="text-blue-500" href='/login'>login</a> or <a class="text-blue-500" href='/signup'>sign up</a> to view this profile.</p>
        </div>
    )
}

export function EditsSuccessful() {

    React.useEffect(function () {
        setTimeout(function () {
            window.location.replace('/login')
        }, 5000)
    }, [])

    return (
        <div>
            <p class="text-xl text-white">Your profile has been updated successfully. You can log in again. You will be redirected in 5 seconds. If that doesn't happen. Please click <a href='/login' class="text-blue-500">here</a></p>
        </div>
    )
}

export function VerificationSuccessful() {

    React.useEffect(function () {
        setTimeout(function () {
            window.location.replace('/login')
        }, 5000)
    }, [])

    return (
        <div>
            <p class="text-xl text-white">Your account email has been verified successfully. You can log in again. You will be redirected in 5 seconds. If that doesn't happen. Please click <a href='/login' class="text-blue-500">here</a></p>
        </div>
    )
}

export function VerificationFailed() {

    React.useEffect(function () {
        setTimeout(function () {
            window.location.replace('/')
        }, 5000)
    }, [])

    return (
        <div>
            <p class="text-xl text-white">Your account verification has failed. Please contact support. You will be redirected in 5 seconds. If that doesn't happen. Please click <a href='/login' class="text-blue-500">here</a></p>
        </div>
    )
}