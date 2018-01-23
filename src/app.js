import * as d3 from "d3";
import { getRoseCoefficients } from "./utils/get-rose-coefficients"
import { getGridSize } from "./utils/get-grid-size"

const container = d3.select(".container");
const size = container.node().getBoundingClientRect();

const coeffs = getRoseCoefficients(9, 9);
const grid = getGridSize(coeffs.length, size);

const scaleCoeff = d3.scaleLog().domain([coeffs[0].k, coeffs[coeffs.length - 1].k]);
const roseColor = d3.scaleSequential((d) => d3.interpolateWarm(scaleCoeff(d)));
const roseRadius = (grid.cellSize - 10) / 2;

const line = d3.lineRadial()
                    .angle((d) => d.angle)
                    .radius((d) => d.radius)
                    .curve(d3.curveCardinal);

function generateRose(coeff) {
    const period = (coeff.p & coeff.q & 1 ? 1 : 2) * Math.PI * coeff.q;
    const points = d3.range(0, period + Math.PI / 20, Math.PI / 20)
        .map(function(theta) {
            const r = roseRadius * Math.sin(coeff.k * theta);
            return { radius: r, angle: theta };
        });
    return points;
}

const svg = container
                .append("svg")
                    .attr("width", grid.width * grid.cellSize)
                    .attr("height", grid.height * grid.cellSize);

const data = coeffs.map((coeff, idx) => {
    const x = idx % grid.width;
    const y = Math.floor(idx / grid.width);
    return {
        coeff: coeff,
        pos: {
            x: x,
            y: y
        },
        points: generateRose(coeff)
    }
});

const blocks = svg.selectAll("g")
                    .data(data).enter()
                        .append("g")
                            .attr("transform", (d) => {
                                const width = (d.pos.x + 0.5) * grid.cellSize;
                                const height = (d.pos.y + 0.5) * grid.cellSize;
                                return `translate(${width},${height})`;
                            });

blocks
    .append("path")
        .attr("d", (d) => line(d.points));

blocks
    .append("path")
        .attr("class", "dynamic")
        .style("stroke", (d) => roseColor(d.coeff.k));

blocks
    .append("rect")
        .attr("x", -roseRadius)
        .attr("y", -roseRadius)
        .attr("width", grid.cellSize)
        .attr("height", grid.cellSize)
            .on("mouseover", function(d) { startDrawingCurve(d, this); })
            .on("mouseout", function(d) { stopDrawingCurve(d, this); });


let timer = null;
function startDrawingCurve(data, handler) {
    const dynamicPath = d3
        .select(handler.parentNode)
        .select("path.dynamic")
        .attr("d", "");
    let ticks = 0;
    timer = setInterval(function() {
            dynamicPath
                .attr("d", (d) => line(d.points.slice(0, ticks)));
            ticks++;
        },
        50);
}

function stopDrawingCurve(data, handler) {
    clearInterval(timer);
    timer = null;
}