const express=require('express')
const bookADemoRouter=express.Router()
const bookADemoController=require('../controller/bookADemoController')
bookADemoRouter.post('/book-a-demo',bookADemoController.postBookADemo)

module.exports =bookADemoRouter