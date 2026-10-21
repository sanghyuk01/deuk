# GitHub와 Cloudflare 배포

## 구성

- 저장소 소유자: `sanghyuk01`
- 저장소 이름: `deuk` (public)
- 기본 브랜치: `main`
- CI: Cloudflare Pages 빌드에서 타입 검사·정적 빌드·검색 색인 생성
- CD: Cloudflare Pages Git 연동 (`main` push 시 자동 배포)
- 운영 주소: https://deuk-54k.pages.dev
- Pages 프로젝트: `deuk`

Git 커밋 작성자와 저장소에 인증하는 GitHub 계정은 별개입니다. 현재 작성자 설정은 유지합니다.

## GitHub Actions

현재 업로드에는 워크플로를 포함하지 않습니다. 추후 CI를 구성할 때 Node.js 24와 package.json에 지정한 pnpm으로 `pnpm install --frozen-lockfile` 후 `pnpm build`를 실행하면 타입 검사, 정적 페이지 빌드, 검색 색인을 검증할 수 있습니다.

## Cloudflare Pages

Cloudflare GitHub 앱은 `sanghyuk01/deuk` 저장소에만 접근하도록 설치했습니다. 해당 저장소와 Pages 프로젝트 `deuk`의 연결 및 첫 배포를 완료했습니다.

| 항목 | 값 |
| --- | --- |
| 프로덕션 브랜치 | `main` |
| 루트 디렉토리 | 저장소 루트 |
| 프레임워크 프리셋 | None (빌드 명령 직접 지정) |
| 빌드 명령 | `pnpm build` |
| 빌드 출력 디렉토리 | `dist` |
| NODE_VERSION | `24` |
| PNPM_VERSION | `11.25.0` |
| SITE_URL | `https://deuk-54k.pages.dev` |

추후 GitHub Actions CI와 Cloudflare의 자체 빌드를 함께 구성하면 각각 실행됩니다. Pages Git 연동은 GitHub Actions의 성공을 기다리는 구조가 아닙니다. PR에서 CI 결과를 확인한 뒤 main에 병합하면 운영 배포를 관리하기 쉽습니다.

자동 배포는 활성화되어 있습니다. 글이나 코드를 커밋하고 `main`에 push하면 Cloudflare가 새 배포를 생성합니다. 빌드 실패 시 Cloudflare의 배포 상세 로그를 확인하세요. 인증 토큰은 소스에 저장하지 않습니다.

## 운영 주소

`astro.config.mjs`는 `SITE_URL` → `CF_PAGES_URL` → `https://deuk.kr` 순서로 운영 주소를 선택합니다. Pages에서는 `SITE_URL`에 실제 운영 주소를 지정해 canonical, RSS, 사이트맵 URL을 일치시킵니다. 나중에 커스텀 도메인을 연결하면 이 환경변수만 수정한 뒤 재배포합니다.

`deuk.kr`은 희망 도메인이며 현재 등록·연결하지 않았습니다.

원본 이력서 `public/resume.pdf`와 프로필 사진도 공개 저장소 및 배포 결과물에 포함됩니다.
