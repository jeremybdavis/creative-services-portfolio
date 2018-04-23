import React, { Component } from "react"
import Link from "gatsby-link"
import PropTypes from "prop-types"
import './templates.css'

class PortfolioTemplate extends Component {
    render() {
        const data = this.props.data;

        return(
            <div>
                <div className="nav-bg"></div>
                <h1>Portfolio</h1>

                {data.allWordpressWpCaseStudy.edges.map(({node}) => (
                    <div key={node.slug} className={"post"} style={{ marginBottom: 50 }}>
                        <Link to={`/portfolio/${node.slug}/`}>
                            <h3>{node.title}</h3>
                        </Link>

                        <div className={"post-content"} dangerouslySetInnerHTML={{__html: node.excerpt}} />

                        {node.date}
                    </div>
                ))}

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
                    date(formatString: "MMMM DD, YYYY")
                }
            }
        }
    }
`