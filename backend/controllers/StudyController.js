import Study from "../models/StudyModel.js";
 
export const getStudies = async(req, res) =>{
    try {
        const response = await Study.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
 
export const getStudyById = async(req, res) =>{
    try {
        const response = await Study.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
 
export const createStudy = async(req, res) =>{
    try {
        await Study.create(req.body);
        res.status(201).json({msg: "Study Created"});
    } catch (error) {
        console.log(error.message);
    }
}
 
export const updateStudy = async(req, res) =>{
    try {
        await Study.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Study Updated"});
    } catch (error) {
        console.log(error.message);
    }
}
 
export const deleteStudy = async(req, res) =>{
    try {
        await Study.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Study Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}