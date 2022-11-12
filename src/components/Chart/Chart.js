import ChartBar from './ChartBar'
import './Chart.css'

const Chart = props => {
    // get array of the values from all 12 months in AlbumsChart.js with .map
    const monthValues = props.dataPoints.map(dataPoint => dataPoint.value)
    // find biggest value across months with Math.max
    const maxValue = Math.max(...monthValues)

    return(
        <div className='chart'>
            {props.dataPoints.map((dataPoint) => (
                <ChartBar key={dataPoint.label} value={dataPoint.value} maxValue={maxValue} label={dataPoint.label} />
            ))}
        </div>
    )
}

export default Chart