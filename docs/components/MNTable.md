# 📊 MNTable — Bảng dữ liệu cấu trúc (Data Table Grid)

`MNTable` là một thành phần hiển thị lưới dữ liệu (Data Grid/Table) có cấu trúc đẹp mắt và chuyên nghiệp. Nó tự động tạo dòng tiêu đề bảng (Header) và lấp đầy các ô dữ liệu (Row Cells) tương ứng dựa trên cấu hình khóa cột linh hoạt.

---

## 💡 Cú pháp khởi tạo

```javascript
const table = new MNTable(columns, initialData);
```
*   **Tham số**:
    *   `columns` (`Array<{ key: string, label: string, width?: string }>`) — Cấu hình các cột hiển thị trong bảng.
        *   `key`: Khóa định danh để đối chiếu lấy dữ liệu của dòng.
        *   `label`: Nhãn tiêu đề cột hiển thị trên thanh Header.
        *   `width`: Độ rộng tùy biến của cột (ví dụ: `"100px"`, `"50%"`).
    *   `initialData` (`Array<Record<string, any>>`) — Mảng danh sách các dòng dữ liệu khởi tạo ban đầu (không bắt buộc).

---

## 🛠️ Các phương thức (API)

`MNTable` kế thừa đầy đủ tất cả phương thức cơ sở từ `BaseComponent`.

### 1. `.setData(data)`
Lập tức làm sạch dữ liệu cũ và cập nhật danh sách các dòng dữ liệu mới hiển thị trên lưới bảng.
*   **Tham số**: `data` (`Array<Record<string, any>>`) — Mảng đối tượng dữ liệu dòng. Khóa của đối tượng phải trùng khớp với `key` đã định nghĩa trong danh sách `columns`.
*   **Trả về**: `this` (cho phép chaining)

```javascript
table.setData([
    { id: 1, name: "Task A", status: "Hoàn thành" },
    { id: 2, name: "Task B", status: "Đang chạy" }
]);
```

### 2. `.renderHeader()`
Hàm tự động kết xuất giao diện thanh Header (Thường được gọi tự động trong hàm khởi tạo).

---

## 📝 Ví dụ sử dụng

```javascript
const container = new MNColumn();

// 1. Định nghĩa cấu trúc cột bảng
const columnsConfig = [
    { key: "username", label: "Tên tài khoản", width: "120px" },
    { key: "gold", label: "Số Vàng", width: "80px" },
    { key: "status", label: "Trạng thái" }
];

// 2. Định nghĩa dữ liệu ban đầu
const initialUsers = [
    { username: "player_one", gold: 15400, status: "Active" },
    { username: "bot_harvester", gold: 99400, status: "Farming" },
    { username: "newbie_zero", gold: 500, status: "Idle" }
];

// 3. Khởi tạo đối tượng bảng
const dataTable = new MNTable(columnsConfig, initialUsers);
container.append(dataTable);

// 4. Cập nhật dữ liệu động sau này từ API hoặc Timer
setTimeout(() => {
    dataTable.setData([
        { username: "player_one", gold: 18000, status: "Active" },
        { username: "bot_harvester", gold: 120500, status: "Farming" },
        { username: "newbie_zero", gold: 1200, status: "Active" }
    ]);
    MNToast.show("Đã cập nhật bảng xếp hạng!", "info");
}, 5000);
```
