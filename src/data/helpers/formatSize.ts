export const formatSize = (bytes: number) => {
    const MB = 1024 * 1024;
    const GB = 1024 * MB;

    if (bytes >= GB) {
        return `${(bytes / GB).toFixed(2)} GB`;
    } else {
        return `${(bytes / MB).toFixed(2)} MB`;
    }
}