import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer ,createDrawerNavigator, SafeAreaView} from 'react-navigation';

import MainScreen from '../components/screen/Main';
import DetailScreen from '../components/screen/DetailScreen';

const innerStackRouteConfig = {
    Main: {
        screen: MainScreen
    },
    Detail: {
        screen: DetailScreen
    }
}

const innerStackNavigatorConfig = {
    headerMode: 'none',
}

const InnerStackNavigator = createAppContainer(createStackNavigator(innerStackRouteConfig, innerStackNavigatorConfig))

export {InnerStackNavigator}