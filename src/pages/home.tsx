import type { NextPage } from 'next';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import styles from '../styles/pages/home.module.scss';

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Student Workspace</title>
      </Head>
      <div className={styles.wrapper}>
        <Navigation />
        <section>
          <h1>Home</h1>
        </section>
      </div>
    </main>
  )
}

export default Home
