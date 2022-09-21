import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { getRandomPrompt, getSemiRandomPrompt } from '../utils/prompt'

const URL = 'https://raw.githubusercontent.com/WASasquatch/noodle-soup-prompts/main/nsp_pantry.json'

export default function Home() {
  const [data, setData] = useState(null)
  const [keys, setKeys] = useState([])
  const [prompts, setPrompts] = useState([])
  const [attribute, setAttribute] = useState(null)
  const [terms, setTerms] = useState([])
  const [semiRandomAttributes, setSemiRandomAttributes] = useState([])

  // modals
  const [copyModal, setCopyModal] = useState('')
  const [attributeModal, setAttribueModal] = useState('')
  const [semiRandomModal, setSemiRandomModal] = useState('')

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        URL,
      );
      setData(result.data)
      const keys = Object.keys(result.data)
      keys.sort()
      setKeys(keys)
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
  const selectAttribute = (e) => {
    console.log(e.target.value)
    const value = e.target.value
    setSemiRandomAttributes([value, ...semiRandomAttributes])
  }
  const semiRandom = () => {
    console.log('**', semiRandomAttributes);
    setSemiRandomModal('')
    const { text, attributes } = getSemiRandomPrompt(data, semiRandomAttributes)
    const prompt = {type: 'semiRandom', text, attributes}
    console.log('*', prompt);
    setPrompts([prompt, ...prompts])
  }
  const openSemiRandom = () => {
    setSemiRandomModal('modal-open')
  }
  const getTerms = (e) => {
    const attribute = e.target.getAttribute('data-name')
    setAttribute(attribute)
    setTerms(data[attribute])
    setAttribueModal('modal-open')
  }
  const copy = () => {
    const str = prompts.map((p) => p.text).join('\n')
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(str)
      setCopyModal('modal-open')
    } 
  }
  const close = () => {
    setCopyModal('')
    setAttribueModal('')
  }
  return (
    <div className="grid-bg min-h-screen">
      <Head>
        <title>Stable Diffusion Prompt Gen</title>
        <meta name="description" content="Get random stable diffusion prompts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1 className="text-4xl font-bold pt-10 md:pt-20">
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
          <button className="btn btn-secondary mb-2 w-56" onClick={openSemiRandom}>
            SEMI-RANDOM PROMPT
          </button>
          <button className="btn btn-info mb-2 md:ml-3 w-56" onClick={copy}>
            COPY TO CLIPBOARD
          </button>
        </div>

        <div className="flex mt-2">
          <div className="m-auto">
            { prompts.map((p, i) => (
              <div key={i} className="card card-compact bg-base-100 shadow-xl max-w-[700px] mb-4 mr-4 ml-4 md:mr-0 md:ml-0">
                <div className="card-body">
                  <p>
                    {p.text}
                  </p>
                  <div>
                    {p.attributes.map((a) => (
                      <span onClick={getTerms} data-name={a} className="badge mr-1 hover:cursor-pointer hover:text-sky-500" key={a}>{a}</span>
                    ))}
                    {p.type === 'semiRandom' && (
                      <button className="btn btn-square btn-sm btn-secondary float-right hover:cursor-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </button>
                    )}
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

      <div className={`modal ${copyModal}`}>
        <div className="modal-box">
          <p className="py-1">Text copied to clipboard!</p>
          <p className="py-1">Feel free to generate more prompts, or refresh and start again</p>
          <div className="modal-action">
            <button className="btn" onClick={close}>Close</button>
          </div>
        </div>
      </div>

      <div className={`modal ${attributeModal}`}>
        <div className="modal-box">
        <h3 className="font-bold text-2xl">{attribute}</h3>
          <div className="py-4 text-md">
            {terms.map((t, i) => (
              <span key={i} className="mr-1">
                {t.length < 38 ? (
                  <span className="badge">{t}</span>
                ) : (
                  <span>{t} ~ </span>
                )}
              </span>
            ))}
          </div>
          <div className="modal-action">
            <button className="btn" onClick={close}>Close</button>
          </div>
        </div>
      </div>

      <div className={`modal ${semiRandomModal}`}>
        <div className="modal-box">
          <h3 className="font-bold text-2xl">Build a Semi Random Prompt</h3>

          <div className="mt-2">
            <select
              className="select select-bordered w-full max-w-xs"
              defaultValue={"default"}
              onChange={selectAttribute}
            >
              <option name="default">Select Attribute</option>
              {keys.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="modal-action">
            <button className="btn" onClick={semiRandom} disabled={semiRandomAttributes.length === 0}>Generate</button>
          </div>
        </div>
      </div>

    </div>
  )
}
