# 📁 MNAccordion — Nhóm thu gọn (Collapsible Accordion Panel)

`MNAccordion` là một bảng thu gọn/mở rộng (Accordion/Collapsible) cao cấp. Nó đi kèm một biểu tượng Chevron SVG xoay chuyển động mượt mà khi người dùng nhấp mở để ẩn hoặc hiện nhóm các tính năng phức tạp bên trong, giữ cho bảng điều khiển Userscript luôn ngăn nắp, gọn gàng.

---

## 💡 Cú pháp khởi tạo

```javascript
const accordion = new MNAccordion(title, isExpanded);
```
*   **Tham số**:
    *   `title` (`string`) — Tiêu đề hiển thị trên thanh tiêu đề của Accordion.
    *   `isExpanded` (`boolean`) — Trạng thái mở rộng mặc định khi hiển thị (`true` để mở rộng, `false` để thu gọn). Mặc định là `false`.

---

## 🛠️ Các phương thức (API)

`MNAccordion` kế thừa các phương thức từ `BaseComponent`.

### 1. `.append(nodes)`
Thêm một hoặc nhiều component UI con vào **vùng nội dung mở rộng** của Accordion (thay vì thêm vào gốc của phần tử).
*   **Tham số**: `nodes` (`BaseComponent | Array<BaseComponent>`)
*   **Trả về**: `this` (cho phép chaining)

```javascript
const toggle = new MNSwitch("Bật Auto");
accordion.append(toggle);
```

---

## 📝 Ví dụ sử dụng

```javascript
const container = new MNColumn();

// Khởi tạo một Accordion cho nhóm Cài đặt Nâng cao, mặc định thu gọn
const advancedGroup = new MNAccordion("⚙️ Cài đặt Nâng Cao", false);

// Thêm các thành phần cấu hình phức tạp bên trong Accordion
advancedGroup.append([
    new MNInput("Đường dẫn Webhook Discord").persist("webhook_url"),
    new MNSlider("Số luồng xử lý tối đa", 1, 10, 3, 1).persist("max_threads"),
    new MNCheckbox("Ghi đè Header bảo mật", false).persist("override_headers")
]);

// Đưa Accordion vào màn hình chính
container.append(advancedGroup);
```
