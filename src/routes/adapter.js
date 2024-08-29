const adapter = (fn) => {
  return async (req, res) => {
    const response = await fn(req);

    if (!response.handle) {
      return res.status(500).json({
        body: response.message ?? "Uncaught exception",
        type: "uncaught_exception",
        status_code: 500,
      });
    }

    return res.status(handle.status_code).json(response.handle());
  };
};

module.exports = { adapter };
