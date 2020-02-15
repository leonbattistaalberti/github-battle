import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase,FaUsers, FaUserFriends, FaCode, FaUser} from 'react-icons/fa'  
import Card from './Card'

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
        {/* Render Card Component */}

        {/* Winner Card */}   
        <Card 
            header = {winner.score === loser.score ? 'Tied' : 'Winner'} 
            subheader = {`Score: ${winner.score.toLocaleString()}`} 
            avatar =  {winner.profile.avatar_url}
            href = {winner.profile.html_url}
            name = {winner.profile.name}
        >

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
      </Card>

        <Card
            header = {winner.score === loser.score ? 'Tied' : 'Loser'} 
            subheader = {`Score: ${loser.score.toLocaleString()}`} 
            avatar =  {loser.profile.avatar_url}
            href = {loser.profile.html_url}
            name = {loser.profile.name}
        >

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
        </Card>            

      </div>
    )
  }
}