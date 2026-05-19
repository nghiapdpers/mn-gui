# 🖲️ MNButton — Nút bấm Tương tác (Button Element)

`MNButton` là nút bấm tương tác chuẩn của MNGUI. Nó đi kèm hiệu ứng hover bóng bẩy và micro-animation gợn sóng (ripple-like active state) mượt mà giúp cải thiện trải nghiệm người dùng trên bảng điều khiển.

---

## 💡 Cú pháp khởi tạo

```javascript
const button = new MNButton(title);
```
*   **Tham số**: `title` (`string`) — Nhãn hiển thị trên nút bấm.

---

## 🛠️ Các phương thức (API)

`MNButton` kế thừa các phương thức từ `BaseComponent`. Phương thức `.append()` bị vô hiệu hóa vì đây là thành phần tương tác độc lập.

### 1. `.onClick(callback)`
Lắng nghe sự kiện click chuột trên nút bấm.
*   **Tham số**: `callback` (`(event: MouseEvent) => void`) — Hàm xử lý khi người dùng click.
*   **Trả về**: `this` (cho phép chaining)

```javascript
button.onClick((event) => {
    console.log("Nút đã được bấm!", event);
});
```

---

## 📝 Ví dụ sử dụng

```javascript
const actionsLayout = new MNRow().style("gap: 12px;");

// Nút lưu cài đặt (Dạng nổi bật)
const saveBtn = new MNButton("Lưu Cấu Hình")
    .onClick(() => {
        MNToast.show("Đã lưu cấu hình thành công!", "success");
    });

// Nút hủy bỏ (Dạng phụ - tùy biến màu sắc qua CSS)
const cancelBtn = new MNButton("Hủy Bỏ")
    .style("background: rgba(255, 255, 255, 0.05); color: #fff;")
    .onClick(() => {
        MNToast.show("Đã hủy bỏ thay đổi", "warning");
    });

actionsLayout.append(cancelBtn);
actionsLayout.append(saveBtn);
```
