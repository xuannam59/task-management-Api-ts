"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = exports.generateRandomChar = void 0;
const generateRandomChar = (length) => {
    const char = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += char.charAt(Math.random() * char.length);
    }
    return result;
};
exports.generateRandomChar = generateRandomChar;
const generateRandomNumber = (length) => {
    const number = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += number.charAt(Math.random() * number.length);
    }
    return result;
};
exports.generateRandomNumber = generateRandomNumber;
