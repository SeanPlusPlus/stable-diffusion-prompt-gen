import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { getRandomPrompt, getSemiRandomPrompt } from '../utils/prompt'

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
      const prompt = {type: 'random', text: getRandomPrompt(result.data)}
      setPrompts([prompt, ...prompts])
    }
    fetchData()
  }, [])
  const random = () => {
    const prompt = {type: 'random', text: getRandomPrompt(data)}
    setPrompts([prompt, ...prompts])
  }
  const semiRandom = () => {
    const prompt = {type: 'semiRandom', text: getSemiRandomPrompt(data)}
    setPrompts([prompt, ...prompts])
  }
  const copy = () => {
    const str = prompts.map((p) => p.text).join('\n')
    console.log('prompts', prompts);
    console.log('str', str);
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(str)
    } 
  }
  return (
    <div>
      <Head>
        <title>Stable Diffusion Prompt Gen</title>
        <meta name="description" content="Get random stable diffusion prompts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1 className="text-3xl font-bold">
          Stable Diffusion Prompt Gen
        </h1>

        <p className="">
          Get a basket of terms from <a target="_blank" rel="noopener noreferrer" href="https://github.com/WASasquatch/noodle-soup-prompts/blob/main/nsp_pantry.json">
            Noodle Soup Prompts
          </a>
        </p>

        <p>
          <button className="" onClick={random}>
            PURE-RANDOM PROMPT
          </button>
          <button className="" onClick={semiRandom}>
            SEMI-RANDOM PROMPT
          </button>
          <button className="" onClick={copy}>
            COPY TO CLIPBOARD
          </button>
        </p>

        { prompts.map((p, i) => (
            <div key={i} className="">
              <div href="https://nextjs.org/docs" className="">
                <p className={p.type}>{p.text}</p>
              </div>
            </div>
          ))
        }

      </main>

      <footer className="text-center">
        Powered by&nbsp;<a
          href="https://twitter.com/SeanPlusPlus"
          target="_blank"
          rel="noopener noreferrer"
        >
          SeanPlusPlus
        </a>
      </footer>
    </div>
  )
}
