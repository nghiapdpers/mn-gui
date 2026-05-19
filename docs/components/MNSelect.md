# 📑 MNSelect — Trình chọn thả xuống (Dropdown Select)

`MNSelect` cung cấp một trình chọn thả xuống (Dropdown Select) tùy biến giao diện mượt mà và trực quan, hỗ trợ thiết lập nguồn dữ liệu phong phú, chọn mặc định, đồng bộ trạng thái lưu trữ tự động.

---

## 💡 Cú pháp khởi tạo

```javascript
const select = new MNSelect(placeholder);
```
*   **Tham số**: `placeholder` (`string`) — Nhãn văn bản gợi ý ban đầu khi chưa chọn giá trị nào.

---

## 🛠️ Các phương thức (API)

`MNSelect` kế thừa các phương thức từ `BaseComponent`. Phương thức `.append()` bị vô hiệu hóa.

### 1. `.setData(data)`
Thiết lập danh sách các tùy chọn cho Dropdown.
*   **Tham số**: `data` (`Array<string | number | { id: string|number, name: string }>`) — Nguồn dữ liệu chứa danh sách lựa chọn. Nếu truyền mảng các chuỗi/số, `id` và `name` sẽ giống nhau.
*   **Trả về**: `this` (cho phép chaining)

```javascript
select.setData([
    { id: "fast", name: "Chạy nhanh (0.5 giây)" },
    { id: "normal", name: "Chạy thường (1.5 giây)" },
    { id: "slow", name: "Chạy chậm (3.0 giây)" }
]);
```

### 2. `.onChange(callback)`
Lắng nghe sự kiện người dùng click chọn một tùy chọn trong danh sách thả xuống.
*   **Tham số**: `callback` (`(id: string | number, text: string) => void`) — Hàm xử lý trả về `id` và `text` của tùy chọn đã click.
*   **Trả về**: `this`

```javascript
select.onChange((id, name) => {
    console.log(`Đã chọn phương thức: ${name} (ID: ${id})`);
});
```

### 3. `.getValue()`
Lấy `id` của tùy chọn hiện tại đang được chọn.
*   **Trả về**: `string | number`

### 4. `.setValue(id)`
Thiết lập tùy chọn đang chọn dựa trên `id` và phát sự kiện `change`.
*   **Tham số**: `id` (`string | number`)
*   **Trả về**: `this`

### 5. `.setValueSilently(id)`
Thiết lập tùy chọn mà **không** phát sự kiện kích hoạt (Được sử dụng bởi cơ chế State Persistence).
*   **Tham số**: `id` (`string | number`)
*   **Trả về**: `this`

### 6. `.persist(storageKey)`
Tự động ghi nhớ và khôi phục giá trị đã chọn sau khi tải lại trang web.
*   **Tham số**: `storageKey` (`string`)
*   **Trả về**: `this`

```javascript
const mode = new MNSelect("Chọn chế độ")
    .setData(["Easy", "Normal", "Hard"])
    .persist("game_difficulty_mode");
```

---

## 📝 Ví dụ sử dụng

```javascript
const selectLayout = new MNColumn();

const serverSelect = new MNSelect("Chọn Server kết nối")
    .setData([
        { id: "asia-1", name: "Châu Á - Asia Singapore" },
        { id: "us-west", name: "Mỹ - US California" },
        { id: "eu-central", name: "Châu Âu - Frankfurt" }
    ])
    .persist("cached_selected_server")
    .onChange((id, text) => {
        MNToast.show(`Đang chuyển sang server: ${text}`, "info");
    });

selectLayout.append(serverSelect);
```
