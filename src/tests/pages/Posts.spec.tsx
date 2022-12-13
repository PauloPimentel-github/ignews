import { render, screen } from '@testing-library/react'
import Posts, { getStaticProps } from '../../pages/posts'
import { mocked } from 'jest-mock'
import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')

const post = { slug: 'my-new-post', title: 'My new Post', excerpt: 'Post excerpt', updatedAt: '10 de abril' }
const posts = [post]

describe('Posts page', () => {
    it('renders correctly', () => {
        render(<Posts posts={posts} />)

        expect(screen.getByText("My new Post")).toBeInTheDocument()
    })

    it('loads initial dara', async () => {
        const getPrismicClientMocked = mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            query: jest.fn().mockResolvedValueOnce({
                results: [
                    {
                        uid: 'my-new-post',
                        data: {
                            title: [
                                { type: 'heading', text: 'My new post' }
                            ],
                            content: [
                                { type: 'paragraph', text: 'Post excerpt' }
                            ],
                        },
                        last_publication_date: '12-13-2022'
                    }
                ]
            })
        } as any)

        const response = await getStaticProps({})

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    posts: [{
                        slug: 'my-new-post',
                        title: 'My new post',
                        excerpt: 'Post excerpt',
                        updatedAt: '13 de dezembro de 2022'
                    }]
                }
            })
        )
    })
})