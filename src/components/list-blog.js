import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import BlogItems from "./items-blog";
import SectionTitle from "./sectiontitle";

export default function() {
    const query = useStaticQuery(graphql`
        query blogList {
            allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/blog/" } }
                limit: 6
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        id
                        frontmatter {
                            title
                            description
                            date
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
              posts (where: {categoryName: "Blog"}){
                edges{
                  node{
                    excerpt
                    slug
                    date
                    title
                    featuredImage {
                      sourceUrl(size: LARGE)
                      srcSet(size: MEDIUM_LARGE)
                    }
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

    if (query.wpgraphql.posts.edges.length > 0) {
      console.log("QUERY", query.allFile)
        return (
            <section id="blog" className="container">
                <div className="section-title">
                    <SectionTitle title="BLOG" />
                </div>
                <BlogItems data={query} />
            </section>
        );
    } else {
        return <React.Fragment></React.Fragment>;
    }
}
