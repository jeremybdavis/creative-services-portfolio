import React, { Component } from "react"
import Link from "gatsby-link"
import PropTypes from "prop-types"
import './templates.css'

class PostsTemplate extends Component {
    render() {
        const data = this.props.data;
        const acfFields = data.wordpressAcfPages.acf

        return(
            <div className="blog">
                <div className="nav-bg"></div>
                <h1>Blog</h1>
                <h3>{acfFields.blog_subheadline}</h3>

                {data.allWordpressPost.edges.map(({node}) => (
                    <div key={node.slug} className={"post"} style={{ marginBottom: 50 }}>
                        <Link to={node.slug}>
                            <h3 dangerouslySetInnerHTML={{__html: node.title}}></h3>
                        </Link>

                        <div className={"post-content"} dangerouslySetInnerHTML={{__html: node.excerpt}} />

                        {node.date}
                    </div>
                ))}

            </div>
        )
    }
}

PostsTemplate.propTypes = {
    data: PropTypes.object.isRequired,
    edges: PropTypes.array,
}

export default PostsTemplate

export const pageQuery = graphql`
    query postsQuery{
        allWordpressPost{
            edges{
                node{
                    id
                    title
                    excerpt
                    slug
                    date(formatString: "MMMM DD, YYYY")
                }
            }
        }

        wordpressAcfPages {
            acf {
                blog_subheadline
            }
        }
    }
`