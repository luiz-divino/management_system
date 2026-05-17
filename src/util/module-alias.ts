import * as path from "path";
import { addAliases } from "module-alias";

const isCompiledBuild = __filename.endsWith(".js");
const aliasesRoot = isCompiledBuild
  ? path.resolve(__dirname, "..")
  : path.resolve(__dirname, "../..", "src");

addAliases({
  "@src": aliasesRoot,
});
