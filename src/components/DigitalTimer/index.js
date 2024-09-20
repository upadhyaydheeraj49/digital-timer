// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimitInMinutes: 25,
    timeElapsedInSeconds: 0,
    isTimerStarted: false,
  }

  tick = () => {
    console.log(this.state.timeElapsedInSeconds)
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onToggleStartPauseBtn = () => {
    const {isTimerStarted} = this.state
    if (isTimerStarted) {
      // stop the timer
      clearInterval(this.uniqueId)
    } else {
      // start the timer
      this.uniqueId = setInterval(this.tick, 1000)
    }

    this.setState(prevState => ({isTimerStarted: !prevState.isTimerStarted}))
  }

  getTimeAndMinutes = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    if (timerLimitInMinutes * 60 === timeElapsedInSeconds) {
      // timer completed
      clearInterval(this.uniqueId)
      this.setState({
        timerLimitInMinutes: 25,
        timeElapsedInSeconds: 0,
        isTimerStarted: false,
      })
    }
    const minutes = Math.floor(timerLimitInMinutes - timeElapsedInSeconds / 60)
    const seconds =
      timerLimitInMinutes * 60 - minutes * 60 - timeElapsedInSeconds
    console.log(minutes, seconds)
    const remainingMinutes = minutes > 9 ? minutes : `0${minutes}`
    const remainingSeconds = seconds > 9 ? seconds : `0${seconds}`
    return {
      remainingMinutes,
      remainingSeconds,
    }
  }

  onResetTimer = () => {
    if (this.state.isTimerStarted) {
      clearInterval(this.uniqueId)
    }
    this.setState({
      timerLimitInMinutes: 25,
      timeElapsedInSeconds: 0,
      isTimerStarted: false,
    })
  }

  decreaseTimerLimit = () => {
    const {isTimerStarted, timerLimitInMinutes, timeElapsedInSeconds} =
      this.state
    const canUpdateTimer =
      isTimerStarted === false &&
      timeElapsedInSeconds === 0 &&
      timerLimitInMinutes > 0
    if (canUpdateTimer) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  increaseTimerLimit = () => {
    const {isTimerStarted, timeElapsedInSeconds} = this.state
    const canUpdateTimer =
      isTimerStarted === false && timeElapsedInSeconds === 0
    if (canUpdateTimer) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
      }))
    }
  }

  render() {
    const {timerLimitInMinutes, timeElapsedInSeconds, isTimerStarted} =
      this.state
    const startPauseBtnAltValue = isTimerStarted ? 'pause icon' : 'play icon'
    const {remainingMinutes, remainingSeconds} = this.getTimeAndMinutes()

    return (
      <div className="main-container">
        <h1>Digital Timer</h1>
        <div className="banner-container">
          <div className="timer-outer-container">
            <div className="timer-container">
              <h1>
                {remainingMinutes}:{remainingSeconds}
              </h1>
              <p>{isTimerStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="features-card">
            <div className="timer-top-controller-container">
              <button
                className="btn"
                type="button"
                onClick={this.onToggleStartPauseBtn}
              >
                <img
                  src={
                    isTimerStarted
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={startPauseBtnAltValue}
                />
                <p>{isTimerStarted ? 'Pause' : 'Start'}</p>
              </button>

              <button className="btn" type="button" onClick={this.onResetTimer}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p>Reset</p>
              </button>
            </div>
            <p>Set Timer limit</p>
            <div className="timer-plus-minus-container">
              <button type="button" onClick={this.decreaseTimerLimit}>
                -
              </button>
              <p className="timer-limit">{timerLimitInMinutes}</p>
              <button type="button" onClick={this.increaseTimerLimit}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
