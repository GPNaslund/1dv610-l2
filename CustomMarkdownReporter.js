import fs from 'fs';
import path from 'path'

/** Reporter to use with Jest to generate an .md file with the results */
class CustomMarkdownReporter {
  /**
   * Creates an CustomMarkDownReporter intance.
   * @param {*} globalConfig - Jest config argument.
   * @param {*} reporterOptions - Jest config argument.
   * @param {*} reporterContext - Jest config argument.
   */
  constructor(globalConfig, reporterOptions, reporterContext) {
    this._globalConfig = globalConfig;
    this._options = reporterOptions;
    this._context = reporterContext;
  }

  /**
   * Method that hooks in to the Jest testing framework and is 
   * executed when all of the testing is done.
   * @param {*} contexts - Jest hook argument.
   * @param {*} results - Jest hook argument.
   */
  onRunComplete(contexts, results) {
    let output = '# TEST SUMMARY\n';

    let currentTestFile; 

    // For each tested file
    results.testResults.forEach((testResult) => {
      // Get the filename
      const thisTestFile = path.basename(testResult.testFilePath);
      // If the file has not been tested add a table to the file
      if (currentTestFile !== thisTestFile) {
        output += `\n## ${thisTestFile} \n`
        currentTestFile = thisTestFile;
      }
      output += "| METHOD |   TEST CASE   | TEST RESULT | \n";
      output += "|--------|---------------|-------------|\n";
      
      // For each test within a test file add the test case, methods being tested and testing result.
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

    // Write all the info to file.
    fs.writeFileSync('testSummary.md', output);
  }
}

export default CustomMarkdownReporter;