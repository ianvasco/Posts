import React from 'react'
import {render} from 'react-native-testing-library'
import {storeMockFactory} from '../../specs/common'

describe('Favorites', () => {
  const props = {
    navigation: {},
  }
  it('renders correctly with one favorites', () => {
    jest.doMock('../../store', storeMockFactory())

    const Favorites = require('./').default
    const wrapper = render(<Favorites {...props} />)

    expect(wrapper.getByTestId('favorites-list')).toBeDefined()
    expect(wrapper.getByTestId('favorites-list').props.data).toHaveLength(1)

    expect(wrapper.queryByTestId('no-favorites-message')).toBeNull()
  })
})
