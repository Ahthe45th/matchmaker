import React from 'react';

export default function PassResetLinkToBeRecieved() {
    
    return (
        <div>
            <p class="text-xl text-white">If your email is in our database you'll recieve a password reset email.</p>
        </div>
    )
}

export function PassResetSuccessful() {

    return (
        <div>
            <p class="text-xl text-white">Your password has been successfully reset! You can now <a href='/login' class="text-blue-500">login</a></p>
        </div>
    )
}