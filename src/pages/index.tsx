import Image from "next/image";
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";
import CurrentDay from "@/components/CurrentDay";
import FiveDay from "@/components/FiveDay";
import Head from "next/head";

export default function Home() {
  const [locationData, setLocationData] = useState<ILocationData>()
  const [location, setLocation] = useState<ILocationEntry>()
  const [lat, setLat] = useState<ILat>(0)
  const [lon, setLon] = useState<ILon>(0)
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>()
  const [fiveDay, setFiveDay] = useState<IFiveDay[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  let forecast: Array<IArray> = []

  var key = '99b03e07f642fa17467a4e543bb340a4'
  var getCoordsUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${key}`
  var getCurrentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
  var getForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`

  const GrabCoords = () => {
    fetch(getCoordsUrl)
      .then((res) => {
        setLoading(true)
        setError(false)
        return res.json()
      })
      .then((data) => {
        console.log('locationData', data[0])
        setLocationData(data[0])
        setLat(data[0].lat)
        setLon(data[0].lon)
      })
      .then(() => {
        GrabCurrentWeather()
      })
      .catch((err) => {
        console.log(err)
        setError(true)
      })
  }

  const GrabCurrentWeather = () => {
    fetch(getCurrentWeatherUrl)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log('currentWeather', data)
        setCurrentWeather(data)
      })
      .then(() => {
        GrabForecast()
      })
      .catch((err) => {
        console.log(err)
        setError(true)
      })
  }

  const GrabForecast = () => {
    fetch(getForecastUrl)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        forecast.push(data.list[7])
        forecast.push(data.list[16])
        forecast.push(data.list[24])
        forecast.push(data.list[32])
        forecast.push(data.list[39])
        console.log('forecast array', forecast[0])
      })
      .then(() => {
        setFiveDay(forecast)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
      })
  }

  const getDate = (timestamp: any) => {
    let date = new Date(timestamp * 1000)
    let month = date.toLocaleString('default', { month: 'long' })
    let formattedDate = `${month} ${date.toString().slice(7, 10)}, ${date.toString().slice(11, 15)}`
    return formattedDate
  }

  const getShortDate = (timestamp: any) => {
    let date = new Date(timestamp)
    let formattedDate = `${date.toString().slice(4, 10)}, ${date.toString().slice(11, 15)}`
    return formattedDate
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles.main}>
        <div className={styles.inputContainer}>
          <div className={styles.logoContainer}>
            <span>Weather the Chances?</span>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.gap}>
              <span>Enter your location</span>
              <form className={styles.form}>
                <input onChange={(e) => setLocation(e.target.value)} id='location' type="text" placeholder="Type here..." className={styles.inputBar} />
                <button
                  className={styles.button}
                  onClick={() => {
                    try { GrabCoords() }
                    catch (err) {
                      console.log(err)
                      setError(true)
                    }
                  }}
                  type="button"
                >Go</button>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.weatherContainerBg}>
          <div className={styles.weatherContainer}>
            {loading
              ? <>
                <div className={styles.messageContainer}>
                  <span>Loading...</span>
                </div>
              </>
              : error
                ? <>
                  <div className={styles.messageContainer}>
                    <span>Error! Location not found.</span>
                  </div>
                </>
                : <>
                  {locationData && currentWeather && fiveDay.length > 0 &&
                    <div className={styles.currentDayContainer}>
                      <CurrentDay
                        location={locationData.name}
                        date={getDate(fiveDay[0].dt)}
                        weather={currentWeather.weather[0].main}
                        temp={(currentWeather.main.temp - 273.15).toFixed(1).toString()}
                        wind={currentWeather.wind.speed.toString()}
                      />
                    </div>}
                  {fiveDay.length > 0 && <h2 className={styles.fiveDayHeader}>Five Day Forecast</h2>
                  }
                  <div className={styles.fiveDayContainer}>
                    {fiveDay && fiveDay.map((i: any, index: any) => {
                      return (
                        <div key={index}>
                          <FiveDay
                            // date={i.dt_txt}
                            date={getShortDate(i.dt_txt)}
                            temp={i.main.temp.toFixed(1)}
                            weather={i.weather[0].main}
                            desc={i.weather[0].description}
                            wind={i.wind.speed}
                          />
                        </div>
                      )
                    })}
                  </div>
                </>}

          </div>
        </div>
      </main>
    </>
  );
}
