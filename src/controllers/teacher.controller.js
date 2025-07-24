import Teacher from '../models/teacher.js';

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('subjects');
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const teacher = new Teacher({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      subjects: req.body.subjects // array de ids
    });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        subjects: req.body.subjects // array de ids
      },
      { new: true }
    );
    if (!teacher) return res.status(404).json({ message: 'No encontrado' });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const deleted = await Teacher.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 