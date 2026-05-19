# 📐 MNRow — Bố cục Hàng ngang (Horizontal Flexbox Layout)

`MNRow` là một thẻ chứa (container layout) sắp xếp các thành phần con theo chiều ngang (hàng) sử dụng mô hình Flexbox của CSS. Phù hợp để đặt các nút bấm cạnh nhau hoặc chia nhỏ bố cục màn hình theo chiều ngang.

---

## 💡 Cú pháp khởi tạo

```javascript
const row = new MNRow();
```

---

## 🛠️ Các phương thức (API)

`MNRow` kế thừa tất cả các phương thức từ `BaseComponent`.

### 1. `.append(nodes)`
Thêm các component UI hoặc phần tử DOM vào hàng.
*   **Tham số**: `nodes` (`BaseComponent | HTMLElement | Array<BaseComponent>`)
*   **Trả về**: `this` (cho phép chaining)

```javascript
row.append(new MNButton("Hủy"));
row.append(new MNButton("Đồng ý"));
```

---

## 📝 Ví dụ sử dụng

```javascript
const toolbar = new MNRow().style("justify-content: space-between; align-items: center;");

// Đặt nhãn văn bản ở bên trái và nút bấm ở bên phải hàng
toolbar.append(new MNText("Chế độ ban đêm"));
toolbar.append(new MNSwitch(""));
```
