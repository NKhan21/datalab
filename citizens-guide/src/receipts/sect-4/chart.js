import { select, selectAll } from 'd3-selection';
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { translator, simplifyNumber, establishContainer } from '../../utils';
import { axisBottom } from 'd3-axis';
import { transition } from 'd3-transition';
import { ink, placeHorizontalStripes } from './ink';
import { selectCountryInit } from './selectCountry'
import { masterData } from '.';
import { selectedCountries } from './selectedCountryManager';

const d3 = { select, selectAll, min, max, scaleLinear, axisBottom, transition },
    dimensions = {
        rowHeight: 72,
        barHeight: 16,
        countryColumnWidth: 210,
        gdpColumnWidth: 130,
        header: 50,
        barYOffset: 3
    },
    addRemoveDuration = 1000,
    scales = {},
    containers = {},
    map = {
        income: {
            data: 'receipts',
            class: 'receipts',
            stroke: '#2E8540',
            fill: 'rgba(46,133,64,0.5)',
            yOffset: 3,
            legend: 'Income'
        },
        gdp: {
            data: 'gdp',
            class: 'gdp',
            stroke: '#4A90E2',
            fill: 'rgba(74,144,226,0.5)',
            yOffset: 0 - dimensions.barHeight - 3,
            legend: 'GDP - Gross Domestic Product'
        }
    };

let data;

dimensions.dataWidth = 1200 - dimensions.countryColumnWidth - dimensions.gdpColumnWidth;

function establishContainers(container) {
    containers.chart = container.append('g');
    containers.data = containers.chart.append('g').attr('transform', translator(dimensions.countryColumnWidth, dimensions.header));
    containers.country = containers.chart.append('g').attr('transform', translator(0, dimensions.header));
    containers.gdp = containers.chart.append('g').attr('transform', translator(dimensions.countryColumnWidth + dimensions.dataWidth, dimensions.header));
    containers.legends = containers.chart.append('g').classed('legends', true);
}

function addBarLabels(g, data, keys) {
    const text = g.selectAll('text')
        .data(keys.map(k => map[k].data))
        .enter()
        .append('text')
        .text(function (d) {
            return simplifyNumber(data[d])
        })
        .attr('font-size', 12)
        .attr('x', function (d) {
            return scales.x(data[d]) + 20;
        })
        .attr('y', function (d, i) {
            return (dimensions.rowHeight / 2 - dimensions.barHeight - dimensions.barYOffset) + i * (dimensions.barYOffset * 2 + dimensions.barHeight) + 12;
        })
        .attr('opacity', 0)

    text.transition()
        .duration(500)
        .attr('opacity', 1)
        .ease();
}

function addBarGroups() {
    const groups = containers.data.selectAll('g.bar-group')
        .data(data, function (d) { return d.country });

    if (groups.size()) {
        groups.transition()
            .duration(addRemoveDuration)
            .attr('transform', function (d, i) {
                return translator(0, (i * dimensions.rowHeight))
            })
            .ease();
    }

    groups.exit().remove();

    groups.enter()
        .append('g')
        .classed('bar-group', true)
        .attr('transform', function (d, i) {
            return translator(0, i * dimensions.rowHeight)
        })
        .each(drawBars)
}

function drawBars(data, i) {
    const transitionDuration = 1000,
        group = d3.select(this),
        keys = ['gdp', 'income'],
        bars = group.selectAll('rect')
            .data(keys)
            .enter()
            .append('rect')
            .attr('width', scales.x(0))
            .attr('height', dimensions.barHeight)
            .attr('x', 0)
            .attr('y', function (d, i) {
                return (dimensions.rowHeight / 2 - dimensions.barHeight - dimensions.barYOffset) + i * (dimensions.barYOffset * 2 + dimensions.barHeight);
            })
            .attr('fill', function (d) {
                return map[d].fill;
            })
            .attr('stroke', function (d) {
                return map[d].stroke;
            })

    bars.transition()
        .duration(transitionDuration)
        .attr('width', function (d) {
            return scales.x(data[map[d].data]);
        })
        .ease();

    setTimeout(function () {
        addBarLabels(group, data, keys);
    }, transitionDuration);
}

function setScales() {
    const receiptsVals = data.map(r => r.receipts),
        gdpVals = data.map(r => r.gdp),
        min = d3.min([0, d3.min(receiptsVals.concat(gdpVals))]),
        max = d3.max(receiptsVals.concat(gdpVals)) * 1.1;

    scales.x = d3.scaleLinear()
        .domain([min, max]).nice()
        .range([0, dimensions.dataWidth]);
}

function drawXAxis() {
    const xAxis = d3.axisBottom(scales.x)
        .tickFormat(function (n) {
            if (n === 0) {
                return 0
            } else {
                return simplifyNumber(n);
            }
        })

    containers.axisGroup = containers.data.append('g')
        .attr('transform', translator(0, dimensions.totalHeight))
        .call(xAxis);

    containers.axisGroup.selectAll('.tick line')
        .attr('y1', 0 - dimensions.totalHeight)
        .attr('stroke', '#eee');

    containers.axisGroup.selectAll('.domain').remove();
}

function placeCountryLabels() {
    const countryLabels = containers.country.selectAll('text')
        .data(data, function (d) { return d.country });

    let timeoutForAdd = 0;

    if (countryLabels.size()) {
        timeoutForAdd = 500;

        countryLabels.transition()
            .duration(addRemoveDuration)
            .attr('transform', function (d, i) {
                return translator(0, (i * dimensions.rowHeight))
            })
            .ease();
    }

    countryLabels.exit().remove();

    setTimeout(function () {
        countryLabels.enter()
            .append('text')
            .attr('transform', function (d, i) {
                return translator(0, i * dimensions.rowHeight)
            })
            .text(d => d.country)
            .attr('y', dimensions.rowHeight / 2 + 8)
            .attr('transform', (d, i) => translator(0, i * dimensions.rowHeight))
            .attr('x', 20)
            .attr('font-size', 16);
    }, timeoutForAdd)

}

function placeGdpFigures() {
    const gdpText = containers.gdp.selectAll('text')
        .data(data, function (d) { return d.country });

    let timeoutForAdd = 0;

    if (gdpText.size()) {
        timeoutForAdd = 500;

        gdpText.transition()
            .duration(addRemoveDuration)
            .attr('transform', function (d, i) {
                return translator(0, (i * dimensions.rowHeight))
            })
            .ease();
    }

    gdpText.exit().remove();

    setTimeout(function () {
        gdpText.enter()
            .append('text')
            .attr('transform', function (d, i) {
                return translator(0, i * dimensions.rowHeight)
            })
            .text(d => d.receipts_gdp)
            .attr('y', dimensions.rowHeight / 2 + 8)
            .attr('transform', (d, i) => translator(0, i * dimensions.rowHeight))
            .attr('x', 50)
            .attr('font-size', 16);
    }, timeoutForAdd)
}

function placeLegends() {
    const keys = Object.keys(map).sort(),
        legendSpacing = 240;

    containers.legends.selectAll('rect.legend')
        .data(keys)
        .enter()
        .append('rect')
        .classed('legend', true)
        .attr('width', dimensions.barHeight)
        .attr('height', dimensions.barHeight)
        .attr('x', function (d, i) {
            return dimensions.countryColumnWidth + 20 + i * legendSpacing;
        })
        .attr('y', 15)
        .attr('stroke', function (d) {
            return map[d].stroke;
        })
        .attr('fill', function (d) {
            return map[d].fill;
        })

    containers.legends.selectAll('text.legend')
        .data(keys)
        .enter()
        .append('text')
        .text(function (d) {
            return map[d].legend;
        })
        .attr('font-size', 12)
        .classed('legend', true)
        .attr('x', function (d, i) {
            return dimensions.countryColumnWidth + dimensions.barHeight + 30 + i * legendSpacing;
        })
        .attr('y', 27)

    containers.legends.append('text')
        .text('Federal Income as')
        .attr('text-anchor', 'middle')
        .attr('x', 1200 - dimensions.gdpColumnWidth / 2)
        .attr('y', 26)
        .attr('font-size', 12)
        .append('tspan')
        .text('Percent of GDP')
        .attr('dy', 12)
        .attr('x', 1200 - dimensions.gdpColumnWidth / 2)
}

function sizeSvg(transitionTime) {
    establishContainer().transition().duration(transitionTime).attr('height', dimensions.header + data.length * dimensions.rowHeight + 30);
}

function setData() {
    data = selectedCountries.list.map(c => {
        if (masterData.indexed[c]) {
            return masterData.indexed[c];
        } else {
            console.warn('no data for ' + c);
        }
    }).filter(r => r);

    dimensions.totalHeight = dimensions.rowHeight * data.length;
}

function repositionXAxis() {
    containers.axisGroup.transition()
        .duration(addRemoveDuration)
        .attr('transform', translator(0, dimensions.totalHeight))
        .ease();

    containers.axisGroup.selectAll('.tick line').transition()
        .duration(addRemoveDuration)
        .attr('y1', 0 - dimensions.totalHeight);

    containers.chart.selectAll('.drop-shadow-base').transition()
        .duration(addRemoveDuration)
        .attr('height', dimensions.totalHeight);
}

export function refreshData() {
    setData();
    addBarGroups();
    placeCountryLabels();
    placeGdpFigures();
    repositionXAxis();
    sizeSvg(addRemoveDuration);
    placeHorizontalStripes(data.length);
}

export function chartInit(container) {
    setData();
    sizeSvg(800);
    establishContainers(container);
    ink(containers, dimensions, data.length);
    setScales();
    drawXAxis();

    addBarGroups();
    placeCountryLabels();
    placeGdpFigures();

    placeLegends();
    selectCountryInit();
}