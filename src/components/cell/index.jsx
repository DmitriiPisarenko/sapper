import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import styles from './cell.module.css';
import bombImage from '../../assets/images/bomb.jpg';
import flagImage from '../../assets/images/flag.jpg';

export default function Cell(props) {
  const {
    data,
    row,
    col,
    onOpen,
    onMark,
    fail,
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
  const showOverlay = !(data.isOpen || (fail && data.isBomb));

  return (
    <div
      className={classNames(styles.Cell, {
        [styles.Failed]: row === fail?.row && col === fail?.col,
      })}
    >
      {value}
      { showOverlay && (
        <div className={styles.Overlay} onClick={onOpenWrapper} onContextMenu={onMarkWrapper}>
          { data.isMarked && <img src={flagImage} alt="flag" />}
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
  fail: propTypes.shape({
    row: propTypes.number.isRequired,
    col: propTypes.number.isRequired,
  }),
};

Cell.defaultProps = {
  fail: undefined,
};
