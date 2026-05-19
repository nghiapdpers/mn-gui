# 🎲 Popup — Container nổi & Hộp thoại chính

`Popup` là lớp quản lý khung giao diện nổi chính hiển thị trên màn hình trang web cha. Lớp này hỗ trợ kéo thả tự do, gộp tiêu đề, nút thu nhỏ/phóng to giao diện và cấu hình phím tắt đóng mở nhanh.

---

## 🛠️ Các phương thức cấu hình (API)

Lập trình viên cấu hình Popup thông qua thuộc tính `gui.popup` của đối tượng MNGUI.

### 1. `.setTitle(text)`
Thay đổi tiêu đề hiển thị trên thanh Header kéo thả của Popup.
*   **Tham số**: `text` (`string`)

```javascript
gui.popup.setTitle("⚙️ BẢNG ĐIỀU KHIỂN AUTO");
```

### 2. `.setIcon(emojiOrUrl)`
Thay đổi ký tự/biểu tượng hiển thị bên trong nút nổi tròn mở nhanh bảng điều khiển ở góc dưới màn hình.
*   **Tham số**: `emojiOrUrl` (`string`) — Mặc định là `"🎲"`.

```javascript
gui.popup.setIcon("⚡");
```

### 3. `.setPopupSize(width, height)`
Thiết lập kích thước chiều rộng và chiều cao cho khung Popup giao diện khi mở ra.
*   **Tham số**:
    *   `width` (`string`) — Chiều rộng (ví dụ: `"360px"`, `"400px"`). Mặc định là `"360px"`.
    *   `height` (`string`) — Chiều cao (ví dụ: `"480px"`, `"550px"`). Mặc định là `"480px"`.

```javascript
gui.popup.setPopupSize("400px", "520px");
```

### 4. `.setPopupPosition(top, right, bottom, left)`
Thiết lập vị trí cố định của Popup khi hiển thị trên màn hình trình duyệt (Truyền giá trị trống `""` để bỏ qua).
*   **Mặc định**: `right: "20px"`, `bottom: "80px"`.

```javascript
gui.popup.setPopupPosition("", "30px", "100px", "");
```

### 5. `.setToggleSize(width, height)`
Thay đổi kích thước của nút bấm nổi (Toggle Button) dùng để bật/tắt bảng điều khiển ở góc màn hình.
*   **Mặc định**: `50px` x `50px`.

```javascript
gui.popup.setToggleSize("60px", "60px");
```

### 6. `.setTogglePosition(top, right, bottom, left)`
Thiết lập vị trí của nút bấm nổi mở nhanh trên màn hình.
*   **Mặc định**: `right: "20px"`, `bottom: "20px"`.

```javascript
gui.popup.setTogglePosition("", "20px", "20px", "");
```

### 7. `.setShortcut(combination)`
Định nghĩa tổ hợp phím tắt để ẩn/hiện nhanh bảng điều khiển bất cứ lúc nào.
*   **Tham số**: `combination` (`string`) — Mặc định là `"Alt + M"`. Các phím bổ trợ hỗ trợ bao gồm `Ctrl`, `Shift`, `Alt`.

```javascript
gui.popup.setShortcut("Ctrl + Shift + X");
```

### 8. `.hideToggle()`
Ẩn hoàn toàn nút tròn nổi mở nhanh ở góc màn hình (Thường sử dụng khi bạn muốn người dùng chỉ được phép bật/tắt giao diện thông qua phím tắt để đảm bảo mỹ quan tối đa).
*   *Lưu ý: Phương thức này sẽ bị bỏ qua trên thiết bị di động/màn hình cảm ứng để tránh việc người dùng không có bàn phím cứng để nhấn phím tắt.*

```javascript
gui.popup.hideToggle();
```

### 9. `.onShow(callback)` & `.onClose(callback)`
Lắng nghe sự kiện khi bảng điều khiển được phóng to ra hoặc thu nhỏ đóng lại.
*   **Tham số**: `callback` (`function`)

```javascript
gui.popup.onShow(() => {
    console.log("Bảng điều khiển đã mở rộng hiển thị!");
});
```

---

## 🖱️ Cơ chế kéo thả (Draggable)
MNGUI tích hợp sẵn cơ chế kéo thả mượt mà trên cả máy tính (chuột mousedown/mousemove) lẫn thiết bị di động (touchstart/touchmove). 
Người dùng chỉ cần nhấp giữ chuột vào bất kỳ vùng trống nào trên thanh **Header** (nơi chứa tiêu đề) để di chuyển tự do bảng điều khiển đi khắp màn hình để không che khuất các nút bấm hay dữ liệu quan trọng của trang web gốc. Vị trí sau khi kéo thả sẽ cố định tạm thời cho đến khi tải lại trang.
