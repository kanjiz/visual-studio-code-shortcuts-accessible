// テーマ切り替え機能
function toggleTheme() {
    const body = document.body;
    const button = document.getElementById('themeButton');
    const currentTheme = body.getAttribute('data-theme');

    if (currentTheme === 'light') {
        body.removeAttribute('data-theme');
        button.textContent = 'ライトモード';
        button.setAttribute('aria-label', 'ライトモードに切り替え');
        localStorage.setItem('vscode-shortcuts-theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        button.textContent = 'ダークモード';
        button.setAttribute('aria-label', 'ダークモードに切り替え');
        localStorage.setItem('vscode-shortcuts-theme', 'light');
    }
}

// 保存されたテーマを復元
function loadTheme() {
    const savedTheme = localStorage.getItem('vscode-shortcuts-theme');
    const button = document.getElementById('themeButton');

    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        button.textContent = 'ダークモード';
        button.setAttribute('aria-label', 'ダークモードに切り替え');
    } else {
        // デフォルトはダーク
        document.body.removeAttribute('data-theme');
        button.textContent = 'ライトモード';
        button.setAttribute('aria-label', 'ライトモードに切り替え');
    }
}

// キーボードナビゲーション改善
document.addEventListener('keydown', function (e) {
    const focusedElement = document.activeElement;

    // セクション間移動（Ctrl + 矢印キー）
    if (e.ctrlKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        const sections = document.querySelectorAll('.category');
        let currentSection = -1;

        // 現在のセクションを特定
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].contains(focusedElement)) {
                currentSection = i;
                break;
            }
        }

        // 次のセクションに移動
        if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
            const nextSection = sections[currentSection + 1];
            const firstFocusable = nextSection.querySelector('.shortcut-row[tabindex="0"]');
            if (firstFocusable) firstFocusable.focus();
        } else if (e.key === 'ArrowLeft' && currentSection > 0) {
            const prevSection = sections[currentSection - 1];
            const firstFocusable = prevSection.querySelector('.shortcut-row[tabindex="0"]');
            if (firstFocusable) firstFocusable.focus();
        }
    }

    // セクション内での上下移動
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (focusedElement.classList.contains('shortcut-row')) {
            e.preventDefault();
            const currentSection = focusedElement.closest('.category');
            const rows = currentSection.querySelectorAll('.shortcut-row[tabindex="0"]');
            const currentIndex = Array.from(rows).indexOf(focusedElement);

            if (e.key === 'ArrowDown' && currentIndex < rows.length - 1) {
                rows[currentIndex + 1].focus();
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                rows[currentIndex - 1].focus();
            }
        }
    }

    // テーマ切り替えのキーボードショートカット（Ctrl+Alt+T）
    if (e.ctrlKey && e.altKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
});

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function () {
    loadTheme();
});

// 印刷時のテーマ調整
window.addEventListener('beforeprint', function () {
    const originalTheme = document.body.getAttribute('data-theme');
    document.body.setAttribute('data-theme', 'light');

    window.addEventListener('afterprint', function () {
        if (originalTheme) {
            document.body.setAttribute('data-theme', originalTheme);
        } else {
            document.body.removeAttribute('data-theme');
        }
    }, { once: true });
});
