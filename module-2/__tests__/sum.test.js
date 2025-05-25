import assert from "node:assert";
import {test} from "node:test";
import sum from '../utils/sum.js';

// Single tests
test ("sum 1+2=3", ()=>{
  assert.strictEqual(sum(1, 2), 3);
})
test ("sum 2+3=5", ()=>{
  assert.strictEqual(sum(2, 3), 5);
})

// Tests grouping
test ("sum", async (it)=>{
  await it.test("1+2=3", ()=>{
    assert.strictEqual(sum(1, 2), 3);
  })
  await it.test("2+3=5", ()=>{
    assert.strictEqual(sum(2, 3), 5);
  })
})

// Running a file with tests
// node __tests__/sum.test.js