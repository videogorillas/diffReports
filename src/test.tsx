import * as ReactDOM from "react-dom";
import * as React from "react";
import {DiffRange} from "./model/DiffRange";
import {IVideo} from "./model/Video";
import DiffTimeline from "./components/ranges/DiffTimeline";
import DiffReportsApi from "./model/DiffReportsApi";

interface Props {
    ranges: DiffRange[],
    sourceVideo: IVideo,
    comparedVideo: IVideo,
    api: DiffReportsApi
}

export const TestPage = ({ranges, sourceVideo, comparedVideo, api}: Props) => {
    return <DiffTimeline comparedVideo={comparedVideo} ranges={ranges} sourceVideo={sourceVideo}
                         getImage={api.getImage.bind(api)} rangeSelected={(r) => console.log(r)}/>
};

function diffReport (ranges: DiffRange[], sourceVideo: IVideo, comparedVideo: IVideo, projectId: string) {
    let api = new DiffReportsApi(projectId);
    const app = document.getElementById("app");
    ReactDOM.hydrate(<TestPage comparedVideo={comparedVideo} ranges={ranges} sourceVideo={sourceVideo}
                               api={api}/>, app);
}

if (typeof window != "undefined") {
// @ts-ignore
    window.diffReport = diffReport;
}