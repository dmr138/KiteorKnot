import { Text, View, TextInput, StyleSheet,ImageBackground,Button} from "react-native";

export default function Index() {
  return (
  
    <ImageBackground style={styles.kite} source={require('../assets/images/kiteLogin.jpg')} resizeMode="cover">
      <View >
        <Text style={styles.title}>Kite or Knot</Text>
      </View>
      <View style={styles.login}>
          <TextInput placeholder="Username" style={styles.inputBox}></TextInput>
          <TextInput placeholder="Password" style={styles.inputBox}></TextInput>
          <Button
            title="Login"
            />
      </View>
    </ImageBackground>
  );

}

const styles = StyleSheet.create({
  login:{
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 0,
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 10,
    width:250,
    marginTop: 10,
    backgroundColor: 'white',
  },
  logBtn:{
    borderRadius: 8,
    alignSelf: 'center',
  },
  title:{
    fontSize: 50,
    marginTop:30,
    marginBottom: 0,
  },
  kite: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
  
})
