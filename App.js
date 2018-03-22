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
        <View style={{ height: Dimensions.get('window').height / 6 }}>
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
        </View>
      );
    }
    else{
      return(
        <View style ={{ height: Dimensions.get('window').height / 6 }}>
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
        <AppIcon name= { 'Facebook' } source={ require('./assets/images/icons/fb.png') } key={ 'Facebook' } />,
        <AppIcon name= { 'Instagram' } source={ require('./assets/images/icons/instagram.png') } key={ 'Instagram' } />,
        <AppIcon name= { 'Itunes Store' } source={ require('./assets/images/icons/itunesstore.png') } key={ 'Itunes Store' } />,
        <AppIcon name= { 'Mail' } source={ require('./assets/images/icons/mail.png') } key={ 'Mail' } />,
        <AppIcon name= { 'Map' } source={ require('./assets/images/icons/map.png') } key={ 'Map' } />,
        <AppIcon name= { 'Messages' } source={ require('./assets/images/icons/messages.png') } key={ 'Messages' } />,
        <AppIcon name= { 'Messenger' } source={ require('./assets/images/icons/messenger.png') } key={ 'Messenger' } />,
        <AppIcon name= { 'Music' } source={ require('./assets/images/icons/music.png') } key={ 'Music' } />,
        <AppIcon name= { 'Notes' } source={ require('./assets/images/icons/notes.png') } key={ 'Notes' } />,
        <AppIcon name= { 'Phone' } source={ require('./assets/images/icons/phone.png') } key={ 'Phone' } />,
        <AppIcon name= { 'Photos' } source={ require('./assets/images/icons/photos.png') } key={ 'Photos' } />,
        <AppIcon name= { 'Safari' } source={ require('./assets/images/icons/safari.png') } key={ 'Safari' } />,
        <AppIcon name= { 'Settings' } source={ require('./assets/images/icons/settings.png') } key={ 'Settings' } />,
        <AppIcon name= { 'Snapchat' } source={ require('./assets/images/icons/snap.png') } key={ 'Snapchat' } />,
        <AppIcon name= { 'Weather' } source={ require('./assets/images/icons/weather.png') } key={ 'Weather' } />,
        <AppIcon name= { 'YouTube' } source={ require('./assets/images/icons/yt.png') } key={ 'YouTube' } />
      ] });

    page = this.getPage(0, this.state.appIcons);
    this.setState({ workingSet: this.state.appIcons, currentPageNumber: 0, currentPage: page });
  }

  contains(key, searchString, keyIndex, stringIndex){
    return key.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
    // if(keyIndex < key.length){
    //   if(key[keyIndex] == searchString[stringIndex]){
    //     if(stringIndex == searchString.length - 1) return true;
    //     else return contains(key, searchString, keyIndex + 1, stringIndex + 1);
    //   }
    //   else return contains(key, searchString, keyIndex + 1, 0);
    // }
    // else return false;
  }

  filterApps(searchString, icons){
    //Alert.alert(searchString);
    //this.state.workingSet.map((item) => Alert.alert(item.key));
    this.setState({ searchString: searchString, workingSet: icons.filter((item) => this.contains(item.key, searchString)) });
    page = this.getPage(this.state.currentPageNumber, this.state.workingSet);
    this.setState({ currentPage: page });
  }

  getPage(pageNumber, icons){
    firstIndex = 9 * pageNumber;
    taken = 0;
    page = [];

    for(var i = firstIndex; i < icons.length; i++){
      if(taken < 9){
        page.push(icons[i]);
        taken++;
      }
    }

    return page;
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
                <View style={{ marginTop: Dimensions.get('window').height / 8, height: Dimensions.get('window').height / 2.5, width: Dimensions.get('window').width * 0.8 }}>
                  
                  <ImageBackground style={{ height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width * 0.8, flexDirection: 'row', flexWrap: 'wrap' }} source={require('./assets/images/folder.png')} >
                    
                      { this.state.currentPage }
                
                  </ImageBackground>

                </View>
              </View>

            </ImageBackground>

        </View>
      );
    }
  }
}