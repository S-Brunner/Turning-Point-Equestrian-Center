import React from "react";
import { animated, useSpring } from "react-spring";

const TimeAnimation = ({ delay, loading, children }) => {

    const styles = useSpring({
        to: {transform: "translatey(0%)", opacity: 1},
        from: {transform: "translatey(500%)", opacity: 0 },
        reverse: loading,
        delay: delay,
        config : {
            duration: 375,
        }
    })

    return(
        <animated.div style={styles} >
            {children}
        </animated.div>
    )
    
}

export default TimeAnimation;