# deuk.

표상혁 · 풀스택 개발자의 기술 블로그와 개인 프로젝트 포트폴리오.

## 로컬 실행

현재 PC에서는 Codex에 포함된 Node.js와 pnpm을 사용하는 실행 파일도 제공합니다. 일반 PowerShell에서 `pnpm`이 인식되지 않으면 다음 명령을 사용하세요.

```powershell
cd C:\deuk
.\pnpm.cmd dev
```

종료는 실행 중인 터미널에서 `Ctrl + C`를 누릅니다. 종료 확인이 나오면 `Y`를 입력합니다.

검색까지 확인하려면 `.\pnpm.cmd build` 실행 후 `.\pnpm.cmd preview`를 실행합니다. 이 실행 파일은 현재 사용자 폴더의 Codex 런타임에 의존합니다. 다른 PC에서는 Node.js와 pnpm을 별도로 설치한 뒤 아래 일반 명령을 사용하세요.

Node.js 22.22 이상과 pnpm 11을 사용합니다. 실제로 설치한 버전은 `pnpm-lock.yaml`에 고정됩니다.

```sh
pnpm install
pnpm dev
```

터미널에 표시되는 로컬 주소를 엽니다. 프로덕션 검색까지 확인하려면:

```sh
pnpm build
pnpm preview
```

POSTS 검색창은 카테고리 위에 표시되고 검색 결과는 글 목록에 반영됩니다. 개발 서버에서는 로컬 콘텐츠의 텍스트를 검색하며, 프로덕션 빌드에서는 Pagefind 본문 검색 색인을 사용합니다. `build`는 타입 검사 → Astro 빌드 → 검색 색인 생성 순서로 실행합니다.

## 글 작성

`src/content/posts/원하는-주소.md` 또는 `.mdx`를 추가합니다.

```yaml
---
title: '글 제목'
description: '목록과 검색 결과에 표시할 요약'
publishedAt: 2026-10-21
tags: ['AI/LLM']
draft: false
---
```

본문은 Markdown으로 작성합니다. `updatedAt`을 추가하면 수정일을 표시합니다. `draft: true`인 글은 상세 페이지·목록·RSS·사이트맵·검색에 포함되지 않습니다. 공개 저장소에서는 초안 파일도 보이므로 비공개 메모를 넣지 마세요. 파일명이 공개 주소가 되므로 발행 후에는 유지하는 것을 권장합니다.

현재 포함된 네 글은 `sample: true`인 예시 글입니다. 발행 전 자신의 글로 교체하거나 초안으로 전환하세요. 프로젝트 소개는 실제 진행 중인 deuk 사이트를 설명합니다.

## 프로젝트 작성

`src/content/projects/프로젝트-주소.md`를 추가합니다. 필수 항목은 `title`, `description`, `year`(문자열), `status`(진행 중/완료/유지보수), `stack`(배열)입니다. `featured: true`이면 홈에 표시합니다. `github`, `website`는 실제 URL이 있을 때만 추가합니다. `draft: true`이면 공개하지 않습니다.

## 사이트 수정

- 공통 헤더·푸터와 메타데이터: `src/layouts/Base.astro`
- 디자인 토큰과 반응형 스타일: `src/styles/global.css`
- 소개·이력서·연락처: `src/pages/about.astro`
- 이력서 데이터(학력·교육·자격증·수상·연락 이메일): `src/data/resume.ts`
- 콘텐츠 스키마: `src/content.config.ts`
- 운영 도메인 후보: `astro.config.mjs`의 `site`

프로필 원본은 `src/assets/profile.png`에 있습니다. HOME과 ABOUT에서 Astro Image로 최적화한 WebP 이미지를 표시합니다. ABOUT의 이력과 이메일은 제공된 이력서를 기준으로 반영했습니다. ABOUT 본문에는 상세 주소·생년월일·전화번호를 표시하지 않습니다. 사용자가 제공한 원본 이력서는 `public/resume.pdf`에 있으며, ABOUT의 PDF 보기 링크로 새 탭에서 열립니다. 원본 PDF에는 해당 개인정보가 포함되어 있으며 사이트 배포 시 함께 공개됩니다. GitHub 주소는 아직 제공되지 않았습니다. 웹폰트는 jsDelivr의 Pretendard Variable 1.3.9를 사용하며, 연결할 수 없을 때 시스템 폰트로 표시합니다.

## 배포

운영 사이트는 [deuk-54k.pages.dev](https://deuk-54k.pages.dev)입니다. GitHub의 `sanghyuk01/deuk` 저장소와 Cloudflare Pages를 연결했으며, `main`에 push하면 타입 검사 → 정적 페이지 빌드 → 검색 색인 생성 → 배포가 자동 실행됩니다. 빌드 명령은 `pnpm build`, 출력 폴더는 `dist`입니다. 별도의 GitHub Actions는 사용하지 않습니다. 상세 설정은 [docs/deployment.md](docs/deployment.md)를 참고하세요.

희망 도메인 `deuk.kr`은 아직 연결하지 않았습니다. 도메인을 연결하면 Cloudflare의 `SITE_URL` 환경변수를 실제 주소로 변경하고 재배포하세요.

현재 공유 이미지는 SVG 초안입니다. 운영 배포 전에 소셜 서비스 호환성을 위해 1200×630 PNG/JPEG로 교체하세요. 게시일은 즉시 노출 기준이며 미래 날짜를 적는 것만으로 예약 발행되지 않습니다.

## 글 카테고리

카테고리는 AI/LLM, SQL, JAVA, RAG 순서로 고정하며 src/data/categories.ts에서 관리합니다. 글 frontmatter의 tags 배열에 해당 값을 적습니다. 예시 글은 각 카테고리에 하나씩 등록되어 있습니다. 본문 다이어그램은 public/images/posts/에서 관리합니다. 글이 없는 카테고리도 필터에 표시됩니다.
