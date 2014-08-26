var util = require('util');
var Device = require('zetta').Device;

var LightSensor = module.exports = function(emitter, ip) {
  this.ipAddress = ip;
  this.luminosity = null;
  Device.call(this);
};
util.inherits(LightSensor, Device);

LightSensor.prototype.init = function(config) {
  var self = this;

  config
    .type('light')
    .name('Light Sensor')
    .state('on')
    .monitor('luminosity');

  setInterval(function(data){
    self.luminosity = Math.round(Math.random() * 5000);
  }, 150);
};
