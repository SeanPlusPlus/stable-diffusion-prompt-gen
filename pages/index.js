import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { getRandomPrompt, getSemiRandomPrompt } from '../utils/prompt'

const URL = 'https://raw.githubusercontent.com/WASasquatch/noodle-soup-prompts/main/nsp_pantry.json'

export default function Home() {
  const [data, setData] = useState(null)
  const [modal, setModal] = useState('')
  const [prompts, setPrompts] = useState([])
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        URL,
      );
      setData(result.data)
      const { text, attributes } = getRandomPrompt(result.data)
      const prompt = {type: 'random', text, attributes}
      setPrompts([prompt, ...prompts])
    }
    fetchData()
  }, [])
  const random = () => {
    const { text, attributes } = getRandomPrompt(data)
    const prompt = {type: 'random', text, attributes}
    setPrompts([prompt, ...prompts])
  }
  const semiRandom = () => {
    const { text, attributes } = getSemiRandomPrompt(data)
    const prompt = {type: 'semiRandom', text, attributes}
    setPrompts([prompt, ...prompts])
  }
  const copy = () => {
    const str = prompts.map((p) => p.text).join('\n')
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(str)
      setModal('modal-open')
    } 
  }
  const close = () => {
    setModal('')
  }
  return (
    <div className="grid-bg min-h-screen">
      <Head>
        <title>Stable Diffusion Prompt Gen</title>
        <meta name="description" content="Get random stable diffusion prompts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1 className="text-4xl font-bold pt-20">
          Stable Diffusion Prompt Gen
        </h1>

        <p className="mt-4 text-xl">
          Get a basket of terms from <a className="link text-sky-400" target="_blank" rel="noopener noreferrer" href="https://github.com/WASasquatch/noodle-soup-prompts/blob/main/nsp_pantry.json">
            Noodle Soup
          </a>
        </p>

        <div className="mt-4">
          <button className="btn btn-primary mb-2 md:mr-3 w-56" onClick={random}>
            PURE-RANDOM PROMPT
          </button>
          <button className="btn btn-secondary mb-2 w-56" onClick={semiRandom}>
            SEMI-RANDOM PROMPT
          </button>
          <button className="btn btn-info mb-2 md:ml-3 w-56" onClick={copy}>
            COPY TO CLIPBOARD
          </button>
        </div>

        <div className="flex mt-2">
          <div className="m-auto">
            { prompts.map((p, i) => (
              <div key={i} className="card bg-base-100 shadow-xl mb-4 w-120 mr-4 ml-4 md:mr-0 md:ml-0">
                <div className="card-body">
                  <p>
                    {p.text}
                  </p>
                  <div>
                    {p.attributes.map((a) => (
                      <>{a}, </>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <footer className="text-center mb-10">
        Powered by&nbsp;<a
          href="https://twitter.com/SeanPlusPlus"
          target="_blank"
          rel="noopener noreferrer"
          className="link text-sky-400"
        >
          SeanPlusPlus
        </a>
      </footer>

      <div className={`modal ${modal}`}>
        <div className="modal-box">
          <p className="py-1">Text copied to clipboard!</p>
          <p className="py-1">Feel free to generate more prompts, or refresh and start again</p>
          <div className="modal-action">
            <button className="btn" onClick={close}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
