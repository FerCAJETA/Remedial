import Group from '../models/group.js';

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('career');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGroup = async (req, res) => {
  try {
    const group = new Group({
      name: req.body.name,
      career: req.body.career
    });
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        career: req.body.career
      },
      { new: true }
    );
    if (!group) return res.status(404).json({ message: 'No encontrado' });
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const deleted = await Group.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 