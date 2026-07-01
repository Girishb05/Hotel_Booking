import multer from "multer";

// Use memoryStorage — Vercel has a read-only filesystem, diskStorage won't work
const upload = multer({ storage: multer.memoryStorage() });

export default upload;