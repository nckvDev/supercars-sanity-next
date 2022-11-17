import Image from 'next/image'
import Head from 'next/head'
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import styles from '../../styles/Home.module.css'

export default function Supercars({ supercar }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{supercar.name}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1 className={styles.title}> {supercar.name}</h1>
        <Image src={urlFor(supercar.images).url()} alt='supercar' width={500} height={300} />
        <h3> {supercar.detail}</h3>
      </main>
    </div>
  )
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
})

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

export async function getStaticPaths() {
  const supercars = await client.fetch(`*[_type == "supercars"]`)

  const paths = supercars.map(supercar => ({
    params: { id: supercar._id },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const supercars = await client.fetch(`*[_type == "supercars" && _id >= "${params.id}"]`)
  if (supercars.length > 0) {
    const supercar = supercars[0]
    return {
      props: {
        supercar,
      },
    }
  }
  return {
    props: {},
  }
}