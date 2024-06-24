import academic from "../../../../model/collegeDetail/academics.js"

const deleteacademicsImageMethod = async (req, res) => {
    try {

        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }
        
        const academicsId = req.params.academicsId;

        const academicExist = await academic.findOne({ academicsId: academicsId  });
        if (!academicExist) {
            return res.status(404).send({ error: "Please enter a valid academicsId" });
        }

        

        const deletedacademicdetail = await academic.deleteOne({ academicsId });
        if(deletedacademicdetail){
            res.status(201).send({ message: "academics deleted successfully" });
        }

    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", error });
        console.log(error);
    }
}

export default deleteacademicsImageMethod;
