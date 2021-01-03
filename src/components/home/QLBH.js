import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Sizes from '../../res/values/Sizes';
import moment from 'moment';
import {
  arrayIsEmpty,
  objectIsNull,
} from '@dungdang/react-native-basic/src/Functions';

class MenuEdit extends React.PureComponent {
  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu() {
    this._menu.hide();
  }

  showMenu = () => {
    this._menu.show();
  };

  onEditPress = () => {
    this.props.onEditPress(item);
  };

  render() {
    return (
      <Menu
        ref={this.setMenuRef}
        button={
          <TouchableWithoutFeedback
            onPress={this.showMenu}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            <Icon
              name="ellipsis-v"
              size={Sizes.h40}
              style={{
                paddingTop: 2,
                paddingLeft: 20,
              }}
              color="#566067"
            />
          </TouchableWithoutFeedback>
        }>
        <MenuItem
          onPress={() => {
            this.props.onEditPress();
            this._menu.hide();
          }}>
          <Icon name="edit" size={18} /> Cập nhật
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onPress={() => {
            this.props.onRemovePress();
            this._menu.hide();
          }}>
          <Icon name="trash-alt" size={18} /> Xóa
        </MenuItem>
      </Menu>
    );
  }
}

export default class QlBHScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      dataClass: [],
      numberItem: 5,
      id: '',
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const data = navigation.getParam('data', 'no-data');
    this.props.getClassByCourseAction(data.course_id);
    console.log('item data', data);
    this.setState({
      data: data,
      id: data.course_id,
      tenKhoaHoc: data.courseName,
    });
  }

  // async componentDidUpdate(prevProps) {
  //   if (
  //     (this.props.class.data !== null) &
  //     (this.props.class.data !== prevProps.class.data)
  //   ) {
  //     await this.setState({dataClass: this.props.class.data.data});
  //   }
  //   if (
  //     (this.props.class.error !== null) &
  //     (this.props.class.error !== prevProps.class.error)
  //   ) {
  //     Alert.alert('thông báo', this.props.class.error);
  //   }
  //   if (
  //     (this.props.dataDelete !== null) &
  //     (this.props.dataDelete !== prevProps.dataDelete)
  //   ) {
  //     Snackbar.show({
  //       text: 'xóa Thành Công !',
  //       duration: Snackbar.LENGTH_SHORT,
  //     });
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.class != this.props.class) {
      this.setState({
        loading: false,
      });
      if (!objectIsNull(this.props.class)) {
        if (!arrayIsEmpty(this.props.class.data)) {
          this.setState({
            dataClass: this.props.class.data.data,
            loading: true,
            nullClass: false,
          });
        } else {
          this.setState({
            nullClass: true,
          });
        }
      }
    }
    if (this.props.dataDelete != prevProps.dataDelete) {
      Snackbar.show({
        text: 'xóa Thành Công !',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  deleteItemById(classId) {
    console.log('class_id:', classId);
    Alert.alert(
      'xóa khóa học',
      'Bạn đã chắc chưa ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const filteredData = this.state.dataClass.filter(
              (item) => item.classId !== classId,
            );
            this.setState({dataClass: filteredData});

            this.props.deleteClassAction(classId);
          },
        },
      ],
      {cancelable: true},
    );
  }

  loadMore = () => {
    this.setState({numberItem: this.state.numberItem + 10});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon style={styles.chevLeft} name="chevron-left" />
          </TouchableOpacity>

          <Text style={styles.titles}>QUẢN LÝ BUỔI HỌC</Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('changeBHScreen')}>
            <Icon style={styles.plus} name="plus" />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Text style={styles.title2}>{this.state.tenKhoaHoc}</Text>

          <FlatList
            data={this.state.dataClass}
            renderItem={({item, index}) => {
              console.log('item', item);
              return (
                <TouchableOpacity style={styles.container2}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={styles.title}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.className}
                    </Text>
                    <MenuEdit
                      onRemovePress={() => this.deleteItemById(item.classId)}
                      onEditPress={() => {
                        this.props.navigation.navigate('updateBHScreen', {
                          data: item,
                        });
                        console.log('COURSE: ', item);
                      }}
                      //onEditPress={this.onEditPress}
                      //courseName={item.courseName}
                    />
                  </View>
                  <View style={{paddingTop: 20}}>
                    <View style={styles.info}>
                      <FontAwesome5
                        name={'user-tie'}
                        color="#FFD237"
                        size={20}
                        style={{padding: 5, paddingRight: 20}}
                      />
                      <View style={styles.info}>
                        <Text style={styles.infoText}
                        >Giảng viên: </Text>
                        <Text style={[styles.title5, {color: '#42C8FB', }]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        >
                          {item.trainer}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.info}>
                      <FontAwesome5
                        name={'address-card'}
                        color="#412F4E"
                        size={20}
                        style={{padding: 5, paddingRight: 15}}
                      />
                      <View style={styles.info}>
                        <Text style={styles.infoText}>Cán bộ quản lý: </Text>
                        <Text style={[styles.infoText2, {color: '#FF9226'}]}>
                          {item.created_by}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.info}>
                      <FontAwesome5
                        name={'calendar-check'}
                        color="#42C8FB"
                        size={20}
                        style={{padding: 5, paddingRight: 20}}
                      />
                      <View style={styles.info}>
                        <Text style={styles.infoText}>Ngày: </Text>
                        <Text style={[styles.infoText2, {color: '#3A4C5E'}]}>
                          {moment(item.date).format('DD/MM/YYYY')} -{' '}
                          {moment(item.last_modified).format('DD/MM/YYYY')}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.info}>
                      <FontAwesome5
                        name={'clock'}
                        color="#DD5B6F"
                        size={20}
                        style={{padding: 5, paddingRight: 20}}
                      />
                      <View style={styles.info}>
                        <Text style={styles.infoText}>Thời gian: </Text>
                        <Text style={[styles.infoText2, {color: '#DD5B6F'}]}>
                          {item.startedTime} - {item.endedTime}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.info}>
                      <FontAwesome5
                        name={'building'}
                        color="#0090D7"
                        size={20}
                        style={{padding: 5, paddingRight: 20}}
                      />
                      <View style={styles.info}>
                        <Text style={styles.infoText}>Tòa nhà: </Text>
                        <Text style={[styles.infoText2, {color: '#3A4C5E'}]}>
                          {item.buildingName}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.info}>
                      <FontAwesome5
                        name={'chalkboard-teacher'}
                        color="#FF9226"
                        size={20}
                        style={{padding: 5, paddingRight: 15}}
                      />
                      <View style={styles.info}>
                        <Text style={styles.infoText}>Phòng: </Text>
                        <Text style={[styles.infoText2, {color: '#3A4C5E'}]}>
                          {item.roomName}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.info}>
                      <FontAwesome5
                        name={'wifi'}
                        color="#1DBD8F"
                        size={20}
                        style={{padding: 5, paddingRight: 15}}
                      />
                      <View style={styles.info}>
                        <Text style={styles.infoText}>WiFi: </Text>
                        <Text style={[styles.infoText2, {color: '#3A4C5E'}]}>
                          {item.wifi}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.loadMore}
            onRefresh={() => this.props.getClassByCourseAction(this.state.id)}
            refreshing={this.props.class.loading}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  header: {
    flexDirection: 'row',
    height: 70,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: 0, height: 13},
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3,
  },
  chevLeft: {
    fontSize: 20,
    color: '#D0D4D7',
  },

  titles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#294D6A',
    marginLeft: 65,
    marginRight: 65,
  },
  plus: {
    fontSize: 20,
    color: '#D0D4D7',
  },
  flatList: {
    flexDirection: 'column',
  },
  container2: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    flex: 12,
    color: '#3A4C5E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title2: {
    //flex: 12,
    color: '#49CAFB',
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingLeft: 20,
  },

  info: {
    flex:1,
    flexDirection: 'row',
  },
  infoText: {
    fontWeight: '600',
    fontSize: 18,
    paddingTop: 4,
    color: '#4E5867',
  },
  infoText2: {
    fontSize: 18,
    paddingTop: 4,
    color: '#198BB0',
    fontWeight: 'bold',
    paddingRight:30,
  },
  body: {
    flex: 1,
  },
  title5: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#259CBC',
    paddingLeft: 5,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 6,
  },
});
