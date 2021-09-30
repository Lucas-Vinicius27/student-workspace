import type { NextPage } from 'next';
import Head from 'next/head';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenge } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { Navigation } from '../components/Navigation';
import { Profile } from '../components/Profile';
import { XpBar } from '../components/XpBar';
import { ChallengesContextProvider } from '../contexts/ChallengesContext';
import { CountdownContextProvider } from '../contexts/CountdownContext';
import { useAuth } from "../hooks/useAuth";
import { database, onValue, ref } from "../services/firebase";
import styles from '../styles/pages/home.module.scss';

const Home: NextPage = () => {
  const { user } = useAuth();
  let level = 0;
  let currentXp = 0;
  let challengesCompleted = 0;

  onValue(
    ref(database, `users/${user?.id}`),
    snapshot => {
      level = snapshot.val().level;
      currentXp = snapshot.val().currentXp;
      challengesCompleted = snapshot.val().challengesCompleted;
    },
    error => {
      console.log(error);
    }
  );

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
