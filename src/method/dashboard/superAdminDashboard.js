import collegeDetailModel from "../../model/collegeDetail/collegeDetail.js";
import StudentCollegeApplication from "../../model/student/studentCollegeApplication.js";
import moment from "moment";

export const superAdminDashboardmethod = async (req, res) => {
    try {
        // Calculate start and end dates for the current and previous weeks
        const startOfCurrentWeek = moment().startOf('isoWeek');  // Using isoWeek to start on Monday
        const endOfCurrentWeek = moment().endOf('isoWeek');
        const startOfPreviousWeek = moment().subtract(1, 'weeks').startOf('isoWeek');
        const endOfPreviousWeek = moment().subtract(1, 'weeks').endOf('isoWeek');

        // Fetch all colleges where isDeleted is not true
        const colleges = await collegeDetailModel.find({ isDeleted: { $ne: true }});

        // Fetch all student college applications where isDeleted is not true
        const studentApplications = await StudentCollegeApplication.find({ isDeleted: { $ne: true }});

        // Initialize maps to count the number of colleges and student applications added each day
        const currentWeekCollegeCount = initializeDayCountMap();
        const previousWeekCollegeCount = initializeDayCountMap();
        const currentWeekApplicationCount = initializeDayCountMap();
        const previousWeekApplicationCount = initializeDayCountMap();

        // Initialize total admission counts
        let currentWeekTotalAdmission = 0;
        let previousWeekTotalAdmission = 0;

        // Process each college document
        colleges.forEach(college => {
            const updatedAt = moment(college.updatedAt);
            const dayName = updatedAt.format('dddd');

            // Check if the document is within the current week
            if (updatedAt.isBetween(startOfCurrentWeek, endOfCurrentWeek, 'days', '[]')) {
                console.log(`Current week - adding to ${dayName}`);
                currentWeekCollegeCount[dayName] += 1;
                currentWeekTotalAdmission += college.totalAdmission || 0;
            }

            // Check if the document is within the previous week
            if (updatedAt.isBetween(startOfPreviousWeek, endOfPreviousWeek, 'days', '[]')) {
                console.log(`Previous week - adding to ${dayName}`);
                previousWeekCollegeCount[dayName] += 1;
                previousWeekTotalAdmission += college.totalAdmission || 0;
            }
        });

        // Process each student application document
        studentApplications.forEach(application => {
            const updatedAt = moment(application.updatedAt);
            const dayName = updatedAt.format('dddd');
            const status = application.status;  
            // Check if the document is within the current week
            if (updatedAt.isBetween(startOfCurrentWeek, endOfCurrentWeek, 'days', '[]') && status === 'accept') {
                currentWeekApplicationCount[dayName] += 1;
                currentWeekTotalAdmission += application.totalAdmission || 0;
            }

            // Check if the document is within the previous week
            if (updatedAt.isBetween(startOfPreviousWeek, endOfPreviousWeek, 'days', '[]')&& status === 'accept') {
                previousWeekApplicationCount[dayName] += 1;
                previousWeekTotalAdmission += application.totalAdmission || 0;
            }
        });
        // Return the results in the response
        res.status(200).json({
            status: "success",
            currentWeekCollegeCount,
            previousWeekCollegeCount,
            currentWeekApplicationCount,
            previousWeekApplicationCount,
            currentWeekTotalAdmission,
            previousWeekTotalAdmission
        });

    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).json({ message: "Failed to retrieve data" });
    }
};

function initializeDayCountMap() {
    return {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0
    };
}

export default superAdminDashboardmethod;
