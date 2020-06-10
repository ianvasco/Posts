import {PostStatus} from '../../components/PostPreview'
import axios, {AxiosResponse} from 'axios'

interface PostsResponse {
  userId: number
  id: number
  title: number
  body: number
}

interface Posts extends PostsResponse {
  status: PostStatus
}

export default class ApiService {
  static readonly BASE_URL = 'https://jsonplaceholder.typicode.com/'

  static getPosts: () => Promise<Posts[]> = () => {
    return axios
      .get(`${ApiService.BASE_URL}/posts`)
      .then((res: AxiosResponse<PostsResponse[]>) => {
        const {data} = res
        if (data && data.length !== 0) {
          return data.map((post, index) => {
            if (index < 20) return {...post, status: PostStatus.new}
            return {...post, status: PostStatus.regular}
          })
        }
        throw new Error('Empty ok error while fetching Posts')
      })
      .catch(() => {
        throw new Error('Could not fetch Posts')
      })
  }
}
