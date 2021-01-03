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
import TimePickerButton from '../home/TimePicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Title from '../home/title';
import moment from 'moment';
import {
  arrayIsEmpty,
  objectIsNull,
} from '@dungdang/react-native-basic/src/Functions';
import Sizes from '../../res/values/Sizes';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

export default class changeBHScreen extends Component {
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
      tenLopHoc: '',
      giangVien: '',
      date: '',
      timeFrom: '',
      timeTo: '',
      selectedRoomError: true,
      selectedBuildingError: true,
      tenLopHocError: true,
      giangVienError: true,
      dateError: true,
      timeFromError: true,
      timeToError: true,
    };
    this.taoLopHoc = this.taoLopHoc.bind(this);
    this.resetTime = React.createRef();
  }

  componentDidMount() {
    this.props.getBuildingRoomAction();
  }

  kiemTraDate() {
    console.log(this.state.date);
    if (this.state.date == '') {
      this.setState({dateError: false});
      return false;
    } else {
      this.setState({dateError: true});
      return true;
    }
  }

  kiemTratimeFrom() {
    if (this.state.timeFrom == '') {
      this.setState({timeFromError: false});
      return false;
    } else {
      this.setState({timeFromError: true});
      return true;
    }
  }

  kiemTraTimeTo() {
    console.log(this.state.timeTo);
    if (this.state.timeTo == '') {
      this.setState({timeToError: false});
      return false;
    } else {
      this.setState({timeToError: true});
      return true;
    }
  }
  kiemTraLop() {
    if (this.state.tenLopHoc.trim() === '') {
      this.setState({tenLopHocError: false});
      return false;
    } else {
      this.setState({tenLopHocError: true});
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

  KiemTraToaNha() {
    if (this.state.selectedRoom == '') {
      this.setState({selectedBuildingError: false});
      return false;
    } else {
      this.setState({selectedBuildingError: true});
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

  taoLopHoc() {
    console.log("aaaa");
    console.log(this.props.course);
    var className = this.state.tenLopHoc.trim();
    console.log(className);
    var trainer = this.state.giangVien.trim();
    console.log(trainer);
    var date = this.state.date;
    console.log(date);
    var startedTime = this.state.timeFrom;
    console.log(startedTime);
    var endedTime = this.state.timeTo;
    console.log(endedTime);
    var buildingId = this.state.selectedBuilding;
    console.log(buildingId);
    var roomId = this.state.selectedRoom;
    console.log(roomId);
    if (
      !this.kiemTraGiangVien() |
      !this.kiemTraPhongHoc() |
      !this.kiemTraLop() |
      !this.kiemTraDate() |
      !this.kiemTratimeFrom() |
      !this.kiemTraTimeTo() |
      !this.KiemTraToaNha()
    ) {
      return;
    }
    this.props.postClassAction(
    this.props.course.courseId,
    className,
    trainer,
    date,
    startedTime,
    endedTime,
    buildingId,
    roomId,
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.building != this.props.building) {
      if (!objectIsNull(this.props.building)) {
        if (!arrayIsEmpty(this.props.building.data)) {
          var convertArray = this.props.building.data.map(function (obj) {
            console.log('gfdsfs');
            return {
              key: obj._id,
              label: obj.buildingName,
              value: obj.buildingName,
            };
          });
          this.setState({building: convertArray});
        }
      }
    }
    if (prevProps.class !== this.props.class) {
      if (this.props.class.resultCode === -1) {
        Alert.alert('Lỗi', this.props.class.message);
      }
      if (this.props.class.resultCode === 1) {
        Alert.alert('Thông báo', this.props.class.message, [
          {
            text: 'OK',
            onPress: () => {
              this.props.getClassByCourseAction(this.props.course.courseId);
              this.props.navigation.goBack()            
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

          <Text style={styles.titles}>TẠO BUỔI HỌC MỚI</Text>

          <TouchableOpacity
          //onPress={() => this.props.navigation.navigate('Home2')}
          >
            <Icon style={styles.plus} name="plus" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.items}>
            <Title title="Tên lớp" error={this.state.tenLopHocError} />
            <TextInput
              style={[
                styles.textInput,
                {borderColor: !this.state.tenLopHocError ? '#ff0000' : '#000'},
              ]}
              placeholder="Nhập tên lớp học"
              onChangeText={(tenLopHoc) => {
                this.setState({
                  tenLopHoc: tenLopHoc,
                });
              }}
              onBlur={() => {
                if (this.state.tenLopHoc.trim() != '') {
                  this.setState({tenLopHocError: true});
                }
              }}>
              <Text>{this.state.tenLopHoc}</Text>
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

          <View style={styles.items}>
            <Title
              Style={{marginHorizontal: '2%'}}
              title="Ngày"
              error={this.state.dateError}
            />
            <DateTimePickerButton
              borderColor={!this.state.dateError ? '#ff0000' : '#000'}
              placeHolder="Chọn ngày"
              onChange={(value) => {
                this.setState({
                  date:
                    value.split('/').reverse().join('-').toString() +
                    'T00:00:00.000Z',
                  dateError: true,
                });
              }}
            />
          </View>

          <View
            style={[
              styles.items,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View style={{flex: 3}}>
              <Title
                Style={{marginHorizontal: '2%'}}
                title="Giờ bắt đầu"
                error={this.state.timeFromError}
              />
              <TimePickerButton
                //defaultItem={this.state.timeFrom}
                //minimumTime={new Time(this.state.timeFrom)}
                borderColor={!this.state.timeFromError ? '#ff0000' : '#000'}
                placeHolder="Chọn giờ bắt đầu"
                onChange={(value) => {
                  this.setState({
                    timeFrom:
                      value.split('/').reverse().join('-').toString(),
                    timeFromError: true,
                  });
                  {
                    let from = new Date(this.state.timeFrom);
                    let to = new Date(this.state.timeTo);
                    if (from > to) {
                      console.log('clear');
                      this.setState({timeTo: ''});
                      this.resetTime.current.resetTime();
                    }
                  }
                }}
              />
            </View>

            <View style={{flex: 3}}>
              <Title
                Style={{marginHorizontal: '2%'}}
                title="Giờ kết thúc"
                error={this.state.timeToError}
              />
              <TimePickerButton
                ref={this.resetTime}
                defaultItem={this.state.timeTo}
                borderColor={!this.state.timeToError ? '#ff0000' : '#000'}
                //minimumTime={new Time(this.state.timeFrom)}
                placeHolder="Chọn giờ kết thúc"
                onChange={(value) =>
                  this.setState({
                    timeTo:
                      value.split('/').reverse().join('-').toString(),
                    timeToError: true,
                  })
                }
              />
            </View>
          </View>
          <View style={{flex: 2, padding: 5}}>
            <View style={{flex: 2}}>
              <Title title="Tòa nhà" error={this.state.selectedBuildingError} />
              <Picker
                data={this.state.building}
                title={'Danh sách tòa nhà'}
                textColor={
                  this.state.selectedBuildingName == '' ? '#9f9f9f' : '#000'
                }
                style={{
                  borderColor: !this.state.selectedBuildingError
                    ? '#ff0000'
                    : '#000',
                }}
                label={this.state.building.buildingName}
                placeholder={
                  this.state.selectedBuildingName == ''
                    ? 'Chọn tòa nhà'
                    : this.state.selectedBuildingName
                }
                position="flex-end"
                onChangeItem={(item, index) => {
                  this.setState({
                    selectedBuilding: item.key,
                    selectedBuildingName: item.value,
                    selectedBuildingError: true,
                  });
                  this.setState((prevState) => {
                    let convertArray = this.props.building.data[index].room.map(
                      function (obj) {
                        return {
                          key: obj._id,
                          label: obj.roomName,
                          value: obj.roomName,
                        };
                      },
                    );
                    if (
                      prevState.selectedBuilding != this.state.selectedBuilding
                    ) {
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
              <Title title="Phòng" error={this.state.selectedRoomError} />
              <Picker
                data={this.state.room}
                noData={this.state.room === null ? true : false}
                title={'Danh sách phòng'}
                textColor={
                  this.state.room == null
                    ? '#fff'
                    : this.state.selectedRoomName == ''
                    ? '#9f9f9f'
                    : '#000'
                }
                style={{
                  borderColor: !this.state.selectedRoomError
                    ? '#ff0000'
                    : '#000',
                    color: '#000',
                    backgroundColor: this.state.room == null ? '#afafaf' : '#fff',

                }}
                placeholder={
                  this.state.selectedRoomName == ''
                    ? 'Chọn phòng'
                    : this.state.selectedRoomName
                }
                position="flex-end"
                onChangeItem={(item) => {
                  this.setState({
                    selectedRoom: item.key,
                    selectedRoomName: item.value,
                    selectedRoomError:true,
                  });
                }}
              />
            </View>
            <View style={{flex: 2, alignItems: 'flex-end', marginTop: 10}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.taoLopHoc()}>
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
