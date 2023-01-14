import type { AppProps } from 'next/app'
import 'animate.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
