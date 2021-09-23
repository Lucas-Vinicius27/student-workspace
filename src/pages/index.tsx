import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import logoGoogle from '../../public/icons/google-icon.svg';
import logoFull from '../../public/logo-full.svg';
import logo from '../../public/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from "../hooks/useAuth";
import styles from '../styles/pages/index.module.scss';

const Index: NextPage = () => {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  async function handleLoginGoogle() {
    if (!user) {
      await signInWithGoogle();
    }

    router.push("/home");
  }

  return (
    <main className={styles.container}>
      <Head>
        <title>Student Workspace</title>
      </Head>
      <aside className={styles.srOnly}>
        <Image src={logo} alt="Logo do sistema" />
      </aside>
      <section>
        <div className={styles.mainContent}>
          <Image src={logoFull} alt="Student Workspace" />
          <h1>Bem-Vindo(a)</h1>
          <p>Aqui será o lugar onde você poderá maximizar seus estudos!</p>
          <Button estiloButton="google" onClick={handleLoginGoogle}>
            <Image src={logoGoogle} alt="Logo do Google" />
            <span>Faça login com sua conta do Google</span>
          </Button>
        </div>
      </section>
    </main>
  )
}

export default Index
