// @flow

import React from 'react';

import defaults from './defaults';
import SectorComponent from 'components/sector';


import type {LineProps, Props as SectorProps} from 'components/sector';

type DataItem = LineProps & {
	value: number,
	span?: number,
	background?: LineProps
};

type Props = LineProps & {
	data: Array <DataItem>
};

const getSpan = (span) =>
	span && span > 1 ? span - 1 : 0;

const split2sectors = (list: Array <DataItem>): Array <DataItem & SectorProps> => {
	const total = list.reduce (
		(res, {span}) => res + getSpan (span) + 1, 0
	);
	const step = 1 / total;

	return list.reduce ((res, {span = 0, value, ...item}, i) => {
		const start = res.length ? res [res.length - 1].sectorCoords.end : 0;
		const end = start + (step * (1 + getSpan (span)));

		res.push ({
			...item,
			value,
			index: i,
			sectorCoords: {start, end}
		});

		return res;
	}, []);
}


const getStyle = () => ({
	transform: 'rotate(-0.25turn)'
});


const SVGComponent = ({data, ...props}: Props) => {
	const items = split2sectors (data);

	return (
		<div className="react-svg-chart">
			<svg
				viewBox="-1 -1 2 2"
				style={getStyle ()}>

				{items.map (({sectorCoords, value, ...item}, i) =>
					<SectorComponent
						key={i}
						index={i}
						value={value}
						sectorCoords={sectorCoords}
						{...{...props, ...item}}/>
				)}
			</svg>
		</div>
	);
};

SVGComponent.defaultProps = defaults;

export const Sector = SectorComponent;
export default SVGComponent
