import React, {Component} from 'react';
import {View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import DataTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import Sizes from '../../res/values/Sizes';

export default class TimePickerButton extends Component {
    constructor(props){
        super(props);
        this.state=({
            time: new Date(),
            show: false,
            selectedTime:'',
        });
    }

    // async componentDidUpdate(prevProps){
    //     if(this.props.defaultItem != prevProps.defaultItem){
    //         await this.setState({
    //             date: new Date(this.props.defaultItem),
    //         })
    //     }
    // }

    // resetTime=()=>{
    //     this.setState({
    //         selectedTime:'',
    //         time: new Time(),
    //     })
    // }

    handleOnChange = (event, selectedTime)=>{
        if(event.type=="set"){
            const inputTime = moment(selectedTime).format('HH:mm');
            this.setState({
                time:selectedTime,
                selectedTime:inputTime,
                show:false});
                this.props.onChange(inputTime);
        }
        else if(event.type=="dismissed"){
            this.setState({
                show:false});
        }
    }

    render(){
        return(
           <View style={[styles.container,{borderColor:this.props.borderColor,backgroundColor:this.props.disable?"#afafaf":"transparent"}]}>
                <TouchableOpacity disabled={this.props.disable} style={{paddingHorizontal:15,paddingVertical:10}} onPress={()=>this.setState({show:true})}>
                    <Text style={{fontSize:Sizes.h28,color:this.props.disable?"white":"black"}}>{(this.state.selectedTime==''?this.props.placeHolder:this.state.selectedTime)}</Text>
                </TouchableOpacity>
                {this.state.show && (
                <DataTimePicker
                  testID="TimePicker"
                  value={this.state.time}
                  minimumTime={this.props.minimumTime}
                  mode='time'
                  display="clock"
                  onChange={this.handleOnChange}
                />
                )}
           </View>
            
        )
    }
}

const styles = new StyleSheet.create({
    container:{
        borderWidth:1,
        backgroundColor:"transparent",
        borderRadius: Sizes.s15,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginHorizontal:"2%"
    }
})
