class ResponseHandler {
  responseJsonHandler(
    {
      success = true,
      statusCode = 200,
      message = null,
      data = null,
      otherData = null,
    },
    res
  ) {
    let response = {
      success,
      statusCode,
      message:
        message || (success ? "Request was successful" : "Request failed"),
    };

    if (data) {
      response.data = data;
    }
    if (otherData) {
      response = { ...response, ...otherData };
    }

    res.status(statusCode).json(response);
  }
}

module.exports = new ResponseHandler();
