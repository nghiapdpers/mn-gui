# 🎨 MNColorPicker — Bộ chọn màu sắc (Color Picker Component)

`MNColorPicker` cung cấp một giao diện chọn màu sắc (Color Picker) nhỏ gọn và trực quan. Lập trình viên có thể sử dụng thành phần này để cho phép người dùng tùy biến màu sắc giao diện của script, màu sắc đường kẻ vẽ trên màn hình hoặc nhãn phân loại.

---

## 💡 Cú pháp khởi tạo

```javascript
const colorPicker = new MNColorPicker(title, defaultColor);
```
*   **Tham số**:
    *   `title` (`string`) — Nhãn hiển thị bên cạnh bộ chọn màu.
    *   `defaultColor` (`string`) — Mã màu HEX khởi tạo mặc định. Mặc định là `#10b981` (xanh Mint).

---

## 🛠️ Các phương thức (API)

`MNColorPicker` kế thừa các phương thức từ `BaseComponent`. Phương thức `.append()` bị vô hiệu hóa.

### 1. `.onChange(callback)`
Lắng nghe sự kiện người dùng đã chọn xong một màu sắc mới (khi đóng hộp thoại chọn màu hoặc chọn xong một màu sắc).
*   **Tham số**: `callback` (`(color: string) => void`) — Hàm xử lý nhận tham số là mã màu HEX dạng chuỗi (ví dụ: `"#ff0000"`).
*   **Trả về**: `this` (cho phép chaining)

```javascript
colorPicker.onChange((hexColor) => {
    console.log("Đã chọn màu mới:", hexColor);
});
```

### 2. `.getValue()`
Lấy mã màu HEX hiện tại đang được chọn.
*   **Trả về**: `string`

### 3. `.setValue(hexColor)`
Thiết lập màu sắc mới cho bộ chọn và phát sự kiện thay đổi (`change`).
*   **Tham số**: `hexColor` (`string`) — Mã màu dạng HEX (ví dụ: `"#ffffff"`).
*   **Trả về**: `this`

### 4. `.setValueSilently(hexColor)`
Thiết lập màu sắc mà **không** phát ra sự kiện kích hoạt (Được sử dụng khi khôi phục dữ liệu từ bộ nhớ lưu trữ).
*   **Tham số**: `hexColor` (`string`)
*   **Trả về**: `this`

### 5. `.persist(storageKey)`
Tự động ghi nhớ và khôi phục mã màu sắc đã chọn khi người dùng tải lại trang web.
*   **Tham số**: `storageKey` (`string`)
*   **Trả về**: `this`

```javascript
const customThemeColor = new MNColorPicker("Màu thương hiệu", "#10b981").persist("script_brand_color");
```

---

## 📝 Ví dụ sử dụng

```javascript
const pickerContainer = new MNColumn();

const strokeColor = new MNColorPicker("Màu đường viền vẽ (Canvas)", "#ff0055")
    .persist("canvas_stroke_color")
    .onChange((color) => {
        // Cập nhật cấu hình vẽ canvas toàn cục
        globalConfig.drawColor = color;
        MNToast.show(`Đã cập nhật màu vẽ thành: ${color}`, "success");
    });

pickerContainer.append(strokeColor);
```
