import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'

import styles from '../styles/Home.module.css'
import Chip from '../components/Chip/Chip'
import { Game } from '../types/game.types'
import Randomizer from '../components/Randomizer'

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [input, setInput] = useState("")

  const handleSubmit = async () => {
    const url = `/api/games?profile=${input}`

    const response = await axios.get(url)

    if (response.status === 200) {
      setGames(response.data.games)
    }
  }

  return (
    <>
      <Head>
        <title>Itch.io randomizer</title>
        <meta name="description" content="Find your next game to play!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${styles.column}`}>
        <h1 className={styles.header}>Itch.io randomizer</h1>

        <div className={`${styles.inputWrapper} ${styles.column}`}>
          <div className={styles.column}>

            <label htmlFor='Input' className={styles.label}>
              Page link
            </label>
            <input
              id="Input"
              className={styles.input}
              value={input}
              onInput={({ currentTarget }) => setInput(currentTarget.value)}
              placeholder='Your itch.io collection page link goes here'
              autoFocus
            />
          </div>
          <button className={styles.submitButton} onClick={handleSubmit}>Get games</button>
        </div>
        <ul className={styles.list}>
          {
            games.map((game) => (
              <li key={game.link}>
                <Chip title={game.title} link={game.link} />
              </li>
            ))
          }
        </ul>
        {games.length > 1 && <Randomizer games={games} />}
      </main>
    </>
  )
}
