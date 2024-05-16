






import fs from 'fs/promises'; // Use fs/promises for async/await
import { URL } from 'url';

export const loginUser = async (req, res) => {
    console.log('Login attempt received');

    // Extract email and password from the request body
    const { userName, password } = req.body;
    console.log('userName', userName, 'password', password, {userName, password});

    // Path to the user data file
    const dataPath = new URL('data/users.json', import.meta.url).pathname;

    try {
        console.log('Reading user data');
        // Read the user data file asynchronously
        const data = await fs.readFile(dataPath, 'utf8');

        // Parse the user data
        const users = JSON.parse(data);

        // Check if the user exists and password matches
        const user = users.find(user => user.userdetails.Logins.userName === userName && user.userdetails.Logins.password === password);

        if (user) {
            console.log('Login successful');
            
            res.status(200).json({ Logins: user.userdetails.Logins});
        } else {
            console.log('Login failed');
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('Error reading user data:', err);
        res.status(500).json({ message: 'Server error' });
    }
};



export const getUserDetails = async (req, res) => {
    const username = req.query.username; // or any other identifier you want to use
    console.log('recieved Query');
    // Path to the user data file
    const dataPath = new URL('data/users.json', import.meta.url).pathname;

    try {
        // Read and parse the user data file asynchronously
        const data = await fs.readFile(dataPath, 'utf8');
        const users = JSON.parse(data);

        // Find the user with the matching username
        const user = users.find(u => u.userName === username);

        if (user) {
            console.log('sending Query properties back');
            // Return the found user
            res.status(200).json({message:'hello',userdetails: user});
        } else {
            // User not found
            console.log('query does not exist');
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error accessing user data:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
