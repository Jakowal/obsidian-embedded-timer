import Timer from "main";
import { TimerModel } from "src/models/timer.model";
import { TimeFormatRegex } from "./validators";
import { Notice } from "obsidian";
import { TimerCompletedModal } from "src/components/TimerFinishedModal";

export const timerIsFinished = (timer: TimerModel): boolean => timer.secondsLeft === 0;

export const updateSecondsLeftForTimer = (timer: TimerModel, timerTextSpan: HTMLSpanElement, runTimer: number, onComplete: () => void) => {
    if (!timerIsFinished(timer)) {
        if (timer.lastUpdated) {
            const now = Math.ceil(new Date().getTime() / 1000);
            const lastUpdate = Math.ceil(timer.lastUpdated.getTime() / 1000);
            if (now - lastUpdate > 0) {
                timer.secondsLeft -= (now - lastUpdate);
                timer.lastUpdated = new Date();
                timerTextSpan.setText(getTimerString(timer.secondsLeft, timer.formatString));
            }
        }
    }
    else {
        timer.lastUpdated = undefined;
        window.clearInterval(runTimer);
        onComplete();

    }
}

export const getTimerString = (secondsLeft: number, formatString: string): string => {
    let seconds = secondsLeft;

    let secondsString = "";
    let hoursString = "";
    let minutesString = "";

    if (TimeFormatRegex.hours.test(formatString)) {
        hoursString = `${Math.floor(seconds/3600)}`
        if (hoursString.length === 1) {
            hoursString = `0${hoursString}`
        }
        seconds -= +hoursString * 3600;
    }
    if (TimeFormatRegex.minutes.test(formatString)) {
        minutesString = `${Math.floor(seconds/60)}`;
        if (minutesString.length === 1) {
            minutesString = `0${minutesString}`
        }
        seconds -= +minutesString * 60;
    }

    if (TimeFormatRegex.seconds.test(formatString)) {
        secondsString = `${seconds}`;
        if (secondsString.length === 1) {
            secondsString = `0${secondsString}`
        }
    }
    return formatString
        .replace(TimeFormatRegex.hours, hoursString)
        .replace(TimeFormatRegex.minutes, minutesString)
        .replace(TimeFormatRegex.seconds, secondsString);
}

export const getSecondsForTimer = (timeString: string, formatString: string): number => {
    const hoursIndex = TimeFormatRegex.hours.exec(formatString)?.index;
    const minutesIndex = TimeFormatRegex.minutes.exec(formatString)?.index;
    const secondsIndex = TimeFormatRegex.seconds.exec(formatString)?.index;

    let totalSeconds = 0;

    if (hoursIndex !== undefined) {
        totalSeconds += +timeString.slice(hoursIndex, hoursIndex + 2) * 3600;
    }
    if (minutesIndex !== undefined) {
        totalSeconds += +timeString.slice(minutesIndex, minutesIndex + 2) * 60;
    }
    if (secondsIndex !== undefined) {
        totalSeconds += +timeString.slice(secondsIndex, secondsIndex + 2);
    }
    return totalSeconds;
}

export const createTimerObject = (config: string[], component: Timer): TimerModel => {
    const format = config[1] || component.settings.timeFormat;

    return {
        timeString: config[0],
        formatString: format,
        secondsLeft: getSecondsForTimer(config[0], format),
    }
}