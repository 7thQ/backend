
import fs from 'fs'; // Import the fs module
import path from 'path'; // Import the path module


export const getVideos = async (req, res) => {
    const sentID = req.query.IDSent; // ID of the video pool
    console.log('Received ID:', sentID); // Log the received pool ID

    // Directory for the specified pool of videos
    const poolDirectory = path.join('data', 'Videos', sentID);
    console.log('Pool Directory:', poolDirectory); // Log the directory path for the video pool

    try {
        // Read the directory contents to get a list of video files
        const files = await fs.promises.readdir(poolDirectory);
        console.log('Files in Directory:', files); // Log all files found in the directory

        const videoFiles = files;
        // const videoFiles = files.filter(file => file.endsWith('.mp4')); // Filter only mp4 files
        console.log('Filtered Video Files:', videoFiles); // Log filtered list of video files

        if (videoFiles.length === 0) {
            throw new Error('No videos found in the specified pool.');
        }

        // Construct URLs for each video file
        const videoURLs = videoFiles.map(videoFile => {
            return `${req.protocol}://${req.get('host')}/data/Videos/${sentID}/${videoFile}`;
        });
        console.log('Video URLs:', videoURLs); // Log all video URLs

        // Respond with the video URLs encapsulated in an object
        res.json({ urls: videoURLs });
    } catch (error) {
        console.error('Error:', error);
        res.status(404).send('Pool not found or no videos available');
    }
};
