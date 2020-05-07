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
        <Header counter={counter} time={time} onRestartClick={this.generateData} />
        <Field data={data} onCellClick={this.cellClickHandler} />
      </div>
    );
  }
}
