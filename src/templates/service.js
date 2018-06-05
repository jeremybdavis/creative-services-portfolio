import React, { Component } from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import './templates.css'

class ServiceTemplate extends Component {
    render() {
        const service = this.props.data.wordpressWpServices

        return (
            <div>
                <div className="hero">
                    <h1 dangerouslySetInnerHTML={{ __html: service.title}} />
                    {service.acf.service_headline &&
                        <p dangerouslySetInnerHTML={{ __html: service.acf.service_headline}}></p>
                    }

                    {service.acf.service_description &&
                        <p dangerouslySetInnerHTML={{ __html: service.acf.service_description}}></p>
                    }
                </div>

                <div className="section">
                    {service.acf.service_section_title && 
                        <h2 dangerouslySetInnerHTML={{__html: service.acf.service_section_title}}></h2>
                    }

                    {service.acf.service_section_description && 
                        <p dangerouslySetInnerHTML={{__html: service.acf.service_section_description}}></p>
                    }
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