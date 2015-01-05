"use strict";
// Load native UI library
var gui = require('nw.gui');
var sonos = require('sonos');

// Un-comment for debugging
//gui.Window.get().showDevTools();


var win = gui.Window.get();
// This function is only available in Node-Webkit > 0.9.0 - we are using 0.8.6
win.setShowInTaskbar(false);

// Create a tray icon
var tray = new gui.Tray({ icon: 'img/sonos-icon-round@2x.png' });

// Connect to Sonos - TODO: change this to search for available devices
var sonosController = new sonos.Sonos('192.168.0.19');
console.log(sonosController);

// Create menuitems
var nowPlayingMenuItem = new gui.MenuItem({
  type: 'normal',
  label: 'Now Playing'
});
var playMenuItem = new gui.MenuItem({
  type: 'normal',
  label: 'Play',
  click: function () {
    console.log("Play");
    sonosController.play("", function (err, playing) {
      if (err) {
        console.error(err);
      }
      console.log(playing);
      updateNowPlaying();
    });
  } 
});
var pauseMenuItem = new gui.MenuItem({
  type: 'normal',
  label: 'Pause',
  click: function () {
    console.log("Pause");
    sonosController.pause(function (err, paused) {
      if (err) {
        console.error(err);
      }
      console.log(paused);
      updateNowPlaying();
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
        console.error(err);
      }
      console.log(movedToNext);
      updateNowPlaying();
    });
  } 
});
var prevMenuItem = new gui.MenuItem({
  type: 'normal',
  label: 'Previous',
  click: function () {
    console.log("Previous");
    sonosController.next(function (err, movedToPrevious) {
      if (err) {
        console.log(err);
      }
      console.log(movedToPrevious);
      updateNowPlaying();
    });
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
menu.append(nowPlayingMenuItem);
menu.append(playMenuItem);
menu.append(pauseMenuItem);
menu.append(nextMenuItem);
menu.append(prevMenuItem);
// Temporarilily disabled - have to decide if it is necessary
//menu.append(enableAirplayMenuItem);
menu.append(quitMenuItem);
tray.menu = menu;

// Check currently playing track and update nowPlayingMenuItem
// TODO: there needs to be a better way to get the current track - i.e. a listener
function updateNowPlaying () {
  sonosController.currentTrack(function (err, track) {
    if (err) {
      nowPlayingMenuItem.label = "";
      console.error("Failed to get current track");
    }
    // TODO: this is not a robust check..
    if (track['title'] != "listen") {
      nowPlayingMenuItem.label = track['title'] + " - " + track['artist'];
      console.log("Currently Playing: " + track['title']);
    } else if (airSonosEnabled && track['position'] > 0) {
      nowPlayingMenuItem.label = "AirSonos Enabled";
    } else {
      nowPlayingMenuItem.label = "Nothing Playing";  
    }
  });
}

// Update the now playing view on an interval of every 3 seconds
setInterval(updateNowPlaying, 3000);

