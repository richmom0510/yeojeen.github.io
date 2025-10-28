---
title: "블로그에 오신 것을 환영합니다"
date: 2025-10-28
tags: ["환영", "시작하기"]
category: "공지"
description: "정적 블로그 시작을 축하합니다!"
---

# 블로그에 오신 것을 환영합니다! 🎉

GitHub Pages를 사용한 정적 블로그 구축을 축하드립니다!

## 주요 기능

이 블로그는 다음과 같은 기능을 제공합니다:

- ✨ **마크다운 지원**: 간편하게 게시글 작성
- 🎨 **다크/라이트 모드**: 테마 전환 가능
- 🔍 **검색 기능**: 게시글 빠른 검색
- 🏷️ **태그 필터링**: 태그별 게시글 분류
- 💬 **Giscus 댓글**: GitHub Discussions 기반 댓글 시스템
- 📱 **반응형 디자인**: 모바일 친화적

## 게시글 작성 방법

`pages/` 폴더에 마크다운(`.md`) 파일을 생성하세요:

```markdown
---
title: "게시글 제목"
date: 2025-10-28
tags: ["JavaScript", "Web"]
category: "Development"
description: "게시글 설명"
---

# 제목

내용을 작성하세요...
```

## 코드 하이라이팅

Prism.js를 사용하여 코드 하이라이팅을 지원합니다:

```javascript
// JavaScript 예제
function greet(name) {
  console.log(`안녕하세요, ${name}님!`);
}

greet("개발자");
```

```python
# Python 예제
def greet(name):
    print(f"안녕하세요, {name}님!")

greet("개발자")
```

## 배포 방법

1. `pages/` 폴더에 `.md` 파일 작성
2. Git에 커밋 후 푸시
3. GitHub Actions가 자동으로 배포
4. 배포 완료!

```bash
git add .
git commit -m "feat: 새 게시글 추가"
git push origin main
```

## 다음 단계

- Giscus 댓글 시스템 설정 (PLAN.md 참고)
- 블로그 타이틀 및 스타일 커스터마이징
- 더 많은 게시글 작성

즐거운 블로깅 되세요! 📝
