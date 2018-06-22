import React, { Component } from "react"
import './templates.css'

class ServiceTemplate extends Component {
    render() {
        const service = this.props.data.wordpressWpServices
        const repeater = service.acf.service_repeater
        console.log(service)

        return (
            <div className="service-page">
                <div className="hero">
                    <div className="hero-content">
                        <h1 dangerouslySetInnerHTML={{ __html: service.title}} />
                        {service.acf.service_headline &&
                            <p dangerouslySetInnerHTML={{ __html: service.acf.service_headline}}></p>
                        }

                        {service.acf.service_description &&
                            <p dangerouslySetInnerHTML={{ __html: service.acf.service_description}}></p>
                        }
                    </div>
                </div>

                {repeater.map(a => a.service_example_headline.length) && 
                    <div className="section service-examples">
                        {repeater.map(
                            a => a.service_example_headline) &&
                                <p dangerouslySetInnerHTML={{ __html: repeater.map(a => a.service_example_headline)}}></p>
                        }
                        {repeater.map(
                            a => a.service_example_description) &&
                                <p dangerouslySetInnerHTML={{ __html: repeater.map(a => a.service_example_description)}}></p>
                        }

                        {repeater.map(
                            nested => nested.service_example_repeater.map(function(a) {
                                return (
                                    <div className="service-example">
                                        {a.service_example_visual==='image' ? <img src={a.service_example_img.source_url}/> : <div>{a.service_example_video}</div> }
                                        <p className="service-example-title">{a.service_example_title}</p>
                                        <p>{a.service_example_description}</p>
                                        <p>{a.service_example_quote}</p>
                                    </div>
                                )
                            })
                        )}
                    </div>
                }

                <div dangerouslySetInnerHTML={{ __html: service.content }} />
            </div>
        )
    }
}


export default ServiceTemplate

export const pageQuery = graphql`
    query currentServiceQuery($id: String!) {
        wordpressWpServices(id: { eq: $id }) {
            title
            content
            acf {
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
    }
`