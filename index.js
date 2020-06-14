#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const util = require('util');
const path = require('path');
const lstat = util.promisify(fs.lstat);
const targetDir = process.argv[2] || process.cwd();
fs.readdir(targetDir, async (err, filenames) => {
	if (err) {
		console.log(err);
	}
	const statPromises = filenames.map((filename) => {
		return lstat(path.join(targetDir, filename));
	});
	const allStats = await Promise.all(statPromises);
	allStats.forEach((stats, idx) => {
		if (stats.isFile()) {
			console.log(chalk.magentaBright(filenames[idx]));
		} else {
			console.log(chalk.cyanBright(filenames[idx]));
		}
	});
});
