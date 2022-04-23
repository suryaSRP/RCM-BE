const toObject = (arr, key, insertVal) => arr.reduce((a, b) => ({ ...a, [b[key]]: insertVal }), {});
module.exports = toObject