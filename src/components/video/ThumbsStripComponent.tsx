import ThumbsStrip, {Strip} from "../../model/ThumbsStrip";
import * as React from "react";
import "./video.css";

interface Props {
    getSrc: (page: number) => string;
    thumbsStrip: ThumbsStrip;
    startFrame: number;
    endFrame: number;
}

class ThumbsStripComponent extends React.Component<Props, any> {

    setupCanvas = (canvas: HTMLCanvasElement) => {
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');
        const {thumbsStrip, startFrame, endFrame, getSrc} = this.props;

        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        const strips: { [page: string]: Strip[] } = thumbsStrip.stripsForFrames(startFrame, endFrame);
        let dx = 0;

        const images = Object.keys(strips).map((page, i) => {
            const img = new Image();
            img.src = getSrc(+page);
            img.onload = () => {
                for (const strip of strips[page]) {
                    ctx.drawImage(img, strip.x, strip.y, strip.width, strip.height, dx, 0, strip.width, strip.height);
                    dx += strip.width;
                }
            };
            return img;
        });

    };

    render () {
        const {thumbsStrip, startFrame, endFrame, getSrc} = this.props;
        const width = thumbsStrip.frameWidth * (endFrame - startFrame + 1);
        const height = thumbsStrip.frameHeight;
        return <div className={"ThumbsStripComponent"}>
            <canvas ref={this.setupCanvas} width={width} height={height}/>
        </div>
    }
}

export default ThumbsStripComponent;