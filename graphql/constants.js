exports.InternalError = {
  code: "500",
  message: "Internal server error",
  success: false,
};

exports.BaseResponse = {
  code: "200",
  message: "Success",
  success: true,
};

exports.QueryResponse = (payload) => ({
  ...this.BaseResponse,
  ...payload,
});

exports.NotFound = {
  code: "404",
  message: "Not found!",
  success: false,
};

exports.NoContent = {
  code: "204",
  message: "No Content",
  success: true,
};

exports.CreatedResponse = (payload) => {
  return {
    code: "201",
    success: true,
    message: "saved successful",
    ...payload,
  };
};
