// @flow

import React, {Component} from 'react';


import '../../../../lib/styles.css';
import SVGChart from '../../../../lib';

type Props = {};
type State = {
	updates: Array <Object>
};

const input = [
	{
		value: 0.34,
		color: 'rgba(15,88,127)',
		background: {
			color: 'red',
			strokeWidth: 0.4,
			strokeMargin: 0.001
		}
	},
	{value: 0.77, color: 'rgba(82,230,86)'},
	{value: 0.90},
	{value: 0.22, color: 'rgba(157,20,216)', animation: false},
	{value: 1.00,
		color: 'rgba(29,175,211,.7)',
		span: 2
	}
];

const data = input.map ((value, i) => ({
	...value,
	label: 'item ' + (i + 1),
	animation: {
		step: 0.01,
		delay: i * 500,
		interval: 1000,
		easingFn: i === input.length - 1 ? 'easeBounceOut' : 'easeExpInOut'
	}
}));

const props = {
	data,
	strokeMargin: 0.005,
	background: {
		color: 'rgba(100,100,216)',
		strokeWidth: 0.3,
		strokeMargin: 0.001
	},
	animation: {
		step: 0.01,
		interval: 1000,
		easingFn: 'easePolyInOut'
	}
};

const UpdateItem = ({value, label, color}) =>
	<p style={{color: color}}>
		<span>{label}:</span> {(100 * value).toFixed (1)}{'%'}
	</p>

class UpdaterChartComponent extends Component <Props, State> {

	constructor (props) {
		super (props);

		this.state = {
			updates: []
		};

		(this: any).onUpdate = this.onUpdate.bind (this);
	}

	componentDidMount () {
		this.setState ({
			updates: props.data.map (
				({label, color}) => ({
					label,
					color,
					value: 0
				})
			)
		});
	}

	onUpdate (item, i) {
		const {updates} = this.state;

		updates [i] = item;
		this.setState ({updates});
	}

	render () {
		const {updates} = this.state;

		return (
			<div>
				<SVGChart {...props} onUpdate={this.onUpdate}/>

				<div className="stats">
					{updates.map (({value, label, color} = {}, i) =>
						<UpdateItem key={i}  {...{value, label, color}}/>
					)}
				</div>
			</div>
		);
	}
}

export default () =>
	<UpdaterChartComponent/>;
