import React from 'react'; 

import { Link, useParams } from 'react-router-dom';



export default function Terms() {
    const [currentstep, setCurrentStep] = React.useState(0)
    const [visible, setVisible] = React.useState(false)

    return (
            <div class="mt-32 md:mt-0 flex flex-col items-center justify-center w-full h-full">
                <div class="text-white p-6 lg:p-10">
                <h1 class="text-3xl font-bold mb-6">Terms of Use</h1>

                <p class="mb-4">
                    By accessing, signing up, and using expatelitesingles.com, you acknowledge and agree to these terms of use.
                </p>

                <p class="mb-4">
                    These terms of use, along with our community guidelines, privacy policy, and cookie policy, define the general conditions that apply to your use of the expatelitesingles.com website and any related services.
                </p>

                <h2 class="text-2xl font-semibold mt-6 mb-4">Your Commitment to Us</h2>
                <p class="mb-4">
                    You assert that you are at least 18 years of age and that you agree to adhere to our community guidelines. Any breach of these requirements may result in the temporary suspension or removal of your user account at our sole discretion.
                </p>

                <p class="mb-4">
                    You agree that no person on expatelitesingles.com can be forced to communicate or engage with you, and expatelitesingles.com bears no liability in this respect. You will not query delayed responses or the inability to view your messages.
                </p>

                <p class="mb-4">
                    You are only able to communicate with users on the same or lower package as yours. To interact with users on higher packages, an upgrade is required.
                </p>

                <p class="mb-4">
                    Matches are generated based on your spouse preferences and the answers you provide in the Q&A. Matches may change with each upgrade, and are based on an 80-95% match objective.
                </p>

                <h2 class="text-2xl font-semibold mt-6 mb-4">Important Note</h2>
                <p class="mb-4">
                    The specifics of account operations will be outlined by your 24/7 WhatsApp Customer Service Team when you access your account and periodically thereafter.
                </p>

                <h2 class="text-2xl font-semibold mt-6 mb-4">Our Commitment to You</h2>
                <p class="mb-4">
                    expatelitesingles.com is provided on an as-is basis with no guarantees or warranties. We aim to provide a high-quality service with minimal technical downtime and timely responses to queries.
                </p>

                <h2 class="text-2xl font-semibold mt-6 mb-4">Communicating with Other Users</h2>
                <p class="mb-4">
                    You are expected to conduct yourself respectfully when communicating with other users. Never send money or disclose personal information to people you do not know.
                </p>

                <p class="mb-4">
                    If you agree to meet someone in person, choose a public location and take appropriate precautions. These meetings are at your own risk.
                </p>

                <h2 class="text-2xl font-semibold mt-6 mb-4">Website Content</h2>
                <p class="mb-4">
                    Any data you post on expatelitesingles.com, including profile text and photos, becomes our property. We are not responsible for third-party content or user posts.
                </p>

                <h2 class="text-2xl font-semibold mt-6 mb-4">Canceling Your Account</h2>
                <p class="mb-4">
                    You have the right to terminate your user account at any time. No refunds are payable under any circumstances.
                </p>

                <h2 class="text-2xl font-semibold mt-6 mb-4">Verification of Users</h2>
                <p class="mb-4">
                    We verify users to the best of our ability but are not liable for false information provided.
                </p>

                <h2 class="text-2xl font-semibold mt-6 mb-4">Subscriptions and Charges</h2>
                <p class="mb-4">
                    Subscriptions can be terminated at any time without refunds. Inform us promptly of any errors, but note that refunds are not provided under any circumstances.
                </p>

                <h2 class="text-2xl font-semibold mt-6 mb-4">Variance</h2>
                <p class="mb-4">
                    expatelitesingles.com reserves the right to modify these terms or transfer liability without notice.
                </p>
                </div>

            </div>
    )
}

export function HowItWorksSpecificCarousel() {
    const { thecarousel } = useParams() 

    return (
        <div class="w-full">
            <div class="flex flex-col items-center justify-between w-full">
                <Link class="mx-4 w-full px-8 py-4 my-3 bg-gradient-to-r from-white to-gray-400 text-black text-xs text-center md:text-xl font-bold flex items-center justify-center" to='/howitworks'>
                    Go Back
                </Link>
            </div>

            <div>
                {allcarousels.map(function(item, mainindex) {
                    if (item.name===thecarousel) {
                        return (
                            <div key={mainindex} class="my-3 w-full">
                                <Carousel items={item.items} mainindex={mainindex}/>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}