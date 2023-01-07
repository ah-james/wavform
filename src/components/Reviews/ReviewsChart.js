import Chart from "../Chart/Chart"

const ReviewsChart = props => {
    // chart data points variable, array containing objects of chart label for each month, value: 0
    const dataPoints = [
        { label: 'Jan', value: 0 },
        { label: 'Feb', value: 0 },
        { label: 'Mar', value: 0 },
        { label: 'Apr', value: 0 },
        { label: 'May', value: 0 },
        { label: 'Jun', value: 0 },
        { label: 'Jul', value: 0 },
        { label: 'Aug', value: 0 },
        { label: 'Sep', value: 0 },
        { label: 'Oct', value: 0 },
        { label: 'Nov', value: 0 },
        { label: 'Dec', value: 0 }
    ]

    // for loop through props.expenses from filteredAlbums in Albums.js
    // update value of each month in data points to reflect number of albums from that month
    for (const review of props.reviews) {
        const date = new Date(review.date)
        const albumMonth = date.getMonth()
        dataPoints[albumMonth].value += 1
    }

    // return Chart component
    return <Chart dataPoints={dataPoints} />

}

export default ReviewsChart