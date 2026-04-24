import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';

function safePct(covered, total) {
  if (!total) return '0.00%';
  return `${((covered / total) * 100).toFixed(2)}%`;
}

function aggregateCoverage(coverageMap) {
  let statementCovered = 0;
  let statementTotal = 0;
  let functionCovered = 0;
  let functionTotal = 0;
  let branchCovered = 0;
  let branchTotal = 0;

  const lineTotals = new Set();
  const lineCovered = new Set();

  for (const file of Object.values(coverageMap)) {
    const statements = file.s ?? {};
    for (const [id, count] of Object.entries(statements)) {
      statementTotal += 1;
      if ((count ?? 0) > 0) statementCovered += 1;

      const line = file.statementMap?.[id]?.start?.line;
      if (typeof line === 'number') {
        lineTotals.add(`${file.path}:${line}`);
        if ((count ?? 0) > 0) lineCovered.add(`${file.path}:${line}`);
      }
    }

    const functions = file.f ?? {};
    for (const count of Object.values(functions)) {
      functionTotal += 1;
      if ((count ?? 0) > 0) functionCovered += 1;
    }

    const branches = file.b ?? {};
    for (const branch of Object.values(branches)) {
      if (!Array.isArray(branch)) continue;
      for (const count of branch) {
        branchTotal += 1;
        if ((count ?? 0) > 0) branchCovered += 1;
      }
    }
  }

  return {
    statements: safePct(statementCovered, statementTotal),
    branches: safePct(branchCovered, branchTotal),
    functions: safePct(functionCovered, functionTotal),
    lines: safePct(lineCovered.size, lineTotals.size),
  };
}

function getCommit() {
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    return 'unknown';
  }
}

const root = process.cwd();
const resultsPath = resolve(root, 'test-results', 'jest-results.json');
const coveragePath = resolve(root, 'coverage', 'coverage-final.json');

if (!existsSync(resultsPath)) {
  throw new Error('Missing test-results/jest-results.json. Run pnpm run test:report:raw first.');
}

const results = JSON.parse(readFileSync(resultsPath, 'utf8'));
const coverage = existsSync(coveragePath)
  ? JSON.parse(readFileSync(coveragePath, 'utf8'))
  : {};

const coverageSummary = aggregateCoverage(coverage);
const durationSeconds = Math.max(
  0,
  ((Date.now() - (results.startTime ?? Date.now())) / 1000),
).toFixed(2);

const runDate = new Date().toISOString();
const commit = getCommit();

const doc = `# Test Results

## Run Info
- Date: ${runDate}
- Branch/Commit: ${commit}
- Environment: local (Windows)
- Command: pnpm run test:report

## Summary
- Test suites: ${results.numPassedTestSuites} passed / ${results.numTotalTestSuites} total
- Tests: ${results.numPassedTests} passed / ${results.numTotalTests} total
- Snapshots: ${results.snapshot?.total ?? 0}
- Duration: ${durationSeconds}s

## Artifacts
- JSON results: [test-results/jest-results.json](test-results/jest-results.json)
- JUnit report: [test-results/junit.xml](test-results/junit.xml)
- Coverage report: [coverage/lcov-report/index.html](coverage/lcov-report/index.html)

## Coverage
- Statements: ${coverageSummary.statements}
- Branches: ${coverageSummary.branches}
- Functions: ${coverageSummary.functions}
- Lines: ${coverageSummary.lines}

## Notes
- Known warnings: None
- Known flaky tests: None
- Follow-up actions: None
`;

writeFileSync(resolve(root, 'TEST_RESULTS.md'), doc, 'utf8');
writeFileSync(resolve(root, 'TEST_RESULT.md'), doc, 'utf8');
