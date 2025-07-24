import Student from '../models/student.js';

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('group');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = new Student({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      institutional_account: req.body.institutional_account,
      email: req.body.email,
      group: req.body.group
    });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        institutional_account: req.body.institutional_account,
        email: req.body.email,
        group: req.body.group
      },
      { new: true }
    );
    if (!student) return res.status(404).json({ message: 'No encontrado' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 