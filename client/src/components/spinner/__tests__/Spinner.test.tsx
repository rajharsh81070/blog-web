/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render } from '@testing-library/react'
import Spinner from '../Spinner'

describe('Spinner Component', () => {
  it('renders with the correct size and container height', () => {
    const { getByTestId } = render(
      <Spinner size={32} containerHeight="200px" />
    )

    const spinner = getByTestId('spinner')

    const spinnerElement = spinner.querySelector('.animate-spin')
    expect(spinnerElement).toHaveClass('border-t-2')
    expect(spinnerElement).toHaveClass('border-b-2')
    expect(spinnerElement).toHaveClass('border-[#bbb3b3]')
    expect(spinnerElement).toHaveClass('h-8')
    expect(spinnerElement).toHaveClass('w-8')
  })

  it('renders with the default size and container height if no props are provided', () => {
    const { getByTestId } = render(<Spinner size={32} />)

    const spinner = getByTestId('spinner')

    const spinnerElement = spinner.querySelector('.animate-spin')
    expect(spinnerElement).toHaveClass('border-t-2')
    expect(spinnerElement).toHaveClass('border-b-2')
    expect(spinnerElement).toHaveClass('border-[#bbb3b3]')
    expect(spinnerElement).toHaveClass('h-8')
    expect(spinnerElement).toHaveClass('w-8')
  })
})
