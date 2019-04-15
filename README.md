# UrlShortener
Truecaller code challenge submission. Supports both permanently usable links (although not a lot shorter than the original link) and session only links that resets when the server is restarted.

`npm start` to start server. 

Go to localhost:8000/{url} to get a shortened URL that resets on server restart.

Go to localhost:8000/permanent/{url} to get a (longer) shortened URL that persists on server restart.

`npm test` to run mocha / chai unit test.

API: https://testreen.github.io/UrlShortener/
