# Mỹ Phẩm - Cosmetics Nature Products (Mini Project)

Đây là dự án mini môn "Ngôn ngữ kịch bản", xây dựng một website bán mỹ phẩm cơ bản sử dụng **HTML, CSS và JavaScript thuần (Vanilla JS)**. Không sử dụng bất kỳ framework Frontend nào (như React, Vue, hay Tailwind).

## 1. Công nghệ sử dụng
- **HTML5:** Xây dựng cấu trúc trang web (Layout, Semantic tags).
- **CSS3:** Tạo kiểu giao diện (Flexbox, Grid), responsive cơ bản.
- **JavaScript (ES6):** Xử lý tương tác, sự kiện (DOM Events), quản lý dữ liệu (Array/Object) và lưu trữ cục bộ (localStorage).

## 2. Cấu trúc thư mục
- `/index.html`: File giao diện chính.
- `/css/style.css`: File định dạng giao diện.
- `/js/data.js`: Chứa dữ liệu tĩnh (mảng `products`, `categories`, `brands`) dùng để mô phỏng Database.
- `/js/script.js`: Chứa toàn bộ logic xử lý JavaScript.
- `/images/`: Chứa các tài nguyên hình ảnh (được cung cấp từ giảng viên).

## 3. Các chức năng chính bằng JavaScript
- **Render dữ liệu động:** Dùng vòng lặp duyệt qua mảng `products` trong `data.js` và tạo các phần tử HTML rồi chèn vào DOM bằng `appendChild` và `innerHTML`.
- **Lọc (Filter):** Khi người dùng click vào danh mục ở Sidebar, JS sẽ dùng hàm `Array.filter()` để lọc ra các sản phẩm có `category` tương ứng và render lại.
- **Tìm kiếm (Search):** Bắt sự kiện `input` trên ô tìm kiếm, dùng `Array.filter()` kết hợp `String.includes()` để tìm sản phẩm theo tên.
- **Sắp xếp (Sort):** Bắt sự kiện `change` trên thẻ `<select>`, dùng `Array.sort()` để sắp xếp lại mảng sản phẩm theo giá tăng/giảm.
- **Giỏ hàng (Cart):**
  - Mảng `cart` lưu trữ các sản phẩm được thêm.
  - Tăng/giảm số lượng hoặc xóa sản phẩm.
  - Tính tổng tiền sử dụng `Array.reduce()`.
- **Lưu trữ cục bộ (localStorage):** Khi giỏ hàng thay đổi, gọi hàm `localStorage.setItem()` để lưu chuỗi JSON của giỏ hàng. Khi tải lại trang, dùng `localStorage.getItem()` để khôi phục giỏ hàng.
- **Modal Chi tiết sản phẩm:** Khi click vào ảnh hoặc tên sản phẩm, JS sẽ hiển thị một Modal (cửa sổ nổi) bằng cách thay đổi class CSS (thêm/xóa class `.show`).

---

# QUESTIONS FOR DEFENSE (CÂU HỎI BẢO VỆ)

Dưới đây là các câu hỏi giảng viên có thể hỏi để kiểm tra kiến thức về dự án:

**1. Tại sao em dùng JavaScript trong project này? JavaScript khác HTML/CSS như thế nào?**
> HTML tạo cấu trúc (bộ xương), CSS dùng để trang trí (quần áo), còn JavaScript tạo ra các chức năng tương tác (cơ bắp, não bộ). Thiếu JS, trang web chỉ là một bản vẽ tĩnh không thể lọc, tìm kiếm hay thêm vào giỏ hàng.

**2. DOM là gì? Project sử dụng DOM ở đâu?**
> DOM (Document Object Model) là mô hình cấu trúc cây của trang HTML do trình duyệt tạo ra, giúp JavaScript can thiệp vào các thẻ HTML. Em dùng DOM khi gọi `document.getElementById`, `document.createElement`, hoặc khi thay đổi `innerHTML` để hiển thị sản phẩm.

**3. `addEventListener` dùng để làm gì? Nêu ví dụ trong bài.**
> `addEventListener` dùng để gắn một "tai nghe" theo dõi sự kiện của người dùng. Ví dụ: em gắn sự kiện `click` vào nút "Thêm vào giỏ" để bắt đầu xử lý code thêm sản phẩm.

**4. Dữ liệu sản phẩm được lưu như thế nào?**
> Dữ liệu được lưu trữ trong một Mảng các Object (Array of Objects) ở file `js/data.js`. Mỗi object chứa các thuộc tính như `id`, `name`, `price`, `image`.

**5. Hàm `renderProducts()` làm nhiệm vụ gì?**
> Hàm này nhận vào một mảng sản phẩm, xóa trắng khu vực chứa sản phẩm hiện tại (`innerHTML = ''`), sau đó dùng vòng lặp duyệt qua mảng, tạo ra các khối HTML tương ứng cho từng sản phẩm và chèn vào giao diện.

**6. Chức năng Lọc (Filter) hoạt động thế nào?**
> Khi click danh mục, em lấy `id` của danh mục đó, rồi dùng hàm `products.filter(item => item.category === id)` để tạo một mảng mới chỉ chứa các sản phẩm thuộc danh mục đó, sau đó gọi lại `renderProducts()` để vẽ lại.

**7. Tìm kiếm (Search) hoạt động thế nào?**
> Khi người dùng gõ phím (sự kiện `input`), em lấy giá trị ô chữ, chuyển về chữ thường (`toLowerCase()`), sau đó dùng `filter()` và `includes()` để lọc mảng sản phẩm, nếu tên sản phẩm chứa từ khóa thì giữ lại.

**8. Hàm `sort()` trong JS hoạt động thế nào với giá tiền?**
> Khi sắp xếp tăng dần, em dùng `products.sort((a, b) => a.price - b.price)`. Nếu `a.price > b.price` nó sẽ trả về số dương, giúp đổi chỗ 2 phần tử đó cho nhau.

**9. Giỏ hàng (Cart) được quản lý như thế nào?**
> Em có một mảng biến toàn cục `let cart = []`. Khi thêm sản phẩm, dùng hàm `find()` kiểm tra xem có trong giỏ chưa. Nếu có thì tăng `quantity`, nếu chưa thì `.push()` object sản phẩm đó vào mảng.

**10. `localStorage` là gì? Tại sao phải dùng nó?**
> `localStorage` là một kho lưu trữ cục bộ trên trình duyệt. Em dùng nó vì các biến JS (như mảng `cart`) sẽ bị reset (mất hết) khi F5/reload trang. Lưu vào `localStorage` giúp dữ liệu giỏ hàng tồn tại kể cả khi tắt trình duyệt.

**11. Dữ liệu trong `localStorage` có định dạng gì?**
> `localStorage` chỉ lưu được chuỗi (String). Nên khi lưu mảng giỏ hàng, em phải dùng `JSON.stringify(cart)` để ép thành chuỗi. Khi lấy ra thì phải dùng `JSON.parse()` để dịch ngược chuỗi đó lại thành mảng/object JavaScript.

**12. Sự kiện nổi bọt (Event Bubbling) là gì và em có xử lý không?**
> Khi em click vào nút "Thêm vào giỏ" nằm trên Card sản phẩm, sự kiện click có thể lan truyền (nổi bọt) lên cái Card đó, khiến Modal chi tiết sản phẩm vô tình bị mở lên. Em đã dùng `e.stopPropagation()` ở nút "Thêm vào giỏ" để chặn điều đó.

**13. Em tính tổng tiền trong giỏ hàng bằng cách nào?**
> Em dùng vòng lặp `forEach` duyệt qua mảng giỏ hàng, hoặc dùng hàm `Array.reduce()`, công thức là: `Tổng tiền = Giá sản phẩm * Số lượng (quantity)`.

**14. Làm sao để ẩn/hiện Modal?**
> Ban đầu Modal có CSS là `display: none;`. Khi cần hiện, JS sẽ thêm class `.show` (class này có `display: flex;`) vào thẻ Modal đó. Khi đóng thì remove class `.show` đi.

**15. Em đã xử lý lỗi hình ảnh (nếu thiếu file ảnh) như thế nào?**
> Em dùng thuộc tính sự kiện `onerror` ngay trên thẻ `<img>` trong HTML. Nếu đường dẫn ảnh bị lỗi, `onerror` sẽ tự động kích hoạt và gán thuộc tính `src` bằng một đường dẫn ảnh dự phòng (ảnh placeholder).
