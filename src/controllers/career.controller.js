import Career from '../models/career.js';

// Crear
export const createCareer = async (req, res) => {
  try {
    const newCareer = new Career(req.body);
    const savedCareer = await newCareer.save();
    res.status(201).json(savedCareer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas
export const getCareers = async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una
export const getCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return res.status(404).json({ message: "No encontrada" });
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar
export const updateCareer = async (req, res) => {
  try {
    const updatedCareer = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCareer) return res.status(404).json({ message: "No encontrada" });
    res.json(updatedCareer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar
export const deleteCareer = async (req, res) => {
  try {
    const deletedCareer = await Career.findByIdAndDelete(req.params.id);
    if (!deletedCareer) return res.status(404).json({ message: "No encontrada" });
    res.json({ message: "Eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};