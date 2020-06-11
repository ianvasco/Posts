import React from 'react'
import {render} from 'react-native-testing-library'

describe('CustomHeader', () => {
  const props: any = {
    enableBack: false,
    title: 'Header Title',
    navigation: {
      navigate: jest.fn(),
    },
  }
  it('renders correctly', () => {
    const Header = require('./')
    const wrapper = render(<Header {...props} />)

    expect(wrapper.getByTestId('header-title').props.children).toEqual(
      'Header Title',
    )
  })
})
