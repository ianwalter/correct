function trim (data) {
  return trim.modify(data)
}
trim.modify = function modfiy (data) {
  return data.trim()
}

function lowercase (data) {
  return lowercase.modify(data)
}
lowercase.modify = function modify (data) {
  return data.toLowerCase()
}

module.exports = { trim, lowercase }
