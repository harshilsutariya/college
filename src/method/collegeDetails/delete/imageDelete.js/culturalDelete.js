import culturalModel from "../../../../model/collegeDetail/cultural.js"

const deleteculturalImageMethod = async (req, res) => {
    try {

        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }
        
        const culturalId = req.params.culturalId;

        const culturalIdExist = await culturalModel.findOne({ culturalId: culturalId });
        if (!culturalIdExist) {
            return res.status(404).send({ error: "Please enter a valid culturald" });
        }

        const deletedculturaldetail = await culturalModel.deleteOne({ culturalId });
        if(deletedculturaldetail){
            res.status(201).send({ message: "cultural deleted successfully" });
        }

    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", error });
        console.log(error);
    }
}

export default deleteculturalImageMethod;
