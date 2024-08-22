import fs from 'fs';
import path from 'path';

export const getVersion = async () => {
    const packageJsonPath = path.join(process.cwd(), "package.json");

    return new Promise((resolve, reject) => {
        fs.readFile(packageJsonPath, "utf8", (err, data) => {
            if (err) {
                return reject(err);
            }

            try {
                const packageJson = JSON.parse(data);
                const VERSION = packageJson.version;
                const DESC = packageJson.description;
                
                resolve({ version: VERSION, desc: DESC });
            } catch (parseErr) {
                reject(parseErr);
            }
        });
    });
};


