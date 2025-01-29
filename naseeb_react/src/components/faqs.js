import React from 'react';

export default function FaqComponent() {
    let faqs = [
        {question: "How long has expatelitesingles.com been in existence?", answer: "Eight years and counting."},
        {
            question: "I came here via a page on Instagram that is with a different name, how does that work?", 
            answer: "expatelitesingles.com is the main website and through which gentlemen as they become expatriates are advertised to via YouTube and Facebook. Then we partner with local entities who run individual Instagram pages in their respective counties who earn based on a commission."
        },
        {
            question: "I'm 35 a divorcee with three children do I stand a chance here?", 
            answer: "Yes, 42% of our users are divorcees with children."
        },
        {
            question: "What is the breakdown of female users on expatelitesingles.com?", 
            answer: "42% divorcees with children, 12% single never married - no children, 29% single mothers never married, 7% widows and 10% ladies in relationships looking to get out."
        },
        {
            question: "What should I know about dating an African woman with the intention of marriage?", 
            answer: (
                <>
                (a) Be clear about your intentions early on <br/>
                (b) don't rush it, get to know her properly <br/>
                (c) if you like her, be her friend <br/>
                (d) make it about her family. In the African context marriage is between families.
                </>
            )
        },
        {
            question: "Should I have sex with her before I marry her?", 
            answer: "That's upto you. But don't string her along. Be respectful to her realizing that sex should be not about satisfying desires but more about building love for long term purposes."
        },
        {
            question: "When should I ask her to marry me?", 
            answer: "As soon as you are ready."
        },
        {
            question: "Package prices are quoted in dollars but I want to pay in my local currency, what do I do?", 
            answer: "Unless otherwise informed by the 24/7 WhatsApp Customer Service Team they will have to convert the dollar rate of the day into you local currency and you then pay in dollars."
        },
        {
            question: "Package prices are quoted in dollars but I want to pay in my local currency, what do I do?", 
            answer: "Unless otherwise informed by the 24/7 WhatsApp Customer Service Team they will have to convert the dollar rate of the day into you local currency and you then pay in dollars."
        },
        { question: "He is taking so long to respond can't you do something?", answer: "As you were told in the advisory. Nobody can be forced to like you, talk to you or marry you. Be patient or move on." },
        { question: "She has sent me twenty messages but I don't like her. What do I do?", answer: "Ignore her. Desperation is never a good sign." },
        { question: "Do I have to make the first move or can he make the first move?", answer: "This is an open space. Sometimes the man moves first. Sometimes the lady moves first." },
        { question: "How long does it take to get a husband here?", answer: "It depends. These are matters of the heart. Generally if you are active on the site six months. Otherwise up to a year." },
        { question: "I've looked at the packages and prices for women and they are less than half of the price we men pay. Why is that?", answer: "Because we have to vet the men before you can use the service. That is why a woman's account can be activated in less than 24 hours and a man's takes 72 hours. Verification costs." },
        { question: "I want to put up more than one picture so he can see all my beauty.", answer: "And you can." },
        { question: "How do I amend my profile?", answer: "You can't amend your answers to questions. For profile matters, click on edit profile and amend as you please." },
        { question: "A gentleman has sent me a message. I like his profile. I like him. But I can't reply. Help me?", answer: "You are able to access people on the same package as yours and those on packages below yours. The gentleman who messaged you must be on a package higher than yours. To respond to him, you would need to be on the same package as his." },
        { question: "When you indicate number of bachelors and give a number is that how many I can message plus those that message me?", answer: "No. That is the number that you can message. Those that message you we don't count. That is counted on their side." }
    ]
      return (
            <ul class="w-full text-white mx-auto my-6 divide-y shadow shadow-blue-600 rounded-xl">
                {faqs.map(function (item) {
                    return (
                        <li>
                            <details class="group">
                                <summary class="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                                    <svg class="w-5 h-5 text-white transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                        </path>
                                    </svg>
                                    <span>{item.question}</span>
                                </summary>
            
                                <article class="px-4 pb-4">
                                    <p>
                                    {item.answer}
                                    </p>
                                </article>
                            </details>
                        </li>
                    )
                })}
            </ul>
        )
}