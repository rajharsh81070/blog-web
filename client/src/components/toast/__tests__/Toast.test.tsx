/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/prefer-presence-queries */

import React from 'react'
import { render } from '@testing-library/react'
import Toast, { ToastType } from '../Toast'
import { Provider } from 'react-redux'
import { store } from '../../../redux/store'
describe('Toast Component', () => {
  it('renders with correct message and type', () => {
    const message = 'Test Message'
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Toast message={message} type={ToastType.Success} />
      </Provider>
    )

    expect(getByTestId('toast-component')).toBeInTheDocument()
    expect(getByText(message)).toBeInTheDocument()
    expect(getByText(message).parentNode).toHaveClass('bg-green-400')
  })
})
