import React from 'react'
import {Body, Button, Header, Icon, Left, Right, Title, View} from 'native-base'

import styles from './styles'
import {StackNavigationProp} from '@react-navigation/stack'

type RightIconHeader = 'refresh' | 'favorite'

interface CustomHeaderProps {
  enableBack: boolean
  title: string
  navigation: StackNavigationProp<any>
  rightIconProps?: {
    type: RightIconHeader
    buttonAction: () => void
  }
}

const CustomHeader = ({
  enableBack,
  title,
  navigation,
  rightIconProps,
}: CustomHeaderProps) => (
  <Header style={styles.header}>
    {enableBack ? (
      <Left style={styles.flex}>
        <Button
          testID="header-back-button"
          transparent
          onPress={() => navigation.goBack()}>
          <Icon
            style={{color: 'black', fontSize: 20}}
            name="chevron-left"
            type="FontAwesome"
          />
        </Button>
      </Left>
    ) : (
      <View style={styles.flex} />
    )}
    <Body style={styles.body}>
      <Title testID="header-title" style={styles.headerTitle}>
        {title}
      </Title>
    </Body>
    <Right style={styles.flex}>
      {rightIconProps ? (
        <Button
          testID="header-custom-right-button"
          transparent
          onPress={() => navigation.goBack()}>
          <Icon
            style={{
              color: rightIconProps.type === 'favorite' ? '#ffec00' : 'black',
              fontSize: 20,
            }}
            name={rightIconProps.type === 'favorite' ? 'star' : 'refresh'}
            type="FontAwesome"
          />
        </Button>
      ) : (
        <View />
      )}
    </Right>
  </Header>
)

export default CustomHeader
