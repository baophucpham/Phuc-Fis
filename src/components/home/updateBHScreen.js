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

export default class updateBHScreen extends Component {
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
    this.resetTime = React.createRef();
  }

  componentDidMount() {
    this.props.getBuildingRoomAction();
    const {navigation} = this.props;
    const a = navigation.getParam('data', 'no-data');
    console.log('item change class:', a);
    this.setState({
      id: a.classId,
      tenLopHoc: a.className,
      giangVien: a.trainer,
      date: a.date,
      timeFrom: a.startedTime,
      timeTo: a.endedTime,
      selectedBuilding: a.buildingId,
      selectedBuildingName: a.buildingName,
      selectedRoom: a.roomId,
      selectedRoomName: a.roomName,
    });
    console.log(a.className);
  }

  kiemtraTimeFrom(){
    if (this.state.timeFrom == '') {
      this.setState({timeFromError:false});
      return false;
    }else{
      this.setState({timeFromError:true});
      return true;
    }
  }

  kiemtraTimeTo(){
    console.log(this.state.timeTo);
    if(this.state.timeTo == '') {
      this.setState({timeToError: false});
      return false;
    }else{
      this.setState({timeToError:true});
      return true;
    }
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

  updateLopHoc() {
    if(
      !this.kiemTraLop()|
      !this.kiemTraGiangVien()|
      !this.kiemTraDate()|
      !this.kiemtraTimeFrom()|
      !this.kiemtraTimeTo()|
      !this.KiemTraToaNha()|
      !this.kiemTraPhongHoc()
    ) {
      return;
    }
    // this.props.updateClassAction(
    //   this.state.id,
    //   console.log('ID ne',this.state.id),
    //   this.state.tenLopHoc,
    //   console.log('tên lớp',this.state.tenLopHoc),
    //   this.state.giangVien,
    //   console.log('tên giảng viên',this.state.giangVien),
    //   this.state.date,
    //   console.log('ngày',this.state.date),
    //   this.state.timeFrom,
    //   console.log('giờ bđ',this.state.timeFrom),
    //   this.state.timeTo,
    //   console.log('giờ kt',this.state.timeTo),
    //   this.state.selectedBuilding,
    //   console.log('id tòa nhà',this.state.selectedBuilding,),
    //   this.state.selectedBuildingName,
    //   console.log('ten toa nha',this.state.selectedBuildingName),
    //   this.state.selectedRoom,
    //   console.log('id phòng',this.state.selectedRoom,),
    //   this.state.selectedRoomName,
    //   console.log('ten phong',this.state.selectedRoomName),

    // );
    this.props.updateClassAction(
      this.state.id,
      this.state.tenLopHoc,
      this.state.giangVien,
      this.state.date,
      this.state.timeFrom,
      this.state.timeTo,
      this.state.selectedBuilding,
      this.state.selectedRoom,
    );
  }

async componentDidUpdate(prevProps){
  if (prevProps.building != this.props.building) {
    if(!objectIsNull(this.props.building)){
      if(!arrayIsEmpty(this.props.building.data)){
        var convertArray = this.props.building.data.map(function(obj){
          return{
            key: obj._id,
            label: obj.buildingName,
            value: obj.buildingName,
          };
        });
        await this.setState({building: convertArray});
        for(let i = 0; i < this.state.building.length; i++){
          if(this.state.selectedBuilding === this.state.building[i].key){
            let convertArray = this.props.building.data[i].room.map(function(
              obj,
            ){
              return {key: obj._id, label: obj.roomName, value: obj.roomName};
            });
            this.setState({
              room:convertArray,
            });
            break;
          }
        }
      }
    }
  }

  if (prevProps.updateClass != this.props.updateClass){
    console.log('updateClass zzzz:', this.props.updateClass);
    if(this.props.updateClass.data.result.resultCode === -1){
      console.log('lỗi', this.props.updateClass.data.result.message);
      Alert.alert('lỗi', this.props.updateClass.data.result.message);
    }
    else if(this.props.updateClass.data.result.resultCode === 1){
      Alert.alert('Thông báo', this.props.updateClass.data.result.message,[
        {
          text :'OK',
          onPress:async()=>{
            await this.props.getClassByCourseAction(this.props.course.courseId);
            this.props.navigation.goBack()
          }
        }
      ])
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

          <Text style={styles.titles}>CẬP NHẬT BUỔI HỌC</Text>

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
              defaultItem={this.state.date}
              placeHolder={moment(this.state.date).format('DD/MM/YYYY')}
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
                Style={{marginHorizontal: '2%',}}
                title="Giờ bắt đầu"
                error={this.state.timeFromError}
              />
              <TimePickerButton
                defaultItem={this.state.timeFrom}
                borderColor={!this.state.timeFromError ? '#ff0000' : '#000'}
                placeHolder={this.state.timeFrom}
                onChange={(value) => {
                  this.setState({
                    timeFrom: value.split('/').reverse().join('-').toString(),
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
                placeHolder={this.state.timeTo}
                onChange={(value) =>
                  this.setState({
                    timeTo: value.split('/').reverse().join('-').toString(),
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
                    selectedRoomError: true,
                  });
                }}
              />
            </View>
            <View style={{flex: 2, alignItems: 'flex-end', marginTop: 10}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.updateLopHoc()}>
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
