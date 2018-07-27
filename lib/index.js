'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Sector = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _sector = require('./components/sector');

var _sector2 = _interopRequireDefault(_sector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSpan = function getSpan(span) {
	return span && span > 1 ? span - 1 : 0;
};

var split2sectors = function split2sectors(list) {
	var total = list.reduce(function (res, _ref) {
		var span = _ref.span;
		return res + getSpan(span) + 1;
	}, 0);
	var step = 1 / total;

	return list.reduce(function (res, _ref2, i) {
		var _ref2$span = _ref2.span,
		    span = _ref2$span === undefined ? 0 : _ref2$span,
		    value = _ref2.value,
		    item = (0, _objectWithoutProperties3.default)(_ref2, ['span', 'value']);

		var start = res.length ? res[res.length - 1].sectorCoords.end : 0;
		var end = start + step * (1 + getSpan(span));

		res.push((0, _extends3.default)({}, item, {
			value: value,
			index: i,
			sectorCoords: { start: start, end: end }
		}));

		return res;
	}, []);
};

var getStyle = function getStyle() {
	return {
		transform: 'rotate(-0.25turn)'
	};
};

var SVGComponent = function SVGComponent(_ref3) {
	var data = _ref3.data,
	    props = (0, _objectWithoutProperties3.default)(_ref3, ['data']);

	var items = split2sectors(data);

	return _react2.default.createElement(
		'div',
		{ className: 'react-svg-chart' },
		_react2.default.createElement(
			'svg',
			{
				viewBox: '-1 -1 2 2',
				style: getStyle() },
			items.map(function (_ref4, i) {
				var sectorCoords = _ref4.sectorCoords,
				    value = _ref4.value,
				    item = (0, _objectWithoutProperties3.default)(_ref4, ['sectorCoords', 'value']);
				return _react2.default.createElement(_sector2.default, (0, _extends3.default)({
					key: i,
					index: i,
					value: value,
					sectorCoords: sectorCoords
				}, (0, _extends3.default)({}, props, item)));
			})
		)
	);
};

SVGComponent.defaultProps = _defaults2.default;

var Sector = exports.Sector = _sector2.default;
exports.default = SVGComponent;