import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher; 