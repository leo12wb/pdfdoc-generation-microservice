import express from 'express'
const PDFDocument = require('pdfkit');
//const cheerio = require('cheerio');
//const TurndownService = require('turndown');
import { Router, Request, Response } from 'express';

const app = express();

const route = Router()

app.use(express.json())


route.get('/', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="generated-pdf.pdf"');

  const doc = new PDFDocument();
  doc.pipe(res);

  // Obtenha os dados JSON da solicitação POST
  const { title, content} = req.body;

  console.log(title)
  doc.fontSize(16)
  doc.text(title.text,{ align: 'center'});
  doc.text("\n");
  // Verifique se o campo "lines" está presente no JSON
  if (Array.isArray(content.lines)) {
    content.lines.forEach((line : any) => {
      const {
        text,
        fontSize = 12,
        font = 'Helvetica',
        bold = false,
        paragraph = false,
      } = line;

      // Aplicar formatações especificadas para cada linha
      doc.fontSize(fontSize);
      doc.font(font);
      if (bold) {
        //doc.bold();
      }
      if (paragraph) {
        doc.text(text, { paragraph: 'true' });
      } else {
        doc.text(text);
      }
    });
  }

  doc.end();
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')