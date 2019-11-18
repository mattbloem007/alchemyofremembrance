import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import LatestPosts from "../components/blogposts-latest";
import SEO from "../components/seo";
import Date from "../components/date";
import "../style/blog-singlepage.less";

export default function({ data }) {
    return (
        <Layout>
            <SEO
                lang="en"
                title={data.wpgraphql.post.title}
                description={data.wpgraphql.post.excerpt}
                image={data.wpgraphql.post.featuredImage.title}
            />
            <div className="container">
                <article className="blog-post">
                    {data.wpgraphql.post.featuredImage != null && (
                        <div className="banner">
                            <Img
                                fluid={
                                    data.file.childImageSharp.fluid
                                }
                            />
                        </div>
                    )}
                    <div className="head text-primary">
                        <h1>{data.wpgraphql.post.title}</h1>
                        <p className="post-date">
                            <Date data={data.wpgraphql.post.date} />
                        </p>
                    </div>
                    <div className="content row flex">
                        <div
                            className="col s12 m11 l10"
                            dangerouslySetInnerHTML={{
                                __html: data.wpgraphql.post.content
                            }}
                        ></div>
                    </div>
                </article>
                <LatestPosts id={data.wpgraphql.post.id} />
            </div>
        </Layout>
    );
}

export const query = graphql`
query GET_POSTS($id: ID!, $id2: StringQueryOperatorInput) {

wpgraphql {
post(id: $id) {
  id
  postId
  title
  date
  uri
  excerpt
  content
  featuredImage {
    sourceUrl
    title
  }
  elementorData
}
}

file(parent: {id: $id2}) {
    name
    childImageSharp {
      fluid (maxWidth: 500){
        srcSet
        ...GatsbyImageSharpFluid

      }
    }
  }
}
`;
