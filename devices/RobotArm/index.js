var util = require('util');
var AutoScout = require('zetta-auto-scout');
var RobotArm = require('./robot_arm');

module.exports = new AutoScout('arm', RobotArm, 'robotarm.local');
