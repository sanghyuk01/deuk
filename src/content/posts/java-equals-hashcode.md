---
title: 'equals와 hashCode: 같은 객체를 판단하는 두 가지 약속'
description: '참조 비교와 값 비교를 구분하고, HashSet에서 동등한 객체를 다루는 규칙을 예제로 정리합니다.'
publishedAt: 2026-10-19
tags: ['JAVA']
sample: true
---

![참조 비교와 값 비교, 해시 기반 컬렉션의 동등성 판단을 보여주는 다이어그램](/images/posts/java-equality.svg)

## 참조와 값의 차이

Java에서 객체 참조에 사용하는 `==`는 두 참조가 같은 객체를 가리키는지 비교합니다. `equals()`는 클래스가 정의한 동등성 기준을 사용하며, `Object`의 기본 구현은 참조의 동일성을 기준으로 합니다.

```java
String first = new String("deuk");
String second = new String("deuk");

System.out.println(first == second);      // false
System.out.println(first.equals(second)); // true
```

두 문자열은 별도로 생성했지만 내용은 같습니다. `String`은 문자열 내용을 비교하도록 `equals()`를 재정의합니다.

## hashCode가 함께 필요한 이유

`equals()`로 같다고 판단하는 두 객체는 같은 해시 코드를 반환해야 합니다. 반대로 해시 코드가 같다는 이유만으로 객체가 동등한 것은 아닙니다. 서로 다른 객체가 같은 해시 코드를 갖는 충돌이 가능하기 때문입니다.

| 비교 결과 | 의미 |
| --- | --- |
| `a.equals(b)`가 `true` | 두 객체의 해시 코드도 같아야 함 |
| 해시 코드가 같음 | `equals()`가 `true`라는 보장은 없음 |

## record로 값 객체 표현하기

레코드를 지원하는 Java 환경에서는 다음처럼 간단한 값 객체를 정의할 수 있습니다.

```java
import java.util.HashSet;
import java.util.Set;

record MemberId(long value) {}

class Example {
    public static void main(String[] args) {
        Set<MemberId> ids = new HashSet<>();
        ids.add(new MemberId(1));
        ids.add(new MemberId(1));
        System.out.println(ids.size()); // 1
    }
}
```

이 예제의 `MemberId`는 컴포넌트 값에 따른 `equals()`와 `hashCode()`를 제공하므로 같은 값이 중복으로 추가되지 않습니다.

## 변경 가능한 키 주의하기

일반 클래스의 필드로 동등성을 구현한다면, 컬렉션에 넣은 뒤 해당 필드를 변경하지 않도록 설계합니다. 저장할 때와 조회할 때 해시 코드가 달라지면 기대한 객체를 찾지 못할 수 있습니다.

### 참고 자료

- [Java Object · equals와 hashCode 계약](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Object.html)
