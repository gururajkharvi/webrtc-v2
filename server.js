const express=require('express')
const res = require('express/lib/response')
const { Socket } = require('socket.io')
const app=express()
const fs =require('fs')
const server=require('http').Server(app)
const https = require('https')
// var server = https.createServer({
//     key: fs.readFileSync('D://tomcat/conf/star.manipaltechnologies.com-pfx.pfx'),
//     cert: fs.readFileSync('D://tomcat/conf/manipaltechnologies.crt')
// },app);


const io=require('socket.io')(server)
const { v4:uuidV4}=require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req,res)  =>{
res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req,res) =>{
    res.render('room',{roomId:req.params.room})
})
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId)
      socket.to(roomId).emit('user-connected', userId)
  
      socket.on('disconnect', () => {
        socket.to(roomId).emit('user-disconnected', userId)
      })
    })
  })
// server.listen(3000)
const PORT = process.env.PORT || 3000;
server.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}...`)
})
