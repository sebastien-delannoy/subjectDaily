import Event from "../models/EventModel.js";

export const getEvents = async (req, res) => {
  try {
    const response = await Event.findAll({});
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getEventById = async (req, res) => {
  try {
    const response = await Event.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getEventBySubject = async (req, res) => {
  try {
    const response = await Event.findAll({
      where: {
        subject_id: req.params.id,
      },
    });

    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createEvent = async (req, res) => {
  try {
    await Event.create(req.body);
    res.status(201).json({ msg: "Event Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateEvent = async (req, res) => {
  try {
    await Event.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Event Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Event Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
