'use client';

import React, { useState } from 'react';
import styles from './translator.module.scss';

interface WordResult {
  word: string;
  ipa: string;
}

interface IPAResponse {
  input: string;
  results: WordResult[];
  phrase_ipa: string;
}

const Translator: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Error en la traducción');
      }

      const data: IPAResponse = await response.json();
      setResult(data.phrase_ipa || '');
    } catch (err: any) {
      setError(err.message || 'Error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const speak = () => {
    if (!text || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={styles.traductor}>
      <div className={styles.traductor__container}>
        
        {/* Lado izquierdo - Resultado IPA */}
        <div className={styles.ipaSection}>
          <div className={styles.ipaSection__content}>
            <span className={styles.ipaSection__label}>Fonética IPA</span>
            <div className={styles.ipaSection__result}>
              {loading ? (
                <span className={styles.ipaSection__text}>Cargando...</span>
              ) : error ? (
                <span className={styles.ipaSection__text} style={{ color: '#ff4444', fontSize: '1.2rem' }}>
                  {error}
                </span>
              ) : (
                <span className={styles.ipaSection__text}>
                  {result ? `/${result}/` : '/IPA/'}
                </span>
              )}
            </div>
            
            <button className={styles.audioBtn} disabled={loading || !result || !!error} onClick={speak}>
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
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTranslate()}
              />
              <button 
                className={styles.traducirBtn}
                onClick={handleTranslate}
                disabled={loading}
              >
                {loading ? '...' : 'Traducir'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;