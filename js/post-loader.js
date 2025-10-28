// ==================== Post Loader ====================
console.log("[PostLoader] 게시글 로더 모듈 로딩 시작");

document.addEventListener("DOMContentLoaded", async () => {
  console.log("[PostLoader] DOM 로딩 완료, 게시글 로딩 시작");

  const postContentElement = document.getElementById("post-content");

  if (!postContentElement) {
    console.error("[PostLoader] post-content 요소를 찾을 수 없습니다");
    return;
  }

  // URL 파라미터에서 파일명 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const filename = urlParams.get("file");

  console.log(`[PostLoader] URL 파라미터 파일명: ${filename}`);

  if (!filename) {
    console.error("[PostLoader] 파일명이 없습니다");
    postContentElement.innerHTML = `
      <div class="error">
        <p>게시글을 찾을 수 없습니다.</p>
        <p><a href="/">목록으로 돌아가기</a></p>
      </div>
    `;
    return;
  }

  try {
    console.log(`[PostLoader] 마크다운 파일 로딩: pages/${filename}`);
    const response = await fetch(`pages/${filename}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const markdown = await response.text();
    console.log(`[PostLoader] 마크다운 파일 로딩 성공 (${markdown.length}자)`);

    // Front Matter 파싱
    const { metadata, content } = parseFrontMatter(markdown);
    console.log("[PostLoader] Front Matter 파싱 완료:", metadata);

    // marked.js로 HTML 변환
    console.log("[PostLoader] 마크다운 -> HTML 변환 시작");
    const htmlContent = marked.parse(content);
    console.log("[PostLoader] HTML 변환 완료");

    // 페이지 타이틀 설정
    if (metadata.title) {
      document.title = `${metadata.title} - 블로그`;
    }

    // 게시글 렌더링
    postContentElement.innerHTML = `
      <header class="post-header">
        <h1>${escapeHtml(metadata.title || filename)}</h1>
        <div class="post-meta">
          <span>📅 ${metadata.date || "날짜 없음"}</span>
          ${
            metadata.category
              ? `<span>📂 ${escapeHtml(metadata.category)}</span>`
              : ""
          }
        </div>
        ${
          metadata.description
            ? `<p class="post-description">${escapeHtml(
                metadata.description
              )}</p>`
            : ""
        }
        ${
          metadata.tags && metadata.tags.length > 0
            ? `
          <div class="post-tags">
            ${metadata.tags
              .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
              .join("")}
          </div>
        `
            : ""
        }
      </header>
      <div class="post-body">
        ${htmlContent}
      </div>
    `;

    console.log("[PostLoader] 게시글 렌더링 완료");

    // Prism.js 코드 하이라이팅 적용
    if (window.Prism) {
      console.log("[PostLoader] Prism.js 코드 하이라이팅 적용");
      Prism.highlightAll();
    }

    // Giscus 댓글 로드
    console.log("[PostLoader] Giscus 댓글 시스템 로딩 시작");
    loadGiscus();
  } catch (error) {
    console.error("[PostLoader] 게시글 로딩 실패:", error);
    postContentElement.innerHTML = `
      <div class="error">
        <p>게시글을 불러오는 데 실패했습니다.</p>
        <p>오류: ${error.message}</p>
        <p><a href="/">목록으로 돌아가기</a></p>
      </div>
    `;
  }
});

// Front Matter 파싱
function parseFrontMatter(markdown) {
  console.log("[PostLoader] Front Matter 파싱 시작");

  const frontMatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!frontMatterMatch) {
    console.log("[PostLoader] Front Matter가 없습니다");
    return {
      metadata: {},
      content: markdown,
    };
  }

  const frontMatter = frontMatterMatch[1];
  const content = frontMatterMatch[2];

  const metadata = {};
  const lines = frontMatter.split("\n");

  lines.forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // 따옴표 제거
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // 배열 파싱 (tags)
      if (key === "tags" && value.startsWith("[") && value.endsWith("]")) {
        try {
          value = JSON.parse(value);
        } catch {
          value = value
            .slice(1, -1)
            .split(",")
            .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ""));
        }
      }

      metadata[key] = value;
    }
  });

  console.log("[PostLoader] Front Matter 파싱 완료");

  return { metadata, content };
}

// Giscus 댓글 시스템 로드
function loadGiscus() {
  const giscusContainer = document.getElementById("giscus-container");

  if (!giscusContainer) {
    console.warn("[PostLoader] giscus-container를 찾을 수 없습니다");
    return;
  }

  console.log("[PostLoader] Giscus 스크립트 생성 및 삽입");

  const currentTheme = document.documentElement.getAttribute("data-theme");
  const giscusTheme = currentTheme === "dark" ? "dark" : "light";

  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.setAttribute("data-repo", "richmom0510/yeojeen.github.io"); // 여기에 실제 저장소 입력
  script.setAttribute("data-repo-id", "R_kgDOQKk2kg"); // Giscus 설정에서 가져온 값
  script.setAttribute("data-category", "General");
  script.setAttribute("data-category-id", "DIC_kwDOQKk2ks4CxKUV"); // Giscus 설정에서 가져온 값
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "1");
  script.setAttribute("data-input-position", "top");
  script.setAttribute("data-theme", giscusTheme);
  script.setAttribute("data-lang", "ko");
  script.setAttribute("data-loading", "lazy");
  script.crossOrigin = "anonymous";
  script.async = true;

  giscusContainer.appendChild(script);
  console.log("[PostLoader] Giscus 스크립트 삽입 완료");
}

// HTML 이스케이프
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

console.log("[PostLoader] 게시글 로더 모듈 로딩 완료");
