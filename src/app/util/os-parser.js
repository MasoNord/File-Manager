import process from 'process';

export function GetSleshes() {
    if (process.platform === "win32")
        return "\\";
    return "/";
} 