// ==================== Theme Toggle ====================
console.log("[Theme] 테마 모듈 로딩 시작");

// 저장된 테마 또는 시스템 설정 불러오기
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

console.log(`[Theme] 초기 테마 설정: ${initialTheme}`);
document.documentElement.setAttribute("data-theme", initialTheme);

// 테마 토글 버튼 이벤트
document.addEventListener("DOMContentLoaded", () => {
  console.log("[Theme] DOM 로딩 완료, 테마 토글 버튼 초기화");

  const themeToggle = document.getElementById("theme-toggle");

  if (!themeToggle) {
    console.error("[Theme] 테마 토글 버튼을 찾을 수 없습니다");
    return;
  }

  // 초기 아이콘 설정
  updateThemeIcon(initialTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    console.log(`[Theme] 테마 변경: ${currentTheme} -> ${newTheme}`);

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);

    // Giscus 테마 업데이트 (게시글 페이지용)
    updateGiscusTheme(newTheme);
  });

  console.log("[Theme] 테마 토글 버튼 이벤트 리스너 등록 완료");
});

// 테마 아이콘 업데이트
function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

// Giscus 테마 업데이트
function updateGiscusTheme(theme) {
  const giscusFrame = document.querySelector("iframe.giscus-frame");
  if (giscusFrame) {
    console.log(`[Theme] Giscus 테마 업데이트: ${theme}`);
    giscusFrame.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: theme === "dark" ? "dark" : "light",
          },
        },
      },
      "https://giscus.app"
    );
  }
}

console.log("[Theme] 테마 모듈 로딩 완료");
