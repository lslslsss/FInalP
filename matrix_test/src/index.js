import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import{ HeatMap } from "./heatmap";
import { csv, min, max, median, interpolateGnBu, interpolateRdBu, mean } from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";
import{ Tooltip } from "./tooltip";

const csvUrl = 'https://raw.githubusercontent.com/lslslsss/FInalP/master/matrix.csv'


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
                d.value = +d.Value
                d.variable = d.variable.replace("_mean", '')
            });
            setData(data);
        });
    }, []);
    return dataAll;
}




function Main(){
    const [selectPoint, setSelectPoint] = React.useState(null);
    const WIDTH = 1200;
    const HEIGHT = 800;
    const margin = {top:120, right: 40, bottom: 50, left: 60, gap:40}; 
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;   
    const data = useData(csvUrl);
    if(!data){
        return <pre>Loading...</pre>
    }
    // console.log(data);
    const mbtiData = data.filter( d=> {
        if (selectPoint){
            return selectPoint.includes(d.mbti)
        }
    });
    return <svg width={WIDTH} height={HEIGHT}>
        <g>
        <HeatMap WIDTH = {WIDTH/2} HEIGHT = {HEIGHT} margin={margin} data={data} selectPoint={selectPoint} setSelectPoint={setSelectPoint}>
        </HeatMap>

        <Tooltip d={selectPoint} mbti={mbtiData} setSelectPoint={setSelectPoint}
        left={margin.left + innerWidth/2} top={margin.top+40+innerHeight/2} height={(innerHeight-margin.gap)/2} width={(innerWidth-margin.gap)/2}>

        </Tooltip>
        </g>
        
    </svg>
};

ReactDOM.render(<Main/>, document.getElementById('root'));