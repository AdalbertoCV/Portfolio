/* ==========================================================================
   THE STUDY ZONE

   Ten problems, ordered so the first one can be solved by somebody who has
   written code for a week and the last one by somebody preparing for an
   interview. Each teaches exactly one idea; none of them is here because it
   is clever.

   Only the code lives in this file. Statements, hints and explanations are
   prose and belong in the dictionary, which is also why the snippets carry no
   comments — a comment in here would be the one line nobody translates.

   JavaScript on purpose: the reader already has somewhere to run it, which is
   the browser this page is open in.
   ========================================================================= */

const PROBLEMS = [
  {
    id: 'fizzbuzz',
    level: 'easy',
    tags: ['Condicionales', 'Módulo'],
    code: `for (let i = 1; i <= 100; i += 1) {
  if (i % 15 === 0) console.log('FizzBuzz');
  else if (i % 3 === 0) console.log('Fizz');
  else if (i % 5 === 0) console.log('Buzz');
  else console.log(i);
}`,
  },
  {
    id: 'floats',
    level: 'easy',
    tags: ['Punto flotante', 'IEEE 754'],
    code: `0.1 + 0.2;           // 0.30000000000000004
0.1 + 0.2 === 0.3;   // false

Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON;   // true`,
  },
  {
    id: 'reverse',
    level: 'easy',
    tags: ['Cadenas', 'Dos punteros'],
    code: `const reverse = (s) => [...s].reverse().join('');

function reverseByHand(s) {
  const a = [...s];
  for (let i = 0, j = a.length - 1; i < j; i += 1, j -= 1) {
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.join('');
}`,
  },
  {
    id: 'palindrome',
    level: 'easy',
    tags: ['Cadenas', 'Normalización'],
    code: `function isPalindrome(text) {
  const clean = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z0-9]/g, '');

  for (let i = 0, j = clean.length - 1; i < j; i += 1, j -= 1) {
    if (clean[i] !== clean[j]) return false;
  }
  return true;
}`,
  },
  {
    id: 'brackets',
    level: 'medium',
    tags: ['Pila', 'Parsing'],
    code: `function balanced(text) {
  const closes = { ')': '(', ']': '[', '}': '{' };
  const stack = [];

  for (const ch of text) {
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);
    else if (closes[ch] && stack.pop() !== closes[ch]) return false;
  }

  return stack.length === 0;
}`,
  },
  {
    id: 'twosum',
    level: 'medium',
    tags: ['Hash map', 'O(n)'],
    code: `function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i += 1) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }

  return null;
}`,
  },
  {
    id: 'missing',
    level: 'medium',
    tags: ['Matemáticas', 'Gauss'],
    code: `function missing(nums, n) {
  const expected = (n * (n + 1)) / 2;
  const actual = nums.reduce((a, b) => a + b, 0);
  return expected - actual;
}`,
  },
  {
    id: 'binary',
    level: 'medium',
    tags: ['Búsqueda binaria', 'Off-by-one'],
    code: `function search(sorted, target) {
  let low = 0;
  let high = sorted.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) low = mid + 1;
    else high = mid - 1;
  }

  return -1;
}`,
  },
  {
    id: 'fib',
    level: 'hard',
    tags: ['Recursión', 'Memoización'],
    code: `function fib(n, memo = new Map()) {
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);

  const value = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, value);
  return value;
}`,
  },
  {
    id: 'cycle',
    level: 'hard',
    tags: ['Listas enlazadas', 'Floyd'],
    code: `function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}`,
  },
];

export default PROBLEMS;
