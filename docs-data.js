/**
 * MNGUI Premium Interactive Documentation Database
 * Contains Markdown content for both Vietnamese (VI) and English (EN) languages.
 * Component icons have been removed from the main titles.
 */
window.MNGUIDocsData = {
  core: [
    {
      id: "mngui",
      name: "MNGUI",
      icon: "⚙️",
      vi: `# MNGUI — Lớp quản trị trung tâm (Main Controller)

\`MNGUI\` là lớp điều khiển trung tâm và là entry-point của toàn bộ hệ thống giao diện. Lớp này chịu trách nhiệm kết hợp \`Theme\`, \`Popup\` và \`StackNavigator\` để khởi dựng, quản lý vòng đời và hiển thị giao diện người dùng lên trang web.

---

## 💡 Cú pháp khởi tạo

\`\`\`javascript
const gui = new MNGUI();
\`\`\`

---

## 🛠️ Các thuộc tính & Phương thức (API)

### 1. \`gui.theme\`
Đối tượng quản lý giao diện (\`Theme\`) liên kết trực tiếp với hệ thống. Cho phép tùy biến màu sắc và chế độ sáng/tối.
*   **Kiểu dữ liệu**: [Theme](Theme.md)

### 2. \`gui.popup\`
Đối tượng hộp thoại chứa giao diện nổi (\`Popup\`). Cho phép thay đổi tiêu đề, kích thước, biểu tượng nút mở và phím tắt.
*   **Kiểu dữ liệu**: [Popup](Popup.md)

### 3. \`.setNavigator(navigator)\`
Liên kết bộ định tuyến màn hình (\`StackNavigator\`) với hệ thống điều khiển.
*   **Tham số**: \`navigator\` (\`StackNavigator\`)
*   **Trả về**: \`this\` (cho phép chaining)

### 4. \`.navigation(screenName)\`
Điều hướng chuyển đổi màn hình hiện tại sang màn hình mới có tên \`screenName\` (Tự động kích hoạt hiệu ứng slide chuyển cảnh).
*   **Tham số**: \`screenName\` (\`string\`)

### 5. \`.back()\`
Quay trở lại màn hình trước đó trong ngăn xếp màn hình (stack).

### 6. \`.render()\`
Kết xuất (Render) toàn bộ các phần tử giao diện, tiêm Shadow DOM vào trang web cha và lắng nghe phím tắt mở nhanh.

---

## 📝 Ví dụ sử dụng

\`\`\`javascript
const gui = new MNGUI();
gui.popup.setTitle("🎲 Tool Auto Farm");
gui.popup.setPopupSize("380px", "520px");

const mainScreen = new MNScreen().append(new MNButton("Mở Cài Đặt").onClick(() => {
    gui.navigation("settings");
}));

const settingsScreen = new MNScreen().append(new MNButton("Quay lại").onClick(() => {
    gui.back();
}));

const navigator = new StackNavigator([
    { name: "main", component: mainScreen },
    { name: "settings", component: settingsScreen }
], "main");

gui.setNavigator(navigator);
gui.render();
\`\`\``,
      en: `# MNGUI — Central Entry-Point Controller

\`MNGUI\` is the central orchestrator and main entry-point of the entire library. It handles integration between the \`Theme\`, \`Popup\` modal container, and \`StackNavigator\` router to instantiate, manage lifecycle, and mount the UI onto the webpage body.

---

## 💡 Initialization

\`\`\`javascript
const gui = new MNGUI();
\`\`\`

---

## 🛠️ API & Properties

### 1. \`gui.theme\`
The active [Theme](Theme.md) instance controlling color schemes and Light/Dark modes.

### 2. \`gui.popup\`
The [Popup](Popup.md) floating panel wrapper containing the window dimensions, grab header title, toggle buttons, and shortcut combinations.

### 3. \`.setNavigator(navigator)\`
Binds the active routing navigator instance to the controller.
*   **Parameters**: \`navigator\` (\`StackNavigator\`)
*   **Returns**: \`this\` (chainable)

### 4. \`.navigation(screenName)\`
Transitions from the current visible screen to the target screen (automatically triggers slide animations).
*   **Parameters**: \`screenName\` (\`string\`)

### 5. \`.back()\`
Pops the current screen off the stack, transitioning backward to the previous screen.

### 6. \`.render()\`
Compiles all components, injects the isolated Shadow DOM host into the webpage body, and hooks shortcut key events.

---

## 📝 Concrete Example

\`\`\`javascript
const gui = new MNGUI();
gui.popup.setTitle("🎲 Auto Farming Tool");
gui.popup.setPopupSize("380px", "520px");

const mainScreen = new MNScreen().append(new MNButton("Open Settings").onClick(() => {
    gui.navigation("settings");
}));

const settingsScreen = new MNScreen().append(new MNButton("Go Back").onClick(() => {
    gui.back();
}));

const navigator = new StackNavigator([
    { name: "main", component: mainScreen },
    { name: "settings", component: settingsScreen }
], "main");

gui.setNavigator(navigator);
gui.render();
\`\`\``
    },
    {
      id: "theme",
      name: "Theme",
      icon: "🎨",
      vi: `# Theme — Quản lý Màu sắc & Chế độ Sáng/Tối

Lớp \`Theme\` chịu trách nhiệm cấu hình hệ thống bảng màu (mặc định là Mint Green & Slate Dark), tiêm thẻ CSS core vào Shadow DOM, tự động phát hiện tùy chọn của hệ thống và chuyển đổi giữa Light/Dark Mode mượt mà.

---

## 💡 Cú pháp khởi tạo tùy biến

Nếu không truyền tham số, MNGUI sẽ sử dụng hệ màu **Mint Green** mặc định. Bạn có thể truyền các giá trị Hex tùy biến vào constructor:

\`\`\`javascript
const customTheme = new Theme(
    primary, primaryVariant, secondary, secondaryVariant, 
    background, surface, error, onPrimary, onSecondary, 
    onBackground, onSurface, onError
);
\`\`\`

---

## 🛠️ Các phương thức (API)

### 1. \`.setMode(mode)\`
Thay đổi chế độ giao diện của bảng điều khiển. Lựa chọn sẽ được tự động lưu lại vào bộ nhớ thông qua \`StatePersistence\` để khôi phục sau này.
*   **Tham số**: \`mode\` (\`"light" | "dark" | "auto"\`)

### 2. \`.toggleMode()\`
Chuyển đổi qua lại lập tức giữa Light Mode và Dark Mode.

---

## 🎨 Hệ biến CSS Variable sử dụng trong Custom Style

MNGUI xuất bản các biến màu sắc CSS để bạn có thể sử dụng khi gọi phương thức \`.style()\` trên các component:

| Biến CSS | Mô tả |
| :--- | :--- |
| \`var(--mn_primary)\` | Màu xanh Mint chính |
| \`var(--mn_background)\` | Màu nền chính |
| \`var(--mn_surface)\` | Nền kính mờ (Glassmorphism) |
| \`var(--mn_border)\` | Màu đường viền |
| \`var(--mn_onSurface)\` | Màu chữ chính |
| \`var(--mn_radius)\` | Bo góc mặc định (12px) |`,
      en: `# Theme — Colors & Dark Mode Manager

The \`Theme\` module configures the global color palette (Slate Dark and Mint Green by default), injects CSS variables into the Shadow DOM, automatically detects user operating system light/dark settings, and provides smooth hot-swapping toggle methods.

---

## 💡 Custom Color Scheme Initialization

Without arguments, the standard highly polished **Mint Green & Slate** palette is loaded. You can supply custom HEX code colors to the constructor:

\`\`\`javascript
const customTheme = new Theme(
    primary, primaryVariant, secondary, secondaryVariant, 
    background, surface, error, onPrimary, onSecondary, 
    onBackground, onSurface, onError
);
\`\`\`

---

## 🛠️ Methods (API)

### 1. \`.setMode(mode)\`
Forces a specific visual layout. The selection automatically persists in storage using \`StatePersistence\` for future page requests.
*   **Parameters**: \`mode\` (\`"light" | "dark" | "auto"\`)

### 2. \`.toggleMode()\`
Swaps between Light Mode and Dark Mode instantly.

---

## 🎨 Global CSS Styling Custom Properties

Use these semantic properties when calling \`.style()\` on any component:

| CSS Variable | Description |
| :--- | :--- |
| \`var(--mn_primary)\` | Main accent branding color |
| \`var(--mn_background)\` | Page card background |
| \`var(--mn_surface)\` | Semitransparent Glassmorphism backdrop |
| \`var(--mn_border)\` | Border contour |
| \`var(--mn_onSurface)\` | Primary text copy color |
| \`var(--mn_radius)\` | Default corner rounded corner radius (12px) |`
    },
    {
      id: "popup",
      name: "Popup",
      icon: "🎲",
      vi: `# Popup — Container nổi & Hộp thoại chính

\`Popup\` là lớp quản lý khung giao diện nổi chính hiển thị trên màn hình trang web cha. Lớp này hỗ trợ kéo thả tự do, gộp tiêu đề, nút thu nhỏ/phóng to giao diện và cấu hình phím tắt đóng mở nhanh.

---

## 🛠️ Các phương thức cấu hình (API)

Lập trình viên cấu hình Popup thông qua thuộc tính \`gui.popup\` của đối tượng MNGUI.

### 1. \`.setTitle(text)\`
Thay đổi tiêu đề hiển thị trên thanh Header kéo thả của Popup.

### 2. \`.setIcon(emojiOrUrl)\`
Thay đổi ký tự/biểu tượng hiển thị bên trong nút nổi tròn mở nhanh bảng điều khiển ở góc dưới màn hình.

### 3. \`.setPopupSize(width, height)\`
Thiết lập kích thước chiều rộng và chiều cao cho khung Popup giao diện khi mở ra. Mặc định là \`360px\` x \`480px\`.

### 4. \`.setPopupPosition(top, right, bottom, left)\`
Thiết lập vị trí cố định của Popup khi hiển thị trên màn hình trình duyệt.

### 5. \`.setToggleSize(width, height)\`
Thay đổi kích thước của nút bấm nổi (Toggle Button) dùng để bật/tắt bảng điều khiển ở góc màn hình.

### 6. \`.setShortcut(combination)\`
Định nghĩa tổ hợp phím tắt để ẩn/hiện nhanh bảng điều khiển bất cứ lúc nào. Mặc định là \`"Alt + M"\`.

### 7. \`.hideToggle()\`
Ẩn hoàn toàn nút tròn nổi mở nhanh ở góc màn hình.

### 8. \`.onShow(callback)\` & \`.onClose(callback)\`
Lắng nghe sự kiện khi bảng điều khiển được phóng to ra hoặc thu nhỏ đóng lại.

---

## 🖱️ Cơ chế kéo thả (Draggable)
MNGUI tích hợp sẵn cơ chế kéo thả mượt mà trên cả máy tính (chuột mousedown/mousemove) lẫn thiết bị di động (touchstart/touchmove). Người dùng chỉ cần nhấp giữ chuột vào bất kỳ vùng trống nào trên thanh **Header** để di chuyển tự do.`,
      en: `# Popup — Floating Window & Grab Container

\`Popup\` oversees the viewport presentation layers. It contains drag-and-drop mechanisms, window resize configurations, toggle icon anchors, event hooks, and global hardware keyboard shortcut listeners.

---

## 🛠️ API Methods

Configure these properties on the MNGUI controller via \`gui.popup\`.

### 1. \`.setTitle(text)\`
Changes the title displayed on the draggable top grab header.

### 2. \`.setIcon(emojiOrUrl)\`
Changes the floating round anchor button's character/image in the corner. Default is \`"🎲"\`.

### 3. \`.setPopupSize(width, height)\`
Resizes the main panel when expanded. Defaults to \`360px\` x \`480px\`.

### 4. \`.setPopupPosition(top, right, bottom, left)\`
Positions the panel on the webpage. Defaults to \`right: "20px"\`, \`bottom: "80px"\`.

### 5. \`.setToggleSize(width, height)\`
Alters the floating round anchor button dimensions.

### 6. \`.setShortcut(combination)\`
Configures keys to toggle the panel on the fly. Default is \`"Alt + M"\`. Supports modifier keywords like \`Ctrl\`, \`Shift\`, and \`Alt\`.

### 7. \`.hideToggle()\`
Completely hides the floating round anchor button.

### 8. \`.onShow(callback)\` & \`.onClose(callback)\`
Binds hooks called when the window pops open or collapses.

---

## 🖱️ Draggable Handling
MNGUI has smooth dragging handling written out-of-the-box supporting both desktop click-dragging and touch screens (smart phone touch gestures). Touch or hold anywhere inside the **Header** title block to slide it freely.`
    },
    {
      id: "stacknavigator",
      name: "StackNavigator",
      icon: "🧭",
      vi: `# StackNavigator — Định tuyến màn hình (Routing Stack)

\`StackNavigator\` là bộ định tuyến (Router) dạng ngăn xếp (Stack) của MNGUI. Nó quản lý quá trình chuyển đổi qua lại giữa các màn hình giao diện (\`MNScreen\`) kèm hiệu ứng trượt chuyển dịch mượt mà và tự động dọn dẹp bộ nhớ các màn hình đã đóng.

---

## 💡 Cú pháp khởi tạo

\`\`\`javascript
const navigator = new StackNavigator(screens, initialScreenName);
\`\`\`
*   **screens**: Mảng chứa danh sách màn hình \`{ name: string, component: BaseComponent }\`.
*   **initialScreenName**: Tên màn hình hiển thị mặc định đầu tiên.

---

## 🛠️ Các phương thức (API)

Lập trình viên điều hướng thông qua đối tượng MNGUI chính:

### 1. \`gui.navigation(screenName)\`
Mở màn hình mới có tên định danh \`screenName\`.
*   Nếu \`screenName\` **chưa có** trong ngăn xếp: Màn hình hiện tại sẽ trượt ẩn sang bên trái, màn hình mới được đẩy (push) vào stack và trượt hiển thị vào từ bên phải.
*   Nếu \`screenName\` **đã tồn tại** trong ngăn xếp (lịch sử): Bộ định tuyến sẽ tự động quay lui (pop) ngược lại màn hình đó. Toàn bộ các màn hình nằm phía trên nó trong stack sẽ tự động bị gọi hàm hủy \`.destroy()\` để giải phóng tài nguyên.

### 2. \`gui.back()\`
Lập tức đóng màn hình hiện tại và quay trở về màn hình liền kề phía trước đó.`,
      en: `# StackNavigator — View Routing Stack Controller

\`StackNavigator\` manages the panel routing context using stack hierarchies. It handles screen animations, slide-in/slide-out behaviors, history contexts, and active garbage-collection of popped components.

---

## 💡 Initialization

\`\`\`javascript
const navigator = new StackNavigator(screens, initialScreenName);
\`\`\`
*   **screens**: Array of screen definitions: \`{ name: string, component: BaseComponent }\`.
*   **initialScreenName**: The default active screen identifier.

---

## 🛠️ Methods (API)

Routing is normally triggered on the parent MNGUI controller:

### 1. \`gui.navigation(screenName)\`
Navigates forward or backward to a defined screen.
*   If the target screen **does not exist** in the stack: Pushes the screen to the history stack, sliding the old view to the left, and slides the new view in from the right.
*   If the target screen **already exists** in the history: Pops back to it, fully executing \`.destroy()\` on all intermediary screens above it to save memory.

### 2. \`gui.back()\`
Destroys the current view and pops back to the previous active view, executing sliding transitions.`
    },
    {
      id: "mnstate",
      name: "MNState",
      icon: "🔄",
      vi: `# MNState — Quản lý Trạng thái & Ràng buộc Dữ liệu

\`MNState\` cung cấp cơ chế quản lý trạng thái phản hồi (Reactive State) và liên kết dữ liệu hai chiều (Two-way Data Binding) đơn giản nhưng cực kỳ mạnh mẽ cho MNGUI. Nó hoạt động theo mô hình Observable giúp đồng bộ hóa dữ liệu lập tức giữa các biến logic JS và giao diện hiển thị.

---

## 💡 Cú pháp khởi tạo

\`\`\`javascript
const state = new MNState(initialValue);
\`\`\`

---

## 🛠️ Các thuộc tính & Phương thức (API)

### 1. \`.value\` (Getter & Setter)
Thuộc tính chứa giá trị hiện tại của State. Gán giá trị mới sẽ cập nhật các component đang liên kết lập tức.

\`\`\`javascript
const nameState = new MNState("Nghia");
nameState.value = "Antigravity"; // Lập tức đồng bộ UI!
\`\`\`

### 2. \`.subscribe(callback)\`
Đăng ký lắng nghe sự thay đổi của State thủ công.
*   **Trả về**: Hàm \`unsubscribe\` dùng để hủy đăng ký lắng nghe để tránh rò rỉ bộ nhớ.

### 3. \`.bind(state)\` (Phương thức trên các UI Component)
Phương thức liên kết dữ liệu hai chiều giữa một UI Component (như \`MNInput\`, \`MNSwitch\`,...) với thực thể \`MNState\`.

---

## 📝 Ví dụ sử dụng nhanh

\`\`\`javascript
const textState = new MNState("Hello MNGUI");

// Đồng bộ hai chiều: Gõ vào ô nhập -> textState tự thay đổi -> Nhãn chữ tự đổi theo!
const myInput = new MNInput("Nhập gì đó...").bind(textState);
const myLabel = new MNText().bind(textState);
\`\`\``,
      en: `# MNState — Reactive State & Two-way Binding Engine

\`MNState\` is a simple yet powerful reactive state container utilizing the Observable pattern. It handles automated two-way data binding between JavaScript script logic states and graphic UI elements without manual DOM selectors.

---

## 💡 Initialization

\`\`\`javascript
const state = new MNState(initialValue);
\`\`\`

---

## 🛠️ API & Attributes

### 1. \`.value\` (Getter & Setter)
Mutating this property automatically forces all bound UI components to render the new value.

\`\`\`javascript
const nameState = new MNState("Alice");
nameState.value = "Bob"; // UI elements sync instantly!
\`\`\`

### 2. \`.subscribe(callback)\`
Registers a listener callback triggered whenever the state changes.
*   **Returns**: An \`unsubscribe()\` function to cleanly unhook listeners and prevent memory leaks.

### 3. \`.bind(state)\` (Available on most input/display components)
Binds the target component in a two-way sync loop to this state.

---

## 📝 Code Example

\`\`\`javascript
const textState = new MNState("Welcome");

// Editing the input field mutates state, which updates the label instantly!
const myInput = new MNInput("Type text...").bind(textState);
const myLabel = new MNText().bind(textState);
\`\`\``
    }
  ],
  components: [
    {
      id: "mnscreen",
      name: "MNScreen",
      icon: "📱",
      vi: `# MNScreen — Màn hình nền giao diện

\`MNScreen\` đóng vai trò là một màn hình chứa cơ sở đại diện cho một trang hoặc một tab giao diện.

## 💡 Khởi tạo
\`\`\`javascript
const screen = new MNScreen();
screen.append(new MNText("Nội dung màn hình"));
\`\`\``,
      en: `# MNScreen — Screen View Container

\`MNScreen\` represents a standalone page inside the panel, which can be stacked and navigated.

## 💡 Initialization
\`\`\`javascript
const screen = new MNScreen();
screen.append(new MNText("Screen Content"));
\`\`\``
    },
    {
      id: "mncolumn",
      name: "MNColumn",
      icon: "📐",
      vi: `# MNColumn — Bố cục hàng dọc

\`MNColumn\` sắp xếp các thành phần con theo hàng dọc với khoảng cách (gap) mặc định là \`12px\`.

## 💡 Khởi tạo
\`\`\`javascript
const col = new MNColumn();
col.append(new MNText("Dòng 1"));
col.append(new MNText("Dòng 2"));
\`\`\``,
      en: `# MNColumn — Vertical Column Layout

\`MNColumn\` arranges nested UI elements vertically using a standardized flex layout gap of \`12px\`.

## 💡 Initialization
\`\`\`javascript
const col = new MNColumn();
col.append(new MNText("Row 1"));
col.append(new MNText("Row 2"));
\`\`\``
    },
    {
      id: "mnrow",
      name: "MNRow",
      icon: "↔️",
      vi: `# MNRow — Bố cục hàng ngang

\`MNRow\` sắp xếp các thành phần con theo hàng ngang. Thích hợp làm thanh công cụ, chia đôi layout hoặc các dòng thông tin.

## 💡 Khởi tạo
\`\`\`javascript
const row = new MNRow();
row.append(new MNText("Bên trái"));
row.append(new MNButton("Bên phải"));
\`\`\``,
      en: `# MNRow — Horizontal Row Layout

\`MNRow\` arranges elements horizontally. Ideal for headers, toolbars, and split button rows.

## 💡 Initialization
\`\`\`javascript
const row = new MNRow();
row.append(new MNText("Left Label"));
row.append(new MNButton("Right Button"));
\`\`\``
    },
    {
      id: "mnbutton",
      name: "MNButton",
      icon: "🖲️",
      vi: `# MNButton — Nút tương tác

\`MNButton\` hỗ trợ hiệu ứng micro-animation bấm mượt mà và xử lý nhấp chuột nhanh.

## 💡 Sử dụng
\`\`\`javascript
const btn = new MNButton("Lưu cấu hình")
  .onClick(() => {
    MNToast.show("Đã lưu!", "success");
  });
\`\`\``,
      en: `# MNButton — Interactive Button

\`MNButton\` is a clickable button styled with visual hover and active ripple states.

## 💡 Usage
\`\`\`javascript
const btn = new MNButton("Save Configuration")
  .onClick(() => {
    MNToast.show("Saved!", "success");
  });
\`\`\``
    },
    {
      id: "mnswitch",
      name: "MNSwitch",
      icon: "🔛",
      vi: `# MNSwitch — Công tắc Toggle

\`MNSwitch\` là công tắc bật/tắt (Toggle Switch) trực quan có lưu trạng thái tự động.

## 💡 Sử dụng
\`\`\`javascript
const autoFarm = new MNSwitch("Bật Auto", false)
  .persist("auto_farm_enabled")
  .onChange((checked) => console.log("State:", checked));
\`\`\``,
      en: `# MNSwitch — Toggle Switch

\`MNSwitch\` provides a modern sliding switch checkbox for enabling/disabling states.

## 💡 Usage
\`\`\`javascript
const autoFarm = new MNSwitch("Auto Farm", false)
  .persist("auto_farm_enabled")
  .onChange((checked) => console.log("State:", checked));
\`\`\``
    },
    {
      id: "mncheckbox",
      name: "MNCheckbox",
      icon: "☑️",
      vi: `# MNCheckbox — Hộp kiểm chọn

\`MNCheckbox\` là hộp kiểm truyền thống, tương tự như MNSwitch nhưng dạng ô kiểm.

## 💡 Sử dụng
\`\`\`javascript
const checkbox = new MNCheckbox("Tự động đăng nhập", true)
  .persist("auto_login");
\`\`\``,
      en: `# MNCheckbox — Traditional Checkbox

\`MNCheckbox\` is an exclusive square check indicator.

## 💡 Usage
\`\`\`javascript
const checkbox = new MNCheckbox("Keep logged in", true)
  .persist("auto_login");
\`\`\``
    },
    {
      id: "mnslider",
      name: "MNSlider",
      icon: "🎚️",
      vi: `# MNSlider — Thanh kéo chọn số

\`MNSlider\` cho phép chọn giá trị số trong một khoảng xác định bằng thanh kéo trượt mượt mà.

## 💡 Sử dụng
\`\`\`javascript
const delay = new MNSlider("Delay (giây)", 1, 10, 5, 0.5)
  .persist("bot_delay");
\`\`\``,
      en: `# MNSlider — Numeric Range Slider

\`MNSlider\` provides a responsive range track bar for picking integers or floats.

## 💡 Usage
\`\`\`javascript
const delay = new MNSlider("Delay (sec)", 1, 10, 5, 0.5)
  .persist("bot_delay");
\`\`\``
    },
    {
      id: "mnselect",
      name: "MNSelect",
      icon: "🔽",
      vi: `# MNSelect — Trình chọn thả xuống (Dropdown)

\`MNSelect\` cung cấp trình đơn danh sách thả xuống tùy chỉnh cực kỳ thẩm mỹ, tránh lỗi giật khung hiển thị.

## 💡 Sử dụng
\`\`\`javascript
const select = new MNSelect("Chọn máy chủ")
  .setData([
    { id: "sv1", name: "Máy chủ 1" },
    { id: "sv2", name: "Máy chủ 2" }
  ])
  .persist("selected_server");
\`\`\``,
      en: `# MNSelect — Customized Dropdown Select

\`MNSelect\` renders a premium glassmorphic dropdown picker list.

## 💡 Usage
\`\`\`javascript
const select = new MNSelect("Select Server")
  .setData([
    { id: "sv1", name: "Server 1" },
    { id: "sv2", name: "Server 2" }
  ])
  .persist("selected_server");
\`\`\``
    },
    {
      id: "mncolorpicker",
      name: "MNColorPicker",
      icon: "🎨",
      vi: `# MNColorPicker — Bộ chọn màu sắc

\`MNColorPicker\` cho phép nhấp mở bảng màu hệ thống để tùy chỉnh màu giao diện hoặc cài đặt script.

## 💡 Sử dụng
\`\`\`javascript
const picker = new MNColorPicker("Màu chữ", "#ffffff")
  .persist("text_color")
  .onChange((hex) => console.log("Color Hex:", hex));
\`\`\``,
      en: `# MNColorPicker — Accent Color Picker

\`MNColorPicker\` provides an elegant dot trigger opening the native OS color wheel.

## 💡 Usage
\`\`\`javascript
const picker = new MNColorPicker("Text Color", "#ffffff")
  .persist("text_color")
  .onChange((hex) => console.log("Color Hex:", hex));
\`\`\``
    },
    {
      id: "mnaccordion",
      name: "MNAccordion",
      icon: "🗂️",
      vi: `# MNAccordion — Nhóm thu gọn nội dung

\`MNAccordion\` giúp che bớt các cài đặt phụ hoặc ít dùng để tối ưu hóa diện tích hiển thị.

## 💡 Sử dụng
\`\`\`javascript
const acc = new MNAccordion("Cài đặt chuyên sâu", false);
acc.append(new MNText("Nội dung nằm bên trong!"));
\`\`\``,
      en: `# MNAccordion — Collapsible Accordion Box

\`MNAccordion\` acts as a collapsible container to hide advanced layouts under a clickable toggle header.

## 💡 Usage
\`\`\`javascript
const acc = new MNAccordion("Advanced Parameters", false);
acc.append(new MNText("Content hidden inside!"));
\`\`\``
    },
    {
      id: "mntoast",
      name: "MNToast",
      icon: "🔔",
      vi: `# MNToast — Thông báo nhanh (Toast Alerts)

\`MNToast\` hiển thị thông báo nhanh ở góc màn hình độc lập với Popup chính. Chạy dạng tĩnh (static class).

## 💡 Sử dụng
\`\`\`javascript
MNToast.show("Đã kết nối thành công!", "success", 3000);
MNToast.show("Đã xảy ra lỗi!", "error", 4000);
\`\`\``,
      en: `# MNToast — Alert Notification Toast Stack

\`MNToast\` issues slide-in popups in the viewport corner. Standard static library method.

## 💡 Usage
\`\`\`javascript
MNToast.show("Routine started!", "success", 3000);
MNToast.show("Connection lost!", "error", 4000);
\`\`\``
    },
    {
      id: "mndialog",
      name: "MNDialog",
      icon: "💬",
      vi: `# MNDialog — Hộp thoại xác nhận phủ mờ

\`MNDialog\` là hộp thoại xác nhận hành động phủ mờ toàn bộ màn hình, yêu cầu người dùng xác nhận rõ ràng.

## 💡 Sử dụng
\`\`\`javascript
MNDialog.show({
  title: "Cảnh báo",
  message: "Xóa toàn bộ cấu hình?",
  confirmText: "Xóa",
  cancelText: "Hủy",
  onConfirm: () => console.log("Đã xóa!")
});
\`\`\``,
      en: `# MNDialog — Confirmation Modal Overlay

\`MNDialog\` mounts an overlay blur confirmation modal blocking interactions until closed.

## 💡 Usage
\`\`\`javascript
MNDialog.show({
  title: "Warning",
  message: "Reset all profile settings?",
  confirmText: "Yes, Reset",
  cancelText: "Cancel",
  onConfirm: () => console.log("Reset successfully!")
});
\`\`\``
    }
  ]
};
