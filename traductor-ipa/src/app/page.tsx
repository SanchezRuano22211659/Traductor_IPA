'use client';
import styles from "./page.module.scss";
import React from "react";
import { useRouter } from 'next/navigation';

const LandingPage: React.FC = () => {
  const router = useRouter();
  return (
    <main className={styles.landing}>
      {/* Hero / Resumen */}
      <section className={styles.hero}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            Traductor <span>inglés técnico → IPA</span>
          </h1>
          <p className={styles.hero__subtitle}>
            Convierte términos de desarrollo, redes, SQL y DevOps a su
            representación fonética exacta. Aprende a pronunciar como un nativo
            sin perder el contexto técnico.
          </p>
          <div className={styles.hero__cta}>
            <button className={styles.btn_primary} onClick={() => router.push('/translator')}>Probar traductor</button>
          </div>
        </div>
        <div className={styles.hero__visual}>
          <div className={styles.demo_card}>
            <div className={styles.demo_card__item}>
              <span className={styles.word}>asynchronous</span>
              <span className={styles.ipa}>/eɪˈsɪŋ.krə.nəs/</span>
            </div>
            <div className={styles.demo_card__item}>
              <span className={styles.word}>middleware</span>
              <span className={styles.ipa}>/ˈmɪd.l̩.weər/</span>
            </div>
            <div className={styles.demo_card__item}>
              <span className={styles.word}>cache</span>
              <span className={styles.ipa}>/kæʃ/</span>
            </div>
            <div className={styles.demo_card__item}>
              <span className={styles.word}>query</span>
              <span className={styles.ipa}>/ˈkwɪə.ri/</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introducción */}
      <section className={styles.intro} id="introduccion">
        <h2>Introducción</h2>
        <p>
          En el contexto globalizado actual en la industria tecnológica, el
          dominio del idioma inglés se ha convertido en una competencia
          fundamental para los profesionales de la ingeniería en Sistemas
          Computacionales. Sin embargo, uno de los desafíos más recurrentes que
          enfrentan los estudiantes y profesionistas hispanohablantes es la
          correcta pronunciación de la terminología técnica especializada, la
          cual frecuentemente difiere de las reglas fonéticas del español y
          presenta particularidades propias del inglés técnico.
        </p>
        <p>
          La comunicación efectiva en entornos laborales internacionales,
          reuniones virtuales, presentaciones técnicas y colaboraciones en
          equipos multiculturales requiere no solo comprender el significado de
          términos como <strong>“asynchronous”</strong>,{" "}
          <strong>“middleware”</strong>,<strong>“cache”</strong> o{" "}
          <strong>“query”</strong>, sino también articularlos de manera clara y
          comprensible.
        </p>
      </section>

      {/* Problema */}
      <section className={styles.problem} id="problema">
        <h2>Formulación del problema</h2>
        <p>
          En el área de Ingeniería en Sistemas Computacionales, el uso de
          términos técnicos en inglés es constante y fundamental. Conceptos como{" "}
          <em>framework, deployment, query optimization, thread, rollback</em>{" "}
          forman parte del lenguaje cotidiano. Aunque muchos comprenden su
          significado, existe una dificultad recurrente en la correcta
          pronunciación.
        </p>
        <p>
          Esta problemática se origina porque la formación académica en
          contextos hispanohablantes no enfatiza la pronunciación técnica
          especializada. Como consecuencia, se generan inseguridades en
          exposiciones, entrevistas técnicas o trabajo colaborativo
          internacional.
        </p>
        <p>
          Los traductores tradicionales no proporcionan una representación
          fonética precisa en IPA enfocada en terminología de sistemas, ni
          consideran frases técnicas compuestas.
        </p>
        <div className={styles.problem__highlight}>
          <span>
            → Surge la necesidad de un sistema que traduzca términos y frases
            técnicas a IPA.
          </span>
        </div>
      </section>

      {/* Antecedentes */}
      <section className={styles.background} id="antecedentes">
        <h2>Antecedentes</h2>
        <p>
          La traducción automática de texto a fonética se ha desarrollado en el
          campo del PLN y la síntesis de voz, con la conversión grafema a fonema
          (G2P) como base. Estudios como los de Cheng et al. (2024) documentan
          arquitecturas, algoritmos y métricas para la optimización fonológica.
        </p>
        <p>
          Bilcu (2008) abordó el mapeo texto-fonema mediante redes neuronales,
          siendo antecedente metodológico para sistemas que aprenden
          correspondencias fonológicas a partir de corpus etiquetados.
        </p>
        <p>
          Chunata et al. (2018) destaca el uso de la fonética articulatoria en
          el desarrollo de la pronunciación inglesa. Instituciones como la UNAM
          reconocen la necesidad del inglés en contextos científicos,
          fundamentando la pertinencia de esta herramienta.
        </p>
      </section>

      {/* Justificación + Objetivos combinados */}
      <section className={styles.justification} id="justificacion">
        <h2>Justificación</h2>
        <p>
          La brecha entre el conocimiento técnico escrito y la competencia oral
          en inglés técnico constituye una barrera significativa para la
          inserción laboral y el desarrollo profesional en México y
          Latinoamérica. Este sistema contribuye a reducir dicha brecha mediante
          el uso innovador de IA aplicada a la educación.
        </p>
      </section>

      <section className={styles.objectives} id="objetivos">
        <h2>Objetivos</h2>
        <div className={styles.objectives__grid}>
          <div className={styles.objective_card}>
            <h3>General</h3>
            <p>
              Desarrollar un sistema basado en IA y NLP que traduzca términos
              técnicos de Ingeniería en Sistemas a IPA, facilitando la
              pronunciación correcta en inglés.
            </p>
          </div>
          <div className={styles.objective_card}>
            <h3>Específicos</h3>
            <ul>
              <li>
                Construir un dataset de ≥500 términos técnicos con su IPA.
              </li>
              <li>
                Implementar un modelo G2P que genere transcripciones precisas.
              </li>
              <li>
                Desarrollar una API con FastAPI para consultar pronunciaciones.
              </li>
              <li>
                Diseñar interfaz web intuitiva para obtener IPA al instante.
              </li>
              <li>Validar precisión contra fuentes fonéticas confiables.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Metas + Estado del Arte */}
      <section className={styles.goals}>
        <h2>Metas y Estado del Arte</h2>
        <p>
          <strong>Meta:</strong> Crear un corrector basado en el alfabeto IPA
          centrado en el ámbito de sistemas.
        </p>
        <p>
          <strong>Estado del arte:</strong> La transcripción fonética ha
          evolucionado desde redes neuronales (Bilcu, 2008) hasta arquitecturas
          transformer y modelos de atención (Cheng et al., 2024). Estos permiten
          un mapeo contextual avanzado, crucial para términos técnicos
          complejos.
        </p>
      </section>
    </main>
  );
};

export default LandingPage;