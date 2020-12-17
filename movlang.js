const fs = require("fs");

const memory = [];

const mov = (addr, val) => {
	memory[addr] = val ? val : 0;

	if (addr === 100) {
		process.stdout.write(String(val));
	} else if (addr === 101) {
		process.stdout.write(String.fromCharCode(val));
	} else if (addr === 102) {
		return val;
	} else if (addr === 105) {
		memory[103] = get(103) + get(104);
	} else if (addr === 106) {
		memory[103] = get(103) - get(104);
	} else if (addr === 107) {
		memory[103] = get(103) * get(104);
	} else if (addr === 108) {
		memory[103] = get(103) / get(104);
	} else if (addr === 109) {
		memory[103] = get(103) % get(104);
	}
};

const get = (addr) => memory[addr] ? memory[addr] : 0;

const parse = content => {
	return lines = content.split("\n")
		.map((x, line) => 
			[
			 x.split(" ")[0], 
			 x.split(" ").slice(1).join(" ").split(",").map(arg => arg.trim()),
			 line,
			 x
			])
		.filter(line => (line[0] !== '' || (line[1].length !== 1 && line[1][0] !== '')) && line[0][0] !== ';');
};

const error = tok => {
	const lineLimit = 6;

	console.log(`syntax error on line ${tok[2] + 1}:`);

	const line = " ".repeat(lineLimit - String(tok[2]).length) + (tok[2] + 1)
	console.log(`${line} | ${tok[3]}`);
	process.exit(-1);
};

const followPointer = pointer => {
	let ReplaceCount = 0;
	while (pointer[0] === '&') {
		pointer = pointer.slice(1);
		++ReplaceCount;
	}

	pointer = Number(pointer);

	for (let i = 0; i < ReplaceCount; i++)
		pointer = get(pointer);

	return pointer;
};

const run = tokens => {
	for (let IP = 0; IP <= tokens[tokens.length - 1][2]; IP++) {
		const tok = tokens[IP];

		if (tok[0] === 'mov') {
			let dest = followPointer(tok[1][0]);
			let orig = followPointer(tok[1][1]);

			const newLoc = mov(dest, orig);

			if (newLoc !== undefined)
				IP = newLoc - 1;
		} else {
			error(tok);
		}
	}
};

if (process.argv.length >= 3)
	run(parse(String(fs.readFileSync(process.argv[2])).replace(/\r/g, "")));
else
	console.log("MovLang v1.0.0");

/*
&100 = write number
&101 = write char
&102 = jump
&103 = reg_a
&104 = reg_b
&105 = add a b
&106 = sub a b
&107 = mul a b
&108 = div a b
&109 = mod a b
*/