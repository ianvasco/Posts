import React, {useEffect, useState} from 'react'
import {ScrollView, SafeAreaView} from 'react-native'
import {View, Text, Spinner} from 'native-base'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import Header from '../../components/Header'
import {PostStatus} from '../../components/PostPreview'

import {IPosts, IUser, IComment, ApiService} from '../../services/api'
import {RootStackParamList} from '../../routes'

import {useStore, Actions} from '../../store'
import styles from './styles'

type PostScreenRouteProp = RouteProp<RootStackParamList, 'Post'>

interface IProps {
  navigation: StackNavigationProp<any>
  route: PostScreenRouteProp
}

const Post = (props: IProps) => {
  const [post, setPost] = useState<IPosts>()
  const [user, setUser] = useState<IUser>()
  const [comments, setComments] = useState<IComment[]>()
  const [isLoading, setLoading] = useState(false)
  const {postsState, dispatch} = useStore()

  useEffect(() => {
    const {params} = props.route
    if (params && params.post) {
      setPost(params.post)
    }
  }, [props.route])

  useEffect(() => {
    if (post) {
      setLoading(true)
      ApiService.getUser(post.userId)
        .then(setUser)
        .catch((e) => console.warn(e))
      ApiService.getComments(post.id)
        .then((comts) => {
          setLoading(false)
          setComments(comts)
        })
        .catch((e) => console.warn(e))
        .then(() => setLoading(false))
    }
  }, [post])

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header
        title="Posts"
        navigation={props.navigation}
        enableBack={true}
        rightIconProps={{
          type: 'favorite',
          buttonAction: () =>
            dispatch({
              type: Actions.updatePosts,
              payload: postsState.map((pst) => {
                if (post && post.id === pst.id)
                  return {...pst, status: PostStatus.starred}
                return pst
              }),
            }),
        }}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginBottom: 20}}>
            <Text style={styles.title}>Description</Text>
            <Text testID="post-description" style={{textAlign: 'justify'}}>
              {post?.body}
            </Text>
          </View>
          <View>
            <Text style={styles.title}>User</Text>
            <Text testID="user-name">Name: {user?.name}</Text>
            <Text>Email: {user?.email}</Text>
            <Text>Phone: {user?.phone}</Text>
            <Text>Website: {user?.website}</Text>
          </View>
          <View>
            <Text
              style={{
                ...styles.title,
                marginTop: 20,
              }}>
              Comments
            </Text>
            {isLoading ? (
              <Spinner size={30} />
            ) : comments?.length !== 0 ? (
              comments?.map((comment, index) => (
                <View
                  key={`${index}`}
                  style={{
                    ...styles.commentContainer,
                    //sets color in between comments
                    backgroundColor: index % 2 ? '#d1d3d2' : 'white',
                  }}>
                  <Text testID="comment-body" style={{textAlign: 'justify'}}>
                    {comment.body}
                  </Text>
                </View>
              ))
            ) : (
              <Text>There are no comments for this post</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Post
