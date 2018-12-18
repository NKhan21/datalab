import { select, selectAll } from 'd3-selection';
import { translator, simplifyNumber, getElementBox } from '../../utils';
import colors from '../../colors.scss';

const d3 = { select, selectAll },
    dataDisc = 'data-disc',
    tooltipGroup = 'tooltip-group';

function destroyTooltip() {
    const tips = d3.selectAll('.' + tooltipGroup).remove();
    blankAllDiscs();
}

function blankAllDiscs() {
    d3.selectAll('.' + dataDisc).attr('fill', 'white')
}

function showTooltip(d, i) {
    const g = d3.select(this),
        tooltip = g.append('g').classed(tooltipGroup, true).attr('opacity', 0),
        padding = { top: 30, left: 14 },
        height = 100,
        width = 140;

    blankAllDiscs();

    g.raise()

    g.select('circle')
        .attr('fill', colors.colorSpendingTrendCircles)

    tooltip.append('rect')
        .attr('width', width)
        .attr('height', 120)
        .attr('stroke', '#ccc')
        .attr('stroke-width', 1)
        .attr('fill', 'white');

    tooltip.append('text')
        .text(function (d) {
            return 'FY ' + d.year;
        })
        .attr('fill', colors.textColorParagraph)        
        .attr('font-weight', 'bold')
        .attr('font-size', 18)
        .attr('dy', padding.top)
        .attr('dx', padding.left)

    tooltip.append('line')
        .attr('x1', padding.left)
        .attr('y1', 45)
        .attr('x2', width - padding.left)
        .attr('y2', 45)
        .attr('stroke', '#aaa')
        .attr('stroke-width', 1)

    tooltip.append('text')
        .text('Value')
        .attr('fill', '#00766C')
        .attr('font-weight', 'bold')
        .attr('font-size', 15)
        .attr('dy', 70)
        .attr('dx', padding.left);

    tooltip.append('text')
        .text(function (d) {
            return simplifyNumber(d.amount);
        })
        .attr('fill', colors.textColorParagraph)        
        .attr('font-weight', 'bold')
        .attr('font-size', 18)
        .attr('dy', 100)
        .attr('dx', padding.left)

    tooltip.attr('transform', function () {
        if (getElementBox(tooltip).right > getElementBox(d3.select('svg.main')).right) {
            return translator(getElementBox(d3.select('svg.main')).right - getElementBox(tooltip).right, 10)
        } else {
            return translator(10, 0)
        }
    })

    tooltip.transition().duration(200).attr('opacity', 1);

    document.addEventListener('click', destroyTooltip, {
        once: true,
        capture: true
    })
};

function dataReducer(accumulator, d) {
    return accumulator.concat(d.values.map(v => {
        return {
            year: v.year,
            amount: v.amount,
            name: d.name,
            officialName: d.officialName
        }
    }))
};

function rescale(globals, duration) {
    const dataDots = this;

    dataDots.transition()
        .duration(duration)
        .attr('transform', function (d) {
            return translator(globals.scales.x(d.year), globals.scales.y(d.amount));
        })
        .ease();

    dataDots.selectAll('circle').transition()
        .duration(duration)
        .style('opacity', function (d, i) {
            if (globals.noZoom || globals.zoomState === 'in' || d.amount > globals.zoomThreshold) {
                return 1;
            }

            return 0;
        })
        .ease();
}

export function addTooltips(globals) {
    const dataDots = globals.chart.selectAll('g.dataDots')
        .data(globals.data.reduce(dataReducer, []))
        .enter()
        .append('g')
        .classed('dataDots', true)
        .attr('transform', function (d) {
            return translator(globals.scales.x(d.year), globals.scales.y(0));
        })
        .on('click', function(d, i){
            if (globals.noDrilldown) {
                globals.trendLines.deEmphasize(d.name, globals, 'on')
            }
            
            showTooltip.bind(this)(d, i)
        })
        .on('mouseover', function(d, i){
            if (globals.noDrilldown) {
                globals.trendLines.deEmphasize(d.name, globals, 'on')
                globals.labels.setLabelActive(d.name)
            }
            
            showTooltip.bind(this)(d, i)
        })
        .on('mouseout', function(d, i){
            if (globals.noDrilldown) {
                globals.trendLines.deEmphasize(d.name, globals, 'off')
                globals.labels.setLabelInactive(d.name, 'tooltip')                
            }
            
            destroyTooltip.bind(this)()
        })

    dataDots.append('circle')
        .attr('stroke', colors.colorSpendingTrendCircles)
        .classed(dataDisc, true)
        .attr('fill', 'white')
        .attr('r', 4)
        .attr('cx', 0)
        .attr('cy', 0)
        .classed('pointer', true)
        .style('opacity', function (d, i) {
            if (globals.noZoom || d.amount > globals.zoomThreshold) {
                return 1;
            }

            return 0;
        })

    dataDots.append('circle')
        .classed('ghost-disc', true)
        .attr('fill', 'transparent')
        .attr('r', 8)
        .attr('cx', 0)
        .attr('cy', 0)
        .classed('pointer', true)
        .style('opacity', function (d, i) {
            if (globals.noZoom || d.amount > globals.zoomThreshold) {
                return 1;
            }

            return 0;
        })

    rescale.bind(dataDots)(globals, 1000);

    return {
        rescale: rescale.bind(dataDots)
    }
}
