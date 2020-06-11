import React, {Dispatch, SetStateAction} from 'react'
import {Animated, Dimensions} from 'react-native'
import {View, Text, Icon, Button} from 'native-base'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import styles from './styles'

export enum PostStatus {
  starred,
  new,
  regular,
}
interface IProps {
  description: string
  status: PostStatus
  removePost?: () => void
}

const CustomRow = ({description, status, removePost}: IProps) => {
  const renderStatusIcon = () => {
    switch (status) {
      case PostStatus.new:
        return <Icon name="circle" type="FontAwesome" style={styles.dotIcon} />
      case PostStatus.starred:
        return <Icon name="star" type="FontAwesome" style={styles.starIcon} />
      default:
        return <View style={styles.emptyIconView} />
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
          ...styles.deleteButton,
          maxWidth: Dimensions.get('window').width * 0.3,
        }}
        onPress={removePost}>
        <Animated.View
          style={[
            {
              ...styles.deleteIconContainer,
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
      <View style={styles.mainContainer}>
        {renderStatusIcon()}
        <View style={styles.postContainer}>
          <Text style={styles.postText}>{description}</Text>
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
