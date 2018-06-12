import React, { Component } from 'react'
import Link from 'gatsby-link'
import './index.css'

class IndexPage extends Component {
    render() {
        const data = this.props.data
        console.log(data)
        const acfFields = data.wordpressAcfPages.acf
        const caseStudies = data.allWordpressWpCaseStudy
        const posts = data.allWordpressPost

        return(
            <div className="home">
                <div className="hero">
                    <img src={acfFields.home_hero_bg_img.source_url} alt="Hero Image"/>
                    <div className="hero-content">
                        <h1>{acfFields.home_hero_headline}</h1>
                        <p>{acfFields.home_hero_tagline}</p>
                    </div>
                </div>

                <div className="section who-we-are">
                    <div className="content">
                        <h2>{acfFields.home_about_headline}</h2>
                        <div dangerouslySetInnerHTML={{__html: acfFields.home_about_content}}/>
                        <Link to="/what-we-do/" className="btn">View More</Link>
                    </div>
                </div>

                <div className="section case-studies">
                    <h2>{acfFields.home_portfolio_headline}</h2>
                    <div className="latest-work">
                        {caseStudies.edges.slice(-3).reverse().map(({node}) => (
                            <div key={node.slug} className="post">
                                <Link to={`/portfolio/${node.slug}`}>
                                    <div className="post-img">
                                        <img src={node.featured_media.source_url} alt={node.title}/>
                                        <div className="post-hover">
                                            <span>View Project</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section" style={{backgroundColor: '#ede9e6'}}>
                    <h2>Blog</h2>
                    <div className="home-blog">
                        {posts.edges.slice(0,3).map(({node}) => (
                            <div key={node.slug} className="post">
                                <Link to={`/blog/${node.slug}/`}>
                                    <div className="post-img">
                                        <img src={node.featured_media.source_url} alt={node.title}/>
                                        <div className="post-hover">
                                            <span>View Post</span>
                                        </div>
                                    </div>
                                    <h3 dangerouslySetInnerHTML={{__html: node.title}}></h3>
                                </Link>
                                <p dangerouslySetInnerHTML={{__html: node.excerpt}}></p>
                                <Link to={`/blog/${node.slug}/`} className="view-post">View Post</Link>
                            </div>
                        ))}
                    </div>
                    <Link to="/blog/" className="btn">View More</Link>
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
        home_hero_tagline
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

    allWordpressPost{
        edges{
            node{
                id
                title
                excerpt
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