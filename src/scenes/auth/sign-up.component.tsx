import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { EdgeInsets, useSafeArea, SafeAreaView } from 'react-native-safe-area-context';
import { Formik, FormikProps } from 'formik';
import { Button, Layout, LayoutElement } from '@ui-kitten/components';
import { SignUpScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { Toolbar } from '../../components/toolbar.component';
import { FormInput } from '../../components/form-input.component';
import { SignUpData, SignUpSchema } from '../../data/sign-up.model';
import firebase from 'firebase/app';
import 'firebase/auth';
import Loader from '../../animation/Loader'

export const SignUpScreen = (props: SignUpScreenProps): LayoutElement => {
  const [loader, setLoader] = React.useState<boolean>(false);

  const insets: EdgeInsets = useSafeArea();

  const onFormSubmit = (values: SignUpData): void => {
    console.log("values", values)
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      .then(response => {
        console.log("createUserWithEmailAndPassword", response)
        navigateHome();
        setLoader(false)
      })
      .catch(error => {
        console.log("error", error)
        if (error) {
          if (error.code == 'auth/email-already-in-use') {
            alert('You already have account with this email id.')
          }
          else if (error.code == 'auth/invalid-email') {
            alert(error.message)
          }
        }
        setLoader(false)
      })
  };

  const navigateHome = (): void => {
    props.navigation.navigate(AppRoute.HOME);
  };

  const navigateSignIn = (): void => {
    props.navigation.navigate(AppRoute.SIGN_IN);
  };

  const renderForm = (props: FormikProps<SignUpData>): React.ReactFragment => (
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
      />
      <FormInput
        id='username'
        style={styles.formControl}
        placeholder='Username'
      />
      <Button
        style={styles.submitButton}
        onPress={props.handleSubmit}>
        SIGN UP
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
            style={[styles.appBar, { paddingTop: insets.top }]}
            source={require('../../assets/image-background.jpeg')}>
            <Toolbar
              appearance='control'
              onBackPress={props.navigation.goBack}
            />
          </ImageBackground>
          <Layout style={styles.formContainer}>
            <Formik
              initialValues={SignUpData.empty()}
              validationSchema={SignUpSchema}
              onSubmit={onFormSubmit}>
              {renderForm}
            </Formik>
            <Button
              style={styles.haveAccountButton}
              appearance='ghost'
              status='basic'
              onPress={navigateSignIn}>
              Already have an account?
        </Button>
          </Layout>
        </>
      }
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  SafeAreaStyle: {
    flex: 1
  },
  appBar: {
    height: 192,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  formControl: {
    marginVertical: 4,
  },
  submitButton: {
    marginVertical: 24,
  },
  haveAccountButton: {
    alignSelf: 'center',
  },
});
