import React, { Component } from 'react'
import Link from 'gatsby-link'
import './index.css'

class IndexPage extends Component {
    render() {
        const data = this.props.data
        const acfFields = data.wordpressAcfPages.acf
        const caseStudies = data.allWordpressWpCaseStudy

        return(
            <div>
                <div className="hero">
                    <img src={acfFields.home_hero_bg_img.source_url} alt="Hero Image"/>
                    <h1>{acfFields.home_hero_headline}</h1>
                </div>

                <div className="section who-we-are">
                    <div className="content">
                        <h2>{acfFields.home_about_headline}</h2>
                        <div dangerouslySetInnerHTML={{__html: acfFields.home_about_content}}/>
                    </div>
                </div>

                <div className="section" style={{backgroundColor: '#ede9e6'}}>
                    <h2>{acfFields.home_portfolio_headline}</h2>
                    <div className="latest-work">
                        {caseStudies.edges.slice(-3).reverse().map(({node}) => (
                            <div key={node.slug} className="case-study">
                                <Link to={node.slug}>
                                    <div className="cs-img">
                                        <img src={node.featured_media.source_url} alt={node.title}/>
                                        <div className="cs-hover">
                                            <span>View Project</span>
                                        </div>
                                    </div>
                                    <h3 dangerouslySetInnerHTML={{__html: node.title}}></h3>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default IndexPage

export const homePageQuery = graphql`
  query homePageQuery{
    wordpressAcfPages {
      acf {
        home_hero_headline
        home_hero_bg_img{
            source_url
        }
        home_about_headline
        home_about_content
        home_portfolio_headline
      }
    }

    allWordpressWpCaseStudy{
        edges{
            node{
                id
                title
                slug
                date(formatString: "MMMM DD, YYYY")
                featured_media{
                    source_url
                }
            }
        }
    }
  }
`