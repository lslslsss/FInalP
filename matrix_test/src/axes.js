import React from "react";

export function Axes(props){
    const { s, xScale, yScale, color, selectPoint, setSelectPoint } = props;

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

    return <g transform={`translate(${xScale(d.variable)}, ${yScale(d.mbti)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} opacity={getOpacity(d)} stroke={"black"}
        onMouseOver={()=>{mouseOver(d)}} onMouseOut={mouseOut}/>
    </g>
}