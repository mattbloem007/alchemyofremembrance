import React from "react"
import { Link } from "gatsby"
import pic2 from '../assets/images/pic02.jpg';

export default props => {

  let isImage = true;
  if (props.node.featuredImage == null) {
   isImage = false;
  }

  console.log(isImage, " ", props.node.featuredImage);

  return (
    <article
    className={`post-card ${props.count % 3 === 0 && `post-card-large`} ${
      props.postClass
    } ${isImage ? `with-image` : `no-image`}`}
    style={
      {
        backgroundImage: `url(${ isImage ?
          props.node.featuredImage.sourceUrl : pic2
        })`,
      }
    }
  >
    <Link to={props.node.slug} className="post-card-link">
      <div className="post-card-content">
        <h2 className="post-card-title">
          {props.node.title || props.node.slug}
        </h2>
      </div>
    </Link>
  </article>
    )

}
