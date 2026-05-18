# Project Overview — MNGUI

## 1. Bản chất & Mục tiêu Dự án
**MNGUI** là một thư viện layout gọn nhẹ, thuần JavaScript (không có dependencies bên ngoài), được thiết kế đặc biệt để nhúng vào các **Userscripts** (như Tampermonkey, Violentmonkey, Greasemonkey). 

Mục tiêu chính là giúp người phát triển script dễ dàng tích hợp một bảng điều khiển (Control Panel) đẹp mắt, chuyên nghiệp, phản hồi nhanh và mượt mà mà không làm tăng dung lượng script hay gây xung đột với mã nguồn của trang web gốc.

---

## 2. Kiến trúc & Thành phần cốt lõi

Thư viện bao gồm các lớp đối tượng chính sau:
*   `MNGUI`: Lớp quản trị trung tâm, kết nối Theme, Popup, Navigator và render toàn bộ hệ thống.
*   `Theme`: Định nghĩa hệ thống màu sắc (support CSS variables), tự động phát hiện Dark/Light Mode và tiêm CSS cốt lõi vào head.
*   `Popup`: Giao diện bao ngoài (container) hiển thị dưới dạng một hộp thoại nổi, có thể thu nhỏ/phóng to qua phím tắt (`Alt + M` mặc định), hỗ trợ kéo thả (`draggable`) để không che khuất nội dung trang web.
*   `StackNavigator`: Quản lý chuyển cảnh giữa các màn hình (`MNScreen`) với các hiệu ứng slide mượt mà.
*   `BaseComponent`: Lớp cơ sở cho mọi Component, cung cấp các hàm tiện ích như `append`, `style`, `destroy`, `clone`.
*   **Các Component UI**:
    *   `MNColumn` / `MNRow`: Các thẻ chứa dạng Flexbox để dàn trang.
    *   `MNText`: Hiển thị văn bản thông thường.
    *   `MNButton`: Nút bấm có hiệu ứng ripple khi hover.
    *   `MNInput`: Ô nhập liệu thông thường có hiệu ứng hover/focus.
    *   `MNSwitch`: Nút bật/tắt (Toggle) dạng công tắc.
    *   `MNCheckbox`: Nút bật/tắt dạng checkbox truyền thống.
    *   `MNSlider`: Chọn giá trị số trong một khoảng (Range Slider).
    *   `MNSelect`: Dropdown lựa chọn giá trị tùy biến.
    *   `MNBadge`: Huy hiệu nhỏ hiển thị nhãn/trạng thái.
    *   `MNDivider`: Đường kẻ phân cách các phần UI.
    *   `MNAccordion`: Nhóm các UI có thể thu gọn/mở rộng (Collapsible Group) siêu mượt.
    *   `MNColorPicker`: Bộ chọn màu sắc (Color Picker) trực quan với mã HEX trực tiếp.
    *   `MNToast`: Hệ thống thông báo nhanh xuất hiện ở góc màn hình.

---

## 3. Lịch sử Thay đổi (Changelog)

| Phiên bản | Ngày | Tác giả | Các thay đổi chính |
|---|---|---|---|
| **3.0.0** | 2026-05-18 | Antigravity | **Nâng cấp Hệ thống Lưu trạng thái & Tùy biến Cao cấp**: <br>1. Thêm tính năng **Tự động lưu trạng thái (State Persistence)** qua phương thức `.persist(key)` cho các component: `MNSwitch`, `MNCheckbox`, `MNSlider`, `MNInput`, `MNSelect`. Tự động ưu tiên `GM_setValue`/`GM_getValue` cho Userscripts chéo trang và fallback về `localStorage`.<br>2. Thêm component cao cấp **`MNAccordion`** (Khung thu gọn mượt mà).<br>3. Thêm component cao cấp **`MNColorPicker`** (Bộ chọn màu sắc hiện đại, hiển thị HEX và cập nhật trực tiếp).<br>4. Cung cấp bộ công cụ tự động hóa DX: File watch tự động build `build.js` và file autocomplete kiểu dữ liệu TypeScript đầy đủ **`mngui.d.ts`** cho lập trình viên.<br>5. Chuyển đổi toàn bộ layout sang hệ màu **Xanh Lá Non dịu nhẹ (Mint Green Theme)** với hỗ trợ Dark Mode tự động mượt mà.<br>6. Xóa bỏ hoàn toàn tệp `demo.html` trùng lặp, thống nhất kiểm thử trên `index.html` được host qua GitHub Pages. |
| **2.0.0** | 2026-05-18 | Antigravity | **Nâng cấp Premium & Sửa lỗi**: <br>1. Sửa lỗi clone của `MNSwitch` do `label` bị khai báo cục bộ.<br>2. Sửa lỗi click ngoài thẻ `li` trên `MNSelect` làm mất text của button.<br>3. Sửa lỗi `transitionend` kích hoạt callback ngay lập tức trong `MNScreen.hide()`. <br>4. Thêm chức năng **Kéo thả (Draggable)** cho Popup.<br>5. Nâng cấp giao diện **Glassmorphism** sang trọng, hiện đại với các hiệu ứng đổ bóng sâu.<br>6. Thêm 4 component: `MNCheckbox`, `MNSlider`, `MNDivider`, `MNBadge`.<br>7. Thêm lớp thông báo **`MNToast`** siêu mượt.<br>8. Hỗ trợ tự động chuyển Dark/Light Mode. |
| **1.0.0** | Trước đó | Nghiapd | Phiên bản khởi tạo đầu tiên, cung cấp các thành phần giao diện cơ bản và điều hướng StackNavigator. |

---

## 4. Cách sử dụng nhanh trong Userscript

```javascript
// ==UserScript==
// @name         My Premium Userscript
// @match        https://example.com/*
// @require      https://path-to-your-hosted/mngui.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const gui = new MNGUI();
    
    // Tùy biến icon và tiêu đề popup
    gui.popup.setIcon("⚙️");
    gui.popup.setPopupSize("400px", "500px");
    
    // Tạo màn hình chính
    const mainScreen = new MNScreen();
    const column = new MNColumn();
    
    column.append(new MNText("Cấu hình Script").style("font-size: 18px; font-weight: bold;"));
    column.append(new MNDivider());
    
    // Switch bật tắt
    const toggle = new MNSwitch("Bật Auto-Click").onChange((checked) => {
        MNToast.show(checked ? "Đã bật auto-click" : "Đã tắt auto-click", "success");
    });
    column.append(toggle);
    
    // Slider điều chỉnh thời gian delay
    const delaySlider = new MNSlider("Thời gian trễ (giây)", 1, 10, 3, 0.5).onChange((val) => {
        console.log("Delay:", val);
    });
    column.append(delaySlider);
    
    mainScreen.append(column);
    
    const navigator = new StackNavigator([
        { name: "main", component: mainScreen }
    ], "main");
    
    gui.setNavigator(navigator);
    gui.render();
})();
```
