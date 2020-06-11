import React from 'react'
import {render} from 'react-native-testing-library'
import {useStore, posts} from '../../specs/common'
import {IPosts} from '../../services/api'
import {PostStatus} from '../../components/PostPreview'

describe('Favorites', () => {
  const starredPost: IPosts = {
    id: 90,
    userId: 100,
    body: 'something that should be the body',
    title: 'starred',
    status: PostStatus.starred,
  }

  const props = {
    navigation: {},
  }
  it('renders correctly with one favorites', () => {
    jest.doMock('../../store', useStore())

    const Favorites = require('./').default
    const wrapper = render(<Favorites {...props} />)

    expect(wrapper.getByTestId('favorites-list')).toBeDefined()
    expect(wrapper.getByTestId('favorites-list').props.data).toHaveLength(1)

    expect(wrapper.queryByTestId('no-favorites-message')).toBeNull()
  })
})
