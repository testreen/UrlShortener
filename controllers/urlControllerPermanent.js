import Hashids from "hashids";
import { toNumbers, fromNumbers } from "../util/util";
import "babel-polyfill";

var hashids = new Hashids("this is my salt");

/** Class used to handle incoming requests.
    Results are permanent and can be reused after restarting server. */
class UrlControllerPermanent {
  /**
   * Converts incoming long URL to shortened URL using hashids
   * @param  {Object} req Request information
   * @param  {Object} res Response object
   * @return {String}     Shortened URL
   */
  static shortenUrl(req) {
    var longUrl = req.url.slice(11).toLowerCase(); // Remove initial '/permanent' and make lowercase
    longUrl = longUrl.replace(/^http(s?):\/\//i, ""); // Remove 'http(s)://'
    return req.headers.host + "/" + hashids.encode(toNumbers(longUrl)); // Return valid URL
  }

  /**
   * Converts incoming shortened URL back to original URL using hashids
   * @param  {Object} req Request information
   * @param  {Object} res Response object
   * @return {String}     Original URL
   */
  static unshortenUrl(req) {
    var shortUrl = req.url.slice(1); // Remove initial '/'
    var longUrl = fromNumbers(hashids.decode(shortUrl)); // Decode

    // Check if decoded result is valid URL
    var urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;
    if (!urlRegex.test(longUrl)) {
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

export default UrlControllerPermanent;
