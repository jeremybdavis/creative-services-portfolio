import React, { Component } from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import './templates.css'

class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost

    return (
      <div className="section blog-post">
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    )
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostTemplate

export const pageQuery = graphql`
  query currentPostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
    }
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`