export const videoAgentIpcChannels = {
    approve: 'videoAgent:approve',
    cancel: 'videoAgent:cancel',
    event: 'videoAgent:event',
    regenerateScene: 'videoAgent:regenerateScene',
    regenerateVoices: 'videoAgent:regenerateVoices',
    selectAssetDirectory: 'videoAgent:selectAssetDirectory',
    start: 'videoAgent:start'
} as const;
