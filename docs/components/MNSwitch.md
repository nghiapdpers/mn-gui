# 🖲️ MNSwitch — Công tắc bật/tắt (Toggle Switch)

`MNSwitch` là một công tắc gạt bật/tắt (Toggle Switch) tinh tế và hiện đại, lý tưởng để điều khiển trạng thái nhị phân (Đúng/Sai, Bật/Tắt) của các tùy chọn cấu hình trong Userscript.

---

## 💡 Cú pháp khởi tạo

```javascript
const toggle = new MNSwitch(title, defaultValue);
```
*   **Tham số**:
    *   `title` (`string`) — Nhãn mô tả bên cạnh công tắc.
    *   `defaultValue` (`boolean`) — Trạng thái bật/tắt mặc định (`true` hoặc `false`). Mặc định là `false`.

---

## 🛠️ Các phương thức (API)

`MNSwitch` kế thừa các phương thức từ `BaseComponent`. Phương thức `.append()` bị vô hiệu hóa vì đây là thành phần input đầu cuối.

### 1. `.onChange(callback)`
Lắng nghe sự kiện thay đổi trạng thái bật/tắt.
*   **Tham số**: `callback` (`(checked: boolean) => void`) — Hàm xử lý trả về trạng thái mới.
*   **Trả về**: `this` (cho phép chaining)

```javascript
toggle.onChange((checked) => {
    console.log("Trạng thái công tắc:", checked ? "Bật" : "Tắt");
});
```

### 2. `.getValue()`
Lấy trạng thái hiện tại của công tắc.
*   **Trả về**: `boolean` (`true` hoặc `false`)

### 3. `.setValue(value)`
Thiết lập trạng thái bật/tắt cho công tắc (Kích hoạt sự kiện `change`).
*   **Tham số**: `value` (`boolean`)
*   **Trả về**: `this` (cho phép chaining)

### 4. `.setValueSilently(value)`
Thiết lập trạng thái bật/tắt mà **không** kích hoạt sự kiện `change` (Thường được sử dụng bởi hệ thống tải trạng thái lưu trữ).
*   **Tham số**: `value` (`boolean`)
*   **Trả về**: `this`

### 5. `.persist(storageKey)`
Tự động lưu và tải lại trạng thái của Switch thông qua cơ chế lưu trữ bền vững (State Persistence).
*   **Tham số**: `storageKey` (`string`)
*   **Trả về**: `this`

```javascript
// Trạng thái bật/tắt sẽ tự động được ghi nhớ khi tải lại trang!
const autoSave = new MNSwitch("Tự động lưu", false).persist("my_toggle_persistence");
```

---

## 📝 Ví dụ sử dụng

```javascript
const settingScreen = new MNScreen();
const settingsList = new MNColumn();

// Switch bật tắt cơ chế Debug
const debugSwitch = new MNSwitch("Kích hoạt Debug Log", false)
    .persist("script_debug_mode")
    .onChange((enabled) => {
        if (enabled) {
            MNToast.show("Đã bật chế độ ghi log chi tiết!", "info");
        } else {
            MNToast.show("Đã tắt chế độ ghi log", "secondary");
        }
    });

settingsList.append(debugSwitch);
settingScreen.append(settingsList);
```
