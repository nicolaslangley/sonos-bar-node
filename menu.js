"use strict";
// Load native UI library
var gui = require('nw.gui');
var sonos = require('sonos');

// Un-comment for debugging
//gui.Window.get().showDevTools();


var win = gui.Window.get();
//win.setShowInTaskbar(false);

// Create a tray icon
var tray = new gui.Tray({ icon: 'img/sonos-icon-round@2x.png' });

// Connect to Sonos - TODO: change this to search for available devices
var sonosController = new sonos.Sonos('192.168.0.19');
console.log(sonosController);

// Create menuitems
var playMenuItem = new gui.MenuItem({
  type: 'normal',
  label: 'Play',
  click: function () {
    console.log("Play");
    sonosController.play("", function (err, playing) {
      if (err) {
        console.log(err);
      }
      console.log(playing);
    });
    console.log("Finished playing");
  } 
});
var pauseMenuItem = new gui.MenuItem({
  type: 'normal',
  label: 'Pause',
  click: function () {
    console.log("Pause");
    sonosController.pause(function (err, paused) {
      if (err) {
        console.log(err);
      }
      console.log(paused);
    });
  } 
});
var nextMenuItem = new gui.MenuItem({
  type: 'normal',
  label: 'Next',
  click: function () {
    console.log("Next");
    sonosController.next(function (err, movedToNext) {
      if (err) {
        console.log(err);
      }
      console.log(movedToNext);
    });
  } 
});
var prevMenuItem = new gui.MenuItem({
  type: 'normal',
  label: 'Previous',
  click: function () {
    console.log("Previou");
    sonosController.next(function (err, movedToPrevious) {
      if (err) {
        console.log(err);
      }
      console.log(movedToPrevious);
    });
  } 
}); 
var enableAirplayMenuItem = new gui.MenuItem({ 
  type: 'normal', 
  label: 'Enable AirSonos',
  click: function () {
    console.log("Enable AirSonos");
    var airSonos = require('airsonos');
  }
});
var quitMenuItem = new gui.MenuItem({ 
  type: 'normal', 
  label: 'Quit',
  click: function () {
    console.log("Quit");
    gui.App.quit(); 
  }
});

// Create menu and append menuitems
var menu = new gui.Menu();
menu.append(playMenuItem);
menu.append(pauseMenuItem);
menu.append(nextMenuItem);
menu.append(prevMenuItem);
menu.append(enableAirplayMenuItem);
menu.append(quitMenuItem);
tray.menu = menu;