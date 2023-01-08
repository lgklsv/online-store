export const extractPathId = function (path: string): number | -1 {
    const splittedPath = path.split('/');
    if (splittedPath.length > 0) {
        let id = splittedPath[splittedPath.length - 1];
        return id && !isNaN(+id) && splittedPath.length === 3 ? +id : -1;
    }
    return -1;
};
