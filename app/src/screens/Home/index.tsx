import React from 'react'
import {View, Text, Icon, Button} from 'native-base'
import CustomRow from '../../components/CustomRow'

type PostStatus = 'starred' | 'new' | 'regular'
interface IProps {
  title: string
  status: PostStatus
}

const Home = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <CustomRow
          status="new"
          description="et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        />
        <CustomRow
          status="starred"
          description="et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        />
        <CustomRow
          status="regular"
          description="et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        />
      </View>
      <Button full dark>
        <Text>Delete All</Text>
      </Button>
    </>
  )
}

export default Home
