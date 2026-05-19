# 💬 MNTooltip — Chú thích giải thích (Tooltip Component)

`MNTooltip` là một thành phần hỗ trợ hiển thị chú thích giải thích (Tooltip) dạng nhãn nhỏ, xuất hiện khi người dùng di chuột qua (hover) một phần tử giao diện bất kỳ (như nút bấm, công tắc hoặc văn bản), giúp giải nghĩa nhanh các chức năng của script.

---

## 💡 Cú pháp khởi tạo

```javascript
const tooltip = new MNTooltip(targetComponent, text, position);
```
*   **Tham số**:
    *   `targetComponent` (`BaseComponent | HTMLElement`) — Phần tử giao diện đích cần được đính kèm Tooltip (Khi hiển thị, Tooltip sẽ tự động bọc phần tử này).
    *   `text` (`string`) — Nội dung văn bản chú thích hiển thị khi hover.
    *   `position` (`string`) — Hướng hiển thị của nhãn chú thích so với phần tử đích. Nhận một trong bốn giá trị:
        *   `"top"` — Hiển thị phía trên.
        *   `"bottom"` — Hiển thị phía dưới.
        *   `"left"` — Hiển thị bên trái.
        *   `"right"` — Hiển thị bên phải.
        *(Mặc định là `"top"`)*

---

## 🛠️ Các phương thức (API)

`MNTooltip` kế thừa đầy đủ tất cả phương thức cơ sở từ `BaseComponent`.

---

## 📝 Ví dụ sử dụng

```javascript
const actionsColumn = new MNColumn();

// 1. Tạo một nút bấm thông thường
const deleteBtn = new MNButton("Xóa tất cả dữ liệu")
    .style("background: var(--mn-error); color: #fff;");

// 2. Bọc nút bấm đó bằng một Tooltip cảnh báo xuất hiện phía trên
const deleteWithTooltip = new MNTooltip(
    deleteBtn, 
    "⚠️ Hành động này không thể hoàn tác!", 
    "top"
);

// 3. Đưa đối tượng Tooltip bọc ngoài vào layout hiển thị
actionsColumn.append(deleteWithTooltip);
```
