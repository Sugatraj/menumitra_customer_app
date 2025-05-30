import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function EditProfile() {
  return (
    <>
      <Header />
      <div className="page-content">
        <div className="container">
          <div className="edit-profile">
            <div className="profile-image">
              <div className="media media-100 rounded-circle">
                <img src="https://placehold.co/300x200?text=No+Image+Found" alt="/" />
              </div>
              <a href="javascript:void(0);">Change profile photo</a>
            </div>
            <form>
              <div className="mb-3 input-group input-mini">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="mb-3 input-group input-mini">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                />
              </div>
              <div className="mb-3 input-group input-mini">
                <input
                  type="url"
                  className="form-control"
                  placeholder="Website"
                />
              </div>
              <div className="mb-3 input-group input-mini">
                <input type="text" className="form-control" placeholder="Bio" />
              </div>
            </form>
          </div>
          <ul className="link-list">
            <li>
              <a href="javascript:void(0);">Add Link</a>
            </li>
            <li>
              <a href="javascript:void(0);">Switch to professional account</a>
            </li>
            <li>
              <a href="javascript:void(0);">Create avatar</a>
            </li>
            <li>
              <a href="javascript:void(0);">Personal information settings</a>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditProfile;
