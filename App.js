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
    this.props.parentFunction();
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

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = { opened: false };
  }

  press(){
    Alert.alert(this.props.name + " has been pressed");
  }

  render(){
    if(this.state.opened){
      return(<Text>;____;</Text>);
    }
    else{
      return(
        <View style ={{ height: Dimensions.get('window').height / 6 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height / 6, width: Dimensions.get('window').width / 4 }} >
            
            <View style={{  }}>
              <ImageBackground style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', height: Dimensions.get('window').height * 0.7 / 6, width: Dimensions.get('window').width * 0.7 / 4 }} source={this.props.source} >
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
    this.props.parentFunction(this.props.index);
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
                      style={{ width: Dimensions.get('window').width }}
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

export default class Prototype extends React.Component {  
  constructor(props){
    super(props);
    this.state = { fontLoaded: false, workingSet: [], searchString: '', init: false, doneSelecting: false, selectedApps: [], useableApps: [] };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'sf-pro': require('./assets/fonts/SFProText-Regular.otf'),
    });

    this.setState({ fontLoaded: true, appIcons: [
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 1 } name= { 'App Store' } source={ require('./assets/images/icons/appstore.png') } key={ 'App Store' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 2 } name= { 'Calendar' } source={ require('./assets/images/icons/calendar.png') } key={ 'Calendar' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 3 } name= { 'Facebook' } source={ require('./assets/images/icons/fb.png') } key={ 'Facebook' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 4 } name= { 'Instagram' } source={ require('./assets/images/icons/instagram.png') } key={ 'Instagram' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 5 } name= { 'Itunes Store' } source={ require('./assets/images/icons/itunesstore.png') } key={ 'Itunes Store' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 6 } name= { 'Mail' } source={ require('./assets/images/icons/mail.png') } key={ 'Mail' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 7 } name= { 'Map' } source={ require('./assets/images/icons/map.png') } key={ 'Map' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 8 } name= { 'Messages' } source={ require('./assets/images/icons/messages.png') } key={ 'Messages' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 9 } name= { 'Messenger' } source={ require('./assets/images/icons/messenger.png') } key={ 'Messenger' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 10 } name= { 'Music' } source={ require('./assets/images/icons/music.png') } key={ 'Music' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 11 } name= { 'Notes' } source={ require('./assets/images/icons/notes.png') } key={ 'Notes' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 12 } name= { 'Phone' } source={ require('./assets/images/icons/phone.png') } key={ 'Phone' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 13 } name= { 'Photos' } source={ require('./assets/images/icons/photos.png') } key={ 'Photos' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 14 } name= { 'Safari' } source={ require('./assets/images/icons/safari.png') } key={ 'Safari' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 15 } name= { 'Settings' } source={ require('./assets/images/icons/settings.png') } key={ 'Settings' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 16 } name= { 'Snapchat' } source={ require('./assets/images/icons/snap.png') } key={ 'Snapchat' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 17 } name= { 'Weather' } source={ require('./assets/images/icons/weather.png') } key={ 'Weather' } />,
        <AppIcon parentFunction={this.appPressed.bind(this)} index= { 18 } name= { 'YouTube' } source={ require('./assets/images/icons/yt.png') } key={ 'YouTube' } />
      ] });

    page = this.getPage(0, this.state.appIcons);
    this.setState({ workingSet: this.state.appIcons, currentPageNumber: 0, currentPage: page });
  }

  appPressed(index){
    //Alert.alert("App " + index + " was pressed");
    selected = this.state.selectedApps;
    if(selected.includes(index)){
      selected = selected.filter((item) => item !== index);
    }
    else selected.push(index);
    this.setState({ selectedApps: selected });
  }

  donePressed(){
    this.setState({ doneSelecting: true });
    this.buildUseableApps();
  }

  buildUseableApps(){
    selected = this.state.selectedApps;
    apps = [];
    if(selected.includes(1)) apps.push(<App name= { 'App Store' } source={ require('./assets/images/icons/appstore.png') } key={ 'App Store'} />);
    if(selected.includes(2)) apps.push(<App name= { 'Calendar' } source={ require('./assets/images/icons/calendar.png') } key={ 'Calendar'} />);
    if(selected.includes(3)) apps.push(<App name= { 'Facebook' } source={ require('./assets/images/icons/fb.png') } key={ 'Facebook'} />);
    if(selected.includes(4)) apps.push(<App name= { 'Instagram' } source={ require('./assets/images/icons/instagram.png') } key={ 'Instagram'} />);
    if(selected.includes(5)) apps.push(<App name= { 'Itunes Store' } source={ require('./assets/images/icons/itunesstore.png') } key={ 'Itunes Store'} />);
    if(selected.includes(6)) apps.push(<App name= { 'Mail' } source={ require('./assets/images/icons/mail.png') } key={ 'Mail'} />);
    if(selected.includes(7)) apps.push(<App name= { 'Map' } source={ require('./assets/images/icons/map.png') } key={ 'Map'} />);
    if(selected.includes(8)) apps.push(<App name= { 'Messages' } source={ require('./assets/images/icons/messages.png') } key={ 'Messages'} />);
    if(selected.includes(9)) apps.push(<App name= { 'Messenger' } source={ require('./assets/images/icons/messenger.png') } key={ 'Messenger'} />);
    if(selected.includes(10)) apps.push(<App name= { 'Music' } source={ require('./assets/images/icons/music.png') } key={ 'Music'} />);
    if(selected.includes(11)) apps.push(<App name= { 'Notes' } source={ require('./assets/images/icons/notes.png') } key={ 'Notes'} />);
    if(selected.includes(12)) apps.push(<App name= { 'Phone' } source={ require('./assets/images/icons/phone.png') } key={ 'Phone'} />);
    if(selected.includes(13)) apps.push(<App name= { 'Photos' } source={ require('./assets/images/icons/photos.png') } key={ 'Photos'} />);
    if(selected.includes(14)) apps.push(<App name= { 'Safari' } source={ require('./assets/images/icons/safari.png') } key={ 'Safari'} />);
    if(selected.includes(15)) apps.push(<App name= { 'Settings' } source={ require('./assets/images/icons/settings.png') } key={ 'Settings'} />);
    if(selected.includes(16)) apps.push(<App name= { 'Snapchat' } source={ require('./assets/images/icons/snap.png') } key={ 'Snapchat'} />);
    if(selected.includes(17)) apps.push(<App name= { 'Weather' } source={ require('./assets/images/icons/weather.png') } key={ 'Weather'} />);
    if(selected.includes(18)) apps.push(<App name= { 'YouTube' } source={ require('./assets/images/icons/yt.png') } key={ 'YouTube'} />);

    this.setState({ useableApps: apps });
  }

  contains(key, searchString, keyIndex, stringIndex){
    doesIt = key.toLowerCase().indexOf(searchString.toLowerCase()) >= 0;
    return doesIt;
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
    newSet = icons.filter((item) => this.contains(item.key, searchString));
    newSet.sort((a, b) => this.contains(a.key, searchString) > this.contains(b.key, searchString));
    page = this.getPage(this.state.currentPageNumber, newSet);
    this.setState({ searchString: searchString, workingSet: newSet, currentPage: page });
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

  rebuildPage(){
    pageNumber = this.state.currentPageNumber;
    working = this.state.workingSet;

    page = this.getPage(pageNumber, working);
    this.setState({ currentPage: page });
  }

  decPage(){
    page = this.state.currentPageNumber;
    page--;

    if(page < 0) page = 0;
    this.setState({ currentPageNumber: page });
    this.rebuildPage();
  }

  incPage(){
    page = this.state.currentPageNumber;
    page++;

    if(page > 1) page = 1;
    this.setState({ currentPageNumber: page });
    this.rebuildPage();
  }

  render() {

    if(this.state.doneSelecting){
      return(
        <View tint="light" intensity={ 50 } style={{  }}>

          <ImageBackground style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, flexDirection: 'row', flexWrap: 'wrap' }} source={require('./assets/images/wallpaper.jpg')} >
            { this.state.useableApps }
          </ImageBackground>

        </View>
      );
    }

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
                    <DoneButton parentFunction={this.donePressed.bind(this)} />
                  </View>

                </ImageBackground>
              </View>

              <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                <Button 
                  onPress={ this.decPage.bind(this) }
                  title=' <- ' 
                  style={{ height: Dimensions.get('window').height / 2.5, width: Dimensions.get('window').width / 10  }}
                />

                <View style={{ marginTop: Dimensions.get('window').height / 8, height: Dimensions.get('window').height / 2.5, width: Dimensions.get('window').width * 0.8 }}>
                  
                  <ImageBackground style={{ height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width * 0.8, flexDirection: 'row', flexWrap: 'wrap' }} source={require('./assets/images/folder.png')} >
                    
                      { this.state.currentPage }
                
                  </ImageBackground>

                </View>

                <Button 
                  onPress={ this.incPage.bind(this) }
                  title=' -> '
                  style={{ height: Dimensions.get('window').height / 2.5, width: Dimensions.get('window').width / 10  }}
                />

              </View>

            </ImageBackground>

        </View>
      );
    }
  }
}