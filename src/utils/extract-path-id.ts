export const extractPathId = function (path: string): number | -1{
    const splittedPath = path.split('/');
    let id;
    if (splittedPath.length > 0) {
        id = splittedPath.pop();
        if (id) return +id;
    }
    return id ? +id : -1;
};
