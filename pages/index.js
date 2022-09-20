import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import _sampleSize from 'lodash/sampleSize'
import _sample from 'lodash/sample'

const URL = 'https://raw.githubusercontent.com/WASasquatch/noodle-soup-prompts/main/nsp_pantry.json'

const getTerms = (json) => {
  const s = Object.keys(json)
  const keys = _sampleSize(s, 4)
  const arr = []
  keys.forEach((k) => {
    const term = _sample(json[k])
    arr.push(term)
  })
  return arr
}

export default function Home() {
  const [data, setData] = useState(null)
  const [terms, setTerms] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        URL,
      );
      setData(result.data)
      setTerms(getTerms(result.data))
    }
    fetchData()
  }, [])
  const reGenerate = () => {
    setTerms(getTerms(data))
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

        <div className={styles.grid}>
          {terms ? (
            <div href="https://nextjs.org/docs" className={styles.card}>
              <p>{terms && terms.map((t, i) => (<span key ={t}>{t}{i < terms.length -1 ? ', ' : ''} </span>))}</p>
            </div>
          ) : (
            <div className="lds-dual-ring"></div>
          )}
        </div>
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
