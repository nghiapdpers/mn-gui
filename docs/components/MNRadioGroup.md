# 🔘 MNRadioGroup — Nhóm lựa chọn đơn (Radio Group Component)

`MNRadioGroup` cho phép người dùng lựa chọn một phương án duy nhất từ một nhóm các tùy chọn định sẵn dưới dạng nút tròn (Radio Button) trực quan, có kèm hiệu ứng micro-animation mượt mà khi nhấp chọn và hỗ trợ lưu trạng thái tự động.

---

## 💡 Cú pháp khởi tạo

```javascript
const radioGroup = new MNRadioGroup(options, selectedValue);
```
*   **Tham số**:
    *   `options` (`Array<{ label: string, value: string | number }>`) — Danh sách các tùy chọn đơn trong nhóm.
    *   `selectedValue` (`string | number`) — Giá trị tùy chọn được chọn mặc định ban đầu.

---

## 🛠️ Các phương thức (API)

`MNRadioGroup` kế thừa các phương thức từ `BaseComponent`. Phương thức `.append()` bị vô hiệu hóa.

### 1. `.onChange(callback)`
Lắng nghe sự kiện người dùng nhấp chọn thay đổi phương án lựa chọn mới.
*   **Tham số**: `callback` (`(value: string | number | null) => void`) — Trả về `value` của tùy chọn vừa được nhấp chọn.
*   **Trả về**: `this` (cho phép chaining)

```javascript
radioGroup.onChange((value) => {
    console.log("Giá trị lựa chọn mới:", value);
});
```

### 2. `.getValue()`
Lấy giá trị (`value`) của tùy chọn đang được kiểm chọn. Trả về `null` nếu không có phần tử nào được chọn.
*   **Trả về**: `string | number | null`

### 3. `.setValue(value)`
Thiết lập tùy chọn được chọn theo giá trị truyền vào (Kích hoạt sự kiện đổi trạng thái `change`).
*   **Tham số**: `value` (`string | number`)
*   **Trả về**: `this`

### 4. `.setValueSilently(value)`
Thiết lập tùy chọn được chọn mà không kích hoạt bất kỳ sự kiện hay hàm gọi lại nào.
*   **Tham số**: `value` (`string | number`)
*   **Trả về**: `this`

### 5. `.persist(storageKey)`
Tự động lưu lại và khôi phục phương án lựa chọn đã chọn sau khi người dùng tải lại trang web.
*   **Tham số**: `storageKey` (`string`)
*   **Trả về**: `this`

```javascript
const layout = new MNRadioGroup([
    { label: "Bình thường", value: "normal" },
    { label: "Bên trái", value: "left" },
    { label: "Bên phải", value: "right" }
], "normal").persist("panel_alignment");
```

---

## 📝 Ví dụ sử dụng

```javascript
const panel = new MNColumn();

panel.append(new MNText("Lựa chọn nguồn cấp dữ liệu:").style("font-weight: 500;"));

// Tạo nhóm radio
const dataSourceRadio = new MNRadioGroup([
    { label: "API Máy chủ chính", value: "api_main" },
    { label: "API Dự phòng 1", value: "api_backup_1" },
    { label: "API Thử nghiệm", value: "api_test" }
], "api_main")
.persist("selected_data_source")
.onChange((source) => {
    MNToast.show(`Đã chuyển đổi nguồn cấp: ${source}`, "success");
});

panel.append(dataSourceRadio);
```
