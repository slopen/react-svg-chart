// @flow

import React from 'react';


import '../../../../lib/styles.css';
import SVGChart from '../../../../lib';


const data = [
	{value: 0.23},
	{value: 0.89, color: 'red'},
	{value: 0.11, color: 'green'}
];
const props = {
	data,
	strokeWidth: 0.3,
	strokeMargin: 0.005,
	background: {
		color: 'rgba(217,217,150)',
		strokeWidth: 0.3,
		strokeMargin: 0.005
	}
};

export default () =>
	<SVGChart {...props}/>;
