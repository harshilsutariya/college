import collegeImagesModel from "../../../../model/collegeDetail//collegeImages.js"

const deletecollegeImagesMethod = async (req, res) => {
    try {

        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }
        
        const collegeImagesId = req.params.collegeImagesId;

        const culturalIdExist = await collegeImagesModel.findOne({ collegeImagesId: collegeImagesId });
        if (!culturalIdExist) {
            return res.status(404).send({ error: "Please enter a valid collegeImagesId" });
        }

        const deletedcollegeImagesdetail = await collegeImagesModel.deleteOne({ collegeImagesId });
        if(deletedcollegeImagesdetail){
            res.status(201).send({ message: "collegeImages deleted successfully" });
        }

    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", error });
        console.log(error);
    }
}

export default deletecollegeImagesMethod;
