require('shelljs/global');

exec('zip -r ../SonosBar.nw *');
// Copy the node-webkit app for the target platform
cp('-r', '../nw-0.11.5/node-webkit.app', '../SonosBar.app');
// Copy the SonosBar zip file into the app resources
mv('../SonosBar.nw', '../SonosBar.app/Contents/Resources/app.nw');
// Copy the icon and plist file for the SonosBar app
cp('./app-assets/Info.plist', '../SonosBar.app/Contents/Info.plist');
cp('./app-assets/SonosBar.icns', '../SonosBar.app/Contents/Resources/nw.icns');
