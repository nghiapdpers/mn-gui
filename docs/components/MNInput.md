# ✏️ MNInput — Ô nhập liệu (Input Text Element)

`MNInput` cung cấp một ô nhập liệu (Text Input) một dòng tuyệt đẹp, hỗ trợ hiệu ứng focus phát sáng mịn màng và tự động lưu giữ trạng thái.

---

## 💡 Cú pháp khởi tạo

```javascript
const input = new MNInput(placeholder);
```
*   **Tham số**: `placeholder` (`string`) — Văn bản gợi ý hiển thị mờ khi ô nhập liệu rỗng.

---

## 🛠️ Các phương thức (API)

`MNInput` kế thừa các phương thức từ `BaseComponent`. Phương thức `.append()` bị vô hiệu hóa.

### 1. `.onChange(callback)`
Lắng nghe sự kiện người dùng đang gõ/nhập nội dung (kích hoạt liên tục qua sự kiện `input`).
*   **Tham số**: `callback` (`(value: string) => void`) — Trả về chuỗi ký tự hiện tại.
*   **Trả về**: `this` (cho phép chaining)

```javascript
input.onChange((val) => {
    console.log("Nội dung đang gõ:", val);
});
```

### 2. `.onSubmit(callback)`
Lắng nghe sự kiện người dùng hoàn tất nhập liệu (bấm `Enter` hoặc di chuột ra ngoài ô nhập liệu để kích hoạt sự kiện `change`). Nó cũng tự động gọi `.blur()` để bỏ chọn ô nhập liệu.
*   **Tham số**: `callback` (`(value: string) => void`)
*   **Trả về**: `this`

```javascript
input.onSubmit((val) => {
    MNToast.show(`Đã gửi giá trị: ${val}`, "success");
});
```

### 3. `.onFocus(callback)`
Lắng nghe sự kiện người dùng click chuột/focus vào ô nhập liệu.
*   **Tham số**: `callback` (`(value: string) => void`)
*   **Trả về**: `this`

### 4. `.getValue()`
Lấy chuỗi ký tự hiện đang nhập.
*   **Trả về**: `string`

### 5. `.setValue(value)`
Thiết lập nội dung văn bản cho ô nhập liệu (Kích hoạt sự kiện `input` cập nhật).
*   **Tham số**: `value` (`string`)
*   **Trả về**: `this`

### 6. `.setValueSilently(value)`
Thiết lập nội dung văn bản mà **không** kích hoạt bất kỳ sự kiện hay hàm gọi lại nào.
*   **Tham số**: `value` (`string`)
*   **Trả về**: `this`

### 7. `.persist(storageKey)`
Tự động lưu lại và khôi phục nội dung văn bản đã nhập khi tải lại trang web.
*   **Tham số**: `storageKey` (`string`)
*   **Trả về**: `this`

```javascript
const apiKey = new MNInput("Nhập API Key tại đây...").persist("user_api_key");
```

---

## 📝 Ví dụ sử dụng

```javascript
const form = new MNColumn();

const usernameInput = new MNInput("Nhập tên đăng nhập của bạn")
    .persist("cached_username")
    .onChange((val) => {
        if (val.length < 3) {
            usernameInput.style("border-color: var(--mn-error);");
        } else {
            usernameInput.style("border-color: var(--mn-primary);");
        }
    });

form.append(usernameInput);
```
