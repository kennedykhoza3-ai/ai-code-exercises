# Deepening Knowledge of My Current Programming Language

## Language: JavaScript

## Activity 1: Idiomatic Code Transformation

For this activity, I reviewed my inventory processing function and used AI to identify ways to make the JavaScript more idiomatic.

### Key Learnings

1. I learned that `for...of` loops can be easier to read than traditional index-based `for` loops when I only need the items in an array.

2. I learned that JavaScript's `find()` method can be used to find a matching object instead of manually looping through the entire array.

3. I learned that using `continue` can reduce unnecessary nesting and make the main flow of a function easier to understand.

---

## Activity 2: Code Quality Detective

I reviewed an earlier inventory function that used cryptic names such as `p`, `i`, `a`, `q`, `r`, and `t`.

### Code Quality Checklist

- Use descriptive function and variable names.
- Avoid unnecessary nested loops and conditionals.
- Consider JavaScript built-in array methods where appropriate.
- Make return values easy to understand.
- Avoid duplicated logic.
- Keep functions focused on a clear responsibility.
- Handle edge cases clearly.

### Key Learnings

1. I learned that poor variable names can make relatively simple code difficult to understand.

2. I learned that built-in JavaScript methods can sometimes replace complicated manual looping.

3. I learned that good code is not only code that works. It should also be readable and maintainable.

---

## Activity 3: Understanding a JavaScript Language Feature

### Feature: Object Destructuring

I learned about JavaScript object destructuring. It allows values to be extracted from an object into variables.

Example:

```javascript
const user = {
  name: "Kennedy",
  age: 34,
  city: "Johannesburg"
};

const { name, age } = user;

console.log(name);
console.log(age);