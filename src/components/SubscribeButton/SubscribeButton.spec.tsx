import { render, screen, fireEvent } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/react');
jest.mock('next/router');

describe('SubscribeButton component', () => {

    it('renders correctly', () => {
        const useSessionMocked = jest.mocked(useSession)
        const user = { name: 'John Doe', email: 'teste@gmail.com' }
        const data = { user: user, expires: 'fake-expires' }

        useSessionMocked.mockReturnValueOnce({ data, status: null })

        render(<SubscribeButton />)
    
        expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    })

    it('rendirects user to sign in not autehnticated', () => {
        const signInMocked = jest.mocked(signIn)
        const useSessionMocked = jest.mocked(useSession)
        const user = { name: 'John Doe', email: 'teste@gmail.com' }
        const data = { user: user, expires: 'fake-expires' }

        useSessionMocked.mockReturnValueOnce({ data, status: null })

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('Subscribe now');

        fireEvent.click(subscribeButton)
    
        expect(signInMocked).toHaveBeenCalled()
    })

    it('redirects to posts when user already has a subscription', () => {
        const useRouterMocked = jest.mocked(useRouter)
        const useSessionMocked = jest.mocked(useSession)
        const pushMock = jest.fn()

        const user = { name: 'John Doe', email: 'teste@gmail.com' }
        const data = { user: user, expires: 'fake-expires', activeSubscription: 'fake-active-subscription' }

        useSessionMocked.mockReturnValueOnce({ data, status: 'authenticated' })

        useRouterMocked.mockReturnValueOnce({
            push: pushMock
        } as any)

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('Subscribe now');

        fireEvent.click(subscribeButton)

        expect(pushMock).toHaveBeenCalledWith('/posts')
    })

})