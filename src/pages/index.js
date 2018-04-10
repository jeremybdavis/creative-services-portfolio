import React, { Component } from 'react'
import Link from 'gatsby-link'
import './index.css'

class IndexPage extends Component {
    render() {
        const data = this.props.data
        const acfFields = data.wordpressAcfPages.acf

        return(
            <div>
                <div className="hero">
                    <img src={acfFields.home_hero_bg_img.source_url} alt="Hero Image"/>
                    <h1>{acfFields.home_hero_headline}</h1>
                </div>

                <div className="section who-we-are">
                    <div className="content">
                        <h2>{acfFields.home_about_headline}</h2>
                        <div dangerouslySetInnerHTML={{__html: acfFields.home_about_content}}/>
                    </div>
                </div>

                <div className="section" style={{backgroundColor: '#ede9e6'}}>
                    <h2>{acfFields.home_portfolio_headline}</h2>
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
        home_hero_bg_img{
            source_url
        }
        home_about_headline
        home_about_content
        home_portfolio_headline
      }
    }
  }
`