import { Article } from '../types';

export const ARTICLES_DATA: Article[] = [
  {
    id: 'compress-images-before-pdf',
    title: 'How to Optimize & Compress Images Before Converting to PDF',
    slug: 'how-to-compress-images-before-converting-to-pdf',
    category: 'Optimization Guide',
    readTime: '4 min read',
    date: 'Updated September 2026',
    author: 'Image to PDF Technical Team',
    summary: 'Learn practical methods to balance high visual clarity with compact PDF document sizes for email attachments and portal submissions.',
    content: [
      'When merging several high-resolution photos into a single PDF document, the final file size can rapidly swell past 25MB—exceeding common email attachment caps or government application portal restrictions. Understanding how compression works allows you to keep file sizes lightweight while maintaining razor-sharp legibility.',
      '1. Choose the Right Resolution: Most standard document scanners and smartphone cameras capture photos at 300 to 600 DPI (dots per inch). While great for poster printing, screen reading and office printing only require 150 to 200 DPI.',
      '2. Fine-tune Quality Settings: Our built-in quality slider offers a 70% to 85% sweet spot. At 80% JPEG compression, the human eye cannot detect degradation on normal screens, yet the file weight is reduced by up to 60%.',
      '3. Convert Unnecessary PNGs: If your images do not require transparent backgrounds, convert them to standard JPEG or modern WEBP before compilation. PNG files with 24-bit color depth can be up to 5x heavier than well-compressed JPEGs.',
      '4. Crop Redundant Borders: Eliminating dark background table space, shadows, or desk edges before converting removes unnecessary pixel data and produces a professional document.'
    ]
  },
  {
    id: 'jpg-png-webp-comparison',
    title: 'JPG vs PNG vs WEBP: Which Format is Best for PDF Documents?',
    slug: 'jpg-vs-png-vs-webp-which-is-best-for-documents',
    category: 'Format Comparison',
    readTime: '5 min read',
    date: 'Updated September 2026',
    author: 'Document Processing Lab',
    summary: 'A deep-dive comparison between JPEG, PNG, and modern WEBP image formats when compiling multi-page PDF files.',
    content: [
      'Choosing the right input image format plays an instrumental role in the speed, quality, and portability of your final compiled PDF file. Here is a breakdown of when to use each format:',
      '• JPG / JPEG (Best for Scans, Photographs & Receipts): JPEG utilizes lossy compression specifically tuned for continuous-tone photography. It provides the smallest footprint for realistic color gradients and smartphone camera captures.',
      '• PNG (Best for Diagrams, Screenshots & Signatures): Portable Network Graphics utilizes lossless compression. It excels at preserving crisp, sharp text lines, vector diagrams, charts, and digital signatures without introducing fuzzy artifacts around letters.',
      '• WEBP (Modern High-Efficiency Format): Developed by Google, WEBP offers superior lossless and lossy compression algorithms. WEBP images are typically 26% smaller than PNGs and 25-34% smaller than comparable JPEGs at equivalent quality ratings.',
      'Our tool natively converts and parses all three formats client-side, giving you total freedom to mix and match JPG receipts, PNG signatures, and WEBP captures seamlessly into one unified document.'
    ]
  },
  {
    id: 'client-side-privacy-benefits',
    title: 'Why Browser-Based Client-Side PDF Generation is the Most Secure Choice',
    slug: 'why-client-side-pdf-conversion-is-secure',
    category: 'Security & Privacy',
    readTime: '3 min read',
    date: 'Updated September 2026',
    author: 'Privacy First Engineering',
    summary: 'Discover why local in-browser processing guarantees that your sensitive IDs, bank statements, and personal contracts remain 100% private.',
    content: [
      'Traditional online PDF converters require you to upload your sensitive personal files to a remote cloud server. This introduces serious privacy risks: your data may sit in server temporary storage, pass through third-party CDNs, or be vulnerable to data breaches.',
      'How Image to pdf Tools is Different:',
      '• Zero Server Uploads: Every single byte of your images is processed exclusively inside your web browser using HTML5 Canvas and the jsPDF JavaScript engine.',
      '• Total Offline Resilience: Once the page is loaded, you can literally disconnect your internet connection or switch on Airplane mode, and the PDF conversion continues to function flawlessly.',
      '• Instant Processing: Because no gigabytes of data need to travel over slow upload internet connections, your PDF is compiled in seconds.',
      '• GDPR & HIPAA Compliant by Design: Since zero personal data or image metadata ever reaches an external server, confidentiality is physically guaranteed.'
    ]
  },
  {
    id: 'organizing-multi-page-documents',
    title: 'Top Tips for Organizing Receipts, Invoices & Portfolios into PDF',
    slug: 'organizing-receipts-invoices-portfolios-into-pdf',
    category: 'Workflow & Productivity',
    readTime: '4 min read',
    date: 'Updated September 2026',
    author: 'Productivity Insights',
    summary: 'Simple steps to organize your files, rotate inverted pictures, adjust margins, and generate clean professional records.',
    content: [
      'Whether preparing monthly expense reimbursements, assembling design portfolios, or filing tax documents, following these quick organization rules ensures stellar results:',
      '1. Order Chronologically: Use our intuitive drag-and-drop handles or reorder arrows to place cover pages, summary receipts, and itemized bills in logical order.',
      '2. Standardize Orientations: Mixing landscape and portrait scans can make PDFs frustrating to read. Use the 90° rotation button on thumbnail cards to ensure every page faces upright.',
      '3. Set Consistent Margins: Adding a subtle 8mm margin prevents printer edges from clipping text lines when physical printing is required.',
      '4. Descriptive Naming: Name your final PDF clearly (e.g., "Expense_Report_Sept_2026.pdf" or "Design_Portfolio_Final.pdf") before downloading for easy indexing.'
    ]
  }
];

export const FAQ_DATA = [
  {
    question: 'Is it really 100% free with no hidden charges?',
    answer: 'Yes, Image to pdf Tools is completely free to use without restrictions. There are no subscriptions, no watermarks added to your documents, no hidden paywalls, and no registration required.'
  },
  {
    question: 'Are my uploaded images safe and private?',
    answer: 'Absolutely. Unlike other online converters that upload your files to remote cloud servers, our conversion engine runs 100% locally inside your web browser. Your confidential images, receipts, and documents never leave your computer or phone.'
  },
  {
    question: 'Which image file formats can I convert?',
    answer: 'We support all standard web image formats including JPG, JPEG, PNG, WEBP, GIF, and BMP. You can even mix different formats in the same batch.'
  },
  {
    question: 'How do I rearrange the order of pages in my PDF?',
    answer: 'Simply click and drag the thumbnail cards in the preview grid, or use the handy "Move Left" / "Move Right" action buttons on each card to arrange your pages in the exact sequence you want.'
  },
  {
    question: 'Can I rotate images if they were shot sideways or upside down?',
    answer: 'Yes! Each uploaded image card includes a 90° Rotate button. You can click it multiple times to orient each individual image correctly before converting.'
  },
  {
    question: 'What page sizes and orientations are supported?',
    answer: 'You can choose between Standard ISO A4 (210 × 297 mm), US Letter (8.5 × 11 in), US Legal (8.5 × 14 in), or "Fit Page to Image" which dynamically matches the exact dimensions and aspect ratio of each original picture. Orientations include Auto-Detect, Portrait, and Landscape.'
  },
  {
    question: 'Does this tool work on iPhone, iPad, and Android devices?',
    answer: 'Yes! The entire interface is mobile-first, responsive, and works smoothly on mobile Safari, Google Chrome, Firefox, Edge, and Samsung Internet without installing any app.'
  }
];
