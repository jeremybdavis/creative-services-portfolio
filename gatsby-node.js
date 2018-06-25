const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

const pageQuery = `
{
  allWordpressPage {
    edges {
      node {
        id
        slug
        status
        template
      }
    }
  }
}
`

const postsQuery = `
{
  allWordpressPost {
    edges {
      node {
        id
        slug
        status
        template
        format
      }
    }
  }
}
`

const portfolioQuery = `
{
    allWordpressWpCaseStudy{
        edges{
            node{
                id
                title
                slug
            }
        }
    }
}
`

const servicesQuery = `
{
    allWordpressWpServices{
        edges{
            node{
                id
                title
                slug
            }
        }
    }
}
`

const categoryQuery = `
{
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


exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;


    return new Promise((resolve, reject) => {

        // Pages
        graphql(pageQuery)
            .then(result => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(result.errors);
                }

                const pageTemplate = path.resolve("./src/templates/page.js");

                _.each(result.data.allWordpressPage.edges, edge => {
                    createPage({
                        path: `/${edge.node.slug}/`,
                        component: slash(pageTemplate),
                        context: {
                            id: edge.node.id,
                        },
                    });
                });
            })

            .then(() => {
                graphql(postsQuery)
                    .then(result => {
                        if (result.errors) {
                            console.log(result.errors);
                            reject(result.errors);
                        }
                        const postTemplate = path.resolve("./src/templates/post.js");
                        const blogTemplate = path.resolve("./src/templates/blog.js");

                        // Create Posts
                        createPage({
                            path: `/blog/`,
                            component: slash(blogTemplate)
                        });

                        _.each(result.data.allWordpressPost.edges, edge => {
                            createPage({
                                path: `/blog/${edge.node.slug}/`,
                                component: slash(postTemplate),
                                context: {
                                    id: edge.node.id,
                                },
                            });
                        });
                        resolve();
                    });
            })

            .then(() => {
                graphql(portfolioQuery)
                    .then(result => {
                        if (result.errors) {
                            console.log(result.errors);
                            reject(result.errors);
                        }

                        const caseStudyTemplate = path.resolve("./src/templates/case-study.js");
                        const portfolioTemplate = path.resolve("./src/templates/portfolio.js");

                        // Create Portfolio
                        createPage({
                            path: `/portfolio/`,
                            component: slash(portfolioTemplate)
                        });

                        _.each(result.data.allWordpressWpCaseStudy.edges, edge => {
                            createPage({
                                path: `/portfolio/${edge.node.slug}/`,
                                component: slash(caseStudyTemplate),
                                context: {
                                    id: edge.node.id,
                                },
                            });
                        });
                        resolve();
                    });
            })

            .then(() => {
                graphql(servicesQuery)
                    .then(result => {
                        if (result.errors) {
                            console.log(result.errors);
                            reject(result.errors);
                        }

                        const serviceTemplate = path.resolve("./src/templates/service.js");

                        _.each(result.data.allWordpressWpServices.edges, edge => {
                            createPage({
                                path: `/services/${edge.node.slug}/`,
                                component: slash(serviceTemplate),
                                context: {
                                    id: edge.node.id,
                                    slug: edge.node.slug,
                                },
                            });
                        });
                        resolve();
                    });
            })

            .then(() => {
                graphql(categoryQuery)
                    .then(result => {
                        if (result.errors) {
                            console.log(result.errors);
                            reject(result.errors);
                        }

                        const categoryTemplate = path.resolve("./src/templates/blog-category.js");

                        _.each(result.data.allWordpressCategory.edges, edge => {
                            createPage({
                                path: `/blog/${edge.node.slug}/`,
                                component: slash(categoryTemplate),
                                context: {
                                    id: edge.node.id,
                                },
                            })
                        });
                        resolve();
                    });
            });


        // ==== END POSTS ====
    });
};