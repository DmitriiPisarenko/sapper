import React from 'react';
import propTypes from 'prop-types';
import styles from './field.module.css';

export default function Field(props) {
  const { data } = props;

  return (
    <div className={styles.Container}>
      { data.map((row) => (
        <div>
          { row.map((item) => (
            item.tip
          )) }
        </div>
      ))}
    </div>
  );
}


Field.propTypes = {
  data: propTypes.arrayOf(
    propTypes.arrayOf(
      propTypes.shape({
        tip: propTypes.string,
      }),
    ),
  ).isRequired,
};
