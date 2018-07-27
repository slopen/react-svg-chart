// @flow

import React from 'react';


import '../../../../lib/styles.css';
import SVGChart from '../../../../lib';


const data = [
	{value: 0.09, color: 'rgba(15,88,127)'},
	{value: 0.60, color: 'rgba(196,88,91)'},
	{value: 0.77, color: 'rgba(82,230,86)'},
	{value: 0.90},
	{value: 0.22, color: 'rgba(157,20,216)', animation: false},
	{value: 1.00,
		color: 'rgba(29,175,211)',
		animation: {
			step: 0.001,
			delay: 1000,
			interval: 5000,
			easingFn: 'easeExpInOut'
		}
	}
];

const props = {
	data,
	strokeMargin: 0.005,
	animation: {
		step: 0.01,
		interval: 1000,
		easingFn: 'easePolyInOut'
	}
};

export default () =>
	<SVGChart {...props}/>;
