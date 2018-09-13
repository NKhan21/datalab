import { select, selectAll } from 'd3-selection';
import { establishContainer, initDropShadow, stripBr } from '../../utils';
import { trendView } from './trendView';
import { trendData } from './trendData';
import '../factBox.scss';
import '../header.scss';
import { tourButton } from '../tourButton/tourButton';

const data = trendData(),
    d3 = { select, selectAll },
    tour = location.search.includes('tour'),
    factBox = d3.selectAll('.fact-box'),
    svg = establishContainer(1200);

// svg.attr('height', 1200);

initDropShadow();

stripBr();

trendView(data, svg, {
    width: 500
});

function initTour() {
    factBox.classed('sr-only', false);

    setTimeout(function () {
        factBox.classed('fact-box--out-right', false)
    }, 1000)
}

if (tour) {
    initTour();
} else {
    factBox.remove();
}