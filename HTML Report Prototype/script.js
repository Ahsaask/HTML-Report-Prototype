document.addEventListener("DOMContentLoaded", function() {
    const verificationResults = {
        "summary": {
          "verificationRuns": 47,
          "passed": 20,
          "alarms": 18,
          "failedVerification": 9,
          "time": "0.9817"
        },

        "abstractionPrecisionStats": {
            "numberAbstractions": 20,
            "timesAbstractionReused": 0,
            "timesPrecisionEmpty": 8
          },
          "stateSpaceInformation": {
            "numberStates": 1,
            "sizeReachedSet": 60,
            "numberTargetStates": 1
          },
          "predicateStatistics": {
            "numberPredicatesDiscovered": 7,
            "numberIrrelevantPredicates": 5,
            "avgNumberOfPredicatesPerAbstraction": 3.00
          },

        "results": [
            {
              "analyzed_files": ["../src/file1.c", "../src/file2.c"],
              "entry_file": "../src/file1.c",
              "entry_method": "method1",
              "result": "FALSE",
              "property": "CHECK( init(main()), LTL(G ! call(reach_error())))",
              "result_witness": "./file1_method1/output/witness.yml",
              "compile_command": "gcc -I../lib -lm ../src/file1.c ../src/file2.c"
            },
            {
              "analyzed_files": ["../src/file1.c", "../src/file2.c"],
              "entry_file": "../src/file1.c",
              "entry_method": "method3",
              "result": "FALSE",
              "property": "CHECK( init(main()), LTL(G ! overflow))",
              "result_witness": "./f1m2/cbmc/counterexample.yml",
              "compile_command": "gcc -I../lib -lm ../src/file1.c ../src/file2.c"
            }
        
          ],
        "bugDetails": [
          {
            "id": "identification",
            "description": "Name incorrect expected: <pete> but was: <something>",
            "location": "src/file1.c:39"
          },
        
        ],
        "codeCoverage": {
          "functionCoverage": 1.000,
          "visitedLines": 14,
          "totalLines": 14,
          "lineCoverage": 1.000,
          "visitedConditions": 14,
          "totalConditions": 14,
          "conditionCoverage": 1.000
        }
      };
    
  
    const reportContainer = document.getElementById('reportContainer');
  
    // Create and append the Summary Section
    const summarySection = document.createElement('section');
    summarySection.className = 'summary-section';
    summarySection.innerHTML = `
      <div class="summary-item"><span class="summary-label">verificationRuns</span>${verificationResults.summary.verificationRuns}</div>
      <div class="summary-item"><span class="summary-label">Passed</span>${verificationResults.summary.passed}</div>
      <div class="summary-item"><span class="summary-label">Alarms</span>${verificationResults.summary.alarms}</div>
      <div class="summary-item"><span class="summary-label">Failed Verification</span>${verificationResults.summary.failedVerification}</div>
      <div class="summary-item"><span class="summary-label">Time</span>${verificationResults.summary.time}</div>
    `;
    reportContainer.appendChild(summarySection);

    // Create and append the Verification Results Section
    verificationResults.results.forEach(result => {
        const resultSection = document.createElement('section');
        resultSection.className = 'result-section';
        
        const resultHeader = document.createElement('h3');
        resultHeader.textContent = `Verification Result for ${result.entry_method}`;
        resultSection.appendChild(resultHeader);
        
        const fileList = document.createElement('p');
        fileList.textContent = `Analyzed Files: ${result.analyzed_files.join(', ')}`;
        resultSection.appendChild(fileList);
        
        const entryFile = document.createElement('p');
        entryFile.textContent = `Entry File: ${result.entry_file}`;
        resultSection.appendChild(entryFile);
        
        const entryMethod = document.createElement('p');
        entryMethod.textContent = `Entry Method: ${result.entry_method}`;
        resultSection.appendChild(entryMethod);
        
        const verificationResult = document.createElement('p');
        verificationResult.textContent = `Result: ${result.result}`;
        verificationResult.className = result.result.toLowerCase(); 
        resultSection.appendChild(verificationResult);
        
        const property = document.createElement('p');
        property.textContent = `Property: ${result.property}`;
        resultSection.appendChild(property);
        
        const witnessLink = document.createElement('a');
        witnessLink.href = result.result_witness;
        witnessLink.textContent = 'View Result Witness';
        resultSection.appendChild(witnessLink);
        
        const compileCommand = document.createElement('p');
        compileCommand.textContent = `Compile Command: ${result.compile_command}`;
        resultSection.appendChild(compileCommand);
        
        reportContainer.appendChild(resultSection);
    });


    // Abstraction and Precision Statistics Section
    const abstractionPrecisionStatsSection = document.createElement('section');
    abstractionPrecisionStatsSection.className = 'abstraction-precision-stats-section';
    abstractionPrecisionStatsSection.innerHTML = `
        <h2>Abstraction and Precision Statistics</h2>
        <div>Number of Abstractions: ${verificationResults.abstractionPrecisionStats.numberAbstractions}</div>
        <div>Times Abstraction was Reused: ${verificationResults.abstractionPrecisionStats.timesAbstractionReused}</div>
        <div>Times Precision was Empty: ${verificationResults.abstractionPrecisionStats.timesPrecisionEmpty}</div>
    `;
    reportContainer.appendChild(abstractionPrecisionStatsSection);

    // State Space Information Section
    const stateSpaceInformationSection = document.createElement('section');
    stateSpaceInformationSection.className = 'state-space-info-section';
    stateSpaceInformationSection.innerHTML = `
        <h2>State Space Information</h2>
        <div>Number of States: ${verificationResults.stateSpaceInformation.numberStates}</div>
        <div>Size of Reached Set: ${verificationResults.stateSpaceInformation.sizeReachedSet}</div>
        <div>Number of Target States: ${verificationResults.stateSpaceInformation.numberTargetStates}</div>
    `;
    reportContainer.appendChild(stateSpaceInformationSection);

    // Predicate Statistics Section
    const predicateStatisticsSection = document.createElement('section');
    predicateStatisticsSection.className = 'predicate-stats-section';
    predicateStatisticsSection.innerHTML = `
        <h2>Predicate Statistics</h2>
        <div>Number of Predicates Discovered: ${verificationResults.predicateStatistics.numberPredicatesDiscovered}</div>
        <div>Number of Irrelevant Predicates: ${verificationResults.predicateStatistics.numberIrrelevantPredicates}</div>
        <div>Average Number of Predicates per Abstraction: ${verificationResults.predicateStatistics.avgNumberOfPredicatesPerAbstraction}</div>
    `;
    reportContainer.appendChild(predicateStatisticsSection);
    

    

    
    // Create and append the Bug Details Section
    const bugDetailsSection = document.createElement('section');
    bugDetailsSection.className = 'bug-details-section';
    bugDetailsSection.innerHTML = '<h2>Bug Details</h2>';
    
    verificationResults.bugDetails.forEach(bug => {
      const bugDetail = document.createElement('div');
      bugDetail.className = 'bug-detail';
      bugDetail.innerHTML = `
        <h4>Bug ID: ${bug.id}</h4>
        <div>Description: ${bug.description}</div>
        <div>Location: ${bug.location}</div>
      `;
      bugDetailsSection.appendChild(bugDetail);
    });
  
    reportContainer.appendChild(bugDetailsSection);
  
    // Create and append the Code Coverage Section
    const codeCoverageSection = document.createElement('section');
    codeCoverageSection.className = 'code-coverage-section';
    codeCoverageSection.innerHTML = `
      <h2>Code Coverage</h2>
      <div>Function Coverage: ${verificationResults.codeCoverage.functionCoverage}</div>
      <div>Visited Lines: ${verificationResults.codeCoverage.visitedLines}</div>
      <div>Total Lines: ${verificationResults.codeCoverage.totalLines}</div>
      <div>Line Coverage: ${verificationResults.codeCoverage.lineCoverage}</div>
      <div>Visited Conditions: ${verificationResults.codeCoverage.visitedConditions}</div>
      <div>Total Conditions: ${verificationResults.codeCoverage.totalConditions}</div>
      <div>Condition Coverage: ${verificationResults.codeCoverage.conditionCoverage}</div>
    `;
    reportContainer.appendChild(codeCoverageSection);
  });
  