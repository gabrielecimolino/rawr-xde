import React from 'react';
import { Text, View, TextInput, Dimensions, Image, ImageBackground } from 'react-native';
import { Asset, Font, AppLoading } from 'expo';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'sf-pro': require('./assets/fonts/SFProText-Regular.otf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if(!this.state.fontLoaded){
      return (<AppLoading />);
    }
    else{
      return (
        <View style={{ flex: 1 }}>

            <View style={{ marginTop: Dimensions.get('window').height / 20, height: Dimensions.get('window').height / 15 }}>
              <ImageBackground style={{ height: Dimensions.get('window').height / 15, width: Dimensions.get('window').width}} source={require('./assets/images/searchbar.png')} >
                <TextInput
                  style={{flex: 1, fontFamily: 'sf-pro', marginLeft: Dimensions.get('window').width / 10 }}
                  placeholder="Search"
                  textInputProps={{underlineColorAndroid:'rgba(0,0,0,0)'}}
                  onChangeText={(text) => this.setState({text})}
                />
              </ImageBackground>
            </View>

            <View style={{ alignItems: 'center' }}>
              <View style={{ marginTop: Dimensions.get('window').height / 8, height: Dimensions.get('window').height / 2.5, width: Dimensions.get('window').width * 0.8, alignItems: 'center' }}>
                
                <ImageBackground style={{ height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width * 0.8 }} source={require('./assets/images/folder.png')} >
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontFamily: 'sf-pro', fontSize: Dimensions.get('window').height / 10 }}>Grid</Text>
                </ImageBackground>
              </View>
            </View>

        </View>
      );
    }
  }
}


// import React, { Component } from 'react';
// import { AppRegistry, Text, TextInput, View, StyleSheet } from 'react-native';
// import { Font } from 'expo';

// export default class Fixed extends Component {
//   async componentDidMount() {
//     await Font.loadAsync({
//       'SF-Pro': require('./assets/fonts/SFProText-Regular.otf'),
//     });

//     this.setState({ fontLoaded: true });
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.tbar}>
//           <Text style={styles.text}>Fixed top bar</Text>
//         </View>
//         <ScrollView style={styles.main}>
//           <View style={styles.item}><Text style={styles.text}>1</Text></View>
//           <View style={styles.item}><Text style={styles.text}>2</Text></View>
//           <View style={styles.item}><Text style={styles.text}>3</Text></View>
//         </ScrollView>
//         <View style={styles.bbar}>
//           <Text style={styles.text}>Fixed bottom bar</Text>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   tbar: {
//     width: 375,
//     height: 100,
//     borderBottomWidth: 5,
//     borderColor: 'black',
//     backgroundColor: 'red'
//   },
//   main: {
//     flex: 1
//   },
//   item: {
//     height: 200,
//     width: 375,
//     marginTop: 10,
//     backgroundColor: 'green'
//   },
//   bbar: {
//     width: 375,
//     height: 100,
//     borderTopWidth: 5,
//     borderColor: 'black',
//     backgroundColor: 'red'
//   },
//   text: {
//     color: '#ffffff',
//     fontFamily: 'SF-Pro',
//     fontSize: 40
//   }
// });

// import React, { Component } from 'react';
// import { AppRegistry, Text, TextInput, View } from 'react-native';

// export default class PizzaTranslator extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {text: ''};
//   }

//   render() {
//     return (
//       <View style={{padding: 10}}>
//         <TextInput
//           style={{flex: 1}}
//           placeholder="Type here to ;____;!"
//           onChangeText={(text) => this.setState({text})}
//         />
//         <Text style={{flex: 2, fontSize: 42}}>
//           {this.state.text.split(' ').map((word) => word && ';_____;').join(' ')}
//         </Text>
//       </View>
//     );
//   }
// }

// skip this line if using Create React Native App
//AppRegistry.registerComponent('AwesomeProject', () => PizzaTranslator);