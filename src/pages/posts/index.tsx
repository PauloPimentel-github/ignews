import Head from 'next/head';
import styles from './styles.module.scss';

export default function  Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>16 de maio de 2022</time>
            <strong>Código Limpo: reflexão e prática</strong>
            <p>No entanto, principalmente entre iniciantes, ainda existem dúvidas sobre o que é, afinal, um “código limpo” e o que ele representa na prática e na lógica do mercado.</p>
          </a>
          <a href="#">
            <time>16 de maio de 2022</time>
            <strong>Código Limpo: reflexão e prática</strong>
            <p>No entanto, principalmente entre iniciantes, ainda existem dúvidas sobre o que é, afinal, um “código limpo” e o que ele representa na prática e na lógica do mercado.</p>
          </a>
          <a href="#">
            <time>16 de maio de 2022</time>
            <strong>Código Limpo: reflexão e prática</strong>
            <p>No entanto, principalmente entre iniciantes, ainda existem dúvidas sobre o que é, afinal, um “código limpo” e o que ele representa na prática e na lógica do mercado.</p>
          </a>
        </div>
      </main>
    </>
  );
}