import fs from "fs";
import path from "path";

export const updateScripts = async () => {
  const packageJsonPath = path.join(process.cwd(), "package.json");
  fs.readFile(packageJsonPath, "utf8", async (err, data) => {
    if (err) {
      console.error(`Error reading package.json: ${err}`);
      return;
    }
    let packageJson;
    try {
      packageJson = JSON.parse(data);
    } catch (parseErr) {
      console.error(`Error parsing package.json: ${parseErr}`);
      return;
    }

    packageJson.scripts["db:pull"] = "drizzle-kit introspect";
    packageJson.scripts["db:push"] = "drizzle-kit push";
    packageJson.scripts["db:migrate"] = "drizzle-kit migrate";
    packageJson.scripts["db:generate"] = "drizzle-kit generate";
    packageJson.scripts["db:drop"] = "drizzle-kit drop";
    packageJson.scripts["db:up"] = "drizzle-kit up";
    packageJson.scripts["db:check"] = "drizzle-kit check";
    packageJson.scripts["db:studio"] = "drizzle-kit studio";

    const updatedPackageJson = JSON.stringify(packageJson, null, 2);

    fs.writeFile(packageJsonPath, updatedPackageJson, "utf8", (writeErr) => {
      if (writeErr) {
        console.error(`Error writing package.json: ${writeErr}`);
      } else {
        console.log("package.json has been updated successfully.");
        // console.log("following scripts are added")
        // console.log(chalk.yellowBright(JSON.stringify(packageJson.scripts).split(",")))
      }
    });
  });
};
