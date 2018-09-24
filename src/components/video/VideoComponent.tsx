import * as React from "react";
import {ReactElementProps} from "../../common/react-interfaces";
import {classNameFrom} from "../../utils/CSSUtils";
import {formatTime} from "../../utils/TimeUtils";
import "./video.css";
import {Video} from "bigfootJS/dist/Video";

interface VideoProps extends ReactElementProps {
    video: Video;
}

const VideoComponent = ({className, video}: VideoProps) => {
    let _className = `VideoComponent ${classNameFrom(className)}`;
    return (
        <div className={_className}>
            <h3>
                {video.id}
            </h3>
            <p>Duration: {formatTime((video.framesTotal / video.timecodeRate) | 0)}</p>
        </div>
    );
};

export default VideoComponent;