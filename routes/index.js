import { Router } from "express";
import UrlControllerPermanent from "../controllers/UrlControllerPermanent";
import UrlControllerSession from "../controllers/urlControllerSession";

const routes = Router();
const session = new UrlControllerSession();

// Session only shorten URL endpoint (if route matches URL)
// https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
var urlRegex = /^\/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;
routes.get(urlRegex, (req, res) => {
  // Generate session only links
  res.send(session.shortenUrl(req));
});

// Unshorten session only endpoint (if route matches Nano ID format
// prefixed with '-' to avoid collision with permanent links)
// https://github.com/ai/nanoid
routes.get(RegExp("^/-[A-Za-z0-9_-]+$"), (req, res) => {
  // Decode session only links
  var url = session.unshortenUrl(req);
  if (url === undefined) {
    return res.status(404).send("Sorry, incorrect shortened URL entered!");
  }
  res.redirect(301, url);
});

// Permanent shorten URL endpoint (if route matches URL prefixed with /permanent/)
// https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
var urlRegex = /^\/permanent\/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;
routes.get(urlRegex, (req, res) => {
  // Generate permanent links
  res.send(UrlControllerPermanent.shortenUrl(req));
});

// Unshorten permanent endpoint (if route matches Hashids format)
// https://hashids.org
routes.get(RegExp("^/[A-Za-z0-9]+$"), (req, res) => {
  // Decode permanent links
  var url = UrlControllerPermanent.unshortenUrl(req);
  if (url === undefined) {
    return res.status(404).send("Sorry, incorrect shortened URL entered!");
  }
  res.redirect(301, url);
});

export default routes;
