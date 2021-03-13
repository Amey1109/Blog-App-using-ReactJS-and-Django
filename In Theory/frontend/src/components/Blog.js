import React from "react";

export default function Blog(props) {
  return (
    <div>
      
      <div className="row featurette mb-3">
        <div className="col-md-5 shadow-lg">
          <h2 className="featurette-heading">
            <span className="text-muted">{props.title}</span>
          </h2>
          <p className="lead">{props.body}</p>
        </div>
        <div className="col-md-5">
          <img
            src={`https://source.unsplash.com/1600x900/?technology,technews,sci-fi,${props.title}`}
            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto shadow-lg"
            width="500"
            height="500"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
            aria-label="Placeholder: 500x500"
          />

          {/* <rect width="100%" height="100%" fill="#eee"></rect> */}
        </div>
      </div>
    </div>
  );
}
