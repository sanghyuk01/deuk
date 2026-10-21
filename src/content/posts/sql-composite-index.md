---
title: '복합 인덱스의 순서: 조회 조건에서 출발하기'
description: '사용자별 최신 주문 조회를 예시로, PostgreSQL 복합 B-tree 인덱스의 컬럼 순서를 생각해 봅니다.'
publishedAt: 2026-10-20
tags: ['SQL']
sample: true
---

![사용자 조건과 날짜 정렬을 복합 인덱스에 연결하는 SQL 조회 다이어그램](/images/posts/sql-index.svg)

## 먼저 조회 패턴을 적기

인덱스를 추가하기 전에 어떤 조건과 정렬로 데이터를 읽는지 확인합니다. 다음은 PostgreSQL에서 한 사용자의 최신 주문 20건을 조회하는 예시입니다.

```sql
SELECT id, user_id, created_at
FROM orders
WHERE user_id = 42
ORDER BY created_at DESC
LIMIT 20;
```

이 조회는 `user_id`로 대상을 좁힌 뒤 `created_at` 순으로 결과를 요청합니다.

## 후보 인덱스 만들기

이 패턴에 맞는 후보로 다음 복합 B-tree 인덱스를 검토할 수 있습니다.

```sql
CREATE INDEX idx_orders_user_created
ON orders (user_id, created_at DESC);
```

복합 B-tree 인덱스는 일반적으로 선두 컬럼에 조건이 있을 때 검색 범위를 효율적으로 줄일 수 있습니다. 이 예시에서는 사용자 동등 조건을 먼저 두고, 그 안에서 날짜 순서를 활용할 수 있는지 확인합니다.

## 실행 계획으로 확인하기

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, user_id, created_at
FROM orders
WHERE user_id = 42
ORDER BY created_at DESC
LIMIT 20;
```

`ANALYZE` 옵션은 쿼리를 실제로 실행합니다. 읽기 쿼리라도 부하를 고려해 검증 환경에서 확인합니다. 위 예시에는 실제 실행 계획이나 측정 결과를 첨부하지 않았습니다.

확인할 항목은 인덱스 사용 여부, 별도 정렬 단계, 실제 반환 행 수, 버퍼 접근과 실행 시간입니다. 테이블이 작거나 조건에 맞는 행이 많으면 다른 접근 방식이 선택될 수도 있습니다.

## 인덱스의 비용도 함께 보기

인덱스는 저장 공간을 사용하고 쓰기 작업에도 유지 비용이 발생합니다. 자주 실행하는 조회 패턴과 실제 실행 계획을 바탕으로 추가 여부를 판단합니다.

### 참고 자료

- [PostgreSQL · Multicolumn Indexes](https://www.postgresql.org/docs/current/indexes-multicolumn.html)
