import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PortfolioItems from "../components/items-portfolio";
import SectionTitle from "../components/sectiontitle";
import Pagination from "../components/pagination";
import SEO from "../components/seo";

class PortfolioList extends React.Component {
    render() {
        const query = this.props.datas;
        if (query.wpgraphql.posts.edges.length > 0) {
            return (
                <section id="portfolio" className="container">
                    <div className="section-title">
                        <SectionTitle title="PORTFOLIO" />
                    </div>
                    <PortfolioItems data={query} />
                    <Pagination
                        pathContext={this.props.pathContext}
                        type="portfolio"
                    />
                </section>
            );
        } else {
            return <React.Fragment></React.Fragment>;
        }
    }
}

export default function({ data, pathContext }) {
    return (
        <Layout>
            <SEO lang="en" title="Portfolio" />
            <PortfolioList datas={data} pathContext={pathContext} />
        </Layout>
    );
}

export const query = graphql`
query portfolioListPage($limit: Int!) {
    wpgraphql {
      posts(where: {categoryName: "Portfolio", orderby: {field: DATE, order: DESC}}, first: $limit) {
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
`;
