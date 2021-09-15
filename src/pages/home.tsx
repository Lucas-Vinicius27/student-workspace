import type { NextPage } from 'next';
import Head from 'next/head';
import { CompletedChallenge } from '../components/CompletedChallenges/completedChallenges';
import { Countdown } from '../components/Countdown/countdown';
import { Navigation } from '../components/Navigation';
import { Profile } from '../components/Profile/profile';
import { XpBar } from '../components/XpBar/xpBar';
import styles from '../styles/pages/home.module.scss';

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Student Workspace</title>
      </Head>
      <div className={styles.container}>
        <XpBar />
        <section>
        <div>
          <Profile />
          <CompletedChallenge />
          <Countdown />
        </div>
        <div>

        </div>
       </section>
      </div>
      



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
