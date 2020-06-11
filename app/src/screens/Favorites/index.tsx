import React, {useEffect, useState} from 'react'
import {FlatList, TouchableOpacity, SafeAreaView, Text} from 'react-native'

import PostPreview, {PostStatus} from '../../components/PostPreview'
import Header from '../../components/Header'
import {StackNavigationProp} from '@react-navigation/stack'

import {IPosts} from '../../services/api'
import {useStore, Actions} from '../../store'
import styles from './styles'

interface IProps {
  navigation: StackNavigationProp<any>
}

const Home = ({navigation}: IProps) => {
  const {postsState, dispatch} = useStore()
  const [starredPosts, setStarredPosts] = useState<IPosts[]>()

  useEffect(() => {
    setStarredPosts(
      postsState.filter((post) => post.status === PostStatus.starred),
    )
  }, [postsState])

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
    <SafeAreaView style={styles.mainContainer}>
      <Header title="Favorites" navigation={navigation} enableBack={false} />
      {starredPosts && starredPosts?.length > 0 ? (
        <FlatList
          data={starredPosts}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => handleOnPress(index, item)}>
              <PostPreview status={item.status} description={item.body} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>There are no favorites</Text>
      )}
    </SafeAreaView>
  )
}

export default Home
