# 🗹 MNCheckbox — Hộp kiểm chọn (Checkbox Component)

`MNCheckbox` cung cấp hộp kiểm chọn truyền thống được thiết kế lại đẹp mắt theo phong cách hiện đại. Thành phần này rất thích hợp cho việc cấu hình bật/tắt các tùy chọn phụ hoặc các điều kiện lọc.

---

## 💡 Cú pháp khởi tạo

```javascript
const checkbox = new MNCheckbox(title, defaultValue);
```
*   **Tham số**:
    *   `title` (`string`) — Văn bản hiển thị bên cạnh hộp kiểm.
    *   `defaultValue` (`boolean`) — Trạng thái kiểm chọn mặc định (`true` hoặc `false`). Mặc định là `false`.

---

## 🛠️ Các phương thức (API)

`MNCheckbox` kế thừa các phương thức từ `BaseComponent`. Phương thức `.append()` bị vô hiệu hóa vì đây là thành phần input đầu cuối.

### 1. `.onChange(callback)`
Lắng nghe sự kiện thay đổi trạng thái chọn.
*   **Tham số**: `callback` (`(checked: boolean) => void`) — Hàm xử lý với tham số là trạng thái kiểm mới.
*   **Trả về**: `this` (cho phép chaining)

```javascript
checkbox.onChange((checked) => {
    console.log("Checkboxchecked:", checked);
});
```

### 2. `.getValue()`
Lấy trạng thái chọn hiện tại.
*   **Trả về**: `boolean`

### 3. `.setValue(value)`
Thay đổi trạng thái chọn và kích hoạt sự kiện `change`.
*   **Tham số**: `value` (`boolean`)
*   **Trả về**: `this`

### 4. `.setValueSilently(value)`
Thay đổi trạng thái chọn mà **không** kích hoạt sự kiện `change` (Được dùng bởi hệ thống khi khôi phục từ Storage).
*   **Tham số**: `value` (`boolean`)
*   **Trả về**: `this`

### 5. `.persist(storageKey)`
Tự động ghi nhớ và phục hồi trạng thái hộp kiểm khi người dùng tải lại trang web.
*   **Tham số**: `storageKey` (`string`)
*   **Trả về**: `this`

```javascript
const checkbox = new MNCheckbox("Tự động cuộn trang", true).persist("scroll_persistence");
```

---

## 📝 Ví dụ sử dụng

```javascript
const filterGroup = new MNColumn();

filterGroup.append(new MNText("Lọc dữ liệu:").style("font-weight: 600; margin-bottom: 6px;"));

const filter1 = new MNCheckbox("Chỉ hiện bài viết mới", false)
    .persist("filter_new_posts")
    .onChange((checked) => {
        console.log("Lọc bài viết mới:", checked);
    });

const filter2 = new MNCheckbox("Chỉ hiện người dùng online", false)
    .persist("filter_online_users")
    .onChange((checked) => {
        console.log("Lọc người dùng online:", checked);
    });

filterGroup.append(filter1);
filterGroup.append(filter2);
```
