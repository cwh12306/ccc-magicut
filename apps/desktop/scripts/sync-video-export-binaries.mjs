import { constants } from 'node:fs';
import { access, chmod, copyFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { ffmpegPath, ffprobePath } = require('ffmpeg-ffprobe-static');
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const desktopDirectory = path.resolve(scriptDirectory, '..');
const targetDirectory = path.join(desktopDirectory, 'bin', process.platform);
const executableSuffix = process.platform === 'win32' ? '.exe' : '';

const assertSourceExists = async (sourcePath, name) => {
    if (!sourcePath) {
        throw new Error(
            `${name} does not provide a binary for ${process.platform}/${process.arch}`
        );
    }

    try {
        await access(sourcePath, constants.R_OK);
    } catch {
        throw new Error(
            `${name} binary is missing at ${sourcePath}. Re-run pnpm install with dependency build scripts enabled.`
        );
    }
};

const hasMatchingFile = async (sourcePath, targetPath) => {
    try {
        const [sourceStats, targetStats] = await Promise.all([
            stat(sourcePath),
            stat(targetPath)
        ]);

        return sourceStats.size === targetStats.size;
    } catch {
        return false;
    }
};

const syncExecutable = async ({ name, sourcePath }) => {
    await assertSourceExists(sourcePath, name);

    const targetPath = path.join(targetDirectory, `${name}${executableSuffix}`);

    if (!(await hasMatchingFile(sourcePath, targetPath))) {
        await copyFile(sourcePath, targetPath);
    }

    if (process.platform !== 'win32') {
        await chmod(targetPath, 0o755);
    }

    return targetPath;
};

await mkdir(targetDirectory, { recursive: true });

const [syncedFfmpegPath, syncedFfprobePath] = await Promise.all([
    syncExecutable({ name: 'ffmpeg', sourcePath: ffmpegPath }),
    syncExecutable({ name: 'ffprobe', sourcePath: ffprobePath })
]);

const dependencyPackagePath = require.resolve(
    'ffmpeg-ffprobe-static/package.json'
);
const dependencyLicensePath = path.join(
    path.dirname(dependencyPackagePath),
    'LICENSE'
);
const targetLicensePath = path.join(targetDirectory, 'LICENSE.txt');

if (!(await hasMatchingFile(dependencyLicensePath, targetLicensePath))) {
    await copyFile(dependencyLicensePath, targetLicensePath);
}

console.log(
    `[video-export] FFmpeg binaries ready:\n- ${syncedFfmpegPath}\n- ${syncedFfprobePath}`
);
