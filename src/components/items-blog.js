import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import Date from "./date";
import { Calendar } from "./icons";
import "../style/list-blog.less";
import pic from '../../static/images/logo.png'

class BlogItem extends React.Component {
    componentDidMount() {
        this.color = window
            .getComputedStyle(this.textSecondary, null)
            .getPropertyValue("color");
        const calendar = this.textSecondary.querySelector("path");
        calendar.setAttribute("fill", this.color);
        console.log("DATA", this.props.data)
    }

    render() {
      let isImage = false;
      console.log("FILE", this.props.file)
      if (this.props.file.node.childImageSharp) {
        isImage = true;
      }
        return (
            <div className="item col s12 m6">
                <div className="box">
                    <div className="image">
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
                    <div className="content">
                        <h3 className="text-primary">
                            <Link
                                to={this.props.data.node.slug}
                                title={this.props.data.node.title}
                            >
                                {this.props.data.node.title}
                            </Link>
                        </h3>
                        <div
                          className="text-tertiary"
                          dangerouslySetInnerHTML={{ __html: this.props.data.node.excerpt }}
                        />
                        <p
                            className="date text-secondary"
                            ref={c => (this.textSecondary = c)}
                        >
                            <span className="icon">
                                <Calendar />
                            </span>
                            <Date
                                data={this.props.data.node.date}
                            />
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default function(props) {
    console.log(props.data)
    let items = [];
    let fileIndex;
    if (props.data.wpgraphql.posts.edges != undefined) {
      const data = props.data.wpgraphql.posts.edges;
      data.forEach(function(e, i) {
          if (props.remove && e.node.id === props.remove) return;
            fileIndex = props.data.allFile.edges.find(({node}) => {
              if (node.parent) {
                console.log(node.parent.id)
                if (node.parent.id == "SitePage /" + e.node.slug) {
                  return node
                }
              }
            })
            console.log(fileIndex)
            if (fileIndex) {
              items.push(<BlogItem key={e.node.id} data={e} file={fileIndex}/>);
            }

      });
    }
    return <div className="row">{items}</div>;
}
