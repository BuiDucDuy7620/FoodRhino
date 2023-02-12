
const bookADemoRouter=require('./bookADemoRouter')

const Router=(app)=>{
    // app.get('/',(req,res)=>{res.send('hello')})
    app.use('/foodRhino',bookADemoRouter)

}
module.exports=Router