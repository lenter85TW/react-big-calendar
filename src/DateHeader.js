import PropTypes from 'prop-types';
import React from 'react'

const DateHeader = ({ label, drillDownView, onDrillDown, holiday, isOffRange, date }) => {
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
      return (<span>{label}</span>)
    }

    return (
      <a href="#" onClick={onDrillDown}>
        {label}
      </a>
    )
}

DateHeader.propTypes = {
  label: PropTypes.node,
  date: PropTypes.instanceOf(Date),
  drillDownView: PropTypes.string,
  onDrillDown: PropTypes.func,
  isOffRange: PropTypes.bool
}

export default DateHeader

