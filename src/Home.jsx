import React from 'react'
import { Link } from 'react-router-dom'
import FeatureCard from './context/FeatureCard'

export default function Home() {

  return (
    <>
      <div className="row align-items-center gy-5 mt-2">
        <div className="col-lg-6 text-center text-lg-start">

          <h1 className="display-4 fw-bold mb-3">All Your Daily Tools<span className="text-primary"> In One Place</span></h1>
          <p className="lead text-muted mb-4">UtilityVerse combines productivity, calculations, quizzes, and real-time weather in one clean, modern dashboard.</p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">

            <Link to="/todo" className="btn btn-primary btn-lg px-4">🚀 Get Started</Link>
            <a href="#features" className="btn btn-outline-secondary btn-lg px-4"><i className="bi bi-nut" style={{color:"brown"}}></i> Explore Tools</a>

          </div>
        </div>

        <div className="col-lg-6 text-center">
          <div className="p-4 p-md-5 bg-body-tertiary rounded-4 shadow-sm border">

            <div className="display-1 text-primary"><i className="bi bi-lightning-fill display-3 text-warning"></i></div>
            <h5 className="mt-3 fw-semibold text-body">Less Tabs, More Focus</h5>
            <p className="text-muted small mb-3">UtilityVerse brings together productivity, learning, and career tracking in one clean, responsive dashboard.</p>
            <div className="d-flex justify-content-center gap-4 small text-muted mt-3">
              <span><i className="bi bi-graph-up-arrow me-2 text-success"></i> Smart Status Tracking </span>
              <span><i className="bi bi-arrow-repeat me-2 text-info"></i> Real-time Updates </span>
              <span><i className="bi bi-speedometer2 me-2 text-primary"></i> Minimal & Fast</span>
            </div>
          </div>
        </div>
      </div>

      <section className="py-5 mt-5 bg-body-tertiary border-top" id='features'>
        <div className="container">
          <h2 className="fw-bold mb-0 text-center text-body">Powerful Features</h2>
          <div className="powerful-divider mx-auto mt-1 mb-4"></div>
          <div className="row g-4 overflow-visible">
            <div className="col-12 col-sm-6 col-lg-3 mb-4 px-3">
              <Link to="/todo" className="text-decoration-none"><FeatureCard icon={<i className="bi bi-list-check text-danger-emphasis fs-1"></i>} title="To-Do Manager" text="Organize your daily tasks and boost productivity." /></Link>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 mb-4 px-3">
              <Link to="/calculator" className="text-decoration-none"><FeatureCard icon={<i className="bi bi-fonts me-2 text-primary"></i>} title="Text Formattier" text="Write smarter. Format faster" /></Link>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 mb-4 px-3">
              <Link to="/quiz" className="text-decoration-none"><FeatureCard icon={<i className="bi bi-lightbulb text-warning fs-1"></i>} title="Quiz App" text="Test your knowledge with interactive quizzes." /></Link>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 mb-4 px-3">
              <Link to="/weather" className="text-decoration-none"><FeatureCard icon={<i className="bi bi-briefcase text-info-emphasis fs-1"></i>} title="Job Application Dashboard" text="Track your job applications with smart status management." /></Link>
            </div>
          </div>
        </div>
      </section>
    </ >
  )
}