import React from 'react';
import Header from '../header';
import Field from '../field';
import styles from './host.module.css';

const maxElements = 10;
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

  static cascadeOpen(data, row, col) {
    if (row < 0 || col < 0 || row >= maxElements || col >= maxElements || data[row][col].isOpen) {
      return;
    }

    if (!data[row][col].isBomb) {
      // eslint-disable-next-line no-param-reassign
      data[row][col].isOpen = true;
    }

    if (!data[row][col].tip) {
      Host.cascadeOpen(data, row - 1, col);
      Host.cascadeOpen(data, row + 1, col);
      Host.cascadeOpen(data, row, col + 1);
      Host.cascadeOpen(data, row, col - 1);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      restBombsCount: maxElements,
      fail: undefined,
    };
    this.cellOpenHandler = this.cellOpenHandler.bind(this);
    this.generateData = this.generateData.bind(this);
    this.cellMarkHandler = this.cellMarkHandler.bind(this);
  }

  componentDidMount() {
    this.generateData();
  }

  cellOpenHandler(row, col) {
    const { data, fail } = this.state;
    if (fail) {
      return;
    }
    const newData = data.slice();
    Host.cascadeOpen(newData, row, col);
    let failData;
    if (data[row][col].isBomb) {
      failData = { row, col };
    }
    this.setState({
      data: newData,
      fail: failData,
    });
  }

  cellMarkHandler(row, col) {
    const { data, restBombsCount, fail } = this.state;
    if (fail) {
      return;
    }
    const newData = data.slice();
    newData[row][col].isMarked = !newData[row][col].isMarked;
    const newCounter = newData[row][col].isMarked
      ? restBombsCount - 1
      : restBombsCount + 1;
    this.setState({
      data: newData,
      restBombsCount: newCounter,
    });
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
    this.setState({
      data: rows,
      fail: undefined,
      restBombsCount: maxElements,
    });
  }

  render() {
    const { data, restBombsCount, fail } = this.state;
    return (
      <div className={styles.Container}>
        <Header
          counter={restBombsCount}
          time={time}
          onRestartClick={this.generateData}
          fail={fail}
        />
        <Field
          data={data}
          onCellOpen={this.cellOpenHandler}
          onCellMark={this.cellMarkHandler}
          fail={fail}
        />
      </div>
    );
  }
}
