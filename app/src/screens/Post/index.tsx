import React, {useEffect, useState} from 'react'
import {View, Text, Icon} from 'native-base'
import {RouteProp} from '@react-navigation/native'
import {RootStackParamList} from 'src/routes'
import {StackNavigationProp} from '@react-navigation/stack'
import {IPosts} from 'src/services/api'

type PostScreenRouteProp = RouteProp<RootStackParamList, 'Post'>

interface IProps {
  navigation: StackNavigationProp<any>
  route: PostScreenRouteProp
}

const Post = (props: IProps) => {
  const [post, setPost] = useState<IPosts>()

  useEffect(() => {
    const {params} = props.route
    console.log(props, '0')
    if (params && params.post) {
      setPost(params.post)
    }
  }, [props.route])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
      }}>
      <View>
        <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 5}}>
          Description
        </Text>
        <Text style={{textAlign: 'justify'}}>{post?.body}</Text>
      </View>
      <Icon
        name="circle"
        type="FontAwesome"
        color="blue"
        style={{margin: 10}}
      />
      <Text>Posts</Text>
    </View>
  )
}

export default Post
