# Post

This project has the purpose to show a basic structure for a common React Native Application. It applies good practices as well as Unit test using Jest. It also makes use of React Hooks and the new version of React Navigation (v5).  
For persistency, Context API is being used over Redux, since it does not need any third party libraries and also makes it much simpler when using simple stores.

## Getting Started

### Prerequisites

- **Android**

  **Windows**, **Mac** and **Linux** platforms are supported. The [Android SDK](https://es.wikipedia.org/wiki/Android_SDK) is required to build and debug the app, other tools can be downloaded using the **Android SDK Manager**.

- **iOS**

  Xcode and CocoaPods

### Installation

To run the app locally, the following tools are required:

- [NodeJS LTS version (Recommended)](https://nodejs.org/) - To download the dependencies of the app via [npm](http://npmjs.com/).Make sure it is Node 8.3 or newer.
- [Java SE Development Kit 11](https://openjdk.java.net/projects/jdk/11/) - Required by the Android tools.
- [Android SDK](https://developer.android.com/studio/) - You can download the Android Studio, but only the sdk tools are required. However, if you don't have one, you can select the AVS tools in the installation process to install an android emulator.
- Xcode
  ]

#### Running the App

Once you have cloned the project, go to the `app` folder and then `npm install` to install all the dependencies

After, you can start the app in iOS by entering `npm run ios`. To run with Android you must have a connected device or emualtor opened, then enter `npm run android`
Runs your app in development mode.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

## Running the tests

This project is set up to use [jest](https://github.com/facebook/jest) for tests. Create test file besides your component like this: `MyComponent.spec.+(ts|tsx)` in order to be detected by the testing tools.

The tests can be executed by running:

```
npm test
```

### Dependencies

- [Native Base UI Kit](https://github.com/GeekyAnts/NativeBase) which is well supported and also let's the user to customize as much as possible some of the basic RN components
- [React Navigation](https://github.com/react-navigation/react-navigation) Easy to use and also highly customizable.
