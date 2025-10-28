// ==================== Search Functionality ====================
console.log("[Search] 검색 모듈 로딩 시작");

document.addEventListener("DOMContentLoaded", () => {
  console.log("[Search] DOM 로딩 완료, 검색 기능 초기화");

  const searchInput = document.getElementById("search-input");

  if (!searchInput) {
    console.warn("[Search] 검색 입력창을 찾을 수 없습니다");
    return;
  }

  // 디바운스를 위한 타이머
  let searchTimeout;

  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      const query = e.target.value.trim().toLowerCase();
      console.log(`[Search] 검색 쿼리: "${query}"`);

      if (!window.appFunctions) {
        console.error("[Search] appFunctions를 찾을 수 없습니다");
        return;
      }

      const allPosts = window.appFunctions.getAllPosts();

      if (query === "") {
        console.log("[Search] 검색어가 비어있음, 모든 게시글 표시");
        window.appFunctions.setFilteredPosts(allPosts);
        window.appFunctions.renderPosts(allPosts);
        return;
      }

      // 검색 수행
      const results = allPosts.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const descriptionMatch =
          post.description && post.description.toLowerCase().includes(query);
        const excerptMatch =
          post.excerpt && post.excerpt.toLowerCase().includes(query);
        const tagsMatch =
          post.tags &&
          post.tags.some((tag) => tag.toLowerCase().includes(query));
        const categoryMatch =
          post.category && post.category.toLowerCase().includes(query);

        return (
          titleMatch ||
          descriptionMatch ||
          excerptMatch ||
          tagsMatch ||
          categoryMatch
        );
      });

      console.log(`[Search] 검색 결과: ${results.length}개 게시글`);

      window.appFunctions.setFilteredPosts(results);
      window.appFunctions.renderPosts(results);
    }, 300); // 300ms 디바운스
  });

  console.log("[Search] 검색 기능 초기화 완료");
});

console.log("[Search] 검색 모듈 로딩 완료");
