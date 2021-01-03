import React from 'react';
import {Button, Image, View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation'; // 1.0.0-beta.27
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeContainer from '../containers/getCourseContainer';
import changeBHScreen from '../components/home/changeBHScreen';
import LoginContainer from '../containers/LoginContainer';
import ChangeCourseContainer from '../containers/changeCourseContainer';
import ClassContainer from '../containers/classContainer';
import AddCourseContainer from './addCourseContainer';
import changeKHScreen from '../components/home/changeKHScreen';
import AddClassContainer from '../containers/addClassContainer'
import QlBHScreen from '../components/home/QLBH';
import updateBHScreen from '../components/home/updateBHScreen';
import UpdateClassContainer from '../containers/updateClassContainer';

const RootStack = createStackNavigator(
  {
    LoginContainer: {
      screen: LoginContainer,
    },

    Home: {
      screen: HomeContainer,
    },
    Home2: {
      screen: AddCourseContainer,
    },
    QlBHScreen: {
      screen: ClassContainer,
    },
    changeKHScreen: {
      screen: ChangeCourseContainer,
    },
    changeBHScreen: {
      screen: AddClassContainer,
    },
    updateBHScreen:{
      screen:UpdateClassContainer,
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(RootStack);
