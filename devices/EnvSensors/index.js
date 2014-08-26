var util = require('util');
var Scout = require('zetta').Scout;

var HumiditySensor = require('./humidity_sensor');
var TemperatureSensor = require('./temperature_sensor');
var Barometer = require('./barometer');

var EnvSensors = module.exports = function(){
  this.udpServer = {};
  Scout.call(this);
}
util.inherits(EnvSensors, Scout);

EnvSensors.prototype.init = function(next){
  var self = this;
  var rinfo = { address: 'fake.address.local'};
  self.initDevice('humidity', HumiditySensor, rinfo);
  self.initDevice('temperature', TemperatureSensor, rinfo);
  self.initDevice('barometer', Barometer, rinfo);  
  next();
};

EnvSensors.prototype.initDevice = function(type, Class, rinfo) {
  var self = this;
  var query = self.server.where({ type: type });
  self.server.find(query, function(err, results) {
    if(err) {
      return;
    }
    if (results.length) {
      self.provision(results[0], Class, self.udpServer, rinfo.address);
    } else {
      self.discover(Class, self.udpServer, rinfo.address);
    }
  });
};

