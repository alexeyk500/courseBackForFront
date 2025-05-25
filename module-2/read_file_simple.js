// - read file with callback
// import fs from 'fs';
//
// fs.readFile('./readme.txt',(err,data)=>{
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(data)
//   console.log(data.toString())
// })

// - read file with promise
import fs from 'fs/promises'
console.log((await fs.readFile('./readme.txt')).toString())