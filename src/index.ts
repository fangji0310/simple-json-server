import app from './SimpleJsonServer'

const port = process.env.PORT || 28080

app.listen(port,(err)=> {
  if(err) {
    return console.log(err)
  }
  return console.log(`server is listening on ${port}`)
})
