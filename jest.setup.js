import '@testing-library/jest-dom/extend-expect'
const { TextEncoder, TextDecoder } = require("util");

global.fetch = require("node-fetch");

Object.assign(global, { TextDecoder, TextEncoder });