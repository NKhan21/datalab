import '../sass/income/detail-pane.scss';
import { select } from 'd3-selection';
import { establishContainer, translator, getElementBox } from '../../utils';
import { getByCategory } from './trendData';
import { trendView } from './trendView';

const d3 = { select };

const svg = establishContainer(),
    h = 600;

let data,
    pane,
    callout,
    chartContainer,
    container;

function buildDString(yPos, _height) {

    const radius = 6,
        triangle = { height: 15, width: 18 },
        width = 530,
        defaultHeight = h + 100,
        height = (_height > defaultHeight) ? _height : defaultHeight,
        leg = height - yPos;

    return `M 0,${radius}
        q 0,-${radius} ${radius},-${radius} 
        l ${width},0
        q ${radius},0 ${radius},${radius}
        l 0,${height}
        q 0,${radius} -${radius},${radius}
        l -${width},0
        q -${radius},0 -${radius},-${radius}
        l 0,-${leg}
        l -${triangle.width},-${triangle.height}
        l ${triangle.width},-${triangle.height}
        Z`;
}

function modifyRect(sourceY, height) {
    const dString = buildDString(sourceY, height);

    if (callout) {
        callout.transition()
            .duration(500)
            .attr('d', dString)
            .ease();
    } else {
        callout = container.append('path')
            .attr('stroke', '#ddd')
            .attr('stroke-width', 1)
            .attr('fill', 'white')
            .attr('d', dString)

        callout.lower()
    }
}

function init(sourceY) {
    const config = {
        height: h,
        width: 240,
        simple: true
    };

    let chartHeight;

    trendView(data, chartContainer, config);
    
    chartContainer.transition()
    .duration(300)
    .attr('opacity', 1)
    
    chartHeight = getElementBox(chartContainer).height + 50;
    
    modifyRect(Math.round(sourceY), chartHeight);
}

export function destroyDetailPane() {
    if (!chartContainer) {
        return;
    }
    
    chartContainer.transition()
        .duration(300)
        .attr('opacity', 0)
        .on('end', function(){
            if (container) {
                container.remove();
            }
            container = null;
            callout = null;
        })
}

export function showDetail(name, sourceY) {
    data = getByCategory(name);

    if (container) {
        chartContainer.transition()
            .duration(300)
            .attr('opacity', 0)
            .on('end', function () {
                chartContainer.selectAll('*').remove();
                init(sourceY);
            })
    } else {
        container = svg.append('g').attr('transform', translator(630, 1));
        chartContainer = container.append('g').attr('opacity', 0).attr('transform',translator(10,10));

        init(sourceY);
    }
}