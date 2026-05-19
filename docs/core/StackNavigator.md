# 🧭 StackNavigator — Quản lý chuyển cảnh màn hình (Routing Stack)

`StackNavigator` là bộ định tuyến (Router) dạng ngăn xếp (Stack) của MNGUI. Nó quản lý quá trình chuyển đổi qua lại giữa các màn hình giao diện (`MNScreen`) kèm hiệu ứng trượt chuyển dịch mượt mà và tự động dọn dẹp bộ nhớ các màn hình đã đóng.

---

## 💡 Cú pháp khởi tạo

```javascript
const navigator = new StackNavigator(screens, initialScreenName);
```
*   **Tham số**:
    *   `screens` (`Array<{ name: string, component: BaseComponent }>`) — Danh sách định nghĩa các màn hình tham gia điều hướng. Cụ thể `component` phải là một thực thể `MNScreen`.
    *   `initialScreenName` (`string`) — Tên màn hình đầu tiên hiển thị mặc định khi render giao diện.

---

## 🛠️ Các phương thức (API)

Thông thường, lập trình viên sẽ thực hiện điều hướng gián tiếp thông qua đối tượng `MNGUI` chính (ví dụ: `gui.navigation(name)`) để đảm bảo Popup đính kèm màn hình mới chính xác vào DOM.

### 1. `gui.navigation(screenName)`
Mở màn hình mới có tên định danh `screenName`.
*   **Tham số**: `screenName` (`string`)
*   **Cơ chế hoạt động**:
    *   Nếu `screenName` **chưa có** trong ngăn xếp: Màn hình hiện tại sẽ trượt ẩn sang bên trái, màn hình mới được đẩy (push) vào stack và trượt hiển thị vào từ bên phải.
    *   Nếu `screenName` **đã tồn tại** trong ngăn xếp (lịch sử): Bộ định tuyến sẽ tự động quay lui (pop) ngược lại màn hình đó. Toàn bộ các màn hình nằm phía trên nó trong stack sẽ tự động bị gọi hàm hủy `.destroy()` để giải phóng tài nguyên trình duyệt.

```javascript
gui.navigation("settings");
```

### 2. `gui.back()`
Lập tức đóng màn hình hiện tại và quay trở về màn hình liền kề phía trước đó.
*   **Cơ chế hoạt động**: Màn hình hiện tại trượt biến mất sang bên phải và tự động hủy hủy bỏ phần tử khỏi DOM để tiết kiệm RAM. Màn hình trước đó trượt hiển thị trở lại từ bên trái.

```javascript
gui.back();
```

---

## 📝 Ví dụ sử dụng hoàn chỉnh

```javascript
const gui = new MNGUI();

// 1. Định nghĩa các màn hình
const homeScreen = new MNScreen().append([
    new MNText("Đây là Trang Chủ").style("font-size: 16px; font-weight: bold;"),
    new MNButton("Mở cấu hình Auto").onClick(() => gui.navigation("config")),
    new MNButton("Xem Thống kê").onClick(() => gui.navigation("stats"))
]);

const configScreen = new MNScreen().append([
    new MNText("Cấu hình Tham số").style("font-size: 16px; font-weight: bold;"),
    new MNSwitch("Bật tự động nhặt đồ").persist("auto_loot"),
    new MNButton("◀ Quay lại Trang chủ").onClick(() => gui.back())
]);

const statsScreen = new MNScreen().append([
    new MNText("Thống kê số liệu").style("font-size: 16px; font-weight: bold;"),
    new MNTable([
        { key: "item", label: "Vật phẩm" },
        { key: "qty", label: "Số lượng" }
    ], [
        { item: "Kiếm gỗ", qty: 12 },
        { item: "Bình máu", qty: 150 }
    ]),
    new MNButton("◀ Quay lại").onClick(() => gui.back())
]);

// 2. Cấu hình Navigator
const appNavigator = new StackNavigator([
    { name: "home", component: homeScreen },
    { name: "config", component: configScreen },
    { name: "stats", component: statsScreen }
], "home");

gui.setNavigator(appNavigator);
gui.render();
```
