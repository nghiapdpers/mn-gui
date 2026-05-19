# 🔔 MNToast — Hộp thông báo nhanh (Toast Alerts)

`MNToast` là hệ thống hiển thị thông báo nhanh (Toast Alert Stack) xuất hiện mượt mà ở góc màn hình. Nó được gọi tĩnh (Static Method) từ bất kỳ đâu trong mã nguồn script của bạn mà không cần phải khởi tạo đối tượng phức tạp.

---

## 💡 Cú pháp sử dụng nhanh

```javascript
MNToast.show(message, type, duration);
```

*   **Tham số**:
    *   `message` (`string`) — Nội dung văn bản thông báo.
    *   `type` (`string`) — Tông màu hiển thị đại diện cho loại thông báo:
        *   `"primary"` — Màu xanh Mint thương hiệu.
        *   `"secondary"` — Màu xám mờ tinh tế.
        *   `"success"` — Màu xanh lá cây biểu thị thành công.
        *   `"error"` — Màu đỏ biểu thị lỗi hoặc thất bại.
        *   `"warning"` — Màu vàng cam biểu thị cảnh báo.
        *   `"info"` — Màu xanh dương biểu thị thông tin/hướng dẫn.
        *(Mặc định là `"info"`)*
    *   `duration` (`number`) — Thời gian hiển thị thông báo (tính bằng mili-giây) trước khi tự động ẩn đi và bị hủy khỏi DOM. Mặc định là `3000` (3 giây).

---

## 📝 Ví dụ sử dụng phong phú

### 1. Thông báo thành công (Success)
```javascript
MNToast.show("Đã cấu hình tự động lưu!", "success");
```

### 2. Thông báo lỗi (Error)
```javascript
MNToast.show("Không thể kết nối đến máy chủ. Vui lòng thử lại!", "error", 5000);
```

### 3. Gọi từ một callback sự kiện
```javascript
const saveButton = new MNButton("Lưu Dữ Liệu")
    .onClick(() => {
        try {
            saveSettings();
            MNToast.show("Lưu thành công!", "success");
        } catch (e) {
            MNToast.show(`Lỗi: ${e.message}`, "error", 4000);
        }
    });
```
