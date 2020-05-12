import React, { Component } from 'react';
import { View, StyleSheet,Image, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { Block,Text,Button, Badge,Card, Divider, Switch } from '../components';
import {theme, mocks} from '../constants'
import Slider from 'react-native-slider'
 class Settings extends Component {

    state={
        budget:500,
        monthly_cap:500,
        notifications:true,
        newletter:false,
        editing:null,
        profile:{}
    }

    componentDidMount(){
        this.setState({profile:this.props.profile})
    }

    handleEdit(name,text){
        const {profile}=this.state;
        profile[name]=text
        this.setState({profile})
    }

    toggleEdit(name){
        const{editing}=this.state

        this.setState({editing:!editing?name:null})
    }
    renderEdit(name){

        const {profile,editing}=this.state;
        if(editing===name){
            return (
                <TextInput
                defaultValue={profile[name]}
                onChangeText={text=>this.handleEdit([name],text)}/>
            )
        }
        return <Text bold>{profile[name]}</Text>

    }

  render() {
    const {navigation}=this.props
    const {profile,editing}=this.state

    return (
        <Block>
        <Block flex={false} row center space="between" style={styles.header}>

          
        <Text h1 bold> Settings</Text>
        <TouchableOpacity>
            <Image source={profile.avatar}
            style={styles.avatar}/>
        </TouchableOpacity>
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.inputs}>
                <Block row space='between' margin={[10,0]} style={styles.inputRow}>
                    <Block>
                        <Text gray style={{marginBottom:10}}> Username
                        </Text>
                        {this.renderEdit('userName')}
                    </Block>
                    <Text bold secondary onPress={()=>this.toggleEdit('userName')}>
                        {editing==='userName'?'Save':'Edit'}
                    </Text>
                </Block>
                <Block row space='between' margin={[10,0]} style={styles.inputRow}>
                    <Block>
                        <Text gray style={{marginBottom:10}}> Location

                        </Text>
     {this.renderEdit('location')}
                    </Block>
                    <Text bold secondary onPress={()=>this.toggleEdit('location')}>
                        {editing==='location'?'Save':'Edit'}
                    </Text>
                </Block>
                <Block row space='between' margin={[10,0]} style={styles.inputRow}>
                    <Block>
                        <Text gray style={{marginBottom:10}}> Email

                        </Text>
                        <Text bold> hermione@gmail.com</Text>
                    </Block>
                    
                </Block>

            </Block>
            <Divider margin={[10]}/>
            <Block style={styles.slider}>
                <Block margin={[10,0]}>
                    <Text gray style={{marginBottom:10}}> Budget</Text>
                    <Slider
                    minimumValue={0}
                    maximumValue={1000}
                    style={{height:19}}
                    thumbStyle={styles.thumb}
                    trackStyle={{height:6,borderRadius:6}}
                    minimumTrackTintColor={theme.colors.secondary}
                    maximumTrackTintColor="rgba(157,163,180,0.10)"
                    value={this.state.budget}
                    onValueChange={value=>this.setState({budget:value})}
                    />
                    <Text gray caption right> {this.state.budget.toFixed(0)}</Text>
                </Block>
                <Block margin={[10,0]}>
                    <Text gray style={{marginBottom:10}}> Monthly Cap</Text>
                    <Slider
                    minimumValue={0}
                    maximumValue={5000}
                    style={{height:19}}
                    thumbStyle={styles.thumb}
                    trackStyle={{height:6,borderRadius:6}}
                    minimumTrackTintColor={theme.colors.secondary}
                    maximumTrackTintColor="rgba(157,163,180,0.10)"
                    value={this.state.monthly_cap}
                    onValueChange={value=>this.setState({monthly_cap:value})}
                    />
                    <Text gray caption right> {this.state.monthly_cap.toFixed(0)}</Text>

                </Block>
            </Block>

            <Divider margin={[10]}/>
            <Block style={styles.toggles}>
                <Block row center space="between" margin={[10,0]}>
                    <Text gray body >Notifications</Text>
                    <Switch
                    value={this.state.notifications}
                    onValueChange={value=>this.setState({notifications:value})}/>
                </Block>
                <Block row center space="between" margin={[10,0]}>
                    <Text gray body >Newsletter</Text>
                    <Switch
                    value={this.state.newletter}
                    onValueChange={value=>this.setState({newletter:value})}/>
                </Block>
            </Block>

            
        </ScrollView>
        </Block>
    );
  }
}

Settings.defaultProps={
    profile:mocks.profile
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
    inputs:{
        paddingHorizontal:theme.sizes.base*2,
        marginTop:theme.sizes.base*0.7

    },
    inputRow:{
        alignItems:'flex-end'
    },
    slider:{
        paddingHorizontal:theme.sizes.base*2,
        marginTop:theme.sizes.base*0.7
    },
    thumb:{
        width:theme.sizes.base,
        height:theme.sizes.base,
        borderRadius:theme.sizes.base,
        borderColor:'white',
        borderWidth:3,
        backgroundColor:theme.colors.secondary

    },
    toggles:{
        paddingHorizontal:theme.sizes.base*2,
        marginTop:theme.sizes.base*0.7
    }
})

export default Settings
