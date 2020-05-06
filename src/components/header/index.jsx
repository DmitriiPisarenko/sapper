import React from 'react';
import propTypes from 'prop-types';
import styles from './header.module.css';
import smile from '../../assets/images/smile.png';

export default function Header(props) {
  const { counter, time } = props;

  return (
    <header className={styles.Container}>
      <div className={styles.Display}>
        {counter.toString().padStart(3, 0)}
      </div>

      <button type="button" className={styles.Restart}>
        <img src={smile} alt="smile" />
      </button>

      <div className={styles.Display}>
        {time.toString().padStart(3, 0)}
      </div>
    </header>
  );
}

Header.propTypes = {
  counter: propTypes.number.isRequired,
  time: propTypes.number.isRequired,
};
