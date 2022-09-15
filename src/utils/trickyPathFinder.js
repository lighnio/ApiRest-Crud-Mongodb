

export function getFileUrl() {
    const stackTraceFrames = String(new Error().stack)
        .replace(/^Error.*\n/, '')
        .split('\n');
    // 0 = this getFileUrl frame (because the Error is created here)
    // 1 = the caller of getFileUrl (the file path we want to grab)
    const callerFrame = stackTraceFrames[1];
    // Extract the script's complete url
    // const url = callerFrame.match(/http.*\.js/)[0];
    const url = callerFrame.split(" ").pop();
    return url;
}
