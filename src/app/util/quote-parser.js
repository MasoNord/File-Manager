
export function CheckOnQuotes(path) {
    if (!path.includes(" "))
        return true;
    else {
        if ((path[0] === "'" && path[path.length - 1] === "'") ||
            (path[0] === '"' && path[path.length - 1] === '"'))
            return true;
    }
    return false;
}