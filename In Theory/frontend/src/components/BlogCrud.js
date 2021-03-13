import React, { useEffect, useState } from "react";
import SecureAxios from "../config/SecureAxios";
export default function Blog(props) {
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(props.title);
  const [updatedBody, setUpdatedBody] = useState(props.body);

  useEffect(() => {
    console.log("Deleted");
  }, [deleteStatus]);

  const handleDelete = () => {
    console.log("In Delete");
    SecureAxios({
      method: "DELETE",
      url: "/blogApi/deleteBlog/",
      headers: {
        Authorization: "Bearer " + localStorage.accessToken,
      },
      data: {
        id: String(props.id),
        title: props.title,
        body: props.body,
      },
    }).then((res) => res.data);

    setDeleteStatus(!setDeleteStatus);
    window.location.reload();
  };

  const handleUpdate = () => {
    SecureAxios({
      method: "PUT",
      url: "/blogApi/blogCrud/",
      headers: {
        Authorization: "Bearer " + localStorage.accessToken,
      },
      data: {
        id: String(props.id),
        title: updatedTitle,
        body: updatedBody,
        author: localStorage.id,
      },
    }).then((res) => console.log(res.data));
    window.location.reload();
  };
  return (
    <div>
      <div class="row featurette mb-3">
        <div class="col-md-5 shadow-lg">
          <h2 class="featurette-heading">
            <span class="text-muted">{props.title}</span>
          </h2>
          <p class="lead">{props.body}</p>
          <button
            type="button"
            class="btn btn-outline-danger m-3"
            onClick={() => {
              handleDelete();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
            </svg>
            Delete
          </button>
          <button
            type="button"
            class="btn btn-outline-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
            </svg>
            Update
          </button>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Update
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
                        value={updatedTitle}
                        onChange={(e) => {
                          setUpdatedTitle(e.target.value);
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
                        value={updatedBody}
                        onChange={(e) => {
                          setUpdatedBody(e.target.value);
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
                      handleUpdate();
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-5">
          <img
            src={`https://source.unsplash.com/1600x900/?technology,technews,sci-fi,${props.title}`}
            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
            aria-label="Placeholder: 500x500"
          />

          <rect width="100%" height="100%" fill="#eee"></rect>
        </div>
      </div>
    </div>
  );
}
