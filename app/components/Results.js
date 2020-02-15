import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase,FaUsers, FaUserFriends, FaCode, FaUser} from 'react-icons/fa'  

export default class Results extends React.Component {

  constructor(props) {
    super(props)
   this.state = {
    winner: null,
    loser: null,
    error:null,
    loading:true
  }
  }

  componentDidMount () {
    const { playerOne, playerTwo } = this.props

    battle([ playerOne, playerTwo ])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error:null,
          loading: false
        })
      }).catch(({message}) => {
        this.setState({
          error: message,
          loading: false
        })
      })
  }

  render() {

    const {winner, loser, error, loading} = this.state

    if (loading === true) {
      return (
              <p> LOADING </p> 
      )
    }

    if (error) {

      return (
        <p className = 'center-text error'>
            {error}
        </p>
      )
    }

    return (

      <div className = 'grid space-around container-sm'>
        {/* Winner Card */}
        <div className = 'card bg-light'>
          
          <h4 className = 'header-lg center-text'>
            {winner.score === loser.score ? 'Tie' : 'Winner'}
          </h4>

          {/* Avatar */}
          <img className = 'avatar'
            src = {winner.profile.avatar_url}
          />
          {/* Display Winner Score */}
          <h4 className = 'center-text'>
            Score: {winner.score.toLocaleString()}  
          </h4>

          {/* Username and Link to Profile */}
          <h2 className = 'center-text'>
            <a className = 'link' href = {winner.profile.html_url}>
              {winner.profile.login}
            </a>
          </h2>

          {/* List of Winner Attributes */}
            <ul>
              <li>
                  <FaUser/>
                    {winner.profile.name}
              </li>
                              {winner.profile.location && (
                                <li>
                                  <FaCompass/>
                                  {winner.profile.location}
                                </li>
                              )}

                              {winner.profile.company && (
                                <li>
                                  <FaBriefcase/>
                                    FaBriefcase
                                </li>
                              )}

                              <li>
                                <FaUsers/>
                                  { winner.profile.followers.toLocaleString()} followers
                              </li>

                              <li>
                                <FaUserFriends/>
                                { winner.profile.following.toLocaleString()} following
                              </li>

          </ul>
        </div>

        {/* Loser Card */}
        <div className = 'card bg-light'>
          <h4 className = 'header-lg center-text'>
            {winner.score === loser.score ? 'Tie' : 'Loser'}
          </h4>

          {/* Avatar */}
          <img className = 'avatar'
            src = {loser.profile.avatar_url}
          />

          {/* Loser Score */}
          <h4 className = 'center-text'>
            Score: {loser.score.toLocaleString()}  
          </h4>

          {/* Username and Link to Profile */}
          <h2 className = 'center-text'>
            <a className = 'link' href = {loser.profile.html_url}>
              {loser.profile.login}
            </a>
          </h2>
          {/* List of Loser Attributes */}
            <ul>
              <li>
                  <FaUser/>
                    {loser.profile.name}
              </li>
                              {loser.profile.location && (
                                <li>
                                  <FaCompass/>
                                  {loser.profile.location}
                                </li>
                              )}

                              {loser.profile.company && (
                                <li>
                                  <FaBriefcase/>
                                    FaBriefcase
                                </li>
                              )}

                              <li>
                                <FaUsers/>
                                  { loser.profile.followers.toLocaleString()} followers
                              </li>

                              <li>
                                <FaUserFriends/>
                                { loser.profile.following.toLocaleString()} following
                              </li>

            </ul>
        </div>

            

      </div>
    )
  }
}