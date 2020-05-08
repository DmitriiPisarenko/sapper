import React from 'react';
import propTypes from 'prop-types';
import styles from './field.module.css';
import Cell, { cellData } from '../cell';

export default function Field(props) {
  const { data, onCellOpen , onCellMark } = props;

  return (
    <div className={styles.Container}>
      { data.map((row, rowIndex) => (
        <div className={styles.Row}>
          { row.map((item, colIndex) => (
            <Cell data={item} row={rowIndex} col={colIndex} onOpen={onCellOpen} onMark={onCellMark} />
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
  onCellOpen: propTypes.func.isRequired,
  onCellMark: propTypes.func.isRequired,
};
