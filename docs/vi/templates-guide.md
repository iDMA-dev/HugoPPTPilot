# Hướng dẫn về mẫu: dùng, tạo ra và ranh giới

[Tiếng Việt](./templates-guide.md)

---

Một mẫu HugoPPTPilot là một workspace tái sử dụng thuộc một trong bốn loại tường minh: **Brand** sở hữu bản sắc, **Style** sở hữu phương pháp truyền đạt di động và mặc định hình ảnh, **Layout** sở hữu cấu trúc trang tái sử dụng trung lập thương hiệu, còn **Deck** sở hữu một ứng dụng trình bày lặp lại cùng bản sắc và cấu trúc tích hợp. Workspace Layout và Deck gồm các nguyên mẫu SVG hoàn chỉnh với hợp đồng Master / Layout / slot đã khai báo; Brand và Style cố ý không có danh sách SVG. `design_spec.md` của mỗi workspace khai báo chính xác loại đó đóng góp gì.

Hướng dẫn này trả lời ba câu hỏi:

1. [Làm sao dùng một mẫu có sẵn?](#1-dùng-một-mẫu-có-sẵn)
2. [Làm sao biến PPT của người khác — hoặc thương hiệu của chính tôi — thành mẫu? (trọng tâm)](#2-tạo-mẫu-mới-trọng-tâm)
3. [Giới hạn của mẫu là gì?](#3-ranh-giới-của-mẫu)

## Đường đi mẫu trong 60 giây

Chọn đường theo thứ bạn đang có và kết quả bạn muốn:

| Điểm xuất phát và mục tiêu | Đường | Yêu cầu có thể chép dùng |
|---|---|---|
| Một `.pptx` thô; giữ nguyên các khung slide hiện có và thay nội dung | **Edit Native PPTX** | `Điền projects/source/template.pptx bằng projects/source/content.md; giữ nguyên thiết kế và chỉ dùng các trang phù hợp.` |
| Một workspace Brand/Style/Layout/Deck tái sử dụng; tạo bộ slide mới | **Generate PPTX → điều khiển mẫu ở Giai đoạn 1** | `Tạo bộ slide từ sources/report.pdf với mẫu skills/ppt-master/templates/layouts/presentation_core/.` |
| Một PPTX, bộ SVG, cẩm nang thương hiệu, website, ảnh hoặc tài liệu tham chiếu hỗn hợp; trước hết dựng một hệ thống tái sử dụng | **Create Template → Generate PPTX** | `Dùng /create-template để tạo workspace Deck tái sử dụng từ projects/brand/bo_slide_cua_chung_toi.pptx.` |

Đừng truyền một `.pptx` thô làm đường dẫn mẫu cho Generate PPTX. Hãy điền trực tiếp khi bạn muốn giữ các trang có sẵn của nó, hoặc chạy Create Template trước khi bạn muốn một hệ thống tái sử dụng.

Chọn loại workspace theo thứ cần tái sử dụng:

| Loại | Tái sử dụng | Kết quả PowerPoint native |
|---|---|---|
| **Brand** | Màu sắc, kiểu chữ, logo, giọng điệu, phong cách biểu tượng | Chỉ ràng buộc về bản sắc. Trang sinh ra vẫn cục bộ theo Slide dưới một Master dự án sạch và Blank Layout. |
| **Style** | Phương pháp truyền đạt, từ vựng vai trò trang mở, quy tắc bằng chứng/dữ liệu, mặc định hình ảnh, hướng ảnh/biểu tượng và trọng tâm rà soát mang tính tư vấn | Trang phẳng cục bộ theo Slide. Giá trị Style gieo mầm cho Giai đoạn 2 cuối nhưng không trở thành bản sắc thương hiệu hay Layout tái sử dụng. |
| **Layout** | Ngữ pháp trang trung lập thương hiệu, định danh Master/Layout, vai trò chữ ngữ nghĩa, slot và danh sách layout | Bộ slide có cấu trúc với Master native tái sử dụng, Layout có tên và placeholder; bản sắc, kiểu chữ theo chế độ đọc và ứng dụng truyền đạt được xác định riêng. |
| **Deck** | Một họ bài thuyết trình lặp lại: bối cảnh ứng dụng mô tả, bản sắc, cấu trúc trang và các nguyên mẫu thực | Bộ slide có kế hoạch áp dụng trang/nguyên mẫu do AI suy ra từ mẫu và nội dung hiện tại. |

Theme, Slide Master, Slide Layout và Placeholder là các đối tượng PowerPoint native, không phải loại workspace bổ sung. Quy tắc Brand và Layout được biên dịch vào các đối tượng đó. Khi tái sử dụng `layout`, vai trò chữ ngữ nghĩa đến từ Layout trong khi phông chữ cuối và thang cỡ chữ được xác định từ bản sắc và chế độ đọc; còn `mirror` giữ nguyên định dạng nguồn theo nghĩa đen. Một Master cuối cùng có thể chứa cả hình học cấu trúc lẫn hình ảnh thương hiệu dù các hợp đồng nguồn của chúng vẫn tách biệt.

Hai quy tắc ngăn được phần lớn sai sót:

1. [Bước 3](../../skills/ppt-master/workflows/generate-pptx.md#step-3-template-candidate-preparation) của Generate mặc định chỉ chuẩn bị ứng viên. Giai đoạn 1 xác nhận cam kết truyền đạt cùng lựa chọn thiết kế tự do/mẫu.
2. Yêu cầu thông thường bắt đầu ở thiết kế tự do. Ý định dùng mẫu rõ ràng hoặc bất kỳ thư mục gốc workspace chính xác nào mở chế độ mẫu; đúng một thư mục gốc được cung cấp thì được chọn sẵn, còn nhiều thư mục gốc vẫn là ứng viên chưa chọn. Lựa chọn không phải thiết kế tự do được cài sau Giai đoạn 1 và trước Giai đoạn 2 cuối có nhận biết mẫu.

---

## 1. Dùng một mẫu có sẵn

### Cách chọn hoạt động

Generate mặc định đặt việc chọn mẫu trong **Giai đoạn 1**, cạnh cam kết truyền đạt. Trang trước hết hiện các lựa chọn Thiết kế tự do / Dùng mẫu có thể chuyển đổi. Yêu cầu thông thường khởi tạo Thiết kế tự do và để các bộ chọn chi tiết thu gọn. Ý định dùng mẫu rõ ràng hoặc bất kỳ thư mục gốc workspace chính xác nào khởi tạo Dùng mẫu và mở rộng các ứng viên Brand/Style/Layout/Deck đã đăng ký cùng thư mục gốc được cung cấp. Đúng một thư mục gốc được cung cấp thì được chọn sẵn; nhiều thư mục gốc vẫn là ứng viên chưa chọn. Hệ thống không suy ra một mẫu cụ thể từ chủ đề.

> **Ngoại lệ Quick Generate:** Quick không bao giờ mở trang đó. Thư mục gốc chính xác trong yêu cầu được kiểm chứng và dùng trực tiếp, mỗi loại tối đa một đóng góp. Layout và Deck có thể cùng tồn tại, Layout được ưu tiên về cấu trúc; thư mục gốc nhiều loại đóng góp mọi spec của nó. Không có thư mục gốc chính xác nghĩa là thiết kế tự do. Tên trống không vẫn không được phân giải. Quick là không khóa chứ không phải không cấu trúc: thiết kế tự do và đầu ra chỉ-Brand/Style giữ phẳng, còn chủ sở hữu cấu trúc Layout/Deck đã cài vẫn là siêu dữ liệu Master/Layout/slot tường minh trong các SVG đã soạn và PPTX đã xuất.

### Cách dùng bộ chọn

Ở trang Giai đoạn 1, chọn Thiết kế tự do hoặc Dùng mẫu. Chỉ Dùng mẫu mới hiện năm danh sách thả xuống gọn: mỗi danh sách cho workspace Brand, Style, Layout và Deck đã đăng ký, cộng một danh sách cho các thư mục gốc chính xác được cung cấp cho lần chạy này. Mỗi danh sách chọn một và có `None`; lựa chọn đầy đủ có thể kết hợp cả bốn loại riêng biệt nhưng mỗi loại tối đa một. Layout cung cấp cấu trúc khi có; nếu không thì Deck. Kênh thư mục gốc chỉ định đóng góp tối đa một workspace, nguyên khối với mọi loại nó phơi ra. Các danh sách chỉ đến từ bốn chỉ mục loại; quy trình không bao giờ quét thư mục mẫu. Hãy gửi thư mục gốc workspace Brand/Style/Layout/Deck chính xác trong chat khi bạn muốn mở chế độ mẫu và chọn sẵn đường dẫn duy nhất đó. Đặt ở bất kỳ vị trí nào trong câu cũng được; đường dẫn chỉ cần rõ ràng:

> "dùng mẫu này: `skills/ppt-master/templates/layouts/presentation_core/`" ✅
> "dùng mẫu của bộ slide lần trước: `projects/last_deck/`" ✅
> "làm giới thiệu sản phẩm với `/Users/me/Desktop/our_brand_v3/`" ✅

Với mọi loại mẫu hiện hành, một đường dẫn tường minh là **thư mục gốc workspace mẫu**. Thư mục gốc chính xác khớp một mục chỉ mục đã đăng ký có thể hiển thị là `library`; thư mục gốc chưa đăng ký vẫn được gắn nhãn `explicit` riêng. Máy chủ phân tích các spec định danh thực tế của loại sau; `explicit` là nguồn gốc, không phải loại thứ năm hay bậc ưu tiên. Giai đoạn 1 kiểm chứng nguyên khối từng thư mục gốc đã chọn. Sau khi xác nhận, việc cài ánh xạ mỗi spec và thư mục tài nguyên đã chọn đúng một lần, chỉ cài danh sách cấu trúc hiệu lực (Layout nếu có, nếu không thì Deck), và không bao giờ sao chép `exports/`. Thư mục gốc Deck/Layout còn kiểm chứng hợp đồng SVG có cấu trúc của chúng trước khi áp dụng thứ tự ưu tiên; Brand/Style kiểm chứng spec không có danh sách của chúng. Đường dẫn có thể trỏ tới workspace thư viện đi kèm dưới `skills/ppt-master/templates/<kind>/<id>/`, workspace dự án dưới `projects/<name>/`, hoặc workspace khác có cùng định tuyến. Một lần chạy Create Template có thể trao thẳng thư mục gốc workspace đã kiểm chứng của nó cho bộ chọn Giai đoạn 1 kế tiếp trong cùng cuộc trò chuyện.

Việc chọn mẫu dùng chung màn hình và thao tác gửi của Giai đoạn 1 nhưng vẫn là một quyết định phụ riêng. Mục tiêu truyền đạt (khán giả, ý định, kết quả, thông điệp cốt lõi, bối cảnh trình bày và vòng đời sau đó) chỉ được soạn từ yêu cầu hiện tại, dữ kiện nguồn, ràng buộc của cuộc trò chuyện và việc khởi tạo dự án; sự tồn tại, bản tóm tắt hay nguyên mẫu của ứng viên không bao giờ bẻ cong nó. Dữ kiện mẫu đã có trong ngữ cảnh — thư mục gốc do Create Template trao trong cuộc trò chuyện này, hoặc loại và khung slide của một thư mục gốc chính xác — chỉ được dùng để gợi ý khung slide và khoảng số trang, và khung slide khác với lúc khởi tạo dự án là một quyết định nhìn thấy ở Giai đoạn 1. Sau xác nhận gộp, lựa chọn không phải thiết kế tự do chạy giai đoạn áp dụng chung và cài các workspace đã chọn vào `templates/`, `images/` và `icons/` của dự án. Giai đoạn 2 cuối sau đó so sánh cam kết truyền đạt đã xác nhận với trạng thái đã cài; `template_application` mô tả **cách** dùng nó và không bao giờ chọn **mẫu nào** để dùng.

`template_application` là một đoạn ngôn ngữ tự nhiên, không phải bộ chọn chế độ. Chỉ dẫn tường minh của người dùng thắng; nếu không, AI đọc mọi SVG mẫu đã cài, quyết định từ nội dung hiện tại, và mặc định dùng kiểu tham chiếu dẫn dắt khi không có lựa chọn phù hợp mạnh hơn. Dùng tham chiếu dẫn dắt có thể thiết kế lại sau khi nghiên cứu toàn bộ danh sách; chỉ-bổ-sung giữ các đối tượng không phải slot hiện có, cho phép sửa slot và chỉ thêm; chỉ-thay-thế đổi các thẻ mang thông tin trong khi giữ phần còn lại. Đây là ví dụ, không phải lựa chọn cố định. Mọi ngoại lệ riêng của nguyên mẫu nêu đúng tên cơ sở SVG. Quick đưa ra và đóng băng cùng đoạn đó chỉ trong ngữ cảnh hoạt động thay vì ghi sản phẩm xác nhận/spec.

> **Kiểm tra sơ bộ workspace hiện hành:** Bước 3 chỉ chấp nhận thư mục gốc workspace phơi Design Spec của nó dưới `templates/`. Thư mục gốc phẳng, placeholder nguyên tử cũ, Master/Layout chưa ánh xạ và các gói ngữ nghĩa cũ khác bị từ chối; hãy chạy `create-template` để tạo workspace mới, rồi tạo trang có cấu trúc mới từ workspace đó. Không gì nâng cấp gói cũ tại chỗ.

### Điều KHÔNG tự động chọn một mẫu

- **Một tên mẫu trống không trong chat**: "presentation_core" / "mẫu China Telecom" không được phân giải ngầm hay chọn sẵn một workspace. Hãy chọn mục đã đăng ký trên trang hoặc trả lại đường dẫn chính xác của nó trong chat.
- **Mô tả phong cách**: "phong cách McKinsey" / "phong cách Google" / "tối giản" / "phong cách Keynote" vẫn là bản tóm tắt thiết kế. Chúng không bao giờ kích hoạt workspace trừ khi người dùng chọn một cái hoặc cung cấp thư mục gốc chính xác của nó.

Điều này là có chủ ý: AI không bao giờ phán đoán mờ hay diễn giải xem câu chữ có ánh xạ tới một mẫu hay không. Công tắc chế độ Giai đoạn 1 luôn có trong Generate mặc định, trong khi chỉ một thư mục gốc chính xác chọn từ các điều khiển có chỉ mục mới kích hoạt workspace.

Để duyệt trong chat, hãy hỏi "có những mẫu nào?" Danh sách trong chat và bộ chọn Giai đoạn 1 dùng cùng bốn chỉ mục. Chỉ liệt kê thì không chọn gì; hãy trả lại một trong những đường dẫn chính xác đó hoặc chọn trên trang.

### Ví dụ có thể chép dùng

Dùng một workspace:

```text
Tạo bộ slide từ projects/q3-report/sources/report.pdf.
Workspace mẫu: skills/ppt-master/templates/layouts/presentation_core/
```

Kết hợp bản sắc và cấu trúc:

```text
Tạo bộ slide ra mắt sản phẩm từ projects/launch/sources/brief.md.
Workspace Brand: skills/ppt-master/templates/brands/anthropic/
Workspace Layout: skills/ppt-master/templates/layouts/presentation_core/
```

Dùng mẫu phạm vi dự án đã tạo trước đó:

```text
Tạo bộ slide từ projects/annual-report/sources/report.md.
Workspace mẫu: projects/acme_template/
```

Với việc chọn thư mục gốc tường minh qua chat, nhãn đường dẫn là tùy chọn nhưng thư mục gốc chính xác là bắt buộc. Lựa chọn thư viện trên trang đã mang sẵn thư mục gốc chính xác. Trang cho phép một lựa chọn đã đăng ký cho mỗi loại và một thư mục gốc chỉ định, và chỉ từ chối loại trùng lặp. Layout và Deck có thể chọn cùng nhau; khi đó Layout sở hữu cấu trúc trong khi Deck giữ các phân đoạn còn lại. Thư mục gốc chỉ định nhiều loại là tất-cả-hoặc-không-gì; các loại nó phơi ra không thể chọn lại từ thư viện.

Bạn không cần chọn chế độ dùng mẫu. Strategist đọc danh sách cấu trúc hiệu lực — Layout nếu có, nếu không thì Deck — cùng nội dung hiện tại, rồi quyết định chọn, lặp, bỏ, sắp xếp lại hay tổ chức lại những trang nào. Brand thay vào đó cung cấp ràng buộc bản sắc, còn Style cung cấp mặc định hướng/phương pháp; cả hai để trang được soạn tự do trừ khi workspace khác cung cấp cấu trúc. Nếu bạn quan tâm một ranh giới cụ thể, hãy nêu bằng ngôn ngữ thông thường trong cùng yêu cầu — ví dụ "giữ nguyên trang bìa và trang kết, tự chọn các trang giữa cho phù hợp" hoặc "chỉ dùng ngôn ngữ hình ảnh". Câu tường minh đó thắng phán đoán của AI.

### Danh mục mẫu

Mẫu được tổ chức thành bốn loại, mỗi loại có một chỉ mục khám phá:

- [`brands_index.json`](../../skills/ppt-master/templates/brands/brands_index.json) — workspace chỉ-bản-sắc: màu / kiểu chữ / logo / giọng điệu / phong cách biểu tượng, không có danh sách trang SVG
- [`styles_index.json`](../../skills/ppt-master/templates/styles/styles_index.json) — workspace hướng/phương pháp: phương pháp truyền đạt, cách thể hiện bằng chứng/dữ liệu, mặc định hình ảnh và trọng tâm rà soát mang tính tư vấn, không có danh sách trang SVG
- [`layouts_index.json`](../../skills/ppt-master/templates/layouts/layouts_index.json) — workspace chỉ-cấu-trúc: khung / ngữ pháp trang / loại trang / danh sách SVG, với bản sắc được chọn ở khâu sau
- [`decks_index.json`](../../skills/ppt-master/templates/decks/decks_index.json) — ứng dụng trình bày lặp lại với bản sắc, cấu trúc tích hợp và mô tả nguyên mẫu thực tế

Bốn chỉ mục này là nguồn thư viện đã đăng ký đầy đủ cho các điều khiển mẫu Giai đoạn 1 mặc định và việc khám phá trong chat; thư mục không bao giờ bị quét. Hãy hỏi "có những mẫu nào?" để có danh sách dễ đọc kèm đường dẫn workspace chính xác. README riêng của từng loại định nghĩa hợp đồng của chúng. Mô hình dữ liệu đầy đủ + quy tắc cài đặt / sở hữu phân đoạn: [`templates-architecture.md`](./templates-architecture.md).

### Thiết kế tự do so với mẫu

Thiết kế tự do **không** có nghĩa là "không cấu trúc" hay "không phong cách" — Strategist vẫn lập kế hoạch mạch kể, thứ bậc và hệ thống hình ảnh cho bộ slide cụ thể đó. Trang sinh ra của nó dùng `pptx_structure.mode: flat`, nên mọi đối tượng nhìn thấy đều cục bộ theo Slide. Workspace chỉ-Brand và chỉ-Style cũng giữ `flat`; Brand cung cấp ràng buộc bản sắc, còn Style cung cấp hạt giống phương pháp tái sử dụng và mặc định hình ảnh. Workspace Layout và Deck phơi một hợp đồng Master / Layout / slot tái sử dụng. Strategist kiểm tra các nguyên mẫu thực và nội dung hiện tại, rồi tự động quyết định dùng cấu trúc đó hay chỉ dùng ngôn ngữ hình ảnh của nó.

> Quy tắc ngón tay cái: dùng workspace Brand khi bản sắc phải cố định; dùng Style khi một phương pháp lặp lại được và hướng hình ảnh cần đi cùng mà không có nguyên mẫu trang; dùng Layout khi cấu trúc trung lập thương hiệu cần tái sử dụng trong khi mục đích còn mở; dùng Deck khi một hệ thống cấu trúc có thương hiệu hoặc ứng dụng truyền đạt lặp lại cần đi cùng như một hợp đồng. Dùng thiết kế tự do khi bố cục chỉ nên mọc ra từ nội dung hiện tại.

### Bản tóm tắt phong cách không phải workspace Style

**Bản tóm tắt phong cách** là ngôn ngữ diễn giải ("tối giản" / "kiểu Keynote" / "biên tập") mà Strategist biến thành lựa chọn thiết kế cụ thể cho một bộ slide. **Workspace Style** là một mẫu `kind: style` thật với phương pháp truyền đạt và mặc định hình ảnh soạn sẵn, chỉ được dùng sau khi người dùng chọn mục đã đăng ký của nó, cung cấp thư mục gốc workspace chính xác, hoặc nhận nó qua bàn giao Create Template hiện tại.

| | Workspace Style | Bản tóm tắt phong cách |
|---|---|---|
| Cách gọi | Chọn mẫu ở Giai đoạn 1, đường dẫn thư mục chính xác, hoặc bàn giao Create Template hiện tại | Mô tả tự do trong tin nhắn; không chọn workspace |
| Cung cấp gì | Phương pháp tái sử dụng, kỷ luật vai trò/bằng chứng và mặc định hình ảnh; không có sự thật về bản sắc hay nguyên mẫu trang | Ý định mà Strategist diễn giải thành chế độ, phong cách hình ảnh, màu, kiểu chữ, biểu tượng và hình ảnh |
| Xác nhận | Giá trị đã lưu gieo mầm cho Giai đoạn 2 cuối; bản sắc Brand/Deck và lựa chọn đã xác nhận của người dùng vẫn có thẩm quyền | Không có giá trị soạn sẵn; Strategist đề xuất các ứng viên cụ thể và người dùng xác nhận |
| Phù hợp nhất | Lặp lại một cách tiếp cận thiết kế/lập luận qua các dự án mà không đóng băng trang | Diễn đạt cảm giác mong muốn chỉ cho dự án hiện tại |

Mô tả phong cách và workspace Style vẫn đi qua các cơ chế khác nhau: "tối giản" là ngôn ngữ diễn giải và vẫn ở thiết kế tự do, còn `templates/styles/<id>/` là workspace đã đăng ký thật, được chọn trên trang hoặc qua đường dẫn chính xác. `kind: style`, `visual_style` ở Giai đoạn 2 cuối và `template_reuse_scope: style` nội bộ là các trục riêng biệt.

### Bản tóm tắt phong cách được diễn giải thế nào

Strategist tách hai lựa chọn độc lập:

- **Chế độ (Mode)** điều khiển cách bộ slide truyền đạt: `pyramid`, `narrative`, `instructional`, `showcase`, `briefing`, hoặc hướng `custom` đã xác nhận.
- **Phong cách hình ảnh (Visual style)** điều khiển cách các trang trông ra sao: các phong cách dựng sẵn như `swiss-minimal`, `editorial`, `dark-tech`, `data-journalism`, `ink-wash` và các phong cách khác, cộng `custom`.

Chế độ nào cũng ghép được với phong cách hình ảnh nào. Những cụm như "ra mắt sản phẩm kiểu Keynote" có thể ảnh hưởng cả hai trục — ví dụ mạch kể `showcase` với hệ thống hình ảnh tiết chế, nhiều khoảng trắng — nhưng chúng không bao giờ là từ khóa tra mẫu. Người dùng xác nhận các lựa chọn thu được trước khi tạo. Các danh mục chuẩn nằm dưới [`references/modes/`](../../skills/ppt-master/references/modes/) và [`references/visual-styles/`](../../skills/ppt-master/references/visual-styles/).

---

## 2. Tạo mẫu mới (trọng tâm)

Biến một hoặc nhiều file PPTX/SVG, ảnh/PDF, tài liệu/website, tài sản thương hiệu hoặc yêu cầu viết trực tiếp thành mẫu HugoPPTPilot. Các tham chiếu có thể kết hợp, và một mẫu cũng có thể được thiết kế từ bản tóm tắt đã xác nhận mà không có nguồn ngoài. Đây là phần cốt lõi của hướng dẫn này.

### Điểm vào: quy trình `/create-template`

Đặc tả đầy đủ ở [`workflows/create-template.md`](../../skills/ppt-master/workflows/create-template.md). Mục này là bản rút gọn hướng người dùng — trong IDE của bạn, chỉ cần nói:

```
Hãy dùng quy trình /create-template để tạo một mẫu mới dựa trên các tài liệu tham chiếu dưới đây.
```

Quy trình sau đó sẽ **bắt buộc** xác nhận bản tóm tắt mẫu với bạn trước khi làm bất cứ điều gì (cổng này không thể bỏ qua).

Tên điểm vào luôn là **Create Template**. Nó điều phối đúng một quy trình con: Create Brand chỉ cho bản sắc, Create Style cho phương pháp/hướng di động không có nguyên mẫu, Create Layout cho cấu trúc trung lập thương hiệu mà ứng dụng truyền đạt còn mở, hoặc Create Deck cho hệ thống cấu trúc có thương hiệu hay ứng dụng trình bày lặp lại. Chỉ riêng một PPTX nguồn hoàn chỉnh không quyết định loại; quy trình phân loại những quy tắc ổn định đáng tái sử dụng. Quy trình con đã chọn không được cân nhắc lại bên trong bản tóm tắt.

### Bước 1 — Chuẩn bị gói tham chiếu hoặc bản tóm tắt

Bạn có thể cung cấp văn bản hội thoại trực tiếp, yêu cầu dán vào, Markdown/TXT, DOCX/PDF/HTML/URL, website, ảnh/ảnh chụp màn hình, tài sản logo/biểu tượng/phông chữ, file PPTX/SVG, hoặc mọi sự kết hợp hữu ích. Quy trình phân tích mọi kênh áp dụng được, giữ nguồn gốc và đưa các xung đột lên bản tóm tắt bắt buộc thay vì lặng lẽ chọn một nguồn. Giá trị chính xác do bạn soạn là quyết định dù đến qua chat, văn bản dán hay file tóm tắt riêng của bạn; một tệp mang chúng không biến chúng thành dữ kiện. Dữ kiện đòi thẩm quyền bên ngoài có thể truy nguồn độc lập hoặc siêu dữ liệu nguồn đọc được bằng máy. Ước lượng thị giác và diễn giải văn bản mơ hồ vẫn là gợi ý cho đến khi được xác nhận.

**Khi cấu trúc native của bộ slide có sẵn quan trọng, hãy đưa file `.pptx` gốc.** Bộ nhập đọc OOXML trực tiếp và trích các dữ kiện Master, Layout, placeholder, theme, hình khối native và tài nguyên tái sử dụng thực sự có mặt và được hỗ trợ vào các tham chiếu phân tích theo tầng. Hãy nói với AI bằng ngôn ngữ thông thường kết quả bạn muốn — ví dụ "giữ nguyên như vậy", "trích hệ thống Master/Layout tái sử dụng" hay "giữ ngôn ngữ hình ảnh nhưng thiết kế lại cấu trúc". Sau đó nó chọn triển khai nội bộ tương thích. PPTX gốc vẫn là bằng chứng phân tích bất biến và không được đóng gói vào mẫu mới.

Bạn cũng có thể thiết kế từ đầu theo cẩm nang thương hiệu: cung cấp logo, màu chính dạng HEX, phông chữ, mô tả giọng điệu và vài tham chiếu cảm xúc — AI sẽ thiết kế bộ khung trang ngay tại chỗ. Cách này hợp với những thương hiệu chưa có bộ PPT hoàn chỉnh, chỉ có sổ tay VI.

> **Ranh giới bằng chứng:** ảnh, ảnh chụp màn hình, văn bản, tài liệu, website và tài sản rời có thể dẫn dắt một mẫu soạn mới. Việc phủ rộng bám nguồn đòi bằng chứng trang PPTX/SVG; bảo toàn native theo nghĩa đen đòi một PPTX gốc hoặc một hợp đồng SVG có cấu trúc hiện hành hoàn chỉnh. Nguồn bổ sung có thể làm rõ ý định bảo toàn nhưng không thể bịa hay đổi topo native.

### Bước 2 — Bản tóm tắt mẫu (xác nhận bắt buộc)

Trước khi tạo, quy trình viết một đề xuất ngôn ngữ tự nhiên ngắn gọn và chờ chỉnh sửa hoặc chấp nhận. Nó **không** yêu cầu bạn chọn chế độ mẫu, enum độ trung thực hay chính sách trang/nội dung.

| Trường | Ghi chú |
|-------|-------|
| **Phạm vi đầu ra** | `library` (mặc định) hoặc `project`; cả hai dùng cùng lược đồ spec, trong khi library dùng spec trần trong thư mục một loại và project dùng spec định danh trong thư mục gốc dùng chung |
| **Dự án đích** | Chỉ cần cho `project`; nêu đúng đường dẫn dự án đã khởi tạo |
| **Quy trình con đã chọn** | Create Brand / Create Style / Create Layout / Create Deck, cố định bởi điều phối ở điểm vào |
| **ID mẫu** | Định danh mẫu di động; ở phạm vi library nó cũng là tên thư mục / khóa chỉ mục. Ưu tiên slug ASCII như `acme_consulting`; tên không phải ASCII dùng được nhưng phải an toàn với hệ tệp |
| **Tên hiển thị** | Tên dễ đọc cho tài liệu |
| **Ngữ cảnh theo loại** | Brand: trường hợp dùng bản sắc và giọng điệu. Style: phù hợp rộng nhất cùng từ khóa khám phá. Layout: tình huống tương thích cấu trúc cùng danh mục/từ khóa. Deck: ứng dụng lặp lại cùng danh mục/từ khóa. Bạn có thể sửa trực tiếp văn xuôi |
| **Phương pháp và mặc định hình ảnh** | Chỉ Create Style: phương pháp truyền đạt, từ vựng vai trò trang mở, cách thể hiện bằng chứng/dữ liệu, mặc định hình ảnh, hướng ảnh/biểu tượng và trọng tâm rà soát mang tính tư vấn; không có hợp đồng khán giả/trang/cấu trúc |
| **Bản sắc** | Chỉ Create Brand/Create Deck: bảng màu, kiểu chữ, logo, giọng điệu và bản sắc biểu tượng |
| **Khung và cấu trúc** | Chỉ Create Layout/Create Deck: khung, ngữ pháp trang, kế hoạch Master/Layout/slot, hành vi theo mật độ và quy tắc cấu trúc suy ra từ nguồn |
| **Cách xử lý nguồn** | Mỗi quy trình con nêu nó trích gì trong phân đoạn mình sở hữu. Chỉ Layout/Deck mô tả độ rộng nguyên mẫu, chiến lược bảo toàn/dựng lại và cấu trúc native |
| **Dữ kiện và tài nguyên nguồn** | Brand/Layout/Deck liệt kê tài nguyên được chọn hoặc loại trừ; Layout/Deck còn báo cáo dữ kiện Master/Layout quan sát được và tính năng native được hỗ trợ. Style chỉ giữ nguồn gốc dạng văn bản |

Sau khi xác nhận, quy trình phản hồi lại bản tóm tắt cuối cùng và phát dấu `[TEMPLATE_BRIEF_CONFIRMED]`. Các bước sau chỉ chạy sau dấu đó. **Đây là cổng cứng — không có bản tóm tắt thì không tạo.**

Trước khi cả hai phạm vi ghi tệp cuối, một bước kiểm tra sơ bộ cứng xác định Design Spec và mọi đích tài nguyên thật. Phạm vi library đòi thư mục gốc `templates/` rỗng. Phạm vi project đòi dự án đã khởi tạo và từ chối spec trần, spec đã có của loại mới, hoặc cách đặt tên định danh không hợp lệ; các loại riêng biệt có thể cùng tồn tại. Thêm Deck cạnh Layout giữ danh sách Layout, còn thêm Layout cạnh Deck dùng kiểm chứng cô lập và thay thế cấu trúc nguyên tử. Cả hai phạm vi từ chối va chạm đích với bitmap, vector nhập, bản xuất rà soát và đích không liên quan trước khi ghi. Giàn dự án rỗng sẵn có được để nguyên, và thư mục tùy chọn không được tạo chỉ để giữ đường dẫn rỗng. Kiểm tra thất bại thì dừng trước khi có đầu ra dở dang; quy trình không ghi đè.

> Vì sao nghiêm ngặt vậy? Mẫu là một hợp đồng sở hữu tái sử dụng, dù toàn cục hay theo dự án. Xác nhận phân đoạn sở hữu và đích trước — và hình học chỉ cho Layout/Deck — tránh đầu ra dở dang hay đặt sai chỗ.

### Bước 3 — AI suy ra triển khai

Create Style ghi trực tiếp spec hướng/phương pháp đã xác nhận và không vào chế độ tạo SVG. Với Create Layout/Create Deck, bạn không chọn chế độ tạo. AI dịch văn xuôi đã xác nhận thành một chiến lược nội bộ để công cụ xác định chạy được:

- một hệ thống tái sử dụng gọn khi yêu cầu cần chưng cất;
- phủ rộng hơn bám nguồn khi bản thân nguồn chứa các biến thể hữu ích;
- soạn mirror gọn khi yêu cầu cần bảo toàn và nguồn có hợp đồng cấu trúc được hỗ trợ hoàn chỉnh.

Phần đầu của Layout/Deck vẫn ghi `replication_mode: standard|fidelity|mirror` để tương thích công cụ và kiểm toán. Đó là bản ghi triển khai, không phải lựa chọn hướng người dùng. Phần đầu của Style cố ý không có trường replication/native-structure. Một Layout trung lập thương hiệu không thể bảo toàn theo nghĩa đen các dữ kiện thương hiệu/ứng dụng; AI hoặc soạn lại nó như một Layout hoặc giữ các dữ kiện đó trong một Deck tùy kết quả được yêu cầu.

**Về sprite sheet**: tài nguyên xuất từ PPTX thường là một ảnh lớn duy nhất được nhiều slide tham chiếu, mỗi slide cắt một vùng khác nhau qua các lớp bọc `<svg viewBox=...>` lồng nhau. Ở chế độ `fidelity` và `mirror`, kiểu lồng này phải được giữ — bạn không thể làm phẳng nó thành `<image>` trần, nếu không phần cắt mất và trang lệch. Quy trình tự động kiểm chứng điều này.

**Về hình khối PowerPoint native**: SVG nhập không mất mát vẫn bất biến làm bằng chứng nguồn/gói và hậu thuẫn cho tải không-nhìn-thấy được hỗ trợ. Việc tạo mẫu dùng cây `authoring-svg/` chỉnh sửa gọn mới và manifest source-ref/hash của nó. Template_Designer rà soát/soạn cây đó cho mirror, bảo toàn cấu trúc, ý nghĩa và cách trình bày tương tự mà không đòi mã SVG giống hệt. Bộ xuất bản kiểm chứng/ghép cây nhìn thấy hiện hành và không bao giờ khôi phục các cây con không mất mát thông thường; mẫu cuối không chứa ref chỉ-IR. JSON Chart/Table nhập/thuộc mẫu vẫn nằm nội dòng và có thẩm quyền, trong khi bản xem trước gọn của nó có thể gần đúng.

Với mirror Loại A có PPTX làm nền, kiểm chứng/xuất bản cuối dùng một lệnh xác định sau bước rà soát soạn:

```bash
python3 skills/ppt-master/scripts/mirror_template_materialize.py \
  "<import_workspace>" "<template_workspace>"
```

Nó kiểm chứng SHA nguồn/ref đã biết, manifest soạn, đồ thị native truy cập được, dữ kiện hiển thị/gán, và bao đóng vector nhập trước khi xuất bản nguyên tử danh sách SVG theo thứ tự nguồn hiện hành cùng tài nguyên. Nó không bao giờ đòi hay dùng cây xác minh `svg-flat/` tùy chọn làm nguồn mẫu và không bao giờ tạo Design Spec; người thiết kế viết spec đã giải quyết dựa trên danh sách đã xuất bản.

**Ranh giới đồ thị mirror**: mirror phát ra một nguyên mẫu hoàn chỉnh cho mỗi Slide nguồn và chỉ bảo toàn Layout được tham chiếu cùng Master cha của từng Slide. SVG giải quyết ngữ cảnh Master + Layout + Slide trong khi giữ quyền sở hữu lớp tường minh. Định danh Master/Layout nguồn không được Slide nào dùng sẽ không được mirror hiện thực hóa; `standard` / `fidelity` có thể dùng toàn bộ kiểm kê nguồn để soạn nguyên mẫu Slide mới hữu ích.

Design Spec trao cho mỗi nguyên mẫu Slide được phát ra một hàng danh sách thông thường. Khi nguồn chứa định danh Master/Layout không được tham chiếu, một câu phạm vi có thể ghi rằng chúng tồn tại nhưng không được mirror hiện thực hóa; nó không bịa phân tích sử dụng theo từng định danh.

Việc dùng mẫu là Slide-trước: SVG của mỗi trang sinh ra đã giải quyết hình ảnh Master và Layout của nó, nên việc soạn thông thường chọn nguyên mẫu Slide hoàn chỉnh đó. Workspace không chứa SVG định nghĩa Master/Layout độc lập.

"Chỉ-Slide" mô tả danh sách SVG chỉnh sửa được. Mirror có PPTX làm nền cũng có thể mang các tệp phụ cấu trúc chỉ-cho-công-cụ như `source_themes.json` và `native_payloads.json.gz`; chúng bảo toàn Theme truy cập được chính xác cùng tải khôi phục đục/bản ghi thuộc tính được hỗ trợ và không phải nguyên mẫu trang hay đầu vào soạn của AI. JSON Chart/Table ngữ nghĩa luôn nằm nội dòng trong dấu hiệu SVG của nó.

**Workspace soạn bằng mirror được dùng thế nào**: `replication_mode: mirror` từ-nguồn-tới-workspace là một khả năng, không phải lựa chọn dự án. Strategist kiểm tra các nguyên mẫu thực, nội dung hiện tại và mọi chỉ dẫn tường minh, rồi quyết định chọn, lặp, bỏ hay sắp xếp lại các trang nào và việc tái sử dụng theo nghĩa đen, cấu trúc hay chỉ hình ảnh là phù hợp. Tái sử dụng theo nghĩa đen sao chép một nguyên mẫu hoàn chỉnh và chỉ sửa các giá trị chữ nhìn thấy được cho phép trong khi bảo toàn trang trí, vùng cắt sprite, hình học và khai báo có cấu trúc đã chuẩn hóa. Điều này không bao giờ đòi số trang hay thứ tự của nguồn.

### Bước 4 — Kiểm chứng, xuất rà soát, đăng ký và khám phá

Sau khi tạo, cả hai phạm vi chạy [`svg_quality_checker.py`](../../skills/ppt-master/scripts/svg_quality_checker.py) như một cổng cứng: Brand kiểm chứng spec chỉ-bản-sắc, Style kiểm chứng spec chỉ-hướng/phương-pháp, còn Layout/Deck kiểm chứng danh sách SVG và hợp đồng có cấu trúc. Brand/Style không bao giờ tạo PPTX xem trước. Layout/Deck có thể tạo `exports/<id>_template_preview.pptx` theo yêu cầu, và phải làm vậy khi có nhiều Master. Mẫu đã soạn dùng mẫu giữ chỗ ngắn chỉ-cho-xem-trước để các dấu hiệu chuẩn dài vẫn đọc được mà không đổi SVG nguồn. Hành động riêng theo phạm vi duy nhất là đăng ký thư viện:

| Phạm vi | Thư mục gốc workspace | Xem trước | Hành vi khám phá |
|---|---|---|---|
| `library` (mặc định) | `skills/ppt-master/templates/<kind>/<id>/` | Create Brand/Create Style: Không áp dụng; Create Layout/Create Deck: tùy chọn với một Master, bắt buộc với nhiều Master | Đăng ký vào `brands_index.json`, `styles_index.json`, `layouts_index.json` hoặc `decks_index.json` tương ứng sau khi kiểm chứng |
| `project` | `projects/<name>/` | Cùng hành vi rà soát theo loại | Bỏ qua đăng ký chỉ mục toàn cục |

Đăng ký thư viện làm mẫu **chọn được** trong các điều khiển mẫu Giai đoạn 1 mặc định và khám phá được trong chat vì cả hai đọc cùng chỉ mục. Với phạm vi project hoặc bàn giao chính xác, hãy cung cấp thư mục gốc workspace, ví dụ `dùng mẫu này: projects/<name>/`; điều này khởi tạo chế độ mẫu, đúng một thư mục gốc được cung cấp thì được chọn sẵn, nhiều thư mục gốc được cung cấp vẫn là ứng viên chưa chọn, và thư mục gốc chưa đăng ký vẫn được gắn nhãn `explicit`. Thư mục gốc dự án vẫn dùng trực tiếp được bởi dự án khác và đóng góp mọi spec định danh nó phơi ra. Chuyển một đóng góp vào thư viện một loại đòi đặt thân spec không đổi của nó tại đường dẫn `templates/design_spec.md` trần của workspace thư viện đó và đăng ký nó.

Khi một mẫu Deck/Layout được chọn, Strategist tự động soạn kế hoạch trang/nguyên mẫu. Nó có thể dùng cả danh sách hoặc một tập con, lặp hoặc sắp xếp lại nguyên mẫu, và tổ chức lại nội dung khi cần. `strict` / `adaptive` vẫn là giá trị nội bộ của bộ xuất và không xuất hiện như tùy chọn xác nhận.

### Kiểm tra Master và Layout đã thực sự được áp dụng

Với bộ slide sinh ra có dùng workspace Layout hoặc Deck, hãy kiểm tra sản phẩm phát hành trong Microsoft PowerPoint:

| Kiểm tra | Kết quả mong đợi |
|---|---|
| **View → Slide Master** | Có các Master đã khai báo và Layout có tên. |
| **Home → New Slide** | Tên các Layout tái sử dụng hiện trong bộ chọn layout dưới Master dự định. |
| Chọn một slide sinh ra và xem **Layout** | Slide gắn với Layout đã khai báo của nó, không phải layout suy đoán chung. |
| Nhấp vào một vùng nội dung tái sử dụng | Các slot mẫu hoạt động như placeholder native với kiểu và khung đã khai báo. |
| Thêm slide mới từ một trong các Layout được phát ra | Hình ảnh Master/Layout và hình học placeholder xuất hiện mà không cần sao chép slide nội dung đã hoàn thành. |

Việc dùng Brand/Style cố ý khác: cả hai giữ nội dung đã soạn cục bộ theo Slide, nên đừng mong có danh sách Layout mẫu tái sử dụng nào ngoài giàn gói sạch. Brand cung cấp bản sắc; Style cung cấp mặc định phương pháp/hướng.

`exports/<id>_template_preview.pptx` là bằng chứng rà soát do Create Template tạo khi được yêu cầu hoặc bắt buộc. Nó không phải đầu vào mẫu; việc tạo luôn dùng thư mục gốc workspace.

Microsoft PowerPoint là đích nghiệm thu cho hành vi Master/Layout. Keynote, WPS và LibreOffice mở được file PPTX nhưng có thể chuẩn hóa lại cấu trúc mẫu.

### Workspace mẫu được tạo ra trông thế nào

Phạm vi library và project dùng cùng lược đồ spec và định tuyến tài nguyên; workspace library dùng spec trần còn thư mục gốc project dùng chung dùng spec định danh. Thay `<template_workspace>` bằng `skills/ppt-master/templates/<kind>/<id>/` hoặc `projects/<name>/`:

Brand và Style dừng ở `templates/design_spec.md` (cộng tài nguyên Brand thật khi có); chúng không tạo các hàng SVG hay `exports/` nêu bên dưới.

```
<template_workspace>/
├── templates/
│   ├── design_spec.md
│   ├── 01_cover.svg
│   ├── 02_toc.svg              # tùy chọn; nếu không có: 02_chapter, 03_content, 04_ending
│   ├── 03_chapter.svg
│   ├── 04_content.svg          # dùng bản anh em 04a/04b khi có nhiều biến thể
│   └── 05_ending.svg
├── images/                         # tùy chọn
│   └── *.png / *.jpg           # SVG tham chiếu bằng ../images/<name>
├── icons/                          # tùy chọn
│   └── imported/
│       └── *.svg               # một bản chuẩn của vector nhập
└── exports/                        # tùy chọn; đầu ra rà soát theo yêu cầu
    └── <id>_template_preview.pptx
```

SVG `standard` và `fidelity` dùng từ vựng placeholder soạn thống nhất (`{{TITLE}}`, `{{CHAPTER_TITLE}}`, `{{PAGE_TITLE}}`, `{{CONTENT_AREA}}`, ...). Mỗi slot native là một `<g>` cấp cao nhất với kiểu ngữ nghĩa và khung dương; một slot bình thường chứa đúng một thẻ mang. Hình ảnh Master/Layout cố định là nguyên tử gốc trực tiếp và không bao giờ là phần tử `<g>` lớp. Một Layout có thể cố ý không phơi slot nào.

Workspace `mirror` dùng cùng cây nhưng đặt các tệp `001_cover.svg`, `002_toc.svg`, … theo thứ tự nguồn dưới `templates/`. Nó có thể giữ chữ ví dụ theo nghĩa đen thay vì dấu `{{...}}`, trong khi slot native nhập vẫn mang siêu dữ liệu ngữ nghĩa.

Placeholder vector nhập dùng `data-icon="imported/<name>"`. Kiểm chứng, xuất xem trước và xuất cuối đều phân giải cùng tài nguyên gốc workspace tại `icons/imported/<name>.svg`; bản `templates/icons/` thứ hai vừa không cần vừa không được phép.

### Đăng ký thư viện so với đặt trong dự án

- **Phạm vi library (`library`, mặc định)** ghi workspace dưới `skills/ppt-master/templates/<kind>/<id>/` và đăng ký toàn cục.
- **Phạm vi project (`project`)** ghi spec định danh tại `projects/<name>/templates/design_spec.<kind>.<id>.md` và bỏ qua đăng ký, nên một thư mục gốc dự án có thể tích lũy một đóng góp của mỗi loại qua các lần chạy riêng và trao cả gói cho bất kỳ dự án nào trỏ tới thư mục gốc đó. Layout sở hữu danh sách đang dùng khi Layout và Deck cùng tồn tại.

Kết quả không phải một định dạng riêng tư hay rút gọn chỉ-cho-dự-án. Cung cấp thư mục gốc workspace chính xác thêm nó vào đầu vào ứng viên của Bước 3, đặt mặc định Giai đoạn 1 là chế độ mẫu, và chọn sẵn thư mục gốc đó chỉ khi nó là thư mục gốc duy nhất được cung cấp. Mỗi thư mục gốc riêng biệt di chuyển một lần cùng mọi spec định danh nó phơi ra và mọi `images/` và `icons/` thuộc gói thật; chỉ danh sách SVG Layout-hoặc-Deck hiệu lực được cài; giàn dự án không liên quan và `exports/` bị bỏ qua. Nếu một đóng góp chuyển vào thư viện, hãy đặt nó trong workspace thư viện một loại và chạy đăng ký theo loại để việc khám phá phản ánh vị trí mới.

---

## 3. Ranh giới của mẫu

Các quan niệm sai thường gặp cần tránh:

- **Mẫu tái sử dụng là một workspace tường minh, không phải PPTX nguồn được đóng gói.** Workspace Brand và Style không có danh sách; Layout và Deck thêm hợp đồng SVG có cấu trúc. Các chế độ soạn tạo hợp đồng đó, còn mirror ánh xạ dữ kiện sở hữu nguồn đã kiểm chứng vào nó. Việc xuất chỉ biên dịch cấu trúc đã khai báo
- **Mẫu không phải một "lớp da phong cách" đồng nhất.** Brand, Style, Layout và Deck cố ý tách bản sắc, hướng/phương pháp, cấu trúc và ứng dụng để mỗi phân đoạn có thể được tái sử dụng hoặc kết hợp theo quy tắc sở hữu tường minh
- **Mẫu không quyết định nội dung thay bạn.** Strategist vẫn quyết định theo từng trang dùng layout nào và có mở rộng biến thể hay không. Mẫu đưa ra ứng viên, không phải kết quả định sẵn
- **Chế độ `fidelity` không phải sao chép chính xác từng điểm ảnh.** Kể cả với độ trung thực `literal`, AI vẫn loại bỏ nhiễu và lặp lại không cần thiết — hình học ở lại, dư thừa đi
- **`mirror` nhắm tới vẻ ngoài được hỗ trợ theo nghĩa đen và topo truy cập được của từng Slide nguồn, không phải OOXML giống hệt từng byte.** Nó thừa hưởng giới hạn nhập của nguồn và chỉ cho phép chuẩn hóa cơ học như hoàn tất kế thừa và bung nhóm lớp cố định. Đối tượng native không được hỗ trợ giữ phương án dự phòng SVG sẵn có hoặc được báo cáo; mirror không bao giờ tổng hợp quyền sở hữu thay thế.

---

## Tài liệu liên quan

- [`workflows/create-template.md`](../../skills/ppt-master/workflows/create-template.md) — đặc tả quy trình đầy đủ (dành cho AI)
- [`templates/README.md`](../../skills/ppt-master/templates/README.md) — bốn loại mẫu và các chỉ mục khám phá của chúng
- [`references/template-designer.md`](../../skills/ppt-master/references/template-designer.md) — định nghĩa vai trò Template_Designer và ràng buộc kỹ thuật SVG
- [FAQ: làm sao tạo mẫu tùy chỉnh?](./faq.md) — bản FAQ rút gọn
