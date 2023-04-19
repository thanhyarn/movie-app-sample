import React from 'react'
import { useState, useEffect } from 'react';

const Slide = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((currentSlide + 1) % 4);
        }, 3000)
        return () => clearInterval(interval)
    }, [currentSlide])
    return (
        <div className='slider-container'>
            <div className='slider'>
                <div className='slides'>
                    <input type='radio' name='radio-btn' id='radio1' checked={currentSlide === 0} onClick={() => setCurrentSlide(0)} />
                    <input type='radio' name='radio-btn' id='radio2' checked={currentSlide === 1} onClick={() => setCurrentSlide(1)} />
                    <input type='radio' name='radio-btn' id='radio3' checked={currentSlide === 2} onClick={() => setCurrentSlide(2)} />
                    <input type='radio' name='radio-btn' id='radio4' checked={currentSlide === 3} onClick={() => setCurrentSlide(3)} />

                    <div className='slide first' >
                        <img src='/img/banner1.jpg' />
                    </div>
                    <div className='slide' >
                        <img src='/img/banner2.jpg' />
                    </div>
                    <div className='slide' >
                        <img src='/img/banner3.jpg' />
                    </div>
                    <div className='slide' >
                        <img src='/img/banner4.jpg' />
                    </div>

                    <div className='navigation-auto'>
                        <div className='auto-btn1'></div>
                        <div className='auto-btn2'></div>
                        <div className='auto-btn3'></div>
                        <div className='auto-btn4'></div>
                    </div>
                </div>
                <div className='navigation-manual'>
                    <label for="radio1" className='manual-btn'></label>
                    <label for="radio2" className='manual-btn'></label>
                    <label for="radio3" className='manual-btn'></label>
                    <label for="radio4" className='manual-btn'></label>
                </div>
            </div>
        </div>
    )
}

export default Slide