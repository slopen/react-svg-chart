// @flow
/* eslint import/namespace: ['error', { allowComputed: true }] */

import React, {Component} from 'react';
import * as d3ease from 'd3-ease';

import defaults from './defaults';
import {pathData, getStyle} from './util';

export type EasingFnType = (number) => number;
export type EasingFunction = $Keys<d3ease> | EasingFnType;

export type AnimationOptions = {
	step: number,
	delay: number,
	interval: number,
	easingFn: EasingFunction
};

export type LineProps = {
	color: string,
	strokeWidth: number,
	strokeMargin: number,
	animation: AnimationOptions
};

export type Props = LineProps & {
	index: number,
	value: number,
	sectorCoords: {
		start: number,
		end: number,
	},
	background?: LineProps,
	onUpdate?: (item: Props, index: number) => any
};

type State = {
	percent: number
};



export default class Sector extends Component <Props, State> {

	_t: any;
	_current: number;
	_mounted: boolean;

	static defaultProps = defaults;

	constructor (props: Props) {
		super (props);

		this.state = {
			percent: 0
		};
	}

	componentDidMount () {
		this._mounted = true;
		this.update (0, this.props.value);
	}

	componentWillUnmount () {
		this._mounted = false;
	}

	safeState (...args: any) {
		if (this._mounted) {
			return this.setState (...args);
		}
	}

	componentDidUpdate ({value}: Props) {
		if (value !== this.props.value) {
			console.log ('value change', value);
		}
	}

	update (start: number, end: number) {
		const {animation} = this.props;

		if (!animation || !animation.easingFn) {
			return this.safeState ({percent: end});
		}

		const {delay} = this.props.animation;

		if (delay) {
			return setTimeout (() =>
				this.transition (start, end), delay);
		}

		this.transition (start, end);
	}

	transition (start: number = 0, end: number = 0) {
		const {step, interval} = this.props.animation;
		const easingFn = this.getEasingFunction ();
		const length = end - start;

		this._current = 0;
		this._t = setInterval (
			this.animate (length, easingFn, step),
			interval / (1 / step)
		);
	}

	animate (length: number, animation: Function, step: number) {
		const {onUpdate, index, ...rest} = this.props;

		return () => {
			if (this._current >= 1 || !this._mounted) {
				clearInterval (this._t);
			}

			const percent = animation (this._current) * length;

			this.safeState ({percent},
				() => onUpdate && onUpdate ({
					...rest,
					value: percent
				}, index)
			);

			this._current += step;
		}
	}

	getEasingFunction () {
		const {easingFn} = this.props.animation;

		return typeof easingFn === 'string'
			? d3ease [easingFn] : easingFn;
	}

	getData () {
		const {
			strokeMargin,
			sectorCoords,
			background = {}
		} = this.props;

		const {percent} = this.state;

		const {
			start: sectorStart,
			end: sectorEnd
		} = sectorCoords;

		const bgMargin = background.strokeMargin || strokeMargin || 0;
		const startBg = sectorStart + bgMargin;
		const endBg = sectorEnd - bgMargin;

		const startVal = sectorStart + (strokeMargin || 0);
		const endVal = sectorEnd - (strokeMargin || 0);
		const value = startVal + ((endVal - startVal) * percent);

		return {
			value,
			startVal,
			endVal,
			startBg,
			endBg
		};
	}

	render () {
		const {
			color,
			strokeWidth,
			background = {}
		} = this.props;

		const {
			value,
			startVal,
			startBg,
			endBg
		} = this.getData ();


		return (
			<g style={getStyle (this.props)}>
				<path
					d={pathData ([startBg, endBg])}
					stroke={background.color}
					strokeWidth={(100 * background.strokeWidth) + '%'}
					strokeLinecap="butt"
					fill="transparent"/>
				<path
					d={pathData ([startVal, value])}
					stroke={color}
					strokeWidth={(100 * strokeWidth) + '%'}
					strokeLinecap="butt"
					fill="transparent"/>
			</g>
		);
	}
}
