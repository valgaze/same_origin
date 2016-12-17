## CORS

See companion blogpost here:


## Proxy server example

```sh
$ npm run proxy
```

Then in a browser access: http://localhost:3000/proxy/4

------

## JSONP example

```sh
$ npm run jsonp
```

Then in a browser access: http://localhost:3000/

------

## CORS example

You need to turn on two servers for this example:

### Turn on API server
```sh
$ npm run cors_server
```

### Turn on Frontend
```sh
$ npm run cors_frontend
```

Then in a browser access: http://localhost:3001/

------
