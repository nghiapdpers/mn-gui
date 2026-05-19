# 💎 MNGUI v4.0.0 — Modern UI Kit for Userscripts

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Supported-blue.svg)](mngui.d.ts)
[![Platform](https://img.shields.io/badge/Platform-Tampermonkey%20%7C%20Violentmonkey-orange.svg)](#)

**MNGUI** là một thư viện UI Kit gọn nhẹ, thuần JavaScript (không phụ thuộc thư viện ngoài), được thiết kế chuyên biệt để xây dựng bảng điều khiển (Control Panel) chuyên nghiệp, đẹp mắt cho **Userscripts** (như Tampermonkey, Violentmonkey, Greasemonkey).

Với kiến trúc cô lập phong cách qua **Shadow DOM**, MNGUI đảm bảo 100% không bị xung đột CSS với trang web gốc, đem lại giao diện **Glassmorphism** & **Slate Dark Mode** thời thượng, mượt mà và trực quan.

---

## ✨ Điểm nổi bật & Tính năng cốt lõi

*   🛡️ **Shadow DOM Cô lập Tuyệt đối**: Giao diện được cô lập bên trong Shadow Root, không bị ảnh hưởng bởi CSS của trang web cha và ngược lại.
*   🎨 **Giao diện Slate Dark Mode cao cấp**: Tông màu đen Slate/Graphite sâu thẳm kết hợp hiệu ứng kính mờ (Glassmorphism) cực kỳ bắt mắt.
*   💾 **Tự động lưu trạng thái (State Persistence)**: Tự động lưu giá trị của các input, switch, checkbox... thông qua `GM_setValue`/`GM_getValue` (ưu tiên trong môi trường script) hoặc `localStorage` chỉ với một lệnh `.persist("key")`.
*   🔄 **Reactive Data Binding (`MNState`)**: Đồng bộ dữ liệu hai chiều (Two-way Data Binding) tự động giữa State và Component UI.
*   🕹️ **Khả năng kéo thả (Draggable)**: Popup điều khiển có thể kéo thả tự do trên màn hình để không che khuất nội dung trang web chính.
*   ⚡ **Hỗ trợ phím tắt & Đóng/Mở nhanh**: Thu nhỏ/phóng to bảng điều khiển tức thì qua phím tắt mặc định `Alt + M` hoặc click vào nút thu nhỏ tiện dụng.
*   💻 **TypeScript Auto-Complete**: Cung cấp tệp khai báo kiểu dữ liệu đầy đủ `mngui.d.ts` cho phép tự động gợi ý code (IntelliSense) siêu tốc trên VS Code.

---

## 🚀 Hướng dẫn tích hợp nhanh (Integration Guide)

Để sử dụng MNGUI trong Userscript của bạn, hãy cấu hình tiêu đề block Metadata của Tampermonkey/Violentmonkey như sau:

```javascript
// ==UserScript==
// @name         Premium Automation Script
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Userscript sử dụng giao diện điều khiển MNGUI
// @author       You
// @match        https://example.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=example.com
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://cdn.jsdelivr.net/gh/nghiapdpers/mn-gui@master/mngui.min.js
// ==/UserScript==

(function() {
    'use strict';

    // 1. Khởi tạo đối tượng MNGUI chính
    const gui = new MNGUI();

    // 2. Thiết lập tiêu đề và kích thước bảng điều khiển
    gui.popup.setTitle("⚙️ BẢNG ĐIỀU KHIỂN AUTOMATION");
    
    // 3. Tạo một Màn hình (MNScreen) mới
    const mainScreen = new MNScreen();
    
    // 4. Tạo layout hàng cột
    const container = new MNColumn();
    
    // Tiêu đề văn bản
    container.append(
        new MNText("Cài đặt hệ thống").style("font-size: 16px; font-weight: 600; margin-bottom: 8px;")
    );
    container.append(new MNDivider());

    // Switch bật tắt lưu trạng thái tự động
    const autoClickSwitch = new MNSwitch("Bật Auto Click", false)
        .persist("my_script_auto_click") // Tự động lưu và tải lại trạng thái
        .onChange((enabled) => {
            MNToast.show(enabled ? "Đã kích hoạt Auto Click!" : "Đã hủy kích hoạt!", "info");
        });
    container.append(autoClickSwitch);

    // Slider chỉnh tốc độ
    const speedSlider = new MNSlider("Tốc độ click (giây)", 0.5, 5.0, 1.0, 0.1)
        .persist("my_script_click_speed")
        .onChange((seconds) => {
            console.log("Tốc độ mới:", seconds);
        });
    container.append(speedSlider);

    // Nút thực thi
    const runBtn = new MNButton("Bắt đầu Chạy")
        .onClick(() => {
            MNDialog.show({
                title: "Xác nhận",
                message: "Bạn có chắc chắn muốn khởi chạy kịch bản tự động hóa?",
                confirmText: "Đồng ý",
                cancelText: "Hủy bỏ",
                onConfirm: () => {
                    MNToast.show("Đang khởi chạy kịch bản...", "success");
                }
            });
        });
    container.append(runBtn);

    // Gắn container vào Screen
    mainScreen.append(container);

    // 5. Khởi tạo bộ định tuyến màn hình (StackNavigator)
    const navigator = new StackNavigator([
        { name: "main", component: mainScreen }
    ], "main");

    // 6. Kết nối navigator và render giao diện lên trang web
    gui.setNavigator(navigator);
    gui.render();
})();
```

---

## 🎨 Kiến trúc & Khái niệm cốt lõi

### 1. Shadow DOM & Cô lập Phong cách
MNGUI tự động tạo một thẻ `<div id="mngui-root-container">` ở `body` của trang web cha, sau đó đính kèm một **Shadow Root** ở chế độ `open`. Tất cả cấu trúc DOM của popup, các component UI và toàn bộ thẻ `<style>` của theme đều được đưa vào trong Shadow Root này. 
Điều này giúp giao diện hiển thị chuẩn xác trên mọi trang web mà không sợ bị ảnh hưởng bởi bootstrap, tailwind hay bất kỳ stylesheet tùy biến nào của trang web gốc.

### 2. Quản lý trạng thái thông minh với `StatePersistence`
Khi bạn gọi phương thức `.persist("storage_key")` trên một component hỗ trợ nhập liệu, thư viện sẽ tự động:
1. Đọc giá trị lưu trữ trước đó khi khởi tạo và gán lại cho component (silently, không kích hoạt event `change` giả).
2. Lắng nghe các sự kiện đổi giá trị (`change`, `input`) để tự động lưu giá trị mới vào bộ nhớ.
3. Cơ chế lưu trữ ưu tiên `GM_setValue` & `GM_getValue` của Tampermonkey để đồng bộ dữ liệu ổn định xuyên suốt các tên miền con (cross-subdomain), nếu không có quyền sẽ tự động chuyển về `localStorage`.

### 3. Phản hồi hai chiều với `MNState`
`MNState` cung cấp cơ chế Reactive đơn giản dạng Observable:
```javascript
const appState = new MNState("Giá trị mặc định");

// Ràng buộc dữ liệu với ô nhập liệu
const input = new MNInput("Nhập nội dung").bind(appState);

// Ràng buộc dữ liệu với nhãn text hiển thị
const label = new MNText().bind(appState);

// Thay đổi state từ mã JS cũng sẽ lập tức cập nhật giao diện và ngược lại
appState.value = "Nội dung mới"; 
```

---

## 📚 Tài liệu Hướng dẫn chi tiết Component (API Reference)

Tài liệu hướng dẫn sử dụng chi tiết cho từng thành phần trong thư viện MNGUI được phân chia cụ thể bên dưới để lập trình viên dễ dàng tra cứu:

### ⚙️ Lớp Điều khiển cốt lõi (Core Controllers)
| Thành phần | Đường dẫn Tài liệu | Mô tả |
| :--- | :--- | :--- |
| **`MNGUI`** | [👉 Xem tài liệu core/MNGUI.md](docs/core/MNGUI.md) | Lớp quản trị trung tâm kết nối toàn bộ hệ thống |
| **`Theme`** | [👉 Xem tài liệu core/Theme.md](docs/core/Theme.md) | Cấu hình theme hệ màu Mint Green, Slate Dark & tự động chuyển Light/Dark |
| **`Popup`** | [👉 Xem tài liệu core/Popup.md](docs/core/Popup.md) | Container nổi, hỗ trợ kéo thả, thu nhỏ, điều chỉnh kích thước & phím tắt |
| **`StackNavigator`** | [👉 Xem tài liệu core/StackNavigator.md](docs/core/StackNavigator.md) | Bộ quản lý chuyển cảnh điều hướng giữa các màn hình |
| **`MNState`** | [👉 Xem tài liệu core/MNState.md](docs/core/MNState.md) | Cơ chế reactive state & liên kết dữ liệu 2 chiều |

### 📦 Các thành phần UI (UI Components)

#### 📐 Layout & Bố cục chung
*   [**`MNScreen`** - Màn hình chứa giao diện](docs/components/MNScreen.md)
*   [**`MNColumn`** - Bố cục Flexbox cột dọc](docs/components/MNColumn.md)
*   [**`MNRow`** - Bố cục Flexbox hàng ngang](docs/components/MNRow.md)
*   [**`MNDivider`** - Thanh kẻ phân cách nội dung](docs/components/MNDivider.md)
*   [**`MNTabs`** - Layout chuyển đổi Tab linh hoạt](docs/components/MNTabs.md)

#### 📝 Văn bản & Hiển thị cơ bản
*   [**`MNText`** - Nhãn văn bản thông thường](docs/components/MNText.md)
*   [**`MNBadge`** - Huy hiệu/Nhãn trạng thái màu sắc](docs/components/MNBadge.md)
*   [**`MNImage`** - Hiển thị ảnh tích hợp hiệu ứng Skeleton](docs/components/MNImage.md)

#### 🖲️ Nút bấm & Tương tác
*   [**`MNButton`** - Nút bấm thiết kế hiệu ứng Ripple](docs/components/MNButton.md)
*   [**`MNSwitch`** - Công tắc bật/tắt (Toggle Switch)](docs/components/MNSwitch.md)
*   [**`MNCheckbox`** - Hộp kiểm chọn truyền thống](docs/components/MNCheckbox.md)
*   [**`MNRadioGroup`** - Nhóm các nút lựa chọn đơn (Radio)](docs/components/MNRadioGroup.md)

#### ✏️ Nhập liệu & Lựa chọn
*   [**`MNInput`** - Ô nhập liệu một dòng](docs/components/MNInput.md)
*   [**`MNTextArea`** - Khung nhập liệu nhiều dòng tự động giãn chiều cao](docs/components/MNTextArea.md)
*   [**`MNSlider`** - Thanh kéo chọn giá trị số trong khoảng](docs/components/MNSlider.md)
*   [**`MNSelect`** - Trình thả tùy chọn thả xuống (Dropdown)](docs/components/MNSelect.md)
*   [**`MNColorPicker`** - Bộ chọn màu sắc hiển thị mã HEX trực tiếp](docs/components/MNColorPicker.md)

#### 🔔 Thông báo & Trạng thái phản hồi
*   [**`MNToast`** - Hộp thông báo nhanh (Toast Alerts)](docs/components/MNToast.md)
*   [**`MNDialog`** - Hộp thoại xác nhận hành động (Confirm Dialog)](docs/components/MNDialog.md)
*   [**`MNProgressBar`** - Thanh biểu thị tiến trình phần trăm](docs/components/MNProgressBar.md)
*   [**`MNSpinner`** - Biểu tượng xoay vòng tròn đang tải dữ liệu](docs/components/MNSpinner.md)
*   [**`MNTooltip`** - Nhãn chú thích khi di chuột qua](docs/components/MNTooltip.md)

#### 📊 Cấu trúc Dữ liệu Phức tạp
*   [**`MNAccordion`** - Khung thu gọn nội dung mượt mà (Accordion)](docs/components/MNAccordion.md)
*   [**`MNTable`** - Bảng lưới hiển thị dữ liệu có tiêu đề](docs/components/MNTable.md)

---

## 🛠️ Đóng góp & Phát triển thư viện (Development Guide)

Nếu bạn muốn chỉnh sửa, thêm component hoặc tối ưu hóa thư viện:

1.  **Clone dự án về máy:**
    ```bash
    git clone https://github.com/nghiapdpers/mn-gui.git
    cd mn-gui
    ```
2.  **Cài đặt các gói phụ thuộc (cho việc build):**
    ```bash
    npm install
    ```
3.  **Khởi động watcher tự động build:**
    Thư viện sử dụng script `build.js` tích hợp để tự động gom nhóm, gộp các component từ `src/` và xuất ra tệp `mngui.js` & `mngui.min.js`.
    ```bash
    npm run dev
    ```
4.  **Kiểm tra tính năng:**
    Mở file `index.html` trong trình duyệt để chạy trang demo kiểm thử trực quan tất cả các thành phần UI.

---

## 📄 Giấy phép (License)

Dự án này được phát hành dưới giấy phép **MIT License**. Bạn hoàn toàn có thể sử dụng, chỉnh sửa và phân phối trong các dự án thương mại cũng như cá nhân.
