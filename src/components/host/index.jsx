import React from 'react';
import Header from '../header';
import Field from '../field';
import styles from './host.module.css';

const maxElements = 10;
const counter = 5;
const time = 10;

export default class Host extends React.Component {
  static generateBombsPositions() {
    const bombs = {};
    for (let i = 0; i < maxElements; i += 1) {
      let row = Math.floor(Math.random() * maxElements);
      let col = Math.floor(Math.random() * maxElements);
      while (bombs[row]?.[col]) {
        col = Math.floor(Math.random() * maxElements);
        row = Math.floor(Math.random() * maxElements);
      }
      if (bombs[row]) {
        bombs[row][col] = true;
      } else {
        bombs[row] = { [col]: true };
      }
    }
    return bombs;
  }

  static calculateTip(bombs, row, col) {
    let counter = 0;
    for (let i = row - 1; i <= row + 1; i += 1) {
      for (let j = col - 1; j <= col + 1; j += 1) {
        if (bombs[i]?.[j]) {
          counter += 1;
        }
      }
    }
    return counter;
  }

  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.cellClickHandler = this.cellClickHandler.bind(this);
    this.generateData = this.generateData.bind(this);
  }

  componentDidMount() {
    this.generateData();
  }

  cellClickHandler(row, col) {
    const { data } = this.state;
    const newData = data.slice();
    newData[row][col].isOpen = true;
    this.setState({ data: newData });
  }

  generateData() {
    const bombs = Host.generateBombsPositions();
    const rows = [];
    for (let i = 0; i < maxElements; i += 1) {
      const elements = [];
      for (let j = 0; j < maxElements; j += 1) {
        const isBomb = !!bombs[i]?.[j];
        let tip;
        if (!isBomb) {
          tip = Host.calculateTip(bombs, i, j);
        }
        elements.push({ isBomb, tip });
      }
      rows.push(elements);
    }
    this.setState({ data: rows });
  }

  render() {
    const { data } = this.state;
    return (
      <div className={styles.Container}>
        <Header counter={counter} time={time} onRestartClick={this.generateData} />
        <Field data={data} onCellClick={this.cellClickHandler} />
      </div>
    );
  }
}
