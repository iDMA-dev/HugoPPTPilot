# Hướng dẫn ánh xạ tính năng PowerPoint ↔ SVG của dự án

[Tiếng Việt](./powerpoint-svg-mapping.md)

---

## Mục đích và thẩm quyền

Hướng dẫn này trả lời một câu hỏi từ góc nhìn người dùng PowerPoint: **với một tính năng PowerPoint, biểu diễn nào của dự án sở hữu nó, và điều gì còn lại sau khi xuất hoặc nhập?** Vì vậy ngữ nghĩa PowerPoint là chỉ mục chính. Phần tử SVG chỉ xuất hiện như cách triển khai của một khả năng PowerPoint cụ thể.

Đây là bản đồ công khai về khả năng và hành vi nhập, không phải đặc tả cú pháp SVG sinh ra thứ hai, và không phải lời hứa chuyển đổi SVG hay OOXML tùy ý. Hợp đồng soạn sinh ra chuẩn có thẩm quyền là tập thẩm quyền được chọn qua [`shared-standards.md`](../../skills/ppt-master/references/shared-standards.md); khi cú pháp sinh ra khác nhau, mô-đun áp dụng được sẽ thắng. Các chế độ khôi phục khi nhập PPTX và sự suy giảm người dùng nhìn thấy thuộc §12 ở đây và [tài liệu tham chiếu lệnh chuyển đổi](../../skills/ppt-master/scripts/docs/conversion.md), trong khi cách triển khai bộ phân tích vẫn là nguồn sự thật chính xác. Một tính năng không được liệt kê ở đây thì không được ngầm hiểu là có hỗ trợ.

Đường chính biên dịch **SVG chuẩn của dự án**, không phải SVG trình duyệt thông thường:

```text
Ý định PowerPoint
    ↔ SVG chuẩn của dự án hoặc một tệp phụ tường minh
    ↔ DrawingML / ngữ nghĩa gói PPTX
```

Một số tính năng PowerPoint không có tương đương SVG trung thực. Chúng được trình bày là tính năng tệp phụ/gói, tính năng bảo toàn PPTX trực tiếp, hoặc tính năng không hỗ trợ, thay vì bị ép vào siêu dữ liệu SVG trang trí.

## Cách đọc các bảng

Mỗi hàng sở hữu một khả năng PowerPoint. Bản số ánh xạ không phải lúc nào cũng là một đối tượng - một đối tượng: một nút văn bản SVG có thể tạo nhiều run PowerPoint, một nhóm dấu hiệu biểu đồ native có thể gộp thành một `p:graphicFrame`, và một đối tượng PowerPoint nhập vào có thể được dựng lại thành nhiều phần tử SVG.

| Thuật ngữ | Ý nghĩa |
|---|---|
| `Native-stable` | Xuất dùng thuộc tính hoặc đối tượng DrawingML chỉnh sửa được tương ứng trong giới hạn đã ghi. |
| `Native-normalized` | Xuất vẫn chỉnh sửa được, nhưng nguồn được chuẩn hóa thành cấu trúc DrawingML tương đương. |
| `Approximate` | PowerPoint không có tương đương chính xác; hãy xem lại PPTX sinh ra khi hiệu ứng quan trọng. |
| `Bake-required` | Dựng sẵn thành ảnh hoặc dựng lại bằng hình học tường minh được hỗ trợ. |
| `Sidecar/package` | Khả năng thuộc về tệp phụ dự án hoặc bộ ghi gói PPTX, không thuộc thiết kế trang SVG. |
| `Direct preservation` | Quy trình PPTX trực tiếp có thể giữ OOXML nguồn; bộ biên dịch SVG chính không tạo lại nó. |
| `Unsupported` | Đường tạo chính không có ánh xạ đã đăng ký và không được đoán. |

"Nhập" dưới đây nghĩa là phép chiếu ngữ nghĩa do đường PPTX-sang-SVG tạo ra, không phải khôi phục SVG gốc hay ý định thiết kế vắng mặt. Nó không hứa đồ thị `<defs>` gốc, cấu trúc `<use>`, lệnh path hay bố cục `<tspan>`.

## 1. Mô hình bài thuyết trình, slide và tọa độ

| Tính năng PowerPoint | Biểu diễn của dự án | Kết quả PPTX | Nhập và độ trung thực | Ranh giới kiểm chứng |
|---|---|---|---|---|
| Kích thước slide | `viewBox="0 0 W H"` của SVG gốc, chọn qua hợp đồng khung dự án | Chiều rộng và chiều cao bài thuyết trình; `1 SVG px = 9.525 EMU` ở 96 DPI | `Native-stable`; kích thước PPTX tùy chỉnh nhập vào có thể dùng kích thước thập phân tương thích | Giá trị phải hữu hạn với gốc bằng không và kích thước dương được hỗ trợ; mọi trang công khai / nguyên mẫu Layout nội bộ phải khớp lock; cấm transform ở gốc |
| Slide | Một trang `svg_output/<slide>.svg` hoàn chỉnh | Một `p:sld` cùng các quan hệ của nó | Dựng lại thành một trang SVG hoàn chỉnh | SVG là thẩm quyền của trang nhìn thấy; ghi chú và hành vi gói tách riêng |
| Vị trí và kích thước đối tượng | Tọa độ SVG tuyệt đối và biên phần tử | Độ lệch và phạm vi `a:xfrm` | `Native-normalized` qua chuyển đổi tọa độ | Giá trị phải hữu hạn và dùng ngữ pháp tọa độ đã đăng ký |
| Thứ tự xếp lớp (Z-order) | Thứ tự nguồn SVG, từ sau ra trước | Thứ tự cây hình khối PowerPoint | Dựng lại theo thứ tự cây hình khối | Đừng dựa vào hành vi xếp chồng chỉ có ở trình duyệt |
| Xoay, co giãn, tịnh tiến và lật | Các dạng transform SVG được hỗ trợ | Transform DrawingML hoặc hình học chuẩn hóa | `Native-normalized`; ma trận có thể bị phân rã | Skew và shear ngoài hợp đồng transform đã đăng ký không được chấp nhận |
| Màu và phông của Theme | Default dùng vai trò ổn định neo trong `spec_lock.md`; Quick giữ neo thiết kế tạm thời trong ngữ cảnh hoạt động không có lock lưu bền | Default suy ra Theme gói và giữ token nhận biết theme nơi một vai trò neo chính xác áp dụng; nếu không thì ghi giá trị DrawingML trực tiếp. Quick phẳng dùng giàn Theme mặc định của bộ chuyển đổi. Quick có cấu trúc giữ Theme nguồn theo từng Master đã cài khi có và suy ra mặc định cỡ chữ tiêu đề/nội dung của Master từ thẻ khe ngữ nghĩa; màu/phông trang SVG vẫn là giá trị trực tiếp | `Native-stable` cho vai trò/giá trị trực tiếp đã đăng ký | Default kiểm chứng căn chỉnh lock; Quick bỏ phép so sánh đó. Cả hai từ chối giá trị không hợp lệ; tính di động phông và độ sẵn có trên hệ thống đích chỉ mang tính tư vấn, trong khi màu theo ngữ cảnh và phông dùng một lần an toàn khi xuất vẫn được phép |
| Định danh gói riêng của PowerPoint | Khai báo cấu trúc `spec_lock.md` và bộ dựng gói | Đăng ký Presentation, Master, Layout, quan hệ và content-type | Đọc lại từ cấu trúc gói, không suy ra từ vẻ ngoài trang | Đọc lại gói cuối phải khớp danh sách đã khai báo |

Xem [`canvas-formats.md`](../../skills/ppt-master/references/canvas-formats.md) về các khung được hỗ trợ và [`shared-standards-core.md` §4.1](../../skills/ppt-master/references/shared-standards-core.md#41-semantic-svg-marker-contract) về hợp đồng `viewBox` gốc chuẩn tắc.

## 2. Tính năng Master, Layout, nền và placeholder

**Ranh giới đường**: Dự án thiết kế tự do và chỉ-thương-hiệu trong đường SVG chính vẫn ở `pptx_structure.mode: flat` từ lập kế hoạch đến xuất; `flat` không phải trạng thái tạm chờ bộ xuất nâng cấp. Logo, chân trang hay layout lặp lại không bao giờ làm bộ xuất chuyển sang `structured`, nâng nội dung vào Master/Layout, suy placeholder hay khử trùng đối tượng. Đầu ra đòi hành vi Master, Layout hoặc placeholder native tái sử dụng phải vào Bước 3 với một workspace mẫu deck/layout đã kiểm chứng; khi chưa có, hãy chạy [`create-template`](../../skills/ppt-master/workflows/create-template.md) trước rồi quay lại đường chính với workspace đó. Master tối thiểu và Blank Layout do xuất phẳng phát ra là giàn gói PPTX, không phải master thiết kế suy ra từ các slide. Điền nội dung mới vào PPTX thô trong khi bảo toàn thiết kế của nó thuộc [`edit-native-pptx`](../../skills/ppt-master/workflows/edit-native-pptx.md).

| Tính năng PowerPoint | Biểu diễn của dự án | Kết quả PPTX | Nhập và độ trung thực | Ranh giới kiểm chứng |
|---|---|---|---|---|
| Cấu trúc bộ slide thiết kế tự do | `pptx_structure.mode: flat`; nội dung trang vẫn cục bộ theo slide | Một Master dự án sạch và một Blank Layout, với đối tượng được biểu diễn trên slide | Topo gói `Native-stable` cho đường phẳng | Không cho phép siêu dữ liệu Master/Layout/lớp/placeholder do tác giả soạn |
| Cấu trúc bộ slide có mẫu | `pptx_structure.mode: structured` cộng gán Master/Layout/trang tường minh | `p:sldMaster`, `p:sldLayout`, đăng ký và dòng dõi slide đã khai báo | `Native-stable` trong hợp đồng cấu trúc tường minh | Bộ xuất không bao giờ đoán topo Master, Layout hay placeholder |
| Slide Master | Định danh Master gốc cộng các đối tượng nguyên tử `data-pptx-layer="master"`; một `<g>` preset soạn gọn đã kiểm chứng tính là một nguyên tử ngữ nghĩa | Phần Master tái sử dụng và định danh bộ chọn | Mirror của Create Template có thể bảo toàn dữ kiện gói nguồn đã kiểm chứng trong workspace mới; các chế độ soạn tạo định danh mới | Nguyên tử Master phải trực tiếp, ổn định và giống hệt giữa các slide của chúng; nhóm soạn thông thường hoặc đã bung không đủ điều kiện |
| Slide Layout | Định danh Layout gốc cộng các đối tượng nguyên tử `data-pptx-layer="layout"`; một `<g>` preset soạn gọn đã kiểm chứng tính là một nguyên tử ngữ nghĩa | Phần Layout tái sử dụng dưới một Master | Mirror của Create Template có thể bảo toàn Layout nguồn đã kiểm chứng trong workspace mới; kế hoạch thích nghi của Strategist có thể khai báo Layout mới | Chỉ dùng lại khóa Layout khi các nguyên tử cố định và hợp đồng slot của nó giống hệt; nhóm soạn thông thường hoặc đã bung không đủ điều kiện |
| Hiển thị hình khối kế thừa khi nhập | Bản ghi phân tích theo tầng ghi các giá trị boolean nguồn đã chuẩn hóa; mirror có cấu trúc đã hiện thực hóa ghi chính xác `data-pptx-show-inherited-shapes` và `data-pptx-show-master-shapes` chữ thường ở gốc | Giá trị nguồn đã khai báo được ghi vào `p:sld@showMasterSp` và `p:sldLayout@showMasterSp` | `Native-stable`: Slide false ẩn hình khối Layout và Master; Layout false chỉ ẩn hình khối Master | Bỏ qua nghĩa là true; mọi trang dùng một khóa Layout phải thống nhất giá trị Layout. Nền, đối tượng cục bộ slide, kế thừa placeholder, các phần và quan hệ cha vẫn nguyên vẹn |
| Layout mẫu nghiêm ngặt | Hợp đồng nguyên mẫu đã chọn | Topo Layout đã khai báo hiện có được bảo toàn | `Native-stable` khi trang theo nguyên mẫu | Nguyên tử Layout cố định và cấu trúc slot không được đổi |
| Layout mẫu thích nghi | Master đã chọn cộng một Layout hiện tại hoặc mới tường minh do Strategist khai báo | Định danh Layout mới đã khai báo được tạo khi cấu trúc tái sử dụng thay đổi | `Native-stable` sau khi Strategist cập nhật ánh xạ kế hoạch/lock và việc thực thi tiếp tục | Thay đổi phát hiện trong lúc dựng quay ngược về khâu trên; không bao giờ biến đổi khóa Layout đã tái sử dụng ở khâu sau |
| Tô nền slide ngoài chế độ có cấu trúc | `<rect>` toàn khung đủ điều kiện đầu tiên, trực tiếp hoặc trong nhóm một con đơn giản, với tô đặc, gradient tuyến tính/xuyên tâm hoặc họa tiết preset đã đăng ký | `p:bg` slide native | Độ trung thực theo hàng sơn tương ứng bên dưới | Transform, filter, clip, bo góc, nét nhìn thấy hoặc tô chưa ánh xạ ngăn việc nâng lên |
| Tô nền Master/Layout/slide ở chế độ có cấu trúc | Một `<rect>` đặc toàn khung trực tiếp trong lớp cấu trúc đã khai báo | `p:bg` native ở phạm vi Master, Layout hoặc slide | `Native-stable` | Quyền sở hữu nền theo phạm vi tường minh cố ý chỉ gồm màu đặc |
| Phông gradient hoặc họa tiết ở chế độ có cấu trúc | `<rect>` gradient/họa tiết thông thường trên lớp Master/Layout đã khai báo hoặc làm nội dung cục bộ slide | Hình khối chỉnh sửa được trên phần sở hữu | Độ trung thực theo hàng sơn tương ứng bên dưới | Xuất có cấu trúc tắt việc nâng nền chung; đừng dùng `data-pptx-layer="slide"` |
| Nền bằng ảnh | `<image>` dự án thông thường trên lớp Master/Layout đã khai báo hoặc làm nội dung cục bộ slide | `p:pic` chỉnh sửa được trên phần sở hữu | Độ trung thực theo các hàng ảnh bên dưới | Phần tử ảnh không bao giờ được nâng thành `p:bg` |
| Placeholder tiêu đề | Nhóm slot có cấu trúc với một thẻ mang chữ | `p:ph` loại `title` ở Layout và slide | `Native-stable` | Số thẻ mang, biên, loại và chỉ số hiệu lực phải khớp hợp đồng Layout |
| Placeholder phụ đề | Nhóm slot có cấu trúc với một thẻ mang chữ | `p:ph` loại `subTitle` | `Native-stable` | Cùng quy tắc slot như tiêu đề |
| Placeholder nội dung | Nhóm slot có cấu trúc với một thẻ mang chữ | `p:ph` loại `body` | `Native-stable` | Thẻ mang nhiều dòng vẫn là một khung chữ |
| Khung placeholder chữ mirror khi nhập | `data-pptx-frame="x y width height"` nguồn dương trên thẻ mang `<text>` của slot, tách khỏi biên tái sử dụng của slot | Thẻ mang Slide giữ đúng `a:xfrm` đó; chữ vẫn chỉnh sửa được và ngắt dòng cứng nguồn vẫn là đoạn tường minh | `Native-stable` trong chữ nhập được hỗ trợ | `data-pptx-bounds` vẫn sở hữu mặc định Layout và có thể khác; slot standard/fidelity soạn không lặp biên vào khung này |
| Placeholder ngày, chân trang và số trang | Slot chữ có cấu trúc | `p:ph` loại `dt`, `ftr` và `sldNum`, với cờ header/footer Layout tương ứng | `Native-stable` | Chỉ số placeholder phải duy nhất và hợp lệ |
| Placeholder ảnh | Slot có cấu trúc với một thẻ mang ảnh hoặc cắt được hỗ trợ | `p:ph` loại `pic` | `Native-stable` trong hợp đồng ảnh | Slot phải chứa đúng một thẻ mang trực tiếp tương thích |
| Placeholder biểu đồ hoặc bảng | Slot có cấu trúc với một thẻ mang đối tượng native khớp | `p:ph` loại `chart` hoặc `tbl` | `Native-stable` chỉ khi xuất Chart/Table native | Đòi siêu dữ liệu JSON hợp lệ và `--native-charts-and-tables` |
| Placeholder đối tượng chung | Một thẻ mang tương thích — gồm một `<g>` preset soạn gọn đã kiểm chứng — hoặc ràng buộc proxy hỗn hợp tường minh | `p:ph` loại `obj` | Ràng buộc native; nội dung nhìn thấy hỗn hợp vẫn là hình khối thông thường | Slot hỗn hợp phải dùng hạ cấp proxy đã đăng ký; nhóm soạn đã bung không phải thẻ mang đối tượng đơn |
| Placeholder đa phương tiện | Một thẻ mang ảnh hoặc cắt được hỗ trợ | `p:ph` loại `media` | Chỉ ràng buộc placeholder native | Nó không tổng hợp video hay âm thanh từ nội dung SVG trang trí |
| Placeholder chữ rỗng | Thẻ mang chữ có dấu hiệu rỗng hoặc chỉ khoảng trắng | Run U+200B vô hình ở mức tối thiểu 1 pt hợp lệ, tạo một hình chữ native | `Native-stable` | Đừng thêm dấu gạch giả, chữ dưới 1 pt hay ký tự nhìn thấy màu nền |
| Vai trò trang như bìa/nội dung/kết | Gợi ý biên dịch `data-pptx-page-role` ở gốc của đường phẳng | Gợi ý định tuyến/kiểm chứng; không phải loại trang PowerPoint native | Không có đối tượng OOXML độc lập | Trang có cấu trúc dùng định danh Master/Layout tường minh thay thế |
| Section slide và custom show | Không có ánh xạ SVG | Không do đường tạo chính soạn | `Direct preservation` nơi quy trình bảo toàn nguồn sở hữu chúng | Đừng mã hóa chúng thành siêu dữ liệu thị giác |

Siêu dữ liệu có cấu trúc chính xác và ngữ pháp slot nằm trong [PPTX Structure Interface](../../skills/ppt-master/references/pptx-structure-interface.md#1-pptx-structure-routing).

Định danh nội bộ và tên hiển thị PowerPoint là hai việc riêng: khóa Master và Layout dùng ngữ pháp định danh ASCII dự án bị hạn chế, trong khi tên bộ chọn có thể chứa dấu cách. Mỗi định nghĩa Layout cũng nêu Master cha và một nguồn nguyên mẫu tường minh. PPTX Structure Interface sở hữu cú pháp hàng chính xác.

## 3. Hình khối và đối tượng vẽ của PowerPoint

| Tính năng PowerPoint | Biểu diễn của dự án | Kết quả PPTX | Nhập và độ trung thực | Ranh giới kiểm chứng |
|---|---|---|---|---|
| Hình chữ nhật | `<rect>` | `p:sp` chỉnh sửa được với `a:prstGeom prst="rect"` | `Native-stable`; nhập thành primitive khi có thể | Chỉ dùng thuộc tính sơn, nét và transform đã đăng ký |
| Hình chữ nhật bo góc đối xứng | `<rect>` với bán kính góc đối xứng được hỗ trợ | `a:prstGeom prst="roundRect"` kèm điều chỉnh | `Native-stable` | Góc bất đối xứng theo hàng freeform |
| Hình tròn hoặc elip | `<circle>` hoặc `<ellipse>` | `a:prstGeom prst="ellipse"` | `Native-stable` | Biên và bán kính phải hữu hạn và dương nơi cần |
| Đường thẳng | `<line>` | Hình đường/freeform chỉnh sửa được | `Native-normalized` | Hiệu ứng đường chỉ có ở trình duyệt bị từ chối |
| Đường có đầu mũi tên | `<line>` hoặc path được hỗ trợ với dấu hiệu đầu/cuối tam giác, stealth, mũi tên, thoi hoặc bầu dục đã đăng ký | Đầu/đuôi đường DrawingML native | `Native-normalized`; kích thước dấu hiệu là gần đúng | Định nghĩa dấu hiệu phải theo hợp đồng dấu hiệu có điều kiện |
| Đường nối native | Nhóm preset soạn gọn của dự án với siêu dữ liệu đường nối và các path nhìn thấy trực tiếp | `p:cxnSp` | Đường nối nhập vào giữ bằng chứng round-trip đã bung cần cho topo nguồn | `Native-stable` cho lược đồ preset/đường nối đã đăng ký |
| Hình tự do | `<path>` | `p:sp` với `a:custGeom` | Hình học tùy chỉnh nhập vào được dựng lại thành path | `Native-normalized`; cung SVG được chuyển thành các đoạn bậc ba |
| Kết quả Merge Shapes đã hiện thực hóa | Đầu ra `<path>` thông thường từ `shape_boolean_svg.py`; Fragment trả về các path anh em | Một `p:sp` với `a:custGeom` cho mỗi path trả về | `Native-normalized`; nhập thành hình học tự do cuối, không phải lịch sử thao tác phát lại được | Hình học đóng được hỗ trợ hoặc chữ trực tiếp ngầm LTR ngang với mặt chữ phân giải chính xác; chữ thành hình học glyph, nguồn đầu tiên sở hữu kiểu/thứ tự, và không phát clip, mask hay quy tắc tô tường minh |
| Đa giác | `<polygon>` | Hình học tùy chỉnh đóng | `Native-normalized` | Điểm phải hữu hạn và hợp lệ |
| Đường gấp khúc | `<polyline>` | Hình học tùy chỉnh mở | `Native-normalized` | Điểm dùng cùng ngữ pháp hữu hạn, đã đăng ký như hình học sinh ra khác |
| Hình preset của PowerPoint | `<g>` gọn do registry sinh ra với ý định preset/sơn cơ sở, tham chiếu trực tiếp tùy chọn đến một filter đổ bóng/phát sáng đã đăng ký, và các con `<path>` nhìn thấy trực tiếp | Một `p:sp` preset chỉnh sửa được, tối đa một hiệu ứng native trong `p:spPr/a:effectLst` | Danh tính preset và điều chỉnh có thể sống sót khi nhập/xuất; hiệu ứng theo hàng độ trung thực chung bên dưới | Kiểm tra chất lượng và xuất dựng lại registry động; tham chiếu filter của preset soạn chỉ áp dụng cho hình khối, và việc soạn chuẩn không có thẻ mang ẩn, lớp bọc xem trước hay hash xem trước lưu trữ |
| Hình preset nhập vào | Nhóm nhập/round-trip đã bung với thẻ mang native ẩn, bằng chứng xem trước nhìn thấy và siêu dữ liệu độ mới | Preset được khôi phục khi tải hợp lệ và không đổi | `Native-stable` trong hợp đồng nhập | Preset không được hỗ trợ vẫn là phương án dự phòng chẩn đoán tường minh, không phải hình học đoán |
| Hình nút hành động | Nhóm preset `actionButton*` soạn gọn | Chỉ hình học preset thị giác | Hình học hình khối có thể round-trip | Không tạo hành động nhấp, đích điều hướng hay siêu liên kết |
| Nhóm | `<g>` | `p:grpSp`, hoặc làm phẳng/gộp đã ghi cho thẻ mang đặc biệt | Nội dung đã nhóm có thể dựng lại thành `<g>` | Nguyên tử cấu trúc và hợp đồng placeholder thắng việc nhóm thông thường |
| Ký hiệu cục bộ được dùng lại | Hợp đồng `<use>` cùng tài liệu đã đăng ký hoặc placeholder biểu tượng dự án | Hình khối chỉnh sửa được đã bung trong slide sinh ra | Đồ thị ký hiệu gốc không được hứa khi nhập | `use` ngoài, tính năng symbol không được hỗ trợ và việc dùng lại siêu dữ liệu cấu trúc bị từ chối |
| Biểu tượng / vector nhập | `<use data-icon="library/name">` do đường biểu tượng dự án phân giải; nhập create-template dùng `imported/<name>` | Primitive/nhóm vector chỉnh sửa được sau khi bung | Hình học được dựng lại, không phải tham chiếu thư viện gốc | Định danh phân biệt hoa thường; tài nguyên nhập tồn tại một lần tại `icons/imported/<name>.svg` ở gốc workspace |
| SmartArt / DiagramML | Không có ánh xạ đối tượng SVG chính | Đường thiết kế lại chính có thể dựng lại ý nghĩa bằng hình khối thông thường | `Direct preservation` ở các đường native/mẫu; nếu không thì xem trước hoặc phương án dự phòng tường minh | Đừng gắn nhãn một nhóm trang trí là SmartArt native |

Preset do dự án soạn cố ý dùng biểu diễn gọn, trong khi nhập PPTX giữ bằng chứng đã bung cần cho quyết định round-trip không mất mát. Hợp đồng máy chính xác nằm trong [`shared-standards-core.md`](../../skills/ppt-master/references/shared-standards-core.md), còn việc chọn và hành vi soạn preset được ghi trong [`native-shape-authoring.md`](../../skills/ppt-master/references/native-shape-authoring.md).

## 4. Tính năng chữ của PowerPoint

| Tính năng PowerPoint | Biểu diễn của dự án | Kết quả PPTX | Nhập và độ trung thực | Ranh giới kiểm chứng |
|---|---|---|---|---|
| Hộp văn bản | `<text>` | `p:sp` chỉnh sửa được với `p:txBody` | Dựng lại thành `<text>` và, khi cần, `<tspan>` | Chữ phải là XML hợp lệ và dùng thuộc tính đã đăng ký |
| Định dạng hỗn hợp trong một dòng | Các run `<tspan>` không định vị | Run DrawingML trong một khung chữ | `Native-normalized`; định dạng run đã đăng ký vẫn chỉnh sửa được | Định vị làm đổi hình học khung có thể tách kết quả |
| Chữ nhiều dòng và đoạn do tác giả soạn | Một `<text>` với các dòng `<tspan>` trực tiếp có định vị | Mặc định, một khung chữ không ngắt dòng giữ ngắt dòng do tác giả; khung sinh ra thông thường tự đổi kích thước theo các chỉnh sửa sau, trong khi khung chính xác và thẻ mang placeholder nhiều dòng có cấu trúc giữ hành vi kích thước cố định; ranh giới đoạn ngữ nghĩa vẫn là `a:p` | `Native-normalized` | `--reflow-text` cho phép PowerPoint ngắt dòng lại; `--no-merge` phát một hình cho mỗi dòng nhìn thấy |
| Khoảng trắng có ý nghĩa trong chữ | Chính xác `xml:space="default"` hoặc `xml:space="preserve"` trên `<text>`/`<tspan>` | Chữ U+0020 đã chuẩn hóa hoặc được giữ trong run DrawingML chỉnh sửa được | `Native-normalized`; quyền sở hữu run nội dòng được giữ | Dùng hợp đồng Chromium/SVG2 của dự án: LF/TAB thành dấu cách, `default` gộp qua các run, `preserve` giữ chúng, và ký tự khoảng trắng Unicode giữ nguyên nghĩa đen; CSS `white-space` và việc xóa xuống dòng SVG 1.1 cũ nằm ngoài ánh xạ |
| Họ phông | `font-family` chuẩn phân giải thành vai trò lock cấu trúc hoặc lựa chọn an toàn khi xuất theo ngữ cảnh | Typeface trực tiếp hoặc phông theme đã đăng ký | `Native-stable` trong giới hạn phông đã cài / thay thế phông | Phông không có sẵn/không an toàn được báo cáo; họ an toàn theo ngữ cảnh chỉ mang tính thông tin, không phải lỗi lock |
| Cỡ chữ | Pixel SVG hữu hạn không đơn vị, ví dụ `font-size="24"` | Phần trăm điểm của DrawingML; `1 px = 0,75 pt` | `Native-stable` sau chuyển đơn vị | Soạn sinh ra chỉ dùng px không đơn vị; đơn vị cũ đã đăng ký là đầu vào tương thích và cảnh báo, đơn vị lạ báo lỗi; mức tối thiểu của DrawingML là 1 pt |
| Độ đậm chữ | `font-weight` đã đăng ký trên `<text>`/`<tspan>` | Công tắc run thường/đậm của DrawingML | `Native-normalized`; độ đậm số gộp về ranh giới boolean của DrawingML | Ngữ pháp giá trị và bí danh chính xác thuộc [`svg-effects.md` §6.7](../../skills/ppt-master/references/svg-effects.md#67-advanced-text-treatments) |
| Nghiêng, gạch chân và gạch ngang | `font-style` / `text-decoration` đã đăng ký trên `<text>`/`<tspan>` | Thuộc tính run nghiêng, gạch chân và gạch ngang của DrawingML | `Native-stable` cho token đã đăng ký | Token lạ bị từ chối; ngữ pháp chính xác thuộc [`svg-effects.md` §6.7](../../skills/ppt-master/references/svg-effects.md#67-advanced-text-treatments) |
| Chỉ số trên và dưới trong chữ thường | `baseline-shift="super|sub"` trực tiếp chính xác trên `<tspan>`; `font-size` run tường minh vẫn độc lập | `a:rPr@baseline` chữ thường chỉnh sửa được ở `30000` / `-25000`; không tự giảm cỡ chữ | Xuất xuôi là native. PPTX-sang-SVG không dựng lại baseline shift trong SVG nhìn thấy; siêu dữ liệu `txBody` nhập vào không đổi và Edit Native PPTX vẫn có thể giữ run nguồn | Style nội dòng, phần tử khác, độ lệch số và kết hợp với dấu hiệu công thức nội dòng bị từ chối; toán có cấu trúc dùng OMML chỉnh sửa được, còn glyph Unicode vẫn là chữ nghĩa đen |
| Tô đặc/gradient chữ và độ trong suốt | Tô đặc/gradient chuẩn cộng alpha của run | Tô và alpha của run DrawingML | `Native-normalized` | Dùng kênh alpha ngữ nghĩa, không dùng hiệu ứng CSS chưa đăng ký |
| Tô chữ bằng ảnh hoặc kết cấu | Tô `<text>` / `<tspan>` không định vị tham chiếu một họa tiết một ảnh có chú thích | `a:blipFill` của run DrawingML chỉnh sửa được với kéo giãn hoặc lát gạch native | Xuất xuôi là native; kéo giãn là `Native-normalized`, tỷ lệ/pha lát gạch có thể chuẩn hóa; nhập ngược chưa dựng lại phần tô | Đòi `data-pptx-text-image-fill="stretch|tile"`, một ảnh trực tiếp hợp lệ, và không có clip/filter/mask/transform ảnh; xem [`svg-effects.md` §6.3](../../skills/ppt-master/references/svg-effects.md#63-gradients-and-paint-effects) |
| Viền chữ | Nét đã đăng ký trên chữ | Viền run DrawingML | `Native-normalized` | Xem lại khi viền mang ý nghĩa thị giác tinh tế |
| Căn chữ | `text-anchor` và ngữ nghĩa đoạn đã đăng ký | Căn lề đoạn cộng vị trí khung chữ đã chuẩn hóa | `Native-normalized` | Neo cấp run và heuristic đường cơ sở trình duyệt không được hỗ trợ; vị trí chính xác thuộc [`svg-effects.md` §6.7](../../skills/ppt-master/references/svg-effects.md#67-advanced-text-treatments) |
| Căn dọc khung chữ | Không có điều khiển SVG sinh ra chuẩn; hộp chữ sinh ra dùng neo trên | Thân chữ DrawingML neo trên | Neo khung chữ nhập vào có thể được chuẩn hóa, nhưng đường chính không phơi điều khiển soạn chung | Đừng suy căn dọc từ đường cơ sở SVG hay hành vi bố cục trình duyệt |
| Dàn chữ dọc Đông Á | Không có điều khiển SVG sinh ra đã đăng ký; `writing-mode` không hợp lệ | Đường tạo chính không soạn `a:bodyPr@vert` | Nhập PPTX-sang-SVG chuẩn hóa `eaVert`, `vert`, `wordArtVert` và `wordArtVertRtl` thành glyph SVG xếp chồng thẳng đứng; `Direct preservation` áp dụng nơi Edit Native PPTX để nguyên OOXML sở hữu | Xếp glyph thủ công có thể xấp xỉ một cột thị giác nhưng không tạo hướng dấu câu native, tự ngắt dòng hay hành vi nhiều cột; ngữ pháp đóng thuộc [`svg-effects.md` §6.7](../../skills/ppt-master/references/svg-effects.md#67-advanced-text-treatments) |
| Khoảng cách ký tự | `letter-spacing` đã đăng ký | Khoảng cách ký tự DrawingML | `Native-normalized` | Typography CSS không được hỗ trợ, khoảng cách DrawingML ngoài khoảng, và giãn âm làm sụp độ tiến run sinh ra hoặc phạm vi khung chữ về giá trị không dương đều bị từ chối theo [`svg-effects.md` §6.7](../../skills/ppt-master/references/svg-effects.md#67-advanced-text-treatments) |
| Đoạn có dấu đầu dòng | Dạng dấu đầu dòng nhận diện được | Dấu đầu dòng DrawingML native | `Native-normalized` | Chỉ ngữ pháp dấu đầu dòng đã đăng ký được nâng lên |
| Chữ xoay | Transform được hỗ trợ trên đối tượng chữ | Hình chữ xoay | `Native-normalized` | Chữ bị skew và transform chỉ có ở trình duyệt không được hỗ trợ |
| Bóng hoặc phát sáng chữ | Hợp đồng filter/hiệu ứng được hỗ trợ | Một bóng ngoài hoặc phát sáng native | `Approximate` | Chỉ một đồ thị hiệu ứng được hỗ trợ; xem lại hiệu ứng quan trọng |
| WordArt, uốn chữ hay chữ theo đường | Tài nguyên ảnh đã chuẩn bị cho chữ trang trí, hoặc `<text>` thông thường làm phương án chỉnh sửa được | Ảnh hoặc chữ thông thường; không bao giờ là WordArt native mới soạn | `Direct preservation` ở các đường native bảo toàn nguồn; nếu không thì `Bake-required` hoặc dựng lại với thẻ mang được hỗ trợ | Không có thuộc tính WordArt/uốn/path SVG sinh ra nào được đăng ký; hiển thị trên trình duyệt không có nghĩa PowerPoint hỗ trợ |

## 5. Tính năng ảnh của PowerPoint

| Tính năng PowerPoint | Biểu diễn của dự án | Kết quả PPTX | Nhập và độ trung thực | Ranh giới kiểm chứng |
|---|---|---|---|---|
| Ảnh | `<image>` với kích thước dương tường minh và đúng một nguồn tài nguyên dự án hoặc data-URI ảnh | `p:pic`, phần đa phương tiện và quan hệ | Dựng lại thành `<image>` | Nguồn phải phân giải được, dùng định dạng đã đăng ký và chứa byte giải mã được khớp MIME/đuôi; khung hoặc đa phương tiện không hợp lệ thất bại trước khi đóng gói |
| Ảnh SVG phức tạp tường minh | `<image>` trực tiếp tham chiếu một `.svg` khép kín, vừa khít do `extract_svg_pictures.py` tạo từ một `<g id>` chính xác trong lúc chuẩn hóa `create-template` | Một `p:pic` có phương tiện SVG hỗ trợ | Dựng lại thành một `<image>`; các path bên trong không được nâng thành hình khối PowerPoint riêng | Việc chọn là tường minh và chỉ ở `standard` / `fidelity`; không heuristic nhập, lặp, Master/Layout, finalize hay xuất nào được tự động chuyển nhóm thành biểu diễn này |
| Kéo giãn ảnh vào khung | `preserveAspectRatio="none"` | Khung ảnh native bị kéo giãn | `Native-stable` | `none` phải đứng riêng; nó cố ý đổi tỷ lệ khung của nguồn |
| Cắt ảnh để lấp đầy | Một căn chỉnh đã đăng ký cộng `slice` tường minh | Cắt `a:srcRect` native | `Native-stable` khi đọc được kích thước nguồn | Căn chỉnh phân biệt hoa thường; chế độ lạ và token thừa là lỗi |
| Vừa ảnh trong khung | Mặc định bỏ qua, hoặc một căn chỉnh đã đăng ký cộng `meet` tường minh | Khung ảnh vừa native | `Native-normalized` | Cách viết tắt chỉ căn chỉnh là đầu vào tương thích và nhận khuyến nghị chuẩn hóa |
| Độ trong suốt ảnh | `opacity` nguyên tử của ảnh | `a:alphaModFix` native | `Native-stable` | Giá trị phải hữu hạn và trong ngữ pháp độ mờ được chấp nhận |
| Bóng hoặc phát sáng ảnh | Một filter hiệu ứng đã đăng ký trực tiếp trên `<image>` không cắt; ảnh bị cắt hoặc ảnh cắt nhập vào dùng thẻ mang ngoài một ảnh chính xác của nó | `p:pic/p:spPr/a:effectLst` native | `Approximate`; một hiệu ứng round-trip như một ảnh chỉnh sửa được, gồm cả nguyên tử Master/Layout trực tiếp | `filter` và `clip-path` không thể dùng chung một `<image>`; chỉ nguyên tử cố định trực tiếp mới được đặt `data-pptx-layer="master|layout"` trên thẻ mang, trong khi quyền sở hữu Placeholder/Binding/thay thế nằm ngoài; filter nhóm thông thường, primitive khác, DAG hiệu ứng và nhiều hiệu ứng độc lập vẫn không được hỗ trợ |
| Cắt ảnh theo hình | `clip-path` của ảnh/lớp bọc cắt đã đăng ký với một hình thuộc không gian tên SVG | Hình học preset hoặc tùy chỉnh của ảnh | `Native-normalized` | Preset circle/ellipse/rect phải phủ toàn bộ khung ảnh; dùng path/polygon cho đường viền một phần hoặc lệch; mask và đường viền phụ thuộc quy tắc cuộn không được chấp nhận |
| Ảnh cắt khi nhập | Lớp bọc cắt lồng thuộc không gian tên SVG chính xác do nhập tạo ra, chứa một ảnh khung đơn vị trực tiếp trong gốc nhìn thấy / cây `g` | `a:srcRect` có dấu native khi xuất lại | `Native-stable` trong hợp đồng cắt, gồm giá trị cắt âm | Mọi viewport lồng tổng quát hóa, chủ sở hữu không nhìn thấy / chỉ-dựng-hình, con nhìn thấy thừa, cửa sổ cắt không biểu diễn được, lớp bọc không cắt thừa, hoặc cặp dấu clip chưa phân giải đều bị từ chối |
| Đổi màu ảnh, bộ lọc nghệ thuật, làm mờ hoặc mask phức tạp | Không có ánh xạ soạn chung | Dựng lại bằng lớp phủ được hỗ trợ hoặc dựng sẵn | `Bake-required` | Filter SVG và chế độ hòa trộn chưa đăng ký thất bại hợp đồng chính |

## 6. Tính năng tô, nét và hiệu ứng của PowerPoint

| Tính năng PowerPoint | Biểu diễn của dự án | Kết quả PPTX | Nhập và độ trung thực | Ranh giới kiểm chứng |
|---|---|---|---|---|
| Không tô | `fill="none"` | `a:noFill` | `Native-stable` | Dùng cách viết chuẩn chữ thường trong SVG sinh ra |
| Tô đặc | `fill="#RRGGBB"` chuẩn, hoặc là neo lock có tên hoặc là sơn trang theo ngữ cảnh | `a:solidFill`, kèm token theme khi vai trò neo có thể tái sử dụng chính xác | `Native-stable` | Cách viết tương thích có thể cảnh báo; màu sai định dạng thất bại, còn màu theo ngữ cảnh hợp lệ chỉ mang tính thông tin |
| Độ trong suốt khi tô | Tô đục cộng `fill-opacity` | Alpha native | `Native-stable` | Giá trị sinh ra là số hữu hạn không đơn vị từ 0 đến 1 |
| Tô gradient tuyến tính | `<linearGradient>` đã đăng ký trong `<defs>` | `a:gradFill` native | `Native-normalized` | Điểm dừng, tọa độ, transform và tham chiếu phải theo hợp đồng đóng |
| Tô gradient xuyên tâm | `<radialGradient>` đã đăng ký | Gradient tròn DrawingML tập trung vào điểm | `Approximate`; tiêu điểm hiệu lực trong hình tròn round-trip còn tâm/bán kính ngoài được chuẩn hóa | Tiêu điểm hiệu lực phải nằm trong hình tròn chuẩn tâm bán kính 0,5; nhập đặt tâm cho tiêu điểm ngoài kèm chẩn đoán; xem lại thiết kế nhạy với bán kính hoặc tâm ngoài |
| Tô họa tiết | Định nghĩa họa tiết dự án có chú thích | `a:pattFill` native | `Native-normalized` | Chỉ họa tiết preset PowerPoint đã đăng ký được hỗ trợ |
| Không viền | `stroke="none"` hoặc sự vắng mặt đã đăng ký của đường | `a:noFill` dưới `a:ln` | `Native-stable` | Đừng mô phỏng sự vắng mặt bằng CSS độ rộng không mơ hồ |
| Viền đặc | `stroke` và độ rộng đã đăng ký | `a:ln` native | `Native-stable` | Độ rộng và sơn phải dùng đơn vị/ngữ pháp chuẩn |
| Viền kép (compound) | Không có biểu diễn nét đơn SVG đã đăng ký | Phương án hình học tường minh hoặc tài nguyên dựng sẵn | `Bake-required` cho danh tính đường kép | Nhập PPTX khoan dung bỏ viền không được hỗ trợ và báo cáo; nhập nghiêm ngặt từ chối `cmpd` khác `sng` |
| Viền căn bên trong | Không có biểu diễn nét SVG thông thường đã đăng ký | Hình học thụt vào tường minh hoặc tài nguyên dựng sẵn | `Bake-required` cho căn chỉnh viền chính xác | Nhập PPTX khoan dung bỏ viền không được hỗ trợ và báo cáo; nhập nghiêm ngặt từ chối `algn` khác `ctr` |
| Sơn viền dạng họa tiết, ảnh hoặc suy ra từ nhóm | Không có ánh xạ SVG sơn đường đã đăng ký | Phương án hình học tường minh hoặc tài nguyên dựng sẵn | `Bake-required` | Nhập PPTX khoan dung bỏ viền không được hỗ trợ và báo cáo; nhập nghiêm ngặt từ chối thay vì bịa màu đặc |
| Co giãn viền dưới transform | `vector-effect="none"` hoặc `vector-effect="non-scaling-stroke"` chính xác | Lựa chọn được phân giải thành độ rộng đường native | `Native-normalized` | Giá trị khác bị từ chối; cách viết sinh ra chính xác và chữ thường |
| Viền nét đứt hoặc chấm | Mảng nét đứt đã đăng ký | Nét đứt preset hoặc tùy chỉnh DrawingML | `Native-normalized` | Ngữ nghĩa nét đứt không được hỗ trợ bị từ chối |
| Đầu mút và khớp nối đường | Giá trị cap/join đã đăng ký | Thuộc tính cap/join đường native | `Native-stable` trong hợp đồng khớp nối cố định | Nhập chấp nhận một khớp nối; miter đòi chính xác `lim="800000"` |
| Đầu mũi tên | Dấu hiệu đầu/cuối đã đăng ký | Thuộc tính đầu/đuôi native | `Approximate` về kích thước dấu hiệu | Chỉ tam giác, stealth, mũi tên, thoi và bầu dục theo hợp đồng dấu hiệu có điều kiện |
| Bóng ngoài | Một đồ thị filter đổ bóng được hỗ trợ | Bóng ngoài native trong `a:effectLst` | `Approximate`; một `outerShdw` nguồn của hình khối/đường nối/ảnh nhập vào chỉ được dựng lại khi độ lệch khác không của nó phân loại được và hành vi co giãn, skew, xoay trung tính hoặc biểu diễn được | `sx`/`sy`/`kx`/`ky` không trung tính, hành vi xoay-theo-hình trên đích đã xoay, độ lệch bằng không, và thuộc tính hoặc đồ thị không được hỗ trợ sinh chẩn đoán chặn thay vì đơn giản hóa lặng lẽ |
| Phát sáng (Glow) | Một đồ thị filter phát sáng được hỗ trợ | Phát sáng native trong `a:effectLst` | `Approximate`; một glow nguồn của hình khối/đường nối/ảnh nhập vào giữ phép chuyển bán kính đã đăng ký | Xem lại khi glow mang ý nhấn mạnh ngữ nghĩa |
| Hiệu ứng run chữ khi nhập | `metadata[data-pptx-part="txbody"]` không đổi trên một hình khối logic; trạng thái hiệu ứng chặn chỉ-nhập cho kiểu danh sách Layout/Master kế thừa cùng các đường dự phòng dọc, mang quan hệ và ô bảng | Hiệu ứng run native cục bộ slide gốc bên trong `p:txBody` | `Native-stable` chỉ khi tải thô cục bộ slide vẫn dùng được; hiệu ứng kế thừa, chỉnh sửa, hoặc đường dự phòng sẽ bỏ khối `effectLst` / `effectDag` không rỗng của run | Không phải cú pháp soạn công khai; hiệu ứng run trong ô bảng cũng tắt tải thay thế Table native |
| Độ trong suốt cả đối tượng | `opacity` nguyên tử của phần tử | Alpha phân bổ vào các kênh native được hỗ trợ | `Native-normalized` | Ưu tiên alpha theo kênh trừ khi cả đối tượng nguyên tử mờ dần |
| Độ trong suốt nhóm | `<g opacity>` tương thích | Xấp xỉ chuẩn hóa theo con cháu | `Approximate` kèm cảnh báo | SVG sinh ra nên ưu tiên alpha của con cháu |
| Bóng trong, viền mềm, phản chiếu, làm mờ, nhiễu, chế độ hòa trộn hay mask tùy ý | Không có ánh xạ native đã đăng ký | Phương án hình học tường minh hoặc tài nguyên raster | `Bake-required`; nhập PPTX giữ đối tượng cơ sở và phát chẩn đoán chặn cho hiệu ứng, DAG hiệu ứng và danh sách ảnh/nhóm ngoài hiệu ứng đơn đã đăng ký không được hỗ trợ | Hiệu ứng đối tượng đã xử lý không thể phân loại lại hay bỏ; an toàn chữ-run theo hàng `txBody` không đổi ở trên |

## 7. Bảng PowerPoint

| Tính năng PowerPoint | Biểu diễn của dự án | Kết quả PPTX | Nhập và độ trung thực | Ranh giới kiểm chứng |
|---|---|---|---|---|
| Bảng vẽ bằng hình | Hình khối, đường và chữ SVG thông thường | Hình khối PowerPoint chỉnh sửa được độc lập | Độ trung thực theo từng hàng thành phần | Không phải bảng native và không có mô hình chỉnh sửa bảng của PowerPoint |
| Bảng native của PowerPoint | Một `<g data-pptx-replace-with="table">` với siêu dữ liệu JSON con `ppt-master.semantic-table.v2` và một phương án dự phòng nhìn thấy | `p:graphicFrame` chứa `a:tbl` khi bật thay thế Chart/Table native | Bảng được hỗ trợ khi nhập tách định dạng ô/đoạn/run lặp lại thành mặc định và kiểu ô có tên; xuất bung nó trong bộ nhớ | Siêu dữ liệu phải tạo thành lược đồ chữ nhật đã đăng ký; tải không phiên bản thất bại; đòi `--native-charts-and-tables` |
| Ô bảng gộp | Siêu dữ liệu gộp bảng native chuẩn | Ngữ nghĩa gộp ngang/dọc native | `Native-stable` trong lược đồ đóng | Gộp chồng lấn, mơ hồ hoặc không chữ nhật bị từ chối |
| Định dạng ô bảng | Trường định dạng ô bảng native đã đăng ký | Tô ô, viền, chữ và căn lề native | `Native-normalized` | Trường ngoài lược đồ đóng không bị đoán; hiệu ứng run không rỗng khi nhập chặn thay vì chuẩn hóa thành ô không hiệu ứng |
| Tính năng bảng native không được hỗ trợ | Phương án dự phòng SVG hoặc bảo toàn nguồn trực tiếp | Phương án dự phòng nhìn thấy còn lại, hoặc OOXML nguồn ở lại trên đường trực tiếp | Phương án dự phòng tường minh / `Direct preservation` | Đừng mở rộng JSON tùy tiện |

Đối tượng Chart/Table native của PowerPoint là tùy chọn bật. Xuất mặc định giữ phương án dự phòng SVG làm hình khối DrawingML chỉnh sửa được độc lập để ổn định thị giác; xuất native thay vào đó cung cấp nguồn dữ liệu của đối tượng và mô hình chỉnh sửa riêng của bảng/biểu đồ, và có thể chuẩn hóa vẻ ngoài.

Nhóm biểu đồ nhập vào phân loại phương án dự phòng nhìn thấy của chúng bằng `data-pptx-fallback-kind="source-preview|normalized|placeholder"`; chỉ `placeholder` chỉ phương án dự phòng chỉ-để-dựng-lại. `data-pptx-replacement-status` thay vào đó ghi lý do một lần nhập biểu đồ hoặc bảng chỉ-dự-phòng không thể đưa ra tuyên bố thay thế đang hoạt động. Nhóm nhập trong hợp đồng này dùng `data-pptx-import-source="pptx"` và tuyên bố đang hoạt động có thể mang `data-pptx-fallback-sha256` để bảo vệ khỏi chỉnh sửa cũ. Cách viết `data-pptx-native*`, `data-pptx-visual-status` và `data-pptx-route-status` cũ vẫn đọc tương thích nhưng không phải soạn chuẩn.

## 8. Biểu đồ PowerPoint

| Tính năng PowerPoint | Biểu diễn của dự án | Kết quả PPTX | Nhập và độ trung thực | Ranh giới kiểm chứng |
|---|---|---|---|---|
| Biểu đồ vẽ bằng hình | Hình học và chữ SVG thông thường | Hình khối PowerPoint chỉnh sửa được độc lập | Độ trung thực theo từng hàng thành phần | Không có sổ "Edit Data" |
| Biểu đồ cổ điển native của PowerPoint | Một `<g data-pptx-replace-with="chart">` với dữ liệu JSON đã đăng ký trong `<metadata type="application/json">` và một phương án dự phòng nhìn thấy | `p:graphicFrame`, phần biểu đồ cổ điển và sổ làm việc nhúng | Nhập được hỗ trợ dựng lại phương án dự phòng cộng siêu dữ liệu thay thế | Loại biểu đồ và dữ liệu phải khớp lược đồ đóng; đòi `--native-charts-and-tables` |
| Biểu đồ ChartEx native | Cùng giao diện dấu hiệu với một họ ChartEx được hỗ trợ | Phần `cx:chart` và sổ làm việc nhúng | Các họ được hỗ trợ có thể dựng lại theo ngữ nghĩa | Chỉ chấp nhận tổ hợp họ/trường đã đăng ký |
| Tiêu đề, chú giải, trục, nhãn và định dạng chuỗi của biểu đồ | Siêu dữ liệu biểu đồ native đã đăng ký | Thuộc tính biểu đồ native | `Native-normalized` | Trường chính xác và họ được hỗ trợ vẫn chuẩn tắc trong `native-data-interface.md` |
| Chú thích, nguồn hay ghi chú cuối của biểu đồ | Chữ SVG đồng hành thông thường ngoài dấu hiệu thay thế | Hộp chữ slide chỉnh sửa được cạnh biểu đồ | `Native-stable` như chữ | Đừng giấu văn xuôi của slide trong JSON biểu đồ |
| Phương án dự phòng SVG đã sửa kèm siêu dữ liệu thay thế cũ | SVG nhìn thấy đã cập nhật cộng hash cũ | Xuất mặc định giữ SVG nhìn thấy; thay thế native thất bại | Hành vi an toàn tường minh | Bộ biên dịch không bao giờ lặng lẽ bỏ một chỉnh sửa thị giác mới hơn |
| Họ biểu đồ 3D hoặc hoãn không được hỗ trợ | Biểu đồ vẽ bằng SVG, tài nguyên dựng sẵn hoặc bảo toàn nguồn trực tiếp | Không có biểu đồ native bị đoán | Phương án dự phòng / `Direct preservation` | Bí danh không được hỗ trợ phải thất bại khi kiểm chứng native |

Các lược đồ biểu đồ/bảng đầy đủ và danh sách họ được hỗ trợ cố ý vẫn nằm trong [hợp đồng thay thế của Native Data Interface](../../skills/ppt-master/references/native-data-interface.md#2-powerpoint-native-chart--table-replacement-markers-opt-in).

## 9. Công thức PowerPoint

| Tính năng PowerPoint | Biểu diễn của dự án | Kết quả PPTX | Khả năng tương thích | Ranh giới kiểm chứng |
|---|---|---|---|---|
| Hồ sơ đầu vào LaTeX | Nguồn dấu hiệu chuẩn bỏ dấu phân cách ngoài; một cặp `$...$`, `$$...$$`, `\(...\)` hoặc `\[...\]` hoàn chỉnh cũng được chấp nhận | Mọi đầu vào được nêu tên tường minh trong hồ sơ Microsoft 365 2606 / Mac 16.110 đã ghim, cộng hồ sơ mhchem 2605 / 16.109, biên dịch thành OMML chỉnh sửa được | Hồ sơ được ghim theo các phiên bản tài liệu Microsoft đó; OMML phát ra giữ đích gói PowerPoint 2010+. Kiểm chứng của repo ở cấp bộ biên dịch/OMML/gói, không phải chứng nhận đầy đủ giao diện Microsoft 365 | Các chuẩn hóa native tường minh được giữ; đầu vào không xác định hoặc nêu rõ không hỗ trợ thất bại có kiểm soát thay vì rò rỉ thành LaTeX nghĩa đen |
| Phương trình khối chỉnh sửa được | Một `<g data-pptx-replace-with="formula">` với biên tường minh, LaTeX nguồn trong `<metadata type="application/json">` và các con xem trước SVG nhìn thấy | Hình chữ PowerPoint chứa `a14:m > m:oMathPara > m:oMath` | Xem hàng hồ sơ đầu vào | Ma trận, suy diễn nhiều dòng và công thức độc lập cấu trúc cao khác dùng hợp đồng khối đã đăng ký |
| Công thức nội dòng chỉnh sửa được | Một `<tspan data-pptx-inline-formula="canonical LaTeX body">preview text</tspan>` lá giữa các run chữ thông thường | Cùng `a:p` DrawingML giữ các run xung quanh và chèn `a14:m > m:oMath` | Xem hàng hồ sơ đầu vào | Chỉ chữ xem trước trực tiếp không rỗng; không phần tử con, không `x/y/dx/dy` định vị, không quyền sở hữu placeholder/Master/Layout có cấu trúc, không `txBody` nhập được bảo toàn, không tổ tiên thay thế native |
| Nhập ngược công thức PPTX | `m:oMathPara` đã chuẩn hóa màu, sạch với bộ kiểm chứng trở thành dấu hiệu khối; `m:oMath` tương ứng vẫn là dấu hiệu nội dòng cùng các run xung quanh | Xuất lại biên dịch lại LaTeX chuẩn hóa thành OMML chỉnh sửa được | `Native-normalized` cho từ vựng OMML đóng do HugoPPTPilot sở hữu | Màu, độ trong suốt và giữ `txBody` đục đã chẩn đoán theo [Nhập ngược công thức native](../../skills/ppt-master/scripts/docs/conversion.md#native-formula-reverse-import) |
| Xem trước trình duyệt / trực tiếp | Con SVG thông thường bên trong dấu hiệu khối, hoặc chữ trực tiếp của dấu hiệu nội dòng | Bản xem trước đã đăng ký trở thành `mc:Fallback` hình khối native cạnh toán native | LaTeX thô không hiển thị trong SVG | Nội dung xem trước phải biểu đạt cùng công thức; ứng dụng không phải PowerPoint hiển thị nó |
| Kiểu chữ công thức | Kiểu tải khối, hoặc kiểu run chữ nội dòng đã tính | Toán thừa hưởng cỡ chữ và màu tô đặc nhìn thấy, rồi dùng ngôn ngữ chữ dự án và Cambria Math; phạm vi cục bộ `\color` / `\textcolor` ghi đè phần tô kế thừa trên run chọn được và điều khiển cấu trúc, trong khi `\boldsymbol` / `\bm` cũng tạo kiểu glyph điều khiển cấu trúc | OMML PowerPoint 2010+ | Toán cấu trúc cao hoặc nhiều dòng vẫn ở cấp khối |
| Phát công thức ngoài PowerPoint | Cùng các dấu hiệu native | `mc:Fallback` mang bản xem trước SVG dưới dạng hình khối và chữ thông thường; không có nhánh ảnh | Keynote, WPS, LibreOffice và ứng dụng khác nằm ngoài hợp đồng công thức | Phương án dự phòng chỉ nhìn thấy, không phải toán chỉnh sửa được; đừng tuyên bố hiển thị hay chỉnh sửa đa ứng dụng |

Thay thế công thức luôn hoạt động và không dùng `--native-charts-and-tables`. Nó không tạo `formula_manifest.json`, PNG công thức, quan hệ đa phương tiện hay ảnh `mc:Fallback`. JSON khối và giá trị `data-pptx-inline-formula` nội dòng là nguồn công thức native; nội dung xem trước SVG giữ trang đã soạn nhìn thấy được trước khi xuất và trở thành `mc:Fallback` hình khối native sau đó. Nhập chỉ đọc nhánh `mc:Choice`. `pptx_to_svg.py` thực hiện phép ngược hẹp chỉ cho OMML được cùng bộ kiểm chứng đóng chấp nhận sau khi chuẩn hóa màu chỉ-nhập, và đầu ra của nó là LaTeX chuẩn tắc chứ không phải cách viết gốc của tác giả. Nó không tuyên bố chuyển đổi Office Math tùy ý. Từ vựng đóng thực thi được và các bản sửa đổi nguồn Microsoft đã ghim nằm trong `formula_profile.py`; "v.v." mở của Microsoft không làm bí danh quan hệ không được công bố thành một phần của hợp đồng này.

## 10. Tính năng trình chiếu và gói của PowerPoint

Các khả năng này biên dịch hoặc từ SVG trang chuẩn hoặc từ tệp phụ cấp gói có tên. Tệp phụ vẫn vắng mặt khi bảng nêu SVG là chủ sở hữu.

| Tính năng PowerPoint | Biểu diễn dự án sở hữu | Kết quả PPTX | Nhập và độ trung thực | Ranh giới kiểm chứng |
|---|---|---|---|---|
| Ghi chú người trình bày | Tệp phụ `notes/<slide>.md` | Phần Notes Slide và quan hệ | `Sidecar/package` | Ghi chú không phải chữ SVG và không ảnh hưởng hình học trang |
| Chuyển trang | Tùy chọn CLI hoặc `animations.json` | `p:transition` | `Sidecar/package`; nhập PPTX dựng lại chính xác các chuyển trang thuộc kho hiện tại vào `animations.json` | Hiệu ứng lạ hoặc thẻ mang không chính xác thất bại hoặc vẫn được chẩn đoán; không có phương án dự phòng `fade` lặng lẽ |
| Hiệu ứng đối tượng (vào / nhấn mạnh / đường chuyển động / thoát) | `animations.json` nhắm tới ID nhóm SVG cấp cao nhất ổn định; `effects[]` có thể gán nhiều hàng cho một neo | Cây hoạt hình `p:timing` gốc | `Sidecar/package`; nhập PPTX dựng lại các hàng thời lượng chính xác thuộc kho hiện tại vào tệp phụ | Đích và hình khối kích hoạt tùy chọn phải ánh xạ duy nhất; thời gian nâng cao/dựng/đa phương tiện vẫn được chẩn đoán / bảo toàn trực tiếp |
| Âm thanh thuyết minh | Tài nguyên `audio/` cộng tùy chọn xuất thuyết minh ghi sẵn | Quan hệ đa phương tiện, thẻ mang âm thanh và thời gian | `Sidecar/package` | Tài nguyên, liên kết slide và thời gian phải được kiểm chứng |
| Tự chuyển slide | Thời gian chuyển trang tường minh hoặc thời lượng suy ra từ thuyết minh | `advTm`/hành vi chuyển | `Sidecar/package` | Hiệu ứng điều khiển bằng nhấp chuột không tương thích với thuyết minh ghi sẵn |
| Siêu liên kết cả đối tượng | `<a href="...">` SVG chuẩn quanh một phần tử hoặc nhóm nhìn thấy | `p:cNvPr/a:hlinkClick` trên mỗi lá nhấp được cộng một quan hệ dùng chung | `Native-stable` cho đích ngoài và cùng bộ slide được hỗ trợ; nhập PPTX dựng lại neo | Thêm hình nền tường minh khi các khoảng hở trong thẻ/nút nhiều đối tượng phải nhấp được |
| Siêu liên kết chữ nội dòng | `<a href="..."><tspan>chữ nhìn thấy hoặc dấu hiệu công thức nội dòng</tspan></a>` trong chữ SVG thông thường | `a:rPr/a:hlinkClick` trong cùng đoạn DrawingML hoặc run lá Office Math | `Native-stable` cho đích ngoài và cùng bộ slide được hỗ trợ | Neo không sở hữu thuộc tính định vị; liên kết lồng nhau thất bại |
| Nhảy slide trong cùng bộ | Một trong hai thẻ mang được hỗ trợ với `href="#slide-N"` đánh số từ 1 chính xác | Quan hệ slide nội bộ cộng `ppaction://hlinksldjump` | Dựng lại theo danh sách bài thuyết trình cuối | Đích slide thiếu, ngoài khoảng, mồ côi hoặc mơ hồ thất bại có kiểm soát |
| Nhấp hình khối nhập cộng liên kết run bên trong | `data-pptx-shape-hyperlink="..."` chỉ-bộ-nhập trên `<g>` logic, với neo nội dòng chuẩn được giữ bên trong | Khôi phục cả `p:cNvPr/a:hlinkClick` và nhấp ở cấp run | Truyền tải không mất mát cho phần chồng chỉ-có-ở-nguồn này | Tác giả không bao giờ viết siêu dữ liệu này; bộ kiểm tra/xuất chỉ chấp nhận khi nhóm chứa neo nội dòng thật, vì SVG chuẩn cấm `<a>` lồng nhau |
| Thiết lập hành động khác | Không có ánh xạ soạn SVG | Không được tạo | `Direct preservation` chỉ nơi đường native sở hữu để nguyên OOXML nguồn | Di chuột, custom-show, lệnh điều hướng, chương trình/macro/OLE/tệp và `ppaction://` tùy ý nằm ngoài hợp đồng siêu liên kết; preset nút hành động chỉ cung cấp hình học thị giác |
| Nhận xét hoặc luồng rà soát | Không có ánh xạ SVG hay phía tạo | Không được soạn | `Direct preservation` chỉ khi được đường khác sở hữu tường minh | Đừng tự động chuyển siêu dữ liệu rà soát thành nội dung slide nhìn thấy |
| Quan hệ không thuộc tính năng đã ánh xạ | Không có lối thoát SVG chung | Không được tạo | `Direct preservation` nơi áp dụng | Chèn quan hệ tùy ý không được hỗ trợ |

Với một nhóm đích, đối tượng cũ hoàn toàn tương thích biểu diễn một hàng hiệu ứng, trong khi `effects[]` không rỗng biểu diễn nhiều hàng; hai dạng loại trừ nhau. Mỗi hàng có thể đặt `trigger`, `order`, `delay`, `duration` và `trigger_shape` riêng, với trigger hiệu ứng cấp slide chỉ dùng làm giá trị Start kế thừa. `auto`, `mixed` và `random` chỉ phân giải hiệu ứng vào chung; các hiệu ứng chuẩn tường minh phủ hiệu ứng vào, nhấn mạnh, preset đường chuyển động native và thoát. Ánh xạ này không suy ra dựng theo đoạn/vùng chữ, đường chuyển động tự do tùy chỉnh, chuỗi dựng Chart/SmartArt native hay lệnh phát đa phương tiện.

Xem [Chuyển trang & hiệu ứng](./animations.md) (nguồn kỹ thuật: [`references/animations.md`](../../skills/ppt-master/references/animations.md)) và [`audio-narration.md`](./audio-narration.md) về quy trình tệp phụ.

## 11. Các tính năng native khác của PowerPoint

| Tính năng PowerPoint | Trạng thái đường chính | Phương án thay thế được hỗ trợ | Ranh giới |
|---|---|---|---|
| SmartArt / DiagramML | Không có ánh xạ bộ biên dịch SVG native | Dựng lại ý nghĩa bằng hình khối, hoặc bảo toàn qua đường native/mẫu | Ảnh chụp hay phương án dự phòng phải tường minh |
| Đối tượng OLE hoặc Office nhúng | Không hỗ trợ trên đường SVG | Bảo toàn trực tiếp hoặc ảnh xem trước dựng hình | Đừng tạo quan hệ gói từ siêu dữ liệu SVG |
| Video | Không hỗ trợ như đối tượng đa phương tiện do SVG soạn | Bảo toàn trực tiếp hoặc poster tường minh mang siêu liên kết được hỗ trợ thông thường | Placeholder `media` không tạo video |
| Mô hình 3D | Không hỗ trợ | Bảo toàn trực tiếp hoặc xem trước dựng sẵn | Không xấp xỉ SVG trình duyệt nào được coi là 3D native |
| Macro / VBA | Không hỗ trợ | Chỉ bảo toàn qua quy trình trực tiếp có nhận biết macro | Đường `.pptx` sinh ra thông thường không tổng hợp VBA |
| XML mở rộng Office tùy ý | Không hỗ trợ | Bảo toàn trực tiếp bằng Edit Native PPTX khi đối tượng nguồn sở hữu không đổi | Bộ biên dịch SVG không có đường truyền OOXML chung |

## 12. Ánh xạ ngược: PPTX sang SVG dự án

Bộ nhập dựng lại ngữ nghĩa PowerPoint được hỗ trợ thành cùng từ vựng dự án dùng cho xuất:

| Đối tượng nguồn PowerPoint | Dựng lại SVG dự án |
|---|---|
| Hình preset | Nhóm preset đã bung với thẻ mang native và bằng chứng xem trước nhìn thấy khi được hỗ trợ |
| Hình học tùy chỉnh | `<path>` |
| Thân chữ | Run/đoạn `<text>` và `<tspan>` |
| Siêu liên kết run chữ được hỗ trợ | `<a href>` nội dòng chứa run `<tspan>` được liên kết |
| Siêu liên kết hình khối/ảnh/nhóm được hỗ trợ | `<a href>` chuẩn quanh đối tượng thị giác được dựng lại |
| Một hình khối có cả nhấp hình khối và liên kết run bên trong | Truyền tải `<g data-pptx-shape-hyperlink="...">` logic cộng neo nội dòng chuẩn; soạn sinh ra không bao giờ phát ngoại lệ này |
| Ảnh | `<image>`, hoặc biểu diễn cắt lồng đã đăng ký |
| Ảnh SVG kèm phương án dự phòng raster tương thích | `<image>` lấy từ quan hệ `asvg:svgBlip`; quan hệ `a:blip` thông thường chỉ dùng khi quan hệ SVG hoặc phần đa phương tiện không có |
| Đường nối | Xem trước đường/path đã bung cộng bằng chứng đường nối/khung/topo |
| Nhóm | `<g>` |
| Bảng/biểu đồ native được hỗ trợ | Phương án dự phòng nhìn thấy cộng siêu dữ liệu đối tượng native |
| Chuyển trang thuộc kho hiện tại được hỗ trợ | Hàng `animations.json` chuẩn với tùy chọn hiệu lực, thời lượng chính xác, tự chuyển slide tùy chọn và âm WAV được hỗ trợ |
| Chuỗi hiệu ứng đối tượng thời lượng chính xác được hỗ trợ | Hàng nhóm `animations.json` chuẩn với hiệu ứng/tùy chọn, thứ tự, trigger, thời lượng, độ trễ tương đối và `trigger_shape` tùy chọn |
| Khung đồ họa hoặc SmartArt không được hỗ trợ | Xem trước, placeholder hoặc trạng thái không hỗ trợ tường minh |

Đây là phép chiếu ngữ nghĩa, không phải round trip cú pháp. Việc bảo toàn dữ kiện Master/Layout gói nguồn đã kiểm chứng giới hạn ở mirror của Create Template và luôn tạo workspace mới; nhập thị giác thông thường không suy topo tái sử dụng từ vẻ ngoài slide.

### Chế độ nhập và ranh giới khôi phục lỗi

`pptx_to_svg.py` mặc định nhập khoan dung vì đầu vào của nó là file PPTX của người dùng hoặc bên thứ ba. `--strict` dành cho phát triển bộ phân tích, kiểm chứng hợp đồng và tái hiện vi phạm nguồn đầu tiên. Kiểm chứng SVG sinh ra nghiêm ngặt và xuất không đổi.

| Điều kiện nguồn | Nhập khoan dung mặc định | `--strict` | Kết quả chẩn đoán |
|---|---|---|---|
| Ngữ nghĩa màu nhận diện được kèm siêu dữ liệu nguồn không liên quan | Chuẩn hóa màu nhận diện được và bộ điều chỉnh | Từ chối cấu trúc không chuẩn | Cảnh báo kèm ngữ cảnh phần, slide và hình khối nơi có |
| Thuộc tính tô, viền, hiệu ứng, tô ảnh, thân chữ hay kiểu không được hỗ trợ | Giữ đối tượng và chỉ bỏ thuộc tính hay tính năng không được hỗ trợ | Dừng ở vi phạm đầu tiên | Cảnh báo nêu tính năng bị bỏ và phương án dự phòng |
| Đối tượng không được hỗ trợ không thể khôi phục từng thuộc tính | Thay đối tượng đó bằng placeholder chẩn đoán nhìn thấy; chỉ bỏ khi nó không có khung dùng được | Dừng ở vi phạm đầu tiên | Cảnh báo xác định đối tượng nguồn |
| Nền slide hoặc phần không được hỗ trợ | Bỏ nền đó và tiếp tục trang/phần | Dừng ở vi phạm đầu tiên | Cảnh báo xác định phần sở hữu |
| Gói/XML hỏng hoặc thiếu cấu trúc gói bắt buộc | Dừng; không có khôi phục cấp trang an toàn | Dừng | Lỗi lệnh sạch; không có traceback Python thô |

Mỗi lần chạy thành công ghi `<output>/conversion-report.json` và `<output>/animations.json` chuẩn với chuyển trang cơ sở là `none`. Báo cáo ghi chế độ, số slide và cảnh báo, sản phẩm sở hữu, mã lý do ổn định, thông điệp nguồn, phương án dự phòng đã chọn, phần gói, và — khi có — chỉ số slide cùng id/tên/loại hình khối. Thẻ mang chuyển trang không xác định hoặc không chính xác vẫn là chẩn đoán `transition-not-reconstructed` tường minh. Vì vậy nhập khoan dung không im lặng: nó tối đa hóa đầu ra dùng được trong khi làm mọi khôi phục hợp đồng rà soát được.

## 13. Quyền sở hữu kiểm chứng

Bốn tầng có nhiệm vụ khác nhau có chủ đích:

| Tầng | Trách nhiệm |
|---|---|
| Prompt, mẫu và ví dụ | Chỉ sinh biểu diễn chuẩn cho mỗi tính năng PowerPoint |
| `svg_quality_checker.py` | Từ chối ánh xạ không hợp lệ/không được hỗ trợ; cảnh báo nhưng cho phép cách viết tương thích đã đăng ký hoặc rủi ro độ trung thực |
| `svg_to_pptx.py` và đọc lại gói | Chuẩn hóa đầu vào tương thích, biên dịch DrawingML và từ chối mọi kết quả mơ hồ, mâu thuẫn cấu trúc hoặc không hợp lệ |
| `pptx_to_svg.py` | Ở chế độ khoan dung mặc định, giữ bộ slide dùng được và báo cáo suy giảm thuộc nguồn ở ranh giới an toàn hẹp nhất; ở chế độ `--strict`, dừng ở cấu trúc nguồn không được hỗ trợ hoặc sai định dạng đầu tiên |

Một cảnh báo SVG sinh ra không phải sự cho phép đoán. Nó dành cho ánh xạ được hỗ trợ xác định mà cách viết hoặc độ trung thực đáng chú ý. Ánh xạ thiếu, đơn vị không hợp lệ, siêu dữ liệu sai định dạng, hợp đồng cấu trúc hỏng và DrawingML sinh ra có thể gây sửa chữa vẫn là lỗi. Chẩn đoán nhập mô tả mất mát hoặc chuẩn hóa tường minh của nội dung thuộc nguồn; chúng không bao giờ cho phép bộ nhập bịa ngữ nghĩa không được hỗ trợ.

## 14. Thêm hoặc đổi một ánh xạ

Hãy coi một thay đổi ánh xạ là thay đổi bộ biên dịch, không phải chỉnh dễ dãi bộ phân tích SVG:

1. Nêu tên khả năng PowerPoint và kết quả DrawingML chỉnh sửa được dự định.
2. Định nghĩa một biểu diễn SVG dự án hoặc tệp phụ chuẩn trong mô-đun thẩm quyền áp dụng được do [`shared-standards.md`](../../skills/ppt-master/references/shared-standards.md) chọn.
3. Nêu đầu vào tương thích được chấp nhận tách khỏi soạn sinh ra.
4. Triển khai xuất, và chỉ triển khai nhập khi hỗ trợ dựng lại ngữ nghĩa.
5. Thêm phân loại bộ kiểm tra: lỗi cho đầu vào không hợp lệ/mơ hồ, cảnh báo chỉ cho đầu vào tương thích hoặc xấp xỉ xác định.
6. Thực hiện kiểm chứng hồi quy tập trung trên SVG sinh ra, gói PPTX, hiển thị PowerPoint và nhập ngược nơi áp dụng.
7. Cập nhật hàng tương ứng trong hướng dẫn này.

Điểm vào triển khai:

- Xuất: [`svg_to_pptx.py`](../../skills/ppt-master/scripts/svg_to_pptx.py) và `scripts/svg_to_pptx/`
- Nhập: [`pptx_to_svg.py`](../../skills/ppt-master/scripts/pptx_to_svg.py) và `scripts/pptx_to_svg/`
- Kiểm chứng: [`svg_quality_checker.py`](../../skills/ppt-master/scripts/svg_quality_checker.py)
- Bộ định tuyến thẩm quyền: [`shared-standards.md`](../../skills/ppt-master/references/shared-standards.md)
