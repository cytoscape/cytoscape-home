import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from './Header'

describe('Header', () => {
  test('renders home link with logo', () => {
    render(<Header />)

    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  test('renders Cytoscape legacy-site link with correct href', () => {
    render(<Header />)

    const legacyLink = screen.getByText(/where is the old site\?/i)
    expect(legacyLink).toBeInTheDocument()
    expect(legacyLink).toHaveAttribute('href', 'https://cytoscape.org')
    expect(legacyLink).toHaveAttribute('target', '_blank')
  })

    test('opens mobile menu when toggle button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const toggleButton = screen.getByRole('button', {
        name: /toggle site navigation/i,
    })

    // Headless UI uses aria-expanded on the toggle button
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

    // Mobile menu panel should not exist before click
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()

    // Click to open
    await user.click(toggleButton)

    // Now the button reflects open state
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')

    // Wait for the mobile menu panel to be rendered
    const menu = await screen.findByTestId('mobile-menu')
    expect(menu).toBeInTheDocument()
    })
})
