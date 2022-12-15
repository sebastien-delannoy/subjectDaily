import StudySite from "../models/StudySiteModel.js";

export const getStudySites = async (req, res) => {
  try {
    const response = await StudySite.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getStudySiteById = async (req, res) => {
  try {
    const response = await StudySite.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getStudySiteByStudy = async (req, res) => {
  
  try {
    const response = await StudySite.findAll({
      where: {
        study_id: req.params.studyId,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createStudySite = async (req, res) => {
  try {
    await StudySite.create(req.body);
    res.status(201).json({ msg: "Study Site Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStudySite = async (req, res) => {
  try {
    await StudySite.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Study Site Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteStudySite = async (req, res) => {
  try {
    await StudySite.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Study Site Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
