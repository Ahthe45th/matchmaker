import React from 'react';

import Number1 from "./reviews/Number1.mp4";
import Number2 from "./reviews/Number2.mp4";
import Number3 from "./reviews/Number3.mp4";
import Number4 from "./reviews/Number4.mp4";
import Number5 from "./reviews/Number5.mp4";
import Number6 from "./reviews/Number6.mp4";
import Number7 from "./reviews/Number7.mp4";
import Number8 from "./reviews/Number8.mp4";
import Number9 from "./reviews/Number9.mp4";
import Number10 from "./reviews/Number10.mp4";
import Number11 from "./reviews/Number11.mp4";
import Number12 from "./reviews/Number12.mp4";
import Number13 from "./reviews/Number13.mp4";
import Number14 from "./reviews/Number14.mp4";
import Number15 from "./reviews/Number15.mp4";
import Number16 from "./reviews/Number16.mp4";

const alltestimonials = [
    Number1, Number2, Number3,
    Number4, Number5, Number6,
    Number7, Number8, Number9,
    Number10, Number11, Number12,
    Number13, Number14, Number15,
    Number16
]

function Carousel(props) {
    const [currentstep, setCurrentStep] = React.useState(0)
    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);
    const [visible, setVisible] = React.useState(false)

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

    React.useEffect(function(){
        setCurrentStep(0)
    }, [])

    return (
        <div class="flex flex-col justify-center items-center overflow-x-hidden w-full"
            onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
            onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
            onTouchEnd={() => handleTouchEnd()}
        >
                            {props.items.map(function(item, index) {
                                return (
                                    <div class="flex flex-col justify-center items-center" key={index}>
                                            <video class="w-5/6 md:w-1/3 h-auto" style={currentstep === index ? {}:{'display':'none'}} preload='metadata' controls
                                                    onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
                                                    onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
                                                    onTouchEnd={() => handleTouchEnd()}
                                                    onMouseDown={mouseDownEvent => handleDesktopStart(mouseDownEvent)}
                                                    onMouseMove={mouseMoveEvent => handleDesktopMove(mouseMoveEvent)}
                                                    onMouseUp={() => handleTouchEnd()}
                                            >
                                                <source src={item+"#t=3"} type="video/mp4"/>
                                                Your browser does not support the video tag.
                                            </video>
                                    </div>
                                )
                            })}
                <p class="mt-3 text-sm md:text-xl text-white uppercase text-center">Swipe {'>'}</p>
        </div>
    )
}

export default class TestimonialComponent extends React.Component {

    render() {
      return (
            <Carousel items={alltestimonials}/>
        )
    }
}