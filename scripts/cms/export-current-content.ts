import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { exportSnapshot } from "./current-content";

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const snapshot = await exportSnapshot();
  if (dryRun) {
    console.log(JSON.stringify({ dryRun: true, audit: snapshot.audit }, null, 2));
  } else {
    const directory = join(process.cwd(), ".cms-export");
    await mkdir(directory, { recursive: true });
    const output = join(directory, "alford-content.json");
    await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
    console.log(`Exported ${snapshot.contentEntries.length} content entries and ${snapshot.media.length} media records to ${output}`);
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
