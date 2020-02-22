import React from 'react'
import { battle } from '../utils/api'
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser
} from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'

function ProfileList ({ profile }) {
  return (
    /**
     * List of profile attributes
     */
    <ul>
      <li>
        <FaUser />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text={"User's location"}>
            <FaCompass />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text={"User's company"}>
            <FaBriefcase />
            FaBriefcase
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  )
}

export default class Results extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount () {
    const { playerOne, playerTwo, onReset } = this.props

    battle([playerOne, playerTwo])
      .then(players => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        })
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        })
      })
  }

  render () {
    const { winner, loser, error, loading } = this.state

    if (loading === true) {
      return <Loading />
    }

    if (error) {
      return <p className='center-text error'>{error}</p>
    }

    return (
      <React.Fragment>
        <div className='grid space-around container-sm'>
          {/* Render Card Component */}

          {/* Winner Card */}
          <Card
            header={winner.score === loser.score ? 'Tied' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.name}
          >
            <ProfileList profile={winner.profile} />
          </Card>

          <Card
            header={winner.score === loser.score ? 'Tied' : 'Loser'}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            href={loser.profile.html_url}
            name={loser.profile.name}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <button
          className={'btn dark-btn btn-space'}
          onClick={this.props.onReset}
        >
          Reset
        </button>
      </React.Fragment>
    )
  }
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}
