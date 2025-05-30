import React, { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import { useSidebar } from "../contexts/SidebarContext";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function Header() {
  const mainBarRef = useRef(null);
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();
  const { isAuthenticated, user, setShowAuthOffcanvas } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (!mainBarRef.current) return;

      if (window.scrollY > 50) {
        mainBarRef.current.classList.add("sticky-header");
      } else {
        mainBarRef.current.classList.remove("sticky-header");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="text-white d-flex justify-content-between align-items-center px-3 py-2"
        style={{
          backgroundColor: 'orange',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="flex-grow-1 text-center d-flex align-items-center justify-content-center">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="me-2">
            <path d="M12 19.5a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15zm0-2.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-1-5h2v2h-2v-2zm0-6h2v4h-2V6z"/>
          </svg>
          <span style={{ fontWeight: '600', letterSpacing: '0.5px' }}>TESTING ENVIRONMENT</span>
        </div>
        <Link 
          to="https://user.menumitra.com/" 
          className="btn d-flex align-items-center"
          target="_blank"
          style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            color: '#027335',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
          Prod
        <svg 
          className="ms-1 mt-0" 
          style={{ width: '0.68em', height: '0.68em' }}
          viewBox="0 0 10 10" 
          xmlns="http://www.w3.org/2000/svg" 
          aria-hidden="true"
        >
          <path 
            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004" 
            stroke="currentColor" 
            strokeWidth="1.25" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        </Link>
      </div>
      {/* Overlay always rendered, class toggled by isOpen */}
      <div
        className={`dark-overlay${isOpen ? " active" : ""}`}
        onClick={closeSidebar}
      ></div>
      {/* <Sidebar /> */}
      {/* Sidebar always rendered, class toggled by isOpen for smooth animation */}
      <header className="header">
        <div className="main-bar" ref={mainBarRef}>
          <div className="container">
            <div className="header-content">
              <div className="left-content">
                <a
                  href="#"
                  className="menu-toggler me-2"
                  onClick={toggleSidebar}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 7C3.5 6.44772 3.94772 6 4.5 6H19.5C20.0523 6 20.5 6.44772 20.5 7C20.5 7.55228 20.0523 8 19.5 8H4.5C3.94772 8 3.5 7.55228 3.5 7ZM3.5 12C3.5 11.4477 3.94772 11 4.5 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H4.5C3.94772 13 3.5 12.5523 3.5 12ZM3.5 17C3.5 16.4477 3.94772 16 4.5 16H19.5C20.0523 16 20.5 16.4477 20.5 17C20.5 17.5523 20.0523 18 19.5 18H4.5C3.94772 18 3.5 17.5523 3.5 17Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <h5 className="title mb-0 text-nowrap">MenuMitra</h5>
              </div>
              <div className="mid-content" />
              <div className="right-content">
                {isAuthenticated ? (
                  <Link to="/profile" className="d-flex align-items-center">
                    <div className="media media-25 rounded-circle overflow-hidden">
                      <img 
                        src={user?.avatar || "assets/images/avatar/1.jpg"} 
                        alt="profile" 
                        className="w-100"
                      />
                    </div>
                  </Link>
                ) : (
                  <button 
                    onClick={() => setShowAuthOffcanvas(true)}
                    className="btn btn-sm btn-primary rounded-pill px-3"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                      <polyline points="10 17 15 12 10 7"/>
                      <line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                    Login
                  </button>
                )}
                <a
                  href="javascript:void(0);"
                  className="theme-color ms-2"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBottom"
                  aria-controls="offcanvasBottom"
                >
                  <svg
                    className="color-plate"
                    xmlns="http://www.w3.org/2000/svg"
                    height="30px"
                    viewBox="0 0 24 24"
                    width="30px"
                    fill="#000000"
                  >
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                  </svg>
                </a>
                <a href="javascript:void(0);" className="theme-btn">
                  <svg
                    className="dark"
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M11.57,2.3c2.38-0.59,4.68-0.27,6.63,0.64c0.35,0.16,0.41,0.64,0.1,0.86C15.7,5.6,14,8.6,14,12s1.7,6.4,4.3,8.2 c0.32,0.22,0.26,0.7-0.09,0.86C16.93,21.66,15.5,22,14,22c-6.05,0-10.85-5.38-9.87-11.6C4.74,6.48,7.72,3.24,11.57,2.3z" />
                  </svg>
                  <svg
                    className="light"
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                  >
                    <rect fill="none" height={24} width={24} />
                    <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
