

import chokidar from 'chokidar';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory paths
const tempDirectory = path.join(__dirname, 'data', 'tempVideos');
const targetDirectory = path.join(__dirname, 'data', 'Videos', 'P1WC1C1S1SC1CT1N1UP2');

// Configure FFmpeg - if necessary, replace with your path to FFmpeg
ffmpeg.setFfmpegPath('/usr/local/bin/ffmpeg');

// Initialize the watcher
const watcher = chokidar.watch(tempDirectory, { ignored: /^\./, persistent: true });

// Function to convert video to MP4
const convertVideoToMP4 = (sourcePath, outputFilename) => {
  return new Promise((resolve, reject) => {
    // Determine the output path
    const outputPath = path.join(targetDirectory, outputFilename);

    // Ensure the file is not being written to
    fs.stat(sourcePath, (err, stats) => {
      if (err) {
        return reject(err);
      }
      if (stats.size === 0) {
        return reject(new Error("File is empty"));
      }

      // Start the conversion process
      ffmpeg(sourcePath)
        .output(outputPath)
        .on('end', () => {
          console.log(`Successfully converted ${sourcePath} to ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error(`Error converting ${sourcePath}:`, err);
          reject(err);
        })
        .run();
    });
  });
};

// Event: Add new file
watcher.on('add', async (filePath) => {
  const filename = path.basename(filePath);
  console.log(`File added: ${filename}`);

  // Check if the file is a video
  if (/\.(mov|avi|wmv|flv|3gp|mkv)$/i.test(filename)) {
    // Wait a moment to ensure the file has been fully written
    setTimeout(async () => {
      try {
        const newFilename = filename.replace(/\.[^/.]+$/, ".mp4");
        const newFilePath = await convertVideoToMP4(filePath, newFilename);

        // Optional: Delete the original file after conversion
        await fs.promises.unlink(filePath);
        console.log(`Deleted original file: ${filePath}`);
      } catch (error) {
        console.error('Error processing file:', error);
      }
    }, 1000); // Wait for 1 second before processing
  }
});

// Event: Error
watcher.on('error', (error) => console.error('Error watching file:', error));

console.log('Watching for files in', tempDirectory);




// node --experimental-modules convertVideo.js