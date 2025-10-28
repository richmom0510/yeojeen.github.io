# 🚀 블로그 설정 가이드

GitHub Pages 정적 블로그를 배포하기 위한 단계별 가이드입니다.

## 📋 체크리스트

- [ ] GitHub 저장소 설정
- [ ] GitHub Pages 활성화
- [ ] Giscus 댓글 시스템 설정 (선택사항)
- [ ] 블로그 커스터마이징
- [ ] 첫 게시글 작성
- [ ] Git 푸시 및 배포 확인

---

## 1️⃣ GitHub 저장소 설정

### Option A: 새 저장소 생성

1. GitHub에서 **New repository** 클릭
2. 저장소 이름: `{your_username}.github.io` (예: `john-doe.github.io`)
3. Public으로 설정
4. **Create repository** 클릭

### Option B: 기존 저장소 사용

1. 이 프로젝트를 원하는 이름의 저장소로 푸시
2. 나중에 Custom Domain을 설정할 수 있습니다

---

## 2️⃣ GitHub Pages 활성화

1. 저장소 페이지에서 **Settings** 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source**를 `GitHub Actions`로 설정
4. 저장

![GitHub Pages Settings](https://docs.github.com/assets/cb-25543/mw-1440/images/help/pages/publishing-source-drop-down.webp)

---

## 3️⃣ 코드 푸시 및 배포

### 처음 푸시하는 경우

```bash
# Git 초기화 (아직 안 했다면)
git init
git add .
git commit -m "feat: 블로그 초기 설정"

# 원격 저장소 연결
git remote add origin https://github.com/{your_username}/{your_repo_name}.git

# 푸시
git branch -M main
git push -u origin main
```

### 이미 Git이 설정된 경우

```bash
git add .
git commit -m "feat: 블로그 초기 설정"
git push origin main
```

---

## 4️⃣ 배포 확인

1. 저장소의 **Actions** 탭 클릭
2. "Build and Deploy to GitHub Pages" 워크플로우 확인
3. 초록색 체크 표시가 나타날 때까지 대기 (1-2분 소요)
4. 배포 완료 후 `https://{your_username}.github.io` 접속

### 배포 실패 시

1. Actions 탭에서 실패한 워크플로우 클릭
2. 로그 확인
3. 일반적인 문제:
   - Node.js 버전 문제 (deploy.yml에서 v18 사용 확인)
   - pages/ 폴더가 비어있음 (예제 마크다운 파일 확인)
   - Front Matter 형식 오류

---

## 5️⃣ 블로그 커스터마이징

### 블로그 타이틀 변경

**index.html**:

```html
<title>블로그</title> → <title>내 블로그 이름</title>
<h1><a href="/">내 블로그</a></h1>
→
<h1><a href="/">원하는 제목</a></h1>
```

**post.html**:

```html
<h1><a href="/">내 블로그</a></h1>
→
<h1><a href="/">원하는 제목</a></h1>
```

### Footer 수정

**index.html** 및 **post.html**:

```html
<p>&copy; 2025 내 블로그. All rights reserved.</p>
→
<p>&copy; 2025 내 이름. All rights reserved.</p>
```

### 색상 테마 변경

**css/style.css**의 CSS 변수 수정:

```css
:root {
  /* Light Mode Colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --accent: #0066cc; /* 원하는 색상으로 변경 */
  /* ... */
}
```

---

## 6️⃣ Giscus 댓글 시스템 설정 (선택사항)

### Step 1: GitHub Discussions 활성화

1. 저장소 **Settings** > **General** > **Features**
2. **Discussions** 체크박스 활성화

### Step 2: Giscus 앱 설치

1. https://github.com/apps/giscus 접속
2. **Install** 버튼 클릭
3. **Only select repositories** 선택
4. 블로그 저장소 선택
5. **Install** 클릭

### Step 3: Giscus 설정 정보 가져오기

1. https://giscus.app/ko 접속
2. **저장소** 입력: `{your_username}/{your_repo_name}`
3. 설정:

   - **페이지 ↔️ Discussions 매핑**: `pathname` (권장)
   - **Discussion 카테고리**: `General` 또는 `Announcements`
   - **기능**: 메인 포스트에 반응 남기기 활성화
   - **테마**: `preferred_color_scheme` (자동 다크/라이트 전환)

4. 생성된 스크립트에서 값 복사:
   - `data-repo`: 저장소 이름
   - `data-repo-id`: 저장소 ID
   - `data-category`: 카테고리 이름
   - `data-category-id`: 카테고리 ID

### Step 4: 블로그에 설정 적용

**js/post-loader.js** 파일의 `loadGiscus()` 함수 수정:

```javascript
script.setAttribute("data-repo", "{your_username}/{your_repo_name}"); // 실제 저장소 입력
script.setAttribute("data-repo-id", "R_xxxxxxxxxxxxx"); // Giscus에서 복사한 값
script.setAttribute("data-category", "General"); // 선택한 카테고리
script.setAttribute("data-category-id", "DIC_xxxxxxxxxxxxx"); // Giscus에서 복사한 값
```

### Step 5: 변경사항 커밋 & 푸시

```bash
git add js/post-loader.js
git commit -m "feat: Giscus 댓글 시스템 설정"
git push origin main
```

---

## 7️⃣ 첫 게시글 작성

### 마크다운 파일 생성

`pages/` 폴더에 새 `.md` 파일 생성 (예: `my-first-post.md`):

```markdown
---
title: "첫 번째 게시글"
date: 2025-10-28
tags: ["일상", "시작"]
category: "블로그"
description: "블로그를 시작하며"
---

# 첫 번째 게시글

안녕하세요! 블로그를 시작합니다.

## 시작하는 이유

블로그를 시작하게 된 이유는...

## 앞으로의 계획

앞으로 이런 내용을 다룰 예정입니다:

- 개발 경험 공유
- 학습 내용 정리
- 프로젝트 소개
```

### 커밋 & 푸시

```bash
git add pages/my-first-post.md
git commit -m "feat: 첫 번째 게시글 추가"
git push origin main
```

---

## 8️⃣ 로컬 테스트 (선택사항)

배포 전에 로컬에서 테스트하려면:

```bash
# Python 3 사용
python -m http.server 8000

# 또는 Node.js 사용 (npx 필요)
npx http-server -p 8000
```

브라우저에서 `http://localhost:8000` 접속

---

## ✅ 확인 사항

### 배포 전 체크리스트

- [ ] `.nojekyll` 파일 존재 확인
- [ ] `posts.json` 파일 Git에 커밋됨
- [ ] `pages/` 폴더에 최소 1개 이상의 `.md` 파일
- [ ] Front Matter 형식이 올바른지 확인
- [ ] 블로그 타이틀 및 Footer 수정

### 배포 후 체크리스트

- [ ] 메인 페이지에서 게시글 목록 표시 확인
- [ ] 게시글 상세 페이지 열림 확인
- [ ] 다크/라이트 모드 토글 작동 확인
- [ ] 검색 기능 작동 확인
- [ ] 태그 필터 작동 확인
- [ ] 반응형 디자인 확인 (모바일)
- [ ] (Giscus 설정 시) 댓글 시스템 작동 확인

---

## 🔍 문제 해결

### 게시글이 표시되지 않을 때

1. **브라우저 개발자 도구(F12) 확인**

   - Console 탭: 에러 메시지 확인
   - Network 탭: `posts.json` 로딩 확인 (200 상태 코드)

2. **`.nojekyll` 파일 확인**

   ```bash
   ls -la | grep .nojekyll  # Linux/Mac
   Get-ChildItem -Force | Where-Object {$_.Name -eq ".nojekyll"}  # Windows
   ```

3. **`posts.json` 내용 확인**
   - 파일이 비어있지 않은지
   - JSON 형식이 올바른지
   - 게시글 메타데이터가 제대로 파싱되었는지

### GitHub Actions 빌드 실패

1. **Actions 탭에서 로그 확인**

   - "Generate posts.json" 스텝 확인
   - Node.js 버전 확인 (v18)

2. **Front Matter 형식 확인**
   ```markdown
   ---
   title: "제목" # 따옴표 사용
   date: 2025-10-28 # YYYY-MM-DD 형식
   tags: ["태그1", "태그2"] # 배열 형식
   ---
   ```

### 댓글이 표시되지 않을 때

1. **Giscus 설정 확인**

   - 저장소 Discussions 활성화 여부
   - Giscus 앱 설치 여부
   - `js/post-loader.js`의 설정 값 확인

2. **브라우저 콘솔 확인**
   - Giscus 스크립트 로딩 여부
   - 에러 메시지 확인

---

## 📚 추가 리소스

- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [marked.js 문서](https://marked.js.org/)
- [Prism.js 문서](https://prismjs.com/)
- [Giscus 문서](https://giscus.app/)

---

## 🎉 완료!

축하합니다! 이제 블로그가 정상적으로 작동할 것입니다.

**블로그 URL**: `https://{your_username}.github.io`

문제가 있다면 브라우저 개발자 도구를 열어 콘솔 로그를 확인하세요. 모든 주요 기능은 로그를 남기도록 구현되어 있습니다.

**Happy Blogging!** 📝✨
