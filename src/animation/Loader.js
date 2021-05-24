import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.animation.play();
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  }

  render() {
    return (
      <SafeAreaView style={styles.animationContainer} >
        <LottieView
          ref={
            animation => {
              this.animation = animation;
            }
          }
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: '#FFF',
          }
          }
          autoPlay
          source={require('../data/ball.json')}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
