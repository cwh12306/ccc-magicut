import path from 'node:path';

export type VideoExportBinaryPlatform = typeof process.platform;

export type ResolveVideoExportBinariesInput = {
    appPath: string;
    isPackaged: boolean;
    platform: VideoExportBinaryPlatform;
    resourcesPath: string;
};

export type VideoExportBinaries = {
    ffmpegPath: string;
    ffprobePath: string;
};

const supportedPlatforms = new Set<VideoExportBinaryPlatform>([
    'darwin',
    'linux',
    'win32'
]);

const toExecutableName = ({
    name,
    platform
}: {
    name: 'ffmpeg' | 'ffprobe';
    platform: VideoExportBinaryPlatform;
}) => (platform === 'win32' ? `${name}.exe` : name);

const getPlatformPath = (platform: VideoExportBinaryPlatform) =>
    platform === 'win32' ? path.win32 : path.posix;

export const resolveVideoExportBinDirectory = ({
    appPath,
    isPackaged,
    platform,
    resourcesPath
}: ResolveVideoExportBinariesInput) => {
    if (!supportedPlatforms.has(platform)) {
        throw new Error(`Unsupported FFmpeg platform: ${platform}`);
    }

    return getPlatformPath(platform).join(
        isPackaged ? resourcesPath : appPath,
        'bin',
        platform
    );
};

export const resolveVideoExportBinaries = (
    input: ResolveVideoExportBinariesInput
): VideoExportBinaries => {
    const binDirectory = resolveVideoExportBinDirectory(input);
    const platformPath = getPlatformPath(input.platform);

    return {
        ffmpegPath: platformPath.join(
            binDirectory,
            toExecutableName({
                name: 'ffmpeg',
                platform: input.platform
            })
        ),
        ffprobePath: platformPath.join(
            binDirectory,
            toExecutableName({
                name: 'ffprobe',
                platform: input.platform
            })
        )
    };
};
