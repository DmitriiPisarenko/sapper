import React from 'react';
import propTypes from 'prop-types';
import styles from './cell.module.css';
import bombImage from '../../assets/images/bomb.jpg';

export default function Cell(props) {
  const { data, row, col } = props;
  let value;

  if (data.bomb === true) {
    value = <img src={bombImage} alt="bomb" />;
  } else if (data.tip) {
    value = data.tip;
  }

  return (
    <div className={styles.Cell}>
      {value}
    </div>
  );
}

export const cellData = propTypes.shape({
  tip: propTypes.string,
  bomb: propTypes.bool,
});

Cell.propTypes = {
  data: cellData.isRequired,
  row: propTypes.number.isRequired,
  col: propTypes.number.isRequired,
};
