const express=require('express')
const bookADemoRouter=express.Router()
const bookADemoController=require('../controller/bookADemoController')
bookADemoRouter.post('/book-a-demo',bookADemoController.postBookADemo)

bookADemoRouter.get('/getAllBookADemo',bookADemoController.getAllBookADemo)
bookADemoRouter.get('/getBookADemoById/:id',bookADemoController.getBookADemoById)
bookADemoRouter.get('/exportExcelBookADemoById/:id',bookADemoController.exportBookADemoById)
bookADemoRouter.get('/exportExcelAllBookADemo',bookADemoController.exportAllBookADemo)

bookADemoRouter.get('/exportPDFListBookADemo',bookADemoController.exportPDFListBookADemo)


module.exports =bookADemoRouter