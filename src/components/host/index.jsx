import React from 'react';
import Header from '../header';
import Field from '../field';
import styles from './host.module.css';

const maxElements = 10;
const counter = 5;
const time = 10;

export default class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.generateData();
  }

  generateData() {
    const rows = [];
    for (let i = 0; i < maxElements; i += 1) {
      const elements = [];
      for (let j = 0; j < maxElements; j += 1) {
        elements.push({});
      }
      rows.push(elements);
    }
    this.setState({ data: rows });
  }

  render() {
    const { data } = this.state;
    return (
      <div className={styles.Container}>
        <Header counter={counter} time={time} />
        <Field data={data} />
      </div>
    );
  }
}
