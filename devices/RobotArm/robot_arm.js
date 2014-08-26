var util = require('util');
var Device = require('zetta').Device;

var RobotArm = module.exports = function(ip) {
  this.ip = ip;
  Device.call(this);
};
util.inherits(RobotArm, Device);

RobotArm.prototype.init = function(config) {
  config
    .type('arm')
    .name('Robot Arm')
    .state('standby')
    .when('standby', { allow: ['move-claw', 'move-elbow', 'move-shoulder', 'pivot'] })
    .when('moving-claw', { allow: ['standby', 'move-claw', 'move-elbow', 'move-shoulder', 'pivot'] })
    .when('moving-elbow', { allow: ['standby', 'move-claw', 'move-elbow', 'move-shoulder', 'pivot'] })
    .when('pivoting', { allow: ['standby', 'move-claw', 'move-elbow', 'move-shoulder', 'pivot'] })
    .when('moving-shoulder', { allow: ['standby', 'move-claw', 'move-elbow', 'move-shoulder', 'pivot']})
    .map('standby', this.standby)
    .map('move-claw', this.moveClaw, [ { name: 'direction', type: 'radio', value: [ { value: 'open' }, { value: 'close' } ] } ])
    .map('move-elbow', this.moveElbow, [ { name: 'direction', type: 'radio', value: [ { value: 'up' }, { value: 'down' } ]  } ])
    .map('move-shoulder', this.moveShoulder, [ { name: 'direction', type: 'radio', value: [ { value: 'up' }, { value: 'down' } ]  } ])
    .map('pivot', this.pivot, [ { name: 'direction', type: 'radio', value: [ { value: 'left' }, { value: 'right' } ]  } ]);
};

RobotArm.prototype.standby = function(cb) {
  this.state = 'standby';
  if(cb) {
    cb();
  }
};

RobotArm.prototype.moveClaw = function(direction, cb) {
  this.state = 'moving-claw';
  var self = this;
  setImmediate(function() {
    self.call('standby', function(){});
    cb();
  });
};

RobotArm.prototype.moveElbow = function(direction, cb) {
  this.state = 'moving-elbow';
  var self = this;
  setImmediate(function() {
    self.call('standby', function(){});
    cb();
  });
};

RobotArm.prototype.moveShoulder = function(direction, cb) {
  this.state = 'moving-shoulder';
  var self = this;
  setImmediate(function() {
    self.call('standby', function(){});
    cb();
  });
};

RobotArm.prototype.pivot = function(direction, cb) {
  this.state = 'pivoting';
  var self = this;
  setImmediate(function() {
    self.call('standby', function(){});
    cb();
  });
};

