// components
import Chart from "../Chart/Chart"

const ReviewsChart = ({reviews}) => {
    const dataPoints = {}

    const arrayOfYears = reviews.map((key, value) => {
        const date = new Date(key.date)
        const albumYear = date.getFullYear()
        return albumYear
    })

    arrayOfYears.sort()

    // for loop through years from array
    // update value of each year in data points to reflect number of albums from that year
    for (const year of arrayOfYears) {
        dataPoints[year] = dataPoints[year] ? dataPoints[year] + 1 : 1
    }

    // return Chart component
    return <Chart dataPoints={dataPoints} />

}

export default ReviewsChart