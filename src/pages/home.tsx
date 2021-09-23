import type { NextPage } from 'next';
import Head from 'next/head';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenge } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { Navigation } from '../components/Navigation';
import { Profile } from '../components/Profile';
import { XpBar } from '../components/XpBar';
import { CountdownContextProvider } from '../contexts/CountdownContext';
import styles from '../styles/pages/home.module.scss';

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Student Workspace</title>
      </Head>
      <div className={styles.wrapper}>
        <Navigation />
        <section className={styles.container}>
          <XpBar />
          <div className={styles.containerComponents}>
            <CountdownContextProvider>
              <div>
                <Profile />
                <CompletedChallenge />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </CountdownContextProvider>
            </div>
        </section>
      </div>
    </main>
  )
}

export default Home
