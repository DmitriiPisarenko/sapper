import React from 'react';
import propTypes from 'prop-types';
import styles from './header.module.css';
import smile from '../../assets/images/smile.png';

let intervalId;
export default class Header extends React.Component {
  static getDerivedStateFromProps(nextProps, state) {
    if (state.endGame !== nextProps.endGame) {
      clearInterval(intervalId);
      if (!nextProps.endGame) {
        intervalId = state.startTime();
        return {
          time: 0,
          endGame: nextProps.endGame,
        };
      }
    }
    return { endGame: nextProps.endGame };
  }

  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      endGame: props.endGame,
      startTime: this.startTime.bind(this),
    };
    this.restartGame = this.restartGame.bind(this);
  }

  componentDidMount() {
    intervalId = this.startTime();
  }

  startTime() {
    return setInterval(() => {
      const { time } = this.state;
      if (time === 999) {
        return;
      }
      this.setState({ time: time + 1 });
    }, 1000);
  }

  restartGame() {
    const { onRestartClick } = this.props;
    this.setState({ time: 0 });
    onRestartClick();
  }

  render() {
    const { counter } = this.props;
    const { time } = this.state;

    return (
      <header className={styles.Container}>
        <div className={styles.Display}>
          {Math.max(0, counter).toString().padStart(3, 0)}
        </div>

        <button type="button" className={styles.Restart} onClick={this.restartGame}>
          <img src={smile} alt="smile" />
        </button>

        <div className={styles.Display}>
          {time.toString().padStart(3, 0)}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  counter: propTypes.number.isRequired,
  onRestartClick: propTypes.func.isRequired,
  endGame: propTypes.bool.isRequired,
};
