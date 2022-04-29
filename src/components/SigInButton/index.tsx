import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'

import styles from './styles.module.scss';

export function SigInButton() {
  const { data: session, status } = useSession()
  
  const isSession = (status === "authenticated")

  return isSession ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => { signOut() }}
    >
      <FaGithub color="#04d361" />
        { session.user.name }
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
      <button
        type="button"
        className={styles.signInButton}
        onClick={() => { signIn('gthub') }}
      >
        <FaGithub color="#eba417" />
        Sign in with Github
      </button>
  );
}