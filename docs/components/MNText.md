# 📝 MNText — Văn bản thường (Typography Element)

`MNText` được sử dụng để hiển thị các đoạn văn bản, nhãn thông tin hoặc tiêu đề trong giao diện. Nó hỗ trợ cấu hình tùy biến kiểu dáng chữ linh hoạt thông qua thuộc tính `.style()`.

---

## 💡 Cú pháp khởi tạo

```javascript
const text = new MNText(content);
```
*   **Tham số**: `content` (`string`) — Nội dung văn bản hiển thị mặc định.

---

## 🛠️ Các phương thức (API)

`MNText` kế thừa các phương thức từ `BaseComponent`. Phương thức `.append()` bị vô hiệu hóa vì đây là thành phần hiển thị văn bản thuần túy.

### 1. `.setValue(text)`
Thay đổi nội dung văn bản hiển thị.
*   **Tham số**: `text` (`string`) — Nội dung văn bản mới.
*   **Trả về**: `this` (cho phép chaining)

```javascript
text.setValue("Nội dung mới cập nhật!");
```

### 2. `.getValue()`
Lấy nội dung văn bản đang hiển thị.
*   **Trả về**: `string`

```javascript
const currentText = text.getValue();
console.log(currentText);
```

### 3. `.bind(state)`
Ràng buộc hiển thị văn bản tự động với một reactive state (`MNState`).
*   **Tham số**: `state` (`MNState`)

```javascript
const countState = new MNState(0);
const label = new MNText().bind(countState);
// Khi countState thay đổi, label sẽ tự động cập nhật nội dung
```

---

## 📝 Ví dụ sử dụng

```javascript
// Tiêu đề in đậm, màu Mint Green
const heading = new MNText("CẤU HÌNH TỰ ĐỘNG HÓA")
    .style("font-size: 16px; font-weight: bold; color: var(--mn-primary); margin-bottom: 5px;");

// Mô tả chữ nhỏ, màu xám mờ
const description = new MNText("Vui lòng kích hoạt các tính năng cần dùng bên dưới.")
    .style("font-size: 12px; color: var(--mn-on-surface-variant); opacity: 0.7;");
```
