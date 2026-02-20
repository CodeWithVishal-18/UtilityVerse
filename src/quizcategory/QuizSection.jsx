import { useEffect, useState, useRef, useContext, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

let quizAPIs = {
    html: "https://dummyjson.com/c/2352-0227-4967-920e",
    css: "https://dummyjson.com/c/20dd-370e-4deb-ab08",
    javascript: "https://dummyjson.com/c/d294-b997-41e9-bf00",
    react: "https://dummyjson.com/c/4613-92fc-44b8-bcd3",
    sql: "https://dummyjson.com/c/e2aa-72e8-498f-b38b",
    java: "https://dummyjson.com/c/57a5-7881-496c-979e",
    springboot: ""
}
export default function QuizSection() {
    let { tech } = useParams()
    let { theme } = useContext(ThemeContext)

    let [allQuestions, setAllQuestions] = useState([])
    let [currentSet, setCurrentSet] = useState([])
    let [currentIndex, setCurrentIndex] = useState(0)
    let [score, setScore] = useState(0)
    let [round, setRound] = useState(1)
    let [loading, setLoading] = useState(true)
    let [timeLeft, setTimeLeft] = useState(30)
    let [showResult, setShowResult] = useState(false)

    let timerRef = useRef(null)

    let shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5)
    }
    let cardTheme =
        theme === "dark" ? "bg-dark text-light border border-secondary" : "bg-white text-dark"

    let buttonTheme =
        theme === "dark" ? "btn btn-outline-light" : "btn btn-outline-primary"

    let resultCardTheme =
        theme === "dark" ? "bg-dark text-light border border-secondary" : "bg-white text-dark"

    useEffect(() => {
        async function fetchQuestions() {
            try {
                setLoading(true)
                let res = await fetch(quizAPIs[tech])
                let data = await res.json()
                let shuffled = shuffleArray(data.questions)
                setAllQuestions(shuffled)
                setCurrentSet(shuffled.slice(0, 10))
            } catch (error) {
                console.error("Error fetching questions:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchQuestions()
    }, [tech])

    let handleNext = useCallback(() => {
        if (currentIndex + 1 < currentSet.length) {
            setCurrentIndex((prev) => prev + 1)
        } else {
            setShowResult(true)
        }
    }, [currentIndex, currentSet.length])
    useEffect(() => {
        if (showResult) return

        setTimeLeft(25)
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    clearInterval(timerRef.current)
                    handleNext()
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timerRef.current)
    }, [currentIndex, showResult, handleNext])

    let handleAnswer = (selectedOption,e) => {
        e.target.blur()
        let correctAnswer = currentQuestion.options[currentQuestion.answer]
        if (selectedOption === correctAnswer) {
            setScore((prev) => prev + 1)
        }
        handleNext()
    }

    let loadMore = () => {
        let nextStart = round * 10
        let nextSet = allQuestions.slice(nextStart, nextStart + 10)

        setCurrentSet(nextSet)
        setCurrentIndex(0)
        setRound((prev) => prev + 1)
        setShowResult(false)
    }

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary"></div>
            </div>
        )
    }

    let currentQuestion = currentSet[currentIndex]
    let totalQuestionsAttempted = round * 10
    let percentage = (score / totalQuestionsAttempted) * 100
    let performanceMessage = ""
    let performanceClass = ""

    if (percentage >= 80) {
        performanceMessage = "Excellent 🎉"
        performanceClass = "text-success"
    } else if (percentage >= 50) {
        performanceMessage = "Good 👍"
        performanceClass = "text-warning"
    } else {
        performanceMessage = "Needs Practice 💪"
        performanceClass = "text-danger"
    }
    return (
        <div className="container py-5">
            <Link to="/quiz" className="btn btn-outline-secondary mb-4"><i className="bi bi-box-arrow-left"></i> Back</Link>
            <h3 className="fw-bold text-center text-capitalize">{tech} Quiz</h3>
            <div className="techQuiz-divider mx-auto mt-2 mb-4"></div>

            {!showResult ? (
                <div className={`card shadow-sm p-4 rounded-4 ${cardTheme}`}>
                    <div className="d-flex justify-content-between mb-2">
                        <small>Question {currentIndex + 1} of {currentSet.length}</small>
                        <small className={`fw-bold ${theme === "dark" ? "text-warning" : "text-danger"}`}> ⏳ {timeLeft}s</small>
                    </div>

                    <div className={`progress mb-4 ${theme === "dark" ? "bg-secondary" : ""}`} style={{ height: "6px" }}>
                        <div className="progress-bar bg-success" style={{ width: `${((currentIndex + 1) / currentSet.length) * 100}%` }}></div>
                    </div>
                    <h5 className="fw-semibold mb-4">{currentQuestion.question}</h5>
                    {currentQuestion.options.map((opt, i) => (
                        <button key={`${currentQuestion.question}-${i}`} className={`${buttonTheme} w-100 mb-3 text-start`} onClick={(e) => handleAnswer(opt,e)}> {opt}</button>
                    ))}
                </div>
            ) : (
                <div className={`card shadow-sm p-5 rounded-4 text-center ${resultCardTheme}`}>
                    <h4 className="fw-bold mb-3">Round {round} Completed 🎉</h4>
                    <h5 className="mb-2">Total Score: {score} / {totalQuestionsAttempted}</h5>
                    <h6 className={`fw-bold ${performanceClass}`}>{performanceMessage}</h6>

                    {allQuestions.length > round * 10 ? (
                        <>
                            <p className="text-muted mt-3"> Want more questions? </p>
                            <button className="btn btn-success me-3" onClick={loadMore} > Yes </button>
                            <Link to="/quiz" className="btn btn-outline-secondary"> No </Link>
                        </>
                    ) : (
                        <Link to="/quiz" className="btn btn-outline-secondary mt-3">Back to Quiz</Link>
                    )}
                </div>
            )}
        </div>
    )
}
