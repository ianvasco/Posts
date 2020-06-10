import React from 'react'
import {View, Text, Icon} from 'native-base'

type PostStatus = 'starred' | 'new' | 'regular'
interface IProps {
  title: string
}

const CustomRow = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Text>Home</Text>
    </View>
  )
}

export default CustomRow
