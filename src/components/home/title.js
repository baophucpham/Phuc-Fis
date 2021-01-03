import React,{Component} from "react";
import {View,Text,StyleSheet} from "react-native";
import Sizes from "../../res/values/Sizes";

export default class title extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={[{flexDirection:"row",alignSelf:"baseline",justifyContent:"flex-end"},this.props.Style]}>
                <Text style={[{color:"#104E8B"},styles.text]}>{this.props.title}</Text>
                <Text style={[{color:"red",fontStyle:"italic"},styles.text]}> * {this.props.error== false?"Bắt buộc":""}</Text>
            </View>
        )
    }
    
}

const styles = new StyleSheet.create({
    text:{
        fontSize:Sizes.h32,
        fontWeight:"bold",
        paddingBottom:5,
    }
})
