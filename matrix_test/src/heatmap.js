import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import { min, max, median, interpolateGnBu, interpolateRdBu, mean } from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";

export function HeatMap(props){
    const {WIDTH, HEIGHT, margin, data, selectPoint, setSelectPoint } = props;

    const height = HEIGHT - margin.top - margin.bottom;
    const width = WIDTH - margin.left - margin.right;
    if(!data){
        return <pre>Loading...</pre>
    }
    // console.log(data);

    const MUSICAL = ["danceability","energy","loudness", "mode","speechiness","acousticness","liveness","valence","tempo","instrumentalness"];
    const MBTI = ["INFJ","ISFJ","INTJ","ISTJ","INFP","INTP","ISFP","ISTP","ENFJ","ESFJ","ENTJ","ESTJ","ENFP","ENTP","ESFP","ESTP"]

    const xScale = Scales.band(MUSICAL, 0, width);
    const yScale = Scales.band(MBTI, 0, height);
    const startRange = [min(data, d => d.value),median(data, d => d.value),max(data, d => d.value)];
    const colorRange = [interpolateGnBu(0), interpolateGnBu(0.5), interpolateGnBu(0.8)];
    // const colormap = Scales.colormapLiner(startRange, colorRange);
    // const colormap = Scales.colorSequential(startRange, interpolateGnBu);
    const colormap = Scales.colorDiverging(startRange, interpolateRdBu);

    const getColor = (s) => {
        if (selectPoint) {
            return selectPoint.includes(s) ? "red":"black"
        }    }

    return <svg width={WIDTH} height={HEIGHT}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
        {
            data.map( d => {
                return <Cell key={d.mbti + d.variable} d={d} xScale={xScale} yScale={yScale} color={colormap(d.value)} 
                selectPoint={selectPoint} setSelectPoint={setSelectPoint}
                />
            } )
        }
        {MUSICAL.map(s => {
            console.log(s)
                        return <g key={s} transform={`translate(${xScale(s)+20},-8)rotate(60)`}>
                        <text style={{textAnchor:'end'}} fill={getColor(s)}>{s}</text>
                        </g>
                    })}
        {MBTI.map(m => {
            console.log(m)
                    return <text key={m} style={{textAnchor:'middle'}} fill={getColor(m)} x={-30} y={yScale(m)+18}>{m}</text>
                })}
        <Legend x={0} y={height+10} width={width} height={20} numberOfTicks={6} 
        rangeOfValues={[min(data, d => d.value), max(data, d => d.value)]} colormap={colormap}/>
        </g>
        
    </svg>
};