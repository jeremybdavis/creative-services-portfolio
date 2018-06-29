import React, { Component } from "react"
import Link from "gatsby-link"
import './templates.css'
import './service.css'

class ServiceTemplate extends Component {
    render() {
        const service = this.props.data.wordpressWpServices
        const repeater = service.acf.service_repeater
        const posts = this.props.data.allWordpressPost
        console.log(this.props.data)

        return (
            <div className="service-page">
                <div className="hero">
                    {service.acf.service_hero_image.source_url &&
                        <img src={service.acf.service_hero_image.source_url} alt="" className="hero-icon-arc"/>
                    }
                    <div className="hero-content">
                        <h1 dangerouslySetInnerHTML={{ __html: service.title}} />
                        {service.acf.service_headline &&
                            <p className="hero-headline" dangerouslySetInnerHTML={{ __html: service.acf.service_headline}}></p>
                        }

                        <div className="divider"></div>

                        {service.acf.service_description &&
                            <p dangerouslySetInnerHTML={{ __html: service.acf.service_description}}></p>
                        }
                    </div>
                </div>

                {repeater.map(a => a.service_example_headline.length) && 
                    <div className="section" style={{backgroundColor: '#ede9e6'}}>
                        <div className="service-examples">
                            {repeater.map(
                                a => a.service_example_headline) &&
                                    <p className="service-example-headline" dangerouslySetInnerHTML={{ __html: repeater.map(a => a.service_example_headline)}}></p>
                            }
                            {repeater.map(
                                a => a.service_example_description) &&
                                    <p dangerouslySetInnerHTML={{ __html: repeater.map(a => a.service_example_description)}}></p>
                            }

                            {repeater.map(
                                nested => nested.service_example_repeater.map(function(a) {
                                    return (
                                        <div className="service-example">
                                            {a.service_example_visual==='image' ? <img src={a.service_example_img.source_url}/> : <div dangerouslySetInnerHTML={{ __html: a.service_example_video}}></div> }
                                            <p className="service-example-title">{a.service_example_title}</p>
                                            <p>{a.service_example_description}</p>
                                            <p className="service-example-quote">{a.service_example_quote}</p>
                                        </div>
                                    )
                                })
                            )}
                        </div>

                        {posts && 
                            <div className="section recent-posts-container">
                                <p className="headline">Recent {service.title} Posts</p>

                                <div className="blog-posts">
                                    {posts.edges.map(({node}) => (
                                        <div key={node.slug} className={"post"}>
                                            <Link to={`/blog/${node.slug}/`}>
                                                <div className="post-img">
                                                    <img src={node.featured_media.source_url} alt={node.title}/>
                                                    <div className="post-hover">
                                                        <span>View Post</span>
                                                    </div>
                                                </div>
                                                <h3 dangerouslySetInnerHTML={{__html: node.title}}></h3>
                                            </Link>
                                            <div className="post-content">
                                                <p dangerouslySetInnerHTML={{__html: node.excerpt}}></p>
                                                <Link to={`/blog/${node.slug}/`} className="view-post">View Post</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}


export default ServiceTemplate

export const pageQuery = graphql`
    query currentServiceQuery($id: String!, $slug: String!) {
        wordpressWpServices(id: { eq: $id }) {
            title
            content
            acf {
                service_hero_image{
                    source_url
                }
                service_headline
                service_description
                service_repeater{
                    service_example_headline
                    service_example_description
                    service_example_repeater{
                        service_example_visual
                        service_example_img{
                            source_url
                        }
                        service_example_video
                        service_example_title
                        service_example_description
                        service_example_quote
                    }
                }
            }
        }

        site {
            siteMetadata {
                title
                subtitle
            }
        }

        allWordpressPost(filter:{
            categories: {
                slug:{
                    eq: $slug
                }
            }
        },
        sort:{
            order:ASC,
            fields:[date]
        }) {
            edges {
                node{
                    slug
                    title
                    excerpt
                    featured_media{
                        source_url
                    }
                }
            }
        }
    }
`