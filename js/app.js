// ==================== Main Application ====================
console.log("[App] 메인 애플리케이션 로딩 시작");

let allPosts = [];
let filteredPosts = [];
let allTags = new Set();

// DOM 요소
let postsListElement;
let tagsFilterElement;

// 초기화
document.addEventListener("DOMContentLoaded", async () => {
  console.log("[App] DOM 로딩 완료, 초기화 시작");

  postsListElement = document.getElementById("posts-list");
  tagsFilterElement = document.getElementById("tags-filter");

  if (!postsListElement) {
    console.error("[App] posts-list 요소를 찾을 수 없습니다");
    return;
  }

  console.log("[App] 게시글 데이터 로딩 시작");
  await loadPosts();
  console.log(`[App] 총 ${allPosts.length}개의 게시글 로딩 완료`);

  renderTags();
  renderPosts(filteredPosts);

  console.log("[App] 초기화 완료");
});

// 게시글 데이터 로딩
async function loadPosts() {
  try {
    console.log("[App] posts.json 파일 가져오기 시작");
    const response = await fetch("posts.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    allPosts = await response.json();
    filteredPosts = [...allPosts];

    console.log(`[App] posts.json 로딩 성공: ${allPosts.length}개 게시글`);

    // 모든 태그 수집
    allPosts.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag) => allTags.add(tag));
      }
    });

    console.log(`[App] 총 ${allTags.size}개의 태그 수집 완료`);
  } catch (error) {
    console.error("[App] 게시글 로딩 실패:", error);
    postsListElement.innerHTML = `
      <div class="error">
        <p>게시글을 불러오는 데 실패했습니다.</p>
        <p>오류: ${error.message}</p>
      </div>
    `;
  }
}

// 태그 필터 렌더링
function renderTags() {
  if (!tagsFilterElement || allTags.size === 0) {
    console.log("[App] 태그가 없거나 태그 필터 요소를 찾을 수 없습니다");
    return;
  }

  console.log(`[App] ${allTags.size}개의 태그 렌더링 시작`);

  tagsFilterElement.innerHTML = Array.from(allTags)
    .sort()
    .map(
      (tag) =>
        `<span class="tag" data-tag="${tag}" role="button" tabindex="0">${tag}</span>`
    )
    .join("");

  // 태그 클릭 이벤트
  tagsFilterElement.querySelectorAll(".tag").forEach((tagElement) => {
    tagElement.addEventListener("click", () => {
      const tag = tagElement.getAttribute("data-tag");
      console.log(`[App] 태그 필터 클릭: ${tag}`);
      toggleTagFilter(tagElement, tag);
    });

    // 키보드 접근성
    tagElement.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        tagElement.click();
      }
    });
  });

  console.log("[App] 태그 렌더링 완료");
}

// 태그 필터 토글
function toggleTagFilter(tagElement, tag) {
  tagElement.classList.toggle("active");

  const activeTags = Array.from(
    tagsFilterElement.querySelectorAll(".tag.active")
  ).map((el) => el.getAttribute("data-tag"));

  console.log(`[App] 활성 태그 필터: ${activeTags.join(", ") || "없음"}`);

  if (activeTags.length === 0) {
    // 모든 게시글 표시
    filteredPosts = [...allPosts];
  } else {
    // 선택된 태그가 포함된 게시글만 필터링
    filteredPosts = allPosts.filter((post) =>
      activeTags.some((tag) => post.tags && post.tags.includes(tag))
    );
  }

  console.log(`[App] 필터링된 게시글 수: ${filteredPosts.length}`);
  renderPosts(filteredPosts);
}

// 게시글 목록 렌더링
function renderPosts(posts) {
  console.log(`[App] ${posts.length}개의 게시글 렌더링 시작`);

  if (posts.length === 0) {
    postsListElement.innerHTML = '<p class="no-posts">게시글이 없습니다.</p>';
    return;
  }

  postsListElement.innerHTML = posts
    .map(
      (post) => `
      <article class="post-card">
        <h2>
          <a href="post.html?file=${encodeURIComponent(
            post.file
          )}">${escapeHtml(post.title)}</a>
        </h2>
        <div class="post-meta">
          <span>📅 ${post.date}</span>
          ${post.category ? `<span>📂 ${escapeHtml(post.category)}</span>` : ""}
        </div>
        ${
          post.description
            ? `<p class="post-description">${escapeHtml(post.description)}</p>`
            : ""
        }
        ${
          post.excerpt
            ? `<p class="post-excerpt">${escapeHtml(post.excerpt)}</p>`
            : ""
        }
        ${
          post.tags && post.tags.length > 0
            ? `
          <div class="post-tags">
            ${post.tags
              .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
              .join("")}
          </div>
        `
            : ""
        }
      </article>
    `
    )
    .join("");

  console.log("[App] 게시글 렌더링 완료");
}

// HTML 이스케이프
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// 전역 함수로 export (search.js에서 사용)
window.appFunctions = {
  renderPosts,
  getAllPosts: () => allPosts,
  setFilteredPosts: (posts) => {
    filteredPosts = posts;
  },
};

console.log("[App] 메인 애플리케이션 로딩 완료");
