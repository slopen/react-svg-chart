import React from 'react';

import MinimalChart from './examples/minimal';
import MinimalChartMore from './examples/minimal-more';
import CommonAndItemChart from './examples/common-item';
import AnimatedChart from './examples/animated';
import UpdaterChart from './examples/updater';



export default () =>
	<div>
		<MinimalChart/>
		<MinimalChartMore/>
		<CommonAndItemChart/>
		<AnimatedChart/>
		<UpdaterChart/>
	</div>
