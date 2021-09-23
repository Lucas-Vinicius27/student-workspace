import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../contexts/AuthContext';
import { ChallengesContextProvider } from '../contexts/ChallengesContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChallengesContextProvider>
        <Component {...pageProps} />
      </ChallengesContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp
