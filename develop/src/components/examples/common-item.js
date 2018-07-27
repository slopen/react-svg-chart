// @flow

import React from 'react';


import '../../../../lib/styles.css';
import SVGChart from '../../../../lib';


const data = [
	{
		value: 0.7,
		span: 2.5,
		color: 'rgba(29,175,211)',
		strokeWidth: 0.7,
		strokeMargin: 0.03,
		background: {
			color: 'rgba(70,100,216)',
			strokeWidth: 0.9,
			strokeMargin: 0.01
		}
	},
	{value: 0.60, color: 'rgba(196,88,91)', strokeWidth: 0.3},
	{
		value: 0.77,
		span: 2,
		color: 'rgba(82,230,86,.8)',
		strokeWidth: 0.4,
		strokeMargin: 0.03,
		background: {
			color: 'rgba(70,100,216)',
			strokeWidth: 0.3,
			strokeMargin: 0.03
		}
	}
];

const props = {
	data,
	strokeWidth: 0.4,
	strokeMargin: 0.01
};

export default () =>
	<SVGChart {...props}/>;
