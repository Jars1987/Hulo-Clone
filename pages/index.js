import Head from 'next/head';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Results from '../components/Results';
import requests from '../utils/request';

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Hulo Clone</title>
        <meta name='Hulo Clone' content='Hulo Clone with TMDB and NEXT.JS' />
        <link
          rel='icon'
          href='https://deadline.com/wp-content/uploads/2021/05/Hulu-Logo.jpg'
        />
      </Head>

      <Header />

      <Navbar />

      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending
    }`
  ).then(res => res.json());

  return {
    props: {
      results: request.results,
    },
  };
}
