import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'
import { SigInButton } from '.'

jest.mock('next-auth/react')

describe('SigInButton component', () => {

    it('renders correctly when user is not authenticated', () => {
        const useSessionMocked = jest.mocked(useSession)

        const user = { name: 'Paulo Pimentel', email: 'teste@gmail.com' }
        const data = { user: user, expires: 'fake-expires' }

        useSessionMocked.mockReturnValueOnce({ data, status: null })

        render(
            <SigInButton />
        )
    
        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

    it('renders correctly when user is authenticated', () => {
        const useSessionMocked = mocked(useSession)

        const user = { name: 'John Doe', email: 'teste@gmail.com' }
        const data = { user: user, expires: 'fake-expires' }

        useSessionMocked.mockReturnValueOnce({ data, status: 'authenticated' })

        render(
            <SigInButton />
        )
    
        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

})