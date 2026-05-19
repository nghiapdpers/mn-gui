# 🏷️ MNBadge — Huy hiệu Trạng thái (Badge Indicator)

`MNBadge` là một nhãn thông tin nhỏ có màu sắc trực quan, thường dùng để hiển thị trạng thái (như *Đang chạy*, *Lỗi*, *Hoàn thành*), phân loại nhãn hoặc hiển thị số đếm thông báo.

---

## 💡 Cú pháp khởi tạo

```javascript
const badge = new MNBadge(content, type);
```
*   **Tham số**:
    *   `content` (`string`) — Văn bản hiển thị trên huy hiệu.
    *   `type` (`string`) — Tông màu hiển thị của huy hiệu. Nhận một trong các giá trị sau:
        *   `"primary"` — Xanh lá cây non (Mint Green) thương hiệu.
        *   `"secondary"` — Màu xám thanh lịch.
        *   `"success"` — Màu xanh lá thành công.
        *   `"error"` — Màu đỏ lỗi hệ thống.
        *   `"warning"` — Màu vàng cảnh báo.
        *   `"info"` — Màu xanh dương thông tin.

---

## 🛠️ Các phương thức (API)

`MNBadge` kế thừa các phương thức từ `BaseComponent`. Phương thức `.append()` bị vô hiệu hóa vì đây là thành phần hiển thị văn bản thuần túy.

### 1. `.setValue(text)`
Thay đổi văn bản hiển thị trong huy hiệu.
*   **Tham số**: `text` (`string`)
*   **Trả về**: `this` (cho phép chaining)

```javascript
badge.setValue("Offline");
```

### 2. `.getValue()`
Lấy nội dung văn bản hiện tại của huy hiệu.
*   **Trả về**: `string`

---

## 📝 Ví dụ sử dụng

```javascript
const statusRow = new MNRow().style("align-items: center; gap: 10px;");

statusRow.append(new MNText("Trạng thái Script:"));

// Tạo một huy hiệu biểu diễn trạng thái thành công
const activeBadge = new MNBadge("Đang hoạt động", "success");
statusRow.append(activeBadge);

// Cập nhật trạng thái sau
setTimeout(() => {
    activeBadge.setValue("Đã tạm dừng");
    // Bạn có thể tùy biến thêm CSS cho phù hợp
    activeBadge.style("opacity: 0.6;");
}, 5000);
```
