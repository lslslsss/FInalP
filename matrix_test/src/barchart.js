import React from "react";
import { max, min} from "d3";
import { Scales } from "./scale";
import { Bars } from './bars';

export function BarChart (props) {
    
    const {offsetX, offsetY, width, height, data, dataAll, selectPoint, setSelectPoint} = props
    const xScale = Scales.band(data.map(function(d) {
        return d.variable;
        }), 0, width);
    const yScale = Scales.linear(min(dataAll,d => d.value), max(dataAll, d => d.value), -height, height);
    const ticksY = yScale.ticks();
    console.log(ticksY);
    ticksY.map( t => {
        console.log(yScale(t))
    })

    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        <line x1={0} x2={width} y1={height}  y2={height} stroke={'black'} />
        <line y1={-17} y2={2*height} stroke={'black'} />
             <text transform={'rotate(-90)'} y={-30} x={10} style={{ textAnchor:'end', fontSize:'12px'}}>
                 {"Musical Feature Values"}
             </text>
             <text y={-50} x={350} style={{ textAnchor:'end', fontSize:'20px'}} >
                {selectPoint}
             </text>
        {xScale.domain().map( tickValue => {
            return <g key={tickValue} transform={`translate(${xScale(tickValue)+27}, ${height+5})`}>
                <text style={{ textAnchor:'middle', fontSize:'10px'}} transform={`translate(0, ${height+25})`}>
                    {tickValue}
                </text>
                        </g>
                    })
                }
        {
                ticksY.map( tickValue => {
                    return <g key={tickValue} transform={`translate(-10, ${-yScale(tickValue)+height-17})`}>
                        <line x2={10} stroke={'black'} />
                        <text style={{ textAnchor:'end', fontSize:'12px'}}>
                            {tickValue}
                        </text>
                    </g>
                })
            
        }

        <Bars data={data} xScale={xScale} yScale={yScale} height={height} selectPoint={selectPoint} setSelectPoint={setSelectPoint}/>
        {/* <YAxis yScale={yScale} height={height} axisLable={"Musical Features Values"}/>
        <XAxis chartType={"bar"} xScale={xScale} height={height} width={width} /> */}
    </g>
}