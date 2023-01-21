// styles
import styles from './ChartBar.module.css'

const ChartBar = props => {
    // calculate bar fill height with variable that will help set CSS
    let barFill = '0%'

    // if max value from props is higher than zero convert to percentage and save as barFill
    // also convert to string with % sign at end
    if (props.maxValue > 0) {
        barFill = Math.round((props.value / props.maxValue) * 100) + '%'
    }

    return (
        <div className={styles["chart-bar"]}>
            <div className={styles["chart-bar-inner"]}>
                {/* dynamically adjust height with barFill variable in style react prop */}
                {/* value is a javascript object */}
                <div className={styles["chart-bar-fill"]} style={{ height: barFill }} ></div>
            </div>
            {/* put label from props in this one */}
            <div className={styles["chart-bar-label"]}>{props.label}</div>
        </div>
    )
}

export default ChartBar