import React from 'react'; 
import { Link, useParams } from 'react-router-dom';

export default function PrivacyPolicy() {
    return (
            <div class="mt-32 md:mt-0 flex flex-col items-center justify-center w-full h-full">
                <div class="text-white p-6 lg:p-10">
                <h1 class="text-4xl font-bold text-center text-blue-600 mb-6">Privacy Policy</h1>

                <p class="text-sm text-gray-500 text-center mb-8">Effective Date: <span class="font-semibold">20/10/2017</span></p>

                <div class="space-y-8">
                <section>
                    <h2 class="text-2xl font-semibold text-gray-700 mb-4">1. Information We Collect</h2>
                    <ul class="list-disc list-inside text-gray-600 space-y-2">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, and your spousal preferences.</li>
                    <li><strong>Usage Data:</strong> Information about how you interact with our platform, such as pages visited, session duration, and device information.</li>
                    <li><strong>Cookies:</strong> Small data files stored on your device to enhance your experience.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-gray-700 mb-4">2. How We Use Your Information</h2>
                    <ul class="list-disc list-inside text-gray-600 space-y-2">
                    <li>Provide and maintain our services.</li>
                    <li>Improve user experience and develop new features.</li>
                    <li>Communicate with you regarding updates, promotions, and support.</li>
                    <li>Comply with legal obligations and resolve disputes.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-gray-700 mb-4">3. Sharing Your Information</h2>
                    <p class="text-gray-600">
                    We do not sell or rent your personal information to third parties. However, we may share data with trusted partners to:
                    </p>
                    <ul class="list-disc list-inside text-gray-600 space-y-2 mt-2">
                    <li>Facilitate services on our behalf (e.g., hosting providers).</li>
                    <li>Comply with legal requests or protect our legal rights.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-gray-700 mb-4">4. Data Security</h2>
                    <p class="text-gray-600">
                    We use industry-standard measures to protect your personal information from unauthorized access, disclosure, or alteration.
                    However, no method of transmission over the internet is 100% secure.
                    </p>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-gray-700 mb-4">5. Your Rights</h2>
                    <ul class="list-disc list-inside text-gray-600 space-y-2">
                    <li>Access and update your personal information.</li>
                    <li>Request deletion of your data, subject to legal obligations.</li>
                    <li>Opt out of marketing communications.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-gray-700 mb-4">6. Third-Party Links</h2>
                    <p class="text-gray-600">
                    Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
                    </p>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-gray-700 mb-4">7. Changes to This Policy</h2>
                    <p class="text-gray-600">
                    We reserve the right to update this Privacy Policy at any time. We will notify you of significant changes by posting an updated version on our platform.
                    </p>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-gray-700 mb-4">8. Contact Us</h2>
                    <p class="text-gray-600">
                    If you have any questions or concerns about this Privacy Policy, please contact us at:
                    </p>
                    <ul class="list-none text-gray-600 mt-2">
                    <li><strong>Phone:</strong> +1 908 897 1181</li>
                    </ul>
                </section>
                </div>
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