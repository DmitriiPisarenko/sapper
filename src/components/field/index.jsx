import React from 'react';
import propTypes from 'prop-types';
import styles from './field.module.css';
import Cell, { cellData } from '../cell';

export default function Field(props) {
  const { data, onCellClick } = props;

  return (
    <div className={styles.Container}>
      { data.map((row, rowIndex) => (
        <div className={styles.Row}>
          { row.map((item, colIndex) => (
            <Cell data={item} row={rowIndex} col={colIndex} onClick={onCellClick} />
          )) }
        </div>
      ))}
    </div>
  );
}


Field.propTypes = {
  data: propTypes.arrayOf(
    propTypes.arrayOf(cellData),
  ).isRequired,
  onCellClick: propTypes.func.isRequired,
};
