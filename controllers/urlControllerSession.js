import nanoid from "nanoid";
import { toNumbers, fromNumbers } from "../util/util";
import "babel-polyfill";
var _ = require("lodash");

/** Class used to handle incoming requests and save shorter links in memory,
    resets after closing server  */
class UrlControllerSession {
  constructor() {
    this.memory = {}; // Save original URL as key and Nano ID as value
  }

  /**
   * Converts incoming long URL to shortened URL using Nano ID, saved in memory.
   * @param  {Object} req Request information
   * @param  {Object} res Response object
   * @return {String}     Shortened URL
   */
  shortenUrl(req) {
    var longUrl = req.url.slice(1).toLowerCase(); // Remove initial '/' and make lowercase
    longUrl = longUrl.replace(/^http(s?):\/\//i, ""); // Remove 'http(s)://'

    // Find if URL already exists in memory, otherwise add it
    var id = this.memory[longUrl];
    if (id === undefined) {
      id = nanoid(8);
      this.memory[longUrl] = id;
    }

    return req.headers.host + "/-" + id; // return valid URL
  }

  /**
   * Converts incoming shortened URL to original URL from memory
   * @param  {Object} req Request information
   * @param  {Object} res Response object
   * @return {String}     Original URL
   */
  unshortenUrl(req) {
    var id = req.url.slice(2); // Remove initial '/-'

    // Retrieve URL from memory, else return undefined if not found
    var longUrl = _.findKey(this.memory, old => {
      return old === id;
    });
    if (longUrl === undefined) {
      return undefined;
    }

    // If original url lacks 'http(s)://' prefix, add it for redirect
    const checkHttp = /^(https?:\/\/|http?:\/\/)/;
    if (!checkHttp.test(longUrl)) {
      longUrl = "http://" + longUrl;
    }
    return longUrl;
  }
}

export default UrlControllerSession;
