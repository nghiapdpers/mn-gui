# 🔄 MNSpinner — Hiệu ứng xoay tải dữ liệu (Loading Spinner)

`MNSpinner` là một vòng tròn xoay động (CSS Spinning Animation) biểu thị trạng thái đang xử lý, chờ đợi hoặc tải tài nguyên (Loading State). Nó cực kỳ nhỏ gọn, phản hồi nhanh và mượt mà mà không chiếm dụng nhiều không gian diện tích.

---

## 💡 Cú pháp khởi tạo

```javascript
const spinner = new MNSpinner(size, color);
```
*   **Tham số**:
    *   `size` (`string`) — Kích thước chiều rộng và chiều cao của vòng xoay (ví dụ: `"20px"`, `"32px"`, `"2rem"`). Mặc định là `"24px"`.
    *   `color` (`string`) — Màu sắc nét vẽ của vòng xoay. Mặc định sử dụng màu Mint thương hiệu (`"var(--mn-primary)"`).

---

## 🛠️ Các phương thức (API)

`MNSpinner` kế thừa đầy đủ tất cả phương thức cơ sở từ `BaseComponent`.

---

## 📝 Ví dụ sử dụng

```javascript
const panel = new MNColumn().style("align-items: center; justify-content: center; gap: 10px; padding: 20px;");

// Khởi tạo spinner màu thương hiệu mặc định, kích thước 30px
const loadingIndicator = new MNSpinner("30px");
const statusText = new MNText("Đang kết nối hệ thống...");

panel.append(loadingIndicator);
panel.append(statusText);

// Giả lập tắt spinner sau khi kết nối thành công
setTimeout(() => {
    loadingIndicator.destroy(); // Tự động xóa khỏi màn hình
    statusText.setValue("Đã kết nối thành công!");
    MNToast.show("Hệ thống sẵn sàng!", "success");
}, 4000);
```
