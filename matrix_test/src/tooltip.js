import React from "react";
import {BarChart} from "./barchart"

export function Tooltip(props) {
    const {d, mbti, left, top, height, width, setSelectPoint} = props;
        if (!d) {
            return <g></g>;
        } else {
            return <g transform={`translate(${left}, ${top})`}>
                    <text style={{ textAnchor:'start', fontSize:'15px'}}  transform={`translate(${0}, ${5})rotate(0)`}> {d.mbti} </text>
                    <BarChart offsetX={0} offsetY={0} height={height/2}
                        width={width} data={mbti} selectPoint={d} setSelectPoint={setSelectPoint}/>
                </g>
        };  
}