import studentFavouriteCollegeModel from "../../../model/student/studentFavouriteCollege.js";

export const deletestudentFavouriteCollegeMethod = async (req, res) => {
    try {
    
        const studentFavouriteCollegeId = req.params.studentFavouriteCollegeId;
        
        const studentFavouriteCollege = await studentFavouriteCollegeModel.findOne({ studentFavouriteCollegeId });

        if (!studentFavouriteCollege) {
            return res.status(404).send({ error: "Please enter a valid studentFavouriteCollegeId" });
        }

        await studentFavouriteCollegeModel.deleteOne({ studentFavouriteCollegeId });

        res.status(201).send({ message: "studentFavouriteCollege deleted successfully" });

    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", error });
        console.log(error);
    }
}

export default deletestudentFavouriteCollegeMethod;
