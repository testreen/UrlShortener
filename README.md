# UrlShortener
Truecaller code challenge submission. Supports both permanently usable links (length proportional to original URL) and session only links (fixed 9 character length) that resets when the server is restarted.

`npm install` or `yarn install` to install dependencies. 

`npm start` to start server. 

Go to localhost:8000/{url} to get a shortened URL that resets on server restart.

Go to localhost:8000/permanent/{url} to get a (longer) shortened URL that persists on server restart.

`npm test` to run mocha / chai unit test.
