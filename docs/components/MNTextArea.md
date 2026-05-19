# ✏️ MNTextArea — Khung nhập liệu nhiều dòng (Text Area Element)

`MNTextArea` là một ô nhập liệu nhiều dòng (Text Area) được thiết kế hiện đại. Điểm đặc biệt của component này là khả năng **tự động co giãn chiều cao (Auto-Resize)** theo số dòng văn bản mà người dùng gõ vào, giúp giao diện luôn gọn gàng và không bị xuất hiện thanh cuộn cục bộ xấu xí.

---

## 💡 Cú pháp khởi tạo

```javascript
const textarea = new MNTextArea(placeholder, rows);
```
*   **Tham số**:
    *   `placeholder` (`string`) — Văn bản gợi ý hiển thị mờ.
    *   `rows` (`number`) — Số dòng hiển thị mặc định ban đầu. Mặc định là `3`.

---

## 🛠️ Các phương thức (API)

`MNTextArea` kế thừa các phương thức từ `BaseComponent`. Phương thức `.append()` bị vô hiệu hóa.

### 1. `.onChange(callback)`
Lắng nghe sự kiện thay đổi nội dung văn bản khi người dùng đang nhập liệu.
*   **Tham số**: `callback` (`(value: string) => void`) — Trả về toàn bộ nội dung văn bản hiện tại.
*   **Trả về**: `this` (cho phép chaining)

```javascript
textarea.onChange((text) => {
    console.log("Nội dung mới:", text);
});
```

### 2. `.getValue()`
Lấy nội dung văn bản hiện tại trong ô nhập liệu.
*   **Trả về**: `string`

### 3. `.setValue(value)`
Thiết lập nội dung văn bản mới và tự động tính toán lại chiều cao để vừa khít với nội dung.
*   **Tham số**: `value` (`string`)
*   **Trả về**: `this`

### 4. `.setValueSilently(value)`
Thiết lập nội dung văn bản mà không kích hoạt sự kiện hay tính toán lại kích thước.
*   **Tham số**: `value` (`string`)
*   **Trả về**: `this`

### 5. `.persist(storageKey)`
Tự động lưu lại và khôi phục nội dung văn bản nhiều dòng khi tải lại trang web.
*   **Tham số**: `storageKey` (`string`)
*   **Trả về**: `this`

```javascript
const notes = new MNTextArea("Ghi chú kịch bản...").persist("script_run_notes");
```

---

## 📝 Ví dụ sử dụng

```javascript
const container = new MNColumn();

container.append(new MNText("Danh sách tài khoản (mỗi dòng một tài khoản):").style("font-weight: 500;"));

// Khởi tạo khung nhập liệu 5 dòng
const accountsInput = new MNTextArea("Nhập danh sách tài khoản...", 5)
    .persist("cached_accounts_list")
    .onChange((val) => {
        const lines = val.split("\n").filter(l => l.trim() !== "");
        console.log(`Số lượng tài khoản đã nhập: ${lines.length}`);
    });

container.append(accountsInput);
```
