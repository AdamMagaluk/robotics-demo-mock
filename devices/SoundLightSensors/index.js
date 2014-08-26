var util = require('util');
var Scout = require('zetta').Scout;
var SoundSensor = require('./sound_sensor');
var LightSensor = require('./light_sensor');

var SoundLightSensors = module.exports = function(){
  this.udpServer = {};
  Scout.call(this);
}
util.inherits(SoundLightSensors, Scout);

SoundLightSensors.prototype.init = function(next){
  var self = this;
  var rinfo = { address: 'sound.light.local'};
  self.initDevice('light', LightSensor, rinfo);
  self.initDevice('sound', SoundSensor, rinfo);
  next();
};

SoundLightSensors.prototype.initDevice = function(type, Class, rinfo) {
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

