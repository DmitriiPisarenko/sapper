import React from 'react';
import propTypes from 'prop-types';
import styles from './header.module.css';

export default function Header(props) {
  const { counter, time } = props;

  return (
    <header className={styles.Container}>
      <div>
        {counter}
      </div>

      <button type="button">
        restart
      </button>

      <div>
        {time}
      </div>
    </header>
  );
}

Header.propTypes = {
  counter: propTypes.number.isRequired,
  time: propTypes.number.isRequired,
};
