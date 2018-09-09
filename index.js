
/**
 * Covert an IPv4 string into a 32-bit integer
 * 
 * @param {String} ipv4Str
 * @returns {Number}
 */
function convertIPv4StrToInt(ipv4Str) {
    if (typeof ipv4Str !== "string") {
        throw TypeError("Illegal arguments, ipv4Str should be a string");
    }

    const blocks = ipv4Str.split(".");
    if (blocks.length !== 4) {
        throw Error("Invalid IPv4 address, it should be formated in A.B.C.D");
    }

    let ipv4Int = 0, base = 1, digit;

    for (let i = 3; i >= 0; i--) {
        digit = blocks[i].trim();
        if (!/^\d+$/.test(digit)) { // should only contain digits
            throw Error("Invalid IPv4 address, each block (A.B.C.D) should be an integer");
        }

        digit = parseInt(digit);
        if (digit >= 256) {
            throw Error("Invalid IPv4 address, each block (A.B.C.D) should be less than 256");
        }

        ipv4Int += digit * base;
        base *= 256;
    }

    return ipv4Int;
}

// Implement without native api(split, trim) and only iterate the string once.
function convertIPv4StrToInt2(ipv4Str) {
    if (typeof ipv4Str !== "string") {
        throw TypeError("Illegal arguments, ipv4Str should be a string");
    }

    let ipv4Int = 0,
        base = 1,
        digit,
        digitBase = 1,
        dotsCnt = 0,
        isSpaceAppearBeforeDigit = false,
        char;

    for (let i = ipv4Str.length - 1; i >= -1; i--) {
        char = ipv4Str[i];

        if (char === '.' || i === -1) { // dot or end
            dotsCnt = i !== -1 ? dotsCnt + 1 : dotsCnt;
            if (dotsCnt > 3 || (i === -1 && dotsCnt !== 3)) {
                throw Error("Invalid IPv4 address, it should be formated in A.B.C.D");
            }
            if (digit === undefined) { // nothing between two dots, such as: 172.1..
                throw Error("Invalid IPv4 address, each block (A.B.C.D) should be an integer");
            }
            if (digit >= 256) {
                throw Error("Invalid IPv4 address, each block (A.B.C.D) should be less than 256");
            }
            ipv4Int += digit * base;
            base *= 256;

            digit = undefined;
            digitBase = 1;
            isSpaceAppearBeforeDigit = false;
        } else if (/\d/.test(char)) { // digit
            if (isSpaceAppearBeforeDigit) { // spaces between two digits, such as: 172.1.1 2
                throw Error("Invalid IPv4 address, each block (A.B.C.D) should be an integer");
            }

            digit = parseInt(char) * digitBase + (digit === undefined ? 0 : digit);
            digitBase *= 10;
        } else if (char === ' ') { // space
            if (digit !== undefined) {
                isSpaceAppearBeforeDigit = true;
            }

            isSpaceAppear = true;
        } else {
            throw Error("Invalid IPv4 address, each block (A.B.C.D) should be an integer");
        }
    }

    return ipv4Int;
}

module.exports = convertIPv4StrToInt;