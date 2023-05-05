import React from "react";

export function Cell(props){
    const { d, xScale, yScale, color, selectPoint, setSelectPoint } = props;

    const mouseOver = (d) => {
        setSelectPoint(d.mbti + d.variable);
        // setLeft(e.pageX);
        // setTop(e.pageY);
        // setD(d);
        
    };
    const mouseOut = () => {
        setSelectPoint(null);
        // setLeft(null);
        // setTop(null);
        // setD(null);
    };

    const getOpacity = (d) => {
        if (selectPoint) {
            return selectPoint.includes(d.mbti) | selectPoint.includes(d.variable) ? 1:0.75
        }
        
    }

    const getWidth = (d) => {
        if (selectPoint) {
            return selectPoint.includes(d.mbti) | selectPoint.includes(d.variable) ? 2:1
        }
        
    }

    return <g transform={`translate(${xScale(d.variable)}, ${yScale(d.mbti)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} opacity={getOpacity(d)} stroke={"black"} strokeWidth={getWidth(d)}
        onMouseOver={()=>{mouseOver(d)}} onMouseOut={mouseOut}/>
    </g>
}