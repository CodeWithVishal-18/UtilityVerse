export default function Stat({ icon, label, value }) {
  return (
    <div className="col-6 col-md-3">
      <div className="p-3 bg-body-tertiary rounded-3 h-100">
        <div className="fs-4 mb-1">{icon}</div>
        <small className="text-muted d-block">{label}</small>
        <h6 className="fw-bold mb-0">{value}</h6>
      </div>
    </div>
  );
}