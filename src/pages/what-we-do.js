import React, {Component} from "react"
import Link from 'gatsby-link'
import './pages.css'
import './what-we-do.css'

class WhatWeDoPage extends Component {
    render() {
        const data = this.props.data
        const services = data.allWordpressWpServices
        const acfFields = data.wordpressAcfPages.acf

        return (
            <div className="wwd">
                <div className="hero">
                    {acfFields.what_we_do_hero_image.source_url &&
                        <img src={acfFields.what_we_do_hero_image.source_url} className="hero-icon-arc" alt=""/>
                    }
                    <div className="hero-content">
                        <h1>{acfFields.what_we_do_headline}</h1>
                        <p>{acfFields.what_we_do_description}</p>
                    </div>
                </div>

                <div className="services">
                    {services.edges.map(({node}) => (
                        <div key={node.slug} className="service">
                            <p className="service-name">{node.title}</p>
                            <p className="service-excerpt">{node.acf.service_excerpt}</p>
                            <Link to={`/services/${node.slug}`}>
                                Learn More
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="section" style={{backgroundColor: '#ede9e6'}}>
                    <p className="quote">{acfFields.what_we_do_quote}</p>
                    <p className="quote-name">- {acfFields.wwd_quote_name}</p>
                    <p className="quote-title">{acfFields.wwd_quote_title}</p>
                </div>
            </div>
        )
    }
}

export default WhatWeDoPage

export const servicesPageQuery = graphql`
  query servicesPageQuery{

    allWordpressWpServices(sort:{
        order:ASC,
        fields: [slug]
    }) {
        edges {
            node {
                slug
                title
                acf{
                    service_excerpt
                }
            }
        }
    }

    wordpressAcfPages{
        acf{
            what_we_do_hero_image{
                source_url
            }
            what_we_do_headline
            what_we_do_description
            what_we_do_quote
            wwd_quote_name
            wwd_quote_title
        }
    }
  }
`