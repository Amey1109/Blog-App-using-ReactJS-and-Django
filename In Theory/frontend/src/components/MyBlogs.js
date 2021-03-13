import React, { useEffect, useState } from "react";
import SecureAxios from "../config/SecureAxios";
import Blog from "./Blog";
import BlogCrud from "./BlogCrud";
import braindrainIcon from "../assets/imgs/braindrainIcon.png";
import { useHistory } from "react-router-dom";
export default function MyBlogs(props) {
  const [blogs, setBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const [flag, setFlag] = useState(false);

  const [newTitle, setNewTitle] = useState(props.title);
  const [newBody, setNewBody] = useState(props.body);

  const history = useHistory();
  useEffect(() => {
    SecureAxios({
      method: "GET",
      url: "/blogApi/allblogs/",
    })
      .then((res) => res.data)
      .then((data) => setBlogs(data));
  }, []);

  useEffect(() => {
    SecureAxios({
      method: "GET",
      url: `/blogApi/blogAuthor/${localStorage.id}`,
      headers: {
        Authorization: "Bearer " + localStorage.accessToken,
      },
    })
      .then((res) => res.data)
      .then((data) => setMyBlogs(data));
  }, []);

  const handleCreateBlog = () => {
    SecureAxios({
      method: "POST",
      url: "/blogApi/blogCrud/",
      headers: {
        Authorization: "Bearer " + localStorage.accessToken,
      },
      data: {
        id: String(props.id),
        title: newTitle,
        body: newBody,
        author: localStorage.id,
      },
    }).then((res) => console.log(res.data));
    window.location.reload();
  };
  const handleLogout = () => {
    history.push("/");
    localStorage.clear();
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
          <img
            src={`${braindrainIcon}`}
            alt=""
            width="50"
            height="50"
            className="d-inline-block align-top mx-3"
          />
          <a class="navbar-brand" href="#">
            Welcome, {localStorage.loggedIn}
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <button
                  className="btn btn-dark btn-md"
                  onClick={() => {
                    setFlag(!flag);
                  }}
                >
                  Home
                </button>
              </li>
              <li class="nav-item">
                <button
                  className="btn btn-dark btn-md "
                  onClick={() => {
                    setFlag(!flag);
                  }}
                >
                  My Blogs
                </button>
              </li>

              <li class="nav-item">
                <button
                  type="button"
                  class="btn btn-dark btn-md"
                  data-bs-toggle="modal"
                  data-bs-target="#CreateBlogModal"
                >
                  Post New Blog
                </button>

                <div
                  class="modal fade"
                  id="CreateBlogModal"
                  tabindex="-1"
                  aria-labelledby="CreateBlogModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="CreateBlogModalLabel">
                          Post a blog.....!!!
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">
                              Title
                            </label>
                            <input
                              placeholder="The Title should be 2 words"
                              type="text"
                              class="form-control"
                              id="recipient-name"
                              onChange={(e) => {
                                setNewTitle(e.target.value);
                              }}
                            />
                          </div>
                          <div class="mb-3">
                            <label for="message-text" class="col-form-label">
                              Body
                            </label>
                            <textarea
                              class="form-control"
                              id="message-text"
                              rows="10"
                              cols="50"
                              onChange={(e) => {
                                setNewBody(e.target.value);
                              }}
                            ></textarea>
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() => {
                            handleCreateBlog();
                          }}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <button
                  className="btn btn-dark btn-md ms-auto  "
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {flag
        ? myBlogs.map((item) => {
            return (
              <div style={{ marginLeft: "10%", marginTop: "5%" }}>
                <BlogCrud title={item.title} body={item.body} id={item.id} />
              </div>
            );
          })
        : blogs.map((item) => {
            return (
              <div style={{ marginLeft: "10%", marginTop: "5%" }}>
                <Blog title={item.title} body={item.body} />
              </div>
            );
          })}

      {console.log("All Blogs", blogs)}
      {console.log("My Blogs", myBlogs)}
    </div>
  );
}
