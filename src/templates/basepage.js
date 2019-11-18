import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image";
import SEO from "../components/seo";
import "../style/basepage.less";

export default function({ data }) {
    return (
        <Layout>
            <SEO
                lang="en"
                title={data.wpgraphql.page.title}
                description={data.wpgraphql.page.excerpt}
            />
            <div className="container">
                <article className="post">
                    <div className="head text-primary">
                        <h1>{data.wpgraphql.page.title}</h1>
                    </div>
                    <div className="content row flex">
                        {data.wpgraphql.page.featuredImage != null && (
                            <div className="center">
                                <div className="img">
                                    <img
                                        src={
                                            data.wpgraphql.page.featuredImage.sourceUrl
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        <div
                            className="col s12 m11 l10"
                            dangerouslySetInnerHTML={{
                                __html: data.wpgraphql.page.content
                            }}
                        ></div>
                    </div>
                </article>
            </div>
        </Layout>
    );
}

export const query = graphql`
query GET_PAGES($id: ID!) {
wpgraphql {
page(id: $id) {
  id
  title
  date
  uri
  excerpt
  content
  featuredImage {
    sourceUrl
    title
  }
}

}
}
`;
