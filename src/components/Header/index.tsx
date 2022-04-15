import styles from './styles.module.scss';

import { SigInButton } from '../SigInButton';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" title="ig.news" alt="[ig.news]" />
        <nav>
          <a className={styles.active} href="#">Home</a>
          <a href="#">Posts</a>
        </nav>
        <SigInButton />
      </div>
    </header>
  );
}