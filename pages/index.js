import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { getRandomPrompt, getCuratedPrompt } from '../utils/prompt'

const URL = 'https://raw.githubusercontent.com/WASasquatch/noodle-soup-prompts/main/nsp_pantry.json'

export default function Home() {
  const [data, setData] = useState(null)
  const [prompts, setPrompts] = useState([])
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        URL,
      );
      setData(result.data)
      const prompt = getRandomPrompt(result.data)
      setPrompts([prompt, ...prompts])
    }
    fetchData()
  }, [])
  const random = () => {
    const prompt = getRandomPrompt(data)
    setPrompts([prompt, ...prompts])
  }
  const curate = () => {
    const prompt = getCuratedPrompt(data)
    setPrompts([prompt, ...prompts])
  }
  const copy = () => {
    console.log(prompts);
    const str = prompts.map((p) => p).join('\n')
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(str);
      alert('Prompts copied to clipboard')
    } 
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Stable Diffusion Prompt Gen</title>
        <meta name="description" content="Get random stable diffusion prompts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Stable Diffusion Prompt Gen
        </h1>

        <p className={styles.description}>
          Get a basket of terms from <a target="_blank" rel="noopener noreferrer" href="https://github.com/WASasquatch/noodle-soup-prompts/blob/main/nsp_pantry.json">
            Noodle Soup Prompts
          </a>
        </p>

        <p>
          <button className={styles.btn} onClick={random}>
            RANDOM
          </button>
          <button className={styles.btn} onClick={curate}>
            CURATED
          </button>
          <button className={styles.btn} onClick={copy}>
            COPY 
          </button>
        </p>

        { prompts.map((p) => (
            <div key={p} className={styles.grid}>
              <div href="https://nextjs.org/docs" className={styles.card}>
                <p>{p}</p>
              </div>
            </div>
          ))
        }

      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/SeanPlusPlus"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by SeanPlusPlus
        </a>
      </footer>
    </div>
  )
}
