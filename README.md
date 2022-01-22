# React Native iOS and Android mobile app

Mobile app POC built with Typescript and React Native.

<p align="center">
<img src="https://github.com/jorgelandazuri/bank-mobile-app/blob/master/image/demo_app.gif" width="100%" height="100%"/>
<br/>
<p align="right" width="90%">
<a href="https://youtu.be/QQkzNsAuGzQ">Video demo here</a>
</p>

## Main features
- Make transfers with field and available balance validation.
- List transactions.
- Show balance and total money sent.
- Uses a mock json server
- Created a 'client-core' library (/lib folder) that contains main domain/business/presentation logic code. Which could be reused by other JS/TS clients (e.g. React web client)

## Tech stack
- Typescript v2.8.3
- React Native v0.55.2
- Expo v27.0.1
- Node v8.9.1
- ts-jest v22.4.6 for unit testing.
- Data mocked and stored with json-server.

## Instructions to try it out
- Open the device simulators you want to test on, 1 Android and 1 IOS device.
- Given you have node/npm installed, cd to 'app' folder, then you can run 'npm run set_app_env' to download/install dependencies
- Start the json server with 'npm run start_app_db'.
- Start the Expo React Native app server with 'npm run start_app'
- For Android run 'npm run android' and 'npm run ios' for iOS.
- In case you want to run the jest test, use 'npm run test'.
