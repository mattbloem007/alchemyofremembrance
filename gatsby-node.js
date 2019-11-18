const { createFilePath, createRemoteFileNode } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    return graphql(`
        {
            blog: allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/blog/" } }
            ) {
                edges {
                    node {
                        frontmatter {
                            template
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
            portfolio: allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/portfolio/" } }
            ) {
                edges {
                    node {
                        frontmatter {
                            template
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
            basepages: allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/basepages/" } }
            ) {
                edges {
                    node {
                        frontmatter {
                            template
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
            limitPost: site {
                siteMetadata {
                    blogItemsPerPage
                    portfolioItemsPerPage
                }
            }

            wpgraphql {
            posts {
              edges {
                node {
                  id
                  slug
                  featuredImage{
                    sourceUrl
                  }
                  categories {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                  elementorData
                }
              }
            }

            pages {
              edges {
                node {
                  id
                  slug
                }
              }
            }

            products {
              edges {
                node {
                  id
                  slug
                }
              }
            }

            }
        }




    `).then(result => {
        const blogPosts = result.data.wpgraphql.posts.edges;
        const allPages = result.data.wpgraphql.pages.edges;
        console.log(blogPosts)

        const blogPostsPerPage =
            result.data.limitPost.siteMetadata.blogItemsPerPage;
        const numBlogPages = Math.ceil(blogPosts.length / blogPostsPerPage);

        Array.from({ length: numBlogPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/blog` : `/blog/${i + 1}`,
                component: path.resolve("./src/templates/blog-list.js"),
                context: {
                    limit: blogPostsPerPage,
                    skip: i * blogPostsPerPage,
                    numPages: numBlogPages,
                    currentPage: i + 1
                }
            });
        });

        const PortfolioItems = result.data.portfolio.edges;
        const PortfolioItemsPerPage =
            result.data.limitPost.siteMetadata.portfolioItemsPerPage;
        const numPortfolioItems = Math.ceil(
            PortfolioItems.length / PortfolioItemsPerPage
        );

        Array.from({ length: numPortfolioItems }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/portfolio` : `/portfolio/${i + 1}`,
                component: path.resolve("./src/templates/portfolio-list.js"),
                context: {
                    limit: blogPostsPerPage,
                    skip: i * blogPostsPerPage,
                    numPages: numPortfolioItems,
                    currentPage: i + 1
                }
            });
        });

        blogPosts.forEach(({ node }) => {
            createPage({
                path: node.slug,
                component: path.resolve("./src/templates/blog.js"),
                context: {
                    id: node.id,
                    slug: node.slug,
                    featuredImage: node.featuredImage,
                    id2:  {"eq": "SitePage /" + node.slug},
                    id3: "SitePage /" + node.slug
                }
            });
        });

        blogPosts.forEach(({ node }) => {
          console.log("NODE: ", (node.categories.edges[0].node.name).toLowerCase())
            let template =
                node.categories.edges[0].node.name === undefined
                    ? "portfolio"
                    : (node.categories.edges[0].node.name).toLowerCase();
            createPage({
                path: node.slug,
                component: path.resolve("./src/templates/" + template + ".js"),
                context: {
                    id: node.id,
                    slug: node.slug,
                    featuredImage: node.featuredImage,
                    id2:  {"eq": "SitePage /" + node.slug},
                    id3: "SitePage /" + node.slug
                }
            });
        });

        allPages.forEach(({ node }) => {
            createPage({
                path: node.slug,
                component: path.resolve("./src/templates/basepage.js"),
                context: {
                    id: node.id,
                    slug: node.slug
                }
            });
        });
    });
};

exports.onCreateNode = async ({ node, getNode, actions, store, cache, createNodeId, _auth, }) => {
    const { createNodeField, createNode } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `basepages` });
        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
    }
    let fileNode

    if (node.internal.type === `SitePage`) {
     if (node.context != undefined) {

       if (node.context.featuredImage) {
         try {
           fileNode = await createRemoteFileNode({
             url: node.context.featuredImage.sourceUrl,
             parentNodeId: node.id,
             store,
             cache,
             createNode,
             createNodeId,
             auth: _auth,
           })
         } catch (e) {
           // Ignore
         }
       }
      }
    }
    if (fileNode) {
      node.localFile___NODE = fileNode.id
    }
};
