import React, { Component } from "react"
import Link from "gatsby-link"
import PropTypes from "prop-types"
import './templates.css'
import './blog.css'

class PostsTemplate extends Component {
    catSelect(e) {
        console.log(e.target.dataset.id);
    }

    render() {
        const data = this.props.data;
        const acfFields = data.wordpressAcfPages.acf;
        const categories = data.allWordpressCategory;

        return(
            <div className="blog">
                <div className="hero">
                    <div className="hero-content">
                        <h1>Blog</h1>
                        <h3>{acfFields.blog_subheadline}</h3>
                    </div>
                </div>
                <div className="section" style={{backgroundColor: '#ede9e6'}}>
                    <div className="filter">
                            <p>Filter:</p>
                            <ul>
                                {categories.edges.map(({node}) => (
                                    <li key={node.id} data-id={node.id} onClick={this.catSelect}>
                                        <Link to={`/blog/${node.slug}/#posts`}>{node.name}</Link>
                                    </li>
                                ))}
                            </ul>
                    </div>
                    <div id="posts" className="blog-posts">
                        {data.allWordpressPost.edges.map(({node}) => (
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
    query categoryQuery($id: String!){
        allWordpressPost(filter:{
            categories: {
              id: {
                eq: $id
              }
            }
          }, 
            sort: {
              order: ASC, 
              fields: [date]
            }) {
            edges {
              node {
                id
                title
                content
                featured_media{
                    source_url
                }
              }
            }
          }

        wordpressAcfPages {
            acf {
                blog_subheadline
            }
        }

        allWordpressCategory{
            edges{
                node{
                    id
                    name
                    slug
               }
            }
        }

        
    }
`