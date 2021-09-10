import type { NextPage } from 'next';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import styles from '../styles/pages/ranking.module.scss';

const Ranking: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Student Workspace</title>
      </Head>
      <div className={styles.wrapper}>
        <Navigation />
        <section>
          <h1>Leaderboard</h1>
        </section>
      </div>
    </main>
  )
}

export default Ranking
