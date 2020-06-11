import React, {useEffect, useState} from 'react'
import {FlatList, TouchableOpacity} from 'react-native'
import {View, Text, Button} from 'native-base'
import PostPreview, {PostStatus} from '../../components/PostPreview'
import Header from '../../components/Header'
import ApiService, {IPosts} from '../../services/api'
import {RootStackParamList} from '../../routes'
import {StackNavigationProp} from '@react-navigation/stack'
import {useStore, Actions} from '../../store'
import {SafeAreaView} from 'react-native-safe-area-context'

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
        if (index === postIndex && post.status !== PostStatus.starred)
          return {...post, status: PostStatus.regular}
        return post
      }),
    })
    navigation.navigate('Post', {post: item})
  }

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Header
          title="Posts"
          navigation={navigation}
          enableBack={false}
          rightIconProps={{type: 'refresh', buttonAction: getPosts}}
        />
        <FlatList
          data={postsState}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => handleOnPress(index, item)}>
              <PostPreview
                status={item.status}
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
      </SafeAreaView>
      <Button
        full
        danger
        onPress={() =>
          dispatch({
            type: Actions.deletePosts,
          })
        }>
        <Text>Delete All</Text>
      </Button>
    </>
  )
}

export default Home
