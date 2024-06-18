import Timer from 'main';
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, setIcon } from 'obsidian';
import { TimerModel } from 'src/models/timer.model';
import { getSecondsForTimer, getTimerString, timerIsFinished, updateSecondsLeftForTimer } from 'src/utils/timer.utils';
import { timeFormatIsValid, timeInputMatchesFormat } from 'src/utils/validators';

export const embeddedTimerElement = (el: HTMLElement, component: Timer, timer: TimerModel) => {

    if (!timeFormatIsValid(timer.formatString)) {
        new Notice("Invalid time format...", 2000);
        return;
    }

    if (!timeInputMatchesFormat(timer.timeString, timer.formatString)) {
        new Notice("Time input doesn't match the format...", 2000);
        return;
    }

    const timerContainer = el.createDiv("embedded-timer-wrapper").createDiv("timer-container");

    const timeElement = timerContainer.createEl("h5", "time");
    timeElement.setText(getTimerString(timer.secondsLeft, timer.formatString));

    timeElement.setCssStyles({width: `${timer.formatString.length * 10}px`})
    
    let runTimer = -99;

    const timeControls = timerContainer.createSpan("time-controls");

    const playPauseButton = timeControls.createEl("button", "timer-btn play-pause-btn");
    setIcon(playPauseButton, "play");

    const resetButton = timeControls.createEl("button", "timer-btn reset-btn");
    setIcon(resetButton, "rotate-ccw");
    resetButton.disabled = true;

    const stopTimer = () => {
        setIcon(playPauseButton, "play");
        window.clearInterval(runTimer);
        runTimer = -99;
        timer.lastUpdated = undefined;
    }

    const toggleTimer = () => {
        if (runTimer !== -99) {
            stopTimer();
        }
        else {
            resetButton.disabled = false;
            setIcon(playPauseButton, "pause");
            runTimer = window.setInterval(() => updateSecondsLeftForTimer(timer, timeElement), 500);
            component.registerInterval(runTimer);
            timer.lastUpdated = new Date();
        }
    }

    playPauseButton.onClickEvent(toggleTimer);
    resetButton.onClickEvent(() => {
        stopTimer();
        resetButton.disabled = true;
        timer.secondsLeft = getSecondsForTimer(timer.timeString, timer.formatString);
        timeElement.setText(getTimerString(timer.secondsLeft, timer.formatString));
    })

}