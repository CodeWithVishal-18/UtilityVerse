import React, { useContext } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from './context/ThemeContext'
import Footer from './Footer'

export default function App() {
    let { theme } = useContext(ThemeContext)
    return (
        <>
            <div className={`d-flex flex-column min-vh-100 ${theme === "dark" ? "bg-dark text-light min-vh-100" : "bg-light text-dark min-vh-100"}`}>
                <Navbar />
                <div className="flex-grow-1 container mb-3">
                    <Outlet />
                </div>
                <Footer/>
            </div>
        </>
    )
}