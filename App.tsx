import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, AppState, Platform, AsyncStorage } from "react-native";
import AppLoading from "expo-app-loading";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Text } from "@ui-kitten/components";
import mapping from "./mapping.json";
import { useFonts } from "expo-font";
import MainApp from "./src/app.component";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const App = () => {
  const [isLoadingComplete, setLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });


  useEffect(() => {
    registerForPushNotificationsAsync().then(token => { console.log("token") });
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState) => {
    if (nextAppState === "active") {
      console.log("App has come to the foreground!");
    }
    else {
      let notifications = await AsyncStorage.getItem('Notification')
      console.log("It hitted", notifications)
      if (notifications) {
        let notification = JSON.parse(notifications);
        if (notification) {
          schedulePushNotification('Push', notification);
        }
      }
    }
    console.log("AppState", nextAppState);
  };

  function _handleLoadingError(error: any) {
    // In this case, you might want to report the error to your error
    console.warn(error);
  }
  function _handleFinishLoading() {
    setLoading(true);
  }

  if (!fontsLoaded && !isLoadingComplete) {
    return (
      <>
      </>
      // <Loader />
      // <AppLoading
      //   onError={_handleLoadingError}
      //   onFinish={_handleFinishLoading}
      // />
    );
  } else if (fontsLoaded) {
    return <MainApp />;
  } else {
    return null;
  }
};



async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

async function schedulePushNotification(type = 'Push', todo = {}) {
  console.log("It hiteee")
  if (type == 'Cancel') {
    Notifications.cancelAllScheduledNotificationsAsync()
  }
  else {
    Notifications.cancelAllScheduledNotificationsAsync()
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'You have an incomplete blog.',
        body: todo.title,
        data: todo,
      },
      trigger: {
        seconds: 2,
        // seconds: 10800,
        repeats: true,
      },
    });
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
  },
});
