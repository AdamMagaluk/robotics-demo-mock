var zetta = require('zetta');

var EnvSensors = require('./devices/EnvSensors');
var SoundLightSensors = require('./devices/SoundLightSensors');
var LinuxCommands = require('./devices/LinuxCommands');
var RobotArm = require('./devices/RobotArm');
var DisplayScreen = require('./devices/DisplayScreen');
var PhoneAccelerometer = require('./devices/PhoneAccelerometer/phone_accelerometer');

var ButtonPressApp = require('./apps/button_press');
var HueArmBlink = require('./apps/hue_arm_blink');
var ScreenUpdateApp = require('./apps/screen_update');

var PORT = process.env.PORT || 3000;

zetta()
  .expose('*')
//  .use(Hue)
  .use(EnvSensors)
  .use(SoundLightSensors)
  .use(LinuxCommands)
  .use(RobotArm)
  .use(DisplayScreen)
  .use(PhoneAccelerometer, { http_device: true })
  .load(ButtonPressApp)
  .load(HueArmBlink)
  .load(ScreenUpdateApp)
  .link(process.env.ZETTA_CLOUD || 'http://adams-test.herokuapp.com')
  .listen(PORT, function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('Listening on port', PORT);
  });
