const assert = require('assert');
const convertIPv4StrToInt = require('../');

describe('convertIPv4StrToInt', function () {

    it('should convert normal ipv4 address to correct integers', function () {
        assert.equal(2896692481, convertIPv4StrToInt("172.168.5.1"));
        assert.equal(0, convertIPv4StrToInt("0.0.0.0"));
        assert.equal(16843009, convertIPv4StrToInt("1.1.1.1"));
        assert.equal(4294967295, convertIPv4StrToInt("255.255.255.255"));
    });

    it('a string with spaces between a digit and a dot is valid IPv4 address', function () {
        const s = [];
        // Test all cases:
        //  172 .168.5.1
        //  172 . 168.5.1
        //  172 .  168.5.1
        //  172  .168.5.1
        //  172  . 168.5.1
        //  ...
        function generateIpAndTest(i) {
            if (i === 8) {
                ip = `${s[0]}172${s[1]}.${s[2]}168${s[3]}.${s[4]}5${s[5]}.${s[6]}1${s[7]}`;
                assert.equal(2896692481, convertIPv4StrToInt(ip));
            } else {
                for (let j = 0; j < 3; j++) { // iterate 0,1,2 spaces
                    s[i] = ' '.repeat(j);
                    generateIpAndTest(i + 1);
                }
            }
        }
        generateIpAndTest(0);
    });

    it('a string with spaces between two digits is invalid IPv4 address', function () {
        const samples = ["1 72", "1  72", "17 2", "17  2", "6 8", "6  8"];
        let ip, blocks;

        for (let i = 0; i < 4; i++) { // iterate in each block(A.B.C.D) to test all cases
            blocks = ["0", "0", "0", "0"];
            for (let j = 0; j < samples.length; j++) {
                blocks[i] = samples[j];
                ip = blocks.join('.');
                assert.throws(() => convertIPv4StrToInt(ip), {
                    name: "Error",
                    message: "Invalid IPv4 address, each block (A.B.C.D) should be an integer"
                });
            }
        }
    });

    it('digits, dots and spaces are only valid in each block (A.B.C.D)', function () {
        const invalidIPv4s = [
            "A12.0.0.1", "12.0.0.1$", "12.0.0_.1", "12.0@.0.1",
            ".168.5.1", "172..5.1", "172.168..1", "172.168.5."
        ];

        invalidIPv4s.forEach((invalidIPv4) => {
            assert.throws(() => convertIPv4StrToInt(invalidIPv4), {
                name: "Error",
                message: "Invalid IPv4 address, each block (A.B.C.D) should be an integer"
            });
        });
    });

    it('address range should be 0.0.0.0 – 255.255.255.255', function () {
        const invalidIPv4s = ["256.0.0.1", "1.256.0.1", "1.1.256.1", "1.1.1.256"];

        invalidIPv4s.forEach((invalidIPv4) => {
            assert.throws(() => convertIPv4StrToInt(invalidIPv4), {
                name: "Error",
                message: "Invalid IPv4 address, each block (A.B.C.D) should be less than 256"
            });
        });
    });

    it('should formated in A.B.C.D (only 3 dots)', function () {
        const invalidIPv4s = ["", ".", "5.1", "168.5.1", "2.172.168.5.1"];

        invalidIPv4s.forEach((invalidIPv4) => {
            assert.throws(() => convertIPv4StrToInt(invalidIPv4), {
                name: "Error",
                message: "Invalid IPv4 address, it should be formated in A.B.C.D"
            });
        });
    });

    it('type of argument(ipv4Str) should be string', function () {
        const invalidIPv4s = [123, 0.12, false, [], {}];

        invalidIPv4s.forEach((invalidIPv4) => {
            assert.throws(() => convertIPv4StrToInt(invalidIPv4), {
                name: "TypeError",
                message: "Illegal arguments, ipv4Str should be a string"
            });
        });
    });

});