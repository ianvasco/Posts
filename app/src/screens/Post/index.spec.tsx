import React from 'react'
import {render, waitFor} from 'react-native-testing-library'
import {posts, apiServiceMockFactory} from '../../specs/common'

describe('Post', () => {
  const props = {
    navigation: {},
    route: {
      params: {
        post: posts[0],
      },
    },
  }

  it('renders correctly and gets data from calls', async () => {
    const getUser = jest.fn().mockResolvedValue({
      name: 'pepito',
      email: 'pepito@pepito.com',
      phone: '123',
      website: 'pepito.com',
    })
    const getComments = jest.fn().mockResolvedValue([
      {
        id: 1,
        postId: posts[0].id,
        name: 'pepito2',
        email: 'pepito2@pepito2.com',
        body: 'nice post',
      },
    ])
    jest.doMock(
      '../../services/api',
      apiServiceMockFactory({getUser, getComments}),
    )
    const Post = require('./').default
    const wrapper = render(<Post {...props} />)

    expect(getUser).toHaveBeenCalledTimes(1)
    expect(getComments).toHaveBeenCalledTimes(1)

    expect(wrapper.getByTestId('post-description').props.children).toEqual(
      posts[0].body,
    )
    await waitFor(() => wrapper.getByText('Name: pepito'))
    expect(wrapper.getByTestId('user-name').props.children[1]).toEqual('pepito')

    expect(wrapper.getByTestId('comment-body').props.children).toEqual(
      'nice post',
    )
  })
})
