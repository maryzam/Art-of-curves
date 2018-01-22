import * as d3 from "d3";

const container = d3.select(".container");
const size = container.node().getBoundingClientRect();
const svg = container
                .append("svg")
                    .attr("width", size.width)
                    .attr("height", size.height);

const radius = (Math.min(size.width, size.height) - 50) / 2;
const line = d3.lineRadial()
                    .angle((d) => d.angle)
                    .radius((d) => d.radius)
                    .curve(d3.curveCardinal);

const content = svg
    .append("g")
    .attr("transform", `translate(${size.width / 2},${size.height / 2})`);

const rosePath = content.append("path")
            .attr("d", generateLine);

const phrasePath = svg
    .append("defs")
        .append("path")
	        .attr("id", "textPath")
	        .attr("d", generateLine);

function generateLine() {
    const p = 4;
    const q = 1;
    const k = p / q;
    const period = (p & q & 1 ? 1 : 2) * Math.PI * q;
    const points = d3.range(0, period + Math.PI / 50, Math.PI / 50)
        .map(function(theta) {
            const r = radius * Math.cos(k * theta);
            return { radius: r, angle: theta };
        });
    return line(points);
}

// working with text update

const letters = "Lorem ipsum dolor sit amet, prompta deleniti his ad. At numquam accusamus has, quo no nisl nihil audire, has sint utinam luptatum ex. Cu affert noluisse pri, ex pro ferri fastidii. No cum exerci graeci, has dicat verear te. Ferri veniam torquatos ei pro, accusata conceptam no qui"
                ;

const textPh = content.append("text");

function update(data, tick) {

    const text = textPh
                    .selectAll("textPath")
                    .data(data);

    text.attr("class", "update");

    const enter = text.enter()
                .append("textPath")
                .attr("xlink:href", "#textPath");

    enter
        .merge(text)
            .attr("startOffset",  100 - tick*0.03 + "%")
            .text(function(d) { return d; });

    text.exit().remove();

}

update(["L"]);

let tick = 0;

d3.interval(function() {
    tick++;
    update([letters.substr(0, tick)], tick);
}, 50);
