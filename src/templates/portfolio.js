import React, { Component } from "react"
import Link from "gatsby-link"
import PropTypes from "prop-types"
import './templates.css'

class PortfolioTemplate extends Component {
    render() {
        const data = this.props.data;
        const acfFields = data.wordpressAcfPages.acf;

        return(
            <div>
                <div className="hero">
                    <div className="hero-content">
                        <h1>{acfFields.case_studies_headline}</h1>
                        <p dangerouslySetInnerHTML={{__html: acfFields.case_studies_description}}></p>
                    </div>
                </div>

                {data.allWordpressWpCaseStudy.edges.map(({node}) => (
                    <div key={node.slug} className={"post"} style={{ marginBottom: 50 }}>
                        <Link to={`/portfolio/${node.slug}/`}>
                            <p>{node.title}</p>
                        </Link>
                    </div>
                ))}

            </div>
        )
    }
}

PortfolioTemplate.propTypes = {
    data: PropTypes.object.isRequired,
    edges: PropTypes.array,
}

export default PortfolioTemplate

export const pageQuery = graphql`
    query portfolioQuery{
        allWordpressWpCaseStudy{
            edges{
                node{
                    id
                    title
                    slug
                    featured_media{
                        source_url
                    }
                }
            }
        }

        wordpressAcfPages{
            acf{
                case_studies_headline
                case_studies_description
            }
        }
    }
`