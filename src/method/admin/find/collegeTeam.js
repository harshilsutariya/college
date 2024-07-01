import collegeTeam from "../../../model/admins/collegeAdmins.js";

export const getAllCollegeTeam = async (req, res) => {

    try {

        // if (!(req.role === 'superadmin'  || req.role === 'supermoderator' || req.roole ==='superViewer')) {
        //     return res.status(403).send({
        //         status: "failed",
        //         error: "You don't have access"
        //     });
        // }

        const collegeId = req.params.collegeId;
        const collegeTeamData = await collegeTeam.find({ collegeId, isDeleted: { $ne: true } });

        res.status(200).json({ collegeTeamData })

    } catch (error) {
        console.error("Error fetching collegeteam details: ", error);
        res.status(500).json({ message: "Failed to retrieve collegeteam details" });
    }
};

export default getAllCollegeTeam;
