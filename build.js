const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const walk = require("walk-sync");
const YAML = require("yamljs");

const hashes = {};
for (const file of walk(path.join(__dirname, "images"), {directories: false})) {
	const filepath = path.join(__dirname, "images", file);
	const filecontent = fs.readFileSync(filepath);
	const filehash = crypto.createHash("md5").update(filecontent).digest("hex");
	hashes[filehash] = filepath;
}

const db = YAML.parse(fs.readFileSync(path.join(__dirname, "db.yaml"), "utf8"));
console.log(db)
for (const item of db) {
	let title;
	if (item.lang) // Note that the lang property is optional
		title = item.en;
	else
		title = item.title;
	let buf = "---\n";
	buf += `title: ${title}\n`;
	buf += "---\n";

	if (item.lang)
		buf += `Original title: *${item.title}* (${item.lang})\n\n`;

	if (item.caption)
		buf += item.caption + "\n\n";

	if (typeof item.items === "string") item.items = [item.items];
	for (const singleItem of item.items) {
		let hash;
		if (typeof singleItem === "string") // If no metadata is available
			hash = singleItem;
		else
			hash = singleItem.hash;
		const srcPath = hashes[hash];
		buf += "![Item](/" + hash + path.extname(srcPath) + ")\n\n";
		fs.copyFileSync(srcPath, path.join(__dirname, "hugo", "static", hash + path.extname(srcPath)));
		if (singleItem.loc)
			buf += `Location: ${singleItem.loc}\n\n`;
	}

	fs.writeFileSync(path.join(__dirname, "hugo", "content", "posts", item.title + ".md"), buf);
	console.log(buf);
}