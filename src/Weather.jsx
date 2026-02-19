import React, { useEffect, useState } from "react"
import Stat from "./context/Stat"

export default function Weather() {
  let [city, setCity] = useState("Mumbai")
  let [inputCity, setInputCity] = useState("Mumbai")
  let [weather, setWeather] = useState(null)
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState(null)
  let [recent, setRecent] = useState([])

  useEffect(() => {
    let controller = new AbortController()

    async function getWeather() {
      try {
        setLoading(true)
        setError(null)

        let res = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=67a7314129c6488e9b8dcae75a5f3d12`, { signal: controller.signal })
        let data = await res.json()
        if (!data.data) throw new Error("City not found")
        setWeather(data.data[0])
        if (!recent.includes(city)) {
          setRecent((prev) => [city, ...prev.slice(0, 4)])
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("City not found. Please try again..")
          setWeather(null)
        }
      } finally {
        setLoading(false)
      }
    }
    getWeather()
    return () => controller.abort()
  }, [city])

  let handleSearch = () => {
    if (!inputCity.trim()) return
    setCity(inputCity)
    setInputCity("")
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-2">
        <h1 className="fw-bold">🌤 Weather Dashboard</h1>
        <p className="text-muted">Real-time weather insights at your fingertips</p>
        <div className="weather-divider mx-auto mt-0 mb-4"></div>
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="input-group input-group-lg shadow-sm">
            <input type="text" className="form-control" placeholder="Enter city name..." value={inputCity} onChange={(e) => setInputCity(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
            <button className="btn btn-primary" onClick={handleSearch}> Search</button>
          </div>
        </div>
      </div>

      {recent.length > 0 && (
        <div className="text-center mb-4">
          <small className="text-muted me-2">Recent:</small>
          {recent.map((c) => (
            <button key={c} className="btn btn-sm btn-outline-secondary me-2" onClick={() => setCity(c)}> {c}</button>
          ))}
        </div>
      )}
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary"></div>
        </div>
      )}
      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {weather && !loading && (
        <div className="card shadow-lg border-0 rounded-4 p-4">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-md-6">
              <h2 className="fw-bold">{weather.city_name}, {weather.country_code}</h2>
              <p className="text-muted mb-1">{weather.lat.toFixed(2)}°, {weather.lon.toFixed(2)}°</p>
              <p className="text-capitalize text-muted">{weather.weather.description}</p>
            </div>

            <div className="col-md-6 text-center">
              <img src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`} alt="weather icon" />
              <h1 className="display-4 fw-bold">{Math.round(weather.temp)}°C</h1>
            </div>
          </div>

          <hr className="my-4" />
          <div className="row g-4 text-center">
            <Stat icon="🌡️" label="Feels Like" value={`${Math.round(weather.app_temp)}°C`} />
            <Stat icon="💧" label="Humidity" value={`${weather.rh}%`} />
            <Stat icon="💨" label="Wind Speed" value={`${weather.wind_spd.toFixed(1)} m/s`} />
            <Stat icon="🔽" label="Pressure" value={`${weather.pres} mb`} />
            <Stat icon="☀️" label="UV Index" value={weather.uv.toFixed(1)} />
            <Stat icon="👁️" label="Visibility" value={`${weather.vis} km`} />
            <Stat icon="☁️" label="Cloud Cover" value={`${weather.clouds}%`} />
            <Stat icon="🌧️" label="Precipitation" value={`${weather.precip || 0} mm`} />
          </div>
        </div>
      )}
    </div>
  )
}
