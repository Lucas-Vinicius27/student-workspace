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

export const getServerSideProps: GetServerSideProps<HomeProps> = async (ctx) => {
  const { id } = ctx.req.cookies;

  // Sem o id do usuário não há progresso para carregar: volta para o login
  if (!id) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  const dataFirebase = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/dataFirebase?id=${encodeURIComponent(id)}`);

  // Não renderiza com valores zerados: o ChallengesContext gravaria por cima do progresso salvo
  if (!dataFirebase.ok) {
    throw new Error(`Falha ao carregar os dados do usuário (status ${dataFirebase.status})`);
  }

  const data = await dataFirebase.json();

  return {
    props: {
      level: Number(data.level),
      currentXp: Number(data.currentXp),
      challengesCompleted: Number(data.challengesCompleted)
    }
  }
}
