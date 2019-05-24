import React from "react";
import classes from "./Coach.module.css";
import { TweenMax,  } from "gsap/all";
import { Transition } from "react-transition-group";
import ContentPage from "../ContentPage/ContentPage";

const startState = { autoAlpha: 0, y: -50};

const coach = (props) => {
 
  return (
  
  <Transition
    unmountOnExit
    in={props.show}
    timeout={1000}
    onEnter={node => TweenMax.set(node, startState)}
    addEndListener={ (node, done) => {
      TweenMax.to(node, 0.5, {
        autoAlpha: props.show ? 1 : 0,
        y: props.show ? 0 : 50,
        // ease: Power3.easeOut,
        onComplete: done
      });
    }}
  >  
  <div className={classes.Coach} >
    <div className={classes.Opacity} style={
      {backgroundColor: `rgba(0,0,0, ${props.percentage/50})` }
    }> </div>
    <ContentPage scrollTop={props.percentage}/>
  </div>
  
  </Transition>
  
  
  
 
  );
};

export default coach;
