import React, { Component } from 'react'
import Link from 'gatsby-link'

class IndexPage extends Component {
    render() {
        const data = this.props.data

        return(
            <div>
                <div className="hero">
                    <h1>We Are Creative Services</h1>
                </div>
                <div className="section">
                    <h1>Who We Are</h1>
                </div>
            </div>
        )
    }
}

export default IndexPage
