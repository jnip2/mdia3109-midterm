import styles from './FiveDay.module.css'

export default function FiveDay({
    date = '',
    temp = '',
    weather = '',
    desc = '',
    wind = ''
}) {
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <h3 className={styles.date}>{date}</h3>
                <div className={styles.details}>
                    <div className={styles.imageContainer}>
                        <div className={styles.placeholder}></div>
                    </div>
                    <div className={styles.weather}>
                        <p>{weather}</p>
                        <p>{desc}</p>
                    </div>
                    <div className={styles.numbers}>
                        <p>Temperature: {temp}°K</p>
                        <p>Wind speed: {wind} m/s</p>
                    </div>
                </div>
            </div>
        </div>
    )
}