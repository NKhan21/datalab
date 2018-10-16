import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import { transition } from 'd3-transition';
import { getElementBox, translator, simplifyNumber, stripBr } from '../../utils';
import { categoryConstants } from './categoryConstants';
import { getDataByYear } from './data-income';
import { indexByYear } from './data';
import { establishContainer } from '../../utils';
import { zoomInit, getZoomState } from './zoom';
import { addTextElements } from './textElements';
import { showDetail, section2_2_init, clearDetails } from './showDetails';
import colors from '../../colors.scss';
import './categories.scss';

const zoomIndex = 8;

const d3 = { select, selectAll, scaleLinear, min, max, transition },
    tour = location.search.includes('tour'),
    factBox = d3.selectAll('.fact-box'),
    baseTranslate = { x: 91, y: 150 },
    baseDimensions = { width: 1014, height: 100 },
    xScale = d3.scaleLinear();

let svg,
    categoryData,
    topAmount,
    totalAmount,
    tourStage2,
    baseContainer,
    shaderContainer,
    detailsGroup,
    zoomComponent,
    textElements,
    shaders;

function stackData(series) {
    let tracker;

    series.forEach((r, i) => {
        if (i === 0) {
            tracker = d3.min([0, series.filter(r => r.amount < 0).reduce((a, c) => a += c.amount, 0)]);
        }

        r.x0 = tracker;

        tracker += Math.abs(r.amount);

        if (r.subcategories) {
            stackData(r.subcategories)
        }

    })
}

function zoomShaders(state, textFade, zoom) {
    shaders.transition()
        .delay(textFade)
        .duration(zoom)
        .attr('x', function (d) {
            return xScale(d.x0)
        })
        .attr('width', function (d) {
            const x1 = d.x0 + d.amount,
                width = xScale(x1) - xScale(d.x0);

            return d3.max([width, 1]);
        })
        .attr('opacity', function (d, i) {
            if (state === 'in') {
                i -= 3;
            }

            if (state === 'in' && i < 0) {
                return 0;
            } else {
                return (i) ? 1 - i / 7 : 1;
            }
        })
        .attr('fill', colors.colorPrimaryDarker);
}

function zoomToMoreCategories(state) {
    const textFade = 500,
        more = (state === 'in'),
        zoom = 1000;

    rescale(state);
    clearDetails();

    detailsGroup.transition()
        .duration(textFade)
        .attr('opacity', 0)
        .on('end', function () {
            detailsGroup.selectAll('*').remove();
        })

    zoomShaders(state, textFade, zoom);
    moveBarGroup();

    setTimeout(function () {
        detailsGroup.attr('opacity', 1);
        addDetails(state)
    }, textFade + zoom)
}

function rescale(state) {
    const low = (state === 'in') ? topAmount : 0;

    xScale.domain([low, totalAmount]);
}

function addDetails() {
    textElements = addTextElements(categoryData, detailsGroup, xScale, baseDimensions, null, zoomIndex);

    textElements
        .attr('style', 'cursor:pointer')
        .on('click', function (d, i) {
            const n = (getZoomState() === 'in') ? i + 3 : i,
                rect = shaders.filter(function (d, j) { return j === n }).node();

            setTourStep2();
            showDetail.bind(rect)(d);
        });

    if (!zoomComponent) {
        zoomComponent = zoomInit(baseContainer, baseDimensions, xScale(categoryData[zoomIndex].x0), zoomToMoreCategories);
    }

    section2_2_init(baseContainer);
}

function moveBarGroup(init) {
    const state = getZoomState(),
        yTrans = (state === 'in') ? baseTranslate.y + 100 : baseTranslate.y,
        delay = (state !== 'in' && !init) ? 1000 : 0;

    let barDuration = 1200;

    if (init) {
        barDuration = 0;
    } else if (state === 'out') {
        barDuration = 800;
    }

    baseContainer.transition()
        .duration(barDuration)
        .delay(delay)
        .attr('transform', translator(baseTranslate.x, yTrans))
        .on('end', addDetails)
        .ease()
}

function buildStack(data) {
    const keys = data.map(r => r.activity);

    let reduced;

    keys.push('more');

    reduced = keys.reduce((a, c, i) => {
        a[c] = (c === 'more') ? moreAmount : data[i].amount;
        return a;
    }, {});

    return d3.stack()
        .keys(keys)([reduced]);
}

function addSegments(more) {
    const duration = 1000;

    shaders = shaderContainer.selectAll('rect')
        .data(categoryData)
        .enter()
        .append('rect')
        .attr('y', 0)
        .attr('x', function (d) {
            return xScale(d.x0)
        })
        .attr('width', function (d) {
            return d3.max([xScale(d.amount), 1]);
        })
        .attr('height', baseDimensions.height)
        .attr('fill', function (d, i) {
            return (i < 3) ? colors.colorPrimaryDarker : '#ccc';
        })
        .attr('opactity', 0)
        .on('click', function (d) {
            setTourStep2();
            showDetail.bind(this)(d);
        });

    shaders.transition()
        .duration(1000)
        .attr('opacity', function (d, i) {
            if (i > 3) {
                i = 3;
            }

            return (i) ? 1 - i / 7 : 1;
        })
        .ease()
}

function remove() {
    d3.select(this).remove();
}

function setContainers() {
    baseContainer = svg.append('g')
        .classed('base-category-container', true)
        .attr('transform', translator(baseTranslate.x, baseTranslate.y));

    shaderContainer = baseContainer.append('g')
        .attr('style', 'cursor:pointer')
        .classed('shader-container', true);

    detailsGroup = baseContainer.append('g')
        .attr('opacity', 0);

    xScale.range([0, baseDimensions.width])

    rescale();
    moveBarGroup(true);
    addDetails();
}

function setTourStep2() {
    return;
}

function formatSubcategories(obj) {
    return Object.keys(obj).map(k => obj[k]);
}

function sortData(a, b) {
    return b.amount - a.amount;
}

function init(dataType) {
    const currentYear = indexByYear(2017)[dataType],
        currentYearData = Object.keys(currentYear).map(k => currentYear[k]);

    currentYearData.forEach(r => {
        r.subcategories = formatSubcategories(r.subcategories)
    })

    categoryData = currentYearData;

    categoryData.sort(sortData)

    topAmount = categoryData.slice(0, zoomIndex).reduce((a, c) => a += c.amount, 0),
    totalAmount = categoryData.reduce((a, c) => a += c.amount, 0);
    
    stackData(categoryData);
    setContainers();
    addSegments();
    
    console.log(categoryData)
}

svg = establishContainer(270);

init('function');

d3.select('#select-budget-function')
    .on('click', function () {
        svg.selectAll('*').remove();
        zoomComponent = null;
        init('function');
    })

d3.select('#select-agency')
    .on('click', function () {
        svg.selectAll('*').remove();
        zoomComponent = null;        
        init('agency');
    })