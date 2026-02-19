import React, { useState } from 'react'

export default function TextFormatter() {
    let [text, setText] = useState("")

    let toUpper = () => setText(text.toUpperCase())
    let toLower = () => setText(text.toLowerCase())

    let capitalize = () => {
        setText(
            text.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
        )
    }

    let removeExtraSpaces = () => {
        setText(text.replace(/\s+/g, " ").trim())
    }

    let clearText = () => setText("")

    let copyText = () => {
        navigator.clipboard.writeText(text)
    }
    let toSentenceCase = () => {
        let formatted = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
        setText(formatted)
    }

    let words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
    let characters = text.length

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">

                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4">

                        <h4 className="fw-bold mb-3"><i className="bi bi-fonts me-2"></i>Text Formatter</h4>
                        <textarea className="form-control mb-3" rows="10" placeholder="Enter your text here..." value={text} onChange={(e) => setText(e.target.value)}></textarea>

                        <div className="d-flex flex-wrap gap-2 mb-4">
                            <button className="btn btn-primary btn-sm" onClick={toUpper}>UPPERCASE</button>
                            <button className="btn btn-secondary btn-sm" onClick={toLower}>lowercase</button>
                            <button className="btn btn-warning btn-sm" onClick={capitalize}>Capitalize</button>
                            <button className="btn btn-info btn-sm" onClick={removeExtraSpaces}>Remove Spaces</button>
                            <button className="btn btn-sm" style={{backgroundColor:"purple",color:"white"}} onClick={toSentenceCase}>Sentence Case</button>
                            <button className="btn btn-success btn-sm" onClick={copyText}>Copy</button>
                            <button className="btn btn-danger btn-sm" onClick={clearText}>Clear</button>
                        </div>

                        <div className="row text-center g-3">
                            <div className="col-6 col-md-4">
                                <div className="p-3 bg-body-tertiary rounded-3">
                                    <small className="text-muted d-block">Words</small>
                                    <h6 className="fw-bold mb-0">{words}</h6>
                                </div>
                            </div>

                            <div className="col-6 col-md-4">
                                <div className="p-3 bg-body-tertiary rounded-3">
                                    <small className="text-muted d-block">Characters</small>
                                    <h6 className="fw-bold mb-0">{characters}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
