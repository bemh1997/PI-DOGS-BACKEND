module.exports = function validationName(name) {
  return /^[a-zA-Z0-9\s]+$/.test(name);
}