const fs = require("fs");
const zlib = require("zlib");

// Step 1: Read original PDF
const originalPdf = fs.readFileSync("2025.06.22 Assignment - SWE Internship.pdf");

// Step 2: Read image file
const image = fs.readFileSync("images.jpeg");

// Step 3: Compress (deflate) the image data
const compressed = zlib.deflateSync(image);

// Step 4: Create a new PDF object for the image
const objectNumber = 111; // Picked the object number which is unused
const newObject = `
${objectNumber} 0 obj
<< /Length ${compressed.length}
   /Filter /FlateDecode >>
stream
${compressed.toString('binary')}
endstream
endobj
`;

// Step 5: Inject the new object just before %%EOF
const pdfString = originalPdf.toString('binary');
const updatedPdf = pdfString.replace(/%%EOF/, `${newObject}\n%%EOF`);

// Step 6: Save updated PDF
fs.writeFileSync("assignment-newexer.pdf", updatedPdf, "binary");

console.log("✅ Done! PDF updated with hidden image object.");

 