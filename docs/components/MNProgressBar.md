# 📊 MNProgressBar — Thanh tiến trình (Progress Bar Component)

`MNProgressBar` cung cấp một thanh biểu diễn tiến độ phần trăm (Progress Bar) tuyệt đẹp, mượt mà và trực quan. Lập trình viên có thể sử dụng thành phần này để hiển thị trạng thái hoàn thành của một tác vụ chạy nền (như tải tài nguyên, gửi yêu cầu hàng loạt hoặc trạng thái tiến trình bot tự động).

---

## 💡 Cú pháp khởi tạo

```javascript
const progress = new MNProgressBar(initialValue, showLabel);
```
*   **Tham số**:
    *   `initialValue` (`number`) — Giá trị tiến độ khởi tạo ban đầu (trong khoảng từ `0` đến `100`). Mặc định là `0`.
    *   `showLabel` (`boolean`) — Có hiển thị số chỉ phần trăm dưới dạng văn bản (ví dụ: `45%`) bên dưới thanh tiến độ hay không. Mặc định là `true`.

---

## 🛠️ Các phương thức (API)

`MNProgressBar` kế thừa các phương thức từ `BaseComponent`.

### 1. `.setValue(percent)`
Cập nhật giá trị phần trăm tiến độ mới cho thanh tiến trình.
*   **Tham số**: `percent` (`number`) — Giá trị số phần trăm tiến độ mới (Tự động kẹp trong khoảng `0` - `100`).
*   **Trả về**: `this` (cho phép chaining)

```javascript
progress.setValue(75); // Lập tức tăng thanh tiến độ lên 75%
```

---

## 📝 Ví dụ sử dụng

```javascript
const layout = new MNColumn();
layout.append(new MNText("Đang tải dữ liệu script...").style("font-weight: 500;"));

// Tạo thanh tiến trình khởi đầu 0% có kèm nhãn hiển thị số
const loadingBar = new MNProgressBar(0, true);
layout.append(loadingBar);

// Giả lập tiến trình tải dữ liệu tăng dần
let currentPercent = 0;
const interval = setInterval(() => {
    currentPercent += 10;
    loadingBar.setValue(currentPercent);
    
    if (currentPercent >= 100) {
        clearInterval(interval);
        MNToast.show("Đã tải xong toàn bộ dữ liệu!", "success");
    }
}, 500);
```
