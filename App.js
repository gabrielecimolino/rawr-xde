import React from 'react';
import { Text, View, TextInput, Dimensions, Image, ImageBackground, BlurView, Button, FlatList, Alert } from 'react-native';
import { Asset, Font, AppLoading } from 'expo';


class DoneButton extends React.Component{
  constructor(props) {
    super(props);
    this.state = { pressed: false };
  }
  
  press(){
    if (this.state.pressed) {
      this.setState({ pressed: false });
    } else {
      this.setState({ pressed: true });
    }
  }
  
  render(){
    if(this.state.pressed){
      return (
        <View style= {{ width: Dimensions.get('window').width / 5 }}>
          <Button
            onPress={ this.press.bind(this) }
            title= 'Done'
            color= '#000'
          />
        </View>
      );
    }
    else{
      return (
        <View style= {{ width: Dimensions.get('window').width / 5 }}>
          <Button
            onPress={ this.press.bind(this) }
            title= 'Done'
            color= '#fff'
          />
        </View>
      );
    }
  }
}

class AppIcon extends React.Component{
  constructor(props){
    super(props);
    this.state = { selected: false };
  }

  press(){
    if (this.state.selected) {
      this.setState({ selected: false });
    } else {
      this.setState({ selected: true });
    }
  }

  contains(searchString){
    Alert.alert('Contains');
    return this.props.name.includes(searchString);
  }

  render(){
    if(this.state.selected){
      return(
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height / 6, width: Dimensions.get('window').width * 0.8 / 3 }}>
          <View style={{ }}>
            <ImageBackground style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', height: Dimensions.get('window').height * 0.7 / 6, width: Dimensions.get('window').width * 0.7 * 0.8 / 3 }} source={this.props.source} >

              <View style={{  }}>

                <ImageBackground source= { require('./assets/images/icons/check.png') } style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', height: Dimensions.get('window').height * 0.7 / 6, width: Dimensions.get('window').width * 0.7 * 0.8 / 3 }} >

                  <Button 
                    onPress={ this.press.bind(this) }
                    title= '                                                                                          '
                    color= 'rgba(0,0,0,0)'
                    style={{ width: Dimensions.get('window').width  }}
                  >
                  </Button>

                </ImageBackground>

              </View>

            </ImageBackground>

            <Text style={{ color: '#fff', fontFamily: 'sf-pro', textAlign: 'center' }}>{this.props.name}</Text>

          </View>  
        </View>
      );
    }
    else{
      return(
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height / 6, width: Dimensions.get('window').width * 0.8 / 3 }} >
          
          <View style={{  }}>
            <ImageBackground style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', height: Dimensions.get('window').height * 0.7 / 6, width: Dimensions.get('window').width * 0.7 * 0.8 / 3 }} source={this.props.source} >
              <Button 
                onPress={ this.press.bind(this) }
                title= '                                                                                    '
                color= 'rgba(0,0,0,0)'
                style={{ width: Dimensions.get('window').width  }}
              />
            </ImageBackground>

            <Text style={{ color: '#fff', fontFamily: 'sf-pro', textAlign: 'center' }}>{this.props.name}</Text>
          </View>  

        </View>
      );
    }
  }
}

export default class App extends React.Component {  
  constructor(props){
    super(props);
    this.state = { fontLoaded: false, workingSet: [], searchString: '', init: false };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'sf-pro': require('./assets/fonts/SFProText-Regular.otf'),
    });

    this.setState({ fontLoaded: true, appIcons: [
        <AppIcon name= { 'App Store' } source={ require('./assets/images/icons/appstore.png') } key={ 'App Store' } />,
        <AppIcon name= { 'Calendar' } source={ require('./assets/images/icons/calendar.png') } key={ 'Calendar' } />,
        <AppIcon name= { 'Facebook' } source={ require('./assets/images/icons/fb.png') } key={ 'Facebook' } />
      ] });
    this.setState({ workingSet: this.state.appIcons });
  }

  contains(key, searchString){
    return key.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
  }

  filterApps(searchString, icons){
    //Alert.alert(searchString);
    //this.state.workingSet.map((item) => Alert.alert(item.key));
    this.setState({ searchString: searchString, workingSet: icons.filter((item) => this.contains(item.key, searchString)) });
  }

  init(){
    Alert.alert('init');
    this.setState({ workingSet: appIcons, init: true });
  }

  render() {

    if(!this.state.fontLoaded){
      return (<AppLoading />);
    }
    else{
      // const appIcons = [
      //   <AppIcon name= { 'App Store' } source={ require('./assets/images/icons/appstore.png') } key={ ' 1 ' } />,
      //   <AppIcon name= { 'Calendar' } source={ require('./assets/images/icons/calendar.png') } key={ ' 2 ' } />,
      //   <AppIcon name= { 'Facebook' } source={ require('./assets/images/icons/fb.png') } key={ ' 3 ' } />
      // ];

      // if(!this.state.init){
      //   this.init();
      // }

      return (
        <View tint="light" intensity={ 50 } style={{ flex: 1 }}>

            <ImageBackground style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }} source={require('./assets/images/wallpaper.jpg')} >
              
              <View style={{ marginTop: Dimensions.get('window').height / 25, height: Dimensions.get('window').height / 15 }}>
                <ImageBackground style={{ height: Dimensions.get('window').height / 15, width: Dimensions.get('window').width}} source={require('./assets/images/searchbar.png')} >
                  
                  <View style={{ flex:1, flexDirection: 'row' }}>
                    <TextInput
                      style={{ color: '#fff', fontFamily: 'sf-pro', marginLeft: Dimensions.get('window').width / 10, width: Dimensions.get('window').width / 1.5}}
                      placeholder="Search"
                      textInputProps={{underlineColorAndroid:'rgba(0,0,0,0)'}}
                      onChangeText={ (text) => { this.setState({text}); this.filterApps(text, this.state.appIcons); } }  
                    />
                    <DoneButton/>
                  </View>

                </ImageBackground>
              </View>

              <View style={{ alignItems: 'center' }}>
                <View style={{ marginTop: Dimensions.get('window').height / 8, height: Dimensions.get('window').height / 2.5, width: Dimensions.get('window').width * 0.8, alignItems: 'center' }}>
                  
                  <ImageBackground style={{ height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width * 0.8, flexDirection: 'row', flexWrap: 'wrap' }} source={require('./assets/images/folder.png')} >
                    
                      { this.state.workingSet }
                
                  </ImageBackground>

                </View>
              </View>

            </ImageBackground>

        </View>
      );
    }
  }
}