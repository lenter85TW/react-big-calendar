'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateHeader = function DateHeader(_ref) {
  var label = _ref.label,
      drillDownView = _ref.drillDownView,
      onDrillDown = _ref.onDrillDown,
      holiday = _ref.holiday,
      isOffRange = _ref.isOffRange,
      date = _ref.date;

  // console.log('DateHeader isOffRange : ', isOffRange);  //비활성 날짜인경우 true, 활성날짜면 false
  // console.log('DateHeader date : ', date);  //해당 날짜의 date객체
  // console.log('DateHeader holiday : ', holiday);  //holiday 날짜 배열
  //
  // //holiday check
  // holiday.forEach( (currentValue) => {
  //     if(currentValue.date.toString() == date.toString()){
  //         console.log('여기야 여기, 홀리데이야');
  //     }
  // });


  if (!drillDownView) {
    return _react2.default.createElement(
      'span',
      null,
      label
    );
  }

  return _react2.default.createElement(
    'a',
    { href: '#', onClick: onDrillDown },
    label
  );
};

DateHeader.propTypes = {
  label: _propTypes2.default.node,
  date: _propTypes2.default.instanceOf(Date),
  drillDownView: _propTypes2.default.string,
  onDrillDown: _propTypes2.default.func,
  isOffRange: _propTypes2.default.bool
};

exports.default = DateHeader;
module.exports = exports['default'];