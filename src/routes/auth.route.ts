import express, { Request, Response } from 'express'
import { google } from 'googleapis'
import path from 'path'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, process.env.CONFIG_FILE_PATH!),
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    const cilent = (await auth.getClient()) as any
    const googleSheets = google.sheets({version: "v4", auth: cilent})

    const spreadsheetId = process.env.SHEET_ID

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    })

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "admins"
    })

    // res.json(metaData)
    console.log(metaData.data);
    
    res.json(getRows.data)
})

export default router