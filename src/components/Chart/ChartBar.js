// styles
import React from "react";
import PropTypes from "prop-types";
import styles from "./ChartBar.module.css";

const ChartBar = ({ value, maxValue, label }) => {
  // calculate bar fill height with variable that will help set CSS
  const barFill = `${Math.round((value / maxValue) * 100)}%`;

  return (
    <div className={styles["chart-bar"]}>
      <div className={styles["chart-bar-inner"]}>
        {/* dynamically adjust height with barFill variable in style react prop */}
        {/* value is a javascript object */}
        <div
          className={styles["chart-bar-fill"]}
          style={{ height: barFill }}
        ></div>
      </div>
      {/* put label from props in this one */}
      <div className={styles["chart-bar-label"]}>{label}</div>
    </div>
  );
};

ChartBar.defaultProps = {
  value: 0,
  maxValue: 1,
};

ChartBar.propTypes = {
  value: PropTypes.number,
  maxValue: PropTypes.number,
  label: PropTypes.string.isRequired,
};

export default ChartBar;
