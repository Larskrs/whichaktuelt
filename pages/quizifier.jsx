
import styles from '../styles/Home.module.css'
import BlurPanel from '@/components/BlurPanel'
import CompressedDiv from '@/components/CompressedDiv'
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Quizifier () {

    const [jsonOutput, setJsonOutput] = useState("")
    const [questionPrompt, setQuestionPrompt] = useState("What is your favourite food?")
    const [author, setAuthor] = useState("")
    const [answers, setAnswers] = useState([])

      const [characters, setCharacters] = useState([
    { factors: [], name: 'jesper', value: 0, quote: 'Bjew! Bjef... Solsikkefrø', avatar: `/images/background/jesper.jpg`, image: '/images/background/jesper.jpg'},
    { factors: [], name: "carl", value: 0, quote: "Aktuelt today?", image: '/images/background/carl.jpg'},
    { factors: [], name: "olav", value: 0, quote: 'Not a racist, just a nihilist', image: '/images/background/olav.jpg'},
    { factors: [], name: "lars", value: 0, quote: 'You & I make cool stuff with computers.', image: '/images/background/lars.gif' },
    { factors: [], name: "lucas", value: 0, image: '/images/background/lucas.jpg' },
    { factors: [], name: 'daniel', value: 0, quote: 'Still like underaged children, nice website.', avatar: `/images/members/daniel.gif`, image: '/images/background/daniel.jpg'},
    { factors: [], name: "levin", value: 0,  image: 'https://gyazo.com/414d42e3737f7f21768bb209af4b37a1.gif' },
    { factors: [], name: "kristoffer", value: 0, image: '/images/background/kristoffer.jpg' }
  ])

  useEffect(() => {
    updateOutput();
  }, [author, answers])

    return (
        <>
        <div className={styles.container} style={{background: `url(https://images.pexels.com/photos/2874752/pexels-photo-2874752.jpeg)`, opacity: `1`}}>
            
        </div>
            <main className={styles.main} >
            <div className={styles.vertical} style={{width: `100%`, maxWidth: `700px`}}>

            <BlurPanel style={{background: `red`, width: `100%`, maxWidth: `500px`}} animated={true} padding={`1.5rem 2rem`}>
                <h1>Question Maker</h1>
                <p>Fill out the below form and save the output code.</p>
                <h3>Author Name</h3>
                <p>Fill out your own name or virtual username...</p>
                <input onChange={(event) => {setAuthor(event.target.value); updateOutput()}} type="text" name="author" id="" />
                <br />
                <h3>Question</h3>
                <p>Fill out the question or prompt/title for the question...</p>
                <div className={styles.vertical}>
                    <input onChange={(event) => {setQuestionPrompt(event.target.value); updateOutput()}} placeholder='What is your favourite food?...' type="text" name="title" id="title" />
                    <button onClick={(event) => {answers.push({prompt: `New answer (${answers.length})`, values: [{name: characters[0].name, value: 2}]}); updateOutput()}} >Add Answer</button>

                    {answers.map((answer, i) => {
                        return (
                            <CompressedDiv key={i} text={answer.prompt}>
                                <DisplayAnswer id={i} values={answer.values} prompt={answer.prompt} />
                            </CompressedDiv>
                        )
                    })}
                </div>

                

            </BlurPanel>
            
            <BlurPanel animated={true} padding={`.5rem 2rem`}>
                <div className={styles.row}>
                    <h2>Output</h2>
                    <button style={{width: `fit-content`}} onClick={() => {navigator.clipboard.writeText(jsonOutput)}}>Copy</button>
                </div>
                    <CompressedDiv text='output'>
                        {jsonOutput}
                    </CompressedDiv>
            </BlurPanel>
            </div>

            </main>
            
        </>
    );

    function DisplayAnswer ({prompt, id, values}) {

        return (
            <> 
            <div style={{
                display: `flex`,
                flexDirection: 'column',
                gap: `.5rem`,
                padding: `.25rem`,
                borderRadius: `8px`,
                width: `100%`,
            }}
            key={id}>
                <button onClick={(event) => {answers.splice(id, 1); updateOutput()}}>Delete</button>
                <form onSubmit={(event) => {
                        event.preventDefault();
                        answers.at(id).prompt = event.target[0].value;
                        updateOutput()}}
                    
                    className='prompt_Input'>
                    <input placeholder={`${prompt}...`} type="text" name="prompt" id="" />
                    <button>Save</button>
                </form>
                <CompressedDiv animate={false} defaultValue={false} text='Values' gap={`.5rem`}>
                    <button onClick={(event) => { answers.at(id).values.push({name: characters[0].name, value: 0}); updateOutput()}} >Add Value</button>
                    <div className='flex vertical spaced'>

                    {values.map((value, i) => {
                        
                        const answer = answers.at(id);
                        
                        return (
                            <div key={i} className={`flex spaced`}>
                                <div className='flex'>
                                    <select onChange={(event) => {answers.at(id).values.at(i).name = event.target.value; updateOutput()}} defaultValue={answers.at(id).values.at(i).name}>
                                        {characters.map ((c, i) => {
                                            return <option key={i} value={c.name} >{c.name}</option>
                                        })}
                                    </select>
                                    <FactorDisplay value={value.value} />
                                </div>
                                <div className='volume'>
                                    <button onClick={() => {answer.values.at(i).value += 1; updateOutput()}}>+</button>
                                    <button onClick={() => {answer.values.at(i).value -= 1; updateOutput()}}>-</button>
                                    {answer.values.length > 1 && <button onClick={() => {answers.at(id).values.splice(i, 1); updateOutput()}}>Del</button> }
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                </CompressedDiv>
            </div>

            <style jsx>{`
                .prompt_Input {
                    display: flex;
                    gap: .25rem;
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    border-radius: 8px;
                }
                .prompt_Input input {
                    width: 100%;
                    padding-right: 5rem;
                }
                .prompt_Input button {
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                    padding-inline: 1rem;
                    border-radius: 0;
                }
                .flex {
                    display: flex;
                    flex-direction: row;
                    gap: .5rem;
                    align-items: center;
                }
                .vertical {
                    display: flex;
                    flex-direction: column;
                    gap: .5rem;
                }
                .spaced {
                    justify-content: space-between;
                }
                .volume {
                    background: var(--gray-200);
                    border-radius: 16px;
                    overflow: hidden;
                    display: flex;
                    transition: all 400ms ease-in-out;
                }
                .volume button {
                    background: transparent;
                    border: 1px solid transparent;
                    border-radius: 0px;
                    min-width: 30px;
                }
                .volume button:hover {
                    background: var(--gray-300)
                }

                
            `}</style>
        </>
        )
    }

    function updateOutput() {

        const output =
        {
            prompt: questionPrompt,
            author: author,
            answers: 
                answers.map((ans) => {
                    return {
                        prompt: ans.prompt,
                        values: ans.values.map((v) => {
                            return { name: v.name, value: v.value }
                        })}
                })
            }
        setJsonOutput(
            JSON.stringify(output, null, "\t")
        )
    }
    function getAvatar (name) {
        const character = characters.filter(c => c.name === name)[0]
    
        if (character.avatar) {
          return character.avatar
        } 
        return '/images/members/' + name + '.png'
    
    }
}

function FactorDisplay ({value}) {

    if (value > 0) {
      return (<span style={{color: `var(--Tea)`}} className={styles.factor} >+{value}</span>)
    } else {
      return (<span style={{color: `var(--Pink)`}} className={styles.factor} >{value}</span>)
    }

}