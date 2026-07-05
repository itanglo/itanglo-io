import Image from 'next/image'
import styles from './Avatar.module.css'

export default function Avatar({
  src,
  alt,
  float = false,
}: {
  src: string
  alt: string
  float?: boolean
}) {
  return (
    <div className={`${styles.avatar}${float ? ` ${styles.avatarFloat}` : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={209}
        height={272}
        className={styles.photo}
      />
    </div>
  )
}
