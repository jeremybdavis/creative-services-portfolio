import React, { Component } from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import './templates.css'
import './case-study.css'

class CaseStudyTemplate extends Component {
    render() {
        const caseStudy = this.props.data.wordpressWpCaseStudy

        return (
            <div className="case-study">
                <div className="hero">
                    {caseStudy.acf.cs_hero_img.source_url &&
                        <img src={caseStudy.acf.cs_hero_img.source_url} alt=""/>
                    }
                    <div className="hero-content">
                        <h1 dangerouslySetInnerHTML={{ __html: caseStudy.title }} />
                    </div>
                </div>

                {caseStudy.acf.cs_intro_headline &&
                    <div className="section" style={{backgroundColor: '#ede9e6'}}>
                        <div className="cs-container">
                                <p className="headline" dangerouslySetInnerHTML={{__html: caseStudy.acf.cs_intro_headline}}></p>
                                {caseStudy.acf.cs_intro_content && 
                                    <div className="cs-content" dangerouslySetInnerHTML={{__html: caseStudy.acf.cs_intro_content}}></div>
                                }

                                {caseStudy.acf.cs_intro_img.source_url &&
                                    <div className="cs-img">
                                        <img src={caseStudy.acf.cs_intro_img.source_url} alt=""/>
                                    </div>
                                }
                        </div>
                    </div>
                }

                {caseStudy.acf.cs_goals_headline &&
                    <div className="section">
                        <div className="cs-container">
                            <p className="headline" dangerouslySetInnerHTML={{__html: caseStudy.acf.cs_goals_headline}}></p>
                            <p dangerouslySetInnerHTML={{__html: caseStudy.acf.cs_goals_content}}></p>
                            {caseStudy.acf.cs_goals_repeater.map(a => a.cs_goal) &&
                                <ul className="cs-goals">
                                    {caseStudy.acf.cs_goals_repeater.map(function(a) {
                                        return (
                                            <li dangerouslySetInnerHTML={{__html: a.cs_goal}}></li>
                                        )
                                    })}
                                    
                                </ul>
                            }
                        </div>
                    </div>
                }

                {caseStudy.acf.cs_results_headline &&
                    <div className="section" style={{backgroundColor: '#ede9e6'}}>
                        <div className="cs-container">
                            {caseStudy.acf.cs_results_img.source_url &&
                                <div className="cs-img">
                                    <img src={caseStudy.acf.cs_results_img.source_url} alt=""/>
                                </div>
                            }
                            <p className="headline" dangerouslySetInnerHTML={{__html: caseStudy.acf.cs_results_headline}}></p>
                            {caseStudy.acf.cs_results_content && 
                                <div className="cs-content" dangerouslySetInnerHTML={{__html: caseStudy.acf.cs_results_content}}></div>
                            }
                        </div>
                    </div>
                }

                {caseStudy.acf.cs_quote &&
                    <div className="section">
                        <div className="cs-container">
                            <p className="quote" dangerouslySetInnerHTML={{__html: caseStudy.acf.cs_quote}}></p>
                            {caseStudy.acf.cs_quote_name &&
                                <p className="quote-name" dangerouslySetInnerHTML={{__html: caseStudy.acf.cs_quote_name}}></p>
                            }
                            {caseStudy.acf.cs_quote_title &&
                                <p className="quote-title" dangerouslySetInnerHTML={{__html: caseStudy.acf.cs_quote_title}}></p>
                            }
                        </div>
                    </div>
                }
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
            acf{
                cs_hero_img{
                    source_url
                }
                cs_intro_headline
                cs_intro_content
                cs_intro_img{
                  source_url
                }
                cs_goals_headline
                cs_goals_content
                cs_goals_repeater{
                  cs_goal
                }
                cs_results_img{
                  source_url
                }
                cs_results_headline
                cs_results_content
                cs_quote
                cs_quote_name
                cs_quote_title
            }
        }
        site {
            siteMetadata {
                title
                subtitle
            }
        }
    }
`