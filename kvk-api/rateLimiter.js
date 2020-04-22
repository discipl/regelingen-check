const moment = require("moment");

const redis = require("redis");
const redis_rate_limit = redis.createClient(
  process.env.REDIS_RATE_LIMIT_PORT || 6380,
  process.env.REDIS_RATE_LIMIT_HOST || "localhost"
);

const WINDOW_SIZE_IN_MINUTES = 5;
const MAX_WINDOW_REQUEST_COUNT = 5;

module.exports = function (req, res, next) {
  try {
    const kvknr = req.params.kvknr;
    // check that redis client exists
    if (!redis_rate_limit) {
      throw new Error("Redis client does not exist!");
      process.exit(1);
    }
    // fetch records of current user using IP address, returns null when no record is found
    redis_rate_limit.get(req.ip, function (err, record) {
      if (err) throw err;
      const currentRequestTime = moment();
      //  if no record is found , create a new record for user and store to redis
      if (!record) {
        let newRecord = [];
        let requestLog = {
          requestNumber: kvknr,
          requestTimeStamp: currentRequestTime.unix(),
        };
        newRecord.push(requestLog);
        redis_rate_limit.set(req.ip, JSON.stringify(newRecord));
        next();
        return;
      }
      // if record is found, parse it's value and calculate number of requests users has made within the last window
      let data = JSON.parse(record);
      let windowStartTimestamp = moment()
        .subtract(WINDOW_SIZE_IN_MINUTES, "minutes")
        .unix();
      var requestsWithinWindow = data.filter((entry) => {
        return entry.requestTimeStamp > windowStartTimestamp;
      });
      var i;
      for (i = 0; i < requestsWithinWindow.length; i++) {
        if (requestsWithinWindow[i].requestNumber == kvknr) {
          let requestLog = {
            requestNumber: kvknr,
            requestTimeStamp: currentRequestTime.unix(),
          };
          requestsWithinWindow[i] = requestLog;
          redis_rate_limit.set(req.ip, JSON.stringify(requestsWithinWindow));
          next();
          return;
        }
      }
      let totalWindowRequestsCount = requestsWithinWindow.length;
      // if number of requests made is greater than or equal to the desired maximum, return error
      if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
        res.status(429).json({
          error: `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_MINUTES} mns limit!`,
        });
      } else {
        let requestLog = {
          requestNumber: kvknr,
          requestTimeStamp: currentRequestTime.unix(),
        };
        requestsWithinWindow.push(requestLog);
        redis_rate_limit.set(req.ip, JSON.stringify(requestsWithinWindow));
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
