const bookADemoModel = require('../model/bookADemoModel.js')
const { bookADemoValidate } = require('../middleware/validate.js')

class bookADemoController {
    postBookADemo = (req, res) => {
        const { error, value } = bookADemoValidate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        // const value=req.body.task
        let bookADemo = new bookADemoModel(value)
        bookADemo.save((error, demo) => {
            if (error) {
                res.send(error)
            } else {
                console.log('Gui book a demo thanh cong');
                res.send(demo)
            }
        })
    }
}
module.exports =new bookADemoController()