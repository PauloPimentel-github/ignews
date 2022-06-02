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
  callbacks: {
    async session({ session, token, user }) {
      try {
        const userActiveSubscription = await fauna.query(
          query.Get(
            query.Intersection([
              query.Match(
                query.Index('subscription_by_user_ref'),
                query.Select(
                  "ref",
                  query.Get(
                    query.Match(
                      query.Index('user_by_email'),
                      query.Casefold(session.user.email)
                    )
                  )
                )
              ),
              query.Match(
                query.Index('subscription_by_status'),
                "active"
              )
            ])
          )
        )

        return {
          ...session,
          activeSubscription: userActiveSubscription
        }
      } catch {
        return {
          ...session,
          activeSubscription: null
        }
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      const userEmail = user.email

      try { 
        await fauna.query(
          query.If(
            query.Not(
              query.Exists(
                query.Match(
                  query.Index('user_by_email'),
                  query.Casefold(userEmail)
                )
              )
            ),
            query.Create(
              query.Collection('users'),
              { data: { email: userEmail } }
            ),
            query.Get(
              query.Match(
                query.Index('user_by_email'),
                query.Casefold(userEmail)
              )
            )
          )
        )

        return true
      } catch {
        return false
      }
    },
  }
})