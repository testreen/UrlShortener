import { Router } from 'express';
import UrlController from '../controllers/urlController';

const routes = Router();

// Shorten endpoint (if route matches URL)
// https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
var urlRegex = /^\/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;
routes.get(urlRegex, UrlController.shortenUrl);

// Unshorten endpoint (if route matches Hashids format)
// https://github.com/ai/nanoid
routes.get(RegExp('^\/[A-Za-z0-9]+$'), UrlController.unshortenUrl);

export default routes;
