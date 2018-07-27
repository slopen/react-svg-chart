'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getStyle = exports.pathData = exports.getCoordinatesForPercent = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCoordinatesForPercent = exports.getCoordinatesForPercent = function getCoordinatesForPercent(percent) {
	return [Math.cos(2 * Math.PI * percent), Math.sin(2 * Math.PI * percent)];
};

var pathData = exports.pathData = function pathData(_ref) {
	var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
	    start = _ref2[0],
	    end = _ref2[1];

	var _getCoordinatesForPer = getCoordinatesForPercent(start),
	    _getCoordinatesForPer2 = (0, _slicedToArray3.default)(_getCoordinatesForPer, 2),
	    startX = _getCoordinatesForPer2[0],
	    startY = _getCoordinatesForPer2[1];

	var _getCoordinatesForPer3 = getCoordinatesForPercent(end),
	    _getCoordinatesForPer4 = (0, _slicedToArray3.default)(_getCoordinatesForPer3, 2),
	    endX = _getCoordinatesForPer4[0],
	    endY = _getCoordinatesForPer4[1];

	var largeArcFlag = end - start > 0.5 ? 1 : 0;

	return 'M ' + startX + ' ' + startY + ' A 1 1 0 ' + largeArcFlag + ' 1 ' + endX + ' ' + endY;
};

var getStyle = exports.getStyle = function getStyle(_ref3) {
	var strokeWidth = _ref3.strokeWidth,
	    background = _ref3.background;
	return {
		transform: 'scale(' + 1 / (1 + Math.max(background && background.strokeWidth || 0, strokeWidth)) + ')'
	};
};