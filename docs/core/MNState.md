# 🔄 MNState — Quản lý Trạng thái & Ràng buộc Dữ liệu (Reactive Data Binding)

`MNState` cung cấp cơ chế quản lý trạng thái phản hồi (Reactive State) và liên kết dữ liệu hai chiều (Two-way Data Binding) đơn giản nhưng cực kỳ mạnh mẽ cho MNGUI. Nó hoạt động theo mô hình Observable giúp đồng bộ hóa dữ liệu lập tức giữa các biến logic JS và giao diện hiển thị mà không cần lập trình viên phải gọi hàm cập nhật DOM thủ công.

---

## 💡 Cú pháp khởi tạo

```javascript
const state = new MNState(initialValue);
```
*   **Tham số**: `initialValue` (`any`) — Giá trị khởi tạo mặc định ban đầu của State (nhận chuỗi, số, boolean, mảng, đối tượng...).

---

## 🛠️ Các thuộc tính & Phương thức (API)

### 1. `.value` (Getter & Setter)
Thuộc tính chứa giá trị hiện tại của State.
*   **Đọc giá trị**: `state.value`
*   **Ghi giá trị**: `state.value = newValue` (Khi gán giá trị mới, tất cả các component UI đang liên kết hoặc các hàm đang đăng ký lắng nghe sẽ lập tức nhận được giá trị mới và tự động cập nhật hiển thị).

```javascript
const nameState = new MNState("Nghia");
console.log(nameState.value); // In ra: Nghia

nameState.value = "Antigravity"; // Lập tức cập nhật các component đang bind!
```

### 2. `.subscribe(callback)`
Đăng ký lắng nghe sự thay đổi của State thủ công.
*   **Tham số**: `callback` (`(newValue: any) => void`) — Hàm xử lý chạy mỗi khi giá trị State thay đổi.
*   **Trả về**: `unsubscribe` (`function`) — Hàm dùng để hủy đăng ký lắng nghe để tránh rò rỉ bộ nhớ (Memory Leak).

```javascript
const countState = new MNState(0);

const unsubscribe = countState.subscribe((newVal) => {
    console.log("Giá trị count thay đổi thành:", newVal);
});

countState.value = 1; // Console in ra: Giá trị count thay đổi thành: 1

// Hủy lắng nghe sau này
unsubscribe();
```

### 3. `.bind(state)` (Phương thức trên các UI Component)
Phương thức liên kết dữ liệu hai chiều giữa một UI Component (như `MNInput`, `MNSwitch`, `MNText`,...) với thực thể `MNState`.
*   **Tham số**: `state` (`MNState`)
*   **Trả về**: `this` (của UI Component)

```javascript
// State thay đổi -> Ô nhập liệu tự thay đổi chữ
// Người dùng gõ chữ vào ô nhập liệu -> State tự cập nhật giá trị theo
const textInput = new MNInput("Nhập nội dung...").bind(state);
```

---

## 📝 Ví dụ sử dụng phong phú

### 1. Liên kết 2 chiều giữa Ô nhập liệu và Nhãn chữ hiển thị
```javascript
const mainScreen = new MNScreen();
const column = new MNColumn();

// Khởi tạo state chung
const textState = new MNState("Hello MNGUI");

// Bind state với ô nhập liệu
const myInput = new MNInput("Nhập gì đó...").bind(textState);
column.append(myInput);

// Bind state với nhãn chữ hiển thị (Một chiều: State -> Text)
const myLabel = new MNText().bind(textState).style("font-size: 16px; font-weight: bold; color: var(--mn_primary);");
column.append(myLabel);

// Khi người dùng gõ vào myInput, myLabel sẽ tự động thay đổi chữ tức thì!
mainScreen.append(column);
```

### 2. Đồng bộ tùy chọn cấu hình Bot
```javascript
const isBotRunning = new MNState(false);

const botToggle = new MNSwitch("Bật bot tự động").bind(isBotRunning);

const startBtn = new MNButton("Khởi chạy").onClick(() => {
    isBotRunning.value = true; // Sẽ tự động bật Switch gạt trên màn hình!
});

isBotRunning.subscribe((running) => {
    if (running) {
        startBotExecution();
    } else {
        stopBotExecution();
    }
});
```
