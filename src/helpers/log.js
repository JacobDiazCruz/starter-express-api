// import jsonFile from "jsonfile"

// const getLogSchema = ({ message, statusCode, stack }) => {
//      return {
//           timeStamp: new Date().toISOString(),
//           statusCode: statusCode,
//           message: message,
//           stack: stack.split("\n"),
//      }
// }

// const readLog = async (statusCode) => {
//      try {
//           return await jsonFile.readFile(`./logs/${statusCode}.json`)
//      } catch (e) {
//           await jsonFile.writeFile(`./logs/${statusCode}.json`, { logs: [] })
//           return await readLog(statusCode)
//      }
// }

// const writeLog = async ({ message, statusCode, stack }) => {
//      const log = await readLog(statusCode)

//      log.logs.push(getLogSchema({ message, statusCode, stack }))
//      await jsonFile.writeFile(`./logs/${statusCode}.json`, log)
// }

// export { writeLog }
