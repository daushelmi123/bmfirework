/**
 * PDF Form Field Inspector
 *
 * Script to inspect PDF files and extract form field names
 * for field mapping in backend service
 */

const fs = require('fs');
const path = require('path');

// Import pdf-lib (will install if needed)
let PDFDocument, PDFName;

try {
  const pdfLib = require('pdf-lib');
  PDFDocument = pdfLib.PDFDocument;
  PDFName = pdfLib.PDFName;
} catch (e) {
  console.error('ERROR: pdf-lib not installed!');
  console.log('\nPlease run: npm install pdf-lib\n');
  process.exit(1);
}

/**
 * Inspect a PDF file and list all form fields
 */
async function inspectPDF(filePath) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📄 Inspecting PDF: ${path.basename(filePath)}`);
  console.log('='.repeat(80));

  try {
    // Read PDF file
    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get form
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    console.log(`\n✅ Total fields found: ${fields.length}\n`);

    if (fields.length === 0) {
      console.log('⚠️  No form fields found in this PDF!');
      console.log('   This might be a scanned PDF or a PDF without editable fields.\n');
      return null;
    }

    // Group fields by page
    const fieldsByPage = {};

    fields.forEach((field, index) => {
      const fieldName = field.getName();
      const fieldType = field.constructor.name;

      // Try to get page number (if available)
      let pageNum = 'Unknown';
      try {
        const widgets = field.acroField.getWidgets();
        if (widgets && widgets.length > 0) {
          const pageRef = widgets[0].get(PDFName.of('P'));
          if (pageRef) {
            const pages = pdfDoc.getPages();
            pageNum = pages.findIndex(p => p.ref === pageRef) + 1;
          }
        }
      } catch (e) {
        // Silent fail - page detection is optional
      }

      if (!fieldsByPage[pageNum]) {
        fieldsByPage[pageNum] = [];
      }

      fieldsByPage[pageNum].push({
        index: index + 1,
        name: fieldName,
        type: fieldType,
      });
    });

    // Print organized by page
    Object.keys(fieldsByPage).sort().forEach(page => {
      console.log(`📑 Page ${page}:`);
      console.log('-'.repeat(80));

      fieldsByPage[page].forEach(field => {
        console.log(`  ${String(field.index).padStart(3, ' ')}. ${field.name.padEnd(40, ' ')} [${field.type}]`);
      });

      console.log('');
    });

    // Generate field mapping template
    console.log('\n' + '='.repeat(80));
    console.log('📋 COPY THIS TO YOUR BACKEND CODE:');
    console.log('='.repeat(80));
    console.log('\nconst fieldMappings: { [key: string]: string } = {');

    fields.forEach((field, index) => {
      const fieldName = field.getName();
      const frontendName = fieldName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');

      console.log(`  '${frontendName}': '${fieldName}',  // ${field.constructor.name}`);
    });

    console.log('};\n');

    return fields;

  } catch (error) {
    console.error(`\n❌ Error inspecting PDF: ${error.message}\n`);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('\n📖 Usage: node inspect-pdf.js <pdf-file-path>\n');
    console.log('Example:');
    console.log('  node inspect-pdf.js "surat agent bmfirework.pdf"\n');
    process.exit(1);
  }

  const pdfPath = args[0];

  if (!fs.existsSync(pdfPath)) {
    console.error(`\n❌ File not found: ${pdfPath}\n`);
    process.exit(1);
  }

  await inspectPDF(pdfPath);

  console.log('✅ Done!\n');
}

// Run
main().catch(console.error);
