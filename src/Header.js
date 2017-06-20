import PropTypes from 'prop-types';
import React from 'react'

const Header = ({ label }) => {

  if(label.includes('일')){
      return <span className="headerLabelSunday">{label}</span>
  } else {
      return <span>{label}</span>
  }


}

Header.propTypes = {
  label: PropTypes.node,
}

export default Header
