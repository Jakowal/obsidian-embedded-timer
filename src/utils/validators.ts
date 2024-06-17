enum TimerFormatSymbolEnum {
	hours = 'HH',
	minutes = 'mm',
	seconds = 's',
	secondsWithLeading0 = 'ss',
}

const illegalCharactersRegex = /[a-ln-rt-zA-GI-Z0-9]/

export const timeInputIsValid = (input: string): boolean => !input || illegalCharactersRegex.test(input);