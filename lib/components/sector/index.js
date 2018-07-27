'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Ease = require('d3-ease');

var d3ease = _interopRequireWildcard(_d3Ease);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _util = require('./util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint import/namespace: ['error', { allowComputed: true }] */

var Sector = function (_Component) {
	(0, _inherits3.default)(Sector, _Component);

	function Sector(props) {
		(0, _classCallCheck3.default)(this, Sector);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Sector.__proto__ || Object.getPrototypeOf(Sector)).call(this, props));

		_this.state = {
			percent: 0
		};
		return _this;
	}

	(0, _createClass3.default)(Sector, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._mounted = true;
			this.update(0, this.props.value);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this._mounted = false;
		}
	}, {
		key: 'safeState',
		value: function safeState() {
			if (this._mounted) {
				return this.setState.apply(this, arguments);
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(_ref) {
			var value = _ref.value;

			if (value !== this.props.value) {
				console.log('value change', value);
			}
		}
	}, {
		key: 'update',
		value: function update(start, end) {
			var _this2 = this;

			var animation = this.props.animation;


			if (!animation || !animation.easingFn) {
				return this.safeState({ percent: end });
			}

			var delay = this.props.animation.delay;


			if (delay) {
				return setTimeout(function () {
					return _this2.transition(start, end);
				}, delay);
			}

			this.transition(start, end);
		}
	}, {
		key: 'transition',
		value: function transition() {
			var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
			var _props$animation = this.props.animation,
			    step = _props$animation.step,
			    interval = _props$animation.interval;

			var easingFn = this.getEasingFunction();
			var length = end - start;

			this._current = 0;
			this._t = setInterval(this.animate(length, easingFn, step), interval / (1 / step));
		}
	}, {
		key: 'animate',
		value: function animate(length, animation, step) {
			var _this3 = this;

			var _props = this.props,
			    onUpdate = _props.onUpdate,
			    index = _props.index,
			    rest = (0, _objectWithoutProperties3.default)(_props, ['onUpdate', 'index']);


			return function () {
				if (_this3._current >= 1 || !_this3._mounted) {
					clearInterval(_this3._t);
				}

				var percent = animation(_this3._current) * length;

				_this3.safeState({ percent: percent }, function () {
					return onUpdate && onUpdate((0, _extends3.default)({}, rest, {
						value: percent
					}), index);
				});

				_this3._current += step;
			};
		}
	}, {
		key: 'getEasingFunction',
		value: function getEasingFunction() {
			var easingFn = this.props.animation.easingFn;


			return typeof easingFn === 'string' ? d3ease[easingFn] : easingFn;
		}
	}, {
		key: 'getData',
		value: function getData() {
			var _props2 = this.props,
			    strokeMargin = _props2.strokeMargin,
			    sectorCoords = _props2.sectorCoords,
			    _props2$background = _props2.background,
			    background = _props2$background === undefined ? {} : _props2$background;
			var percent = this.state.percent;
			var sectorStart = sectorCoords.start,
			    sectorEnd = sectorCoords.end;


			var bgMargin = background.strokeMargin || strokeMargin || 0;
			var startBg = sectorStart + bgMargin;
			var endBg = sectorEnd - bgMargin;

			var startVal = sectorStart + (strokeMargin || 0);
			var endVal = sectorEnd - (strokeMargin || 0);
			var value = startVal + (endVal - startVal) * percent;

			return {
				value: value,
				startVal: startVal,
				endVal: endVal,
				startBg: startBg,
				endBg: endBg
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    color = _props3.color,
			    strokeWidth = _props3.strokeWidth,
			    _props3$background = _props3.background,
			    background = _props3$background === undefined ? {} : _props3$background;

			var _getData = this.getData(),
			    value = _getData.value,
			    startVal = _getData.startVal,
			    startBg = _getData.startBg,
			    endBg = _getData.endBg;

			return _react2.default.createElement(
				'g',
				{ style: (0, _util.getStyle)(this.props) },
				_react2.default.createElement('path', {
					d: (0, _util.pathData)([startBg, endBg]),
					stroke: background.color,
					strokeWidth: 100 * background.strokeWidth + '%',
					strokeLinecap: 'butt',
					fill: 'transparent' }),
				_react2.default.createElement('path', {
					d: (0, _util.pathData)([startVal, value]),
					stroke: color,
					strokeWidth: 100 * strokeWidth + '%',
					strokeLinecap: 'butt',
					fill: 'transparent' })
			);
		}
	}]);
	return Sector;
}(_react.Component);

Sector.defaultProps = _defaults2.default;
exports.default = Sector;