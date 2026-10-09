/*
   FURNIRO PASSWORD UTILITIES
   Educational password hashing with PBKDF2
*/

(function () {

    "use strict";

    const ITERATIONS = 210000;

    /*
       Convert bytes to hexadecimal
    */

    function bytesToHex(bytes) {

        return Array.from(bytes)
            .map(function (byte) {
                return byte.toString(16).padStart(2, "0");
            })
            .join("");

    }


    /*
       Convert hexadecimal to bytes
    */

    function hexToBytes(hex) {

        if (
            typeof hex !== "string" ||
            !/^(?:[0-9a-f]{2})+$/i.test(hex)
        ) {
            throw new Error("Invalid salt format.");
        }

        const bytes = new Uint8Array(hex.length / 2);

        for (let i = 0; i < bytes.length; i++) {

            bytes[i] = parseInt(
                hex.slice(i * 2, i * 2 + 2),
                16
            );

        }

        return bytes;

    }


    /*
       Generate a random salt
    */

    function generateSalt() {

        const salt = crypto.getRandomValues(
            new Uint8Array(16)
        );

        return bytesToHex(salt);

    }


    /*
       Hash password using PBKDF2
    */

    async function hashPassword(password, saltHex) {

        if (!crypto.subtle) {
            throw new Error(
                "Secure Web Crypto is unavailable. Use localhost or HTTPS."
            );
        }

        const encoder = new TextEncoder();

        const passwordKey = await crypto.subtle.importKey(
            "raw",
            encoder.encode(password),
            "PBKDF2",
            false,
            ["deriveBits"]
        );

        const hashBuffer = await crypto.subtle.deriveBits(
            {
                name: "PBKDF2",
                salt: hexToBytes(saltHex),
                iterations: ITERATIONS,
                hash: "SHA-256"
            },
            passwordKey,
            256
        );

        return bytesToHex(
            new Uint8Array(hashBuffer)
        );

    }


    /*
       Create password hash and salt
    */

    async function createPasswordHash(password) {

        const salt = generateSalt();

        const hash = await hashPassword(
            password,
            salt
        );

        return {
            passwordSalt: salt,
            passwordHash: hash
        };

    }


    /*
       Verify password
    */

    async function verifyPassword(
        password,
        salt,
        storedHash
    ) {

        const calculatedHash = await hashPassword(
            password,
            salt
        );

        return calculatedHash === storedHash;

    }


    /*
       Make functions available to other scripts
    */

    window.FurniroPassword = {
        createPasswordHash: createPasswordHash,
        verifyPassword: verifyPassword
    };

})();