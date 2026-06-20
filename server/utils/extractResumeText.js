import pdfParse from "pdf-parse/lib/pdf-parse.js";

/**
 * Extracts plain text from a PDF file buffer.
 * @param {Buffer} buffer - raw PDF file buffer from multer memory storage
 * @returns {Promise<string>} extracted text
 */
export const extractResumeText = async (buffer) => {
  const data = await pdfParse(buffer);
  return (data.text || "").trim();
};
