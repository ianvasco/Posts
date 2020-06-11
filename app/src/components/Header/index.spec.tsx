import React from 'react'
import {render, fireEvent} from 'react-native-testing-library'

describe('Header', () => {
  const props = {
    enableBack: false,
    title: 'Testing Header',
    navigation: () => {},
    rightIconProps: undefined,
  }
  it('Renders correctly without buttons', () => {
    const Header = require('./').default
    const wrapper = render(<Header {...props} />)

    expect(wrapper.queryByTestId('header-back-button')).toBeNull()
    expect(wrapper.getByTestId('header-title').props.children).toEqual(
      'Testing Header',
    )
    expect(wrapper.queryByTestId('header-custom-right-button')).toBeNull()
  })

  it('Renders correctly with buttons', () => {
    const Header = require('./').default

    const newProps = {
      ...props,
      enableBack: true,
      rightIconProps: {
        type: 'favorite',
        buttonAction: () => {},
      },
    }

    const wrapper = render(<Header {...newProps} />)

    expect(wrapper.getByTestId('header-back-button')).toBeDefined()
    expect(wrapper.getByTestId('header-title').props.children).toEqual(
      'Testing Header',
    )
    expect(wrapper.getByTestId('header-custom-right-button')).toBeDefined()
    expect(wrapper.getByTestId('custom-right-icon-star')).toBeDefined()
  })
  it('Call button actions', () => {
    const Header = require('./').default

    const navigation = {
      goBack: jest.fn(),
    }
    const buttonAction = jest.fn()

    const newProps = {
      ...props,
      navigation,
      enableBack: true,
      rightIconProps: {
        type: 'favorite',
        buttonAction,
      },
    }

    const wrapper = render(<Header {...newProps} />)

    fireEvent.press(wrapper.getByTestId('header-back-button'))

    expect(navigation.goBack).toHaveBeenCalledTimes(1)

    fireEvent.press(wrapper.getByTestId('header-custom-right-button'))
    expect(buttonAction).toHaveBeenCalledTimes(1)
  })
})
