import fs from "fs";
import path from "path";

const packageJson = JSON.parse(
    fs.readFileSync(path.resolve("./package.json"), "utf-8")
);
export default packageJson.version;
