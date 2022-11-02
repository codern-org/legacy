export const defaultCodeByLanguage = {
  'c': `#include <stdio.h>\n\nint main() {\n\tprintf("Hello World!");\n\treturn 0;\n}\n`,
  'cpp': `#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Hello World!";\n\treturn 0;\n}\n`,
  'javascript': `const sayHi = () => {\n\tconsole.log('Hello World');\n};\nsayHi();`,
};
