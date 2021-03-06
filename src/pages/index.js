import React, { Component } from 'react'
import Link from 'gatsby-link'
import './index.css'
import YouTube from 'react-youtube'

class IndexPage extends Component {
    _onReady(event) {
        // access to player in all event handlers via event.target
        // event.target.mute();
      }
      
      _onEnd(event) {
        event.target.playVideo();
      }

    render() {
        const data = this.props.data
        const acfFields = data.wordpressAcfPages.acf
        console.log(data)
        const caseStudies = data.allWordpressWpCaseStudy
        const posts = data.allWordpressPost

        const videoOptions = {
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                controls: 0,
                rel: 0,
                showinfo: 0,
                mute: 1
            }
        }

        return(
            <div className="home">
                <div className="hero">
                    <div className="video-background">
                        <div className="video-foreground">
                            <YouTube
                                videoId="sH8dievol2s"
                                opts={videoOptions}
                                className="video-iframe"
                                onReady={this._onReady}
                                onEnd={this._onEnd}
                            />
                        </div>
                    </div>
                    <div className="hero-content">
                        <h1>{acfFields.home_hero_headline}</h1>
                        <p>{acfFields.home_hero_tagline}</p>
                    </div>
                </div>

                <div className="section who-we-are" style={{backgroundColor: '#fff'}}>
                    <img src={acfFields.home_about_bg_img.source_url} alt=""/>
                    <div className="content">
                        <h2>{acfFields.home_about_headline}</h2>
                        <div style={{marginBottom: '30px'}} dangerouslySetInnerHTML={{__html: acfFields.home_about_content}}/>
                        <Link to="/what-we-do/" className="btn">View More</Link>
                    </div>
                </div>

                <div className="section case-studies" style={{backgroundColor: '#fff'}}>
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
                                <div className="excerpt" dangerouslySetInnerHTML={{__html: node.excerpt}}></div>
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
        home_about_bg_img{
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