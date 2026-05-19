# 🖥️ MNScreen — Màn hình Giao diện

`MNScreen` là component container cấp cao nhất đại diện cho một "màn hình" giao diện trong MNGUI. Khi chuyển đổi giữa các màn hình thông qua `StackNavigator`, `MNScreen` quản lý các hiệu ứng chuyển cảnh (slide-in, slide-out) mượt mà bằng CSS transitions.

---

## 💡 Cú pháp khởi tạo

```javascript
const screen = new MNScreen();
```

---

## 🛠️ Các phương thức (API)

`MNScreen` kế thừa tất cả các phương thức từ `BaseComponent` (như `.style()`, `.append()`, `.destroy()`).

### 1. `.append(component)`
Thêm một hoặc nhiều thành phần con (BaseComponent hoặc HTMLElement) vào màn hình.
*   **Tham số**: `component` (`BaseComponent | HTMLElement | Array<BaseComponent>`)
*   **Trả về**: `this` (cho phép chaining)

```javascript
const column = new MNColumn();
screen.append(column);
```

### 2. `.show(direction)`
Kích hoạt hiển thị màn hình với hiệu ứng trượt vào từ một hướng xác định (Thường được gọi tự động bởi `StackNavigator`).
*   **Tham số**: `direction` (`"left" | "right"`) — Mặc định là `"right"`
*   **Trả về**: `void`

### 3. `.hide(direction, callback)`
Ẩn màn hình đi với hiệu ứng trượt ra và kích hoạt một hàm gọi lại sau khi hiệu ứng kết thúc.
*   **Tham số**:
    *   `direction` (`"left" | "right"`) — Mặc định là `"left"`
    *   `callback` (`function`) — Hàm chạy sau khi ẩn thành công
*   **Trả về**: `void`

---

## 📝 Ví dụ sử dụng

```javascript
const homeScreen = new MNScreen();

const title = new MNText("Chào mừng đến với MNGUI v4")
    .style("font-size: 18px; font-weight: bold; text-align: center; color: var(--mn-primary);");

const startBtn = new MNButton("Khám phá ngay")
    .onClick(() => {
        MNToast.show("Bắt đầu kịch bản!", "success");
    });

// Thêm các thành phần con vào màn hình chính
homeScreen.append(title);
homeScreen.append(startBtn);
```
