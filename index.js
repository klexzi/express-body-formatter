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
 * @param {string} value
 */
const _capitalize = value => {
  let words = value.split(" ");
  words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(" ");
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
  options.trim = options.trim !== undefined ? options.trim : true;
  options.transform =
    options.transform !== undefined ? options.transform : "lowerCase";
  options.exclude = options.exclude ? options.exclude : [];

  if (!req.body) {
    return next();
  }
  Object.keys(req.body).map((key, index) => {
    if (typeof req.body[key] === "string") {
      if (_checkExclusion(options.exclude, key)) return;
      if (options.trim) {
        req.body[key] = req.body[key].trim();
      }

      /**
       * for
       */
      switch (options.transform) {
        case "upperCase":
          req.body[key] = req.body[key].toUpperCase();
          break;
        case "lowerCase":
          req.body[key] = req.body[key].toLowerCase();
          break;
        case "capitalize":
          req.body[key] = _capitalize(req.body[key]);
          break;
        default:
          break;
      }
    }
  });
  return next();
};

module.exports = expressBodyFormatter;
