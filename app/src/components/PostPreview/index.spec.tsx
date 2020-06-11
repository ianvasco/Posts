import React from 'react'
import {render} from 'react-native-testing-library'
import {PostStatus} from './'

describe('PostPreview', () => {
  const props = {
    description: 'a dumb description',
    status: PostStatus.new,
    removePost: () => {},
  }
  it('renders correctly', () => {
    const PostPreview = require('./').default
    const wrapper = render(<PostPreview {...props} />)

    //expect blue dot icon is defined for new posts
    expect(wrapper.getByTestId('blueDot-icon')).toBeDefined()
    expect(
      wrapper.getByTestId('post-preview-description').props.children,
    ).toEqual(props.description)
  })
})
