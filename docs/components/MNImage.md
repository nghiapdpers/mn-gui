# 🖼️ MNImage — Hiển thị ảnh kèm hiệu ứng tải (Image Component)

`MNImage` là một thành phần hiển thị hình ảnh cao cấp được thiết kế riêng cho phiên bản v4.0.0. Nó tích hợp sẵn **hiệu ứng bộ khung tải (Skeleton Loading Placeholder)** giúp tăng trải nghiệm mượt mà khi hình ảnh đang được tải từ internet, đồng thời tự động hiển thị nhãn báo lỗi nếu đường dẫn tải ảnh bị hỏng.

---

## 💡 Cú pháp khởi tạo

```javascript
const image = new MNImage(src, alt, objectFit);
```
*   **Tham số**:
    *   `src` (`string`) — Đường dẫn URL của hình ảnh cần tải.
    *   `alt` (`string`) — Nhãn mô tả văn bản thay thế khi ảnh lỗi hoặc hỗ trợ đọc màn hình.
    *   `objectFit` (`string`) — Thuộc tính CSS `object-fit` định hình ảnh (ví dụ: `"cover"`, `"contain"`, `"fill"`, `"none"`). Mặc định là `"cover"`.

---

## 🛠️ Các phương thức (API)

`MNImage` kế thừa các phương thức từ `BaseComponent`.

### 1. `.setSrc(url)`
Cập nhật đường dẫn hình ảnh mới. Tự động hiển thị lại Skeleton trong quá trình tải ảnh mới.
*   **Tham số**: `url` (`string`)
*   **Trả về**: `this` (cho phép chaining)

```javascript
image.setSrc("https://example.com/new-banner.png");
```

### 2. `.setObjectFit(fit)`
Thay đổi chế độ dàn trang của hình ảnh.
*   **Tham số**: `fit` (`"cover" | "contain" | "fill" | "none"`)
*   **Trả về**: `this`

### 3. `.setHeight(h)`
Thiết lập chiều cao cho phần tử chứa hình ảnh.
*   **Tham số**: `h` (`number | string`) — Nhận giá trị số (pixel) hoặc chuỗi (ví dụ: `"150px"`, `"100%"`).
*   **Trả về**: `this`

### 4. `.setWidth(w)`
Thiết lập chiều rộng cho phần tử chứa hình ảnh.
*   **Tham số**: `w` (`number | string`) — Nhận số (pixel) hoặc chuỗi (ví dụ: `"100px"`, `"100%"`).
*   **Trả về**: `this`

### 5. `.onClick(callback)`
Lắng nghe sự kiện người dùng nhấp chuột vào hình ảnh.
*   **Tham số**: `callback` (`(event: MouseEvent) => void`)
*   **Trả về**: `this`

```javascript
image.onClick(() => {
    MNToast.show("Đã nhấp xem ảnh phóng to!", "info");
});
```

---

## 📝 Ví dụ sử dụng

```javascript
const profileCard = new MNColumn().style("align-items: center; text-align: center; gap: 8px;");

// Khởi tạo avatar tròn với Skeleton khi đang load
const avatar = new MNImage("https://avatars.githubusercontent.com/u/12345678", "User Avatar")
    .setWidth(80)
    .setHeight(80)
    .style("border-radius: 50%; overflow: hidden; border: 2px solid var(--mn-primary);");

const username = new MNText("Nguyen Van A").style("font-weight: bold;");

profileCard.append(avatar);
profileCard.append(username);
```
