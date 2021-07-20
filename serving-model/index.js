const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const fileUpload = require('express-fileupload')
const model_path = `${__dirname}/models/`

app.use(fileUpload())
app.get('/', (req, res) => {
  res.send(`
  <html>
  <head>
    <title>model serving API</title>
  <head>
  <body>
    <h3> list of models </h3>
    <p> curl http://(server-ip):3000/list/model </p>
    <br>

    <h3> download specific model using wget</h3>
    <p> wget http://(server-ip):3000/get/model/(model name)/(model version) </p>
    <br>

    <h3> download specific latest model using wget</h3>
    <p> wget http://(server-ip):3000/get/model/(model name) </p>
    <br>

    <h3> upload model file using curl </h3>
    <p> curl -F 'modelFile=@/path/to/file/(model name)' http://(server-ip):3000/upload/model </p>
    <br>
    
    <h3> delete specific model file using curl </h3>
    <p> curl -X DELETE http://(server-ip):3000/delete/(model name) </p>
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
  res.send('download page!')
})

app.get('/list/model', (req, res) => {
  fs.readdir(model_path, (err, models)=>{
    if (err) {
      return res.status(400).send(err)
    }
    res.send(models)
  })
})

app.post('/upload/model', (req, res)=>{
  if (!req.files || Object.keys(req.files).length === 0){
    return res.status(400).send('No files were uploaded.')
  }

  modelFile = req.files.modelFile;
  modelFile.mv(model_path + modelFile.name, (err)=>{
    if (err){
      return res.status(500).send(err)
    }

    res.send('File uploaded!')
  })
})

app.delete('/delete/model/:filename', (req, res)=>{
  console.log(req.params.filename)
  fs.unlink(model_path + req.params.filename, (err)=>{
    if (err) {
      return res.status(500).send(err)
    }
    res.send('File deleted!')
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})