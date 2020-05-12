import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Apploading,Asset} from 'expo'

import * as constants from './constants'
import Navigation from './navigation'
import {Block} from './components'

const images=[
  require('./assets/images/plants_1.png'),
  require('./assets/images/plants_2.png'),
  require('./assets/images/plants_3.png'),
  require('./assets/images/explore_1.png'),
  require('./assets/images/explore_2.png'),
  require('./assets/images/explore_3.png'),
  require('./assets/images/explore_4.png'),
  require('./assets/images/explore_5.png'),
  require('./assets/images/explore_6.png'),
  require('./assets/images/avatar.png'),
  require('./assets/icons/plants.png'),
  require('./assets/icons/seeds.png'),
  require('./assets/icons/flowers.png'),
  require('./assets/icons/sprayers.png'),
  require('./assets/icons/pots.png'),
  require('./assets/icons/fertilizers.png'),
  require('./assets/icons/back.png'),




]

export default class App extends React.Component{
  state={
    isLoadingComplete:false,
  }
  handleResourcesAsync =async()=>{
    const cacheImages=image.map(img=>{
      return Asset.fromModule(image).downloadAsync()
    })
    return Promise.all(cacheImages)
  }
  render(){
    if(this.state.isLoadingComplete && !this.props.skipLoadingScreen){
      return (
        <Apploading
        startAsync={this.handleResourcesAsync}
        onError={error=>console.warn(error)}
        onFinish={()=>this.setState({isLoadingComplete:true})}/>
      )
    }
  return (
    <Block white>
      <Navigation/>
    </Block>
  );
}
}

