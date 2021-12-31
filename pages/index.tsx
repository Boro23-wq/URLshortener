import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useState } from 'react'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [value, setValue] = useState<string>("https://sboro.vercel.app/")
  const [shortUrl, setShortUrl] = useState<string>("")

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: value }),
    });

    const data = await res.json();
    setShortUrl(`${document.location.protocol}//${document.location.host}/${data.short}`)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>URL Shortener - Boro</title>
        <meta name="description" content="URL Shortener built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className='text-purple-500'>URL Shortener!</span>
        </h1>

        {/* Form */}
        {shortUrl ? (<a href={shortUrl} className="md:flex md:items-center mb-6 mt-10">{shortUrl}</a>) : (<form className="w-full max-w-sm mt-20" onSubmit={onSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                URL
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="url" onChange={(e) => setValue(e.target.value)} type="text" value={value} placeholder='www.urlshortener.com' />
            </div>
          </div >
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                Shorten
              </button>
            </div>
          </div>
        </form >)
        }

      </main >
    </div >
  )
}

export default Home
