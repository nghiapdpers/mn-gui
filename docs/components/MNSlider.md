# 🎚️ MNSlider — Thanh kéo chọn số (Range Slider)

`MNSlider` là thanh trượt (Range Slider) dùng để lựa chọn nhanh một giá trị số trong một khoảng xác định (ví dụ: tốc độ, thời gian trễ, độ mờ, kích thước chữ...). Nó hiển thị trực tiếp giá trị hiện tại ở phía trên thanh trượt theo thời gian thực.

---

## 💡 Cú pháp khởi tạo

```javascript
const slider = new MNSlider(title, min, max, defaultValue, step);
```
*   **Tham số**:
    *   `title` (`string`) — Nhãn hiển thị của thanh trượt.
    *   `min` (`number`) — Giá trị tối thiểu. Mặc định là `0`.
    *   `max` (`number`) — Giá trị tối đa. Mặc định là `100`.
    *   `defaultValue` (`number`) — Giá trị khởi tạo mặc định. Mặc định là `50`.
    *   `step` (`number`) — Bước nhảy khi kéo thanh trượt (ví dụ: `1`, `0.5`, `0.1`). Mặc định là `1`.

---

## 🛠️ Các phương thức (API)

`MNSlider` kế thừa các phương thức từ `BaseComponent`. Phương thức `.append()` bị vô hiệu hóa vì đây là thành phần nhập liệu đầu cuối.

### 1. `.onChange(callback)`
Lắng nghe sự kiện thay đổi giá trị khi người dùng kéo thanh trượt.
*   **Tham số**: `callback` (`(value: number) => void`) — Hàm xử lý với tham số là giá trị số hiện tại.
*   **Trả về**: `this` (cho phép chaining)

```javascript
slider.onChange((val) => {
    console.log("Giá trị số hiện tại:", val);
});
```

### 2. `.getValue()`
Lấy giá trị hiện tại của thanh trượt dưới dạng số.
*   **Trả về**: `number`

### 3. `.setValue(value)`
Thiết lập giá trị mới cho thanh trượt (Kích hoạt sự kiện cập nhật hiển thị số và gửi tín hiệu thay đổi).
*   **Tham số**: `value` (`number`)
*   **Trả về**: `this`

### 4. `.setValueSilently(value)`
Thiết lập giá trị mà **không** phát sự kiện kích hoạt (Dành cho việc phục hồi trạng thái từ bộ nhớ).
*   **Tham số**: `value` (`number`)
*   **Trả về**: `this`

### 5. `.persist(storageKey)`
Tự động lưu và khôi phục giá trị của thanh kéo trượt khi tải lại trang web.
*   **Tham số**: `storageKey` (`string`)
*   **Trả về**: `this`

```javascript
const speed = new MNSlider("Tốc độ cuộn", 1, 10, 5, 0.5).persist("scroll_speed");
```

---

## 📝 Ví dụ sử dụng

```javascript
const configColumn = new MNColumn();

// Tạo thanh slider chỉnh thời gian trễ
const delaySlider = new MNSlider("Thời gian chờ phản hồi (giây)", 0.5, 5.0, 1.5, 0.1)
    .persist("script_request_delay")
    .onChange((val) => {
        console.log(`Đang cấu hình delay: ${val} giây.`);
    });

configColumn.append(delaySlider);
```
