const config = require('config')
const Koop = require('koop')
const koop = new Koop(config)
const routes = require('./routes')
const plugins = require('./plugins')
const FeatureServer = require('koop-output-geoservices')
koop.register(FeatureServer)
//koop.register(Provider)

// initiate a koop app


// register koop plugins
plugins.forEach((plugin) => {
  koop.register(plugin.instance, plugin.options)
})

// add additional routes
routes.forEach((route) => {
  route.methods.forEach((method) => {
    koop.server[method](route.path, route.handler)
  })
})




//Normalize a port into a number, string, or false.
 
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// start the server
var port = normalizePort(process.env.PORT || config.port);
koop.server.listen(port, () => koop.log.info(`Koop server listening at ${port}`))
