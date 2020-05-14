import React from 'react'
import {Image} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Welcome from '../screens/Welcome'
import Login from '../screens/Login'
import Explore from '../screens/Explore'
import Browse from '../screens/Browse'
import Product from '../screens/Product'
import Settings from '../screens/Settings'
import Forgot from '../screens/Forgot'
import Signup from '../screens/Signup'

import {theme} from '../constants'

const screens=createStackNavigator({
    Welcome,
    Login,
   Forgot,
   Signup,
   Browse,
   Settings,
   Explore,
   Product

   

},{
    defaultNavigationOptions:{
        headerStyle:{
            height:theme.sizes.base*4,
            backgroundColor:theme.colors.white,
            borderBottomColor:'transparent',
            elevation:0
            
            
        },
        headerTitle:()=>null,
        headerBackImage:()=><Image source={require('../assets/icons/back.png')}/>,
        headerBackTitle:null,
        headerLeftContainerStyle:{
            alignItems:'center',
            marginLeft:theme.sizes.base,
            paddingRight:theme.sizes.base
        },
        headerRightContainerStyle:{
            alignItems:'center',
            paddingRight:theme.sizes.base
        },
    }
})

export default createAppContainer(screens)