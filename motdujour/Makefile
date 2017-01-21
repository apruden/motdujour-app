keystore:
	keytool -genkey -v -keystore motdujour-key.keystore -alias motdujour -keyalg RSA -keysize 2048 -validity 10000

release:
	cordova build --release android
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /home/alex/motdujour-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk motdujour
	/usr/local/share/android/sdk/build-tools/23.0.3/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk motdujour.apk

screenshots:
	convert -resize 512X512  resources/android/icon/drawable-xxxhdpi-icon.png hires-icon.png
	convert resources/android/icon/drawable-xxxhdpi-icon.png -resize '1024x500^' -gravity center -crop '1024x500+0+0' feature-splash.png
