import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, CheckBox, Layout } from '@ui-kitten/components';
import { Formik, FormikProps } from 'formik';
import { Linking } from 'expo'
import { SignInScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { FormInput } from '../../components/form-input.component';
import { EyeIcon, EyeOffIcon } from '../../assets/icons';
import { SignInData, SignInSchema } from '../../data/sign-in.model';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import 'firebase/auth';
import { StackActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../../animation/Loader'
const firebaseConfig = {
  apiKey: "AIzaSyDYmt1PL4Rm1mg9x3JEGtSHOJlTD-aYfjA",
  authDomain: "freelancetest-7c75e.firebaseapp.com",
  projectId: "freelancetest-7c75e",
  storageBucket: "freelancetest-7c75e.appspot.com",
  messagingSenderId: "921443776193",
  appId: "1:921443776193:web:bf35fddc8546bdfa990640",
  measurementId: "G-71B0SG2V7R"
};
export const SignInScreen = (props: SignInScreenProps) => {
  const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState<boolean>(true);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('User is signed in')
        navigateHome();
        setTimeout(() => {
          setLoader(false)
        }, 1000);
      } else {
        console.log('No user is signed in.')
        setLoader(false)
      }
    });
    return () => {
    };
  }, []);

  const onFormSubmit = (values: SignInData): void => {
    setLoader(true)
    firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      .then(response => {
        console.log("signInWithEmailAndPassword", response)
        navigateHome();
        setLoader(false)
      })
      .catch(error => {
        console.log("error", error)
        if (error) {
          alert(error.message)
        }
        setLoader(false)
      })
  };

  const navigateHome = (): void => {
    props.navigation.dispatch(
      StackActions.replace(AppRoute.HOME)
    );
    // props.navigation.navigate(AppRoute.HOME);
  };

  const navigateSignUp = (): void => {
    props.navigation.navigate(AppRoute.SIGN_UP);
  };

  const navigateResetPassword = (): void => {
    props.navigation.navigate(AppRoute.RESET_PASSWORD);
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props): React.ReactElement => {
    const IconComponent = passwordVisible ? EyeIcon : EyeOffIcon;
    return (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <IconComponent {...props} />
      </TouchableWithoutFeedback>
    );
  };

  const renderForm = (props: FormikProps<SignInData>): React.ReactFragment => (
    <React.Fragment>
      <FormInput
        id='email'
        style={styles.formControl}
        placeholder='Email'
        keyboardType='email-address'
      />
      <FormInput
        id='password'
        style={styles.formControl}
        placeholder='Password'
        secureTextEntry={!passwordVisible}
        accessoryRight={renderPasswordIcon}
      />
      <View style={styles.resetPasswordContainer}>
        <CheckBox
          style={styles.formControl}
          checked={shouldRemember}
          onChange={setShouldRemember}>
          Remember Me
        </CheckBox>
        <Button
          appearance='ghost'
          status='basic'
          onPress={navigateResetPassword}>
          Forgot password?
        </Button>
      </View>
      <Button
        style={styles.submitButton}
        onPress={props.handleSubmit}>
        SIGN IN
      </Button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {loader ?
        <SafeAreaView style={styles.SafeAreaStyle}>
          <Loader />
        </SafeAreaView>
        :
        <>
          <ImageBackground
            style={styles.appBar}
            source={require('../../assets/image-background.jpeg')}
          />
          <Layout style={styles.formContainer}>
            <Formik
              initialValues={SignInData.empty()}
              validationSchema={SignInSchema}
              onSubmit={onFormSubmit}>
              {renderForm}
            </Formik>
            <Button
              style={styles.noAccountButton}
              appearance='ghost'
              status='basic'
              onPress={navigateSignUp}>
              Don't have an account?
        </Button>
          </Layout>
        </>
      }
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 192,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  resetPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formControl: {
    marginVertical: 4,
  },
  submitButton: {
    marginVertical: 24,
  },
  noAccountButton: {
    alignSelf: 'center',
  },
  SafeAreaStyle: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});




















// import React, { useState } from 'react';
// import { ImageBackground, StyleSheet, View } from 'react-native';
// import { Linking } from 'expo';
// import { Button, CheckBox, Layout } from '@ui-kitten/components';
// import { Formik, FormikProps } from 'formik';
// import { SignInScreenProps } from '../../navigation/auth.navigator';
// import { AppRoute } from '../../navigation/app-routes';
// import { FormInput } from '../../components/form-input.component';
// import { EyeIcon, EyeOffIcon } from '../../assets/icons';
// import { SignInData, SignInSchema } from '../../data/sign-in.model';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import firebase from 'expo-firebase-app';

// export const SignInScreen = (props: SignInScreenProps) => {
//   const expoLink = Linking.makeUrl('your/expo/link');

//   const FIREBASE_LINK_PROXY = 'https://wt-6e2a5f000b93f69e1b65cf98021e1945-0.sandbox.auth0-extend.com/firebase-authentication-link-redirect';
//   const proxyUrl = `${FIREBASE_LINK_PROXY}?redirectUrl=${encodeURIComponent(expoLink)}`;

//   const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
//   const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
//   const [values, setValues] = React.useState<boolean>();

//   const onFormSubmit = (values: SignInData): void => {
//     navigateHome();
//   };

//   const onChange = (event) => {
//     console.log(event)
//     setValues('hi');
//   };

//   const navigateHome = (): void => {
//     props.navigation.navigate(AppRoute.HOME);
//   };

//   const navigateSignUp = (): void => {
//     props.navigation.navigate(AppRoute.SIGN_UP);
//   };

//   const navigateResetPassword = (): void => {
//     props.navigation.navigate(AppRoute.RESET_PASSWORD);
//   };

//   const onPasswordIconPress = (): void => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const renderPasswordIcon = (props): React.ReactElement => {
//     const IconComponent = passwordVisible ? EyeIcon : EyeOffIcon;
//     return (
//       <TouchableWithoutFeedback onPress={onPasswordIconPress}>
//         <IconComponent {...props} />
//       </TouchableWithoutFeedback>
//     );
//   };

//   const CallSignupFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const email = values
//     alert(JSON.stringify(email))
//     // firebase.auth().sendSignInLinkToEmail(email, {
//     //   handleCodeInApp: true,
//     //   url: proxyUrl
//     // })
//     //   .then(/* ... */)
//     //   .catch(/* ... */)
//   };
//   const renderForm = (props: FormikProps<SignInData>): React.ReactFragment => (
//     <React.Fragment>
//       <FormInput
//         id='email'
//         style={styles.formControl}
//         placeholder='Email'
//         keyboardType='email-address'
//         onChange={(text) => console.log(text.target)}
//       />
//       <FormInput
//         id='password'
//         style={styles.formControl}
//         placeholder='Password'
//         secureTextEntry={!passwordVisible}
//         accessoryRight={renderPasswordIcon}
//       />
//       <View style={styles.resetPasswordContainer}>
//         <CheckBox
//           style={styles.formControl}
//           checked={shouldRemember}
//           onChange={setShouldRemember}>
//           Remember Me
//         </CheckBox>
//         <Button
//           appearance='ghost'
//           status='basic'
//           onPress={navigateResetPassword}>
//           Forgot password?
//         </Button>
//       </View>
//       <Button
//         style={styles.submitButton}
//         onPress={props.handleSubmit}
//       // onPress={CallSignupFunction}
//       >
//         SIGN IN
//       </Button>
//     </React.Fragment>
//   );

//   return (
//     <React.Fragment>
//       <ImageBackground
//         style={styles.appBar}
//         source={require('../../assets/image-background.jpeg')}
//       />
//       <Layout style={styles.formContainer}>
//         <Formik
//           initialValues={SignInData.empty()}
//           validationSchema={SignInSchema}
//           onSubmit={onFormSubmit}>
//           {renderForm}
//         </Formik>
//         <Button
//           style={styles.noAccountButton}
//           appearance='ghost'
//           status='basic'
//           onPress={navigateSignUp}>
//           Don't have an account?
//         </Button>
//       </Layout>
//     </React.Fragment>
//   );
// };

// const styles = StyleSheet.create({
//   appBar: {
//     height: 192,
//   },
//   formContainer: {
//     flex: 1,
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//   },
//   resetPasswordContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   formControl: {
//     marginVertical: 4,
//   },
//   submitButton: {
//     marginVertical: 24,
//   },
//   noAccountButton: {
//     alignSelf: 'center',
//   },
// });
