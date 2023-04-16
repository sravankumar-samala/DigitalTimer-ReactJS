// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isTimerStarted: false,
      timerLimit: 25,
      remainingSeconds: 25 * 60,
      interval: null,
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {remainingSeconds, interval} = this.state

    if (remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
      clearInterval(interval)
      this.setState({
        isTimerStarted: false,
        // remainingSeconds: timerLimit * 60,
        interval: null,
      })
    }
  }

  componentWillUnmount = () => {
    const {interval} = this.state
    clearInterval(interval)
  }

  resetTimer = () => {
    const {interval} = this.state
    clearInterval(interval)
    this.setState({
      isTimerStarted: false,
      timerLimit: 25,
      remainingSeconds: 25 * 60,
      interval: null,
    })
  }

  startTimer = () => {
    const {isTimerStarted, interval, remainingSeconds} = this.state
    if (!isTimerStarted && remainingSeconds > 0) {
      const intervalID = setInterval(() => {
        this.setState(prevState => ({
          remainingSeconds: prevState.remainingSeconds - 1,
        }))
      }, 1000)
      this.setState({
        isTimerStarted: true,
        interval: intervalID,
      })
    } else {
      clearInterval(interval)
      this.setState({
        isTimerStarted: false,
        interval: null,
      })
    }
  }

  onDecrementLimit = () => {
    const {isTimerStarted, timerLimit} = this.state

    if (!isTimerStarted && timerLimit > 1) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
        remainingSeconds: prevState.remainingSeconds - 60,
      }))
    }
  }

  onIncrementLimit = () => {
    const {isTimerStarted} = this.state

    if (!isTimerStarted) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit + 1,
        remainingSeconds: prevState.remainingSeconds + 60,
      }))
    }
  }

  //   format = num => (num < 10 ? `0${num}` : num)
  format = num => num.toString().padStart(2, '0')

  render() {
    const {isTimerStarted, timerLimit, remainingSeconds} = this.state
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = remainingSeconds % 60
    const startPauseIconUrl = isTimerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
    // console.log(remainingSeconds)
    // console.log(isTimerStarted ? 'timer start' : 'timer pause')

    return (
      <div className="container">
        <div className="app-container">
          <h1>Digital Timer</h1>
          <div className="app-inner-container">
            <div className="timer-container">
              <div className="timer-display">
                <h1 className="timer">
                  {this.format(minutes)}:{this.format(seconds)}
                </h1>
                <p className="timer-status">
                  {isTimerStarted ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="timer-controllers">
              <p className="reset-text">
                {remainingSeconds === 0 && 'Click Reset to start again'}
              </p>
              <div className="control-buttons">
                <button
                  type="button"
                  className="start-stop-btn ctrl-btn"
                  onClick={this.startTimer}
                >
                  <img
                    src={startPauseIconUrl}
                    alt={isTimerStarted ? 'pause icon' : 'play icon'}
                  />
                  <p>{isTimerStarted ? 'Pause' : 'Start'}</p>
                </button>
                <button
                  type="button"
                  className="reset-btn ctrl-btn"
                  onClick={this.resetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                    alt="reset icon"
                  />
                  <p>Reset</p>
                </button>
              </div>
              <div className="timer-limit-container">
                <p>Set Timer Limit</p>
                <div className="timer-limit-buttons">
                  <button
                    type="button"
                    className="limit-btn"
                    onClick={this.onDecrementLimit}
                  >
                    -
                  </button>
                  <p className="timer-limit">{this.format(timerLimit)}</p>
                  <button
                    type="button"
                    className="limit-btn"
                    onClick={this.onIncrementLimit}
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="limit-error">
                {timerLimit === 1 && 'Limit cannot set less than 1'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
