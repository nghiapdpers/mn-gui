# 🎨 Theme — Quản lý Màu sắc & Chế độ Sáng/Tối

Lớp `Theme` chịu trách nhiệm cấu hình hệ thống bảng màu (mặc định là Mint Green & Slate Dark), tiêm thẻ CSS core vào Shadow DOM, tự động phát hiện tùy chọn của hệ thống và chuyển đổi giữa Light/Dark Mode mượt mà.

---

## 💡 Cú pháp khởi tạo tùy biến

Nếu không truyền tham số, MNGUI sẽ sử dụng hệ màu **Mint Green** mặc định rất sang trọng và dễ chịu. Tuy nhiên, bạn hoàn toàn có thể tự tạo một bộ nhận diện màu sắc hoàn toàn mới:

```javascript
const customTheme = new Theme(
    primary,            // Màu chủ đạo (ví dụ: Hex code)
    primaryVariant,     // Màu chủ đạo biến thể (khi hover)
    secondary,          // Màu phụ
    secondaryVariant,   // Màu phụ biến thể
    background,         // Màu nền
    surface,            // Màu nền thẻ chứa (hỗ trợ glassmorphism)
    error,              // Màu lỗi
    onPrimary,          // Màu chữ hiển thị trên nền chủ đạo
    onSecondary,        // Màu chữ hiển thị trên nền phụ
    onBackground,       // Màu chữ hiển thị trên nền chính
    onSurface,          // Màu chữ hiển thị trên bề mặt card
    onError             // Màu chữ hiển thị trên nhãn lỗi
);
```

---

## 🛠️ Các phương thức (API)

### 1. `.setMode(mode)`
Thay đổi chế độ giao diện của bảng điều khiển. Lựa chọn sẽ được tự động lưu lại vào bộ nhớ thông qua `StatePersistence` để lần sau mở trang web lên không bị mất.
*   **Tham số**: `mode` (`"light" | "dark" | "auto"`)
    *   `"light"`: Cố định giao diện sáng.
    *   `"dark"`: Cố định giao diện tối Slate Mode.
    *   `"auto"`: Tự động đồng bộ theo cấu hình Light/Dark Mode của hệ điều hành người dùng.
*   **Trả về**: `void`

```javascript
gui.theme.setMode("dark");
```

### 2. `.toggleMode()`
Chuyển đổi qua lại lập tức giữa Light Mode và Dark Mode.
*   **Trả về**: `void`

```javascript
gui.theme.toggleMode();
```

---

## 🎨 Hệ biến CSS Variable sử dụng trong Custom Style

MNGUI xuất bản các biến màu sắc CSS để bạn có thể sử dụng khi gọi phương thức `.style()` trên các component. 

```css
var(--mn_primary)          /* Màu xanh Mint chính */
var(--mn_primaryVariant)   /* Màu xanh Mint đậm */
var(--mn_background)       /* Màu nền chính */
var(--mn_surface)          /* Màu nền glassmorphism mờ */
var(--mn_surface_solid)    /* Màu nền đặc đục */
var(--mn_border)           /* Màu đường viền */
var(--mn_onSurface)        /* Màu chữ chính */
var(--mn_font)             /* Hệ font chữ hiện đại */
var(--mn_radius)           /* Bo góc mặc định (12px) */
```

### Ví dụ sử dụng biến màu CSS:
```javascript
const customText = new MNText("Nhãn Cảnh Báo")
    .style("color: var(--mn_error); background: rgba(239, 68, 68, 0.1); padding: 8px; border-radius: var(--mn_radius);");
```
---

## 🌓 Nút chuyển chế độ mặc định trên Header
MNGUI v4.0.0 tích hợp sẵn nút bấm chuyển đổi nhanh giao diện hình trăng khuyết `🌓` trên thanh Header của Popup. Khi người dùng nhấp chọn, MNGUI sẽ tự động gọi phương thức `.toggleMode()` và ghi nhớ lại lựa chọn của họ một cách liền mạch.
