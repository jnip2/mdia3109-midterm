import { useEffect, useState } from 'react'
import styles from './FiveDay.module.css'
import Image from 'next/image'

export default function FiveDay({
    date = '',
    temp = '',
    weather = '',
    desc = '',
    wind = ''
}) {
    const [icon, setIcon] = useState('')

    useEffect(() => {
        weather
            ? setIcon(`/weather-icons/${weather.toLowerCase()}.png`)
            : setIcon(`/weather-icons/thumbnail.png`)
    }, [weather])

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <h3 className={styles.date}>{date}</h3>
                <div className={styles.details}>
                    <div className={styles.imageContainer}>
                        <Image src={icon} height={50} width={50} alt='weather icon' />
                    </div>
                    <div className={styles.weather}>
                        <p className={styles.weatherText}>{weather}</p>
                        <p className={styles.descText}>{desc}</p>
                    </div>
                    <div className={styles.numbers}>
                        <p>Temperature: {temp}°C</p>
                        <p>Wind speed: {wind} m/s</p>
                    </div>
                </div>
            </div>
        </div>
    )
}