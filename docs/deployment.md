# GitHub와 Cloudflare 배포

## 구성

- 저장소 소유자: `sanghyuk01`
- 저장소 이름: `deuk` (public)
- 기본 브랜치: `main`
- CI: 현재 미연결
- CD: 현재 미연결 (Cloudflare 설정은 추후 진행)

Git 커밋 작성자와 저장소에 인증하는 GitHub 계정은 별개입니다. 현재 작성자 설정은 유지합니다.

## GitHub Actions

현재 업로드에는 워크플로를 포함하지 않습니다. 추후 CI를 구성할 때 Node.js 24와 package.json에 지정한 pnpm으로 `pnpm install --frozen-lockfile` 후 `pnpm build`를 실행하면 타입 검사, 정적 페이지 빌드, 검색 색인을 검증할 수 있습니다.

## Cloudflare Pages

Cloudflare 대시보드에서 GitHub의 `sanghyuk01/deuk` 저장소를 연결합니다.

| 항목 | 값 |
| --- | --- |
| 프로덕션 브랜치 | `main` |
| 루트 디렉토리 | 저장소 루트 |
| 빌드 명령 | `pnpm build` |
| 빌드 출력 디렉토리 | `dist` |
| NODE_VERSION | `24` |
| PNPM_VERSION | `11.25.0` |

추후 GitHub Actions CI와 Cloudflare의 자체 빌드를 함께 구성하면 각각 실행됩니다. Pages Git 연동은 GitHub Actions의 성공을 기다리는 구조가 아닙니다. PR에서 CI 결과를 확인한 뒤 main에 병합하면 운영 배포를 관리하기 쉽습니다.

Pages 프로젝트 연결 전에는 자동 배포가 활성화되지 않습니다. GitHub/Cloudflare 로그인과 GitHub 앱의 저장소 접근 허용이 필요합니다. 인증 토큰은 소스에 저장하지 않습니다.

## 운영 주소

`astro.config.mjs`의 `site`는 현재 도메인 후보인 `https://deuk.kr`입니다. 첫 배포 후 실제 Pages 주소나 확정한 도메인으로 수정해야 canonical, RSS, 사이트맵 URL이 일치합니다.

원본 이력서 `public/resume.pdf`와 프로필 사진도 공개 저장소 및 배포 결과물에 포함됩니다.
