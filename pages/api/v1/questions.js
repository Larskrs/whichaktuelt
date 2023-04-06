// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs/promises"
import path from "path"



export default async function handler(req, res) {
  
  let questions = {}
  
  const file = await fs.readFile(__dirname + '/../../../../../public/questions.json', {
    encoding: 'utf8'
  })
  console.log("Loading questions from file.")
  
  questions = JSON.parse(await file)
  // console.log(questions[0])

  res.status(200).json({result: questions})


}
