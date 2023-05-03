import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import { csv, min, max, median, interpolateGnBu, interpolateRdBu, mean } from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";


const csvUrl = '/Users/lslsls/Desktop/IV/FInalP/matrix.csv'

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                // d.danceability = +d.danceability_mean;
                // d.energy = +d.energy_mean;
                // d.loudness = +d.loudness_mean;
                // d.mode = +d.mode_mean;
                // d.speechiness = +d.speechiness_mean;
                // d.acousticness = +d.acousticness_mean;
                // d.liveness = +d.liveness_mean;
                // d.valence = +d.valence_mean;
                // d.tempo = +d.tempo_mean;
                // d.instrumentalness = +d.instrumentalness_mean
                d.value = +d.value
            });
            setData(data);
        });
    }, []);
    return dataAll;
}


function removeDuplicatembti(data){
    const temp = data.map(d => d.MBTI);
    return temp.filter( (d, idx) =>  temp.indexOf(d) === idx);
};

function HeatMap(){
    const WIDTH = 900;
    const HEIGHT = 400;
    const margin = {top: 200, right: 40, bottom: 50, left: 60};
    const height = HEIGHT - margin.top - margin.bottom;
    const width = WIDTH - margin.left - margin.right;
    const data = useData(csvUrl);
    if(!data){
        return <pre>Loading...</pre>
    }
    // console.log(data);

    const MUSICAL = ["mode","danceability","energy","loudness","speechiness","acousticness","liveness","valence","tempo","instrumentalness"];
    const MBTI = removeDuplicatembti(data)
    // console.log(STATION);
    const xScale = Scales.band(MUSICAL, 0, width);
    const yScale = Scales.band(MBTI, 0, height);
    const startRange = [min(d => {d.value}),median(d => {d.value}),max(d => {d.value})];
    const colorRange = [interpolateGnBu(0), interpolateGnBu(0.5), interpolateGnBu(0.8)];
    // const colormap = Scales.colormapLiner(startRange, colorRange);
    // const colormap = Scales.colorSequential(startRange, interpolateGnBu);
    const colormap = Scales.colorDiverging(startRange, interpolateRdBu);
    return <svg width={WIDTH} height={HEIGHT}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
        {
            data.map( d => {
                return <Cell key={d.mbti+d.variable} d={d} xScale={xScale} yScale={yScale} color={colormap(d.value)} />
            } )
        }
        {STATION.map(s => {
                        return <g key={s} transform={`translate(${xScale(s)+5},-8)rotate(60)`}>
                        <text style={{textAnchor:'end'}}>{s}</text>
                        </g>
                    })}
        {MONTH.map(m => {
                    return <text key={m} style={{textAnchor:'middle'}} x={-30} y={yScale(m)+10}>{m}</text>
                })}
        <Legend x={0} y={height+10} width={width/2} height={20} numberOfTicks={5} 
        rangeOfValues={[min(data, d => d.start), max(data, d => d.start)]} colormap={colormap}/>
        </g>
        
    </svg>
};

ReactDOM.render(<HeatMap/>, document.getElementById('root'));