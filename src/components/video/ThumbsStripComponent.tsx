import {FrameStrip, Strip} from "../../model/ThumbsStrip";
import * as React from "react";
import "./video.css";

interface Props {
    strips: Map<FrameStrip, Strip>[],
    width: number,
    height: number

    getImage (frame: number): Promise<HTMLImageElement>
}

class ThumbsStripComponent extends React.Component<Props, any> {

    setupCanvas = (canvas: HTMLCanvasElement) => {
        const {strips, getImage} = this.props;
        if (!canvas || !strips.length) {
            return;
        }
        const ctx = canvas.getContext('2d');
        for (const strip of strips) {
            const images = [...strip.keys()].map((src, i) => {
                let dest = strip.get(src);
                getImage(src.startFrame).then(img => {
                    ctx.drawImage(img, src.x, src.y, src.width, src.height, dest.x, dest.y, dest.width, dest.height);
                });
            });
        }

    };

    render () {
        const {width, height} = this.props;
        return <div className={"ThumbsStripComponent"}>
            <canvas ref={this.setupCanvas} width={width} height={height}/>
        </div>
    }
}

export default ThumbsStripComponent;