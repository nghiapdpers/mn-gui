# Quy chuẩn Thiết kế Component MNGUI (Component & Design System Guidelines)

MNGUI hướng tới trải nghiệm thiết kế Glassmorphism cực kỳ cao cấp, mượt mà và trực quan. Hãy tuân thủ nghiêm ngặt các quy tắc thiết kế dưới đây khi sửa đổi hoặc tạo mới các component giao diện.

---

## 1. Thiết kế Glassmorphism chuẩn Crystal (0.4 Opacity)

MNGUI sử dụng hiệu ứng kính mờ trong suốt thế hệ mới. Toàn bộ các mảng giao diện chính (như Popup, Dropdown Select, Accordion) bắt buộc phải tuân theo cấu hình:

- **Độ trong suốt nền (Translucent Surface)**:
  - **🌞 Light Mode**: `--mn_surface` = `rgba(255, 255, 255, 0.4)`
  - **🌙 Slate Dark Mode**: `--mn_surface` = `rgba(15, 23, 42, 0.4)` (Kính Slate đen trong suốt).
- **Bộ lọc kính mờ (Backdrop Blur Filter)**:
  - Bắt buộc khai báo: `backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);` để làm mờ nhẹ hậu cảnh dưới lớp kính, giữ độ tương phản cao cho chữ.
- **Viền sáng tinh tế (Inner Glow Border)**:
  - Sử dụng viền mảnh `1px solid var(--mn_border)` để làm điểm nhấn phản chiếu ở cạnh kính.

---

## 2. Quy tắc Định màu CSS (Color System Guardrails)

> [!IMPORTANT]
> **TUYỆT ĐỐI KHÔNG SỬ DỤNG MÃ MÀU TĨNH (HARDCODED COLORS)** như `#10b981`, `#0f172a`, hoặc `#ffffff` trong mã nguồn CSS của component. 

Tất cả các màu sắc hiển thị phải liên kết trực tiếp với hệ thống biến CSS tùy biến (Custom Properties) để giao diện có thể thay đổi mượt mà khi người dùng đổi Accent Color hoặc chuyển chế độ Sáng/Tối:

- `--mn_primary`: Màu chủ đạo / Màu thương hiệu (Accent Color, ví dụ: màu xanh lá hoặc màu cam).
- `--mn_primaryVariant`: Phiên bản đậm hơn của màu chủ đạo (dùng cho hover/active).
- `--mn_background`: Màu nền chính của ứng dụng.
- `--mn_surface`: Màu nền dạng kính mờ (Glassmorphism).
- `--mn_surface_solid`: Màu nền đặc (không có kính mờ, dùng làm nền phụ).
- `--mn_border`: Màu viền mảnh phân tách.
- `--mn_radius`: Độ bo góc chuẩn (mặc định là `12px`).
- `--mn_font`: Hệ phông chữ mặc định của hệ thống.

---

## 3. Quy chuẩn Bố cục & Đồng hàng (Layout Rules)

- **Sử dụng Flexbox và Gap**:
  - Không sử dụng tọa độ tĩnh hoặc đệm padding cứng (`padding-left: 30px`) để căn chỉnh các thành phần con.
  - Sử dụng bố cục Flexbox hiện đại (`display: flex; align-items: center; gap: Xpx;`) để các phần tử tự động co giãn và căn chỉnh thẳng hàng tuyệt đối.
- **Quy tắc cho MNCheckbox**:
  - Checkbox **bắt buộc** phải có dạng tròn (`border-radius: 50%`) thay vì hình vuông bo góc.
  - Checkbox và nhãn chữ đi kèm phải nằm **cùng một hàng ngang** trên mọi kích thước màn hình nhờ bố cục `display: flex; align-items: center; gap: 10px;`.
- **Bố cục Responsive**:
  - Trên màn hình máy tính (Desktop), giao diện tài liệu hiển thị dạng cột Sidebar bên trái và nội dung bên phải.
  - Trên thiết bị di động (Mobile / Screen `< 900px`), Sidebar dọc tự động chuyển thành thanh Tabs cuộn ngang ở đầu trang tài liệu, tự động ẩn thanh cuộn mảnh để mang lại trải nghiệm vuốt chạm mượt mà nhất.
