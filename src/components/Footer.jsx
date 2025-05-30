import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faHeart,
  faCheckToSlot,
  faClockRotateLeft,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

function Footer() {
  return (
    <div>
      {/* <div class="menubar-area style-4 mt-4 footer-fixed border-top">
            <div class="toolbar-inner menubar-nav">
                <a href="javascript:void(0);" class="nav-link active">
                    <FontAwesomeIcon icon={faHouse} />
                </a>
                <a href="javascript:void(0);" class="nav-link">
                    <FontAwesomeIcon icon={faHeart} />
                </a>
                <a href="javascript:void(0);" class="nav-link add-post text-danger">
                    <FontAwesomeIcon icon={faCheckToSlot} />
                </a>
                <a href="javascript:void(0);" class="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b5b5b5" viewBox="0 0 511.606 511.606"><path d="M436.594 74.943c-99.917-99.917-261.637-99.932-361.568 0-80.348 80.347-95.531 199.817-48.029 294.96L.662 485.742c-3.423 15.056 10.071 28.556 25.133 25.133l115.839-26.335c168.429 84.092 369.846-37.653 369.846-228.812 0-68.29-26.595-132.494-74.886-180.785zM309.143 319.394h-160c-11.598 0-21-9.402-21-21s9.402-21 21-21h160c11.598 0 21 9.402 21 21s-9.402 21-21 21zm53.334-85.333H149.143c-11.598 0-21-9.402-21-21s9.402-21 21-21h213.334c11.598 0 21 9.402 21 21s-9.403 21-21 21z"></path></svg>
                </a>
                <a href="javascript:void(0);" class="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="21" fill="#b5b5b5"><path d="M8 7.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 1 0 0 7.5zm7.5 9v1.5c-.002.199-.079.39-.217.532C13.61 20.455 8.57 20.5 8 20.5s-5.61-.045-7.282-1.718C.579 18.64.501 18.449.5 18.25v-1.5a7.5 7.5 0 1 1 15 0z"></path></svg>
                </a>
            </div>
        </div> */}

      <div className="menubar-area style-2 footer-fixed border-top">
        <div className="toolbar-inner menubar-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z"
                fill="#130F26"
              ></path>
            </svg>
          </NavLink>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <svg
              enable-background="new 0 0 512.001 512.001"
              height="512"
              viewBox="0 0 512.001 512.001"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m256.001 477.407c-2.59 0-5.179-.669-7.499-2.009-2.52-1.454-62.391-36.216-123.121-88.594-35.994-31.043-64.726-61.833-85.396-91.513-26.748-38.406-40.199-75.348-39.982-109.801.254-40.09 14.613-77.792 40.435-106.162 26.258-28.848 61.3-44.734 98.673-44.734 47.897 0 91.688 26.83 116.891 69.332 25.203-42.501 68.994-69.332 116.891-69.332 35.308 0 68.995 14.334 94.859 40.362 28.384 28.563 44.511 68.921 44.247 110.724-.218 34.393-13.921 71.279-40.728 109.632-20.734 29.665-49.426 60.441-85.279 91.475-60.508 52.373-119.949 87.134-122.45 88.588-2.331 1.354-4.937 2.032-7.541 2.032z"></path>
            </svg>
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 456.569 456.569"
            >
              <path d="M345.805 339.465c-29.323-.028-53.117 23.72-53.146 53.043s23.72 53.117 53.043 53.146 53.117-23.72 53.146-53.043v-.051c-.028-29.292-23.752-53.038-53.043-53.095zm94.171-254.244a20.44 20.44 0 0 0-3.855-.373H112.845l-5.12-34.253c-3.19-22.748-22.648-39.673-45.619-39.68H20.48C9.169 10.915 0 20.084 0 31.395s9.169 20.48 20.48 20.48h41.677a5.12 5.12 0 0 1 5.12 4.506l31.539 216.166c4.324 27.468 27.951 47.732 55.757 47.821h213.043c26.771.035 49.866-18.78 55.245-45.005l33.331-166.144c2.149-11.105-5.111-21.849-16.216-23.998zM215.737 390.286c-1.247-28.463-24.737-50.869-53.228-50.77h0c-29.299 1.184-52.091 25.896-50.907 55.195 1.136 28.113 24.005 50.458 52.136 50.943h1.28c29.295-1.284 52.002-26.073 50.719-55.368z"></path>
            </svg>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.9 3H5.1C4.4925 3 4 3.4925 4 4.1V21.9C4 22.5075 4.4925 23 5.1 23H18.9C19.5075 23 20 22.5075 20 21.9V4.1C20 3.4925 19.5075 3 18.9 3ZM8 17.5C7.725 17.5 7.5 17.275 7.5 17C7.5 16.725 7.725 16.5 8 16.5H16C16.275 16.5 16.5 16.725 16.5 17C16.5 17.275 16.275 17.5 16 17.5H8ZM8 13.5C7.725 13.5 7.5 13.275 7.5 13C7.5 12.725 7.725 12.5 8 12.5H16C16.275 12.5 16.5 12.725 16.5 13C16.5 13.275 16.275 13.5 16 13.5H8ZM8 9.5C7.725 9.5 7.5 9.275 7.5 9C7.5 8.725 7.725 8.5 8 8.5H16C16.275 8.5 16.5 8.725 16.5 9C16.5 9.275 16.275 9.5 16 9.5H8ZM11.5 6.5C11.5 6.225 11.725 6 12 6C12.275 6 12.5 6.225 12.5 6.5C12.5 6.775 12.275 7 12 7C11.725 7 11.5 6.775 11.5 6.5Z"
                fill="currentColor"
              />
            </svg>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="21" fill="#b5b5b5"><path d="M8 7.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 1 0 0 7.5zm7.5 9v1.5c-.002.199-.079.39-.217.532C13.61 20.455 8.57 20.5 8 20.5s-5.61-.045-7.282-1.718C.579 18.64.501 18.449.5 18.25v-1.5a7.5 7.5 0 1 1 15 0z"></path></svg>
          </NavLink>
          {/* <a href="javascript:void(0);" className="menu-toggler">
       <FontAwesomeIcon icon={faClockRotateLeft} />
    </a> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
