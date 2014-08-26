var util = require('util');
var Device = require('zetta').Device;

var HumiditySensor = module.exports = function(emitter, ip) {
  this.ipAddress = ip;
  this.humidity = null;
  this._humidityEmitter = emitter;
  Device.call(this);
};
util.inherits(HumiditySensor, Device);

HumiditySensor.prototype.init = function(config) {
  var self = this;

  config
    .type('humidity')
    .name('Humidity Sensor')
    .state('on')
    .monitor('humidity');

  setInterval(function(){
    self.humidity = Math.round(Math.random() * 500);
  }, 100);
};
