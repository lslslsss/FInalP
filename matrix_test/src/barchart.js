import React from "react";
import { max } from "d3";
import { Scales } from "./scale";
import { Bars } from './bars';

export function BarChart (props) {
    
    const {offsetX, offsetY, width, height, data, selectPoint, setSelectPoint} = props
    const xScale = Scales.band(data.map(function(d) {
        return d.variable;
        }), 0, width);
    const yScale = Scales.linear(0, max(data, d => d.value), 0, height);

    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        <line x1={0} x2={width} y1={height/2}  y2={height/2} stroke={'black'} />

        <Bars data={data} xScale={xScale} yScale={yScale} height={height} selectPoint={selectPoint} setSelectPoint={setSelectPoint}/>
        {/* <YAxis yScale={yScale} height={height} axisLable={"Musical Features Values"}/>
        <XAxis chartType={"bar"} xScale={xScale} height={height} width={width} /> */}
    </g>
}