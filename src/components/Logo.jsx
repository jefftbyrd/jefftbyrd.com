'use client';
import { motion } from 'motion/react';
import styles from '../styles/home.module.css';

export default function Logo(props) {
  return (
    <motion.h1
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={styles.logo}
    >
      Jeff <span className={styles.bump}>T</span> Byrd
    </motion.h1>
  );
}
