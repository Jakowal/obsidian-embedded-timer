import { assert } from "node:console";
import { describe, it } from "node:test";
import { timeInputIsValid } from "src/utils/validators";

describe('timeInputIsValid', () => {
    it('should return true for time strings that contain the allowed symbols', () => {
        const validString1 = 'HH:mm'
        const validString2 = 'HH:mm:ss'
        assert(timeInputIsValid(validString1) === true);
        assert(timeInputIsValid(validString2) === true);
    });

    it('should return false for time strings that contain symbols not in the allowed list', () => {
        const invalidString1 = 'HH:mmd'
        const invalidString2 = '12:mm:ss'
        const invalidString3 = 'hh:mm:ss SxSS'
        const invalidString4 = 'HH:mm b'
        const invalidString5 = 'h:tm:ss'
        const invalidString6 = 'a'
        const invalidString7 = ''
        assert(timeInputIsValid(invalidString1) === false);
        assert(timeInputIsValid(invalidString2) === false);
        assert(timeInputIsValid(invalidString3) === false);
        assert(timeInputIsValid(invalidString4) === false);
        assert(timeInputIsValid(invalidString5) === false);
        assert(timeInputIsValid(invalidString6) === false);
        assert(timeInputIsValid(invalidString7) === false);
    })
})