import { flushSync } from 'react-dom';
import { Game } from '../../types/game.types';
import styles from './randomizer.module.css';
import { useState } from 'react';

interface Props {
  games: Game[]
}

function Randomizer({ games }: Props) {
  const [randomGame, setRandomGame] = useState<Game | null>(null)

  const handleClick = () => {
    flushSync(() => {
      setRandomGame(null);
    });

    const randomIndex = Math.floor(Math.random() * games.length + 1);

    setRandomGame(games[randomIndex]);
  };

  return (
    <div className={styles.root}>
      {randomGame && (
        <h2 className={`${styles.name} animate__animated animate__flipInX`}>
          <a href={randomGame?.link}>
            {randomGame?.title}
          </a>
        </h2>
      )}
      <button
        className={`${styles.button} animate__animated animate__fadeInUp`}
        onClick={handleClick}>Pick a game</button>
    </div>
  )
}

export default Randomizer;