# 🗂️ MNTabs — Chuyển đổi Tab (Tabs layout)

`MNTabs` là một component quản lý bố cục chia trang bằng các Tab tiêu đề nằm ngang. Nó cho phép người dùng chuyển đổi qua lại giữa các khu vực nội dung khác nhau (như Tab *Cơ bản*, *Nâng cao*, *Trợ giúp*) ngay trên cùng một màn hình một cách trực quan và mượt mà.

---

## 💡 Cú pháp khởi tạo

```javascript
const tabs = new MNTabs(initialTabs);
```
*   **Tham số**: `initialTabs` (`Array<{ id: string, title: string, component: BaseComponent | Array<BaseComponent> }>`) — Mảng danh sách các tab khởi tạo ban đầu (không bắt buộc).

---

## 🛠️ Các phương thức (API)

`MNTabs` kế thừa các phương thức từ `BaseComponent`.

### 1. `.addTab(id, title, component)`
Thêm một tab mới vào thanh điều hướng.
*   **Tham số**:
    *   `id` (`string`) — Định danh duy nhất của tab.
    *   `title` (`string`) — Nhãn chữ hiển thị trên nút bấm tab.
    *   `component` (`BaseComponent | Array<BaseComponent>`) — Một component hoặc mảng các component cấu thành nội dung hiển thị của tab này.
*   **Trả về**: `this` (cho phép chaining)

```javascript
tabs.addTab("general", "Cơ Bản", generalColumn);
```

### 2. `.setActiveTab(id)`
Lập tức chuyển tab đang hiển thị sang tab có định danh `id`.
*   **Tham số**: `id` (`string`) — Định danh của tab cần mở.
*   **Trả về**: `this`

```javascript
tabs.setActiveTab("general");
```

---

## 📝 Ví dụ sử dụng

```javascript
// 1. Tạo nội dung cho các tab khác nhau
const tabHome = new MNColumn().append(new MNText("Đây là trang chủ của script."));
const tabSettings = new MNColumn().append(new MNSwitch("Bật Auto-Farm"));
const tabHelp = new MNColumn().append(new MNText("Liên hệ hỗ trợ: Discord channel."));

// 2. Khởi tạo đối tượng Tabs
const appTabs = new MNTabs();

// 3. Đưa các tab vào bộ điều phối
appTabs.addTab("home", "🏠 Trang chủ", tabHome);
appTabs.addTab("settings", "⚙️ Cài đặt", tabSettings);
appTabs.addTab("help", "❓ Trợ giúp", tabHelp);

// 4. Đưa appTabs vào màn hình hiển thị chính
const mainScreen = new MNScreen().append(appTabs);
```
