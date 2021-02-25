const express = require('express')
const app = express()

app.get('/',(req,res,next) => res.sendFile(path.join(__dirname,'index.html')))
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets',express.static(path.join(__dirname,'./assets')));

app.listen(8081,()=>{
  console.log('server listening on 8080')
})