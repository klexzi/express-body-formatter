/**
 *
 * @param {array} excludes
 * @param {string} key
 */

/**
 *
 * @private
 */
const _checkExclusion = (excludes, key) => {
  let _a = excludes.find(exclude => {
    return key === exclude;
  });
  if (_a) return true;
  else return false;
};

/**
 *
 * @public
 */

/**
 *
 * @param {object} options
 */
const expressBodyFormatter = (options = {}) => (req, res, next) => {
  /**
   * set default options
   */
  console.log("options", options);
  options.trim = options.trim !== undefined ? options.trim : true;
  options.toLowerCase =
    options.toLowerCase !== undefined ? options.toLowerCase : true;
  options.exclude = options.exclude ? options.exclude : [];
  console.log("options", options);

  if (!req.body) {
    return next();
  }
  Object.keys(req.body).map((key, index) => {
    // if (
    //   typeof req.body[key] === "string" &&
    //   key !== "password" &&
    //   key !== "newPassword" &&
    //   key !== "oldPassword" &&
    //   key !== "paymentReference" &&
    //   key !== "access_token"
    // ) {
    //   req.body[key] = req.body[key].trim().toLowerCase();
    // }
    if (typeof req.body[key] === "string") {
      if (_checkExclusion(options.exclude, key)) return;
      if (options.trim) {
        req.body[key] = req.body[key].trim();
      }
      if (options.toLowerCase) {
        req.body[key] = req.body[key].toLowerCase();
      }
    }
  });
  return next();
};

module.exports = expressBodyFormatter;
