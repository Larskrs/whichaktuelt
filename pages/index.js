import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { ApiError } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'
import CustomProgressBar from '@/components/ProgressBar'


const inter = Inter({ subsets: ['latin'] })

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
async function fetchAsync (url) {
  // await response of fetch call
  let response = await fetch(url);
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  return data;
}

export async function getServerSideProps (ctx) {

  let questions = await fetchAsync("http://" + ctx.req.headers.host + "/api/v1/questions")

  // const starter = questions.result.shift();
  // questions.result = shuffle(questions.result)
  // questions.result = questions.result.unshift([starter ])


  return {
    props: {
      questions: questions.result
    },
  }


}



export default function Home({questions}) {

  const router = useRouter()


  const [id, setId] = useState(0)
  const [winner, setWinner] = useState()
  const [characters, setCharacters] = useState([
    { name: 'jesper', value: 0, quote: 'Bjew! Bjef... Solsikkefrø', avatar: `/images/background/jesper.jpg`, image: '/images/background/jesper.jpg'},
    { name: "carl", value: 0, quote: "Aktuelt today?", image: '/images/background/carl.jpg'},
    { name: "olav", value: 0, image: '/images/background/olav.jpg'},
    { name: "lars", value: 0, quote: 'You & I make cool stuff with computers.', image: '/images/background/lars.gif' },
    { name: "lucas", value: 0, image: '/images/background/lucas.jpg' },
    { name: 'daniel', value: 0, quote: 'Still like underaged children, nice website.', avatar: `/images/members/daniel.gif`, image: '/images/background/daniel.jpg'},
    { name: "levin", value: 0,  image: 'https://gyazo.com/414d42e3737f7f21768bb209af4b37a1.gif' },
    { name: "kristoffer", value: 0, image: '/images/background/kristoffer.jpg' }
  ])
  const [history, setHistory] = useState([])



  
  return (
    <div className={inter.className}>

      
      <Head>
        <title>Which Aktuelt are you?</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container} key={winner} style={winner ? {background: `url(${characters.filter(c => c.name === winner)[0].image})`} : {} }></div>
      <main className={styles.main} >
      <CustomProgressBar className={styles.progress} color={`linear-gradient(90deg, var(--yellow) 0%, var(--purple) 100%);`} completed={Math.round((100 * id) / questions.length)} />
      {charactersShow()}
        


      { id <= questions.length && <h1>How Aktuelt are you?</h1> }

        { id >= questions.length &&

            <div key={winner} className={styles.winner}>
              <h1>You are {winner ? capitalizeFirst(winner) : "..."}</h1>
              {winner && <p>{getQuote(winner)}</p> }
              <Image src={getAvatar(winner)} style={{objectFit: `contain`}} width={750} loading={'eager'} height={550}/>
            </div>

        }
        <div className={styles.questions}>
          
          {questions.map((q, i) => {
            return (<p  onClick={() => {setId(i)}} style={questions.indexOf(q) != id ? {opacity: 0.25} : {}} key={q.prompt}>{q.prompt} {questions.indexOf(q) == id ? "<" : ""}</p>)
          })}
        </div>

        {id != NaN && id < questions.length  && <div key={id}>{questionShow()}</div>}
          

       

      </main>
    </div>
  )

  function charactersShow() {

    if (id >= questions.length) { return; }

    return (
       <div className={styles.characters}>
          {sortByKey(characters, 'value').reverse().map((c, i) => {

            // if ( c.value <= 0) { return  }
            const opacity = (-1^i) * .25 + 1 + .25
            const total = totalValues();
            const percentage = Math.round((100 * c.value) / total)
            if (i > 2) { return}
            if (c.value <= 0) { return <p></p>}
            return  <>
              <p 
              key={c.name}
              onClick={() => {characters.map((char) => { char.value = (char.name === c.name) ? 999 : 0}); setId(999); setWinner(c.name)}}
              style={{opacity: opacity}}
              >{capitalizeFirst(c.name)} { percentage >= 100 ? 100 : percentage }%</p>
              </>
          } )}
        </div> 
    )
  }


  function questionShow() {

    const question = questions[id]

    const answers = question.answers

    return (
      <div className={styles.question}>
        
        <p>{id}/{questions.length}</p>
        <h2>{question.prompt}</h2>
        <div className={styles.answers}>
        {answers.map((a, i) => {
          return (<div style={{animationDelay: `${i * 500}ms`}} key={i} className={styles.answer} onClick={(event) => {handleValueChange(a.values); }}>{a.prompt}</div>)
        })}
        </div>
      </div>
    )

  }

  function getAvatar (name) {
    const character = characters.filter(c => c.name === name)[0]

    if (character.avatar) {
      return character.avatar
    } 
    return '/images/members/' + name + '.png'

  }
  function getQuote (name) {
    const character = characters.filter(c => c.name === name)[0]
    if (character.quote) {
      return character.quote
    }

  }

  function handleValueChange (values) {

    values.forEach(v => {
      handleCharacter(v.name, v.value)
    });
    function handleCharacter (name, value) {

    const character = characters.filter(c => c.name === name)[0]
    character.value = character.value + value;
    setCharacters([...characters.filter(c => c.name !== name), character])
    
    setId(id + 1)

  } 
  findWinner()
  
}
function findWinner () {
  let top = 0
  
  characters.map((c) => {
    if (c.value > top) {
      setWinner(c.name)
      top = c.value
    }
  })

}
function getGreatestValue () {
  let top = ""
  
  characters.map((c) => {
    if (c.value > top) {
      top = c.name
    }
  })
  return top
}

      function totalValues () {
        let total = 0
        characters.forEach(v => {
          total += v.value
        });
        return total
      }

      function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    function capitalizeFirst (str) {

      const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      return str2

    }
  }


