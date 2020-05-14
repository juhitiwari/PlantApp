import React, { Component } from 'react';
import {  StyleSheet,ScrollView,Image,Dimensions, TouchableOpacity, Animated } from 'react-native';
import { Block,Text, Input,Button } from '../components';
import {theme, mocks} from '../constants'
import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons } from '@expo/vector-icons';



const {width,height} = Dimensions.get('window')


class Explore extends Component {
    state={
        searchString:null,
        searchFocus:new Animated.Value(0.6)
    }

    handleSearchFocus(status){
        Animated.timing(
            this.state.searchFocus,{
                toValue:status?0.8:0.6,
                duration:150
            }
        ).start()
    }

    renderSearch(){
        const {searchString,searchFocus}=this.state
        const isEditing=searchFocus&&searchString
        return (
            <Block animated flex={searchFocus} style={styles.search}>
                <Input placeholder="Search"
                placeholderTextColor={theme.colors.gray}
                style={styles.searchInput}
                onChangeText={text=>this.setState({searchString:text})}
                value={searchString}
                rightStyle={styles.searchRight}
                rightLabel={
                    <EvilIcons
                    name={isEditing?'close':'search'}
                    size={theme.sizes.base }
                      color={theme.colors.gray}
                      style={styles.searchIcon}
                    />
                   
                  }
                  onFocus={()=>this.handleSearchFocus(true)}
                  onBlur={()=>this.handleSearchFocus(false)}
                  onRightPress={()=>isEditing?this.setState({searchString:null}):null}

                />
            </Block>
        )
    }

    renderImage(img,index){
        const {navigation}=this.props
        const sizes=Image.resolveAssetSource(img)
        const fullWidth=width-theme.sizes.padding*2.5
        const  resize=(sizes.width*100)/fullWidth
        const imgWidth=resize>75?fullWidth:sizes.width*0.95
        return (
            <TouchableOpacity
            key={`img-${index}`}
            
            onPress={()=>navigation.navigate('Product')}>
                <Image source={img} style={[styles.image,{minWidth:imgWidth,maxWidth:imgWidth}]}/>
            </TouchableOpacity>
        )
        
    }

    renderExplore(){
        const {images,navigation}=this.props
        const mainImage=images[0]

        return (
            <Block style={{marginBottom:height/4}}>
                <TouchableOpacity
                style={[styles.image,styles.mainImage]}
                onPress={()=>navigation.navigate('Product')}>
                    <Image source={mainImage} style={[styles.image,styles.mainImage]}/>
                </TouchableOpacity>
                <Block row space='between' wrap>
                    {
                        images.slice(1).map((img,index)=>this.renderImage(img,index))
                    }

                </Block>

            </Block>
        )

    }
    renderFooter(){
        return (
           <LinearGradient
           locations={[0.5, 1]}
        style={styles.footer}
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.6)"]}>
               <Button gradient style={{ width: width / 2.678 }} onPress={()=>this.props.navigation.navigate('Product')}>
          <Text bold white center>
            Filter
          </Text>
        </Button>
           </LinearGradient>
        )

    }


  render() {
    return (
      <Block>
          <Block flex={false} row center space="between" style={styles.header}>

          
            <Text h1 bold style={{marginTop:32}}> Explore</Text>
                {this.renderSearch()}
            </Block>
            <ScrollView showsVerticalScrollIndicator={false}
            style={styles.explore}>
                {this.renderExplore()}
            </ScrollView>
            {this.renderFooter()}
      </Block>
    );
  }
}

const styles=StyleSheet.create({
    header:{
        paddingHorizontal:theme.sizes.base*2,
        paddingBottom:theme.sizes.base*2
    },
    search:{
        height:theme.sizes.base*2,
        width:width-theme.sizes.base*2
    },
    searchRight:{
        top:0,
        marginVertical:0,
        backgroundColor:'transparent'

    },
    searchIcon:{
position:'absolute',
right:theme.sizes.base/1.33,
top:theme.sizes.base/1.6
    },
    searchInput:{
        fontSize:theme.sizes.caption,
        height:theme.sizes.base*2,
        backgroundColor:'rgba(142,142,147,0.06)',
        borderColor:'rgba(142,142,147,0.06)',
        paddingLeft:theme.sizes.base/1.333,
        paddingRight:theme.sizes.base*1.5
    },
    explore:{
        marginHorizontal:theme.sizes.padding*1.25
    },
    footer:{
        position: 'absolute',
        bottom:0,
        right:0,
        left:0,
        overflow:'visible',
        alignItems:'center',
        justifyContent:'center',
        height:height*0.1,
        width,
        paddingBottom:theme.sizes.base*4
    },
    image:{
        minHeight:100,
        maxHeight:130,
        maxWidth:width-(theme.sizes.padding*2.5),
        marginBottom:theme.sizes.base,
        borderRadius:4

    },
    mainImage:{
        minWidth:width-(theme.sizes.padding*2.5),
        minHeight:width-(theme.sizes.padding*2.5)
    }

})

Explore.defaultProps={
    images:mocks.explore

}

export default Explore
