import React, {useEffect} from 'react'
import {View, Text, Icon} from 'native-base'

export enum PostStatus {
  starred,
  new,
  regular,
}
interface IProps {
  description: string
  status: PostStatus
}

const CustomRow = ({description, status}: IProps) => {
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

  return (
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
        <Text style={{paddingVertical: 5, marginRight: 25, flex: 1}}>
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
  )
}

export default CustomRow
