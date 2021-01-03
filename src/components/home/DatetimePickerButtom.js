import React, {Component} from 'react';
import {View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import DataTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import Sizes from '../../res/values/Sizes';

export default class DateTimePickerButton extends Component {
    constructor(props){
        super(props);
        this.state=({
            date: new Date(),
            show: false,
            selectedDate:'',
        });
    }

    async componentDidUpdate(prevProps){
        if(this.props.defaultItem != prevProps.defaultItem){
            await this.setState({
                date: new Date(this.props.defaultItem),
            })
        }
    }

    resetDate=()=>{
        this.setState({
            selectedDate:'',
            date: new Date(),
        })
    }

    handleOnChange = (event, selectedDate)=>{
        if(event.type=="set"){
            const inputDate = moment(selectedDate).format('DD/MM/YYYY');
            this.setState({
                date:selectedDate,
                selectedDate:inputDate,
                show:false});
                this.props.onChange(inputDate);
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
                    <Text style={{fontSize:Sizes.h28,color:this.props.disable?"white":"black"}}>{(this.state.selectedDate==''?this.props.placeHolder:this.state.selectedDate)}</Text>
                </TouchableOpacity>
                {this.state.show && (
                <DataTimePicker
                  testID="dateTimePicker"
                  value={this.state.date}
                  minimumDate={this.props.minimumDate}
                  mode='countdown'
                  display="default"
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
