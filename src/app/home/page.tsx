import { dateTransform } from '@/utils/dateTransform'
import SentimentAnalyzer from '../../components/sentimentAnalyzer/SentimentAnalyzer';


async function getData () {
  const res = await fetch('http://localhost:3000/api/users')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function HomePage () {
  const { users } = await getData()

  return (
    <main >
      <SentimentAnalyzer />
    </main>
  )
}
