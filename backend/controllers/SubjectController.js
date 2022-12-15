import Subject from "../models/SubjectModel.js";

export const getSubjects = async (req, res) => {
  try {
    const response = await Subject.findAll({
     
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const response = await Subject.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSubjectBySite = async (req, res) => {
  try {
    const response = await Subject.findAll({
      where: {
        site_id: req.params.siteId,
      },
    });

    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createSubject = async (req, res) => {
  try {
    await Subject.create(req.body);
    res.status(201).json({ msg: "Subject Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateSubject = async (req, res) => {
  try {
    await Subject.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Subject Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSubject = async (req, res) => {
  try {
    await Subject.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Study Site Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};


