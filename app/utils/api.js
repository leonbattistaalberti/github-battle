const id = "5f9f5eddc5592a7d902f"
const sec = "eae9b710e356533f97c4d07aff661b679511797d"
const params = `?client_id=${id}&client_secret=${sec}`

function getErrorMsg(message, username) {
    if (message === 'Not Found') {
        return `${username} doesn't exist`
    }
    return message
}

/**
 * 
 * @param {string} username 
 */
function getProfile(username) {
    return  fetch(`https://api.github.com/users/${username}${params}`)
                // take the response and return as json
                .then((res) => res.json())
                // take Promise and return Profile
                .then((profile) => {
                    // if there is an Error
                    // return Error message
                    if (profile.message) {
                        throw new Error(getErrorMsg(profile.message, username))
                    } 
                    return profile
                }) 
    }

/**
 * 
 * @param {string} username 
 */
function getRepos (username) {
  return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMsg(repos.message, username))
      }

      return repos
    })
}

function getStarCount(repos) {
    return repos.reduce ((count, {stargazers_count}) => count + stargazers_count, 0)
}
/**
 * 
 * @param {*} followers 
 * @param {*} repos 
 */
function calculateScore(followers, repos) {
        return (followers * 3 ) + getStarCount(repos)
}
/**
 * 
 * @param {string} player 
 * @returns {*} profile, score
 * 
 */
function getUserData (player){
    // Promise.all returns an array of Promises
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]) .then(([profile, repos]) => ({
        profile,
        score: calculateScore(profile.followers, repos)
    }))
}

function sortPlayers(players) {
    return players.sort((a, b) => b.score - a.score)
}

/**
 * 
 * @param {array} players 
 */
export function battle (players) {
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ]).then((results) => sortPlayers(results))
}


/**
 * 
 * @param {string} language 
 * 
 */
export function fetchPopularRepos (language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:
        ${language}&sort=stars&order=desc&type=Repositories`)
    return fetch(endpoint)
    /**
     * fetch returns a Promise
     * res is the Resolve i.e. endpoint data as Promise
     * converted to res.json() = data
     * then(data) returns 
     * data.items
    */ 
        .then((res) => res.json())
        .then((data) => {
            if (!data.items) {
                throw new Error(data.message)
            }
            return data.items
        })
}