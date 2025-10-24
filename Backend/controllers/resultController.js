import SelectedCandidate from '../models/candidateSchema.js';

const checkResult = async (req, res) => {
    try {
        const { name, phone } = req.body;

        console.log('=== DEBUG START ===');
        console.log('Frontend sent - Name:', name, 'Phone:', phone, 'Type:', typeof phone);

        if (!name || !phone) {
            return res.status(400).json({
                message: 'Please fill in complete details.',
                success: false
            });
        }

        // Convert phone to number for database query
        const phoneNumber = Number(phone);
        console.log('Converted phone to number:', phoneNumber);

        const selected = await SelectedCandidate.findOne({ phone: phoneNumber });
        console.log('Searching phone:', phoneNumber, typeof phoneNumber);
        console.log('Query result:', selected);
        console.log('=== DEBUG END ===');

        if (!selected) {
            return res.json({
                message: 'No student found with this phone number.',
                success: false
            });
        }

        const storedName = selected.name;
        const enteredName = req.body.name;

        // Enhanced name matching with better logging
        console.log('Name comparison:');
        console.log('Stored name:', `"${storedName}"`);
        console.log('Entered name:', `"${enteredName}"`);
        console.log('After trim/lower - Stored:', `"${storedName.trim().toLowerCase()}"`);
        console.log('After trim/lower - Entered:', `"${enteredName.trim().toLowerCase()}"`);

        if (storedName.trim().toLowerCase() === enteredName.trim().toLowerCase()) {
            return res.json({
                message: 'selected',
                success: true,
                student: {
                    name: selected.name,
                    phone: selected.phone,
                    domains: selected.domains || [],
                    email: selected.email || '',
                    applicationId: selected.applicationId || ''
                }
            });
        } else {
            return res.status(400).json({
                message: 'Entered name does not match with the registered name.',
                success: false
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server error.",
            success: false
        });
    }
}

export default checkResult;