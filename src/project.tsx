import * as ReactDOM from "react-dom";
import * as React from "react";
import DiffReport from "./DiffReport";
import DiffReportsApi from "./model/DiffReportsApi";
import {DiffRange} from "bigfootJS/dist/DiffRange";
import {Video} from "bigfootJS/dist/Video";

interface Props {
    ranges: DiffRange[],
    sourceVideo: Video,
    comparedVideo: Video,
    projectId: string
}

export const App = ({ranges, sourceVideo, comparedVideo, projectId}: Props) => {
    let api = new DiffReportsApi(projectId);
    return (<DiffReport comparedVideo={comparedVideo} ranges={ranges} sourceVideo={sourceVideo}
                        getImage={api.getImage.bind(api)}/>);
};

function diffReport (ranges: DiffRange[], sourceVideo: Video, comparedVideo: Video, projectId: string) {
    const app = document.getElementById("app");
    ReactDOM.hydrate(<App projectId={projectId} comparedVideo={comparedVideo} ranges={ranges}
                          sourceVideo={sourceVideo}/>, app);
}


if (typeof window != "undefined") {
// @ts-ignore
    window.diffReport = diffReport;
}


