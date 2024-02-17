/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import LoginBox from '../LoginBox'
import { BrowserRouter as Router } from 'react-router-dom'

describe('LoginBox Component', () => {
  it('renders input fields with correct labels and placeholders', () => {
    const formData = { email: '', password: '' }
    const handleLogin = jest.fn()
    const handleInputChange = jest.fn()

    const { getByPlaceholderText, getByTestId } = render(
      <Router>
        <LoginBox
          formData={formData}
          handleLogin={handleLogin}
          handleInputChange={handleInputChange}
          isLoading={false}
        />
      </Router>
    )

    expect(getByTestId('login-box-component')).toBeInTheDocument()
    expect(getByPlaceholderText('Please enter your email')).toBeInTheDocument()
    expect(getByPlaceholderText('Enter your password')).toBeInTheDocument()
  })

  it('calls handleInputChange when input values change', () => {
    const formData = { email: '', password: '' }
    const handleLogin = jest.fn()
    const handleInputChange = jest.fn()

    const { getByPlaceholderText } = render(
      <Router>
        <LoginBox
          formData={formData}
          handleLogin={handleLogin}
          handleInputChange={handleInputChange}
          isLoading={false}
        />
      </Router>
    )

    const emailInput = getByPlaceholderText('Please enter your email')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    expect(handleInputChange).toHaveBeenCalledTimes(1)
  })

  it('calls handleLogin when login button is clicked', () => {
    const formData = { email: '', password: '' }
    const handleLogin = jest.fn()
    const handleInputChange = jest.fn()

    const { getByTestId } = render(
      <Router>
        <LoginBox
          formData={formData}
          handleLogin={handleLogin}
          handleInputChange={handleInputChange}
          isLoading={false}
        />
      </Router>
    )

    const loginButton = getByTestId('button')
    fireEvent.click(loginButton)

    expect(handleLogin).toHaveBeenCalledTimes(1)
  })
})
