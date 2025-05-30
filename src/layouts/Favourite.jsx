import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Favourite() {
  return (
    <>
      <Header />
      <div className="page-content">
        <div className="content-inner pt-0">
          <div className="container p-b30">
            {/* Search */}
            <div>
              <div className="mb-3 input-group input-radius">
                <span className="input-group-text">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9395 1.9313C5.98074 1.9313 1.94141 5.97063 1.94141 10.9294C1.94141 15.8881 5.98074 19.9353 10.9395 19.9353C13.0575 19.9353 15.0054 19.193 16.5449 17.9606L20.293 21.7067C20.4821 21.888 20.7347 21.988 20.9967 21.9854C21.2587 21.9827 21.5093 21.8775 21.6947 21.6924C21.8801 21.5073 21.9856 21.2569 21.9886 20.9949C21.9917 20.7329 21.892 20.4802 21.7109 20.2908L17.9629 16.5427C19.1963 15.0008 19.9395 13.0498 19.9395 10.9294C19.9395 5.97063 15.8982 1.9313 10.9395 1.9313ZM10.9395 3.93134C14.8173 3.93134 17.9375 7.05153 17.9375 10.9294C17.9375 14.8072 14.8173 17.9352 10.9395 17.9352C7.06162 17.9352 3.94141 14.8072 3.94141 10.9294C3.94141 7.05153 7.06162 3.93134 10.9395 3.93134Z"
                      fill="#7D8FAB"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search here!"
                  className="form-control main-in ps-0 bs-0"
                />
              </div>
            </div>
            <div className="dashboard-area">
              <div className="title-bar">
                <span className="title mb-0 font-18">Popular Deals</span>
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <div className="card-item style-1">
                    <div className="dz-media">
                      <img src="assets/images/food/food8.png" alt="image" />
                      <a href="javascript:void(0);" className="r-btn">
                        <div className="like-button">
                          <i className="fa-regular fa-heart" />
                        </div>
                      </a>
                      <div className="label">5% OFF</div>
                    </div>
                    <div className="dz-content">
                      <h6 className="title mb-3">
                        <a href="product.html">Fresh Grapes</a>
                      </h6>
                      <div className="dz-meta">
                        <ul>
                          <li className="price text-accent">$ 10.9</li>
                          <li className="review">
                            <span className="text-soft font-10">(243)</span>
                            <i className="fa fa-star" />
                          </li>
                        </ul>
                      </div>
                      <div className="mt-2">
                        <a
                          className="btn btn-primary add-btn light"
                          href="javascript:void(0);"
                        >
                          Add to cart
                        </a>
                        <div className="dz-stepper border-1 rounded-stepper stepper-fill">
                          <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                            <span className="input-group-btn input-group-prepend">
                              <button
                                className="btn btn-primary bootstrap-touchspin-down"
                                type="button"
                              >
                                -
                              </button>
                            </span>
                            <input
                              className="stepper form-control"
                              type="text"
                              name="demo3"
                              readOnly=""
                            />
                            <span className="input-group-btn input-group-append">
                              <button
                                className="btn btn-primary bootstrap-touchspin-up"
                                type="button"
                              >
                                +
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card-item style-1">
                    <div className="dz-media">
                      <img src="assets/images/food/food4.png" alt="image" />
                      <a href="javascript:void(0);" className="r-btn">
                        <div className="like-button">
                          <i className="fa-regular fa-heart" />
                        </div>
                      </a>
                    </div>
                    <div className="dz-content">
                      <h6 className="title mb-3">
                        <a href="product.html">Gurame Fish</a>
                      </h6>
                      <div className="dz-meta">
                        <ul>
                          <li className="price text-accent">$ 10.9</li>
                          <li className="review">
                            <span className="text-soft font-10">(243)</span>
                            <i className="fa fa-star" />
                          </li>
                        </ul>
                      </div>
                      <div className="mt-2">
                        <a
                          className="btn btn-primary add-btn light"
                          href="javascript:void(0);"
                        >
                          Add to cart
                        </a>
                        <div className="dz-stepper border-1 rounded-stepper stepper-fill">
                          <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                            <span className="input-group-btn input-group-prepend">
                              <button
                                className="btn btn-primary bootstrap-touchspin-down"
                                type="button"
                              >
                                -
                              </button>
                            </span>
                            <input
                              className="stepper form-control"
                              type="text"
                              name="demo3"
                              readOnly=""
                            />
                            <span className="input-group-btn input-group-append">
                              <button
                                className="btn btn-primary bootstrap-touchspin-up"
                                type="button"
                              >
                                +
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card-item style-1">
                    <div className="dz-media">
                      <img src="assets/images/food/food5.png" alt="image" />
                      <a href="javascript:void(0);" className="r-btn">
                        <div className="like-button">
                          <i className="fa-regular fa-heart" />
                        </div>
                      </a>
                    </div>
                    <div className="dz-content">
                      <h6 className="title mb-3">
                        <a href="product.html">Tomatoes</a>
                      </h6>
                      <div className="dz-meta">
                        <ul>
                          <li className="price text-accent">$ 10.9</li>
                          <li className="review">
                            <span className="text-soft font-10">(243)</span>
                            <i className="fa fa-star" />
                          </li>
                        </ul>
                      </div>
                      <div className="mt-2">
                        <a
                          className="btn btn-primary add-btn light"
                          href="javascript:void(0);"
                        >
                          Add to cart
                        </a>
                        <div className="dz-stepper border-1 rounded-stepper stepper-fill">
                          <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                            <span className="input-group-btn input-group-prepend">
                              <button
                                className="btn btn-primary bootstrap-touchspin-down"
                                type="button"
                              >
                                -
                              </button>
                            </span>
                            <input
                              className="stepper form-control"
                              type="text"
                              name="demo3"
                              readOnly=""
                            />
                            <span className="input-group-btn input-group-append">
                              <button
                                className="btn btn-primary bootstrap-touchspin-up"
                                type="button"
                              >
                                +
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card-item style-1">
                    <div className="dz-media">
                      <img src="assets/images/food/food3.png" alt="image" />
                      <a href="javascript:void(0);" className="r-btn">
                        <div className="like-button active">
                          <i className="fa-regular fa-heart" />
                        </div>
                      </a>
                      <div className="label">5% OFF</div>
                    </div>
                    <div className="dz-content">
                      <h6 className="title mb-3">
                        <a href="product.html">Chicken Village</a>
                      </h6>
                      <div className="dz-meta">
                        <ul>
                          <li className="price text-accent">$ 10.9</li>
                          <li className="review">
                            <span className="text-soft font-10">(243)</span>
                            <i className="fa fa-star" />
                          </li>
                        </ul>
                      </div>
                      <div className="mt-2">
                        <a
                          className="btn btn-primary add-btn light"
                          href="javascript:void(0);"
                        >
                          Add to cart
                        </a>
                        <div className="dz-stepper border-1 rounded-stepper stepper-fill">
                          <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                            <span className="input-group-btn input-group-prepend">
                              <button
                                className="btn btn-primary bootstrap-touchspin-down"
                                type="button"
                              >
                                -
                              </button>
                            </span>
                            <input
                              className="stepper form-control"
                              type="text"
                              name="demo3"
                              readOnly=""
                            />
                            <span className="input-group-btn input-group-append">
                              <button
                                className="btn btn-primary bootstrap-touchspin-up"
                                type="button"
                              >
                                +
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card-item style-1">
                    <div className="dz-media">
                      <img src="assets/images/food/food6.png" alt="image" />
                      <a href="javascript:void(0);" className="r-btn">
                        <div className="like-button">
                          <i className="fa-regular fa-heart" />
                        </div>
                      </a>
                    </div>
                    <div className="dz-content">
                      <h6 className="title mb-3">
                        <a href="product.html">Fresh Milk</a>
                      </h6>
                      <div className="dz-meta">
                        <ul>
                          <li className="price text-accent">$ 10.9</li>
                          <li className="review">
                            <span className="text-soft font-10">(243)</span>
                            <i className="fa fa-star" />
                          </li>
                        </ul>
                      </div>
                      <div className="mt-2">
                        <a
                          className="btn btn-primary add-btn light"
                          href="javascript:void(0);"
                        >
                          Add to cart
                        </a>
                        <div className="dz-stepper border-1 rounded-stepper stepper-fill">
                          <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                            <span className="input-group-btn input-group-prepend">
                              <button
                                className="btn btn-primary bootstrap-touchspin-down"
                                type="button"
                              >
                                -
                              </button>
                            </span>
                            <input
                              className="stepper form-control"
                              type="text"
                              name="demo3"
                              readOnly=""
                            />
                            <span className="input-group-btn input-group-append">
                              <button
                                className="btn btn-primary bootstrap-touchspin-up"
                                type="button"
                              >
                                +
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card-item style-1">
                    <div className="dz-media">
                      <img src="assets/images/food/food7.png" alt="image" />
                      <a href="javascript:void(0);" className="r-btn">
                        <div className="like-button">
                          <i className="fa-regular fa-heart" />
                        </div>
                      </a>
                    </div>
                    <div className="dz-content">
                      <h6 className="title mb-3">
                        <a href="product.html">Fresh Avocados</a>
                      </h6>
                      <div className="dz-meta">
                        <ul>
                          <li className="price text-accent">$ 10.9</li>
                          <li className="review">
                            <span className="text-soft font-10">(243)</span>
                            <i className="fa fa-star" />
                          </li>
                        </ul>
                      </div>
                      <div className="mt-2">
                        <a
                          className="btn btn-primary add-btn light"
                          href="javascript:void(0);"
                        >
                          Add to cart
                        </a>
                        <div className="dz-stepper border-1 rounded-stepper stepper-fill">
                          <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                            <span className="input-group-btn input-group-prepend">
                              <button
                                className="btn btn-primary bootstrap-touchspin-down"
                                type="button"
                              >
                                -
                              </button>
                            </span>
                            <input
                              className="stepper form-control"
                              type="text"
                              name="demo3"
                              readOnly=""
                            />
                            <span className="input-group-btn input-group-append">
                              <button
                                className="btn btn-primary bootstrap-touchspin-up"
                                type="button"
                              >
                                +
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Favourite;
