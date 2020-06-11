import axios from 'axios'
import {IPosts, IPostsResponse} from './'
import {PostStatus} from '../../components/PostPreview'
jest.mock('axios')

describe('ApiService', () => {
  it('rejects if no posts were found', (done) => {
    //@ts-ignore
    axios.get.mockRejectedValueOnce({data: undefined, response: {status: 404}})
    const {ApiService} = require('.')
    ApiService.getPosts().then(fail, (err: Error) => {
      expect(err.message).toContain(`Could not fetch Posts`)
      done()
    })
  })
  it('returns the expected data', (done) => {
    const posts: IPostsResponse[] = [
      {
        userId: 1,
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body:
          'quia et suscipit\nsuscipitstrum rerum est autem sunt rem eveniet architecto',
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body:
          'est rerum tempore vitae\nsequi voluptate porro vel nihil molestue nisi nulla',
      },
    ]

    //@ts-ignore
    axios.get.mockResolvedValueOnce({data: posts})
    const {ApiService} = require('.')
    ApiService.getPosts().then((res: IPosts[]) => {
      //set it to new post
      expect(res).toHaveLength(2)
      expect(res[0].status).toEqual(PostStatus.new)
      done()
    })
  })
})
