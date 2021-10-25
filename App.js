import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as firebase from "firebase";
import FormData from "form-data";


// firebase config
const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX",
  databaseURL: "XXX",
  projectId:"XXX",
  storageBucket: "XXX",
};
// firebase initialization
firebase.initializeApp(firebaseConfig);

class MyApp extends Component {
  constructor() {

    super();
    this.state = {
      mUserRef:'',
      temperature: '',
      humidity:'',

    };
  }

  componentDidMount() {
    var that = this;
    // firebase reference
    this.state.mUserRef = firebase.database().ref();
    // event listener
    this.state.mUserRef.on("value", function (snapshot) {

          let data_1 = snapshot.val().temperature;
          let data_2 = snapshot.val().humidity;

      that.setState({
        temperature: data_1,
        humidity: data_2,

      });
    });
  };

  // function to save readings to google sheets
    saveReadings = () => {

          var bodyData = new FormData();
          bodyData.append("temp", this.state.temperature);
          bodyData.append("hum", this.state.humidity);
            // fetching google apps script URL
          fetch(
            "XXX",

            {
              method: "POST",
              body: bodyData,
            }
          )
            .then((response) => response.text())
            .then((json) => {
              console.log(json);
              if (json == "Success") {
                Alert.alert("Great!", "readings saved", [{ text: "done" }]);
              }
            })
            .catch((e) => {
              console.log(e);
            });

    };


  render() {

        return (

                  <View style={styles.container}>
                  <Text style={styles.text}>Temperature: <Text style={styles.subText}>{this.state.temperature}</Text></Text>
                  <Text style={styles.text}>Humidity: <Text style={styles.subText}>{this.state.humidity}</Text></Text>
                  <Button
                      onPress={ () => { this.saveReadings(); }}
                      title="SAVE"
                      color="#841584"
                      accessibilityLabel="Learn more about this purple button"
                  />
                  </View>

        );
  }
}

export default MyApp;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#052A4C",
  },
  subText: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#53C86D",
  },

});
