import {PostStatus} from '../../components/PostPreview'
import axios, {AxiosResponse} from 'axios'

interface IPostsResponse {
  userId: number
  id: number
  title: string
  body: string
}

export interface IPosts extends IPostsResponse {
  status: PostStatus
}

export default class ApiService {
  static readonly BASE_URL = 'https://jsonplaceholder.typicode.com'

  static getPosts: () => Promise<IPosts[]> = () => {
    return axios
      .get(`${ApiService.BASE_URL}/posts`)
      .then((res: AxiosResponse<IPostsResponse[]>) => {
        const {data} = res
        if (data && data.length !== 0) {
          return data.map((post, index) =>
            index < 20
              ? {...post, status: PostStatus.new}
              : {...post, status: PostStatus.regular},
          )
        }
        throw new Error('Empty ok error while fetching Posts')
      })
      .catch((e) => {
        console.log(e)
        throw new Error('Could not fetch Posts')
      })
  }
}
