const bookADemoModel = require('../model/bookADemoModel.js')
const { bookADemoValidate } = require('../middleware/validate.js')
const excelJS = require('excelJS')
const ejs = require('ejs')
const pdf = require('html-pdf')
const fs = require('fs')
const path = require('path')

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
    getAllBookADemo = (req, res) => {
        bookADemoModel.find({}, {}).exec((err, bookademos) => {
            if (err) {
                res.send('khong the lay thong tin all book a demo')
            } else {
                // console.log('lay thanh cong all book a demo', bookademos)
                res.json(bookademos)
            }
        })
    }
    getBookADemoById = (req, res) => {
        bookADemoModel.find({ _id: req.params.id }, { agree: 0 }).exec((err, bookademo) => {
            if (err) {
                res.send('khong the lay thong tin book a demo')
            } else {
                // console.log('lay thanh cong book a demo', bookademo)
                res.json(bookademo)
            }
        })
    }

    exportAllBookADemo = async (req, res) => {
        try {
            const data = await bookADemoModel.find({})
            const workbook = new excelJS.Workbook()
            const worksheet = workbook.addWorksheet('myList')
            worksheet.columns = [
                { header: 'S.no', key: 's_no', width: 10 },
                { header: 'Message', key: 'message', width: 10 },
                { header: 'Name', key: 'name', width: 10 },
                { header: 'Email', key: 'email', width: 10 },
                { header: 'Phone', key: 'phone', width: 10 },

                { header: 'Company', key: 'company', width: 10 }
            ]
            let count = 1
            data.forEach(
                (listdata) => {
                    listdata.s_no = count
                    worksheet.addRow(listdata)
                    count += 1
                }
            )
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true };
            })
            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.setHeader('Content-Disposition', `attachment; filename=data.xlsx`);
            return workbook.xlsx.write(res).then(() => {
                res.status(200)
            })
        }
        catch (e) {
            res.status(500).send(e)
        }
    }
    exportBookADemoById = async (req, res) => {
        try {
            const data = await bookADemoModel.find({ _id: req.params.id })
            const workbook = new excelJS.Workbook()
            const worksheet = workbook.addWorksheet('myList')
            worksheet.columns = [
                { header: 'S.no', key: 's_no', width: 10 },
                { header: 'Message', key: 'message', width: 10 },
                { header: 'Name', key: 'name', width: 10 },
                { header: 'Email', key: 'email', width: 10 },
                { header: 'Phone', key: 'phone', width: 10 },

                { header: 'Company', key: 'company', width: 10 }

            ]
            let count = 1
            data.forEach(
                (listdata) => {
                    listdata.s_no = count
                    worksheet.addRow(listdata)
                    count += 1
                }
            )
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true };
            })
            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.setHeader('Content-Disposition', `attachment; filename=data.xlsx`);
            return workbook.xlsx.write(res).then(() => {
                res.status(200)
            })
        }
        catch (e) {
            res.status(500).send(e)
        }
    }
    exportPDFListBookADemo = async (req, res) => {
        try {
            const users = await bookADemoModel.find({})
            const data = {
                bookADemoModel: users
            }
            // console.log('dddddddddddddddddddddddddd', users)

            const filePathName = path.resolve(__dirname, '../view/htmltopdf.ejs')
            const htmlString = fs.readFileSync(filePathName).toString()
            const options = {
                format: 'Letter'
            }
            const ejsData = ejs.render(htmlString, data)
            pdf.create(ejsData, options).toFile('data.pdf', (err, response) => {
                if (err) console.log(err)
                const filePath = path.resolve(__dirname, '../data.pdf')
                fs.readFile(filePath, (err, file) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('could not dload file')
                    }
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', `attachment; filename="data.pdf"`);
                    res.send(file)
                })
            })
        }
        catch (e) {
            console.log(e.message);
        }
    }

}
module.exports = new bookADemoController()