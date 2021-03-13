import React from "react";
import { Link } from "react-router-dom";
import cover from "../assets/imgs/cover.jpg";
import braindrainIcon from "../assets/imgs/braindrainIcon.png";

export default function Home(props) {
  return (
    <div class="site-wrapper home-body" style={{ backgroundImage: `${cover}` }}>
      <div class="site-wrapper-inner">
        <div class="container-fluid">
          <div class="masthead clearfix">
            <div class="container inner">
              <img
                src={`${braindrainIcon}`}
                alt=""
                width="50"
                height="50"
                className="d-inline-block align-top mx-3"
              />
              <h1
                class="masthead-brand text-dark header-font"
                style={{ fontFamily: "Press Start 2P" }}
              >
                In Theory Blogs..!!!
              </h1>
              <nav></nav>
            </div>
          </div>

          <div class="inner cover container-fluid">
            <h1 class="cover-heading text-dark">
              “Technology is best when it brings people together.”
            </h1>
            <p class="lead font-italic text-primary">
              "You're daily dose of Technology"
            </p>
            <p class="lead">
              <Link to="/logIn">
                <button
                  className="btn btn-success btn-lg mx-3"
              
                >
                  Login
                </button>
                
              </Link>
              <Link to="/signUp">
                <button className="btn btn-danger btn-lg">
                  Sign Up
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
