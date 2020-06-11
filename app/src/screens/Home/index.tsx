import React, {useEffect, useRef} from 'react'
import {FlatList, TouchableOpacity, Animated, SafeAreaView} from 'react-native'
import {Text, Button} from 'native-base'
import PostPreview, {PostStatus} from '../../components/PostPreview'
import Header from '../../components/Header'
import {StackNavigationProp} from '@react-navigation/stack'

import ApiService, {IPosts} from '../../services/api'
import {useStore, Actions} from '../../store'

import styles from './styles'

interface IProps {
  navigation: StackNavigationProp<any>
}

const Home = ({navigation}: IProps) => {
  const {postsState, dispatch} = useStore()
  const fadeAnim = useRef(new Animated.Value(1)).current

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

  const deleteAll = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() =>
      dispatch({
        type: Actions.deletePosts,
      }),
    )
  }

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <Header
          title="Posts"
          navigation={navigation}
          enableBack={false}
          rightIconProps={{
            type: 'refresh',
            buttonAction: () => {
              getPosts()
              fadeAnim.setValue(1)
            },
          }}
        />
        <Animated.View
          style={[
            {
              opacity: fadeAnim,
            },
          ]}>
          <FlatList
            data={postsState}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => handleOnPress(index, item)}>
                <PostPreview
                  status={item.status}
                  description={item.body}
                  removePost={() => {
                    dispatch({
                      type: Actions.updatePosts,
                      payload: postsState.filter((item, i) => i !== index),
                    })
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      </SafeAreaView>
      <Button full danger onPress={deleteAll}>
        <Text>Delete All</Text>
      </Button>
    </>
  )
}

export default Home
