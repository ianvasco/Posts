import React, {useEffect, useState} from 'react'
import {View, Text, Spinner} from 'native-base'
import {RouteProp} from '@react-navigation/native'
import {RootStackParamList} from 'src/routes'
import {StackNavigationProp} from '@react-navigation/stack'
import ApiService, {IPosts, IUser, IComment} from '../../services/api'
import {FlatList, ScrollView} from 'react-native-gesture-handler'
import {SafeAreaView} from 'react-native-safe-area-context'

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <View style={{flex: 1, margin: 16}}>
          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 5}}>
              Description
            </Text>
            <Text style={{textAlign: 'justify'}}>{post?.body}</Text>
          </View>
          <View>
            <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 5}}>
              User
            </Text>
            <Text>Name: {user?.name}</Text>
            <Text>Email: {user?.email}</Text>
            <Text>Phone: {user?.phone}</Text>
            <Text>Website: {user?.website}</Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 5,
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
                    margin: 5,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.5,
                    backgroundColor: index % 2 ? '#d1d3d2' : 'white',
                  }}>
                  <Text style={{textAlign: 'justify'}}>{comment.body}</Text>
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
