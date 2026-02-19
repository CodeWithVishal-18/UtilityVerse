export default function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card card h-100 shadow-sm border-0 rounded-4 text-center">
      <div className="card-body p-4 position-relative overflow-hidden rounded-4">
        <div className="mb-3 fs-1">{icon}</div>
        <h5 className="fw-semibold text-body">{title}</h5>
        <p className="text-muted small mb-0">{text}</p>
      </div>
    </div>
  )
}
