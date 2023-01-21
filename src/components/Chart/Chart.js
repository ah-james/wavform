// chart components
import ChartBar from './ChartBar'
// styles
import styles from './Chart.module.css'

const Chart = props => {
    // get array of the values from all 12 months in AlbumsChart.js with .map
    const yearValues = Object.values(props.dataPoints)
    // find biggest value across months with Math.max
    const maxValue = Math.max(...yearValues)

    let array = []

    for(const [key, value] of Object.entries(props.dataPoints)) {
        array.push({label: key, value: value})
    }

    return (
        <div className={styles.chart}>
            {array.map((dataPoint) => (
                <ChartBar key={dataPoint.label} value={dataPoint.value} maxValue={maxValue} label={dataPoint.label} />
            ))}
        </div>
    )
}

export default Chart