import React, {Component} from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'

export default class FlatListItem extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.container}>
                <View style={{flexDirection:"row"}}>
                    <Text style={styles.title}>{this.props.item.baiGiang}</Text>
                    <Menu/>
                </View>
                <View style={{paddingTop:20}}>
                    <View style={styles.info}>
                        <FontAwesome5 name={'user-tie'} color='#FFD237' size={20} style={{padding:5, paddingRight:20}}/>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Giảng viên: </Text>
                            <Text style={[styles.infoText2,{color:"#42C8FB"}]}>{this.props.item.giangVien}</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <FontAwesome5 name={'address-card'} color='#412F4E' size={20} style={{padding:5, paddingRight:15}}/>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Cán bộ quản lý: </Text>
                            <Text style={[styles.infoText2,{color:"#FF9226"}]}>{this.props.item.canBo}</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <FontAwesome5 name={'calendar-check'} color='#42C8FB' size={20} style={{padding:5, paddingRight:20}}/>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Thời gian: </Text>
                            <Text style={[styles.infoText2,{color:"#3A4C5E"}]}>{this.props.item.thoiGian}</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <FontAwesome5 name={'building'} color='#0090D7' size={20} style={{padding:5, paddingRight:20}}/>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Tòa nhà: </Text>
                            <Text style={[styles.infoText2,{color:"#3A4C5E"}]}>{this.props.item.toaNha}</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <FontAwesome5 name={'chalkboard-teacher'} color='#FF9226' size={20} style={{padding:5, paddingRight:15}}/>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Phòng: </Text>
                            <Text style={[styles.infoText2,{color:"#3A4C5E"}]}>{this.props.item.phong}</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <FontAwesome5 name={'wifi'} color='#1DBD8F' size={20} style={{padding:5, paddingRight:15}}/>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Phòng: </Text>
                            <Text style={[styles.infoText2,{color:"#3A4C5E"}]}>{this.props.item.wifi}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = new StyleSheet.create({
    container:{
        padding:15,
        backgroundColor:"#fff",
        borderRadius:15,
        margin: 10,
        shadowColor:"#000000",
        shadowOffset:{
            width: 0,
	        height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    title:{
        flex: 12,
        color:"#3A4C5E",
        fontSize:20,
        fontWeight:"bold",
        
    },
    info:{
        flexDirection:"row",
    },
    infoText:{
        fontWeight:"600",
        fontSize: 18,
        paddingTop:4,
        color:"#4E5867",
    },
    infoText2:{
        fontSize: 18,
        paddingTop:4,
        color:"#198BB0",
        fontWeight:"bold"
    },
});
