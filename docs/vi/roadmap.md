# Lộ trình

[Tiếng Việt](./roadmap.md)

---

> HugoPPTPilot là dự án mã nguồn mở do một người duy trì, vận hành theo **ưu tiên chứ không theo mốc thời gian cố định**. Lộ trình này để thống nhất kỳ vọng: hướng đi, việc đang chạy, việc có thể đến khi nhu cầu thật xuất hiện, và việc cố ý nằm ngoài phạm vi. Ưu tiên thay đổi theo phản hồi người dùng và tín hiệu sử dụng thật — không có cam kết thời hạn giao.

---

## Hướng đi

Trục xác định là **độ sâu native**: soạn hoặc bảo toàn nhiều hơn mô hình đối tượng, hành vi và cấu trúc tái sử dụng của chính PowerPoint, bản phát hành này nối bản phát hành khác — tiệm cận chính PowerPoint. [Hiến chương định vị](./project-positioning.md) nêu đầy đủ luận đề; [Hướng dẫn ánh xạ PowerPoint ↔ SVG](./powerpoint-svg-mapping.md) ghi lại ranh giới hiện tại một cách trung thực, từng tính năng.

Hiện nay trục đó được thể hiện qua ba đường sản phẩm tường minh: **Generate PPTX** soạn slide thiết kế mới qua SVG có ràng buộc → DrawingML; **Create Template** tạo workspace Brand / Style / Layout / Deck tái sử dụng; **Edit Native PPTX** nhập bộ slide có sẵn vào workspace round-trip bảo toàn nguồn và chỉ sửa các trang hoặc lớp phủ đã lên kế hoạch.

---

## Bản đồ phủ khả năng

Một bài thuyết trình có bốn tầng: cái gì có trên slide, nó được sắp xếp ra sao, nó hành xử thế nào, và bản thân tài liệu được cấu trúc ra sao. Các bảng dưới đây ánh xạ từng tầng với những gì HugoPPTPilot làm hôm nay.

**Hãy đọc đây là bản đồ, không phải danh sách việc tồn đọng.** *Giới hạn có chủ đích* và *Bất đối xứng có chủ đích* là những hình dạng đã chốt, không phải ô chưa hoàn thành — ô trống ở đó là một quyết định, không phải một món nợ. Các hàng *Không dự kiến* nêu ngay trong hàng lý do không làm. Chỉ các hàng *Theo tín hiệu* là còn mở, và lý lẽ của chúng nằm ở [Hướng tương lai](#hướng-tương-lai--theo-tín-hiệu) thay vì lặp lại ở đây. Những quan điểm đã được tranh luận xong nằm ở [Điều không phải mục tiêu](#điều-không-phải-mục-tiêu); bản đồ này mô tả, không phán xử.

| Trạng thái | Ý nghĩa |
|---|---|
| **Hệ thống hóa** | Có hợp đồng soạn riêng; các phần áp dụng được, quyết định được khách quan được kiểm chứng; được tinh chỉnh tích cực |
| **Đã phủ** | Hoạt động hôm nay mà không cần hệ thống đặc tả riêng |
| **Giới hạn có chủ đích** | Cố ý dừng ở đúng chỗ; lý do được ghi lại |
| **Bất đối xứng có chủ đích** | Chỉ hỗ trợ một phía — thường là đọc hoặc bảo toàn bộ slide nguồn, nhưng không soạn |
| **Theo tín hiệu** | Đáng làm khi nhu cầu thật xuất hiện; không phải cam kết |
| **Không dự kiến** | Hiện không được cân nhắc; lý do nằm trong hàng |

### Tầng 1 — Đối tượng nhìn thấy

| Đối tượng | Trạng thái | Ghi chú |
|---|---|---|
| Chữ | Hệ thống hóa | Neo vai trò toàn bộ slide, điều chỉnh có giới hạn từng lần xuất hiện, quy tắc thứ bậc và đoạn, run chỉnh sửa native |
| WordArt native & chữ biến dạng | Không dự kiến | Chữ trang trí do AI tạo là thẻ mang hình ảnh ưu tiên, với chữ chỉnh sửa được thông thường làm phương án dự phòng. WordArt native, uốn chữ và chữ theo đường sẽ thêm một bề mặt soạn và tương thích riêng mà không cải thiện đường đó, nên không được sinh ra |
| Hình khối vector | Hệ thống hóa | nguyên tử primitive / preset Office → bố cục độc lập → Boolean chỉ khi một đường viền đòi hỏi → thang dựng tự do cần thiết, với quy tắc chuyển đổi native |
| Đường & đường nối | Bất đối xứng có chủ đích | Xuất `p:cxnSp` native đã được triển khai, và việc gắn đầu mút được khôi phục trên round-trip bảo toàn/mirror từ bộ slide nguồn. Đường nối mới soạn vẫn không gắn. Gắn chúng trước hết đòi quyết định đường nào là cạnh thật, đường nào là trang trí — một phán đoán ý định mà không ngưỡng hình học nào giải quyết được, và do AI đưa ra ở bất kỳ nơi nào nó được đặt, nên dời lên khâu soạn không tăng độ tin cậy. Kết quả sẽ là vài mũi tên trong sơ đồ bám theo nút của chúng còn vài mũi khác thì không |
| Biểu tượng | Hệ thống hóa | Thư viện SVG đi kèm có đồng bộ theo dự án; biểu tượng dự án là tài nguyên đã chuẩn bị. Gợi ý minh họa vẫn là các lát do AI tạo dưới `images/` để dựng ảnh thông thường và không bao giờ trở thành mục thư viện biểu tượng |
| Logo | Giới hạn có chủ đích | Logo luôn là tác phẩm có sẵn, không bao giờ được thiết kế ở đây: workspace thương hiệu cài các tệp chính thức do nhà cung cấp đưa làm tài nguyên đã chuẩn bị — preset thương hiệu đi kèm có dấu hiệu chính thức cùng quy tắc sử dụng ghi lại — và thư viện simple-icons phủ các dấu hiệu công ty / sản phẩm thật |
| Hình ảnh | Hệ thống hóa | Thu thập, tạo, xử lý, cắt, bố cục, dựng, nhúng, nguồn gốc |
| Biểu đồ | Hệ thống hóa | Tài liệu soạn riêng; mặc định là SVG, thay bằng Chart native là lựa chọn bật tường minh |
| Bảng | Hệ thống hóa | Tài liệu soạn riêng; sáu tham chiếu lưới ô tái sử dụng, vẫn có thể dùng lưới tùy chỉnh; thay bằng Table native dùng cùng cơ chế bật |
| Sơ đồ | Hệ thống hóa | Sáu nguyên tử quan hệ — `order`, `link`, `parent`, `membership`, `contrast`, `overlap` |
| Công thức | Hệ thống hóa | Công thức khối độc lập và nội dòng cùng đoạn biên dịch mọi đầu vào LaTeX / mhchem Microsoft 365 được ghi tài liệu tường minh thành OMML chỉnh sửa được, kèm các chuẩn hóa native có ghi và xử lý thất bại có kiểm soát ngoài hồ sơ. Nhập PPTX dựng lại OMML do HugoPPTPilot sở hữu và sạch với bộ kiểm chứng thành dấu hiệu công thức chuẩn hóa kèm bản xem trước SVG nhìn thấy; OMML bên thứ ba tùy ý và khôi phục cách viết LaTeX gốc nằm ngoài hợp đồng. Ứng dụng không phải PowerPoint nhận bản xem trước SVG dưới dạng `mc:Fallback` hình khối native, không bao giờ là ảnh. Đích gói vẫn là PowerPoint 2010+; hồ sơ thực thi được ghim theo các phiên bản tài liệu Microsoft nêu, còn kiểm chứng của repo ở cấp bộ biên dịch/OMML/gói chứ không phải chứng nhận đầy đủ giao diện Microsoft 365. Ứng dụng không phải PowerPoint vẫn nằm ngoài hợp đồng |
| Âm thanh thuyết minh & hiệu ứng | Hệ thống hóa | Âm thanh thuyết minh từng slide, cộng âm chuyển trang và đối tượng native lấy từ danh mục CC0 đi kèm |
| Video tùy ý & nhạc nền | Không dự kiến | Một phần chèn riêng lẻ, theo nội dung, đặt tay trong PowerPoint nhanh hơn, và AI không thể chọn tệp thay bạn. Nhạc nền còn kéo theo các quyết định phối thuyết minh nằm ngoài phạm vi. Đa phương tiện đã có trong bộ slide nguồn được giữ nguyên qua Edit Native PPTX |
| SmartArt | Bất đối xứng có chủ đích | Các phần sơ đồ nguồn được đọc để lấy nội dung và cấu trúc; bộ slide sinh ra vẽ lại nội dung đó qua đường hình khối thông thường. DiagramML không bao giờ được chỉnh sửa và việc tạo lại SmartArt native không được hứa |
| Mô hình 3D, đối tượng OLE | Không dự kiến | Cả hai cần ứng dụng chủ hoặc bản Office gần đây trên máy mở file và quay về ảnh xem trước tĩnh ở nơi khác — vấn đề đa bộ dựng hình mà dự án này tránh từ thiết kế. Chèn tay chỉ mất vài giây. Đối tượng đã có trong bộ slide nguồn được giữ nguyên |
| Mực viết & luồng camera (Cameo) | Không dự kiến | Chú thích vẽ tay và đối tượng camera trực tiếp là bề mặt của phiên người trình bày chứ không phải nội dung thiết kế sinh ra, và cả hai phụ thuộc bản Office gần đây. Các phần như vậy đã có trong bộ slide nguồn đi qua các đường bảo toàn nguồn như cấu trúc gói không đụng tới |

*Minh họa* cố ý vắng mặt trong bảng này. Nó là một kết quả có thể kết hợp — ảnh, lát trong suốt, SVG hay nhóm hình khối — không phải thẻ mang thứ bảy. Nó có thể kết hợp với bất kỳ thẻ mang trang phù hợp nào khác; liệt kê nó cạnh *Hình ảnh* sẽ tái lập sự nhầm lẫn về nhóm mà cách phân tầng này loại bỏ.

### Tầng 2 — Bố cục

| Mối quan tâm | Trạng thái | Ghi chú |
|---|---|---|
| Nền | Hệ thống hóa | Nền trang đặc và gradient xuất thành nền slide native của PowerPoint; trường hợp ảnh là theo tín hiệu |
| Phân lớp & nhóm | Hệ thống hóa | Hợp đồng z-order và nhóm tường minh, gồm cặp lớp nền/chủ thể đã đăng ký |
| Bố cục minh họa | Hệ thống hóa | Lập kế hoạch theo từng trang như một họ phần tử nhất quán; khi có tạo ảnh, các tài nguyên tương thích có thể tạo hàng loạt trên tờ khóa, cắt alpha nghiêm ngặt, rồi dùng lại làm khung tiêu đề/góc cố định hoặc bố trí lại làm điểm neo, hình phụ và điểm nhấn cạnh chữ, hình khối, ảnh chụp và chữ trang trí |
| Lưới, căn chỉnh, khoảng trắng | Hệ thống hóa | Hợp đồng bố cục chung cộng từ vựng hình học bố cục mà mỗi phong cách hình ảnh mang theo |
| Bảng màu | Hệ thống hóa | Giá trị HEX đã khai báo là nguồn sự thật cho các vai trò ngữ nghĩa có tên; neo vai trò tái sử dụng ổn định trên toàn bộ slide, còn dẫn xuất theo ngữ cảnh và điểm nhấn thưa cục bộ theo trang vẫn dùng được |
| Kiểu chữ | Hệ thống hóa | Một neo cỡ chữ toàn bộ slide cho mỗi vai trò cấu trúc, với điều chỉnh có giới hạn `±2px` mỗi lần xuất hiện và ngoại lệ Hero/Display không-cấu-trúc thưa |
| Hiệu ứng thị giác | Hệ thống hóa | Tài liệu hiệu ứng riêng; một bóng ngoài hoặc phát sáng đã đăng ký biên dịch thành một hiệu ứng native chỉnh sửa được trên đối tượng cơ bản được hỗ trợ và hình preset soạn gọn |
| Đường đọc | Hệ thống hóa | Kế hoạch mỗi trang khai báo một điểm nhấn chính neo lối vào, tiến trình, thứ bậc và điểm kết; rà soát hình ảnh kiểm tra phần tử nổi bật nhất và vị trí neo theo khai báo đó |

### Tầng 3 — Hành vi

| Mối quan tâm | Trạng thái | Ghi chú |
|---|---|---|
| Chuyển trang | Hệ thống hóa | Gồm âm chuyển trang theo yêu cầu từ danh mục CC0 đi kèm; nhập PPTX dựng lại chính xác các chuyển trang thuộc kho hiện tại vào tệp phụ chuẩn |
| Hiệu ứng đối tượng | Hệ thống hóa | Mặc định tắt và bật chủ động; cấu hình từng đối tượng là tường minh, và nhập PPTX dựng lại tập con hữu hạn có thời lượng chính xác của kho hiện tại vào tệp phụ chuẩn |
| Tự chuyển slide | Đã phủ | Suy ra từ độ trễ mở đầu thuyết minh, độ dài âm thanh và khoảng đệm cuối trang |
| Phát đa phương tiện | Đã phủ | Âm thanh thuyết minh và âm hiệu ứng phát native; đa phương tiện đã có trong bộ slide nguồn giữ thiết lập phát |
| Siêu liên kết | Hệ thống hóa | Liên kết trên cả đối tượng và chữ nội dòng soạn qua `<a href>` SVG chuẩn, xuất thành quan hệ nhấp chuột native bên ngoài hoặc trong cùng bộ slide, và được dựng lại khi nhập PPTX được hỗ trợ |
| Hành động & điều hướng | Hệ thống hóa | Điều hướng được soạn tường minh bằng cách bọc đích trong neo siêu liên kết, gồm nhảy slide cùng bộ. Một preset `actionButton*` chỉ đóng góp hình học thị giác — chỉ riêng vẻ ngoài không bao giờ ngụ ý hành động. Kích hoạt khi di chuột, custom show, thực thi macro hay chương trình, và chèn `ppaction://` thô nằm ngoài hợp đồng |
| Zoom (tóm tắt / phần / slide) | Không dự kiến | Một đối tượng điều hướng phụ thuộc bản Office và quay về ảnh tĩnh ở bộ dựng hình khác — sự suy giảm đa bộ dựng hình mà dự án này tránh từ thiết kế. Nhảy trong cùng bộ slide đã được phủ bằng đích slide của siêu liên kết native |

### Tầng 4 — Cấu trúc tài liệu

| Mối quan tâm | Trạng thái | Ghi chú |
|---|---|---|
| Kích thước slide | Hệ thống hóa | Hợp đồng khung chọn định dạng trình bày; `viewBox` SVG là nguồn sự thật hình học duy nhất với kiểm chứng thất bại có kiểm soát, và mọi trang trong bộ slide phải thống nhất một định dạng |
| Theme | Hệ thống hóa | Xuất Default dựa trên khóa suy ra `clrScheme`, phông chính/phụ và mặc định cỡ chữ tiêu đề/nội dung của Master cho từng bộ slide từ hợp đồng bảng màu và kiểu chữ. Quick phẳng giữ phần dàn Theme mặc định của bộ chuyển đổi. Quick có cấu trúc giữ Theme nguồn theo từng Master đã cài khi có và suy ra mặc định cỡ chữ tiêu đề/nội dung của Master từ các thẻ khe ngữ nghĩa; màu và phông trang suy ra từ SVG vẫn là giá trị trực tiếp |
| Nhúng phông | Giới hạn có chủ đích | Phông không bao giờ được nhúng vào gói; một mặt chữ thương hiệu hay web chỉ đứng đầu sau khi xác nhận có trên hệ thống đích, nếu không bản xuất dùng một họ phông an toàn và ghi mặt chữ dự định trong Design Spec |
| Section slide | Bất đối xứng có chủ đích | Edit Native PPTX giữ siêu dữ liệu section hiện có khi danh sách định danh không đụng cấu trúc trình bày; danh sách `page_plan.json` bỏ section. Các đường tạo hoặc dựng lại danh sách slide không soạn Section PowerPoint vì vai trò trang và các Part tùy chọn của Design Spec không tạo thành hợp đồng section bắt buộc toàn đường. Section chỉ đổi cách thanh thumbnail tổ chức bộ slide và không bao giờ đổi vẻ ngoài trang; gom nhóm bộ slide dài bằng tay trong PowerPoint mất khoảng một phút và chỉ làm một lần |
| Master / Layout | Hệ thống hóa | Các phần `p:sldMaster` / `p:sldLayout` thật trên các đường có cấu trúc |
| Placeholder | Hệ thống hóa | Hợp đồng workspace mẫu, với hành vi bộ xuất nghiêm ngặt/thích nghi suy ra theo từng bộ slide |
| Trường ngày, chân trang & số trang | Giới hạn có chủ đích | Các đường mẫu có cấu trúc soạn placeholder ngày / chân trang / số trang thật theo hợp đồng placeholder. Bộ slide thiết kế tự do cố ý giữ số trang và chân trang vẽ tay làm chữ thông thường: một con số trang thường là phần tử thiết kế chứ không phải trường chuẩn, phân biệt hai loại là phán đoán ý định, và chèn trường chuẩn bằng tay trong PowerPoint chỉ mất vài giây và làm một lần |
| Ghi chú người trình bày | Hệ thống hóa | Xuất cùng notes master thật |
| Thuyết minh | Hệ thống hóa | Âm thanh từng slide kèm nguồn gốc nhà cung cấp |
| Phụ đề | Hệ thống hóa | Gom lại theo thời gian từ trên các nhà cung cấp được hỗ trợ thành SRT gọn dùng chung |
| Siêu dữ liệu tài liệu | Đã phủ | Đặt lúc xuất thay vì để thư viện đóng gói quyết định |
| Khả năng truy cập (văn bản thay thế, thứ tự đọc) | Không dự kiến | Ảnh do AI tạo mang trường `alt_text` và ảnh cào từ web ghi lại thuộc tính `alt` thường trống của trang, nhưng hình khối, biểu đồ, sơ đồ và ảnh do người dùng cung cấp hoàn toàn không có mô tả — phủ đầy đủ nghĩa là soạn mô tả cho mọi đối tượng không phải chữ, không phải nối dữ liệu sẵn có. Thứ tự đọc không phải thuộc tính riêng trong PowerPoint: đó là thứ tự hình khối, mang cả phân lớp thị giác của trang và không đặt độc lập với nó |
| Macro & XML mở rộng Office | Bất đối xứng có chủ đích | Không bao giờ được soạn — đường sinh ra không tổng hợp VBA; các phần macro hoặc mở rộng hiện có chỉ tồn tại ở nơi quy trình bảo toàn nguồn có nhận biết macro giữ nguyên các phần gói sở hữu chúng |
| Nhận xét, bản sửa đổi, trạng thái cộng tác | Không dự kiến | Bề mặt cộng tác Office, nằm ngoài sản phẩm soạn thảo |

---

## Đang làm / Tiếp theo

Đang tiến hành hoặc kế tiếp — không có mốc thời gian cam kết.

- **Hiệu chỉnh các hệ thống mới đưa vào trên bộ slide thật** — nhập nhiều bộ slide, trường mức độ tự do với tài liệu, hệ thống minh họa có thể kết hợp và tạo mẫu có cấu trúc đều đã giao; thứ chúng cần giờ là tín hiệu sử dụng thật, không phải thêm cơ chế. Không đặt ngưỡng hay hạn mức trước.
- **Thu gọn prompt** — nén dấu chân token của prompt theo vai trò và cải thiện tỷ lệ trúng bộ nhớ đệm mà không hy sinh chất lượng. Đây là đòn bẩy chi phí/tốc độ gián tiếp; ranh giới với các cách tăng tốc làm hy sinh chất lượng được vạch ở Điều không phải mục tiêu.

---

## Hướng tương lai — theo tín hiệu

Các ứng viên đã được đánh giá là "đáng làm khi nhu cầu thật xuất hiện", được liệt kê để ý định được công khai. Không cái nào là cam kết.

- **Tiếp tục thu hẹp khoảng trống phủ native** ghi trong [hướng dẫn ánh xạ](./powerpoint-svg-mapping.md) — bản phát hành này nối bản phát hành khác, chuyển thêm các ô "chỉ-SVG" về phía cấu trúc và hành vi native của PowerPoint.
- **Ảnh làm nền slide dưới dạng tô nền native** — nền trang đặc/gradient đã xuất thành nền slide native của PowerPoint; trường hợp ảnh phụ thuộc nhu cầu.

---

## Các mốc đã giao

Mỗi tháng một dòng.

| Thời điểm | Chủ đề |
|---|---|
| 2026-03 | **Đường PPTX native thành hình** — chuỗi SVG → DrawingML dùng được; chỉ mục mẫu biểu đồ/bố cục ra mắt |
| 2026-04 | **Quy trình ở quy mô lớn** — tạo chỉ từ chủ đề, 70 mẫu biểu đồ + ba thư viện biểu tượng, hợp đồng nhất quán đa trang `spec_lock`, hiệu ứng từng phần tử và xuất thuyết minh/video |
| 2026-05 | **Chỉnh sửa trực quan + hệ thống hóa ảnh AI** — Xem trước trực tiếp với chỉnh sửa tại chỗ xác định, workspace mẫu từ PPTX, hệ thống ảnh kỹ thuật dựng × bảng màu × kiểu chữ, và bộ dựng LaTeX raster cũ |
| 2026-06 | **Hai danh mục chế độ & phong cách hình ảnh + mở rộng tiếp nhận** — 5 chế độ kể × 18 phong cách hình ảnh (+ `custom`), hồ sơ beautify trung thành nội dung, nhập nhiều bộ slide, quy trình minh họa có thể kết hợp, cổng chất lượng ảnh web, cải thiện độ trung thực chuyển đổi nguồn (nhận diện chú thích, giữ siêu liên kết) |
| 2026-07 | **Hiến chương định vị + master & layout native + hiệu quả token** — giao diện xác nhận ba lượt theo giai đoạn, xuất `p:sldMaster` / `p:sldLayout` thật, tùy chọn `--native-charts-and-tables`, gia cố xuất chuyển động, thu gọn thư viện mẫu biểu đồ |
| 2026-08 | **Thư viện mẫu + dựng lại ảnh trang + toán và liên kết native + ảnh AI như bố cục** — thư viện workspace thương hiệu / phong cách / bố cục, trực quan hóa chia theo mô hình thông tin với cấu trúc là ngữ pháp bố cục, hồ sơ `image-to-pptx` do Codex hỗ trợ, bàn giao video mang âm hiệu ứng native, ba hướng thiết kế giải pháp trọn gói chỉnh sửa được, công thức OMML chỉnh sửa được trong hồ sơ Microsoft 365 đã ghi, soạn siêu liên kết native, họ minh họa AI có thể kết hợp và chữ trang trí, lấy ảnh theo nhiệm vụ với rà soát thumbnail biệt lập, nhập ngược chuyển trang và hiệu ứng đối tượng, và bản đồ phủ khả năng bốn tầng |

---

## Điều không phải mục tiêu

Những hướng dưới đây xuất hiện lặp đi lặp lại và đã được đánh giá là **không nằm trên đường đi**. Liệt kê chúng không phải đánh giá giá trị về nhu cầu bên dưới — chúng chỉ không khớp hướng sản phẩm của dự án này. Nếu bạn thật sự cần các khả năng này, hãy cân nhắc công cụ khác hoặc tự fork.

### Điền mù bất kỳ hệ thống placeholder PPTX tùy ý nào

Đường Generate PPTX được xây quanh việc kiểm soát hoàn toàn hình khối, chữ và bố cục mới soạn. Một PPTX có cấu trúc có thể làm nền cho một gói tái sử dụng đã rà soát theo hai cách tường minh: `standard` / `fidelity` soạn nguyên mẫu SVG Slide hoàn chỉnh mới và một hệ thống Master/Layout từ toàn bộ bằng chứng nguồn, còn `mirror` hiện thực hóa các Slide nguồn chỉ với chuỗi Layout/Master truy cập được của chúng. Cả hai đường đều không sửa PPTX nguồn hay khôi phục ý định thiết kế vắng mặt. "Mở bất kỳ PPTX nào và điền mù mọi placeholder" nói chung vẫn là một hình dạng sản phẩm khác.

**Nhu cầu cơ bản thực ra đơn giản**: nếu bạn chỉ cần "thay dữ liệu Excel vào các vị trí cố định trong mẫu PPT", hãy nhờ AI viết vài dòng `python-pptx`. Bạn không cần quy trình này.

> **Ranh giới được hỗ trợ**: Edit Native PPTX (`edit-native-pptx`) nhập bộ slide có sẵn vào workspace round-trip, tham chiếu các trang không đổi đến từng byte, và chỉ sửa các trang hoặc lớp phủ đã lên kế hoạch. Create Template (`create-template`) suy ra một triển khai nội bộ dạng soạn hoặc mirror từ yêu cầu ngôn ngữ tự nhiên và bằng chứng nguồn. Strategist về sau suy ra hành vi bộ xuất nghiêm ngặt/thích nghi từ mẫu thực tế và nội dung hiện tại. Phần vẫn nằm ngoài phạm vi là thay thế không rà soát, không lược đồ, trên hệ thống placeholder bên thứ ba tùy ý.

### Đặt biểu đồ PowerPoint native làm mặc định

Độ trung thực đến từng điểm ảnh trên bốn bộ dựng hình (PowerPoint / Keynote / LibreOffice / WPS) là xương sống của dự án. Chuyển đường mặc định sang biểu đồ PowerPoint native phá vỡ điều đó — cùng một PPTX hiển thị bố cục biểu đồ khác nhau trên các bộ dựng hình. Biểu đồ dạng SVG là **chủ đích thiết kế**, không phải khoảng trống khả năng.

Ngoại lệ hẹp là dấu hiệu `data-pptx-replace-with`: các biểu đồ dữ liệu được hỗ trợ và bảng lưới chữ thuần được lập kế hoạch độc lập có thể mang tải thay thế Chart/Table native của PowerPoint khi khóa đối tượng ngữ nghĩa của chúng được ghi là `<object-key>=yes` trong bản đồ `Native-ready` của Design Spec §IX; `no` và các vi trực quan ngẫu nhiên vẫn là hình khối thông thường. §VII chỉ ghi các tham chiếu tái sử dụng đã chọn. Xuất bằng `--native-charts-and-tables` kích hoạt các dấu hiệu đã chuẩn bị cho người dùng cố ý đánh đổi độ trung thực đa bộ dựng hình lấy một đối tượng có dữ liệu và mô hình chỉnh sửa riêng của biểu đồ/bảng — các đối tượng được kích hoạt giữ màu vùng biểu đồ / vùng vẽ / trục / đường lưới / nhãn và định dạng bảng native của bộ slide thay vì rơi về theme mặc định của PowerPoint. Đường xuất mặc định và hệ hình khối chỉnh sửa được sinh từ SVG không đổi.

### uv làm phụ thuộc mặc định / bắt buộc

`pip + requirements.txt` là đường cài chính thức duy nhất vì nó hoạt động trong mọi môi trường Python mà không tốn chi phí học thêm. uv là công cụ tốt, nhưng đặt nó làm mặc định nâng ngưỡng cho người mới. Nếu cá nhân bạn thích uv, hãy dùng nó trong fork của bạn — nó không ảnh hưởng nhánh chính.

### Tối ưu tốc độ thuần túy

Trong tam giác chi phí / tốc độ / chất lượng, dự án này chọn **chất lượng**. Khoảng 20 phút cho một PPTX chất lượng cao là điểm hợp lý hiện nay.

Sẽ làm: cải thiện gián tiếp qua thu gọn prompt / tỷ lệ trúng bộ nhớ đệm.

`quick-generate` tường minh là lối tắt quy trình do người dùng chọn: nó bỏ Strategist và xác nhận, rồi soạn SVG, chạy cổng sớm giữa danh sách dùng chung với danh sách bảy trang trở lên cộng một cổng chất lượng cuối không khóa, và xuất PPTX cuối. Vì toàn bộ giai đoạn lập kế hoạch không còn diễn ra — việc nạp tham chiếu Strategist, các sản phẩm `design_spec.md` / `spec_lock.md` và vòng xác nhận theo giai đoạn — chi phí token của nó biến mất cùng, trong khi việc soạn SVG từng trang không đổi. Nó giữ cùng khả năng soạn hình ảnh và tài nguyên ở cấp trang và các tiêu chuẩn chặn SVG/tài nguyên chung. Nó không chạy kiểm tra căn chỉnh Spec Lock hay suy ra Theme dự án hiện tại từ một lock. Quick phẳng giữ phần dàn Theme mặc định của bộ chuyển đổi; Quick có cấu trúc giữ Theme nguồn theo từng Master đã cài khi có và suy ra mặc định cỡ chữ tiêu đề/nội dung của Master từ các thẻ khe ngữ nghĩa. Không có hợp đồng thiết kế đã xác nhận hay lịch sử quyết định có thể tiếp tục, nó không hứa cùng các quyết định thiết kế hay thời gian thực tế như Default.

Quy trình Generate mặc định tiếp tục ưu tiên chất lượng hơn tốc độ.

### Các hình thức CLI độc lập / SaaS lưu trữ / ứng dụng máy tính

Hình thức sản phẩm là một **quy trình / skill điều khiển bằng chat bên trong công cụ AI có khả năng agent** (Claude Code, Codex, Cursor, agent trong VS Code và các công cụ khác).

Sẽ không làm: CLI độc lập (kiểu `ppm`), dịch vụ web SaaS, vỏ Electron. Mọi đề xuất "cho nó chạy độc lập với chat" sẽ bị từ chối. Chat là lõi tương tác, không phải lớp vỏ.

---

## Kênh phản hồi

- **Issues**: [github.com/iDMA-dev/HugoPPTPilot/issues](https://github.com/iDMA-dev/HugoPPTPilot/issues) — lỗi / đề xuất
- **Discussions**: [github.com/iDMA-dev/HugoPPTPilot/discussions](https://github.com/iDMA-dev/HugoPPTPilot/discussions) — cách dùng / chia sẻ kinh nghiệm

Trước khi đề xuất một hướng mới, hãy xem qua **Điều không phải mục tiêu** ở trên. Nếu yêu cầu của bạn thuộc nhóm đó, nhiều khả năng sẽ không được nhận — nhưng chúng tôi sẵn lòng bàn các đường khác tới nhu cầu gốc của bạn.
