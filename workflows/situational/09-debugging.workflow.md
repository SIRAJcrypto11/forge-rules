# Workflow: Debugging
**ID:** WF-09  
**Trigger Keywords:** debug, debugger, breakpoint, console.log, inspect, trace, stack trace, reproduce, investigate  
**Primary Agent:** Coder  
**Support Agents:** Tester  
**Estimated Time:** 30 min – 8 hours  

---

## Overview

Systematic debugging approach using modern tools and techniques. The goal: find root cause quickly and fix it permanently.

---

## Phase 1: Reproduce the Issue

### 1.1 Gather Information
```
REQUIRED before debugging:
- [ ] Exact steps to reproduce
- [ ] Expected vs actual behavior
- [ ] Error message / stack trace
- [ ] Environment (browser, OS, Node version)
- [ ] Frequency (always / sometimes / once)
- [ ] Recent changes (what was deployed recently?)
```

### 1.2 Create Minimal Reproduction
```
Simplify until you have the smallest possible reproduction:
1. Remove unrelated code
2. Use minimal data
3. Isolate the component/function
4. Create CodeSandbox/StackBlitz if needed
```

---

## Phase 2: Debugging Tools

### 2.1 Browser DevTools
```javascript
// Console methods
console.log('Simple log');
console.warn('Warning message');
console.error('Error message');
console.table([{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]);
console.group('Group label');
console.log('Inside group');
console.groupEnd();
console.time('operation');
// ... code ...
console.timeEnd('operation'); // logs duration

// Conditional logging
console.assert(value > 0, 'Value must be positive');

// Trace call stack
console.trace('How did we get here?');

// Debugger statement
function problematicFunction() {
  debugger; // execution pauses here
  // ... code ...
}
```

### 2.2 VS Code Debugger
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Node App",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/index.js"
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug React App",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### 2.3 React DevTools
```
Install: https://react.dev/learn/react-developer-tools

Features:
- Component tree inspection
- Props and state inspection
- Profiler for performance
- Highlight updates
- Suspend/resume rendering
```

### 2.4 Network Debugging
```
Chrome DevTools > Network tab:
- [ ] Check request/response
- [ ] Verify headers
- [ ] Check status codes
- [ ] Inspect payload
- [ ] Check timing
- [ ] Throttle network speed
```

---

## Phase 3: Common Debugging Scenarios

### 3.1 State Issues (React)
```javascript
// Debug state updates
useEffect(() => {
  console.log('State changed:', { count, user, items });
}, [count, user, items]);

// Debug why component re-renders
import { useWhyDidYouUpdate } from './hooks/useWhyDidYouUpdate';

function MyComponent(props) {
  useWhyDidYouUpdate('MyComponent', props);
  // ...
}

// useWhyDidYouUpdate implementation
function useWhyDidYouUpdate(name, props) {
  const previousProps = useRef();
  
  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changedProps = {};
      
      allKeys.forEach(key => {
        if (previousProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: previousProps.current[key],
            to: props[key]
          };
        }
      });
      
      if (Object.keys(changedProps).length > 0) {
        console.log('[why-did-you-update]', name, changedProps);
      }
    }
    
    previousProps.current = props;
  });
}
```

### 3.2 Async Issues
```javascript
// Debug promise chains
fetch('/api/data')
  .then(res => {
    console.log('Response:', res);
    return res.json();
  })
  .then(data => {
    console.log('Data:', data);
    return processData(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Debug async/await
async function fetchData() {
  try {
    console.log('Fetching...');
    const res = await fetch('/api/data');
    console.log('Response:', res);
    
    const data = await res.json();
    console.log('Data:', data);
    
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Debug race conditions
let requestId = 0;
async function fetchUser(userId) {
  const currentRequestId = ++requestId;
  console.log(`Request ${currentRequestId} started for user ${userId}`);
  
  const data = await api.getUser(userId);
  
  if (currentRequestId !== requestId) {
    console.log(`Request ${currentRequestId} cancelled (newer request exists)`);
    return;
  }
  
  console.log(`Request ${currentRequestId} completed`);
  setUser(data);
}
```

### 3.3 Performance Issues
```javascript
// Measure render time
const start = performance.now();
// ... render logic ...
const end = performance.now();
console.log(`Render took ${end - start}ms`);

// React Profiler
import { Profiler } from 'react';

function onRenderCallback(
  id, // component id
  phase, // "mount" or "update"
  actualDuration, // time spent rendering
  baseDuration, // estimated time without memoization
  startTime,
  commitTime
) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>

// Memory leaks
// Check for:
// - Event listeners not removed
// - Timers not cleared
// - Subscriptions not unsubscribed

useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);
  
  // MUST clean up
  return () => clearInterval(timer);
}, []);
```

---

## Phase 4: Advanced Techniques

### 4.1 Binary Search Debugging
```
When bug appeared recently:
1. git bisect start
2. git bisect bad (current broken commit)
3. git bisect good <last-known-good-commit>
4. Test the code
5. git bisect good/bad (depending on result)
6. Repeat until culprit commit found
```

### 4.2 Rubber Duck Debugging
```
Explain the problem out loud (to a rubber duck or colleague):
1. What should happen
2. What actually happens
3. Walk through the code line by line
4. Often you'll spot the issue while explaining
```

### 4.3 Add Logging Strategically
```javascript
// Log function entry/exit
function calculateTotal(items) {
  console.log('calculateTotal called with:', items);
  
  const total = items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    console.log(`Item ${item.id}: ${item.price} x ${item.quantity} = ${itemTotal}`);
    return sum + itemTotal;
  }, 0);
  
  console.log('calculateTotal returning:', total);
  return total;
}

// Log with context
const logger = {
  log: (message, data) => {
    console.log(`[${new Date().toISOString()}] ${message}`, data);
  }
};

logger.log('User logged in', { userId: user.id, timestamp: Date.now() });
```

---

## Phase 5: Fix & Prevent

### 5.1 Root Cause Analysis
```
Ask "Why?" 5 times:
1. Why did the bug occur? → Because X was null
2. Why was X null? → Because API returned null
3. Why did API return null? → Because user had no data
4. Why was this not handled? → Because we assumed data always exists
5. Why did we assume that? → Because we didn't consider edge case

Root cause: Missing null check for edge case
```

### 5.2 Add Tests to Prevent Regression
```javascript
// After fixing bug, add test that would have caught it
describe('calculateTotal', () => {
  it('handles empty cart', () => {
    expect(calculateTotal([])).toBe(0);
  });
  
  it('handles items with zero quantity', () => {
    const items = [{ price: 10, quantity: 0 }];
    expect(calculateTotal(items)).toBe(0);
  });
  
  it('handles null/undefined items', () => {
    expect(calculateTotal(null)).toBe(0);
    expect(calculateTotal(undefined)).toBe(0);
  });
});
```

---

## Quick Reference: Debugging Checklist

| Issue Type | First Check |
|------------|-------------|
| Nothing renders | Check console for errors |
| Wrong data displayed | Log props/state |
| Infinite loop | Check useEffect dependencies |
| Stale data | Check cache/memoization |
| API error | Check Network tab |
| Slow performance | Use Profiler |
| Memory leak | Check cleanup functions |
| TypeScript error | Read error message carefully |
| Build error | Check import paths |
| Test failure | Read assertion message |
