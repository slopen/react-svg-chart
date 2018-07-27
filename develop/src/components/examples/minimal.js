// @flow

import React from 'react';


import '../../../../lib/styles.css';
import SVGChart from '../../../../lib';


const data = [{value: 0.89}];
const props = {data};

export default () =>
	<SVGChart {...props}/>
