/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { IInputBoxProps, InputBox } from '../InputBox'

const inputProps: IInputBoxProps = {
  primaryLabel: 'Email',
  placeholder: 'Enter your email',
  id: 'email',
  name: 'email',
  type: 'text',
  value: '',
  required: true,
  onInputChange: jest.fn(),
}

const passwordProps: IInputBoxProps = {
  primaryLabel: 'Password',
  placeholder: 'Enter your password',
  id: 'password',
  name: 'password',
  type: 'password',
  value: '',
  required: true,
  onInputChange: jest.fn(),
}

describe('InputBox Component', () => {
  it('renders with correct labels and attributes', () => {
    const { getByText, getByPlaceholderText, getByDisplayValue, getByTestId } =
      render(
        <InputBox
          id={inputProps.id}
          primaryLabel={inputProps.primaryLabel}
          placeholder={inputProps.placeholder}
          name={inputProps.name}
          type={inputProps.type}
          value={inputProps.value}
          required={inputProps.required}
        />
      )

    expect(getByTestId('input-component')).toBeInTheDocument()
    expect(getByText(inputProps.primaryLabel)).toBeInTheDocument()
    expect(getByPlaceholderText(inputProps.placeholder)).toBeInTheDocument()
    expect(getByDisplayValue(inputProps.value)).toBeInTheDocument()
    expect(getByDisplayValue(inputProps.value)).toHaveAttribute(
      'type',
      inputProps.type
    )
  })

  it('toggles password visibility', () => {
    const { getByTestId } = render(
      <InputBox
        id={passwordProps.id}
        primaryLabel={passwordProps.primaryLabel}
        placeholder={passwordProps.placeholder}
        name={passwordProps.name}
        type={passwordProps.type}
        value={passwordProps.value}
        required={passwordProps.required}
      />
    )

    const input = getByTestId('input-element')
    const toggleButton = getByTestId('toggle-button')

    fireEvent.click(toggleButton)

    expect(input).toHaveAttribute('type', 'text')
  })

  it('calls onInputChange callback when input value changes', () => {
    const { getByPlaceholderText } = render(
      <InputBox
        id={inputProps.id}
        primaryLabel={inputProps.primaryLabel}
        placeholder={inputProps.placeholder}
        name={inputProps.name}
        type={inputProps.type}
        value={inputProps.value}
        required={inputProps.required}
        onInputChange={inputProps.onInputChange}
      />
    )

    const input = getByPlaceholderText('Enter your email')
    fireEvent.change(input, { target: { value: 'Test Value' } })

    expect(inputProps.onInputChange).toHaveBeenCalledTimes(1)
  })

  it('calls onSecondaryLabelClick callback when secondary label is clicked', () => {
    const onSecondaryLabelClick = jest.fn()
    const { getByText } = render(
      <InputBox
        id={inputProps.id}
        primaryLabel={inputProps.primaryLabel}
        placeholder={inputProps.placeholder}
        name={inputProps.name}
        type={inputProps.type}
        value={inputProps.value}
        required={inputProps.required}
        onInputChange={inputProps.onInputChange}
        secondaryLabel="Click Me"
        onSecondaryLabelClick={onSecondaryLabelClick}
      />
    )

    const secondaryLabel = getByText('Click Me')
    fireEvent.click(secondaryLabel)

    expect(onSecondaryLabelClick).toHaveBeenCalledTimes(1)
  })
})
