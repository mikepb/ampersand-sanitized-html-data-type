# Sanitized HTML data type for Ampersand

This module implements an isomorphic sanitized HTML data type for
[Ampersand.js][]. On the server, [Google's Gumbo HTML parser][gumbo] is used
to parse and sanitize the HTML data. In the browser, the sanitized value is
used when rendering user-generated content.

In a typical use case, a user submits HTML to the server. The server then
parses and sanitizes the HTML to return to the client. The client
implementation then renders the sanitized HTML. To avoid XSS attacks, even from the same user that generated the HTML content, care must be taken to
only trust server-sanitized HTML.

The security of the data type is dependent on the underlying libraries used
to parse and sanitize the HTML:

- [Gumbo][gumbo] for parsing HTML
- [Gumbo Parser][gumbo-parser] for using Gumbo in node & iojs
- [Gumbo Sanitize][gumbo-sanitize] for generating sanitized HTML

Security reviews and code contributions are welcome.

## Install

```sh
npm install --save ampersand-sanitized-html-data-type
```

## Usage

```js
var Model = require("ampersand-model");
var htmlMixin = require("ampersand-sanitized-html-data-type");

module.exports = Model.extend(htmlMixin, {
  props: {
    body: "html"
  }
});
```

Alternatively, you may also define the data type under a different name:

```js
var Model = require("ampersand-model");
var htmlMixin = require("ampersand-sanitized-html-data-type");

module.exports = Model.extend(htmlMixin, {
  dataTypes: {
    sanitizedHtml: htmlMixin.dataTypes.html
  },
  props: {
    body: "sanitizedHtml"
  }
});
```

To use different options for Gumbo Sanitize, pass the appropriate string. The
supported values are `"STRICT"`, `"BASIC"`, and `"RELAXED"`:

```js
var Model = require("ampersand-model");
var htmlMixin = require("ampersand-sanitized-html-data-type")("RELAXED");
```

To provide custom options to Gumbo Sanitize, you may pass an object:

```js
var Model = require("ampersand-model");
var htmlMixin = require("ampersand-sanitized-html-data-type")({
  secret: "xyzzy",
  elements: ["i"]
});
```

The configuration object is deterministically serialized and its SHA-1 hash
is used as the SHA-1 HMAC key for signing the raw HTML. The cryptographic
signature allows us to cache the sanitized HTML in the database while still
allowing updates to the sanitization options to re-sanitize the raw HTML on
read. The `secret` option "salts" the cryptographic signature to thward
scenarios in which the attacker has compromised the application database.
Configuration options are ignored on the client.


## License

MIT

[Ampersand.js]: http://ampersandjs.com
[gumbo]: https://github.com/google/gumbo-parser
[gumbo-parser]: https://github.com/karlwestin/node-gumbo-parser
[gumbo-sanitize]: https://github.com/mikepb/node-gumbo-sanitize
