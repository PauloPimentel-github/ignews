import { render, screen } from '@testing-library/react'
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { useSession } from 'next-auth/react'
import { mocked } from 'jest-mock'
import { getPrismicClient } from '../../services/prismic'
import { useRouter } from 'next/router'

jest.mock('next/router')
jest.mock('next-auth/react')
jest.mock('../../services/prismic')

const post = { 
    slug: 'my-new-post', 
    title: 'My new Post', 
    content: '<p>Post excerpt</p>', 
    updatedAt: '10 de abril' 
}

describe('Post preview page', () => {
    it('renders correctly', () => {
        const useSessionMocked = jest.mocked(useSession)

        const user = { name: 'Paulo Pimentel', email: 'teste@gmail.com' }
        const data = { user: user, expires: 'fake-expires' }

        useSessionMocked.mockReturnValueOnce({ data, status: null })
        
        render(<Post post={post} />)

        expect(screen.getByText("My new Post")).toBeInTheDocument()
        expect(screen.getByText("Post excerpt")).toBeInTheDocument()
        expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()
    })

    it('redirects user to full post when user is subscribed', async () => {
        const useSessionMocked = mocked(useSession)
        const useRouterMocked = mocked(useRouter)
        const pushMock = jest.fn()

        const user = { name: 'John Doe', email: 'teste@gmail.com' }
        const data = { user: user, expires: 'fake-expires', activeSubscription: 'fake-active-subscription' }

        useSessionMocked.mockReturnValueOnce({ data, status: 'authenticated' })

        useRouterMocked.mockReturnValueOnce({
            push: pushMock,
        } as any)

        render(<Post post={post} />)

        expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
    })

    it('loads initial data', async () => {
        const getPrismicClientMocked = mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [
                        { type: 'heading', text: 'My new post' }
                    ],
                    content: [
                        { type: 'paragraph', text: 'Post excerpt' }
                    ],
                },
                last_publication_date: '12-13-2022'
            })
        } as any)

        const response = await getStaticProps({ params: { slug: 'my-new-post' } } as any)

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: 'my-new-post',
                        title: 'My new post',
                        content: '<p>Post excerpt</p>',
                        updatedAt: '13 de dezembro de 2022'
                    }
                }
            })
        )

    })
})