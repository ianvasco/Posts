import React, {useEffect, useState} from 'react'
import {FlatList, TouchableOpacity} from 'react-native'
import {View, Text, Button} from 'native-base'
import PostPreview, {PostStatus} from '../../components/PostPreview'
import ApiService, {IPosts} from '../../services/api'
import {RootStackParamList} from '../../routes'
import {StackNavigationProp} from '@react-navigation/stack'
import {useStore, Actions} from '../../store'

interface IProps {
  navigation: StackNavigationProp<any>
}

const Home = ({navigation}: IProps) => {
  const {postsState, dispatch} = useStore()

  const getPosts = () => {
    ApiService.getPosts()
      .then((psts) => {
        dispatch({type: Actions.updatePosts, payload: psts})
      })
      .catch((e) => console.warn(e))
  }

  useEffect(() => {
    getPosts()
  }, [])

  const handleOnPress = (postIndex: number, item: IPosts) => {
    dispatch({
      type: Actions.updatePosts,
      payload: postsState.map((post, index) => {
        if (index === postIndex) return {...post, status: PostStatus.regular}
        return post
      }),
    })
    navigation.navigate('Post', {post: item})
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <FlatList
          data={postsState}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => handleOnPress(index, item)}>
              <PostPreview
                status={item.status}
                onFavorite={() => {}}
                description={item.body}
                removePost={() =>
                  dispatch({
                    type: Actions.updatePosts,
                    payload: postsState.filter((item, i) => i !== index),
                  })
                }
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <Button full danger>
        <Text>Delete All</Text>
      </Button>
    </>
  )
}

export default Home
