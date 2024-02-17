/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import RegisterBox from '../RegisterBox'

describe('RegisterBox Component', () => {
  it('renders input fields with correct labels and placeholders', () => {
    const formData = { email: '', name: '', password: '' }
    const handleRegister = jest.fn()
    const handleInputChange = jest.fn()

    const { getByPlaceholderText, getByTestId } = render(
      <Router>
        <RegisterBox
          formData={formData}
          handleRegister={handleRegister}
          handleInputChange={handleInputChange}
          isLoading={false}
        />
      </Router>
    )

    expect(getByTestId('register-box-component')).toBeInTheDocument()
    expect(getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(getByPlaceholderText('What is your name ?')).toBeInTheDocument()
    expect(getByPlaceholderText('Choose a strong password')).toBeInTheDocument()
  })

  it('calls handleInputChange when input values change', () => {
    const formData = { email: '', name: '', password: '' }
    const handleRegister = jest.fn()
    const handleInputChange = jest.fn()

    const { getByPlaceholderText } = render(
      <Router>
        <RegisterBox
          formData={formData}
          handleRegister={handleRegister}
          handleInputChange={handleInputChange}
          isLoading={false}
        />
      </Router>
    )

    const emailInput = getByPlaceholderText('Enter your email')
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })

    expect(handleInputChange).toHaveBeenCalledTimes(1)
  })

  it('calls handleRegister when continue button is clicked', () => {
    const formData = { email: '', name: '', password: '' }
    const handleRegister = jest.fn()
    const handleInputChange = jest.fn()

    const { getByText } = render(
      <Router>
        <RegisterBox
          formData={formData}
          handleRegister={handleRegister}
          handleInputChange={handleInputChange}
          isLoading={false}
        />
      </Router>
    )

    const continueButton = getByText('Continue')
    fireEvent.click(continueButton)

    expect(handleRegister).toHaveBeenCalledTimes(1)
  })

  it('navigates to the login page when "Login" link is clicked', () => {
    const { getByText } = render(
      <Router>
        <RegisterBox
          formData={{ email: '', name: '', password: '' }}
          handleRegister={() => {}}
          handleInputChange={() => {}}
          isLoading={false}
        />
      </Router>
    )

    const loginLink = getByText('Login →')
    fireEvent.click(loginLink)

    expect(window.location.pathname).toBe('/login')
  })
})
