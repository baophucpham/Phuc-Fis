import React, {Component} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import Picker from '../home/PickerItem';
import DateTimePickerButton from '../home/DatetimePickerButtom';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Title from '../home/title';
import moment from 'moment';
import {
  arrayIsEmpty,
  objectIsNull,
} from '@dungdang/react-native-basic/src/Functions';
import Sizes from '../../res/values/Sizes';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';


export default class changeKHScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      building: [],
      room: [],
      id: '',
      selectedRoom: '',
      selectedRoomName: '',
      selectedBuilding: '',
      selectedBuildingName: '',
      tenKhoaHoc: '',
      giangVien: '',
      dateFrom: '',
      dateTo: '',
      selectedRoomError: true,
      selectedBuildingError: true,
      tenKhoaHocError: true,
      giangVienError: true,
      dateFromError: true,
      dateToError: true,
    };
    this.resetDate = React.createRef();
  }

  componentDidMount() {
    this.props.getBuildingRoomAction();
    const {navigation} = this.props;
    const a = navigation.getParam('data', 'no-data');
    console.log('item sss', a);
    this.setState({
      id: a.course_id,
      tenKhoaHoc: a.courseName,
      giangVien: a.trainer,
      dateTo: a.endedDate,
      dateFrom: a.startedDate,
      selectedRoomName: a.roomName,
      selectedRoom: a.roomId,
      selectedBuilding: a.buildingId,
      selectedBuildingName: a.buildingName,
    });
    console.log(a.courseName);
  }

  kiemTraDateTo() {
    console.log(this.state.dateTo);
    if (this.state.dateTo == '') {
      this.setState({dateToError: false});
      return false;
    } else {
      this.setState({dateToError: true});
      return true;
    }
  }
  kiemTraTenKhoa() {
    if (this.state.tenKhoaHoc.trim() === '') {
      this.setState({tenKhoaHocError: false});
      return false;
    } else {
      this.setState({tenKhoaHocError: true});
      return true;
    }
  }

  kiemTraGiangVien() {
    if (this.state.giangVien.trim() === '') {
      this.setState({giangVienError: false});
      return false;
    } else {
      this.setState({giangVienError: true});
      return true;
    }
  }

  kiemTraPhongHoc() {
    if (this.state.selectedRoom == '') {
      this.setState({selectedRoomError: false});
      return false;
    } else {
      this.setState({selectedRoomError: true});
      return true;
    }
  }

  doiKhoaHoc() {
    if (
      !this.kiemTraGiangVien() |
      !this.kiemTraPhongHoc() |
      !this.kiemTraTenKhoa() |
      !this.kiemTraDateTo()
    ) {
      return;
    }
    this.props.postChangeCourseAction(
      this.state.id,
      this.state.tenKhoaHoc.trim(),
      this.state.giangVien.trim(),
      this.state.dateFrom,
      this.state.dateTo,
      this.state.selectedBuilding,
      this.state.selectedRoom,
    );
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.building != this.props.building) {
      if (!objectIsNull(this.props.building)) {
        if (!arrayIsEmpty(this.props.building.data)) {
          var convertArray = this.props.building.data.map(function (obj) {
            return {
              key: obj._id,
              label: obj.buildingName,
              value: obj.buildingName,
            };
          });
          await this.setState({building: convertArray});
          for (let i = 0; i < this.state.building.length; i++) {
            if (this.state.selectedBuilding === this.state.building[i].key) {
              let convertArray = this.props.building.data[i].room.map(function (
                obj,
              ) {
                return {key: obj._id, label: obj.roomName, value: obj.roomName};
              });
              this.setState({
                room: convertArray,
              });
              break;
            }
          }
        }
      }
    }

    if (prevProps.changeCourse != this.props.changeCourse) {
      if (this.props.changeCourse.result.resultCode === -1) {
        Alert.alert('Lỗi', this.props.changeCourse.result.message);
      }
      if (this.props.changeCourse.result.resultCode === 1) {
        this.props.getCourseAction();
        Alert.alert('Thông báo', this.props.changeCourse.result.message, [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.navigate('Home');
            },
          },
        ]);
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon style={styles.chevLeft} name="chevron-left" />
          </TouchableOpacity>

          <Text style={styles.titles}>CẬP NHẬT KHÓA HỌC</Text>

          <TouchableOpacity
          //onPress={() => this.props.navigation.navigate('Home2')}
          >
            <Icon style={styles.plus} name="plus" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.items}>
            <Title title="Tên khóa" error={this.state.tenKhoaHocError} />
            <TextInput
              style={[
                styles.textInput,
                {borderColor: !this.state.tenKhoaHocError ? '#ff0000' : '#000'},
              ]}
              placeholder="Nhập tên khóa học"
              onChangeText={(tenKhoaHoc) => {
                this.setState({
                  tenKhoaHoc: tenKhoaHoc,
                });
              }}
              onBlur={() => {
                if (this.state.tenKhoaHoc.trim() != '') {
                  this.setState({tenKhoaHocError: true});
                }
              }}>
              <Text>{this.state.tenKhoaHoc}</Text>
            </TextInput>
          </View>
          <View style={styles.items}>
            <Title title="Giảng viên" error={this.state.giangVienError} />
            <TextInput
              style={[
                styles.textInput,
                {borderColor: !this.state.giangVienError ? '#ff0000' : '#000'},
              ]}
              placeholder="Nhập tên giảng viên"
              onChangeText={(giangVien) => {
                this.setState({
                  giangVien: giangVien,
                });
              }}
              onBlur={() => {
                if (this.state.giangVien.trim() != '') {
                  this.setState({giangVienError: true});
                }
              }}>
              <Text>{this.state.giangVien}</Text>
            </TextInput>
          </View>
          <View
            style={[
              styles.items,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View style={{flex: 3}}>
              <Title Style={{marginHorizontal: '2%'}} title="Từ ngày" />
              <DateTimePickerButton
                borderColor={!this.state.dateFromError ? '#ff0000' : '#000'}
                defaultItem={this.state.dateFrom}
                placeHolder={moment(this.state.dateFrom).format('DD/MM/YYYY')}
                onChange={(value) => {
                  this.setState({
                    dateFrom:
                      value.split('/').reverse().join('-').toString() +
                      'T00:00:00.000Z',
                    dateFromError: true,
                  });
                  {
                    let from = new Date(this.state.dateFrom);
                    let to = new Date(this.state.dateTo);
                    if (from > to) {
                      this.setState({dateTo: ''});
                      this.resetDate.current.resetDate();
                    }
                  }
                }}
              />
            </View>

            <View style={{flex: 3}}>
              <Title
                Style={{marginHorizontal: '2%'}}
                title="Đến ngày"
                error={this.state.dateToError}
              />
              <DateTimePickerButton
                ref={this.resetDate}
                defaultItem={this.state.dateTo}
                borderColor={!this.state.dateToError ? '#ff0000' : '#000'}
                minimumDate={new Date(this.state.dateFrom)}
                placeHolder={
                  this.state.dateTo == ''
                    ? 'Chọn ngày kết thúc'
                    : moment(this.state.dateTo).format('DD/MM/YYYY')
                }
                onChange={(value) =>
                  this.setState({
                    dateTo:
                      value.split('/').reverse().join('-').toString() +
                      'T00:00:00.000Z',
                    dateToError: true,
                  })
                }
              />
            </View>
          </View>
          <View style={{flex: 2, padding: 5}}>
            <View style={{flex: 2}}>
              <Title title="Tòa nhà" />
              <Picker
                defaultItem={{
                  key: this.state.selectedBuilding,
                  label: this.state.selectedBuildingName,
                  value: this.state.selectedBuildingName,
                }}
                data={this.state.building}
                title={'Danh sách tòa nhà'}
                style={{
                  borderColor: !this.state.selectedBuildingError
                    ? '#ff0000'
                    : '#000',
                }}
                placeholder={this.state.selectedBuildingName}
                position="flex-end"
                onChangeItem={(item, index) => {
                  this.setState({
                    selectedBuilding: item.key,
                    selectedBuildingName: item.value,
                  });
                  this.setState((prevState) => {
                    if (
                      prevState.selectedBuilding != this.state.selectedBuilding
                    ) {
                      let convertArray = this.props.building.data[
                        index
                      ].room.map(function (obj) {
                        return {
                          key: obj._id,
                          label: obj.roomName,
                          value: obj.roomName,
                        };
                      });
                      return {
                        selectedRoom: '',
                        selectedRoomName: '',
                        room: convertArray,
                      };
                    }
                  });
                }}
              />
            </View>
            <View style={[{flex: 2, paddingTop: 10}]}>
              <Title title="Phòng" />
              <Picker
                data={this.state.room}
                title={'Danh sách phòng'}
                style={{
                  borderColor: !this.state.selectedRoomError
                    ? '#ff0000'
                    : '#000',
                }}
                placeholder={
                  this.state.selectedRoomName == ''
                    ? 'Chọn phòng'
                    : this.state.selectedRoomName
                }
                position="flex-end"
                defaultItem={{
                  key: this.state.selectedRoom,
                  label: this.state.selectedRoomName,
                  value: this.state.selectedRoomName,
                }}
                onChangeItem={(item) => {
                  this.setState({
                    selectedRoom: item.key,
                    selectedRoomName: item.value,
                  });
                }}
              />
            </View>
            <View style={{flex: 2, alignItems: 'flex-end', marginTop: 10}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.doiKhoaHoc()}>
                <FontAwesome5
                  name="save"
                  color="#fff"
                  size={15}
                  style={{padding: 10}}
                />
                <Text style={{color: '#fff', fontSize: 15, paddingRight: 10}}>
                  Lưu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
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
  titles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#294D6A',
    marginLeft: 65,
    marginRight: 65,
  },
  chevLeft: {
    fontSize: 20,
    color: '#D0D4D7',
  },
  plus: {
    fontSize: 25,
    color: '#FFFFFF',
  },
  scrollView: {
    padding: 20,
  },
  textInput: {
    borderWidth: 1.1,
    paddingRight: 25,
    paddingLeft: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: Sizes.s15,
    fontSize: Sizes.h28,
  },
  items: {
    padding: 7,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ff9335',
    borderRadius: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 20,
    paddingVertical: 5,
    elevation: 5,
  },
});
