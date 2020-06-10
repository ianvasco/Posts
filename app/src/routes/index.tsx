import React from 'react'

import HomeScreen from '../screens/Home'
import PostScreen from '../screens/Post'
import FavoritesScreen from '../screens/Favorites'

import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {IPosts} from 'src/services/api'

export type RootStackParamList = {
  Posts: undefined
  Post: {post: IPosts} | undefined
}

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator<RootStackParamList>()

const BottomTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="All" component={HomeScreen} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
  </Tab.Navigator>
)

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Posts"
          component={BottomTabs}
          options={{headerShown: true}}
        />
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppContainer
