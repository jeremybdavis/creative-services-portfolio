import React, { Component } from "react"
import './templates.css'

class ServiceTemplate extends Component {
    render() {
        const service = this.props.data.wordpressWpServices

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

                <div className="section">

                </div>
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
                service_section_title
                service_section_description
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