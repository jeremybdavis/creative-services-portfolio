import React, { Component } from "react"
import Link from "gatsby-link"
import PropTypes from "prop-types"
import './templates.css'
import './portfolio.css'

class PortfolioTemplate extends Component {
    render() {
        const data = this.props.data;
        const acfFields = data.wordpressAcfPages.acf;

        return(
            <div className="portfolio">
                <div className="hero">
                    <div className="hero-content">
                        <h1>{acfFields.case_studies_headline}</h1>
                        <div dangerouslySetInnerHTML={{__html: acfFields.case_studies_description}}></div>
                    </div>
                </div>

                <div className="section" style={{backgroundColor: '#ede9e6'}}>
                    <div className="posts">
                        {data.allWordpressWpCaseStudy.edges.map(({node}) => (
                            <div key={node.slug} className={"post"}>
                                <Link to={`/portfolio/${node.slug}/`}>
                                    <div className="post-img">
                                        <img src={node.featured_media.source_url} alt=""/>
                                        <div className="cs-hover">
                                            <span>View Project</span>
                                        </div>
                                    </div>
                                    <p className="post-title" dangerouslySetInnerHTML={{__html: node.title}}></p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
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