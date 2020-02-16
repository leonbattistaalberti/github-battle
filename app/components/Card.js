import React from 'react'
import PropTypes from 'prop-types'

export default function Card ({
  header,
  subheader,
  avatar,
  href,
  name,
  children
}) {
  return (
    <div className='card bg-light'>
      {/* Displays Winner/Loser/Tied */}
      <h4 className='header-lg center-text'>{header}</h4>

      {/* Avatar */}
      <img className='avatar' src={avatar} alt={`Avatar for ${name}`} />
      {/* Display Winner Score */}
      {/* if subheader is a prop then render Else not */}
      {subheader && <h4 className='center-text'>{subheader}</h4>}

      {/* Username and Link to Profile */}
      <h2 className='center-text'>
        <a className='link' href={href}>
          {name}
        </a>
      </h2>
      {/* Pass the children i.e. list of Attributes of the user */}
      {children}
    </div>
  )
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
