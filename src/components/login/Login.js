import React, {Component} from 'react';
import {
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Snackbar from 'react-native-snackbar';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: '',
      remember: false,
      openEye: false,
    };
  }

  async componentWillUnmount() {
    const value = await AsyncStorage.getItem('dataUser');
    console.log('dataUser', value);

    if (value !== null) {
      const data = JSON.parse(value);
      data.isLogin = true;
      await AsyncStorage.setItem('dataUser', JSON.stringify(data));
    }
  }

  componentDidUpdate(prevProps) {
    if ((this.props.data !== null) & (this.props.data !== prevProps.data)) {
      this.props.navigation.navigate('Home');
    }
    if ((this.props.error !== null) & (this.props.error !== prevProps.error)) {
      Snackbar.show({
        text: this.props.error,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  onPressLogin = () => {
    this.props.navigation.navigate('LoginContainer');
    //return;
    // so sanh gia tri dang nhap
    console.log('zzzz');
    if (
      (this.state.userName.trim() === '') |
      (this.state.passWord.trim() === '')
    ) {
      console.log('zzzz');
      Snackbar.show({
        text: 'Kiểm tra thông tin đăng nhập !',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else this.props.loginAction(this.state.userName, this.state.passWord);
    this._storeData(this.state);
    {
    }
  };

  componentDidMount() {
    console.log('action :', 'Login');
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('dataUser');
      console.log('dataUser', value);

      if (value !== null) {
        const data = JSON.parse(value);

        await this.setState({
          username: data.userName,
          isCheck: data.isCheck,
          isLogin: data.isCheck,
        });

        if (data.isLogin) {
          if (data.passWord !== '')
            this.props.loginAction(data.userName, data.passWord);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  _storeData = async (data) => {
    try {
      AsyncStorage.clear();
      console.log('có', data);
      if (this.state.isCheck) {
        await this.setState(data);
        await AsyncStorage.setItem('dataUser', JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  onChangeText = (text) => {
    this.setState({userName: text});
  };

  onChangeTextPass = (text) => {
    this.setState({passWord: text});
  };

  onPress = () => {
    this.setState({remember: !this.state.remember});
  };

  onPressEye = () => {
    this.setState({openEye: !this.state.openEye});
  };

  render() {
    return (
        <SafeAreaView style={styles.allView}>
          <ScrollView  contentContainerStyle={{flexGrow:1}}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                style={styles.logo}
                source={require('../../res/images/ic_fpt_is.png')}
              />

              <Text style={styles.slogan}>FIS INSIGHT PORTAL</Text>

              <Image
                style={styles.logo2}
                source={require('../../res/images/stripe.png')}
              />

              <Text style={styles.slogin}>ĐĂNG NHẬP HỆ THỐNG</Text>
            </View>

            <View style={styles.body}>
              <View style={styles.sectionUser}>
                <Icon style={styles.iconUser} name="user-alt" />
                <TextInput
                  style={styles.user}
                  onChangeText={this.onChangeText}
                  placeholder="Tài khoản"
                  defaultValue={this.state.userName}
                />
                <Icon style={styles.iconUser2} name="user-alt" />
              </View>

              <View style={styles.sectionPass}>
                <Icon style={styles.iconPass} name="lock" />

                <TextInput
                  style={styles.pass}
                  onChangeText={this.onChangeTextPass}
                  placeholder="Mật khẩu"
                  secureTextEntry={this.state.openEye ? false : true}
                />

                <TouchableWithoutFeedback onPress={this.onPressEye}>
                  <Icon
                    style={styles.iconEyes}
                    name={this.state.openEye ? 'eye' : 'eye-slash'}
                  />
                </TouchableWithoutFeedback>
              </View>

              <View style={styles.crileCheck}>
                <TouchableOpacity
                  style={styles.checkBox}
                  onPress={this.onPress}>
                  <Icon
                    style={styles.iconBox}
                    name={this.state.remember ? 'check-circle' : 'circle'}
                  />
                </TouchableOpacity>

                <Text style={styles.txtBox}>Ghi nhớ đăng nhập</Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={this.onPressLogin}>
                <Text style={styles.bnlogin}>ĐĂNG NHẬP</Text>
              </TouchableOpacity>

              <View style={styles.viewfooter}>
                <Image
                  style={styles.footer}
                  source={require('../../res/images/swipe.png')}
                /> 
                <Text style={styles.txtfooter}>
                  Copyright © 2019, FPT Information System
                </Text>
              </View>
            </View>
          </View>
          </ScrollView>
        </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  allView:{
    flex:1,
  },
  container: {
    flex:1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:20
    //backgroundColor:'red'
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    margin: 20,
  },
  logo2: {
    height: 5,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slogan: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#385274',
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    //backgroundColor:'blue'
  },
  slogin: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#F6A136',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 13,
  },
  viewfooter: {
    flex: 2,
    alignItems: 'center',
    //backgroundColor:'yellow'
  },
  footer: {
    marginTop: 60,
    alignItems: 'center',
    height: 150,
    width: 260,
    paddingBottom:50,
    marginBottom: 50
  },
  sectionUser: {
    //flex: 1,
    width:300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:15
  },
  iconUser: {
    padding: 10,
    color: '#B2BCC7',
    backgroundColor: '#E8E9EC',
    fontSize: 19,
    marginBottom: 10,
  },
  iconUser2: {
    padding: 10,
    color: '#E8E9EC',
    backgroundColor: '#E8E9EC',
    fontSize: 19,
    marginBottom: 10,
  },
  user: {
    flex: 1,
    backgroundColor: '#E8E9EC',
    height: 40,
    textAlign: 'center',
    borderColor: '#E8E9EC',
    marginTop: 10,
    marginBottom: 20,
  },
  sectionPass: {
    //flex: 1,
    width:300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:15
  },
  iconPass: {
    padding: 10,
    color: '#B2BCC7',
    backgroundColor: '#E8E9EC',
    fontSize: 19,
    marginBottom: 20,
  },
  pass: {
    flex: 1,
    backgroundColor: '#E8E9EC',
    textAlign: 'center',
    height: 40,
    borderColor: '#E8E9EC',
    marginBottom: 20,
  },
  iconEyes: {
    padding: 10,
    color: '#B2BCC7',
    backgroundColor: '#E8E9EC',
    fontSize: 19,
    marginBottom: 20,
  },
  button: {
    height: 40,
    alignItems: 'center',
    backgroundColor: '#FF9335',
    padding: 5,
    borderRadius: 5,
    width:300,
    marginLeft:15
  },
  bnlogin: {
    color: '#FFFCEA',
    fontSize: 20,
    fontWeight: 'bold',
  },
  txtfooter: {

    textAlign: 'center',
    paddingTop:50,
    color: '#B0B7C1',
  },
  checkBox: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  iconBox: {
    fontSize: 20,
    color: '#F6A135',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
  txtBox: {
    fontSize: 20,
    color: '#F6A135',
    fontStyle: 'italic',
  },
  crileCheck: {
    flexDirection: 'row',
    //marginBottom: 3
    marginLeft:15
  },
});
