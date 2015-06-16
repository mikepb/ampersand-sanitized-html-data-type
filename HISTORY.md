0.2.2 / 2015-06-16
==================

  * Changed: Sort object keys when serializing options to digest. Previously
    cached sanitized HTML will be invalidated, but future accesses with the
    same options should resolve to the cache more consistently.


0.2.1 / 2015-06-14
==================

  * Added: Keywords in `package.json`.


0.2.0 / 2015-06-14
==================

  * Changed: Use cryptographic signature on sanitization options to prevent
    some attack scenarios.


0.1.1 / 2015-06-07
==================

  * Added: Accept custom tags


0.1.0 / 2015-06-07
==================

  * Added: Support custom options


0.0.4 / 2015-06-07
==================

  * Fixed: Return correct value when setting correctly tagged value.


0.0.3 / 2015-06-06
==================

  * Fixed: Use ES5 instead of ES6


0.0.2 / 2015-06-06
==================

  * Fixed: don't croak on comparing undefined


0.0.1 / 2015-06-06
==================

  * Initial release.
