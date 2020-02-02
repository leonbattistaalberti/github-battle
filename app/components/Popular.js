import React from 'react'

export default class Popular extends React.Component {
    constructor (props) {
        super(props) 

        this.state = {
            selectedLanguage: 'All'
        }

    }

    /**
     * function to update the state 
     * to change the style of the relevant button
     * @param {string} selectedLanguage
     */
    updateLanguage (selectedLanguage) {
        this.setState({
            selectedLanguage
        })
    }

    render() {

        // Array of Popular languages
        // used to create a list of buttons
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
        return (
            <div>

                <ul className = 'flex-center'>
                {/*  
                 * create list of languages using the languages array
                 */}

                    {languages.map((language, index) => {
                        return (
                        <li key= {language}>
                        <button 
                        // When a button is clicked the onClick function 
                        // the language clicked is passed to the updateLanguage function 
                            onClick = {() => this.updateLanguage(language)}
                            style = {language === this.state.selectedLanguage ? {color: 'rgb(187,46,31)'} : null}
                            className = 'btn-clear-nav-link'> 
                            {language}
                        </button>
                        </li>
                        
                        )
                    })}
                </ul>
                
            </div>
        )
    }
}