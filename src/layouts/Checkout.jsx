import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Checkout() {
  return (
    <>
      <Header />
      <div className="page-content">
        <div className="container bottom-content shop-cart-wrapper">
          <div className="item-list style-2">
            <ul>
              <li>
                <div className="item-content">
                  <div className="item-media media media-60">
                    <img src="assets/images/food/food9.png" alt="logo" />
                  </div>
                  <div className="item-inner">
                    <div className="item-title-row">
                      <h5 className="item-title sub-title">
                        <a href="product-detail.html">Sweet Young Coconut</a>
                      </h5>
                      <div className="item-subtitle text-soft">Fruit</div>
                    </div>
                    <div className="item-footer">
                      <div className="d-flex align-items-center">
                        <h6 className="me-2">$ 4.0</h6>
                        <del className="off-text">
                          <h6>$ 8.9</h6>
                        </del>
                      </div>
                      <div className="d-flex align-items-center">
                        <div class="dz-stepper stepper-fill small-stepper border-2">    
                          <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                            <span class="input-group-btn input-group-prepend">
                              <button
                                class="btn btn-primary bootstrap-touchspin-down"
                                type="button"
                              >
                                -
                              </button>
                            </span>
                            <input
                              class="stepper form-control"
                              type="text"
                              value="0"
                              name="demo3"
                            />
                            <span class="input-group-btn input-group-append">
                              <button
                                class="btn btn-primary bootstrap-touchspin-up"
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
              </li>
             </ul>
          </div>
        </div>
        <div className="footer fixed p-b80">
          <div className="container">
            <div className="view-title mb-2">
              <ul>
                <li>
                  <span className="text-soft">Subtotal</span>
                  <span className="text-soft">$54.76</span>
                </li>
                <li>
                  <span className="text-soft">TAX (2%)</span>
                  <span className="text-soft">-$1.08</span>
                </li>
                <li>
                  <h5>Total</h5>
                  <h5>$53.68</h5>
                </li>
                <li>
                  <a href="javascript:void(0);" className="promo-bx">
                    Apply Promotion Code
                    <span>2 Promos</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-btn d-flex align-items-center">
              <a href="checkout.html" className="btn btn-primary flex-1">
                CHECKOUT
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
