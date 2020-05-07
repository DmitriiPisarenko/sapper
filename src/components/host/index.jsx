import React from 'react';
import Header from '../header';
import Field from '../field';
import styles from './host.module.css';

const data = [
  [
    { tip: '4' },
    {
      tip: '7',
      bomb: true,
    },
  ],
  [
    { tip: '2' },
    { tip: '9' },
    {},
  ],
];

const counter = 5;
const time = 10;

export default function Host() {
  return (
    <div className={styles.Container}>
      <Header counter={counter} time={time} />
      <Field data={data} />
    </div>
  );
}
