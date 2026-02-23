import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from './context/ThemeContext'

export default function Ekagr() {
    let { theme } = useContext(ThemeContext)
    let savedSettings = JSON.parse(localStorage.getItem("ekagrSettings")) || { workMinutes: 25, breakMinutes: 5, }
    let [workMinutes, setWorkMinutes] = useState(savedSettings.workMinutes)
    let [breakMinutes, setBreakMinutes] = useState(savedSettings.breakMinutes)

    let [secondsLeft, setSecondsLeft] = useState(workMinutes * 60)
    let [isRunning, setIsRunning] = useState(false)
    let [isBreak, setIsBreak] = useState(false)
    let [draftWork, setDraftWork] = useState(workMinutes)
    let [draftBreak, setDraftBreak] = useState(breakMinutes)

    let timerRef = useRef(null)
    useEffect(() => {
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission()
        }
    }, [])
    useEffect(() => {
        localStorage.setItem(
            "ekagrSettings",
            JSON.stringify({ workMinutes, breakMinutes })
        )
    }, [workMinutes, breakMinutes])

    let handleSessionComplete = useCallback(() => {

        let audio = new Audio(
            "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        )
        audio.play()
        if (Notification.permission === "granted") {
            new Notification(
                isBreak ? "Break Complete ☕" : "एकाग्र Session Complete 💻",
                {
                    body: isBreak ? "Time to return to focus." : "Great work! Take a break.",
                }
            )
        }
        if (!isBreak) {
            let sessions =
                JSON.parse(localStorage.getItem("ekagrSessions")) || []

            sessions.unshift({
                date: new Date().toISOString(),
            })

            localStorage.setItem(
                "ekagrSessions",
                JSON.stringify(sessions)
            )
        }
        if (isBreak) {
            setSecondsLeft(workMinutes * 60)
            setIsBreak(false)
        } else {
            setSecondsLeft(breakMinutes * 60)
            setIsBreak(true)
        }

        setIsRunning(false)
    }, [isBreak, workMinutes, breakMinutes])

    useEffect(() => {
        if (!isRunning) return

        timerRef.current = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev === 1) {
                    clearInterval(timerRef.current)
                    handleSessionComplete()
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timerRef.current)
    }, [isRunning, handleSessionComplete])

    const applySettings = () => {
        if (draftWork < 1 || draftBreak < 1) return

        setWorkMinutes(draftWork)
        setBreakMinutes(draftBreak)

        setIsRunning(false)
        setIsBreak(false)
        setSecondsLeft(draftWork * 60)
    }

    let startTimer = () => setIsRunning(true)
    let pauseTimer = () => setIsRunning(false)

    let resetTimer = () => {
        setIsRunning(false)
        setIsBreak(false)
        setSecondsLeft(workMinutes * 60)
    }

    let minutes = Math.floor(secondsLeft / 60)
    let seconds = secondsLeft % 60
    let pageClass = theme === "dark" ? "bg-dark text-light min-vh-100" : "bg-light text-dark min-vh-100"

    let cardClass = theme === "dark" ? "card bg-dark text-light border border-secondary shadow-lg rounded-4" : "card bg-white text-dark shadow-lg rounded-4"

    return (
        <div className={pageClass}>
            <div className="container py-5 text-center">

                <h2 className="fw-bold mb-2">🎯 एकाग्र</h2>
                <p className="text-muted mb-4">One-pointed focus. Zero distractions.</p>
                <div className="row justify-content-center mb-4 align-items-end">

                    <div className="col-5 col-md-3">
                        <label className="form-label">Focus (min)</label>
                        <input type="number" min="1" className="form-control" value={draftWork} disabled={isRunning} onChange={(e) => setDraftWork(Number(e.target.value))} />
                    </div>

                    <div className="col-5 col-md-3">
                        <label className="form-label">Break (min)</label>
                        <input type="number" min="1" className="form-control" value={draftBreak} disabled={isRunning} onChange={(e) => setDraftBreak(Number(e.target.value))} />
                    </div>

                    <div className="col-10 col-md-2 mt-3 mt-md-0">
                        <button className="btn btn-primary w-100" disabled={isRunning} onClick={applySettings}> Set Time</button>
                    </div>

                </div>
                <div className={cardClass + " p-5 mx-auto"} style={{ maxWidth: "420px" }}>

                    <h5 className="mb-3">{isBreak ? "Break Mode ☕" : "Deep Work Mode 🧑‍💻"}</h5>

                    <h1 className="display-3 fw-bold mb-4">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>

                    <div className="d-flex justify-content-center gap-3">
                        {!isRunning ? (
                            <button className="btn btn-success px-4" onClick={startTimer}>Start</button>
                        ) : (
                            <button className="btn btn-warning px-4" onClick={pauseTimer}>Pause</button>
                        )}

                        <button className="btn btn-outline-danger px-4" onClick={resetTimer}> Reset</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
