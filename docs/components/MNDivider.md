# ➖ MNDivider — Thanh phân tách (Visual Divider)

`MNDivider` cung cấp một đường kẻ ngang mảnh và thẩm mỹ (CSS styled horizontal rule) dùng để ngăn cách, chia nhỏ các khu vực chức năng hoặc nhóm thông tin trên bảng điều khiển giao diện, giúp tổng thể layout trở nên thoáng đãng và có tính phân cấp cao hơn.

---

## 💡 Cú pháp khởi tạo

```javascript
const divider = new MNDivider();
```

---

## 🛠️ Các phương thức (API)

`MNDivider` kế thừa các phương thức từ `BaseComponent`. Phương thức `.append()` bị vô hiệu hóa vì đây là thẻ kẻ đơn thuần.

---

## 📝 Ví dụ sử dụng

```javascript
const panel = new MNColumn();

panel.append(new MNText("THÔNG TIN CƠ BẢN").style("font-size: 14px; font-weight: bold;"));

// Kẻ ngăn cách
panel.append(new MNDivider());

panel.append(new MNText("Họ và tên: Nguyen Van A"));
panel.append(new MNText("Cấp độ tài khoản: Vip"));

// Kẻ ngăn cách tiếp theo
panel.append(new MNDivider().style("margin-top: 15px; margin-bottom: 15px;"));

panel.append(new MNButton("Nâng cấp tài khoản"));
```
