import React from 'react';
import propTypes from 'prop-types';
import styles from './cell.module.css';
import bombImage from '../../assets/images/bomb.jpg';

export default function Cell(props) {
  const {
    data, row, col, onClick,
  } = props;
  let value;

  if (data.isBomb === true) {
    value = <img src={bombImage} alt="bomb" />;
  } else if (data.tip) {
    value = data.tip;
  }

  function handleClick() {
    onClick(row, col);
  }

  return (
    <div className={styles.Cell}>
      {value}
      { !data.isOpen && <div className={styles.Overlay} onClick={handleClick} />}
    </div>
  );
}

export const cellData = propTypes.shape({
  tip: propTypes.string,
  isBomb: propTypes.bool,
  isOpen: propTypes.bool,
});

Cell.propTypes = {
  data: cellData.isRequired,
  row: propTypes.number.isRequired,
  col: propTypes.number.isRequired,
  onClick: propTypes.func.isRequired,
};
