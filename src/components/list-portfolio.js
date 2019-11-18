import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import PortfolioItems from "./items-portfolio";

export default function() {
    const query = useStaticQuery(graphql`
        query portfolioList {
            allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/portfolio/" } }
                limit: 6
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        id
                        frontmatter {
                            title
                            description
                            image {
                                publicURL
                                childImageSharp {
                                    fluid(maxWidth: 1920) {
                                        srcSet
                                        ...GatsbyImageSharpFluid
                                    }
                                    id
                                }
                            }
                        }
                        fields {
                            slug
                        }
                    }
                }
            }

            wpgraphql {
              posts (where: {categoryName: "Portfolio"}){
                edges{
                  node{
                    id
                    excerpt
                    slug
                    date
                    title
                    content
                    elementorData
                  }
                }
              }
            }

              allFile {
                edges {
                  node {
                    name
                    parent{
                      id
                    }
                    childImageSharp {
                      fluid (maxWidth: 500){
                        srcSet
                        ...GatsbyImageSharpFluid

                      }
                    }
                  }
                }
              }
        }
    `);

    return (
        <section id="portfolio" className="container">
            <PortfolioItems data={query} />
        </section>
    );
}
