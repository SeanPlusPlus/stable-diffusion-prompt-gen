import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import _sampleSize from 'lodash/sampleSize'
import _sample from 'lodash/sample'

const URL = 'https://raw.githubusercontent.com/WASasquatch/noodle-soup-prompts/main/nsp_pantry.json'

const getPrompt = (json) => {
  const s = Object.keys(json)
  const keys = _sampleSize(s, 4)
  const arr = []
  keys.forEach((k) => {
    const term = _sample(json[k])
    arr.push(term)
  })
  return arr.map((t, i) => (t + (i < arr.length -1 ? ', ' : ''))).join('')
}

export default function Home() {
  const [data, setData] = useState(null)
  const [prompts, setPrompts] = useState([])
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        URL,
      );
      setData(result.data)
      const prompt = getPrompt(result.data)
      setPrompts([prompt, ...prompts])
    }
    fetchData()
  }, [])
  const reGenerate = () => {
    const prompt = getPrompt(data)
    setPrompts([prompt, ...prompts])
    console.log(prompts);
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
          Get a random basket of terms from <a target="_blank" rel="noopener noreferrer" href="https://github.com/WASasquatch/noodle-soup-prompts/blob/main/nsp_pantry.json">
            Noodle Soup Prompts
          </a>
        </p>

        <p>
          <button className={styles.btn} onClick={reGenerate}>
            GENERATE 
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
