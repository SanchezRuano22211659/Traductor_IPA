'use client';

import React from 'react';
import styles from './translator.module.scss';

const Translator: React.FC = () => {
  return (
    <div className={styles.traductor}>
      <div className={styles.traductor__container}>
        
        {/* Lado izquierdo - Resultado IPA */}
        <div className={styles.ipaSection}>
          <div className={styles.ipaSection__content}>
            <span className={styles.ipaSection__label}>Fonética IPA</span>
            <div className={styles.ipaSection__result}>
              <span className={styles.ipaSection__text}>/IPA/</span>
            </div>
            
            <button className={styles.audioBtn}>
              <span className={styles.audioBtn__icon}>🔊</span>
              <span className={styles.audioBtn__text}>Escuchar pronunciación</span>
            </button>
          </div>
        </div>

        {/* Lado derecho - Input */}
        <div className={styles.inputSection}>
          <div className={styles.inputSection__content}>
            <span className={styles.inputSection__label}>Término técnico</span>
            
            <div className={styles.inputSection__field}>
              <input
                type="text"
                placeholder="Ingresa palabra"
                className={styles.inputSection__input}
                defaultValue=""
              />
              <button className={styles.traducirBtn}>
                Traducir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;