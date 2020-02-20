import React, { Fragment } from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ColorCt from '../constants/color';
import { getUserAPI } from '../api/firebaseapi';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '../ui/errormessage';
import MainScreenTab from '../screens/mainscreen';

const loginScr = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .email('Enter a valid email')
      .required('Please enter a registered email'),
    password: Yup.string()
      .label('Password')
      .required()
      .min(4, 'Password must have more than 4 characters ')
  });

  const handleSubmit = values => {
    if (values.email.length > 0 && values.password.length > 0) {
      //alert(JSON.stringify(values));
      getUserAPI(values.email, values.password, callback => {
        if (callback.email == values.email) {
          alert(callback.email);
        } else {
          alert(callback);
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={(values, actions) => {
          handleSubmit(values); //function to handle Firebase authentication
          actions.setSubmitting(false); //reset the button
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          touched,
          handleBlur,
          isSubmitting
        }) => (
          <Fragment>
            <View style={styles.imagecontainer}>
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri:
                    'https://facebook.github.io/react-native/img/tiny_logo.png'
                }}
              />
            </View>
            <View style={styles.textcontainer}>
              <Input
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="Enter email"
                autoCapitalize="none"
                leftIcon={<Icon name="envelope" size={24} color="black" />}
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <Input
                name="password"
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Enter password"
                secureTextEntry
                leftIcon={<Icon name="unlock-alt" size={24} color="black" />}
                onBlur={handleBlur('password')}
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
            </View>

            <View style={styles.formikbuttonContainer}>
              <Button
                buttonStyle={{ backgroundColor: ColorCt.primary }}
                onPress={handleSubmit}
                title="Login"
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
              />
            </View>
          </Fragment>
        )}
      </Formik>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={{ backgroundColor: ColorCt.primary }}
          onPress={handleSubmit}
          title="Signup"
        />
        <Button
          buttonStyle={{ backgroundColor: ColorCt.primary }}
          onPress={handleSubmit}
          title="Forgot Password"
        />
        <Button
          buttonStyle={{ backgroundColor: '#3b5998' }}
          onPress={handleSubmit}
          title=" Connect using Facebook"
          icon={<Icon name="facebook-square" size={24} color="white" />}
        />
      </View>
    </SafeAreaView>
  );
};

export default loginScr;

const styles = StyleSheet.create({
  container: {
    flex: 1
    //backgroundColor: '#fff'
  },
  formikbuttonContainer: {
    justifyContent: 'space-evenly', //spacing bet button in height=160
    marginTop: 10, //space between text container
    height: 100,
    alignSelf: 'center', //this will center in the 95% width
    padding: 10, //button spacing around button container

    width: '98%'
  },
  buttonContainer: {
    justifyContent: 'space-evenly', //spacing bet button in height=160
    marginTop: 50, //space between text container
    height: 200,
    alignSelf: 'center', //this will center in the 95% width
    padding: 10, //button spacing around button container

    width: '98%'
  },
  textcontainer: {
    marginTop: 50, //space from header
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    padding: 1,
    width: '92%',
    height: 130,
    justifyContent: 'space-evenly'
  },
  imagecontainer: {
    height: 50,
    width: '100%',
    backgroundColor: ColorCt.primary,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center' //this will center the image
  }
});
