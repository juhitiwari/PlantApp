import React, { Component } from 'react';
import { View, StyleSheet,Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Block,Text,Button, Badge,Card } from '../components';
import {theme, mocks} from '../constants'



const { width } =Dimensions.get("window");

 class Browse extends Component {
     state={
         active:'Products',
         categories:[]
     }

     componentDidMount(){
         this.setState({categories:this.props.categories})
     }

     handleTab=tab=>{
         const {categories}=this.props
         const filtered=categories.filter(
             category=>category.tags.includes(tab.toLowerCase())
         )
         this.setState({active:tab,categories:filtered})
     }

    renderTab(tab){
        const {active}=this.state
        const isActive=active===tab
        return(
            <TouchableOpacity
            key={`tab-${tab}`}
            onPress={()=>this.handleTab(tab)}
            style={[styles.tab,
            isActive?styles.active:null]}>

                <Text title medium gray={!isActive} secondary={isActive}>{tab}</Text>
            </TouchableOpacity>
        )

    }

  render() {
    const {profile,navigation}=this.props
    const {categories}=this.state
    const tabs=['Products','Inspirations','Shop']

    return (
      <Block>
          <Block flex={false} row center space="between" style={styles.header}>

          
          <Text h1 bold> Browse</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Settings')}>
              <Image source={profile.avatar}
              style={styles.avatar}/>
          </TouchableOpacity>
          </Block>
          <Block flex={false} row style={styles.tabs}>
              {tabs.map(tab=>this.renderTab(tab))}

          </Block>

          <ScrollView showsVerticalScrollIndicator={false}
          style={{paddingVertical:theme.sizes.base*2}}>
              <Block flex={false} row space='between' style={styles.categories}>
              {categories.map(category=>(
                  <TouchableOpacity 
                  key={category.name}
                  onPress={()=>navigation.navigate('Explore',{category})}>
                  <Card center middle shadow style={styles.category}>
                      <Badge margin={[0,0,15]} size={50} colors="rgba(41,216,143,0.20)">
                          <Image source={category.image}/>
                      </Badge>
              <Text bold height={20} >{category.name}</Text>
                      <Text gray caption> {category.count} products</Text>
                  </Card>
            </TouchableOpacity>

              ))}
              </Block>
              
          </ScrollView>
      </Block>
    );
  }
}

Browse.defaultProps={
    profile:mocks.profile,
    categories:mocks.categories
}

const styles=StyleSheet.create({
    header:{
        paddingHorizontal:theme.sizes.base*2,
        marginVertical:theme.sizes.base
    },
    avatar:{
        height:theme.sizes.base*3,
        width:theme.sizes.base*3,

        
    },
    tab:{
        marginRight:theme.sizes.base*2,
        paddingBottom:theme.sizes.base
    },
    active:{
        borderBottomColor:theme.colors.secondary,
        borderBottomWidth:3,

    },
    tabs:{
        borderBottomColor:theme.colors.gray2,
        borderBottomWidth:StyleSheet.hairlineWidth,
        marginVertical:theme.sizes.base,
        marginHorizontal:theme.sizes.base*2

    },
    category:{
        minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
    },
    categories:{
        flexWrap:'wrap',
        paddingHorizontal:theme.sizes.base*2,
        marginBottom:theme.sizes.base*3.5
    }
})

export default Browse