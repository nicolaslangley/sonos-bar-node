#!/bin/bash
zip -r ../${PWD##*/}.nw *
cp -r ../nw-0.8.6/node-webkit.app ../SonosBar.app
mv ../SonosBar.nw ../SonosBar.app/Contents/Resources/app.nw
cp ./app-assets/Info.plist ../SonosBar.app/Contents/Info.plist
cp ./app-assets/SonosBar.icns ../SonosBar.app/Contents/Resources/nw.icns
