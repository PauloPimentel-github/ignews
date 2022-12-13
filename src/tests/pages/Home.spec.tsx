import { render, screen } from '@testing-library/react'
import Home from '../../pages'
import { useSession } from 'next-auth/react'

jest.mock('next/router')
jest.mock('next-auth/react')

describe('Home page', () => {
    it('renders correctly', () => {
        const useSessionMocked = jest.mocked(useSession)

        const user = { name: 'Paulo Pimentel', email: 'teste@gmail.com' }
        const data = { user: user, expires: 'fake-expires' }

        useSessionMocked.mockReturnValueOnce({ data, status: null })

        render(<Home product={ { priceId: 'fake-price-id', amount: 'R$10,00' } } />)

        expect(screen.getByText("for R$10,00 month")).toBeInTheDocument()
    })
})