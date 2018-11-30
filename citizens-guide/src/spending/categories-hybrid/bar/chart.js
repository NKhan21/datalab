import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
import { zoom } from 'd3-zoom';
import { establishContainer, translator } from "../../../utils";
import { placeLabels } from './text';
import colors from '../../../colors.scss';
import { initSort } from './sort';
import { initOverlay } from './detailOverlay';
import { optimizeWidth, scaleToFit } from './optimize-width';

const d3 = { select, selectAll, scaleLinear, extent, transition, zoom },
    barAnimationTime = 1000,
    hoverDuration = 200,
    rowHeight = 50,
    defaultRowsToShow = 10;

function setScales(config) {
    const extent = d3.extent(config.data, r => r.amount);

    extent[0] = (extent[0] > 0) ? 0 : extent[0];

    config.scaleX = d3.scaleLinear()
        .range([0, config.barWidth])
        .domain(extent);
}

function drawBars(containers, config) {
    const g = containers.append('g');

    g.append('line')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)
        .attr('x1', config.scaleX(0))
        .attr('x2', config.scaleX(0))
        .attr('y1', rowHeight / 4 - 4)
        .attr('y2', rowHeight * 0.75 + 4)

    g.append('rect')
        .attr('height', rowHeight / 2)
        .attr('fill', function (d) {
            if (d.amount < 0) {
                return 'gray';
            }

            return colors.colorSpendingPrimary;
        })
        .attr('y', rowHeight / 4)
        .attr('x', config.scaleX(0))
        .attr('width', 0)
        .classed('bar', true)
        .transition()
        .duration(1000)
        .attr('x', function (d) {
            if (d.amount < 0) {
                return config.scaleX(d.amount)
            }

            return config.scaleX(0);
        })
        .attr('width', function (d) {
            return config.scaleX(Math.abs(d.amount)) - config.scaleX(0);
        })
        .ease();
}

function onMouseover() {
    const row = d3.select(this);

    row.selectAll('rect.bar').transition()
        .duration(hoverDuration)
        .attr('opacity', 0.7)
        .ease();

    row.selectAll('text').transition()
        .duration(hoverDuration)
        .attr('fill', '#888')
        .ease();
}

function onMouseout() {
    const row = d3.select(this);

    row.selectAll('rect.bar').transition()
        .duration(300)
        .attr('opacity', 1)
        .ease();

    row.selectAll('text').transition()
        .duration(300)
        .attr('fill', 'black')
        .ease();
}

function placeContainers(config, detail) {
    const containers = config.svg.selectAll('g.row')
        .data(config.data)
        .enter()
        .append('g')
        .classed('pointer', !config.detail)
        .classed('row', true)
        .attr('transform', function (d, i) {
            return translator(0, i * rowHeight);
        });

    if(!detail && config.showMoreInd){
        const showMoreButton = d3.select('#showMoreContainer');
        const container = config.container;
        const containerDimensions = container.node().getBoundingClientRect();
        showMoreButton.classed('hidden',false);
        showMoreButton.on('click', function(){
            const curEl = d3.select(this);
            const showMoreInd = curEl.attr('showMoreInd') === 'false';
            curEl.attr('showMoreInd', showMoreInd);
            const buttonText = !showMoreInd ? 'See Less' : 'See More';
            container.attr('height', showMoreInd ? defaultRowsToShow * rowHeight : config.data.length * rowHeight);
            curEl.select('button').text(buttonText);
        });
    }

    config.barWidth = placeLabels(containers, config);

    setScales(config);

    drawBars(containers, config);

    if (!detail) {
        containers.on('click', function (d) {
            if (!d.subcategories) {
                return;
            }

            drawChart(d.subcategories, d.activity, true, config.width)
        });

        setTimeout(function () {
            containers.on('mouseover', onMouseover)
            containers.on('mouseout', onMouseout)
        }, barAnimationTime)
    }
}

export function drawChart(data, type, detail, parentWidth) {
    const config = {};

    if (!data.length) {
        return;
    }
    const showMoreInd = data.length > defaultRowsToShow;
    const defaultDataSize = showMoreInd ? defaultRowsToShow : data.length;

    config.height = defaultDataSize * rowHeight;
    config.width = parentWidth || optimizeWidth();
    config.data = data;
    config.rowHeight = rowHeight;
    config.detail = detail;
    config.showMoreInd = showMoreInd;

    initSort(config);

    if (detail) {
        initOverlay(type, config, placeContainers);
    } else {
        config.container = establishContainer(config.height, config.width);
        config.svg = config.container
            .append('g').classed('pan-listen', true)
            .append('g').classed('pan-apply', true);

        placeContainers(config, detail);
        //scaleToFit(config.svg);

        d3.select('g.pan-listen').call(d3.zoom().on("zoom", function () {
            let xShift, yShift;
            
            d3.getEvent = () => require("d3-selection").event;

            xShift = d3.getEvent().transform.x;
            yShift = d3.getEvent().transform.y;

            xShift = (xShift > 0) ? 0 : xShift;
            
            d3.select('g.pan-apply').attr("transform", translator(xShift, 0));
            d3.select('g.detail-layer').attr('transform', translator(0, yShift));
        }))
        .on("wheel.zoom", null);
    }
}