import { render, screen } from '@testing-library/react'
import Home, { getStaticProps } from '../../pages'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'
import { stripe } from '../../services/stripe'

jest.mock('next/router')
jest.mock('next-auth/react')

jest.mock('../../services/stripe')

describe('Home page', () => {
    it('renders correctly', () => {
        const useSessionMocked = jest.mocked(useSession)

        const user = { name: 'Paulo Pimentel', email: 'teste@gmail.com' }
        const data = { user: user, expires: 'fake-expires' }

        useSessionMocked.mockReturnValueOnce({ data, status: null })

        render(<Home product={ { priceId: 'fake-price-id', amount: 'R$10,00' } } />)

        expect(screen.getByText("for R$10,00 month")).toBeInTheDocument()
    })

    it('loads initial data', async () => {
        const useSessionMocked = jest.mocked(useSession)

        const user = { name: 'Paulo Pimentel', email: 'teste@gmail.com' }
        const data = { user: user, expires: 'fake-expires' }

        useSessionMocked.mockReturnValueOnce({ data, status: null })

        const retrieveStripePricesMocked = mocked(stripe.prices.retrieve)

        retrieveStripePricesMocked.mockResolvedValueOnce({
            id: 'fake-price-id',
            unit_amount: 1000
        } as any)

        const response = await getStaticProps({})

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    product: {
                        priceId: 'fake-price-id',
                        amount: '$10.00'
                    }
                }
            })
        )
    })
})