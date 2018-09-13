import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { getElementBox, translator, simplifyNumber } from '../../utils';
import { dotFactory, receiptsConstants, dotPositionAccessor } from '../receipts-utils';
import { establishContainer } from '../../utils';
import { sectionOneData } from './data';
import colors from '../../colors.scss';
import { initGdpDots } from './gdpDots';
import { tourButton } from '../tourButton/tourButton';

const d3 = { select },
    xStart = receiptsConstants.xStart,
    dotsPerRow = receiptsConstants.dotsPerRow,
    dotOffset = receiptsConstants.dotOffset;

let svg,
    incomeContainer,
    dotContainer,
    dotsWidth;

function readyIncomeDots() {
    incomeContainer = dotContainer.append('g')
        .attr('opacity', 0)
        .classed(receiptsConstants.incomeContainerClass, true)
        .attr('transform', 'translate(-100, -50), scale(2)');

    let i = 0,
        top = 3400,
        x = xStart,
        y = 2;

    for (i; i < top; i++) {
        dotFactory(incomeContainer, x, y);
        x += dotOffset.x;

        if ((i + 1) % dotsPerRow === 0) {
            y += dotOffset.y;
            x = xStart;
        }
    }

    dotPositionAccessor.set([x, y], i % dotsPerRow);
}

function buildHeader() {
    const text = svg.append('text')
        .attr('opacity', 0)
        .attr('fill', colors.textColorParagraph)
        .attr('class', 'total-gov-revenue')
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')

    text.append('tspan')
        .text('Total Government Revenue')
        .style('font-weight', 'bold')
        .attr('y', 20)
        .attr('x', 600)
        .attr('transform', 'translate(0, 20)')

    text.append('tspan')
        .text(simplifyNumber(sectionOneData.income))
        .attr('y', 40)
        .attr('x', 600)

    text.transition()
        .duration(400)
        .attr('opacity', 1)
}

function buildLegend() {
    const g = svg.append('g')
        .attr('opacity', 0)
        .classed('reset', true)
        .classed('income-dot-legend', true);

    let w, xOffset;

    dotFactory(g, 0, 0);

    g.append('text')
        .text('= 1 Billion Dollars')
        .attr('fill', colors.textColorParagraph)
        .style('font-size', 16)
        .attr('y', 6)
        .attr('x', 7)

    w = getElementBox(g).width;

    xOffset = dotsWidth - w + ((1200 - dotsWidth) / 2);

    g.attr('transform', translator(xOffset, 30))

    g.transition()
        .duration(400)
        .attr('opacity', 1)
}

function setDotContainer() {
    let xOffset;

    dotsWidth = (dotsPerRow * dotOffset.x) + xStart;
    xOffset = (1200 - dotsWidth) / 2;

    dotContainer = svg.append('g')
        .classed(receiptsConstants.dotContainerClass, true)
        .classed('reset', true)
        .attr('transform', translator(xOffset, receiptsConstants.headingHeight));
}

function enableFactBox() {
    const factBox = d3.select('#income-facts');

    svg.attr('height', 200);

    factBox.classed('fact-box--out-down', null);
}

function addContinueButton() {
    const factBox = d3.select('#income-facts'),
        button = tourButton(document.getElementById('continue-1'));

    button.on('click', function () {
        factBox.classed('fact-box--out-down', true);

        setTimeout(function(){
            factBox.remove();
        },500)

        initGdpDots();
    });
}

export function enterIncomeDots() {
    incomeContainer.transition()
        .duration(700)
        .attr('opacity', 1)
        .attr('transform', 'translate(0,0), scale(1)')
        .on('end', function () {
            buildHeader();
            buildLegend();
        })
        .ease();

    setTimeout(enableFactBox, 2000);
}

export function initIncomeDots() {
    svg = establishContainer();
    addContinueButton();
    setDotContainer();
    readyIncomeDots();
}