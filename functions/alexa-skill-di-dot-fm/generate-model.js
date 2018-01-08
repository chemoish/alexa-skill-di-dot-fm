const fs = require('fs');

const app = require('./di-dot-fm');

console.log('SCHEMA: ');
console.log(app.schema());

console.log();
console.log('CUSTOM SLOT TYPES:');
Object.keys(app.customSlots).forEach((key) => {
  const dir = './custom-slot';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const file = `${dir}/${key}.json`;

  fs.writeFile(file, app.customSlots[key]
    .map((value) => value.name)
    .join('\n'))
  ;

  console.log(`${key}: ${file}`);
});

console.log();
console.log('UTTERANCES: ');
console.log(app.utterances());
