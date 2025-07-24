import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  institutional_account: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true }
});

const Student = mongoose.model('Student', studentSchema);
export default Student; 