# Lưu trữ Trạng thái Chéo trang trong Userscript (State Persistence)

## Mô tả
Hướng dẫn cách thiết lập cơ chế tự động đồng bộ và lưu trữ trạng thái chéo trang (Cross-Site State Persistence) cho các thư viện UI dùng trong Userscripts (Tampermonkey, Violentmonkey), giúp lưu lại cấu hình cài đặt của người dùng trên mọi trang web.

## Khi nào áp dụng (When to Apply)
- Khi phát triển các thư viện giao diện hoặc các script chạy trên nhiều tên miền (Multi-domain).
- Cần lưu lại lựa chọn của người dùng (Switch, Checkbox, Slider, Input, Dropdown) sau khi tải lại trang hoặc đổi trang.
- Không áp dụng khi dữ liệu có dung lượng quá lớn (> 5MB) hoặc dữ liệu cực kỳ nhạy cảm cần mã hóa phức tạp.

## Yêu cầu trước (Prerequisites)
- Userscript cần được cấp quyền (grant) `GM_setValue` và `GM_getValue` trong phần metadata để hỗ trợ lưu trữ liên trang. Nếu không, hệ thống sẽ tự động fallback về `localStorage` của từng trang riêng biệt.

## Các bước thực hiện (Steps)

### Step 1: Thiết lập lớp xử lý Lưu trữ thông minh
**Mục tiêu:** Tạo một lớp tĩnh (Static class) tự động phát hiện môi trường Userscript để sử dụng `GM_setValue` / `GM_getValue`, fallback về `localStorage` nếu chạy trên trang web thông thường, đồng thời tự động tuần tự hóa (Serialize) JSON.

```javascript
class StatePersistence {
  static get(key) {
    let rawVal = null;
    try {
      if (typeof GM_getValue !== "undefined") {
        rawVal = GM_getValue(key);
      }
    } catch (e) {}
    if (rawVal === null || rawVal === undefined) {
      try {
        rawVal = localStorage.getItem(key);
      } catch (e) {}
    }
    if (rawVal === null || rawVal === undefined) return null;
    try {
      return JSON.parse(rawVal);
    } catch (e) {
      return rawVal;
    }
  }

  static set(key, value) {
    const serialized = JSON.stringify(value);
    try {
      if (typeof GM_setValue !== "undefined") {
        GM_setValue(key, serialized);
      }
    } catch (e) {}
    try {
      localStorage.setItem(key, serialized);
    } catch (e) {}
  }
}
```
**Verify:** Thử gọi `StatePersistence.set('test', true)` rồi lấy ra `StatePersistence.get('test')` trên console xem kiểu dữ liệu có được giữ nguyên (boolean) hay không.

### Step 2: Tích hợp vào Lớp thành phần Cơ sở (BaseComponent)
**Mục tiêu:** Thêm các phương thức `.persist(key)`, `.getValue()`, `.setValue()`, `.setValueSilently()` vào BaseComponent và lắng nghe sự kiện nổi (Event Bubbling) để tự động lưu trạng thái khi giá trị thay đổi.

```javascript
class BaseComponent {
  persist(key) {
    this.persistKey = key;
    const val = StatePersistence.get(this.persistKey);
    if (val !== null && val !== undefined) {
      this.setValueSilently(val);
    }
    
    // Lắng nghe sự kiện bubble từ các input con
    this.element.addEventListener("change", () => {
      this.savePersistedValue(this.getValue());
    });
    this.element.addEventListener("input", () => {
      this.savePersistedValue(this.getValue());
    });
    return this;
  }

  getValue() { return null; }
  setValue(val) { return this; }
  setValueSilently(val) { return this; }

  savePersistedValue(val) {
    if (this.persistKey && val !== null && val !== undefined) {
      StatePersistence.set(this.persistKey, val);
    }
  }
}
```
**Verify:** Gọi `.persist("cai_dat")` trên một component. Thay đổi giá trị trên giao diện và tải lại trang, kiểm tra xem giá trị mới có tự động được nạp lại không.

## Ví dụ thực tế (Concrete Example)
**Task gốc:** Nâng cấp thư viện MNGUI lên v3.0.0 hỗ trợ lưu trạng thái cài đặt của người dùng.
**Project:** `mn-gui`
**Date:** 2026-05-18

## Gotchas & Lưu ý
- ⚠️ **Loop chặn vô hạn:** Tránh gọi callback `onChange` trong hàm `setValueSilently` để tránh vòng lặp phản hồi vô tận khi khởi tạo UI.
- 💡 **Event Bubbling:** Việc lắng nghe sự kiện tại thẻ cha `this.element` giúp loại bỏ hoàn toàn mã phức tạp đăng ký lưu trữ riêng lẻ cho từng component.
