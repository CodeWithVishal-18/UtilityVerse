import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './context/ThemeContext';

export default function JobApplied() {
    let { theme } = useContext(ThemeContext)
    let [jobs, setJobs] = useState([])
    let [filter, setFilter] = useState("All")
    let [formData, setFormData] = useState({ company: "", role: "", url: "", status: "Applied" })

    useEffect(() => {
        let savedJobs = JSON.parse(localStorage.getItem("jobs"))
        if (savedJobs) setJobs(savedJobs)
    }, [])

    useEffect(() => {
        localStorage.setItem("jobs", JSON.stringify(jobs))
    }, [jobs])

    let handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.company || !formData.role || !formData.url) return

        let newJob = { ...formData, id: Date.now(), date: new Date().toLocaleDateString() }
        setJobs([...jobs, newJob])
        setFormData({ company: "", role: "", url: "", status: "Applied" })
    }

    let deleteJob = (id) => {
        setJobs(jobs.filter(job => job.id !== id))
    }

    let total = jobs.length
    let applied = jobs.filter(j => j.status === "Applied").length
    let interview = jobs.filter(j => j.status === "Interview").length
    let rejected = jobs.filter(j => j.status === "Rejected").length

    let filteredJobs = filter === "All" ? jobs : jobs.filter(job => job.status === filter)

    let cardTheme = theme === "dark" ? "bg-dark text-light border border-secondary" : "bg-white text-dark"

    return (
        <div className="container py-5">
            <h2 className="fw-bold text-center mb-0"><i className="bi bi-briefcase text-primary me-1"></i> Job Dashboard</h2>
            <div className="job-divider mx-auto mt-2 mb-4"></div>
            <div className="row text-center mb-4">
                <div className="col-md-3 col-6 mb-3">
                    <div className={`card p-3 ${cardTheme}`}>
                        <h6>Total</h6>
                        <h4>{total}</h4>
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                    <div className="card p-3 bg-success text-white">
                        <h6>Applied</h6>
                        <h4>{applied}</h4>
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                    <div className="card p-3 bg-warning text-dark">
                        <h6>Interview</h6>
                        <h4>{interview}</h4>
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                    <div className="card p-3 bg-danger text-white">
                        <h6>Rejected</h6>
                        <h4>{rejected}</h4>
                    </div>
                </div>
            </div>
            <div className="mb-4 text-end">
                <select className="form-select w-auto d-inline" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>All</option>
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Rejected</option>
                    <option>Offer</option>
                </select>
            </div>

            <div className={`card shadow-sm p-4 rounded-4 mb-5 ${cardTheme}`}>
                <form onSubmit={handleSubmit} className="row g-3">

                    <div className="col-md-4">
                        <input type="text" name="company" placeholder="Company Name" className="form-control" value={formData.company} onChange={handleChange} />
                    </div>

                    <div className="col-md-4">
                        <input type="text" name="role" placeholder="Job Role" className="form-control" value={formData.role} onChange={handleChange} />
                    </div>

                    <div className="col-md-4">
                        <input type="url" name="url" placeholder="Applied Job Link" className="form-control" value={formData.url} onChange={handleChange} />
                    </div>

                    <div className="col-md-4">
                        <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                            <option>Applied</option>
                            <option>Interview</option>
                            <option>Rejected</option>
                        </select>
                    </div>

                    <div className="col-md-4 text-end d-flex align-items-end">
                        <button className="btn btn-primary w-100">Add Job</button>
                    </div>

                </form>
            </div>
            <div className='fs-2 text-center'>Jobs You Applied</div>
            <hr className="mt-1 mb-4 w-25 mx-auto" />
            <div className="row g-4">
                {filteredJobs.map(job => (
                    <div key={job.id} className="col-md-6 col-lg-4">
                        <div className={`card shadow-sm p-4 rounded-4 h-100 ${cardTheme}`}>
                            <h5 className="fw-bold">{job.company}</h5>
                            <p className="mb-1 text-muted">{job.role}</p>
                            <p className="mb-2"><small><i className="bi bi-calendar2-date" style={{ color: "brown" }}></i> {job.date}</small></p>

                            <span className={`badge ${job.status === "Applied" ? "bg-success" : job.status === "Rejected" ? "bg-danger" : job.status === "Interview" ? "bg-warning text-dark" : "bg-info"}`}>{job.status}</span>

                            <div className="mt-3 d-flex justify-content-between">
                                <a href={job.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary"> View </a>

                                <button className="btn btn-sm btn-outline-danger" onClick={() => deleteJob(job.id)}> Delete </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredJobs.length === 0 && (
                <p className="text-center text-muted mt-4">No applications found.</p>
            )}
        </div>
    )
}