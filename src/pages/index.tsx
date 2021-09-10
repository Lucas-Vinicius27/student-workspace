import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import logoGoogle from '../../public/icons/google-icon.svg';
import logoFull from '../../public/logo-full.svg';
import logo from '../../public/logo.svg';
import styles from '../styles/pages/index.module.scss';

const Index: NextPage = () => {
  return (
    <main className={styles.container}>
      <Head>
        <title>Student Workspace</title>
      </Head>
      <aside>
        <Image src={logo} alt="Logo do sistema" />
      </aside>
      <section>
        <div className={styles.mainContent}>
          <Image src={logoFull} alt="Student Workspace" />
          <h1>Bem-Vindo</h1>
          <Link href="/home" passHref>
            <a>
              <button className={styles.createRoom}>
                <Image src={logoGoogle} alt="Logo do Google" />
                <span>Faça login com sua conta do Google</span>
              </button>
            </a>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Index
