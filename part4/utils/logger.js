const info = (...params) => {
  console.log(...params)
}
  
const error = (...params) => {
  console.error(...params)
}
const x = { info, error } //easier to find all references used in other files
module.exports = x