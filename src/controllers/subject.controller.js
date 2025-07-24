import Subject from '../models/subject.js';

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('career');
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSubject = async (req, res) => {
  try {
    const subject = new Subject({
      name: req.body.name,
      description: req.body.description,
      code: req.body.code,
      career: req.body.career
    });
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        career: req.body.career
      },
      { new: true }
    );
    if (!subject) return res.status(404).json({ message: 'No encontrado' });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const deleted = await Subject.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 