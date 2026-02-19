import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from './context/ThemeContext'

export default function Navbar() {
  let { theme, setTheme } = useContext(ThemeContext)
  return (
    <nav className="navbar navbar-expand-lg bg-body border-bottom shadow-sm sticky-top">
      <div className="container-fluid mx-3">
        <Link className="navbar-brand fw-bold gradient-text" to="/"><i className="bi bi-box-seam me-2"></i>UtilityVerse</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"> <span className="navbar-toggler-icon"></span></button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3 mt-3 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/todo">ToDo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/textformatter">Text Formatter</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/quiz">Quiz</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/weather">Weather</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/jobdashboard">JobApplied</Link>
            </li>
            <li className="nav-item">
              <span style={{ cursor: "pointer" }} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? (
                  <i className="bi bi-brightness-high text-warning fs-4"></i>
                ) : (
                  <i className="bi bi-moon fs-4"></i>
                )}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
