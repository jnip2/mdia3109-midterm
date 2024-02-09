import Image from 'next/image'
import styles from './CurrentDay.module.css'
import { useEffect, useState } from 'react'

export default function ICurrentDay<T extends any>({
    location = '',
    date = '',
    weather = '',
    temp = '',
    wind = '',
    country = '',
    state = ''
}: ICurrentDay<T>) {

    const [icon, setIcon] = useState('')

    useEffect(() => {
        weather
            ? setIcon(`/weather-icons/${weather.toLowerCase()}.png`)
            : setIcon(`/weather-icons/thumbnail.png`)
    }, [weather])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.contentContainer}>
                    <div className={styles.headerContainer}>
                        {state ? <h1 className={styles.location}>{location}, {state}, {country}</h1>
                            : <h1 className={styles.location}>{location}, {country}</h1>}
                        <p className={styles.date}>{date}</p>
                    </div>
                    <div className={styles.detailsContainer}>
                        <div className={styles.imageContainer}>
                            <Image src={icon} height={150} width={150} alt='weather icon' />
                        </div>
                        <div className={styles.text}>
                            <p className={styles.weather}>{weather}</p>
                            <div className={styles.categoryContainer}>
                                <p className={styles.categoryHeader}>Temperature</p>
                                <p>{temp} °C</p>
                            </div>
                            <div className={styles.categoryContainer}>
                                <p className={styles.categoryHeader}>Wind speed</p>
                                <p>{wind} m/s</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}