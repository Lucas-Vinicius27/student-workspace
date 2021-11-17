import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenge } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { Navigation } from '../components/Navigation';
import { Profile } from '../components/Profile';
import { XpBar } from '../components/XpBar';
import { ChallengesContextProvider } from '../contexts/ChallengesContext';
import { CountdownContextProvider } from '../contexts/CountdownContext';
import styles from '../styles/pages/home.module.scss';

interface HomeProps {
  level: number;
  currentXp: number;
  challengesCompleted: number;
}

const Home: NextPage<HomeProps> = ({level, currentXp, challengesCompleted}) => {
  return (
    <main>
      <Head>
        <title>Student Workspace</title>
      </Head>
      <div className={styles.wrapper}>
        <Navigation />
        <ChallengesContextProvider
          level={level}
          currentXp={currentXp}
          challengesCompleted={challengesCompleted}
        >
          <section className={styles.container}>
            <XpBar />
            <CountdownContextProvider>
            <div className={styles.containerComponents}>
                <div>
                  <Profile />
                  <CompletedChallenge />
                  <Countdown />
                </div>
                <div>
                  <ChallengeBox />
                </div>
              </div>
            </CountdownContextProvider>
          </section>
        </ChallengesContextProvider>
      </div>
    </main>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentXp, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentXp: Number(currentXp),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
