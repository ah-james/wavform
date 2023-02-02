// chart components
import ChartBar from "./ChartBar";
// styles
import styles from "./Chart.module.css";

const Chart = ({ dataPoints }) => {
  // get array of the values from all 12 months in AlbumsChart.js with .map
  const yearValues = Object.values(dataPoints);
  // find biggest value across months with Math.max
  const maxValue = Math.max(...yearValues);

  const dataPointArray = Object.entries(dataPoints).map(([k, v]) => ({
    label: k,
    value: v,
  }));

  return (
    <div className={styles.chart}>
      {dataPointArray.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={maxValue}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
