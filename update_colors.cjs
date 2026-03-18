const fs = require('fs');

const files = [
  'src/App.jsx',
  'src/components/charts/index.jsx',
  'src/components/common/index.jsx',
  'src/components/layout/AppShell.jsx',
  'src/context/Router.jsx',
  'src/main.jsx',
  'src/pages/Dashboard/index.jsx',
  'src/pages/Employees/index.jsx',
  'src/pages/Schools/index.jsx',
  'src/pages/Students/index.jsx',
  'src/pages/Users/index.jsx',
  'src/store/index.jsx'
];

const replaces = [
  [/bg-slate-950/g, 'dark:bg-slate-950 bg-slate-50'],
  [/bg-slate-900/g, 'dark:bg-slate-900 bg-white'],
  [/text-white/g, 'dark:text-white text-slate-900'],
  [/text-gray-400/g, 'dark:text-gray-400 text-gray-500'],
  [/text-gray-500/g, 'dark:text-gray-500 text-gray-400'],
  [/border-white\/8/g, 'dark:border-white/8 border-slate-200'],
  [/bg-white\/5/g, 'dark:bg-white/5 bg-slate-100'],
  [/bg-white\/10/g, 'dark:bg-white/10 bg-slate-200'],
  [/bg-white\/20/g, 'dark:bg-white/20 bg-slate-300'],
  [/shadow-black\/50/g, 'dark:shadow-black/50 shadow-slate-200/50'],
  [/shadow-black\/20/g, 'dark:shadow-black/20 shadow-slate-200/50']
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    replaces.forEach(([regex, repl]) => {
      content = content.replace(regex, repl);
    });
    if (content !== original) {
      fs.writeFileSync(file, content);
      console.log('Updated ' + file);
    }
  }
});
