import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../contexts/AuthContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
        <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp
