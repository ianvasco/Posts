import React, {useEffect, useState} from 'react'
import {FlatList, TouchableOpacity} from 'react-native'
import {View, Text, Button} from 'native-base'
import PostPreview, {PostStatus} from '../../components/PostPreview'
import ApiService, {IPosts} from '../../services/api'

const Home = () => {
  const [posts, setPosts] = useState<IPosts[]>()

  useEffect(() => {
    ApiService.getPosts()
      .then(setPosts)
      .catch((e) => console.warn(e))
  }, [])

  const handleOnPress = (postIndex: number) => {
    setPosts((prev) =>
      prev?.map((post, index) => {
        if (index === postIndex) return {...post, status: PostStatus.regular}
        return post
      }),
    )
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <FlatList
          data={posts}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => handleOnPress(index)}>
              <PostPreview status={item.status} description={item.body} />
            </TouchableOpacity>
          )}
        />
      </View>
      <Button full dark>
        <Text>Delete All</Text>
      </Button>
    </>
  )
}

export default Home
