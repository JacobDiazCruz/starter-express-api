// const redis = require("redis");
// const client = redis.createClient({
//   port: 6379,
//   host: '127.0.0.1'
// });

// client.on("connect", () => {
//   console.log('client connected to redis.')
// })

// client.on("ready", () => {
//   console.log('client connected to redis and ready to use')
// })

// client.on("error", (err) => {
//   console.log(err.message)
//   console.log('Here error')
// })

// client.on("end", () => {
//   console.log('Client Redis has been disconnected')
// })

// process.on('SIGINT', () => {
//   client.quit()
// })

// module.exports = client