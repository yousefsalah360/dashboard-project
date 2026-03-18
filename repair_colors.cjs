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

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/dark:dark:/g, 'dark:');
    content = content.replace(/bg-slate-50 bg-slate-50(\/80)?/g, 'bg-slate-50$1');
    content = content.replace(/bg-slate-100 bg-slate-100/g, 'bg-slate-100');
    content = content.replace(/bg-slate-200 bg-slate-200/g, 'bg-slate-200');
    content = content.replace(/bg-white bg-white/g, 'bg-white');
    content = content.replace(/text-slate-900 text-slate-900/g, 'text-slate-900');
    content = content.replace(/border-slate-200 border-slate-200/g, 'border-slate-200');
    content = content.replace(/shadow-slate-200\/50 shadow-slate-200\/50/g, 'shadow-slate-200/50');
    
    // Fix text-gray-400 mess
    content = content.replace(/dark:text-gray-400 dark:text-gray-500 text-gray-400 dark:text-gray-500 text-gray-400 dark:text-gray-400 dark:text-gray-500 text-gray-400/g, 'dark:text-gray-400 text-gray-500');
    content = content.replace(/dark:text-gray-500 text-gray-400 dark:text-gray-400 dark:text-gray-500 text-gray-400/g, 'dark:text-gray-500 text-gray-400');
    
    // Fix text-gray-400 mess variant 2 (seen in AppShell block)
    content = content.replace(/dark:text-gray-400 dark:text-gray-500 text-gray-400 dark:text-gray-500 text-gray-400/g, 'dark:text-gray-400 text-gray-500');

    // Fix hover states that got mangled
    content = content.replace(/hover:dark:text-white text-slate-900/g, 'hover:dark:text-white hover:text-slate-900');
    content = content.replace(/hover:dark:bg-white\/5 bg-slate-100/g, 'hover:dark:bg-white/5 hover:bg-slate-100');

    if (content !== original) {
      fs.writeFileSync(file, content);
      console.log('Repaired ' + file);
    }
  }
});
