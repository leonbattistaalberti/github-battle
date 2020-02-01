import React from 'react'
// react-dom is for rendering to browser DOM
import ReactDOM from 'react-dom'
import './index.css'

// Component 
// State
// Lifecycle
// UI

class App extends React.Component {
    render () {
        return (
            <div>
                <h1>Hello World</h1>
            </div>
            )
    }
}

/**
 * Babel does the following to the above: 
 * return React.renderElement (
 * "div",
 * null, 
 * "Hello World"
 * )
 */

// @ts-ignore
ReactDOM.render(
/**
 * Argument 1: react element
 * Argument 2: where to render the element to 
 */
<App/>, 
document.getElementById('app')
 )
