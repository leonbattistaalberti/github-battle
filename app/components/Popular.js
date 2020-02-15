import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'


function LangaugesNav ({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button
            className='btn-clear nav-link'
            style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick={() => onUpdateLanguage(language)}>
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LangaugesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid ({repos}) {
  return (
   <ul className = 'grid space-around'>
      {repos.map((repo, index) => {
          const {name, html_url, forks, owner, license, open_issues, stargazers_count} = repo
          const {login, avatar_url} = owner

          return (
            <li key = {html_url} className = 'card bg-light'>
              <h4 className = 'header-lg center-text'>
                  #{index + 1}
              </h4>
              <img
                  src = {avatar_url}
                  className = 'avatar'
                  alt = {`Avatar for ${login}`}
              />
              <h2 className = 'center-text'>
                  <a className = 'link' href = {html_url}>{login}</a>
              </h2>
              <ul className = 'classList'>
                <li>
                    <FaUser/>
                    <a href = {`https://github.com/${login}`}> {login}
                    </a>
                </li>

                <li>
                    <FaStar/> {stargazers_count} stars
                </li>
                <li>
                    <FaCodeBranch/> {forks.toLocaleString()} forks
                </li>
                <li>
                    <FaExclamationTriangle/> {open_issues} open issues
                </li>

              </ul>
            </li>
          )
        }

      )}
     </ul>
  )
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null,
    }

    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }


  updateLanguage (selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
    })

    console.log(this.state.repos)
    //console.log(this.state.repos[selectedLanguage])

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          console.log(data)
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }))
        })
        .catch(() => {
          console.warn('Error fetching repos: ', error)

          this.setState({
            error: `There was an error fetching the repositories.`
          })
        })
    }
  }
  isLoading() {
    const { selectedLanguage, repos, error } = this.state

    return !repos[selectedLanguage] && error === null
  }
  render() {
    const { selectedLanguage, repos, error } = this.state

    return (
      <React.Fragment>
        <LangaugesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}

        {error && <p className = 'center-text error'>{error}</p>}

        {repos[selectedLanguage] && <ReposGrid repos = {repos[selectedLanguage]}/>}
      </React.Fragment>
    )
  }
}
