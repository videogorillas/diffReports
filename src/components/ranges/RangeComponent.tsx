import {Range} from "../../model/Range";
import * as React from "react";
import "./range.css";

interface Props {
    range: Range
}

export const RangeComponent = ({range}: Props) => {

    return (
        <ul className={"range"}>
            <li>frame: {range.frame}</li>
            <li>length: {range.length}</li>
        </ul>
    )
};