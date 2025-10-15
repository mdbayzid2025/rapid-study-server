const sendResponse = (res, data) => {
  const resData = {
    success: data?.success,
    message: data?.message,
    pagination: data?.pagination,
    data: data?.data,
  };

  res.status(data?.statusCode).json(resData);
};

module.exports = sendResponse;
