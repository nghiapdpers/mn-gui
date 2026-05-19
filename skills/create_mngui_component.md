# Thêm Component MNGUI Mới và Tự động Hóa Tài liệu & Sandbox

## Mô tả
Quy trình 4 bước chuẩn để xây dựng một component giao diện mới trong thư viện MNGUI, đồng thời viết tài liệu hướng dẫn song ngữ (Anh - Việt) và tích hợp tự động vào Live Sandbox tương tác thực tế của hệ thống.

## Khi nào áp dụng (When to Apply)
- Khi phát triển thêm bất kỳ thành phần UI mới nào trong thư mục `src/components/` (ví dụ: `MNImage`, `MNTabs`, `MNProgressBar`).
- Không áp dụng cho các thay đổi logic thuần túy trong lõi Core (`Theme`, `Popup`, `StackNavigator`).

## Yêu cầu trước (Prerequisites)
- Thư viện MNGUI được cấu hình biên dịch thông qua `esbuild` (`npm run build`).
- Cấu trúc tệp của component kế thừa từ lớp `BaseComponent`.

## Các bước thực hiện (Steps)

### Step 1: Định nghĩa mã nguồn Component mới
**Mục tiêu:** Tạo tệp JavaScript cho component mới kế thừa lớp cơ sở và đăng ký xuất ra toàn cục.
1. Tạo tệp mới tại `src/components/MN[ComponentName].js` (Ví dụ: `MNImage.js`).
2. Viết mã nguồn kế thừa `BaseComponent`:
```javascript
import { BaseComponent } from '../core/BaseComponent.js';

export class MNImage extends BaseComponent {
  constructor(src, width = "100%") {
    super(document.createElement("img"));
    this.element.src = src;
    this.element.style.width = width;
    this.element.style.borderRadius = "var(--mn_radius)";
  }
}
```
3. Đăng ký export component trong tệp `src/index.js` và `mngui.js`.
**Xác minh:** Chạy `npm run build` không báo lỗi cú pháp.

---

### Step 2: Cập nhật tài liệu song ngữ vào cơ sở dữ liệu `docs-data.js`
**Mục tiêu:** Khai báo mô tả cấu trúc, tham số và ví dụ mã nguồn của component bằng cả tiếng Anh và tiếng Việt.
1. Mở tệp `docs-data.js`.
2. Thêm một phần tử thông tin mới vào mảng `components` bên trong `window.MNGUIDocsData`:
```javascript
{
  id: "mnimage",
  name: "MNImage",
  vi: `# MNImage — Thành phần hiển thị hình ảnh
Thành phần hiển thị hình ảnh cao cấp hỗ trợ bo góc theo chủ đề.

## Cú pháp khởi tạo
\`\`\`javascript
const img = new MNImage("https://example.com/pic.jpg", "200px");
\`\`\`
`,
  en: `# MNImage — Premium Image Component
Premium image component supporting theme-based border-radius.

## Initialization Syntax
\`\`\`javascript
const img = new MNImage("https://example.com/pic.jpg", "200px");
\`\`\`
`
}
```
> [!IMPORTANT]
> Tuyệt đối không thêm các biểu tượng cảm xúc (emoji) vào đầu tiêu đề chính `<h1>` để giữ tính tối giản và cao cấp cho tài liệu.

**Xác minh:** Khởi động trang `index.html` trên trình duyệt, thanh bên trái phải tự động xuất hiện tên component mới hiển thị chính xác.

---

### Step 3: Tự động hóa tích hợp vào Live Sandbox Popup
**Mục tiêu:** Tích hợp component mới vào màn hình xem thử tương tác trực tiếp của bảng điều khiển MNGUI.
1. Mở tệp `index.html`, tìm tới hàm `updateMNGUIDocsPreview(id)`.
2. Thêm trường hợp `switch (id)` tương ứng với tên component mới (dạng chữ thường) để khởi tạo và render thử nghiệm thực tế:
```javascript
switch (id) {
  // ... các component hiện tại ...
  case "mnimage":
    const liveImg = new MNImage("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500", "120px");
    wrapper.append(liveImg);
    break;
}
```
**Xác minh:** Click xem tài liệu của component mới trên trang, bảng điều khiển MNGUI thực tế góc phải màn hình phải tự động trượt mở màn hình preview và kết xuất hiển thị live component đó lên giao diện một cách trực quan.

---

### Step 4: Biên dịch và kiểm thử
**Mục tiêu:** Đóng gói toàn bộ tài nguyên vào mã nguồn phân phối.
1. Chạy lệnh:
```bash
npm run build
```
2. Mở trình duyệt để trải nghiệm tính năng tương tác kéo thả, đổi chủ đề xem độ trong suốt (Glassmorphism 0.4) hiển thị hoàn hảo.

## Gotchas & Lưu ý
- ⚠️ Khi dựng live component trong hàm `updateMNGUIDocsPreview(id)`, luôn bọc component bên trong lớp `MNRow` hoặc `MNColumn` có định kiểu rõ ràng để giữ cấu trúc bố cục cân đối.
- 💡 Luôn ưu tiên dùng các biến mã màu hệ thống như `var(--mn_primary)` thay vì mã màu tĩnh (`#10b981`) để component tự động cập nhật mượt mà khi người dùng thay đổi bảng màu chủ đạo.

## Tham khảo (References)
- Tệp định nghĩa biến phong cách: [Theme.js](file:///home/nghiapd/du-an-ngoai/mn-script/mn-gui/src/core/Theme.js)
- Tệp điều khiển kéo thả: [Popup.js](file:///home/nghiapd/du-an-ngoai/mn-script/mn-gui/src/core/Popup.js)
