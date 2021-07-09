const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const model_path = `${__dirname}/models/`
app.get('/', (req, res) => {
  res.send(`
  <html>
  <head>
    <title>model serving API</title>
  <head>
  <body>
    <h3> list of models </h3>
    <p> /list/model <p>
    <br>
    <h3> download specific model using wget</h3>
    <p> /get/model/(model name)/(model version) <p>
    <br>
    <h3> download specific latest model using wget</h3>
    <p> /get/model/(model name) <p>
  </body>
  </html>`)
})

app.get('/get/model/:modelname/:version', (req, res)=> {
  const modelname = req.params.modelname
  const version = req.params.version
  const model = modelname + '-' + version
  fs.readdir(model_path, (err, models)=>{
    if (err) {
      console.log(err)
    }
    if (models.includes(model)){
      res.download(`${model_path}/${model}`)
    }
    else {
      res.status(404).send('not existing model')
    }
  })
})

app.get('/get/model/:modelname', (req, res)=>{
  const target_modelname = req.params.modelname
  fs.readdir(model_path, (err, models)=>{
    if (err){
      console.log(err)
    }
    var version_list = []    
    for (var model of models){
      var splited = model.split('-')
      var splited_model_name = splited[0]
      var splited_model_version = splited[1]
      if (splited_model_name == target_modelname){
        version_list.push(splited_model_version)
      }
    }
    version_list.sort().reverse()
    if (version_list.length != 0){
      res.download(`${model_path}/${target_modelname+'-'+version_list[0]}`)
    } else{
      res.status(404).send('not existing model')
    }
    
  })
})

app.get('/get/model', (req, res) => {
  
  console.log(model_path)
  res.send('download page!')
})

app.get('/list/model', (req, res) => {
  fs.readdir(model_path, (err, models)=>{
    if (err) {
      console.log(err)
    }
    res.send(models)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
