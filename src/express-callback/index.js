import adaptRequest from "../helpers/adapt-request.js"

export default function makeExpressCallback(controller) {
  return async (req, res) => {
    const httpRequest = adaptRequest(req)
    try {
      const httpResult = await controller(httpRequest)
      res.set(httpResult.headers)
        .status(httpResult.statusCode)
        .send({
          statusCode: httpResult?.statusCode,
          message: httpResult?.message,
          success: httpResult?.success,
          data: httpResult?.data
        })
    } catch (e) {
      console.log(e)
      console.log('express error callback')
      res.status(500).end()
    }
  }
}