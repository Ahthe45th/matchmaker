import React from 'react'; 

import Intro from "../components/howitworks/INTRO.mp4";
import GettingStarted from "../components/howitworks/GETTINGSTARTED.mp4";
import Pricing from "../components/howitworks/PRICING.mp4";

import { Link, useParams } from 'react-router-dom';

const FirstCarousel = [
    Intro
]
const SecondCarousel = [
    GettingStarted
]

const ThirdCarousel = [
    Pricing
]

const allcarousels = [
    {items:FirstCarousel, name:"Introduction", css:"mx-4 w-full px-8 py-4 my-3 bg-gradient-to-r from-indigo-400 to-cyan-400 text-black text-xs text-center md:text-xl font-bold flex items-center justify-center"}, 
    {items:SecondCarousel, name:"Getting Started", css:"mx-4 w-full px-8 py-4 my-3 bg-gradient-to-r from-teal-400 to-gray-800 text-white text-xs text-center md:text-xl font-bold flex flex-col items-center justify-center"}, 
    {items:ThirdCarousel, name:"Pricing", css:"mx-4 w-full px-4 py-4 my-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs text-center md:text-xl font-bold flex items-center justify-center"}, 
]

function Carousel(props) {
    const [currentstep, setCurrentStep] = React.useState(0)
    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);
    
    function handleTouchStart(e) {
        setTouchStart(e.targetTouches[0].clientX);
    }

    function handleTouchMove(e) {
        setTouchEnd(e.targetTouches[0].clientX);
    }

    function swiperight() {
        var nextstep = currentstep+1
        if (nextstep<props.items.length) {
            setCurrentStep(currentstep+1)
        } else {
            setCurrentStep(0)
        }
    }

    function swipeleft() {
        var nextstep = currentstep-1
        if (nextstep>0) {
            setCurrentStep(nextstep)
        } else {
            setCurrentStep(0)
        }
    }

    function handleTouchEnd() {
        if (touchStart - touchEnd > 75) {
            // do your stuff here for left swipe
            swiperight()
        }

        if (touchStart - touchEnd < -75) {
            // do your stuff here for right swipe
            swipeleft()
        }
    }

    function handleDesktopStart(e) {
        setTouchStart(e.clientX);
    }

    function handleDesktopMove(e) {
        setTouchEnd(e.clientX);
    }

    return (
        <div class="flex flex-col justify-center items-center overflow-x-hidden w-full"
            onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
            onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
            onTouchEnd={() => handleTouchEnd()}
            onMouseDown={mouseDownEvent => handleDesktopStart(mouseDownEvent)}
            onMouseMove={mouseMoveEvent => handleDesktopMove(mouseMoveEvent)}
            onMouseUp={() => handleTouchEnd()}
            onMouseLeave={() => handleTouchEnd()}
            onClick={() => swiperight()}
        >
                <div class="flex flex-col justify-center items-center">
                    <video class="w-5/6 md:w-1/3 h-auto" preload='metadata' controls
                    >
                        <source src={props.items[0]} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </div>
                {/* <p class="text-sm md:text-xl text-white uppercase text-center">Click or Swipe {'>'}</p>  */}
        </div>
    )
}

export default function HowItWorks() {
    const [currentstep, setCurrentStep] = React.useState(0)
    const [visible, setVisible] = React.useState(false)

    return (
            <div class="mt-32 md:mt-0 flex flex-col items-center justify-center w-full h-full">
                {allcarousels.map(function(item, index) {
                    return (
                        <Link class={item.css} to={'/howitworks/'+item.name} key={index}>
                            {item.name}
                        </Link>
                    )
                })}
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