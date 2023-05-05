import React from "react";

export function Bars(props){
    //complete the getColor when you are asked to
    const {data, xScale, yScale, height, selectPoint, setSelectPoint} = props
    // const [selectPoint, setSelectPoint] = React.useState(null);

    const mouseOver = (d) => {
        setSelectPoint(d.mbti+d.variable);
    };
    const mouseOut = () => {
        setSelectPoint(null);
    };

    const getColor = (d) => {
        if (selectPoint){
            return selectPoint.includes(d.variable) ? "red":"steelblue"
        }
        
    }
    return <g>
                {data.map(d => {
                    if (yScale(d.value) >= 0) {
                        return <rect key={"bar" + d.mbti + d.variable} x={xScale(d.variable)} y={height-yScale(d.value)} 
            width={xScale.bandwidth()} height={yScale(d.value)} 
            onMouseOver={()=>{mouseOver(d)}} onMouseOut={mouseOut}
            fill={getColor(d)} stroke={'black'} />
                    }
                    else {
                        return <rect key={"bar" + d.mbti + d.variable} x={xScale(d.variable)} y={height} 
            width={xScale.bandwidth()} height={-yScale(d.value)} 
            onMouseOver={()=>{mouseOver(d)}} onMouseOut={mouseOut}
            fill={getColor(d)} stroke={'black'} />
                    }

        })} 

    </g>
}