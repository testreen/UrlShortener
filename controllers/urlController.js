import Hashids from 'hashids';
import { toNumbers, fromNumbers } from '../util/util';
import 'babel-polyfill';

var hashids = new Hashids("this is my salt");

/** Class used to handle incoming requests. */
class UrlController {

  /**
   * Converts incoming long URL to shortened URL
   * @param  {Object} req Request information
   * @param  {Object} res Response object
   * @return {String}     Shortened URL
   */
  static async shortenUrl(req, res){
    var longUrl = req.url.slice(1).toLowerCase(); // Remove initial / and make lowercase
    longUrl = longUrl.replace(/^http(s?):\/\//i, ""); // Remove http(s)://
    var shortUrl = hashids.encode(toNumbers(longUrl));
    return res.send(shortUrl);
  }

  /**
   * Converts incoming shortened URL to original URL
   * @param  {Object} req Request information
   * @param  {Object} res Response object
   * @return {String}     Redirect to original URL
   */
  static unshortenUrl(req, res){
    var shortUrl = req.url.slice(1);  // Remove initial /
    var longUrl = fromNumbers(hashids.decode(shortUrl));  // Decode

    // If original url lacks http(s):// prefix, add it for redirect
    const checkHttp = /^(https?:\/\/|http?:\/\/)/;
    if(!checkHttp.test(longUrl)){
      longUrl = 'https://' + longUrl;
    };
    return res.redirect(longUrl);
  }
}

export default UrlController;
