import Sport from "../../../../model/collegeDetail/sports.js"

const deletesportImageMethod = async (req, res) => {
    try {

        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }
        
        const sportsId = req.params.sportsId;

        const sportExist = await Sport.findOne({ sportsId: sportsId });
        if (!sportExist) {
            return res.status(404).send({ error: "Please enter a valid sportId" });
        }

        const deletedsportsdetail = await Sport.deleteOne({ sportsId });
        if(deletedsportsdetail){
            res.status(201).send({ message: "sports deleted successfully" });
        }

    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", error });
        console.log(error);
    }
}

export default deletesportImageMethod;
