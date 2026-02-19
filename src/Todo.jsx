import React, { useEffect, useState } from "react";

export default function Todo() {
  let [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || [])
  let [input, setInput] = useState("")
  let [category, setCategory] = useState("Work")
  let [filter, setFilter] = useState("All")

  useEffect(() => { localStorage.setItem("todos", JSON.stringify(todos)); }, [todos])

  let addTodo = () => {
    if (!input.trim()) return

    let newTodo = { id: Date.now(), text: input, completed: false, category, }
    setTodos([newTodo, ...todos])
    setInput("")
  }

  let toggleTodo = (id) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  let deleteTodo = (id) => { setTodos(todos.filter((todo) => todo.id !== id)) }

  let completedCount = todos.filter((t) => t.completed).length;
  let progress = todos.length ? (completedCount / todos.length) * 100 : 0;

  let filteredTodos = filter === "All" ? todos : todos.filter((t) => t.category === filter);

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-8">

        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <div className="mb-4">
              <h4 className="fw-bold mb-1"><i className="bi bi-list-task me-2"></i> My Tasks</h4>
              <small className="text-muted d-block mb-2 ms-1">{completedCount} of {todos.length} completed</small>

              <div className="progress" style={{ height: "6px" }}>
                <div className="progress-bar bg-success" style={{ width: `${progress}%`, transition: "width 0.4s ease" }}></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="btn-group btn-group-sm">
                {["All", "Work", "Personal", "Study"].map((cat) => (
                  <button key={cat} className={`btn ${filter === cat ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setFilter(cat)}> {cat}</button>
                ))}
              </div>
            </div>
            <div className="input-group mb-4">
              <input type="text" className="form-control" placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTodo()} />

              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} style={{ maxWidth: "140px" }}>
                <option>Work</option>
                <option>Personal</option>
                <option>Study</option>
              </select>

              <button className="btn btn-primary px-4" onClick={addTodo}>Add</button>
            </div>

            {filteredTodos.length === 0 && (
              <div className="text-center text-muted py-4">No tasks found 🚀</div>
            )}

            <ul className="list-group list-group-flush">
              {filteredTodos.map((todo) => (
                <li key={todo.id} className={`list-group-item d-flex justify-content-between align-items-center py-2 mb-2 border-start border-4 ${todo.category === "Work" ? "border-primary-subtle" : todo.category === "Personal" ? "border-danger-subtle" : "border-warning-subtle"}`}>
                  <div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                      <label className={`form-check-label ms-2 ${todo.completed ? "text-decoration-line-through text-muted" : ""}`}> {todo.text}</label>
                    </div>

                    <span className={`badge mt-2 ${todo.category === "Work" ? "bg-primary-subtle text-primary" : todo.category === "Personal" ? "bg-warning-subtle text-warning" : "bg-success-subtle text-success"}`}>{todo.category}</span>
                  </div>

                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTodo(todo.id)}> <i className="bi bi-trash"></i></button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
