import { assert } from "node:console";
import { describe, it } from "node:test";
import { timeFormatIsValid } from "src/utils/validators";

describe('timeInputIsValid', () => {
    it('should return true for time strings that contain the allowed symbols', () => {
        const validString1 = 'HH:mm'
        const validString2 = 'HH:mm:ss'
        assert(timeFormatIsValid(validString1) === true);
        assert(timeFormatIsValid(validString2) === true);
    });

    it('should return false for time strings that contain symbols not in the allowed list', () => {
        const invalidString1 = 'HH:mmd'
        const invalidString2 = '12:mm:ss'
        const invalidString3 = 'hh:mm:ss SxSS'
        const invalidString4 = 'HH:mm b'
        const invalidString5 = 'h:tm:ss'
        const invalidString6 = 'a'
        const invalidString7 = ''
        assert(timeFormatIsValid(invalidString1) === false);
        assert(timeFormatIsValid(invalidString2) === false);
        assert(timeFormatIsValid(invalidString3) === false);
        assert(timeFormatIsValid(invalidString4) === false);
        assert(timeFormatIsValid(invalidString5) === false);
        assert(timeFormatIsValid(invalidString6) === false);
        assert(timeFormatIsValid(invalidString7) === false);
    })
})