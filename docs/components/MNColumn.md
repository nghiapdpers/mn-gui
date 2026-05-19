# 📐 MNColumn — Bố cục Cột dọc (Vertical Flexbox Layout)

`MNColumn` là một thẻ chứa (container layout) sắp xếp các thành phần con theo chiều dọc (cột) sử dụng mô hình Flexbox của CSS. Nó tự động thêm padding hợp lý để các thành phần bên trong không bị dính sát vào nhau hay sát lề.

---

## 💡 Cú pháp khởi tạo

```javascript
const column = new MNColumn();
```

---

## 🛠️ Các phương thức (API)

`MNColumn` kế thừa tất cả các phương thức từ `BaseComponent`.

### 1. `.append(nodes)`
Thêm các component UI hoặc phần tử DOM vào cột.
*   **Tham số**: `nodes` (`BaseComponent | HTMLElement | Array<BaseComponent>`)
*   **Trả về**: `this` (cho phép chaining)

```javascript
column.append(new MNText("Dòng 1"));
column.append(new MNText("Dòng 2"));
```

---

## 📝 Ví dụ sử dụng

```javascript
const formLayout = new MNColumn();

// Thêm các input xếp theo chiều dọc
formLayout.append(new MNInput("Họ và tên"));
formLayout.append(new MNInput("Email"));
formLayout.append(new MNButton("Gửi"));
```
