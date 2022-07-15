import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Contexts
import {CandyMachineContextProvider} from '../contexts/candyMachineContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CandyMachineContextProvider>
      <Component {...pageProps} />
    </CandyMachineContextProvider>
  );
}

export default MyApp
