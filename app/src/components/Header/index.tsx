import React from 'react'
import {Body, Button, Header, Icon, Left, Right, Title, View} from 'native-base'

import styles from './styles'
import {StackNavigationProp} from '@react-navigation/stack'

interface CustomHeaderProps<S> {
  enableBack: boolean
  title: string
  navigation: StackNavigationProp<any>
}

const CustomHeader = ({
  enableBack,
  title,
  navigation,
}: CustomHeaderProps<{}>) => (
  <Header style={styles.header}>
    {enableBack ? (
      <Left style={styles.flex}>
        <Button
          testID="header-back-button"
          transparent
          onPress={() => navigation.goBack()}>
          <Icon
            style={{color: 'black'}}
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
    <Right style={styles.flex} />
  </Header>
)

export default CustomHeader
