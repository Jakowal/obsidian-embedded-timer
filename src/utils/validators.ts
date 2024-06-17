export const TimeFormatRegex = {
	hours: /HH/,
	minutes: /mm/,
	seconds: /ss/,
}

const illegalTimeFormatCharactersRegex = /[a-ln-rt-zA-GI-Z0-9]/

const illegalTimeStringCharactersRegex = /[a-zA-Z]/

export const timeFormatIsValid = (input: string): boolean => !!input && !illegalTimeFormatCharactersRegex.test(input);


export const timeInputMatchesFormat = (input: string, format: string): boolean => {
	if (illegalTimeStringCharactersRegex.test(input)) {
		return false;
	}
	return true;
}