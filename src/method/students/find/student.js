import students from "../../../model/student/studentRegistration.js";

export const getAllstudentsMethod = async (req, res) => {

    try {

        // if (!(req.role === 'superadmin'  || req.role === 'supermoderator' || req.roole ==='superViewer')) {
        //     return res.status(403).send({
        //         status: "failed",
        //         error: "You don't have access"
        //     });
        // }
        
        const studentsData = await students.find({  isDeleted: { $ne: true } });

        res.status(200).json({studentsData})

    } catch (error) {
        console.error("Error fetching students details: ", error);
        res.status(500).json({ message: "Failed to retrieve students details" });
    }
};

export default getAllstudentsMethod;
