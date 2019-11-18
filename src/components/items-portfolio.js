import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import "../style/list-portfolio.less";

class PortfolioItem extends React.Component {
    render() {
      let isImage = false;
      console.log("FILE", this.props.file)
      if ("file" in this.props) {
        if (this.props.file.node.childImageSharp) {
          isImage = true;
        }
      }

        return (
            <div className="item col s12">
                <div className="row flex">
                    <div className="col m6 image">
                    {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid}/> : null}

                        <Link
                            to={this.props.data.node.slug}
                            title={this.props.data.node.title}
                            aria-label={this.props.data.node.title}
                            className="overlay-link"
                            style={{ opacity: 0 }}
                        >
                            {this.props.data.node.title}
                        </Link>
                    </div>
                    <div className="col m6 content">
                        <h2 className="text-primary pseudo-divider">
                            <Link
                                to={this.props.data.node.slug}
                                title={this.props.data.node.title}
                                aria-label={
                                    this.props.data.node.title
                                }
                            >
                                {this.props.data.node.title}
                            </Link>
                        </h2>
                        <div
                          className="text-tertiary"
                          dangerouslySetInnerHTML={{ __html: this.props.data.node.excerpt }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default function(props) {
    //const data = props.data.allMarkdownRemark.edges;
    let items = [];
    let fileIndex;
    console.log("ITEMS: ", props.data)
    if (props.data.wpgraphql.posts.edges != undefined) {
      const data = props.data.wpgraphql.posts.edges;
      data.forEach(function(e, i) {
        console.log("E:" , e)
        fileIndex = props.data.allFile.edges.find(({node}) => {
          if (node.parent) {
            console.log(node.parent.id)
            if (node.parent.id == "SitePage /" + e.node.slug) {
              return node
            }
          }
        })
         console.log("FILEINDEX: ", fileIndex)
        if (fileIndex) {
          items.push(<PortfolioItem key={e.node.id} data={e} file={fileIndex}/>);
        }
        else {
          console.log("E: ", e)
             items.push(<PortfolioItem key={e.node.id} data={e}/>);
       }
      });
    }

    return <div className="row">{items}</div>;
}
