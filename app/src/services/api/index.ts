import {PostStatus} from '../../components/PostPreview'
import axios, {AxiosResponse} from 'axios'

export interface IPostsResponse {
  userId: number
  id: number
  title: string
  body: string
}

export interface IPosts extends IPostsResponse {
  status: PostStatus
}

export interface IUser {
  name: string
  email: string
  phone: string
  website: string
}

export interface IComment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export class ApiService {
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
      .catch(() => {
        throw new Error('Could not fetch Posts')
      })
  }

  static getUser: (userId: number) => Promise<IUser> = (userId) => {
    return axios
      .get(`${ApiService.BASE_URL}/users?id=${userId}`)
      .then((res: AxiosResponse<IUser[]>) => {
        const {data} = res
        if (data && data.length !== 0) {
          return data[0]
        }
        throw new Error(`Empty ok error while fetching User ${userId}`)
      })
      .catch(() => {
        throw new Error(`Could not fetch User ${userId}`)
      })
  }

  static getComments: (postId: number) => Promise<IComment[]> = (postId) => {
    return axios
      .get(`${ApiService.BASE_URL}/comments?postId=${postId}`)
      .then((res: AxiosResponse<IComment[]>) => {
        const {data} = res
        if (data && data.length !== 0) {
          return data
        }
        throw new Error(
          `Empty ok error while fetching Post comments for ${postId}`,
        )
      })
      .catch(() => {
        throw new Error(`Could not fetch Post comments for ${postId}`)
      })
  }
}
