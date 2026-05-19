# ⚙️ MNGUI — Lớp quản trị trung tâm (Main Controller)

`MNGUI` là lớp điều khiển trung tâm và là entry-point của toàn bộ hệ thống giao diện. Lớp này chịu trách nhiệm kết hợp `Theme`, `Popup` và `StackNavigator` để khởi dựng, quản lý vòng đời và hiển thị giao diện người dùng lên trang web.

---

## 💡 Cú pháp khởi tạo

```javascript
const gui = new MNGUI();
```

---

## 🛠️ Các thuộc tính & Phương thức (API)

### 1. `gui.theme`
Đối tượng quản lý giao diện (`Theme`) liên kết trực tiếp với hệ thống. Cho phép tùy biến màu sắc và chế độ sáng/tối.
*   **Kiểu dữ liệu**: [👉 Theme](Theme.md)

### 2. `gui.popup`
Đối tượng hộp thoại chứa giao diện nổi (`Popup`). Cho phép thay đổi tiêu đề, kích thước, biểu tượng nút mở và phím tắt.
*   **Kiểu dữ liệu**: [👉 Popup](Popup.md)

### 3. `.setNavigator(navigator)`
Liên kết bộ định tuyến màn hình (`StackNavigator`) với hệ thống điều khiển.
*   **Tham số**: `navigator` (`StackNavigator`)
*   **Trả về**: `this` (cho phép chaining)

```javascript
gui.setNavigator(navigator);
```

### 4. `.navigation(screenName)`
Điều hướng chuyển đổi màn hình hiện tại sang màn hình mới có tên `screenName` (Tự động kích hoạt hiệu ứng slide chuyển cảnh).
*   **Tham số**: `screenName` (`string`)
*   **Trả về**: `void`

```javascript
gui.navigation("settings");
```

### 5. `.back()`
Quay trở lại màn hình trước đó trong ngăn xếp màn hình (stack).
*   **Trả về**: `void`

```javascript
gui.back();
```

### 6. `.render()`
Kết xuất (Render) toàn bộ các phần tử giao diện, tiêm Shadow DOM vào trang web cha và lắng nghe phím tắt mở nhanh.
*   **Trả về**: `void`

```javascript
gui.render();
```

---

## 📝 Ví dụ sử dụng

```javascript
// Khởi tạo
const gui = new MNGUI();

// Tùy biến Popup
gui.popup.setTitle("🎲 Tool Auto Farm");
gui.popup.setPopupSize("380px", "520px");

// Khởi tạo các màn hình
const mainScreen = new MNScreen().append(new MNButton("Mở Cài Đặt").onClick(() => {
    gui.navigation("settings"); // Điều hướng tiến
}));

const settingsScreen = new MNScreen().append(new MNButton("Quay lại").onClick(() => {
    gui.back(); // Quay lại
}));

// Thiết lập Navigator
const navigator = new StackNavigator([
    { name: "main", component: mainScreen },
    { name: "settings", component: settingsScreen }
], "main");

gui.setNavigator(navigator);

// Hiển thị lên màn hình
gui.render();
```
