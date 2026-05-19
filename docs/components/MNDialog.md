# 💬 MNDialog — Hộp thoại xác nhận (Confirm Dialog Overlay)

`MNDialog` là hệ thống hộp thoại xác nhận hành động (Confirm Dialog) dạng Overlay phủ mờ màn hình. Tương tự như `MNToast`, nó được thiết kế dạng tĩnh (Static Method) để lập trình viên có thể mở nhanh một thông báo xác nhận quan trọng bất cứ lúc nào mà không cần tạo cấu trúc DOM phức tạp.

---

## 💡 Cú pháp sử dụng nhanh

```javascript
MNDialog.show({
    title: "Tiêu đề",
    message: "Nội dung thông báo cần xác nhận...",
    confirmText: "Nút đồng ý",
    cancelText: "Nút hủy bỏ",
    onConfirm: () => { /* Xử lý khi đồng ý */ },
    onCancel: () => { /* Xử lý khi hủy bỏ */ }
});
```

---

## 🛠️ Chi tiết tham số cấu hình

Hàm `MNDialog.show(options)` nhận vào một đối tượng duy nhất chứa các trường cấu hình tùy chọn sau:

| Trường | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Xác nhận"` | Tiêu đề chính hiển thị ở đầu hộp thoại. |
| `message` | `string` | `""` | Nội dung văn bản chi tiết giải thích cho hành động cần xác nhận. |
| `confirmText` | `string` | `"OK"` | Nhãn chữ trên nút bấm đồng ý hành động. |
| `cancelText` | `string` | `"Hủy"` | Nhãn chữ trên nút bấm từ chối/hủy bỏ hành động. |
| `onConfirm` | `function` | `null` | Hàm gọi lại chạy khi người dùng bấm nút đồng ý. |
| `onCancel` | `function` | `null` | Hàm gọi lại chạy khi người dùng bấm nút hủy hoặc đóng hộp thoại. |

---

## 📝 Ví dụ sử dụng

```javascript
const deleteAction = new MNButton("Reset Script")
    .style("background: var(--mn-error); color: #fff;")
    .onClick(() => {
        MNDialog.show({
            title: "⚠️ Reset toàn bộ cấu hình?",
            message: "Hành động này sẽ xóa sạch các API Key và cấu hình bot đã lưu trên trình duyệt của bạn. Bạn có chắc chắn muốn reset?",
            confirmText: "Reset Ngay",
            cancelText: "Không, quay lại",
            onConfirm: () => {
                // Xử lý xóa cấu hình
                localStorage.clear();
                MNToast.show("Đã reset cấu hình về mặc định!", "success");
            },
            onCancel: () => {
                MNToast.show("Đã hủy bỏ hành động reset", "info");
            }
        });
    });
```
