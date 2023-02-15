const express=require('express')
const bookADemoRouter=express.Router()
const bookADemoController=require('../controller/bookADemoController')
bookADemoRouter.post('/book-a-demo',bookADemoController.postBookADemo)

bookADemoRouter.get('/getAllBookADemo',bookADemoController.getAllBookADemo)
bookADemoRouter.get('/getBookADemoById/:id',bookADemoController.getBookADemoById)
bookADemoRouter.get('/exportBookADemoById/:id',bookADemoController.exportBookADemoById)
bookADemoRouter.get('/exportAllBookADemo',bookADemoController.exportAllBookADemo)

bookADemoRouter.get('/exportPDFListBookADemo',bookADemoController.exportPDFListBookADemo)


module.exports =bookADemoRouter