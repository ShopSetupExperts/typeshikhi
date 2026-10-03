import { runEngineTests } from './bijoy-engine.test';
import { runExtended300TestSuite } from './bijoy-engine.extended.test';

const { passed, failed, results } = runEngineTests();

console.log(`\n================ BIJOY TYPING ENGINE CORE TEST REPORT ================`);
console.log(`Passed: ${passed} | Failed: ${failed} | Total: ${results.length}`);
results.filter(r => !r.success).forEach(r => {
  console.log(`❌ FAILED: ${r.name} | Expected: '${r.expected}' | Actual: '${r.actual}'`);
});
console.log(`======================================================================\n`);

const ext = runExtended300TestSuite();
console.log(`\n================ EXTENDED COMPREHENSIVE TEST SUITE ===================`);
console.log(`Passed: ${ext.passed} | Failed: ${ext.failed} | Total: ${ext.total}`);
console.log(`======================================================================\n`);

if (failed > 0 || ext.failed > 0) {
  const nodeProc = (globalThis as Record<string, any>)['process'];
  if (nodeProc && typeof nodeProc.exit === 'function') {
    nodeProc.exit(1);
  }
} else {
  console.log(`\n✨ ALL ${passed + ext.passed} BIJOY TEST CASES PASSED WITH 100% SUCCESS!\n`);
}



