import DataURIParser from 'datauri/parser.js';
import path from 'path';

export const getDataUri = (file) => {
    if (!file || !file.name) {
        throw new Error("Invalid file object");
    }

    const extName = path.extname(file.name).toString();
    return parser.format(extName, file.data);
};
