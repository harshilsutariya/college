
export const signOutMethod = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'User signed out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during sign out', error: error.message });
    }
};

export default signOutMethod;
