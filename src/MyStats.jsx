import React from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts"

export default function MyStats() {

    let todos = JSON.parse(localStorage.getItem("todos")) || []
    let jobs = JSON.parse(localStorage.getItem("jobs")) || []
    let quizzes = JSON.parse(localStorage.getItem("quizResults")) || []
    let ekagrSessions = JSON.parse(localStorage.getItem("ekagrSessions")) || [];

    let totalEkagrSessions = ekagrSessions.length;
    let weekEkagrSessions = ekagrSessions.filter(s => new Date() - new Date(s.date) <= 7 * 24 * 60 * 60 * 1000).length;
    let completedTasks = todos.filter(t => t.completed).length
    let totalApplications = jobs.length
    let interviewCount = jobs.filter(j => j.status === "Interview").length
    let interviewRate = totalApplications ? ((interviewCount / totalApplications) * 100).toFixed(1) : 0

    let quizAverage = quizzes.length ? (quizzes.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) / quizzes.length).toFixed(1) : 0

    let now = new Date()

    let weekTasks = todos.filter(t => t.date && now - new Date(t.date) <= 7 * 24 * 60 * 60 * 1000).length
    let weekJobs = jobs.filter(j => j.date && now - new Date(j.date) <= 7 * 24 * 60 * 60 * 1000).length
    let weekQuizzes = quizzes.filter(q => q.date && now - new Date(q.date) <= 7 * 24 * 60 * 60 * 1000).length
    let chartData = [{ name: "Tasks", value: weekTasks }, { name: "Jobs", value: weekJobs }, { name: "Quizzes", value: weekQuizzes }, { name: "Ekagr", value: weekEkagrSessions }]
    let productivityScore = weekTasks * 2 + weekJobs * 3 + weekQuizzes * 4

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold display-6"><i className="bi bi-bar-chart-line text-primary"></i> My Performance Dashboard</h2>
                <p className="text-muted">Track your productivity, career progress, and learning growth.</p>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-md-3 col-6">
                    <div className="card border-0 shadow-lg rounded-4 p-4 text-white"
                        style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
                        <h6 className="mb-2">Tasks Completed</h6>
                        <h3 className="fw-bold">{completedTasks}</h3>
                    </div>
                </div>

                <div className="col-md-3 col-6">
                    <div className="card border-0 shadow-lg rounded-4 p-4 text-white"
                        style={{ background: "linear-gradient(135deg, #ac4d21, #ac9232)" }}>
                        <h6 className="mb-2">एकाग्र Sessions</h6>
                        <h3 className="fw-bold">{totalEkagrSessions}</h3>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="card border-0 shadow-lg rounded-4 p-4 text-white"
                        style={{ background: "linear-gradient(135deg, #36dc8f, #5b86e5)" }}>
                        <h6 className="mb-2">Interview Rate</h6>
                        <h3 className="fw-bold">{interviewRate}%</h3>
                    </div>
                </div>

                <div className="col-md-3 col-6">
                    <div className="card border-0 shadow-lg rounded-4 p-4 text-white"
                        style={{ background: "linear-gradient(135deg, #ff512f, #dd2476)" }}>
                        <h6 className="mb-2">Quiz Average</h6>
                        <h3 className="fw-bold">{quizAverage}%</h3>
                    </div>
                </div>

                <div className="col-md-3 col-6">
                    <div className="card border-0 shadow-lg rounded-4 p-4 text-white"
                        style={{ background: "linear-gradient(135deg, #36d1dc, #5b86e5)" }}>
                        <h6 className="mb-2">Applications</h6>
                        <h3 className="fw-bold">{totalApplications}</h3>
                    </div>
                </div>

            </div>

            <div className="card shadow-lg border-0 rounded-4 p-4 mb-5">
                <h5 className="fw-semibold mb-4 text-center"><i className="bi bi-calendar-event me-2 text-success"></i> Weekly Productivity Overview</h5>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#4e73df" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
                <h5 className="fw-bold mb-2">🔥 Weekly Productivity Score</h5>
                <h2 className="display-6 fw-bold text-primary">{productivityScore}</h2>
                <p className="text-muted mt-2">Keep building momentum — consistency beats intensity.</p>
            </div>
        </div>
    )
}