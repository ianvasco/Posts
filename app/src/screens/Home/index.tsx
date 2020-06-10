import React from 'react'
import {View, Text, Icon, Button} from 'native-base'
import PostPreview, {PostStatus} from '../../components/PostPreview'

const Home = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <PostPreview
          status={PostStatus.new}
          description="et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        />
        <PostPreview
          status={PostStatus.starred}
          description="et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        />
        <PostPreview
          status={PostStatus.regular}
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
