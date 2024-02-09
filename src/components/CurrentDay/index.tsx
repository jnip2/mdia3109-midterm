import styles from './CurrentDay.module.css'

export default function ICurrentDay<T extends any>({
    location = '',
    date = '',
    weather = '',
    temp = '',
    wind = ''
}: ICurrentDay<T>) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.contentContainer}>
                    <div className={styles.headerContainer}>
                        <h1 className={styles.location}>{location}</h1>
                        <p className={styles.date}>{date}</p>
                    </div>
                    <div className={styles.detailsContainer}>
                        <div className={styles.imageContainer}>
                            <div className={styles.placeholder}></div>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.weather}>{weather}</p>
                            <div className={styles.categoryContainer}>
                                <p className={styles.categoryHeader}>Temperature</p>
                                <p>{temp}°C</p>
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