/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from '../Button'

describe('Button Component', () => {
  it('renders button with correct label', () => {
    const { getByText } = render(<Button label="Click me" />)
    const button = getByText('Click me')
    expect(button).toBeInTheDocument()
  })

  it('calls onClick prop when button is clicked', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Button label="Click me" onClick={handleClick} />
    )
    const button = getByText('Click me')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables button when disabled prop is true', () => {
    const { getByTestId } = render(<Button label="Click me" disabled={true} />)
    const button = getByTestId('button')
    expect(button).toBeDisabled()
  })

  it('renders loading spinner when isLoading prop is true', () => {
    const { getByTestId } = render(<Button label="Click me" isLoading />)
    const spinner = getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('does not render loading spinner when isLoading prop is false', () => {
    const { queryByTestId } = render(
      <Button label="Click me" isLoading={false} />
    )
    const spinner = queryByTestId('spinner')
    expect(spinner).not.toBeInTheDocument()
  })
})
