import React, { Component } from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import './templates.css'

class CaseStudyTemplate extends Component {
    render() {
        const caseStudy = this.props.data.wordpressWpCaseStudy

        return (
            <div>
                <div className="nav-bg"></div>
                <h1 dangerouslySetInnerHTML={{ __html: caseStudy.title }} />
                <div dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
            </div>
        )
    }
}


export default CaseStudyTemplate

export const pageQuery = graphql`
    query currentCaseStudyQuery($id: String!) {
        wordpressWpCaseStudy(id: { eq: $id }) {
            title
            content
        }
        site {
            siteMetadata {
                title
                subtitle
            }
        }
    }
`