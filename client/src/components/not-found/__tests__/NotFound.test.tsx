/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import NotFound from '../NotFound'

describe('NotFound Component', () => {
  it('renders with correct text and link', () => {
    const { getByText } = render(
      <Router>
        <NotFound />
      </Router>
    )

    expect(getByText('404')).toBeInTheDocument()
    expect(getByText('Page not found')).toBeInTheDocument()
    expect(getByText('Go back home')).toBeInTheDocument()
  })

  it('navigates to the home page when "Go back home" link is clicked', () => {
    const { getByText } = render(
      <Router>
        <NotFound />
      </Router>
    )

    const goBackHomeLink = getByText('Go back home')
    fireEvent.click(goBackHomeLink)

    expect(window.location.pathname).toBe('/')
  })
})
