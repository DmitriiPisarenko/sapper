import React from 'react';
import propTypes from 'prop-types';
import styles from './cell.module.css';
import bombImage from '../../assets/images/bomb.jpg';

export default function Cell(props) {
  const {
    data, row, col, onOpen, onMark,
  } = props;
  let value;

  if (data.isBomb === true) {
    value = <img src={bombImage} alt="bomb" />;
  } else if (data.tip) {
    value = data.tip;
  }

  function onOpenWrapper() {
    onOpen(row, col);
  }

  function onMarkWrapper(event) {
    event.preventDefault();
    onMark(row, col);
  }

  return (
    <div className={styles.Cell}>
      {value}
      { !data.isOpen && (
        <div className={styles.Overlay} onClick={onOpenWrapper} onContextMenu={onMarkWrapper}>
          { data.isMarked && <img src="" alt="flag" />}
        </div>
      )}
    </div>
  );
}

export const cellData = propTypes.shape({
  tip: propTypes.string,
  isBomb: propTypes.bool,
  isOpen: propTypes.bool,
  isMarked: propTypes.bool,
});

Cell.propTypes = {
  data: cellData.isRequired,
  row: propTypes.number.isRequired,
  col: propTypes.number.isRequired,
  onOpen: propTypes.func.isRequired,
  onMark: propTypes.func.isRequired,
};
