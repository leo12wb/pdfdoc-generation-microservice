import express from 'express'
const PDFDocument = require('pdfkit');
import { Router, Request, Response } from 'express';

const app = express();

const route = Router()

app.use(express.json())


route.get('/', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="generate.pdf"');

  const doc = new PDFDocument();
  doc.pipe(res);

  doc.fontSize(20).text('Documento PDF Gerado com Node.js', 100, 100);

  doc.end();
  //res.json({ message: 'hello world with Typescript' })
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')