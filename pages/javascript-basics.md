---
title: "JavaScript 기초 - 변수와 데이터 타입"
date: 2025-10-27
tags: ["JavaScript", "Programming", "기초"]
category: "Development"
description: "JavaScript의 변수 선언과 기본 데이터 타입을 알아봅니다"
---

# JavaScript 기초 - 변수와 데이터 타입

JavaScript는 웹 개발의 핵심 언어입니다. 이번 포스트에서는 JavaScript의 기초인 변수와 데이터 타입을 알아보겠습니다.

## 변수 선언

JavaScript에서는 세 가지 방법으로 변수를 선언할 수 있습니다:

### 1. `let` (재할당 가능)

```javascript
let name = "홍길동";
console.log(name); // 홍길동

name = "김철수"; // 재할당 가능
console.log(name); // 김철수
```

### 2. `const` (재할당 불가)

```javascript
const PI = 3.14159;
console.log(PI); // 3.14159

// PI = 3.14; // 오류 발생!
```

### 3. `var` (사용 지양)

```javascript
var age = 25;
console.log(age); // 25

// var는 함수 스코프를 가지므로 사용을 지양합니다
```

## 데이터 타입

JavaScript는 동적 타입 언어로, 다음과 같은 기본 데이터 타입을 제공합니다:

### Primitive Types (원시 타입)

#### 1. Number (숫자)

```javascript
const integer = 42;
const float = 3.14;
const negative = -10;

console.log(typeof integer); // "number"
```

#### 2. String (문자열)

```javascript
const greeting = "안녕하세요";
const name = "홍길동";
const message = `${greeting}, ${name}님!`; // 템플릿 리터럴

console.log(message); // 안녕하세요, 홍길동님!
```

#### 3. Boolean (불리언)

```javascript
const isActive = true;
const isCompleted = false;

if (isActive) {
  console.log("활성화 상태입니다");
}
```

#### 4. Null & Undefined

```javascript
let value1 = null; // 명시적으로 "값이 없음"
let value2; // 선언만 하고 할당하지 않음 (undefined)

console.log(value1); // null
console.log(value2); // undefined
```

### Object Types (객체 타입)

#### 1. Object (객체)

```javascript
const person = {
  name: "홍길동",
  age: 30,
  job: "개발자",
};

console.log(person.name); // 홍길동
console.log(person["age"]); // 30
```

#### 2. Array (배열)

```javascript
const colors = ["빨강", "파랑", "초록"];

console.log(colors[0]); // 빨강
console.log(colors.length); // 3

colors.push("노랑"); // 배열에 추가
console.log(colors); // ['빨강', '파랑', '초록', '노랑']
```

## 타입 확인

`typeof` 연산자를 사용하여 데이터 타입을 확인할 수 있습니다:

```javascript
console.log(typeof 42); // "number"
console.log(typeof "Hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (JavaScript의 버그)
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
```

## 타입 변환

JavaScript는 필요에 따라 자동으로 타입을 변환합니다:

```javascript
// 명시적 변환
const num = Number("123"); // 123
const str = String(123); // "123"
const bool = Boolean(1); // true

// 암묵적 변환
console.log("5" + 3); // "53" (문자열 결합)
console.log("5" - 3); // 2 (숫자 연산)
console.log("5" * "2"); // 10 (숫자 연산)
```

## 정리

- `let`과 `const`를 사용하여 변수를 선언하세요 (`var`는 지양)
- JavaScript는 다양한 데이터 타입을 제공합니다
- `typeof` 연산자로 타입을 확인할 수 있습니다
- 타입 변환에 주의하세요

다음 포스트에서는 JavaScript의 연산자와 제어문에 대해 알아보겠습니다! 🚀
