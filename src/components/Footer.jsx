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
            <FontAwesomeIcon icon={faHouse} />
          </NavLink>
          <NavLink 
            to="/favourites" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faHeart} />
          </NavLink>
          <NavLink 
            to="/checkout" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faCheckToSlot} />
          </NavLink>
          <NavLink 
            to="/orders" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faClockRotateLeft} />
          </NavLink>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faUser} />
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
