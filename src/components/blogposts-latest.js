import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import BlogItems from "./items-blog";

export default function(props) {
    const query = useStaticQuery(graphql`
      query latestBlogList {
          wpgraphql {
            posts(where: {categoryName: "Blog", orderby: {field: DATE, order: DESC}}, first: 6) {
              edges {
                node {
                  excerpt
                  slug
                  date
                  title
                  featuredImage {
                    sourceUrl
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
        return (
            <section id="latest-blogposts" className="container">
                <div className="section-title">
                    <h2>Latest Blogposts</h2>
                </div>
                <BlogItems data={query} remove={props.id} />
            </section>
        );
    } else {
        return <React.Fragment></React.Fragment>;
    }
}
