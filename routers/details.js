const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/authMid');
const {handelCreateDetails,
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
} = require('../controllers/details');


router.post("/:id", isLoggedIn, handelCreateDetails);

router.get("/delete/:id", isLoggedIn, handelDeleteDetails);

router.get("/edit/:id", isLoggedIn, handelEditInfoPage);

router.post("/editInfo/:id", isLoggedIn, handelEditInfo);

router.get("/allDetails", handelAllDetails);

router.get("/projectDetails/:name", handelProjectDetails);

router.get("/plant/:email", handelDetailsHandelByPlant);

router.get("/downloadCsv", handelDownloadCsv);

router.get("/plantProject/:name/:id", handelPlantProject);

router.get("/modelDetails/:modelName", handelModelDetails);

router.get("/sectionInfo/:sectionName/:projectName", handelSectionDetails);

router.get("/plantSectionInfo/:sectionName/:email", handelSectionBySector);

router.get("/sectorSection/:sectionName/:projectName/:userid", handelSectionBySectorProject);

router.get("/modelDetails/:modelName/:sectionName/:projectName/:userid", handelModelBySectorAndSectionProject);

router.get("/sectorSectionModel/:modelName/:sectionName/:email", handelSectorAllModel);

router.get("/modelDetails/:modelName/:sectionName/:projectName", handelAllSectorProjectSectionModel);

module.exports = router;