import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import {Header, Spinner, Button} from './components/common';

class App extends Component {
  state = {loggedIn: null};

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyB1H-I4vkvRTBqy33aptgerzAB2RwNirDY',
        authDomain: 'auth-d12f2.firebaseapp.com',
        databaseURL: 'https://auth-d12f2.firebaseio.com',
        projectId: 'auth-d12f2',
        storageBucket: 'auth-d12f2.appspot.com',
        messagingSenderId: '769999765428',
        appId: '1:769999765428:web:04bcc1b87bb7f72dd1bce1',
      });
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }
  writeUserData(email, fname, lname) {
    firebase
      .database()
      .ref('Users/')
      .set({
        email,
        fname,
        lname,
      })
      .then((data) => {
        //success callback
        console.log('data ', data);
      })
      .catch((error) => {
        //error callback
        console.log('error ', error);
      });
  }
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={{height: 40}}>
            <Button
              onPress={() =>
                this.writeUserData('aman,bhawsar,amanbhawsar9@gmail.com')
              }>
              Save Details
            </Button>
            <Button
              onPress={() => {
                console.log('logoff');
                firebase.auth().signOut();
                this.state.loggedIn = false;
              }}>
              Log Out
            </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
export default App;
