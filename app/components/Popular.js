import React from 'react'
import PropTypes from 'prop-types'

function LanguagesNav ({selected, onUpdateLanguage}) {

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
                            style = {language === selected ? {color: 'rgb(187,46,31)'} : null}
                        // When a button is clicked the onClick function 
                        // the language clicked is passed to the updateLanguage function 
                            onClick = {() => onUpdateLanguage(language)}
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

LanguagesNav.propTypes = {
    selected : PropTypes.string.isRequired,
    onUpdateLanguage : PropTypes.func.isRequired
}

export default class Popular extends React.Component {
    constructor (props) {
        super(props) 

        this.state = {
            selectedLanguage: 'All'
        }

        this.updateLanguage = this.updateLanguage.bind(this)

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

        const {selectedLanguage} = this.state

        return (
            <React.Fragment>
                <LanguagesNav
                selected = {selectedLanguage}
                onUpdateLanguage = {this.updateLanguage}/>
            </React.Fragment>
        )     
    }
}