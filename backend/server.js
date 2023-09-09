const    express  = require ('express');
const    router   =require ('./routers/bookRouter.js');
const cors = require('cors');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routers

app.use(cors()); // Set up CORS middleware first
app.use('/api/book', router)

app.get('/',(req,res)=>{
    res.json({message:'back'})
})

  


// static 
app.use ('/images',express.static('./images'))
const Port = process.env.PORT || 8080

app.listen(Port,()=>{
    console.log(`${Port} bağlandı`)
})