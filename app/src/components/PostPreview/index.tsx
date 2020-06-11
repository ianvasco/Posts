import React, {Dispatch, SetStateAction} from 'react'
import {Animated, Dimensions} from 'react-native'
import {View, Text, Icon, Button} from 'native-base'
import Swipeable from 'react-native-gesture-handler/Swipeable'

export enum PostStatus {
  starred,
  new,
  regular,
}
interface IProps {
  description: string
  status: PostStatus
  removePost: () => void
  onFavorite: () => void
}

const CustomRow = ({description, status, removePost}: IProps) => {
  const renderStatusIcon = () => {
    switch (status) {
      case PostStatus.new:
        return (
          <Icon
            name="circle"
            type="FontAwesome"
            style={{margin: 10, color: '#19c0e6', fontSize: 20}}
          />
        )
      case PostStatus.starred:
        return (
          <Icon
            name="star"
            type="FontAwesome"
            style={{margin: 10, color: '#ffec00', fontSize: 20}}
          />
        )
      default:
        return <View style={{margin: 10, width: 20}} />
    }
  }

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-70, -20, 0, 1],
    })
    return (
      <Button
        style={{
          backgroundColor: 'red',
          height: '100%',
          maxWidth: Dimensions.get('window').width * 0.3,
        }}
        onPress={removePost}>
        <Animated.View
          style={[
            {
              color: 'white',
              fontSize: 16,
              backgroundColor: 'transparent',
              padding: 10,
              transform: [{translateX: trans}],
            },
          ]}>
          <Icon
            type="FontAwesome"
            name="trash"
            color="white"
            style={{fontSize: 30}}
          />
        </Animated.View>
      </Button>
    )
  }

  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: 10,
        }}>
        {renderStatusIcon()}
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 0.5,
            flex: 1,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingVertical: 5,
              marginRight: 25,
              flex: 1,
              textAlign: 'justify',
            }}>
            {description}
          </Text>
          <Icon
            name="chevron-right"
            type="FontAwesome"
            style={{
              fontSize: 20,
              color: 'grey',
            }}
          />
        </View>
      </View>
    </Swipeable>
  )
}

export default CustomRow
