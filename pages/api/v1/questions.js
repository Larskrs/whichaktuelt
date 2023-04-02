// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs/promises"
import path from "path"

export default async function handler(req, res) {
  
  const file = await fs.readFile(__dirname + '/../../../../../public/questions.json', {
    encoding: 'utf8'
  })

  res.status(200).json({result: JSON.parse(await file)})


}
