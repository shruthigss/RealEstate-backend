const mongoose=require('mongoose');
const {MONGOURI} =require('./keys')

//
/* const env=require('dotenv')
env.config() */
const PORT=5100;
const app=require('./app');


//

mongoose.set('strictQuery', true);
mongoose.connect(MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true})

mongoose.connection.once('open',()=>{console.log('connection established')})
.on('connection Error',(err)=>{console.log(err)})


app.listen(PORT,()=>{console.log("server is running at ",PORT)})
