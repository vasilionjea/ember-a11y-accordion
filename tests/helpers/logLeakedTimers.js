import { _hasScheduledTimers, run } from '@ember/runloop';
import QUnit from 'qunit';

/**
 * Registers a callback to fire whenever a test ends. The callback logs any
 * runloop scheduled timers that may have leaked after the test is completed.
 */
export default function logLeakedTimers() {
  QUnit.testDone(({ module, name, runtime }) => {
    if (_hasScheduledTimers()) {
      const backburner = run.backburner;
      const leaks = {
        timers: backburner._timers,
        debounceTimers: backburner._debouncees,
        throttleTimers: backburner._throttlers,
      };

      /* eslint-disable */
      console.table('LEAKED TIMERS DETECTED!');
      console.log(`${module}:`, name, `[${runtime}ms]`);
      console.log(leaks);
      /* eslint-enable */

      run.cancelTimers();
    }
  });
}
