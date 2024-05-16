
// import fs from 'fs';
// import { createReadStream } from 'fs';
// import path from 'path';

// export const getVideos = async (req, res) => {
//     const sentID = req.query.IDSent; // ID of the video pool
//     console.log('sentID', sentID);

//     // Directory for the specified pool of videos
//     const poolDirectory = path.join('data', 'Videos', sentID);
//     console.log('poolDirectory', poolDirectory);

//     try {
//         // Read the directory contents to get a list of video files
//         const files = await fs.promises.readdir(poolDirectory);
//         const videoFiles = files.filter(file => file.endsWith('.mp4')); // Filter only mp4 files

//         if (videoFiles.length === 0) {
//             throw new Error('No videos found in the specified pool.');
//         }

//         // Randomly select a video from the pool
//         const videoFile = videoFiles[Math.floor(Math.random() * videoFiles.length)];
//         const videoPath = path.join(poolDirectory, videoFile);

//         // Get file statistics for the selected video
//         const stats = await fs.promises.stat(videoPath);
//         const fileSize = stats.size;
//         const range = req.headers.range;

//         console.log('videoFile', videoFile);
//         console.log('videoPath', videoPath);
//         console.log('fileSize', fileSize);
//         console.log('range', range);

//         if (range) {
//             const parts = range.replace(/bytes=/, "").split("-");
//             const start = parseInt(parts[0], 10);
//             const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;

//             const chunkSize = (end - start) + 1;
//             const head = {
//                 'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//                 'Accept-Ranges': 'bytes',
//                 'Content-Length': chunkSize,
//                 'Content-Type': 'video/mp4',
//             };

//             console.log('head', head);

//             res.writeHead(206, head);
//             const videoStream = createReadStream(videoPath, {start, end});
//             videoStream.pipe(res);
//         } else {
//             const head = {
//                 'Content-Length': fileSize,
//                 'Content-Type': 'video/mp4',
//             };
//             console.log('head', head);

//             res.writeHead(200, head);
//             createReadStream(videoPath).pipe(res);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(404).send('Pool not found or no videos available');
//     }
// };


// import fs from 'fs';
// import { createReadStream } from 'fs';
// import path from 'path';

// export const getVideos = async (req, res) => {
//     const sentID = req.query.IDSent; // ID of the video pool
//     console.log('Received ID:', sentID); // Log the received pool ID

//     // Directory for the specified pool of videos
//     const poolDirectory = path.join( 'data', 'Videos', sentID);
//     console.log('Pool Directory:', poolDirectory); // Log the directory path for the video pool

//     try {
//         // Read the directory contents to get a list of video files
//         const files = await fs.promises.readdir(poolDirectory);
//         console.log('Files in Directory:', files); // Log all files found in the directory

//         const videoFiles = files.filter(file => file.endsWith('.mp4')); // Filter only mp4 files
//         console.log('Filtered Video Files:', videoFiles); // Log filtered list of video files

//         if (videoFiles.length === 0) {
//             throw new Error('No videos found in the specified pool.');
//         }

//         // Randomly select a video from the pool
//         const videoFile = videoFiles[Math.floor(Math.random() * videoFiles.length)];
//         console.log('Selected Video File:', videoFile); // Log which video file was selected

//         const videoPath = path.join(poolDirectory, videoFile);
//         console.log('Full Path to Video:', videoPath); // Log the full path to the selected video file

//         // Get file statistics for the selected video
//         const stats = await fs.promises.stat(videoPath);
//         const fileSize = stats.size;
//         console.log('Video File Size:', fileSize); // Log the size of the video file

//         const range = req.headers.range;
//         console.log('Range Request:', range); // Log the range request if present

//         if (range) {
//             const parts = range.replace(/bytes=/, "").split("-");
//             const start = parseInt(parts[0], 10);
//             const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;

//             const chunkSize = (end - start) + 1;
//             const head = {
//                 'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//                 'Accept-Ranges': 'bytes',
//                 'Content-Length': chunkSize,
//                 'Content-Type': 'video/mp4',
//             };
//              console.log('head', head);

//             console.log('Streaming Range:', `${start}-${end}`); // Log the actual range being streamed
//             res.writeHead(206, head);
//             const videoStream = createReadStream(videoPath, {start, end});
//             videoStream.pipe(res);
//         } else {
//             const head = {
//                 'Content-Length': fileSize,
//                 'Content-Type': 'video/mp4',
//             };
//             res.writeHead(200, head);
//             createReadStream(videoPath).pipe(res);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(404).send('Pool not found or no videos available');
//     }
// };


// import fs from 'fs';
// import path from 'path';

// export const getVideos = async (req, res) => {
//     const sentID = req.query.IDSent; // ID of the video pool
//     console.log('Received ID:', sentID); // Log the received pool ID

//     // Directory for the specified pool of videos
//     const poolDirectory = path.join('data', 'Videos', sentID);
//     console.log('Pool Directory:', poolDirectory); // Log the directory path for the video pool

//     try {
//         // Read the directory contents to get a list of video files
//         const files = await fs.promises.readdir(poolDirectory);
//         console.log('Files in Directory:', files); // Log all files found in the directory

//         const videoFiles = files.filter(file => file.endsWith('.mp4')); // Filter only mp4 files
//         console.log('Filtered Video Files:', videoFiles); // Log filtered list of video files

//         if (videoFiles.length === 0) {
//             throw new Error('No videos found in the specified pool.');
//         }

//         // Construct URLs for each video file
//         const videoURLs = videoFiles.map(videoFile => {
//             return `${req.protocol}://${req.get('host')}/${path.join(poolDirectory, videoFile)}`;
//         });
//         console.log('Video URLs:', videoURLs); // Log all video URLs

//         // Respond with the video URLs
//         res.json(videoURLs);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(404).send('Pool not found or no videos available');
//     }
// };

import fs from 'fs';
import path from 'path';

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

        const videoFiles = files.filter(file => file.endsWith('.mp4')); // Filter only mp4 files
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
