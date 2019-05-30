import React from 'react';
import image from '../../../../image/display.png';
import logo from '../../../../image/wheel-logo.png';
import classes from './Display.module.css';
import { TweenMax } from 'gsap/all';

class display extends React.Component {
    constructor(props) {
        super(props);
        this.display = null;
    }

    componentDidMount() {
        TweenMax.from(this.display, 2, {
            y: 300,
            opacity: 0,
            scale: 0.9,
        });
    }

    render() {
        return (
            <div className={classes.Display} ref={el => (this.display = el)}>
                <figure>
                    <img src={logo} alt="wheel" />
                </figure>
                <img src={image} alt="..." />
            </div>
        );
    }
}

export default display;
