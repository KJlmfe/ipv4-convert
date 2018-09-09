
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

module.exports = convertIPv4StrToInt;