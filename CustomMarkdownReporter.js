import fs from 'fs';
import path from 'path'

class CustomMarkdownReporter {
  constructor(globalConfig, reporterOptions, reporterContext) {
    this._globalConfig = globalConfig;
    this._options = reporterOptions;
    this._context = reporterContext;
  }

  onRunComplete(contexts, results) {
    let output = '# TEST SUMMARY\n';

    let currentTestFile; 

    results.testResults.forEach((testResult) => {
      const thisTestFile = path.basename(testResult.testFilePath);
      if (currentTestFile !== thisTestFile) {
        output += `\n## ${thisTestFile} \n`
        currentTestFile = thisTestFile;
      }
      output += "| METHOD |   TEST CASE   | TEST RESULT | \n";
      output += "|--------|---------------|-------------|\n";
      testResult.testResults.forEach((result) => {
        const testCase = result.fullName;
        const methodTested = result.ancestorTitles[result.ancestorTitles.length - 1] || "";
        const testingResult = result.status;

        output += `| ${methodTested} | ${testCase} | ${testingResult} |\n`;
        
        if (result.status === 'failed') {
          output += `\n### ${methodTested} failed..`;
          result.failureMessages.forEach((message) => {
            output += `* ${message}\n`;
          });
          output += '\n';
        }
      });
    });

    fs.writeFileSync('testSummary.md', output);
  }
}

export default CustomMarkdownReporter;