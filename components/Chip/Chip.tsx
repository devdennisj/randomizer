

interface Props {
  title: string;
  link: string;
}
import styles from './chip.module.css'

function Chip({ link, title }: Props) {
  return (
    <div className={`${styles.chip} animate__animated animate__zoomIn animate__faster`}>
      <a href={link}>
        {title}
      </a>
    </div>
  )
}

export default Chip