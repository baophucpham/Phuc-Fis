import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import moment from 'moment';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Snackbar from 'react-native-snackbar';
import Sizes from '../../res/values/Sizes';
import NavigationService from '../../containers/NavigationService';

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
              paddingLeft: 20,
              paddingRight: 10,
            }}>
            <Icon
              name="ellipsis-v"
              size={Sizes.h40}
              style={{
                paddingTop: 15,
                paddingLeft: 30,
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

// onEditPress = (item) => {
//   console.log('COURSE: ', item);
//   this.props.navigation.navigate('changeKHScreen', item);
// }

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCourse: [],
      numberItem: 5,
    };
  }

  componentDidMount() {
    this.props.getCourseAction();
  }

  async componentDidUpdate(prevProps) {
    if ((this.props.data !== null) & (this.props.data !== prevProps.data)) {
      await this.setState({dataCourse: this.props.data.data});
      console.log('Course', this.state.dataCourse);
    }
    if ((this.props.error !== null) & (this.props.error !== prevProps.error)) {
      Alert.alert('Thông báo', this.props.error);
      console.log('Thông báo', this.props.error);
    }

    if (
      (this.props.errorRemove !== null) &
      (this.props.error !== prevProps.errorRemove)
    ) {
      //Alert.alert('Thông báo', this.props.error);
      console.log('Thông báo', this.props.error);
    }

    if (
      (this.props.dataRemove !== null) &
      (this.props.dataRemove !== prevProps.dataRemove)
    ) {
      Snackbar.show({
        text: 'Xoá thành công !',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  deleteItemById(course_id) {
    console.log('courseId:', course_id);
    Alert.alert(
      'Xóa khóa học',
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
            const filteredData = this.state.dataCourse.filter(
              (item) => item.course_id !== course_id,
            );
            this.setState({dataCourse: filteredData});

            this.props.removeCourseAction(course_id);
          },
        },
      ],
      {cancelable: true},
    );
  }

  loadMore = () => {
    this.setState({numberItem: this.state.numberItem + 10});
  };

  //   onEditPress=()=>{
  //     this.props.navigation.navigate('changeKHScreen',item);
  //     console.log(item)
  // }

  render() {
    const {item} = this.props;
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.chevLeft} name="chevron-left" />
            </TouchableOpacity>

            <Text style={styles.titles}>QUẢN LÝ KHÓA HỌC</Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home2')}>
              <Icon style={styles.plus} name="plus" />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            {/* <View style={styles.listItem}>
              <ListItem />
            </View> */}

            <FlatList
              style={styles.viewList}
              data={this.state.dataCourse}
              renderItem={({item, index}) => {
                console.log('item',item);
                return (
                
                  <TouchableOpacity
                    onPress={() =>
                      {this.props.sendCourseAction(item.course_id),
                      this.props.navigation.navigate('QlBHScreen', {data: item})}
                    }>
                    <View style={styles.viewFlatlist}>
                      <View style={styles.allTitle}>
                        <View style={styles.viewTitle}>
                          <Text style={styles.title} numberOfLines={2}>
                            {item.courseName}
                          </Text>
                        </View>

                        <MenuEdit
                          onRemovePress={() =>
                            this.deleteItemById(item.course_id)
                          }
                          onEditPress={() => {
                            this.props.navigation.navigate('changeKHScreen', {
                              data: item,
                            });
                            console.log('COURSE: ', item);
                          }}
                          //onEditPress={this.onEditPress}
                          courseName={item.courseName}
                        />
                      </View>

                      <View style={styles.viewTeacher}>
                        <Icon style={styles.icTeacher} name="user-tie" />
                        <Text style={styles.letter}> Giảng viên :</Text>
                        <Text
                          style={styles.title2}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item.trainer}
                        </Text>
                      </View>

                      <View style={styles.viewBoss}>
                        <Icon style={styles.icBoss} name="id-card" />
                        <Text style={styles.letter}>Cán bộ quản lý :</Text>
                        <Text style={styles.title3}>{item.created_by}</Text>
                      </View>

                      <View style={styles.viewTime}>
                        <Icon style={styles.icTime} name="calendar-check" />
                        <Text style={styles.letter}> Thời gian :</Text>
                        <Text style={styles.title4}>
                          {moment(item.startedDate).format('DD/MM/YYYY')} -{' '}
                          {moment(item.endedDate).format('DD/MM/YYYY')}
                        </Text>
                      </View>

                      <View style={styles.viewBuilding}>
                        <Icon style={styles.icBuilding} name="building" />
                        <Text style={styles.letter}> Tòa nhà :</Text>
                        <Text style={styles.title4}>{item.buildingName}</Text>
                      </View>

                      <View style={styles.viewRoom}>
                        <Icon style={styles.icRoom} name="chalkboard-teacher" />
                        <Text style={styles.letter}>Phòng :</Text>
                        <Text style={styles.title4}>{item.roomName}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this.loadMore}
              onRefresh={() => this.props.getCourseAction()}
              refreshing={this.props.loading}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  listItem: {
    paddingTop: 5,
  },
  container: {
    height: '100%',
    alignItems: 'center',
    //justifyContent:'center',
    //backgroundColor: '#FFFFFF',
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
  body: {
    //backgroundColor: '#FFFFFF'
  },
  viewList: {
    //backgroundColor: '#FFFFFF',
    width: 400,
    paddingLeft: 20,
    paddingTop: 10,
    marginBottom: 70,
  },
  viewFlatlist: {
    backgroundColor: '#FFFFFF',
    width: 360,
    borderRadius: 20,
    // shadowOffset: {width: 0, height: 13},
    // shadowOpacity: 0.5,
    // shadowRadius: 6,
    // // android (Android +5.0)
    // elevation: 3,
    paddingBottom: 15,
    marginBottom: 15,
    justifyContent: 'center',
  },
  allTitle: {
    flexDirection: 'row',
  },
  viewTitle: {
    flexDirection: 'row',
    width: 300,
    //backgroundColor:'blue',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#476078',
    paddingLeft: 20,
    paddingTop: 13,
    paddingBottom: 6,
  },
  icMenu: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#476078',
    paddingLeft: 30,
    paddingTop: 13,
    paddingBottom: 6,
    alignItems: 'flex-end',
  },
  letter: {
    fontSize: 15,
    color: '#6E788A',
    paddingLeft: 15,
    paddingTop: 7,
    paddingBottom: 6,
  },
  viewTeacher: {
    flexDirection: 'row',
  },
  icTeacher: {
    fontSize: 20,
    color: '#F9D631',
    paddingLeft: 20,
    paddingTop: 7,
    paddingBottom: 6,
  },
  viewBoss: {
    flexDirection: 'row',
  },
  icBoss: {
    fontSize: 20,
    color: '#412F4D',
    paddingLeft: 20,
    paddingTop: 7,
    paddingBottom: 6,
  },
  viewTime: {
    flexDirection: 'row',
  },
  icTime: {
    fontSize: 20,
    color: '#48C5F6',
    paddingLeft: 20,
    paddingTop: 7,
    paddingBottom: 6,
  },
  viewBuilding: {
    flexDirection: 'row',
  },
  icBuilding: {
    fontSize: 20,
    color: '#0C8CD3',
    paddingLeft: 20,
    paddingTop: 7,
    paddingBottom: 6,
  },
  viewRoom: {
    flexDirection: 'row',
  },
  icRoom: {
    fontSize: 20,
    color: '#F39538',
    paddingLeft: 20,
    paddingTop: 7,
    paddingBottom: 6,
  },
  title2: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#259CBC',
    paddingLeft: 5,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 6,
  },
  title3: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F39538',
    paddingLeft: 5,
    paddingTop: 7,
    paddingBottom: 6,
  },
  title4: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#50687A',
    paddingLeft: 5,
    paddingTop: 7,
    paddingBottom: 6,
  },
});
