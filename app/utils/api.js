export function fetchPopularRepos (language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:
    ${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
    /**
     * fetch returns a Promise
     * res is resolve i.e. endpoint data
     * which in turn returns a Promise
     * i.e. res.json() = data
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