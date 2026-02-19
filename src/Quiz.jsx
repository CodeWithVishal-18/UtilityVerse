import React from "react";
import { Link } from "react-router-dom";

export default function Quiz() {
  let frontendTech = [
    { name: "html", isActive: true },
    { name: "css", isActive: true },
    { name: "javascript", isActive: true },
    { name: "react", isActive: true }
  ]
  let backendTech = [
    { name: "sql", isActive: true },
    { name: "java", isActive: true },
    { name: "springboot", isActive: false }
  ]

  let techIcons = {
    html: "bi-filetype-html text-danger",
    css: "bi-filetype-css text-primary",
    javascript: "bi-filetype-js text-warning",
    react: "bi-filetype-jsx text-info",
    sql: "bi-database text-success",
    java: "bi-cup-hot text-danger",
    springboot: "bi-flower1 text-success"
  }
  let renderCards = (techList) =>
    techList.map((tech) => (
      <div key={tech.name} className="col-12 col-sm-6 col-lg-3">
        <Link to={`/quiz/${tech.name}`} className="text-decoration-none">
          <div className={`card shadow-sm rounded-4 quiz-card p-4 text-center h-100 quiz-card position-relative ${!tech.isActive ? "disabled-card" : ""}`}>
            <span className={`badge position-absolute top-0 end-0 m-2 ${tech.isActive ? "bg-success" : "bg-warning text-dark"}`}> {tech.isActive ? "Active" : "Beta"}</span>
            <i className={`bi ${techIcons[tech.name]} fs-1 mb-3`}></i>
            <h6 className="fw-semibold mb-0 text-body text-capitalize">{tech.name}</h6>
          </div>
        </Link>
      </div>
    ))

  return (
    <div className="container py-5">

      <h2 className="fw-bold text-center mb-0"><i className="bi bi-mortarboard me-2 text-primary"></i>Choose Technology</h2>
      <div className="quiz-divider mx-auto mt-2 mb-4"></div>
      <div className="mb-5">
        <h4 className="fw-semibold mb-4 text-success d-flex">
          <i className="bi bi-code-slash me-2"></i>
          <div className="w-100">
            Frontend
            <div className="frontend-divider mt-2 mb-4 w-100"></div>
          </div>
        </h4>
        <div className="row g-4">{renderCards(frontendTech)}</div>
      </div>

      <div>
        <h4 className="fw-semibold mb-4 text-primary d-flex">
          <i className="bi bi-server me-2"></i>
          <div className="w-100">
            Backend
            <div className="frontend-divider mt-2 mb-4 w-100"></div>
          </div>
        </h4>
        <div className="row g-4">{renderCards(backendTech)}</div>
      </div>
    </div>
  )
}
