






import fs from 'fs/promises'; // Use fs/promises for async/await
import { URL } from 'url';

export const loginUser = async (req, res) => {
    console.log('Login attempt received');

    // Extract email and password from the request body
    const { email, password } = req.body;

    // Path to the user data file
    const dataPath = new URL('data/users.json', import.meta.url).pathname;

    try {
        console.log('Reading user data');
        // Read the user data file asynchronously
        const data = await fs.readFile(dataPath, 'utf8');

        // Parse the user data
        const users = JSON.parse(data);

        // Check if the user exists and password matches
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            console.log('Login successful');
            
            res.status(200).json({ message: 'Login successful' });
        } else {
            console.log('Login failed');
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('Error reading user data:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
