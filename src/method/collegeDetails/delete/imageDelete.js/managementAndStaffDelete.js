import managementAndStaffModel from "../../../../model/collegeDetail/managementAndStaff.js"

const deletemanagementAndStaffImageMethod = async (req, res) => {
    try {

        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }
        
        const managementAndStaffId = req.params.managementAndStaffId;

        const  managementAndStaffExist = await managementAndStaffModel.findOne({ managementAndStaffId: managementAndStaffId });
        if (!managementAndStaffExist) {
            return res.status(404).send({ error: "Please enter a valid managementAndStaffId" });
        }

        const deletedmanagementAndStaffdetail = await managementAndStaffModel.deleteOne({ managementAndStaffId });
        if(deletedmanagementAndStaffdetail){
            res.status(201).send({ message: "managementAndStaff deleted successfully" });
        }

    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", error });
        console.log(error);
    }
}

export default deletemanagementAndStaffImageMethod;
