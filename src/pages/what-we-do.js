import React, {Component} from "react"
import './pages.css'

class WhatWeDoPage extends Component {
    render() {

        return (
            <div className="wwd">
                <div className="hero">
                    <div className="hero-content">
                        <h1>What We Do</h1>
                        <p>Description</p>
                    </div>
                </div>

                <div className="services">
                    <p>Services Go Here</p>
                </div>

                <div className="quote">
                    <p>Quote Here</p>
                </div>
            </div>
        )
    }
}

export default WhatWeDoPage