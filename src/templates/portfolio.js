import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Date from "../components/date";
import { Row, Col } from "../components/page-components/grid";
import MD from "gatsby-custom-md";
import "../style/portfolio-singlepage.less";
import Image from '../components/image'

const components = {
    row: Row,
    col: Col,
    Image: Image
};

function ucwords(text) {
  let str = text.toLowerCase();
  return str.replace(/(^([a-zA-z\p{M}]))|([ -][a-zA-z\p{M}])/g,
    function(s) {
      return s.toUpperCase();
    });
}

export default function({ data }) {

  console.log(data)
  if (data.wpgraphql.post.elementorData != null) {
    console.log("IN ELEMENTOR")
    const elementorData = JSON.parse(data.wpgraphql.post.elementorData)

    const Page = elementorData.map(row => {
      console.log({ row })
      return (
        <div key={row.id} className="row">
        {
          row.elements.map(column => {
            console.log({column} )
            let str = `col-${column.settings._column_size}`;
            console.log("STRING: ", str)
            return (
              <div key={column.id} className="col-25">
              {
                column.elements.map(widget => {
                  console.log("RETURNED STRING: ", ucwords(widget.widgetType));

                  return (
                    React.createElement(
                      components[ucwords(widget.widgetType)],
                      {
                        ...widget.settings,
                        key: widget.id
                      }
                    )
                  )
                })
              }
              </div>
            )
          })
        }
        </div>
      )
    })
    return (
        <Layout>

            <div className="container">
                <article className="portfolio-post">
                    {Page}
                </article>
            </div>
        </Layout>
    );
  }
  else {
    console.log("IN NORMAL")
    return (
        <Layout>
            <SEO
                lang="en"
                title={data.wpgraphql.post.title}
                description={data.wpgraphql.post.excerpt}
                image={data.wpgraphql.post.featuredImage.title}
            />
            <div className="container">
                <article className="portfolio-post">
                    <div className="head text-primary">
                        <h1>{data.wpgraphql.post.title}</h1>
                        <p className="post-date">
                            <Date data={data.wpgraphql.post.date} />
                        </p>
                    </div>
                    <div className="content row flex">
                        <div className="col s12">
                            <div
                              className="text-tertiary"
                              dangerouslySetInnerHTML={{ __html: data.wpgraphql.post.content }}
                            />
                        </div>

                    </div>
                </article>
            </div>
        </Layout>
    );
  }


}

export const query = graphql`
query portfolioPosts($id: ID!, $id2: StringQueryOperatorInput) {

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
