import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, trim: true },
  career: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true }
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject; 