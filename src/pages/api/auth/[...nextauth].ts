import { query } from 'faunadb'

import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

import { fauna } from '../../../services/fauna'

export default NextAuth({ 

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],
  jwt: {
    secret: process.env.SIGNING_KEY 
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const userEmail  = user.email

      try { 
        await fauna.query(
          query.Create(
            query.Collection('users'),
            { data: { email: userEmail } }
          )
        )

        return true
      } catch {
        return false
      }
    },
  }
})