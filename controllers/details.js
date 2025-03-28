const userModel = require('../models/user');
const detailsModel = require('../models/details');
const CsvParser = require('json2csv').Parser;

async function handelCreateDetails(req, res){
    let {model, stdMp, actualMp, stdUph, actualUph, project, section} = req.body;
    console.log(req.body);
    const user = await userModel.findOne({_id: req.params.id});

    const info = await detailsModel.create({
        model,
        stdMp,
        actualMp,
        stdUph,
        actualUph,
        user: user._id,
        project,
        section
    });
    user.details.push(info._id);
    await user.save();
    return res.redirect("/profile");
}

async function handelDeleteDetails(req, res){
    await detailsModel.findOneAndDelete({_id: req.params.id});
    return res.redirect("/profile");
}

async function handelEditInfoPage(req, res){
    const info = await detailsModel.findOne({_id: req.params.id});
    return res.render("editInfo",{info});
}

async function handelEditInfo(req, res){
    let {model, stdMp, actualMp, stdUph, actualUph, project, section} = req.body;
    const info = await detailsModel.findOneAndUpdate({_id: req.params.id},{model, stdMp, actualMp, stdUph, actualUph, project, section},{new : true});
    return res.redirect("/profile");
}

async function handelAllDetails(req, res){
    const allInfo = await detailsModel.find().populate('user');
    return res.render("allDetails",{allInfo});
}

async function handelProjectDetails(req, res){
    const info = await detailsModel.find({project: req.params.name});
    return res.render("projectDetails",{info: info, projectName: req.params.name});
}

async function handelDetailsHandelByPlant(req, res){
    const user = await userModel.findOne({email: req.params.email}).populate('details');
    return res.render("plant",{user: user, email: req.params.email});
}

async function handelDownloadCsv(req, res){
    try{
        let infos = [];
        let infoData = await detailsModel.find();

        infoData.forEach((info)=>{
            const {model, stdMp, actualMp, stdUph, actualUph, project, section} = info;
            infos.push({model, stdMp, actualMp, stdUph, actualUph, project, section});
        });

        const csvFields = ['Model','StdMp','ActualMp','Std_UPH','Actual_UPH','Project','Section'];
        const csvParser = new CsvParser({ csvFields });
        const csvData = csvParser.parse(infos);
        res.setHeader("Content-Type","text/csv");
        res.setHeader("Content-Disposition","attatchment: filename=infosData.csv");
        res.status(200).end(csvData);
    }catch(error){
        res.send({status:400, success:false, msg:error.message});
    }
}

async function handelPlantProject(req, res){
    let info = await detailsModel.find({user: req.params.id, project: req.params.name});
    let user = await userModel.findOne({_id: req.params.id});
    return res.render("plantProject",{info: info, email: user.email, projectName: req.params.name, userid: user._id});
}

async function handelModelDetails(req, res){
    let info = await detailsModel.find({model: req.params.modelName});
    return res.render("modelDetails",{info: info, modelName: req.params.modelName});
}

async function handelSectionDetails(req, res){
    let info = await detailsModel.find({section: req.params.sectionName, project: req.params.projectName});
    return res.render("sectionDetails",{info: info, sectionName: req.params.sectionName, projectName: req.params.projectName});
}

async function handelSectionBySector(req, res){
    let user = await userModel.findOne({email: req.params.email});
    let info = await detailsModel.find({user: user._id, section: req.params.sectionName});
    return res.render("sectorSectionDetails", {info: info, sectionName: req.params.sectionName, email: req.params.email});
}

async function handelSectionBySectorProject(req, res){
     let info = await detailsModel.find({user: req.params.userid, project: req.params.projectName, section: req.params.sectionName});
     return res.render("sectorSectionProjectDetails",{info: info, sectionName: req.params.sectionName, projectName: req.params.projectName, userid: req.params.userid});
}

async function handelModelBySectorAndSectionProject(req, res){
    let info = await detailsModel.find({user: req.params.userid, section: req.params.sectionName, model: req.params.modelName});
    return res.render("modelDetails",{info: info, modelName: req.params.modelName});
}

async function handelSectorAllModel(req, res){
    let user = await userModel.findOne({email: req.params.email});
    let info = await detailsModel.find({section: req.params.sectionName, model: req.params.modelName, user: user._id});
    return res.render("sectorSectionModelDetails",{info: info, modelName: req.params.modelName});
}

async function handelAllSectorProjectSectionModel(req, res){
    let info = await detailsModel.find({project: req.params.projectName, section: req.params.sectionName, model: req.params.modelName});
    return res.render("allSectorModel", {info: info, projectName: req.params.projectName, modelName: req.params.modelName})
}

module.exports = {
    handelCreateDetails,
    handelDeleteDetails,
    handelEditInfoPage,
    handelEditInfo,
    handelAllDetails,
    handelProjectDetails,
    handelDetailsHandelByPlant,
    handelDownloadCsv,
    handelPlantProject,
    handelModelDetails,
    handelSectionDetails,
    handelSectionBySector,
    handelSectionBySectorProject,
    handelModelBySectorAndSectionProject,
    handelSectorAllModel,
    handelAllSectorProjectSectionModel,
}