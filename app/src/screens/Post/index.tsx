import React, {useEffect, useState} from 'react'
import {View, Text} from 'native-base'
import {RouteProp} from '@react-navigation/native'
import {RootStackParamList} from 'src/routes'
import {StackNavigationProp} from '@react-navigation/stack'
import ApiService, {IPosts, IUser} from '../../services/api'

type PostScreenRouteProp = RouteProp<RootStackParamList, 'Post'>

interface IProps {
  navigation: StackNavigationProp<any>
  route: PostScreenRouteProp
}

const Post = (props: IProps) => {
  const [post, setPost] = useState<IPosts>()
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    const {params} = props.route
    if (params && params.post) {
      setPost(params.post)
    }
  }, [props.route])

  useEffect(() => {
    if (post) {
      ApiService.getUser(post.userId)
        .then(setUser)
        .catch((e) => console.warn(e))
    }
  }, [post])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
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
      </View>
    </View>
  )
}

export default Post
