import superTeam from "../../../model/admins/superAdmin.js";

export const getAllSuperTeam = async (req, res) => {

    try {

        // if (!(req.role === 'superadmin'  || req.role === 'supermoderator' || req.roole ==='superViewer')) {
        //     return res.status(403).send({
        //         status: "failed",
        //         error: "You don't have access"
        //     });
        // }
        
        const superTeamData = await superTeam.find({  isDeleted: { $ne: true } });

        res.status(200).json({superTeamData})

    } catch (error) {
        console.error("Error fetching superteam details: ", error);
        res.status(500).json({ message: "Failed to retrieve superteam details" });
    }
};

export default getAllSuperTeam;
