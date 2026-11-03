# Thiết kế kỹ thuật

[Tiếng Việt](./technical-design.md)

---

## Triết lý thiết kế — Quy trình do AI dẫn dắt, bản nháp do con người kiểm soát

HugoPPTPilot tạo ra một **bản nháp PowerPoint chất lượng cao, chỉnh sửa được**, không phải bộ slide cuối đã niêm phong. Quy trình lập luận về thông điệp, thiết kế các trang, và soạn hoặc bảo toàn các đối tượng PowerPoint native theo hợp đồng đường tường minh. Người dùng rà soát hướng đi và giữ phán đoán chặng cuối trong PowerPoint. Generate thông thường nên để lại việc tinh chỉnh một bộ slide thật chứ không phải dựng lại từ ảnh slide hay một lớp vỏ mỏng chỉnh sửa được. Hồ sơ **Image to PPTX** [`image-to-pptx`](../../skills/ppt-master/workflows/profiles/image-to-pptx.md) là ngoại lệ hẹp: hiện nó đòi Codex, luôn kích hoạt Quick, chuẩn hóa một hoặc nhiều ảnh đầu vào thành danh sách khung trang có thứ tự, dựng lại chữ thông thường ở dạng native, dựng lại đồ họa nhận diện hoặc trang trí độ phân giải thấp dưới các khóa thị giác nghiêm ngặt khi cần, và dựng lại cảnh ảnh thành các lớp đã đăng ký. Nó vẫn từ chối "lớp da" ảnh chụp cả slide là dựng lại chỉnh sửa được.

Quy trình cung cấp lập luận riêng cho trình bày, trạng thái, hợp đồng và cổng chất lượng; các công cụ xác định lo chuyển đổi, kiểm chứng, đóng gói và thao tác tệp lặp lại được. **Mô hình được chọn vẫn đặt trần chất lượng**, trong khi gu và phán đoán của người dùng dẫn dắt việc rà soát và hoàn thiện.

### SVG là ngôn ngữ trung gian riêng của dự án

HugoPPTPilot không nhằm chuyển đổi SVG tùy ý thành PPTX. `svg_output/` dùng một **ngôn ngữ trung gian SVG chuẩn của dự án**: nó mượn cú pháp XML và mô hình đồ họa hai chiều của SVG, trong khi hợp đồng dự án đóng các phần tử, thuộc tính, đơn vị, siêu dữ liệu, hợp đồng cấu trúc và ánh xạ DrawingML được phép. Hướng đi là có chủ đích: **SVG thích nghi với HugoPPTPilot; HugoPPTPilot không mở rộng để theo toàn bộ chuẩn SVG**.

Ngôn ngữ trung gian phân biệt ba trạng thái đầu vào:

| Trạng thái | Định nghĩa | Cách xử lý |
|---|---|---|
| Đầu vào soạn chuẩn | Cách biểu đạt khuyên dùng duy nhất do prompt, mẫu và ví dụ sinh ra | Kiểm chứng và biên dịch qua ánh xạ đã đăng ký mà không có cảnh báo bí danh |
| Đầu vào tương thích | Cách viết lịch sử hoặc thủ công được ghi rõ với một phép chuẩn hóa an toàn, xác định duy nhất | Bộ kiểm tra phát cảnh báo không chặn; bộ chuyển đổi chuẩn hóa nó mà không đưa bí danh ngược lại prompt |
| Đầu vào không hợp lệ hoặc không được hỗ trợ | Cách biểu đạt không có ánh xạ, ý nghĩa mơ hồ, hợp đồng cấu trúc hỏng, hoặc có rủi ro DrawingML/PPTX không hợp lệ | Bộ kiểm tra báo lỗi và chặn luồng chuẩn; bộ chuyển đổi thất bại khi kiểm tra trước hay kiểm chứng gói của chính nó gặp cùng điều kiện không hợp lệ |

Ví dụ, kiểu chữ dự án dùng ngữ nghĩa px của SVG, với giá trị hữu hạn không đơn vị như `font-size="24"` là cách viết chuẩn. Đơn vị khác chỉ là đầu vào tương thích khi bộ chuyển đổi có phép chuẩn hóa xác định và bộ kiểm tra chấp nhận nó là tương thích; nó không được trở thành cách viết sinh ra mới. Đọc tương thích là ranh giới di trú có kiểm soát, không phải sự cho phép mở rộng ngôn ngữ soạn.

Các tầng quy trình, hướng dẫn soạn và công cụ xác định có trách nhiệm riêng và không thể thay thế nhau:

| Tầng | Trách nhiệm duy nhất | Điều rõ ràng không thuộc trách nhiệm |
|---|---|---|
| Quy trình Generate | Sắp xếp trình tự các giai đoạn, gọi các cổng, chuyển vai trò và trao sản phẩm cho người tiêu thụ đã khai báo | Nó không hấp thụ quyết định của Strategist, Executor, bộ kiểm tra hay bộ xuất chỉ vì nó điều phối chúng |
| Prompt, mẫu và ví dụ | Nêu chính xác cách viết chuẩn của dự án và giảm lệch cùng cảnh báo tại nguồn | Chúng không phải ranh giới đúng đắn hay an toàn |
| `svg_quality_checker.py` | Thực thi hợp đồng dự án trên trạng thái soạn; lỗi chặn, cảnh báo không chặn cho qua | Nó không lặng lẽ viết lại trang hay đoán ý định thiết kế |
| `svg_to_pptx.py` | Kiểm chứng phòng thủ ánh xạ bộ biên dịch và gói, chuẩn hóa các dạng tương thích được hỗ trợ, đòi báo cáo chất lượng cuối hiện hành khớp cho bản phát hành chính thức, và liên kết nó vào postflight | Nó không chạy lại toàn bộ `svg_quality_checker.py` hay coi việc tạo tệp là bằng chứng cổng chất lượng thượng nguồn đã đạt |
| `workflow_transcript.py` / `workflow_log.py` | Ghi phong bì lệnh Python theo dự án cùng kết quả vật chất có giới hạn, và tường minh nối thêm các sự kiện kiểm toán quan trọng không phải Python | Chúng không giữ toàn bộ luồng console, suy ra mức sẵn sàng, chạy lại công cụ khác hay đổi kết quả của công cụ sở hữu |

Bộ ghi tự động xác định dự án từ `PPT_MASTER_PROJECT_PATH`, một đối số mang đường dẫn, hoặc thư mục làm việc hiện tại, theo thứ tự đó. Tín hiệu môi trường chỉ cần cho các helper hướng stdout không có đường dẫn dự án; nó được đặt trên cùng lệnh Python và không tạo tiến trình bao.

---

## Kiến trúc Generate PPTX

Sơ đồ dưới đây phủ vòng đời Generate PPTX mặc định. Hồ sơ độ trung thực `beautify-pptx` dùng vòng đời đó trừ khi cùng yêu cầu nêu rõ Quick. Image to PPTX là một hồ sơ độ trung thực riêng bên trong Generate: hiện nó đòi Codex và luôn kích hoạt `quick-generate`, nên không bao giờ nạp runtime Default và không cần yêu cầu Quick riêng. Các agent host khác chưa được điều chỉnh cho hồ sơ, và hành vi của chúng không được hỗ trợ hay cam kết. Image to PPTX ánh xạ mỗi khung trang đã chuẩn hóa thành một slide và coi điểm ảnh nhìn thấy là sự thật bề mặt. Nó dựng lại chữ thông thường ở dạng native. Một logo, biểu tượng, huy hiệu hay đồ họa trang trí độ phân giải thấp có thể được Codex dựng lại từ tham chiếu, nhưng danh tính, hình bóng, tỷ lệ, màu sắc và chữ thương hiệu phải được khóa nơi áp dụng; cấm dùng bản thay thế chỉ giống. Biểu đồ, bảng và đồ họa dữ liệu không bao giờ được dựng lại bằng cách tạo sinh: dùng đối tượng native có giá trị kiểm chứng được, tài nguyên nguồn chính xác, hoặc đánh dấu mục đó `manual_required`. Cảnh ảnh chụp và minh họa dùng ít nhất một lớp nền sạch cộng các lớp chủ thể hoặc tiền cảnh. Nhiều đối tượng không chồng lấn có khung bao đã đệm có thể dùng chung một tấm nền được tạo, rồi tách thành đối tượng độc lập qua cắt lưới hoặc cắt theo khung bao SVG. "Lớp da" ảnh chụp cả slide vẫn bị cấm. Quick bỏ qua việc lập kế hoạch/xác nhận riêng và hoàn tất bản xem trước; việc hiểu nguồn và chuẩn bị tài nguyên vẫn chạy khi cần, cùng cổng sớm cho danh sách dài và một cổng chất lượng cuối không khóa. Chỉ nạp đúng một thủ tục runtime. Create Template có vòng đời workspace riêng, trong khi Edit Native PPTX nhập bộ slide có sẵn vào workspace round-trip bảo toàn nguồn; bảng đường ở phần sau của tài liệu này phủ cả ba đường cấp cao nhất.

```
Đầu vào người dùng (PDF/DOCX/XLSX/PPTX/URL/Markdown/văn bản chủ đề)
    ↓
[Xử lý nguồn & đủ dữ kiện] → source_to_md.py điều phối theo loại; chỉ-chủ-đề hoặc thiếu dữ kiện quan trọng cho lập kế hoạch thì vào topic-research
    └── Nội dung thô hoặc đã chuyển đã sẵn sàng; nghiên cứu ghi Markdown bổ sung và nguồn gốc dữ kiện để nhập dự án
    ↓
[Tạo dự án] → project_manager.py init <project_name> [--format <registered_format>]
    ↓
[Lưu trữ nguồn & phân tích dự án (khi có tệp nguồn; văn bản hội thoại bỏ qua)] → project_manager.py import-sources <project_path> <sources...>
    ├── Trước hết chuyển/sao chép tệp được cung cấp vào sources/ theo ranh giới sở hữu
    ├── Rồi chạy tiếp nhận trên mỗi PPTX đã lưu trữ và ghi analysis/<stem>.identity.json, <stem>.slide_library.json, source_profile.json
    ├── Nếu thiếu Markdown cùng stem chuẩn, chạy ppt_to_md.py trên PPTX đã lưu trữ đó
    └── Tệp loại nội dung trong sources/ trở thành hợp đồng nội dung
    ↓
[Chuẩn bị ứng viên mẫu (Bước 3)] — chỉ nội bộ; không UI, không chờ, chọn hay cài
    Chuẩn bị ứng viên Brand/Style/Layout/Deck có chỉ mục và các thư mục gốc chính xác được cung cấp
    Giai đoạn 1 xác nhận truyền đạt cùng thiết kế tự do/dùng mẫu; workspace đã chọn sau đó được kiểm chứng và cài trước Giai đoạn 2
    ↓
[Strategist] - Xác nhận truyền đạt Giai đoạn 1 + xác nhận giải pháp/sản xuất Giai đoạn 2 cuối → design_spec.md + spec_lock.md
    ↓
[Lấy ảnh] (khi bất kỳ hàng tài nguyên nào cần tạo bằng AI, tìm web hoặc cắt lát)
    ↓
[Executor]
    ├── Xem trước trực tiếp khởi động và luôn khả dụng trong lúc tạo
    ├── Tạo P01 đến P05 → svg_quality_checker.py --stage early --json (danh sách sáu trang trở xuống bỏ cổng này)
    ├── Dùng các trang đã soạn làm mẫu phương pháp để phân loại toàn bộ tập vấn đề; sửa mọi lỗi chặn và các cảnh báo tư vấn được chọn
    ├── Tạo liên tục các trang còn lại → svg_output/ (không gọi bộ kiểm tra ở giữa)
    ├── [Kiểm tra chất lượng] svg_quality_checker.py --stage final --json (bắt buộc — 0 lỗi; cảnh báo không chặn)
    └── [Ghi chú người trình bày, có điều kiện] kết quả Speaker Notes hiệu lực bật → notes/total.md hoàn chỉnh
    ↓
[Hiệu chỉnh biểu đồ (có điều kiện)] → giai đoạn verify-charts (bắt buộc với bộ slide có biểu đồ dữ liệu)
    ↓
[Tự kiểm tra thị giác (tùy chọn, chủ động bật)] → giai đoạn visual-review (chỉ khi người dùng yêu cầu rõ)
    ↓
[Hậu xử lý] → [total_md_split.py khi bật ghi chú] → finalize_svg.py → svg_to_pptx.py (kiểm chứng phòng thủ, rồi biên dịch; --no-notes khi tắt)
    ↓
Đầu ra:
    svg_final/
    └── *.svg                                           ← Bản xem trước thị giác suy ra bắt buộc; cố gắng nhúng ảnh được hỗ trợ, với ngoại lệ tham chiếu ngoài cho EMF/WMF

    exports/
    ├── <project_name>_<timestamp>.pptx                       ← Đầu ra hình khối native mặc định (DrawingML)
    ├── <project_name>_<timestamp>_native_charts_tables.pptx  ← Biến thể --native-charts-and-tables tường minh
    └── <project_name>_<timestamp>_narrated.pptx              ← Biến thể --recorded-narration hoặc --narration-audio-dir

    validation/
    ├── workflow.log                                ← Kiểm toán gọn lệnh/kết quả Python + sự kiện kiểm toán thủ công quan trọng
    ├── svg_quality_report.json                      ← Phát hiện SVG chặn/mới đưa vào/kế thừa/nhập nguồn
    └── <output_stem>.report.json                    ← Kiểm toán gói/tài nguyên postflight liên kết với báo cáo chất lượng SVG cuối

    # Chế độ luồng mặc định (không -o) tạo thư mục sao lưu, rồi cố gắng sao chép nguồn
    backup/<timestamp>/
    └── svg_output/                            ← Một bản sao thành công có thể dựng lại PPTX từ SVG đã soạn đóng băng
```

Lối tắt tường minh bỏ phần lập kế hoạch và xác nhận riêng, không bỏ đầu vào hay tài nguyên cần để dựng bộ slide:

```text
Tài liệu nguồn hoặc chủ đề
    -> chuyển/đọc nguồn và nghiên cứu các khoảng trống dữ kiện đã nhận diện khi cần
    -> xác định chế độ/phong cách và quyết định nội dung, cấu trúc trang, thẻ mang trong ngữ cảnh hoạt động
    -> chuẩn bị ảnh/biểu tượng đã chọn và manifest vận hành; giữ LaTeX công thức trong ngữ cảnh hoạt động
    -> soạn tay svg_output/ theo các tiêu chuẩn SVG chung
    -> kiểm chứng tọa độ biểu đồ dựa trên dữ liệu nếu có
    -> svg_quality_checker.py --quick-generate --stage final --json
    -> svg_to_pptx.py --quick-generate
    -> exports/<name>_<timestamp>.pptx
```

Các quyết định này được agent hiện tại đưa ra tự động mà không có Strategist, Confirm UI, `design_spec.md`, `spec_lock.md` hay kế hoạch thay thế. Chúng không thể dựng lại hay tiếp tục sau khi ngữ cảnh hoạt động bị mất.

Ở luồng mặc định, khi không có `-o` tường minh, các cờ đối tượng native và thuyết minh có thể kết hợp thành `<project_name>_<timestamp>_native_charts_tables_narrated.pptx`; `-o` tường minh giữ tên tệp do người gọi cung cấp. Tạo nhanh chấp nhận cùng các cờ đối tượng native và thuyết minh tùy chọn.

### SVG là ngôn ngữ thiết kế trang có ràng buộc

Với mọi quy trình soạn hoặc thiết kế lại slide nhìn thấy qua SVG, `svg_output/` là thẩm quyền thiết kế trang hoàn chỉnh, nhưng SVG ở đây nghĩa là SVG chuẩn của dự án được hợp đồng dự án chấp nhận — không phải mọi SVG trình duyệt dựng được. Mọi chữ, ảnh, hình khối, sơ đồ, phương án dự phòng biểu đồ/bảng, nền và phần tử bố cục suy ra từ mẫu nhìn thấy được trên slide đều phải đã tồn tại trong SVG trang đó hoặc được nó tham chiếu tường minh. Ở luồng mặc định, mẫu, `design_spec.md` và `spec_lock.md` dẫn dắt việc soạn SVG; `quick-generate` thay vào đó dùng quyết định trong ngữ cảnh hoạt động và giá trị SVG tường minh. Bộ xuất không bao giờ dùng đầu vào lập kế hoạch như một lớp thị giác thứ hai điền nội dung trang còn thiếu.

Lõi luôn được nạp cũng sở hữu mặc định chất lượng thị giác dự phòng và khoảng cách dòng số. Yêu cầu tường minh của người dùng, mẫu / thương hiệu, và phong cách đã khóa ghi đè mặc định thẩm mỹ tương thích; khi các thẩm quyền đó im lặng, thứ bậc, kiểu chữ, căn chỉnh, khoảng trống, tài nguyên có chủ đích và khoảng dòng theo mật độ của lõi vẫn áp dụng. Generate mặc định và Quick nạp `svg-effects.md` ở điều kiện định tuyến executor-base (các hiệu ứng thường ngày nằm trong lõi executor) và chạy chẩn đoán công việc §6.1 của nó trước khi hoàn tất một trang, với Visual Job Router làm bộ nhớ gợi nhớ cho những gì chẩn đoán đó tìm ra. Không lựa chọn thẩm mỹ nào có thể ghi đè một ranh giới kỹ thuật Bắt buộc / Cấm.

Các dấu hiệu ngữ nghĩa tối thiểu không làm yếu sự đóng kín đó. Trang thiết kế tự do, chỉ-thương-hiệu/phong-cách, và `template_reuse_scope: style` mặc định dùng quyền sở hữu phẳng cục bộ Slide: mọi đối tượng được biểu diễn ở lại Slide và không soạn định danh Master/Layout, lớp hay siêu dữ liệu placeholder nào. Xuất phẳng mặc định hiện thực hóa một Master sạch thuộc dự án cộng một Blank Layout từ lock màu/kiểu chữ hiện tại; xuất phẳng Quick không khóa dùng giàn theme mặc định của bộ chuyển đổi. Cả hai đều không nâng nội dung Slide. `template_reuse_scope: mirror|layout` mặc định, và Quick có chủ sở hữu cấu trúc Layout/Deck đã cài, dùng đường có cấu trúc, nơi mỗi trang mới khai báo định danh Master/Layout từ bản nháp SVG đầu tiên. Hình ảnh Master/Layout cố định là con gốc nguyên tử trực tiếp, trong khi slot nội dung tái sử dụng là nhóm cấp cao nhất với biên vùng thiết kế tường minh và một thẻ mang tương thích; vùng `object` hỗn hợp dùng phương án dự phòng proxy tường minh, và Layout không có slot vẫn hợp lệ. `data-pptx-role` dành riêng cho vài đối tượng khung trang cấu trúc mà hành vi gói hay hoạt ảnh chưa được siêu dữ liệu chuyên biệt diễn đạt. Một gói mẫu ngữ nghĩa cũ không được nâng cấp tại chỗ hay chấp nhận làm đầu vào Bước 3 có cấu trúc: hãy tạo workspace mới qua `create-template`, dùng dữ kiện gói còn có của PPTX native hoặc hình ảnh của SVG cũ chỉ làm tham chiếu, rồi soạn trang mới qua đường áp dụng do AI suy ra. Một dự án phẳng cố ý không ánh xạ, không phải cũ. Bộ xuất không bao giờ suy, sửa hay di trú quyền sở hữu Master/Layout hoặc placeholder; Quick chỉ suy đóng gói phẳng hay có cấu trúc từ hợp đồng SVG toàn trang tường minh, hoàn chỉnh sẵn có.

| Miền | Thẩm quyền |
|---|---|
| Nội dung và bố cục trang nhìn thấy trên các đường soạn SVG | SVG trang cuối trong `svg_output/` |
| Cú pháp SVG chuẩn dự án, dạng tương thích và ranh giới ánh xạ | Tập thẩm quyền được tách, chọn qua [`references/shared-standards.md`](../../skills/ppt-master/references/shared-standards.md) |
| Đóng gói Master/Layout/Slide và ánh xạ đối tượng native | Phép dịch SVG-sang-PPTX; có thể tổ chức lại nội dung được biểu diễn nhưng không bịa nội dung nhìn thấy |
| Hiệu ứng, chuyển trang, ghi chú người trình bày và thuyết minh | Tệp phụ/tài nguyên chuyên dụng và hậu xử lý gói PPTX |
| Chỉnh sửa bảo toàn PPTX native | Workspace round-trip Edit Native PPTX và bộ xuất bảo toàn nguồn |

Đây là quy tắc đóng kín thiết kế trang, không phải tuyên bố rằng SVG mô tả toàn bộ gói PPTX. Dựng lại slide nhìn thấy từ SVG đã hoàn thành là bất biến liên quan; dựng lại ghi chú, âm thanh, thời gian, quan hệ hay chỉnh sửa native trực tiếp chỉ từ SVG thì không.

`svg_final/` không đổi ranh giới đó. Ở luồng mặc định, Bước 7 suy ra bản xem trước thị giác từ `svg_output/`: tài nguyên bitmap/SVG được hỗ trợ được nhúng khi xử lý thành công, trong khi EMF/WMF ở ngoài để truyền thẳng native; ảnh thông thường chưa phân giải giữ tham chiếu gốc, và bộ hoàn tất hiện tại đếm các lỗi xử lý đó mà không làm hỏng cả lần chạy. Các tệp này hỗ trợ kiểm tra bằng IDE/trình duyệt và chèn thủ công dưới dạng ảnh SVG. Chúng không phải đường xuất PPTX thứ hai và không mang hợp đồng tương thích Convert-to-Shape của PowerPoint. Hình khối chỉnh sửa được chỉ đến từ bộ chuyển đổi dự án dịch `svg_output/` thành PPTX DrawingML native.

Yêu cầu PPTX có sẵn tách theo mô hình biến đổi: Edit Native PPTX dùng soạn round-trip bảo toàn nguồn, trong khi `beautify-pptx` vẫn là hồ sơ Generate PPTX tạo lại mọi trang nhìn thấy:

| Quy trình | Vai trò đầu vào | Cơ chế đầu ra | Vì sao tách riêng |
|---|---|---|---|
| `edit-native-pptx` | một PPTX có sẵn mà thiết kế native phải còn nguyên; tài liệu mới và lớp phủ bàn giao là tùy chọn | nhập bằng `pptx_to_svg.py --roundtrip`, tham chiếu các trang không đổi, sửa các SVG gọn đã chọn, rồi xuất bằng `svg_to_pptx.py --roundtrip` | trang không đổi khôi phục đến từng byte, đối tượng không đổi trên trang đã sửa khôi phục ở dạng native, và ghi chú/chuyển động là lớp phủ |
| `beautify-pptx` | một PPTX có sẵn mà số trang/thứ tự/câu chữ phải giữ 1:1 | trích dữ kiện nguồn, tạo lại bộ slide native qua đường SVG | chỉ đổi bố cục và thứ bậc; không phải chỉnh sửa tại chỗ trực tiếp |

---

## Tham chiếu nhanh quyết định đường

Việc chọn đường thực thi có thẩm quyền ở [`workflows/routing.md`](../../skills/ppt-master/workflows/routing.md); mục này là tham chiếu nhanh theo lý lẽ, không phải ma trận đường thứ hai để duy trì.

Hãy dùng bảng này trước khi suy luận chi tiết triển khai. Phần lớn lần chạy hỏng bắt đầu từ sai đường, không phải sai lệnh.

| Dạng yêu cầu | Đường | Ranh giới |
|---|---|---|
| Chỉ chủ đề, hoặc tài liệu cung cấp thiếu dữ kiện mà kết quả yêu cầu cần | Generate PPTX + `topic-research` trong Bước 1 | nghiên cứu chỉ-chủ-đề bắt đầu ngay; nghiên cứu có nguồn theo sau chuyển đổi/đọc và chỉ lấp các khoảng trống dữ kiện đã nhận diện |
| Tệp nguồn hoặc văn bản hội thoại, cấu trúc bộ slide có thể nghĩ lại | Generate PPTX | Strategist có thể tách, gộp, bỏ, sắp xếp lại và thiết kế lại |
| Một hoặc nhiều ảnh chứa khung trang phải thành slide nhiều lớp chỉnh sửa được | Generate PPTX + hồ sơ Image to PPTX (`image-to-pptx`) | Hiện đòi Codex và hồ sơ luôn kích hoạt Quick; chuẩn hóa mọi khung được biểu diễn trước và ánh xạ mỗi khung thành một slide; dựng lại chữ thông thường ở dạng native; dựng lại từ tham chiếu logo/biểu tượng/đồ họa trang trí độ phân giải thấp chỉ khi danh tính, hình bóng, tỷ lệ, màu sắc và chữ thương hiệu được khóa nơi áp dụng; biểu đồ/bảng/đồ họa dữ liệu đòi đối tượng native có giá trị kiểm chứng được, tài nguyên nguồn chính xác, hoặc `manual_required`; dựng cảnh thành ít nhất một lớp nền sạch cộng lớp chủ thể/tiền cảnh; đối tượng không chồng lấn khung bao đã đệm có thể dùng chung một tấm tạo trước khi cắt lưới hoặc cắt theo khung bao SVG; không bản thay thế chỉ giống và không "lớp da" ảnh chụp cả slide |
| Tạo nhanh tường minh | Generate PPTX + hồ sơ `quick-generate` | chuyển/đọc nguồn, nghiên cứu khoảng trống dữ kiện và chuẩn bị tài nguyên cần thiết khi cần; yêu cầu tường minh của người dùng được theo và agent hiện tại quyết mọi câu hỏi nội dung, trang, thị giác và tài nguyên còn lại trong ngữ cảnh hoạt động, bỏ Strategist/xác nhận/spec/lock/finalize, soạn tay SVG, qua một cổng cuối không khóa, và xuất PPTX cuối |
| PPTX làm tài liệu nguồn, người dùng cho phép câu chuyện/cấu trúc trang mới | Generate PPTX qua `ppt_to_md` + `pptx_intake` | Danh tính/hình học PPTX là dữ kiện và ứng viên, không phải ràng buộc nhân bản |
| PPTX thô làm mẫu cộng tài liệu/chủ đề mới | Edit Native PPTX (`edit-native-pptx`) | nhập workspace round-trip; chọn, sắp xếp lại, lặp hoặc bỏ trang bằng `page_plan.json`; chỉ sửa các trang đã lên kế hoạch |
| PPTX có sẵn, giữ số trang/thứ tự/câu chữ 1:1, cải thiện bố cục | Generate PPTX + hồ sơ `beautify-pptx` | nội dung và phân trang bị khóa; ý định Quick tường minh dùng Quick, nếu không thì Default |
| PPTX đã hoàn thành, giữ nội dung/bố cục ổn định, thêm ghi chú/âm thanh/thời gian/chuyển trang | Edit Native PPTX (`edit-native-pptx`) | phủ nâng cấp lên slide bảo toàn nguồn; không dựng lại việc soạn nhìn thấy |
| Người dùng muốn workspace mẫu tái sử dụng từ một hoặc nhiều file PPTX/SVG, ảnh/PDF, tài liệu/website, tài sản thương hiệu, văn bản trực tiếp, hoặc gói tham chiếu hỗn hợp | Create Template (`create-template`) | điểm vào cố định đọc mọi kênh bằng chứng áp dụng được, điều phối một quy trình con Create Brand, Create Style, Create Layout hoặc Create Deck, rồi trả thư mục gốc workspace làm ứng viên Giai đoạn 1 của Generate; quy trình con có cấu trúc có thể xuất PPTX rà soát |
| Generate mặc định tới giai đoạn lập kế hoạch; có thể đã có thư mục gốc workspace theo hợp đồng hiện hành chính xác hoặc bàn giao Create Template hiện tại | Giai đoạn 1 của Generate PPTX | Bước 3 chuẩn bị ứng viên không tương tác; Giai đoạn 1 xác nhận truyền đạt cùng thiết kế tự do/dùng mẫu; yêu cầu thông thường mặc định thiết kế tự do, ý định dùng mẫu rõ ràng hoặc bất kỳ thư mục gốc nào mặc định chế độ mẫu, và chỉ một thư mục gốc được chọn sẵn; workspace đã chọn được kiểm chứng và cài trước Giai đoạn 2 |
| Người dùng nhờ tinh chỉnh thứ tự/hiệu ứng/thời gian hiệu ứng cấp đối tượng | Generate PPTX + giai đoạn `customize-animations` | chính sách xuất tùy chọn qua `animations.json` |
| Người dùng nhờ xem trước, chọn, chú thích hoặc xuất lại chỉnh sửa trên trình duyệt | Generate PPTX + giai đoạn `live-preview` | chú thích chỉ áp dụng tại điểm bàn giao xác định |

Yêu cầu mơ hồ "tối ưu PPT này" quy về một phép phân biệt đầu tiên: thiết kế lại các trang nhìn thấy qua Generate, hay bảo toàn bộ slide native và sửa nó qua Edit Native PPTX. Trong Generate, bảo toàn số trang/thứ tự/câu chữ chọn hồ sơ `beautify-pptx`, còn dựng lại câu chuyện dùng hồ sơ thông thường. Ý định Quick tường minh chọn Quick trong Generate; nếu không thì Default áp dụng.

---

## Quy trình kỹ thuật

**Quy trình: AI tạo SVG → hậu xử lý chuyển thành DrawingML (PPTX).**

Luồng mặc định đầy đủ chia làm ba giai đoạn:

**Giai đoạn 1 — Hiểu nội dung & lập kế hoạch thiết kế**
Tài liệu nguồn (PDF/DOCX/XLSX/PPTX/URL/Markdown/văn bản chủ đề) được chuyển thành nội dung và dữ kiện phân tích mà Strategist cần. Strategist xác nhận một cam kết truyền đạt mở, suy ra giải pháp bộ slide hoàn chỉnh từ đó, xác định cơ chế sản xuất, và tạo đặc tả thiết kế.

**Giai đoạn 2 — AI tạo hình ảnh**
Vai trò Executor tạo mỗi slide thành một tệp SVG. Đầu ra của giai đoạn này là một **bản nháp thiết kế**, không phải sản phẩm hoàn thiện.

**Giai đoạn 3 — Chuyển đổi kỹ thuật**
Script hậu xử lý chuyển các phần tử vector SVG được hỗ trợ thành DrawingML. Chữ và hình vector vẫn là đối tượng PowerPoint native — nhấp được, chỉnh sửa được, đổi kiểu được — trong khi tài nguyên raster được sao chép làm phương tiện ảnh PPT thay vì làm phẳng slide thành một ảnh.

`quick-generate` giữ phần việc hiểu nguồn và chuẩn bị tài nguyên mà bộ slide cần, nhưng bỏ giai đoạn lập kế hoạch/xác nhận Strategist riêng và `finalize_svg.py`. Agent hiện tại theo mọi yêu cầu tường minh của người dùng và tự động đưa ra các quyết định nội dung, trang, thị giác và tài nguyên còn lại trong một ngữ cảnh hoạt động. Nó xác định chế độ và phong cách hình ảnh, cân nhắc toàn bộ menu thẻ mang — ảnh, tài nguyên minh họa/chữ trang trí trong suốt, biểu tượng, Cấu trúc định tính, hình khối native, biểu đồ/bảng và công thức — và có thể kết hợp bất kỳ tập con phù hợp nào trên một trang. Sau đó nó soạn theo các tiêu chuẩn SVG chung, chạy mọi bước chuẩn bị riêng theo khả năng đã chọn, qua một cổng chất lượng cuối không khóa, và dùng cùng bộ chuyển đổi DrawingML và postflight. Nó không ghi kế hoạch thay thế hay lịch sử thiết kế tiếp tục được; mất ngữ cảnh thì khởi động lại lần chạy Quick.

---

## Luồng sản phẩm

Quyền sở hữu nguồn/suy ra của sản phẩm có thẩm quyền ở [`artifact-ownership.md`](../../skills/ppt-master/references/artifact-ownership.md); mục này trực quan hóa cùng luồng dữ liệu để làm lý lẽ kiến trúc.

Quy trình dễ bảo trì hơn nếu các sản phẩm được đọc như luồng dữ liệu chứ không phải các thư mục tình cờ tồn tại:

```text
sources/<tệp nội dung> ─────────┐
sources/*.facts.json ───────────┤
analysis/source_profile.json ───┼─> Strategist -> design_spec.md + spec_lock.md
analysis/image_analysis.csv ────┘

design_spec.md + spec_lock.md + images/ + icons/ + templates/
    └─> Executor -> svg_output/
          ├─> sản phẩm/tham chiếu lập kế hoạch ở lại trong ngữ cảnh hoạt động hợp lệ
          ├─> project_manager.py page-context <project> P<NN> [theo yêu cầu]
          │     └─> --record-usage -> analysis/page-context/P<NN>.usage.json
          ├─> svg_quality_checker.py -> validation/svg_quality_report.json
          ├─> finalize_svg.py -> svg_final/
          └─> svg_to_pptx.py -> exports/<name>_<ts>.pptx + validation/<output_stem>.report.json
                                       backup/<ts>/svg_output/ [đường xuất mặc định; sao chép cố gắng hết sức sau khi tạo thư mục]

Quick Generate:
tài liệu nguồn hoặc chủ đề
    └─> chuyển/đọc + nghiên cứu khoảng trống dữ kiện [khi cần]
          └─> chế độ/phong cách + quyết định nội dung/trang/thẻ mang trong ngữ cảnh hoạt động
                └─> images/ + icons/ + manifest tài nguyên [khi cần]
                      └─> svg_output/ soạn tay
                            ├─> verify-charts [chỉ cho hình học biểu đồ dựa trên dữ liệu]
                            └─> svg_quality_checker.py --quick-generate --stage final --json
                                  └─> svg_to_pptx.py --quick-generate -> exports/*.pptx
                                        + validation/<output_stem>.report.json
                                        + backup/<ts>/svg_output/ [đường xuất mặc định]

Edit Native PPTX:
PPTX nguồn
    └─> pptx_to_svg.py --roundtrip -> authoring-svg-flat/ [+ page_plan.json]
          └─> svg_to_pptx.py --roundtrip -> exports/*.pptx
```

Điểm tách then chốt là `svg_output/` là trạng thái soạn, còn `svg_final/`, `exports/` và `backup/` là trạng thái bàn giao hoặc lưu trữ suy ra. Xóa ranh giới này làm việc kiểm chứng, xuất lại và sửa thủ công khó suy luận hơn nhiều.

---

## Vì sao là SVG?

SVG nằm ở trung tâm quy trình này. Lựa chọn được đưa ra bằng cách loại trừ.

**Tạo DrawingML trực tiếp** có vẻ thẳng nhất — bỏ định dạng trung gian, để AI xuất XML nền của PowerPoint. Nhưng DrawingML cực kỳ dài dòng; một hình chữ nhật bo góc đơn giản đòi hàng chục dòng XML lồng nhau. AI có dữ liệu huấn luyện về nó ít hơn nhiều so với SVG, đầu ra không đáng tin, và gần như không thể gỡ lỗi bằng mắt.

**HTML/CSS** là một trong những định dạng AI biết rõ nhất. Nhưng HTML và PowerPoint có thế giới quan khác nhau căn bản. HTML mô tả một *tài liệu* — tiêu đề, đoạn văn, danh sách — nơi vị trí phần tử do dòng chảy nội dung quyết định. PowerPoint mô tả một *khung vẽ* — mỗi phần tử là một đối tượng độc lập, định vị tuyệt đối, không có dòng chảy và không có ngữ cảnh. Đây không chỉ là bài toán tính bố cục; đó là sự lệch cấu trúc. Dù bạn giải được bài toán bộ máy bố cục trình duyệt (điều Chromium làm bằng hàng triệu dòng mã), một `<table>` HTML vẫn không có ánh xạ tự nhiên tới tập các hình khối độc lập trên slide.

**WMF/EMF** (Windows Metafile) là định dạng đồ họa vector native của chính Microsoft và có chung tổ tiên trực tiếp với DrawingML — mất mát khi chuyển đổi sẽ tối thiểu. Nhưng AI gần như không có dữ liệu huấn luyện về nó, nên con đường này chết ngay từ đầu. Đáng chú ý, ngay cả định dạng của Microsoft cũng thua SVG ở đây.

**SVG như ảnh nhúng** là đường đơn giản nhất — dựng mỗi slide thành ảnh rồi nhúng. Nhưng điều này phá hủy hoàn toàn khả năng chỉnh sửa: hình khối thành điểm ảnh, chữ không chọn được, màu không đổi được. Không khác gì ảnh chụp màn hình.

SVG thắng vì nó chia sẻ cùng thế giới quan với DrawingML: cả hai đều là định dạng đồ họa vector 2D tọa độ tuyệt đối dựng quanh cùng các khái niệm:

| SVG | DrawingML |
|---|---|
| `<path d="...">` | `<a:custGeom>` |
| `<rect rx="...">` | `<a:prstGeom prst="roundRect">` |
| `<circle>` / `<ellipse>` | `<a:prstGeom prst="ellipse">` |
| `transform="translate/scale/rotate"` | `<a:xfrm>` |
| `linearGradient` / `radialGradient` | `<a:gradFill>` |
| `fill-opacity` / `stroke-opacity` | `<a:alpha>` |

Bảng này cho thấy các khái niệm tương ứng, không phải cam kết theo toàn bộ chuẩn SVG hay lời hứa về ngữ nghĩa không mất mát. Mỗi khả năng được hỗ trợ phải có ánh xạ tường minh trong mô-đun áp dụng được do bộ định tuyến [`shared-standards.md`](../../skills/ppt-master/references/shared-standards.md) chọn, xác định cách viết chuẩn của dự án, đầu vào tương thích được chấp nhận, biểu đạt DrawingML đích, độ trung thực và ranh giới từ chối; khả năng hỗ trợ nhập PPTX còn phải xác định ngữ nghĩa PPTX/OOXML nguồn. Một ánh xạ có thể chính xác, chuẩn hóa xác định, phương án dự phòng tường minh, tệp phụ hoặc không hỗ trợ. Ngữ nghĩa gói như ghi chú, hiệu ứng và quan hệ không cần bị ép vào SVG, nhưng đường sở hữu của chúng phải tường minh.

Để có cái nhìn lấy PowerPoint làm gốc, từng tính năng một về các quan hệ đó, xem [Hướng dẫn ánh xạ tính năng PowerPoint ↔ SVG dự án](./powerpoint-svg-mapping.md). Nó sở hữu bản đồ khả năng công khai và khôi phục khi nhập PPTX; tập thẩm quyền do `shared-standards.md` định tuyến sở hữu việc soạn sinh ra.

Đường tạo chính dùng **ghi chuẩn hẹp và đọc tương thích có kiểm soát**. `svg_output/` mới và mẫu tái sử dụng chỉ dùng cách viết chuẩn của dự án — ví dụ `#RRGGBB` đục viết hoa, với độ trong suốt do `fill-opacity`, `stroke-opacity`, `stop-opacity`, `flood-opacity` hoặc `opacity` nguyên tử tương ứng mang. Đầu vào lịch sử hoặc thủ công chỉ đi tiếp khi hợp đồng tương thích ghi lại nó, phép chuyển có một nghĩa duy nhất và đầu ra hợp lệ. Bộ kiểm tra phát cảnh báo không chặn cho đầu vào đó, và bộ chuyển đổi chuẩn hóa nó tại ranh giới biên dịch. Bất cứ điều gì đòi đoán, thiếu ánh xạ, hoặc có thể tạo PPTX hỏng đều là lỗi.

Vì vậy chuyển đổi không phải đoán định dạng giữa SVG tùy ý và DrawingML. Nó là một phép biên dịch đã đăng ký, có mô tả độ trung thực, kiểm thử được, từ SVG chuẩn của dự án sang DrawingML.

SVG cũng là định dạng duy nhất đồng thời đáp ứng mọi vai trò trong quy trình: **AI tạo nó đáng tin cậy, con người xem trước và gỡ lỗi được trong bất kỳ trình duyệt nào, và script dịch được nó theo một hợp đồng tương thích tường minh** — tất cả trước khi một dòng DrawingML nào được viết.

---

## Chuyển đổi nội dung nguồn

Tài liệu nguồn (PDF / DOCX / EPUB / XLSX / PPTX / trang web) được chuẩn hóa trước khi Strategist làm việc, nhưng không còn một kênh duy nhất kiểu "mọi thứ thành Markdown và không gì khác quan trọng". Thiết kế hiện tại có hai kênh dữ kiện với quyền sở hữu tường minh:

| Kênh | Sản phẩm | Chủ sở hữu | Dùng cho |
|---|---|---|---|
| Hợp đồng nội dung | Tệp loại nội dung trong `sources/` (chủ yếu `<stem>.md`) | Bộ chuyển đổi `source_to_md/*` + `import-sources` | chữ, bảng, giá trị biểu đồ, câu chữ nút SmartArt, trích dẫn và tự sự nguồn |
| Phân tích có cấu trúc | `analysis/*.json` / `analysis/*.csv` | Công cụ tiếp nhận và phân tích | danh tính PPTX, hình học slide, bảng/biểu đồ native, quan hệ SmartArt, và dữ kiện ảnh đo được như kích thước, tỷ lệ, số tham chiếu, loại phương tiện và khả năng dựng hình |

Với nguồn PPTX, `project_manager.py import-sources` trước hết chuyển hoặc sao chép bản gốc vào `sources/` của dự án theo ranh giới sở hữu, rồi chạy `pptx_intake.py` trên đường dẫn đã lưu trữ đó. Chỉ khi không có Markdown cùng stem chuẩn tường minh hay sẵn có, cuối cùng nó mới gọi `ppt_to_md.py`. Một lần nhập đầu thông thường vì vậy tạo cả hai kênh dữ kiện, trong khi khử trùng lặp có thể bỏ chuyển đổi Markdown dư thừa và lỗi tiếp nhận được ghi là ghi chú nhập thay vì bịa phân tích. Markdown vẫn là nguồn nội dung của đường tạo chính. Một gói tiếp nhận thành công ghi `<stem>.identity.json`, `<stem>.slide_library.json`, và gộp chỉ mục nhiều bộ slide gọn vào `analysis/source_profile.json`. Strategist đọc chỉ mục gọn để lấy dữ kiện nguồn và chỉ mở sản phẩm thô theo từng bộ slide khi quy trình cần. Phân biệt đó quan trọng: đường chính có thể nghĩ lại số trang và câu chuyện, trong khi `beautify` nâng một phần dữ kiện tiếp nhận đó thành ràng buộc mạnh hơn.

Tài nguyên ảnh do bộ chuyển đổi sinh ra cũng được chuẩn hóa. Thư mục đồng hành `<stem>_files/` được nhập vào kho `images/` của dự án, `image_manifest.json` được gộp theo tên tệp, và tham chiếu tài nguyên Markdown được viết lại khi tên nhập thay đổi. Ảnh vector Office (`.emf` / `.wmf`) là tài nguyên runtime hạng nhất: chúng không bị raster hóa trong lúc tiếp nhận, `finalize_svg.py` để chúng ở ngoài cho đường native, và `svg_to_pptx.py` nhúng chúng như phương tiện vector Office để không mất phông CJK và chi tiết vector.

Hai lựa chọn thiết kế bộ chuyển đổi vẫn định hình hệ thống:

**Ưu tiên Python native, nhị phân ngoài là dự phòng.** Các định dạng thông dụng do gói wheel Python thuần xử lý; pandoc chỉ được gọi cho đuôi dài các định dạng ngách. Ép mọi người dùng cài nhị phân hệ thống mà họ có thể không có quyền là một thứ thuế tiện dụng không đáng khi phần lớn đầu vào là docx / pdf / html / pptx.

**Giả dạng dấu vân tay TLS cho các trang bảo mật cao.** Tải web mặc định dùng đường Python `web_to_md.py` và dựa vào `curl_cffi` khi có để giả dạng TLS giống Chrome. Tài khoản chính thức WeChat và vài CDN chặn thẳng cái bắt tay mặc định của Python; giữ việc này trong đường bộ chuyển đổi Python tránh biến bộ tải Node thành kiến trúc chính.

---

## Cấu trúc dự án & vòng đời

`project_manager.py init` tạo các thư mục làm việc dự án chuẩn; `--format` là tùy chọn và chỉ được truyền khi khung thực tế khớp chính xác một định dạng đã đăng ký. Không có nó, thư mục được đặt tên `<name>_<YYYYMMDD>`; Default Generate ghi viewBox đã xác nhận vào `spec_lock.md`, còn Quick Generate lấy nó từ SVG đầu tiên. `--quick-generate` tạo `svg_output/` cộng nhật ký kiểm toán lạnh `validation/workflow.log`, bỏ README dự án và để các thư mục khác theo yêu cầu. Hồ sơ [`quick-generate`](../../skills/ppt-master/workflows/profiles/quick-generate.md) tường minh bỏ sản phẩm lập kế hoạch và `svg_final/`, nhưng dự án của nó vẫn có thể chứa nguồn đã chuyển, phân tích, ảnh, biểu tượng và manifest tài nguyên cần thiết. Nó soạn tay `svg_output/`, gồm cả mọi dấu hiệu công thức native, ghi báo cáo chất lượng cuối không khóa, và giữ postflight thông thường cùng bản sao lưu đường mặc định quanh PPTX cuối. Nhật ký kiểm toán và báo cáo lưu kết quả công cụ, không phải lập luận thiết kế của AI hay trạng thái giai đoạn tiếp tục được. Vòng đời bàn giao mặc định là:

| Thư mục | Vai trò |
|---|---|
| `sources/` | bản gốc đã lưu trữ, Markdown chuẩn hóa và tệp đồng hành của bộ chuyển đổi |
| `analysis/` | dữ kiện do máy trích xuất: gói tiếp nhận PPTX và phân tích ảnh tạo lại |
| `images/` | kho ảnh runtime duy nhất cho tài nguyên của người dùng, trích xuất, web, AI, cắt lát và EMF/WMF |
| `icons/` | bộ biểu tượng cục bộ dự án do `icon_sync.py` sao chép hoặc workspace đang hoạt động cung cấp; xem trước, kiểm chứng, hoàn tất và xuất chỉ phân giải tham chiếu `library/name` đầy đủ dưới thư mục gốc này |
| `templates/` | spec mẫu / tham chiếu SVG / tài nguyên mẫu không phải ảnh đã sao chép |
| `svg_output/` | thư mục SVG soạn tay duy nhất |
| `svg_final/` | SVG xem trước thị giác suy ra bắt buộc của luồng thông thường; tài nguyên bitmap/SVG được hỗ trợ được nhúng khi có thể, trong khi EMF/WMF giữ ngoại lệ tham chiếu ngoài; dùng cho xem trước IDE/trình duyệt hoặc chèn thủ công dưới dạng ảnh SVG |
| `live_preview/` | trạng thái máy chủ xem trước, lịch sử chỉnh sửa và nhật ký chú thích |
| `notes/` | `total.md` và ghi chú người trình bày từng slide đã tách |
| `validation/` | nhật ký kiểm toán lạnh quy trình, báo cáo chất lượng SVG và báo cáo kiểm toán postflight PPTX |
| `exports/` | sản phẩm PPTX native có đóng dấu thời gian |
| `backup/<timestamp>/` | xuất mặc định tạo thư mục có đóng dấu thời gian, rồi cố gắng sao chép `svg_output/` đóng băng; sao chép thất bại không làm hỏng xuất, nhưng tạo thư mục thất bại hiện chưa được hạ cấp |

CLI hỗ trợ `--move`, `--copy` và chế độ tự động mặc định, với một ranh giới sở hữu cố định: chỉ nguồn đã nằm dưới cây `projects/` của repo mới có thể chuyển vào `sources/` của dự án đích; mọi đường dẫn cục bộ khác được sao chép và để nguyên, kể cả khi cung cấp `--move`. `--copy` bảo toàn đầu vào cục bộ projects. Generate PPTX dùng chế độ tự động để tài liệu repo chuẩn và tệp ngoài của người dùng không thể bị xóa trong lúc tiếp nhận.

---

## Các bất biến kiến trúc

Các bất biến sở hữu sản phẩm thực thi được có thẩm quyền ở [`artifact-ownership.md`](../../skills/ppt-master/references/artifact-ownership.md); mục này giải thích vì sao các ranh giới đó quan trọng về mặt kiến trúc.

Các bất biến này mạnh hơn sở thích triển khai thông thường. Nếu một thay đổi vi phạm một trong chúng, nhiều khả năng nó đang thay đổi kiến trúc chứ không phải tái cấu trúc.

| Bất biến | Hệ quả thực tế |
|---|---|
| Tệp loại nội dung trong `sources/` là hợp đồng nội dung của Generate | chữ, bảng và giá trị biểu đồ đến từ tệp loại nội dung trong `sources/` (Markdown là chính, nhưng `.txt` / `.csv` / `.json` / `.yaml` / … cũng tính); tệp phụ đã biết (`*.conversion_profile.json`, `*_files/image_manifest.json`) bị loại trừ |
| `analysis/` lưu dữ kiện máy và sổ hồ sơ có giới hạn, không phải hợp đồng thiết kế | `source_profile.json` và sản phẩm tiếp nhận cung cấp thông tin cho Strategist ở luồng mặc định và agent hiện tại ở `quick-generate`; Image to PPTX còn sở hữu `reconstruction_inventory.json` chỉ-bằng-chứng-nguồn cho ánh xạ vật chứa/khung nguồn, hash, vùng nhìn thấy và độ bất định. Lựa chọn lớp cuối của nó ở lại trong ngữ cảnh hoạt động của Quick. Các sản phẩm này không khóa số trang/thứ tự trừ ở quy trình nói rõ |
| `design_spec.md` giải thích thiết kế; `spec_lock.md` thực thi nó ở luồng mặc định | cả hai vẫn là sản phẩm sở hữu ở đó; `quick-generate` không lưu bền cái nào hay kế hoạch thay thế nào, và agent hiện tại theo yêu cầu tường minh của người dùng trong khi giữ mọi quyết định nội dung, trang, thị giác và tài nguyên còn lại chỉ trong ngữ cảnh hoạt động; mất ngữ cảnh thì khởi động lại Quick |
| Ngữ cảnh lập kế hoạch được giữ cho đến khi vô hiệu | thực thi liên tục dùng lại Design Spec, lock và tham chiếu kích hoạt hoàn chỉnh; thực thi mới/tiếp tục/khởi động lại/nén gọn nạp lại chúng một lần |
| `page-context` là theo yêu cầu | bộ chiếu chỉ-đọc hỗ trợ chẩn đoán, kiểm tra định tuyến xác định và đo lường sử dụng tùy chọn; nó không phải cổng trước trang |
| `svg_output/` là thư mục SVG soạn tay duy nhất | kiểm tra chất lượng, chỉnh sửa tay, xuất lại và `update_spec.py` nhắm tới nguồn soạn |
| `svg_final/` bắt buộc nhưng suy ra trong bàn giao mặc định | nó được tạo lại từ `svg_output/` để xem trước thị giác hoặc chèn thủ công dưới dạng ảnh SVG; tài nguyên được hỗ trợ được nhúng khi có thể trong khi EMF/WMF giữ ngoại lệ tham chiếu ngoài, và nó không bao giờ thành nguồn sự thật xuất native; quick-generate bỏ sản phẩm này |
| Xuất PPTX native mặc định đọc `svg_output/` | bộ chuyển đổi bảo toàn biểu tượng, `preserveAspectRatio`, hình chữ nhật bo góc và siêu dữ liệu cắt ảnh native trước khi hoàn tất viết lại chúng |
| Convert to Shape của PowerPoint nằm ngoài hợp đồng tương thích | `svg_final/` có thể chèn dưới dạng ảnh SVG, nhưng cấu trúc chuyển đổi và kết quả thị giác không được đảm bảo và không ràng buộc tập tính năng SVG được hỗ trợ |
| Edit Native PPTX không vào đường SVG của Generate | workspace round-trip của nó dùng các trang `authoring-svg-flat/` có nguồn hậu thuẫn và bộ xuất bảo toàn nguồn thay vì tạo bộ slide mới |
| Dữ kiện ảnh đến từ siêu dữ liệu tạo lại | `analysis/image_analysis.csv` được suy lại từ thư mục `images/` hiện tại; ở luồng mặc định Strategist dùng ngữ cảnh nguồn trước và chỉ kiểm tra tài nguyên mơ hồ cụ thể khi ngữ nghĩa hay vị trí an toàn không thể xác định, trong khi ở `quick-generate` agent hiện tại áp dụng cùng phân tích có giới hạn khi chuẩn bị tài nguyên; soạn SVG không quét lại điểm ảnh nguồn |
| PPTX thô làm mẫu không phải ứng viên Bước 3 | Bước 3 chỉ chấp nhận thư mục gốc workspace mẫu tái sử dụng chính xác làm đầu vào ứng viên |

---

## Hệ thống định dạng khung

HugoPPTPilot không chỉ dành cho PPT — cùng đường SVG → DrawingML tạo poster vuông, story 9:16, bản in A4. Quy ước theo định dạng (tỷ lệ, vùng an toàn, vùng thương hiệu) nằm trong [`references/canvas-formats.md`](../../skills/ppt-master/references/canvas-formats.md).

Lựa chọn kiến trúc đáng nêu: **viewBox tính bằng pixel, không phải đơn vị tuyệt đối.** Không gian pixel làm việc suy luận bố cục rõ ràng với Executor AI (`x="100"` rõ ràng là trái + 100px) và kiểm tra được trong bất kỳ trình duyệt nào. Chuyển sang EMU của PowerPoint chỉ diễn ra một lần khi xuất — chọn pixel nghĩa là phần còn lại của quy trình (Strategist, Executor, bộ kiểm tra chất lượng, hậu xử lý) không bao giờ nghĩ theo EMU, điều bất lợi cho cả việc AI tạo lẫn con người gỡ lỗi.

---

## Hệ thống mẫu & lựa chọn

Việc dùng mẫu là **chủ động bật, không suy ra**. Bước 3 mặc định chỉ chuẩn bị ứng viên; nó không bao giờ mở UI hay cài nội dung mẫu. Giai đoạn 1 hiển thị đề xuất truyền đạt cùng một lựa chọn thiết kế tự do/mẫu có thể chuyển đổi. Yêu cầu thông thường mặc định thiết kế tự do; ý định dùng mẫu rõ ràng hoặc bất kỳ thư mục gốc nào được cung cấp mặc định chế độ mẫu. Đúng một thư mục gốc có thể được chọn sẵn, còn nhiều thư mục gốc vẫn là ứng viên chưa chọn. Hệ thống không bao giờ chọn mẫu theo độ giống chủ đề.

**Vì sao thiết kế tự do vẫn là một lựa chọn tường minh.** Mẫu là sàn dễ thành trần: chúng khóa bộ slide vào thành ngữ hình ảnh của mẫu bất kể nội dung thực sự muốn được trình bày thế nào. Bố cục thiết kế tự do suy ra cấu trúc từ nội dung nguồn thay vì áp đặt từ một ngữ pháp cố định, nên nhịp hình ảnh theo nội dung thay vì chống lại nó. Chế độ bị ràng buộc thật sự tốt hơn trong các trường hợp hẹp (bộ slide khóa thương hiệu, kịch bản định kiểu mạnh như bảo vệ luận án hay báo cáo cơ quan nhà nước), trong khi bộ chọn giữ lựa chọn cuối cho người dùng.

**Chọn chính xác, không khớp ngữ nghĩa.** Một tên trống như `presentation_core`, nhắc đến thương hiệu, hay cụm phong cách như "phong cách McKinsey" không bao giờ bị khớp mờ với một thư mục. Trang mặc định liệt kê các mục Brand/Style/Layout/Deck đã đăng ký chỉ từ bốn tệp `*_index.json` của chúng; khám phá trong chat đọc cùng các chỉ mục và trả thư mục gốc chính xác. Đường dẫn tường minh vẫn hợp lệ, và đường dẫn chính xác khớp một thư mục gốc chuẩn đã đăng ký có thể hiển thị là `library`; thư mục gốc chưa đăng ký vẫn là `explicit`. Workspace thư viện hiện hành phân giải `templates/design_spec.md`, còn thư mục gốc project phân giải mọi `templates/design_spec.<kind>.<id>.md`; máy chủ phân tích các loại thật của mỗi thư mục gốc tường minh, trong khi nhãn nguồn chỉ là nguồn gốc. Gói thư mục gốc phẳng không phải workspace mẫu. Bản tóm tắt phong cách tự do vẫn là đầu vào Giai đoạn 2 thông thường và không kích hoạt workspace Style. Hình dạng thư mục không bao giờ cho phép di trú cấu trúc. Gói có ngữ nghĩa Master/Layout/placeholder cũ phải được thay bằng workspace mẫu mới tạo trước Bước 3.

Mọi gói Brand/Style/Layout/Deck hiện hành dùng một hợp đồng định tuyến workspace. Workspace Brand và Style bỏ danh sách SVG; thư mục tùy chọn rỗng bị bỏ:

```text
<template_workspace>/
├── templates/   # spec trần của library hoặc spec định danh của project; Layout / Deck còn gồm nguyên mẫu SVG
├── images/      # tùy chọn; tài nguyên bitmap tham chiếu bằng ../images/<name>
├── icons/
│   └── imported/ # tùy chọn; tài nguyên vector nhập chuẩn
└── exports/     # tùy chọn, tệp rà soát theo yêu cầu; Git bỏ qua trong library
```

Style chỉ đóng góp Design Spec của nó; nó không mang tài nguyên hay tải rà soát. Giàn dự án sẵn có và tệp loại anh em không phải đầu vào của Style.

`<template_workspace>` là `skills/ppt-master/templates/<kind>/<id>/` hoặc thư mục gốc workspace chính xác khác như `projects/<name>/`. Bước 3 ghi nó làm đầu vào ứng viên, chỉ đọc phần frontmatter mà loại và khung của nó cần. Khi Giai đoạn 1 chọn nó, giai đoạn áp dụng kiểm chứng và cài nó vào `templates/`, `images/` và `icons/` của dự án hiện tại; nó không bao giờ sao chép `exports/`. Strategist và các vai trò sau chỉ đọc bản sao cục bộ dự án đó khi việc lập kế hoạch nhận biết mẫu bắt đầu sau Giai đoạn 1. Thư mục gốc project vẫn dùng trực tiếp được bởi dự án khác. Chuyển một đóng góp vào thư viện giữ lược đồ spec và tài nguyên của nó nhưng đổi tên tệp định danh thành đường dẫn thư viện một loại trần; việc đăng ký chỉ mục toàn cục khi đó quyết định nó có hiện như lựa chọn thư viện hay không.

Với Create Layout / Create Deck, `standard` và `fidelity` kiểm tra toàn bộ kiểm kê Master/Layout nguồn làm bằng chứng cấu trúc và thị giác, rồi soạn các nguyên mẫu SVG Slide hoàn chỉnh và hệ thống Master/Layout/slot mới. `standard` giữ gọn; `fidelity` phủ tập họ bám nguồn hữu ích rộng hơn. Mỗi Layout soạn được giữ lại được biểu diễn bởi ít nhất một nguyên mẫu Slide. `mirror` chỉ phát ra nguyên mẫu Slide nguồn và bảo toàn chuỗi Layout/Master truy cập được của từng Slide; mỗi SVG độc lập giải quyết ngữ cảnh Master + Layout + Slide trong khi giữ dấu hiệu sở hữu tường minh. Cấu trúc nguồn mà mọi Slide đều không dùng vẫn chỉ là bằng chứng. Mirror của Layout chỉ hợp lệ khi nguồn được giữ vốn đã trung lập thương hiệu và trung lập ứng dụng; nếu không hãy soạn Layout mới hoặc giữ các dữ kiện đó dưới dạng Deck. Nhóm nguồn lớp cố định được bung cơ học thành nguyên tử trực tiếp trong khi bảo toàn quyền sở hữu, thứ tự sơn và vẻ ngoài. Create Brand chỉ phân tích mảnh bản sắc; Create Style chỉ trích phương pháp/hướng di động. Cả hai không vào chiến lược nhân bản cấu trúc hay tạo danh sách SVG.

Chỉ-Slide là ranh giới danh sách SVG, không phải lệnh cấm dữ liệu hỗ trợ xác định. Mirror có PPTX làm nền có thể mang tệp phụ Theme nguồn theo từng Master và tải native; công cụ kiểm chứng và tiêu thụ chúng mà không phơi chúng làm nguyên mẫu hay ngữ cảnh soạn trang.

Bốn loại mẫu sở hữu các phân đoạn khác nhau của hợp đồng thiết kế:

| Loại | Sở hữu | Nội dung điển hình | Ảnh hưởng tới Strategist |
|---|---|---|---|
| `brand` | bản sắc | màu sắc, kiểu chữ, logo, giọng điệu, phong cách biểu tượng | khóa bản sắc; cấu trúc vẫn tự do |
| `style` | hướng / phương pháp | phương pháp truyền đạt, vai trò trang mở, quy tắc bằng chứng/dữ liệu, mặc định hình ảnh, hướng ảnh/biểu tượng, trọng tâm rà soát mang tính tư vấn | gieo mầm Giai đoạn 2; Style-một-mình giữ phẳng, trong khi Layout/Deck đã cài cung cấp kế hoạch cấu trúc; không bao giờ thành sự thật bản sắc hay kích hoạt rà soát hình ảnh |
| `layout` | cấu trúc trung lập thương hiệu | khung, cấu trúc trang, vai trò chữ ngữ nghĩa/hành vi không gian, loại trang, danh sách SVG | phơi cấu trúc; bản sắc và ứng dụng truyền đạt vẫn là quyết định khâu sau |
| `deck` | ứng dụng + bản sắc/cấu trúc tích hợp | tình huống lặp lại, khán giả/kết quả, vai trò trang tiêu biểu, bản sắc và danh sách SVG thực tế | đóng góp ngữ cảnh mô tả và bản sắc; cung cấp nguyên mẫu khi không có Layout ghi đè cấu trúc |

Theme, Slide Master, Slide Layout và Placeholder là các đối tượng PowerPoint đã biên dịch, không phải loại mẫu bổ sung. Layout sở hữu topo, vị trí, vai trò chữ ngữ nghĩa và hành vi không gian; Brand sở hữu giá trị bản sắc và tài nguyên. Dưới `template_reuse_scope: layout`, bộ xuất xác định định dạng placeholder cuối từ các quy tắc đó cộng chế độ đọc/thang cỡ chữ đã xác nhận; `mirror` bảo toàn định dạng nguồn và topo chữ theo nghĩa đen. Bộ xuất có thể đặt cả hai bộ quy tắc vào cùng đồ thị Master/Layout native.

Khi chọn nhiều thư mục gốc, mỗi thư mục gốc riêng biệt được cài một lần và mọi đóng góp vẫn là tệp spec riêng. Tập đầy đủ chứa tối đa một đóng góp cho mỗi loại; cả bốn loại có thể cùng tồn tại, và thư mục gốc project nhiều loại là nguyên khối. Quyền sở hữu được xác định ở mức phân đoạn khi đọc, không phải mức trường: Brand sở hữu bản sắc, Style sở hữu mặc định hướng/phương pháp, Layout sở hữu cấu trúc khi có, và nếu không thì Deck sở hữu cấu trúc trong khi luôn giữ ngữ cảnh ứng dụng tái sử dụng mô tả và mọi bản sắc không bị Brand ghi đè. Chỉ danh sách cấu trúc Layout-hoặc-Deck hiệu lực được cài. Nguồn gốc library/explicit không bao giờ đổi thứ tự đó. Hợp đồng ứng dụng của dự án hiện tại chỉ đến từ Giai đoạn 1 đã xác nhận; ngữ cảnh Deck là đầu vào so sánh cho Giai đoạn 2, không phải ghi đè. Xác nhận của người dùng vẫn cao nhất. Mặc định bảng màu/kiểu chữ của Style không bao giờ ghi đè bản sắc Brand/Deck, và kỳ vọng phương pháp/bố cục của nó phải tương thích với cấu trúc đã chọn. Tổ hợp Brand + Layout cục bộ dự án lấy ngữ cảnh ứng dụng từ Giai đoạn 1 và không tự động được nâng thành Deck thư viện tái sử dụng. Loại trùng lặp bị từ chối trước khi cài. Điều này giữ việc ghép mẫu gỡ lỗi được: tập đã cài tự mô tả, vì mỗi tệp nêu loại và id và giữ thân nguồn ngoài nguồn gốc.

**PPTX thô không thể là workspace Bước 3.** Generate thông thường có thể dùng PPTX làm tài liệu nguồn, và `beautify-pptx` có thể thiết kế lại nó trong khi bảo toàn số trang, thứ tự và câu chữ từng trang 1:1; cả hai không coi PPTX nguồn là mẫu Bước 3. Khi PPTX thô được dùng làm mẫu hoặc khung slide native, hoặc các trang có sẵn của nó được chọn, sắp xếp lại, lặp hoặc bỏ mà không thiết kế lại, đường mặc định là Edit Native PPTX. Yêu cầu tách, gộp, lập lại dàn ý hay thiết kế lại bộ slide vẫn là Generate. Chỉ yêu cầu tạo workspace mẫu tái sử dụng và dùng lại hệ thống thiết kế đó ở Bước 3 đường SVG mới chạy Create Template trước rồi cung cấp thư mục gốc workspace đã tạo.

**Hợp đồng mẫu là chủ động bật; tham chiếu danh mục và biểu tượng thì không.** Sự bất đối xứng là có chủ đích: Layout khóa cấu trúc tái sử dụng, Style khóa mặc định hướng/phương pháp, Brand khóa bản sắc, và Deck kết hợp ứng dụng lặp lại với bản sắc và cấu trúc. Tham chiếu Chart/Table cục bộ theo trang cộng biểu tượng là nguyên thủy tái sử dụng không tự chúng áp đặt hợp đồng toàn bộ slide. Cấu trúc định tính thay vào đó được Executor sinh từ quan hệ của trang hiện tại và không có SVG hay khóa danh mục. Danh mục Chart/Table dùng chung cây `templates/` với workspace tái sử dụng, nhưng quyền sở hữu của chúng vẫn cục bộ theo trang.

---

## Hệ thống vai trò: các chế độ chuyên biệt trong một quy trình đơn

HugoPPTPilot giữ các vai trò trạng thái bộ slide — Strategist, Image_Generator và Executor — bên trong một agent chính thay vì phân tán chúng cho các sub-agent song song. Chúng là phạm vi chỉ dẫn được nạp theo yêu cầu, không phải các agent độc lập giữ bản sao cũ của trạng thái bộ slide. Một giai đoạn hỗ trợ chỉ có thể dùng sub-agent có giới hạn khi thẩm quyền của nó định nghĩa một bàn giao sản phẩm bền vững không phụ thuộc trạng thái bộ slide dùng chung. Lựa chọn cốt lõi có ba lý do liên kết:

**Vì sao một agent, không phải sub-agent song song.** Thiết kế trang phụ thuộc toàn bộ ngữ cảnh thượng nguồn — lựa chọn màu của Strategist, tài nguyên ảnh thực sự đã lấy được (so với thất bại và được thay), nhịp hình ảnh các trang trước. Sub-agent sẽ bắt đầu với ảnh chụp một phần đã cũ của ngữ cảnh đó và tạo bộ slide lệch hình ảnh. Cùng lập luận cấm tạo trang theo lô (ví dụ năm trang một lượt): theo lô đẩy nhanh nén ngữ cảnh và sự nhất quán hình ảnh của bộ slide xuống nhanh hơn lợi ích tốc độ.

**Vì sao tham chiếu chuyên biệt theo vai trò, không phải một prompt khổng lồ.** Strategist chạy ở chế độ "thương lượng với người dùng" (mở, hội thoại, sẵn sàng lùi lại); Executor chạy ở chế độ "tạo XML nghiêm ngặt": nó không được chọn lại quyết định thượng nguồn hay bỏ thuộc tính bắt buộc, nhưng vẫn sở hữu hình học, bố cục, thứ bậc và xử lý thị giác trong các chiều triển khai mà Design Spec để mở. Trộn cả hai vào một prompt ép mô hình giữ hai kỷ luật không tương thích trong cùng một lượt — mọi bệnh lý prompt-engineering của việc trộn chế độ đều xuất hiện. Tách thành tệp theo vai trò cho phép mỗi vai trò chỉ nạp những gì nó cần và bỏ phần còn lại.

**Lựa chọn mẫu và truyền đạt dùng chung Giai đoạn 1.** Bước 3 chuẩn bị ứng viên không tương tác, trong khi đề xuất truyền đạt của Giai đoạn 1 được soạn mà không mở spec hay nguyên mẫu của ứng viên. Mẫu không bao giờ viết lại mục tiêu truyền đạt; loại và khung của một thư mục gốc chính xác hoặc được bàn giao có thể gợi ý khung slide và khoảng số trang, và khung khác biệt là một quyết định nhìn thấy ở Giai đoạn 1. UI xác nhận cam kết truyền đạt đó cùng lựa chọn thiết kế tự do/mẫu có thể chuyển đổi; chỉ sau đó agent mới cài từng spec đã chọn riêng vào dự án. Strategist dùng một cổng hai giai đoạn theo thứ tự phụ thuộc. Đề xuất `delivery_context` của nó phân biệt dùng bởi người trình bày dẫn dắt, người đọc dẫn dắt, kết hợp, và ghi hình/tự chạy trong một trường văn xuôi, nêu bối cảnh chính và ghi mọi cách dùng phụ; kết hợp không bao giờ đứng một mình mà thiếu chế độ dẫn dắt. Các ô văn xuôi vẫn chỉnh sửa được và không ô nào đòi câu trả lời không rỗng: xác nhận lưu đúng văn bản hiện tại, và giá trị đã xóa vẫn rỗng thay vì quay về đề xuất. Giai đoạn 2 cuối được soạn một lần từ hợp đồng đó. Strategist trước hết tạo đúng ba giải pháp hoàn chỉnh, khả thi, phù hợp dự án, rồi chiếu từng cái thành chế độ tùy chỉnh, phong cách hình ảnh tùy chỉnh, màu, kiểu chữ, biểu tượng và kỹ thuật dựng ảnh tạo sinh tùy chỉnh; các danh mục cố định vẫn là lựa chọn đơn bảo thủ ở tầng thấp hơn. Mỗi hướng là một thiết kế hoàn chỉnh soạn từ trên xuống trong hợp đồng đã xác nhận thay vì lắp từ lựa chọn danh mục, và có ba hướng để một đề xuất đơn lẻ không khóa người dùng; các danh mục cố định là tầng thủ công bên dưới. `custom` không có quan hệ bắt buộc với danh mục, và một preset đã chọn có thể được mang nguyên. Ba bó là những thiết kế khác nhau rõ ràng ở cấp cả bộ slide, được quyết định trước khi viết bất kỳ trường nào và chỉ sau đó mới chiếu lên chế độ, phong cách hình ảnh, kỹ thuật dựng, màu, kiểu chữ và biểu tượng; sự khác biệt đó nằm ở các giải pháp chứ không ở một trường chỉ định, nên thành phần nào một hướng đòi sẽ mang nó và thành phần nào cũng có thể trùng nhau. Tên, ghi chú hay số tham chiếu khác nhau tự nó không phải là khác biệt, và các bó giống hệt trên mọi thành phần không phải ba giải pháp. Nơi sự thật có thẩm quyền của người dùng/mẫu cố định vài thành phần, các thành phần còn mở mang sự khác biệt; phép chiếu giống hệt chỉ hợp lệ khi không còn gì mở, và kế hoạch nêu ranh giới đó thay vì bịa biến thể. Nó không lắp ba giải pháp sau đó từ các lựa chọn thành phần độc lập hay ép chúng vào nguyên mẫu an toàn / dịch chuyển / táo bạo. Sau khi cả ba bó hoàn chỉnh, thiết kế tự do ghi lựa chọn phù hợp tổng thể mạnh nhất thành `design_directions.selected` đánh số từ không. Với trạng thái mẫu đã cài, mọi bó vẫn tuân thủ cùng ngữ cảnh đã xác định; `selected` xác định bó khả thi thể hiện đầy đủ nhất nó, trong khi hai bó còn lại chỉ biến đổi các chiều mở thay vì làm yếu việc dùng mẫu hay chia nhỏ các phân đoạn của nó. Thứ tự mảng không mang ý ưu tiên. Trước khi chọn tham chiếu nó chỉ đọc ba chỉ mục danh mục; sau khi nền của từng giải pháp được đóng băng, nó chỉ đọc các tệp chi tiết đã chọn được khử trùng lặp và hoàn tất các hành vi tùy chỉnh. Nguồn ảnh vẫn là phán đoán độc lập, nên mọi giải pháp đã có ứng viên kỹ thuật dựng ngay cả khi ban đầu không khuyên dùng ảnh AI. Thẻ trên cùng được ưu tiên được đánh dấu và áp dụng ban đầu. Thẻ trên cùng không hoạt động áp dụng bó bất biến của nó, mỗi thẻ tùy chỉnh đã chiếu trở nên chỉnh sửa được tại chỗ sau khi chọn, và mọi điều khiển bên dưới có thể phân kỳ; thẻ hoạt động đã chỉnh sẽ phơi hành động khôi phục tường minh, trong khi trạng thái cuối chỉ lưu các thành phần hiện tại đã chỉnh. Cùng giai đoạn này xác nhận chế độ đọc, số trang, lấy ảnh AI có điều kiện, chế độ tạo, công tắc rà soát Design Spec, và việc agent có nên chủ động tạo ghi chú người trình bày, hiệu ứng tùy chỉnh hay âm thanh thuyết minh không. Xử lý công thức không phải chính sách sản xuất người dùng chọn: toán có cấu trúc trở thành dấu hiệu công thức native trong lúc soạn. Chỉ sau khi Giai đoạn 1 được xác nhận, khi một mẫu được cài, Strategist mới đọc workspace cục bộ dự án và nội dung hiện tại, suy ra **cách áp dụng nó**, và phơi kế hoạch đó thành văn xuôi `template_application` chỉnh sửa được; Giai đoạn 2 không bao giờ chọn lại mẫu, và các chế độ tái sử dụng/tuân thủ nội bộ vẫn ẩn. Chế độ đọc quyết định ý nghĩa được mang qua trang, hình ảnh, người trình bày và ghi chú thế nào; thẻ của nó không hiện giá trị px. Trình duyệt có thể áp dụng cục bộ phụ thuộc xác định `chế độ đọc → cỡ chữ nội dung cơ sở → cỡ vai trò chưa ghim`, trong khi chỉnh cỡ thủ công ghim các giá trị nhìn thấy. Nó không bao giờ tạo lại Giai đoạn 2. Ba giá trị chủ động là chính sách dự phòng, không phải lệnh cấm khả năng: chỉ dẫn tường minh gần nhất của người dùng thắng, rồi Giai đoạn 2 cuối, rồi mặc định cố định `true / false / false`. Strategist vẫn ghi các gợi ý Chuyển động không ràng buộc khi hữu ích; một gợi ý một mình không kích hoạt việc thực thi hiệu ứng tùy chỉnh. Ảnh tạo sinh kế thừa trực tiếp các neo màu bộ slide đã chọn; không có lựa chọn bảng màu ảnh độc lập. Trạng thái cuối có hai thẻ mang tương đương: đường UI mặc định đọc `confirm_ui/result.json` đúng một lần sau lần chờ cuối, trong khi đường chỉ-chat hoặc ủy quyền tường minh giữ một bản tóm tắt xác nhận cuối tương đương và có thể không tạo `result.json`. Cả hai đường trước hết xác định và lưu mọi kết quả sản xuất hiệu lực vào một `design_spec.md` và hoàn tất độ trung thực Cổng 1. Khi rà soát tắt, việc soạn lock tiến hành ngay. Với `refine_spec: true`, quy trình dừng trước `spec_lock.md`; người dùng có thể sửa bất kỳ phần nào của cùng Design Spec đó qua chat thông thường trong bao nhiêu lượt tùy ý, rồi phê duyệt tường minh giải phóng việc soạn lock Cổng 2. Không duy trì Design Spec thứ hai hay lock song song. Việc soạn lock thông thường và thực thi khâu sau không đọc lại kênh xác nhận nào. Tài nguyên thủ công bắt buộc vẫn có thể đưa vào điểm chặn có điều kiện riêng, nên đây không phải tuyên bố độc quyền trên mọi cổng runtime. Kiểm chứng dự án đòi bộ neo gọn `audience` / `objective` / `core_message` dưới `spec_lock.md ## communication` cộng một `Audience move` trong mỗi khối Slide §IX.

Ba giá trị chủ động được xác nhận ở Giai đoạn 2 cuối vẫn là bằng chứng thô độc lập. Cụ thể, bật thuyết minh có thể bật kết quả Speaker Notes hiệu lực trong Design Spec, nhưng không bao giờ viết lại lựa chọn ghi chú người trình bày thô.

**Phân tích ảnh ưu tiên siêu dữ liệu, với phương án dự phòng thị giác hẹp.** Khi có ảnh, `analyze_images.py` cung cấp các dữ kiện đo được tạo lại trong `analysis/image_analysis.csv`; CSV là một góc nhìn trên thư mục `images/` hiện tại, không phải bộ nhớ đệm bền. Ở luồng mặc định, Strategist trước hết xác định ảnh được cung cấp từ vị trí trong nguồn và văn xuôi lân cận, chú thích / văn bản thay thế / tiêu đề, tên tệp, ghi chú người dùng, bản ghi tài nguyên hiện có và siêu dữ liệu đó. Nó chỉ có thể kiểm tra một ảnh cụ thể khi còn một mơ hồ vật chất về lựa chọn, danh tính dữ kiện, vai trò trang, độ an toàn khi cắt hay vị trí trọng tâm — không bao giờ như một lượt quét kiểm kê hàng loạt. Câu trả lời được ghi vào Design Spec §VIII, sau đó Executor dùng kế hoạch và hình học đo được mà không mở lại điểm ảnh nguồn để khám phá ngữ nghĩa. Ở `quick-generate`, agent hiện tại áp dụng cùng phân tích có giới hạn trong khi chuẩn bị tài nguyên đã chọn từ quyết định trong ngữ cảnh hoạt động; không ghi phép chiếu Design Spec hay danh sách tài nguyên chung. Khung trang đã chuẩn hóa của Image to PPTX là ngoại lệ hẹp: mỗi khung được kiểm tra một lần để dựng bằng chứng nguồn và xác định chữ thông thường, đồ họa nhận diện hay trang trí, biểu đồ/bảng/đồ họa dữ liệu, vùng cảnh và chồng lấn. Các lần đọc sau vẫn cục bộ theo trang/vùng trong khi agent Codex hiện tại chuẩn bị các tài nguyên nền sạch và chủ thể/tiền cảnh đã đăng ký qua đường ảnh tham chiếu sẵn có. Logo, biểu tượng và đồ họa trang trí độ phân giải thấp chỉ có thể được dựng lại khi danh tính, hình bóng, tỷ lệ, màu sắc và chữ thương hiệu được khóa nơi áp dụng. Biểu đồ, bảng và đồ họa dữ liệu không thể dùng dựng lại tạo sinh; chúng đòi đối tượng native có giá trị kiểm chứng được, tài nguyên nguồn chính xác, hoặc `manual_required`. Nhiều đối tượng không chồng lấn có khung bao đã đệm có thể dùng chung một tấm tạo trước khi cắt lưới hoặc cắt theo khung bao SVG tạo đối tượng độc lập. Ảnh người dùng, ảnh trích xuất, ảnh web, đầu ra AI và phần tử cắt lát vẫn hội tụ vào cùng bảng dữ kiện đo được.

**Công thức native là đối tượng trang được soạn, không phải tài nguyên ảnh.** Một khối độc lập lưu LaTeX nguồn trong nhóm `data-pptx-replace-with="formula"` và xuất `m:oMathPara`; một `<tspan data-pptx-inline-formula="...">preview</tspan>` lá trong chữ thông thường xuất `m:oMath` trong cùng đoạn DrawingML. Toán nội dòng thừa hưởng cỡ chữ và màu tô đặc nhìn thấy của run chữ, rồi dùng ngôn ngữ chữ dự án và Cambria Math; màu cục bộ do bộ biên dịch sở hữu và nhấn mạnh `\boldsymbol` / `\bm` cũng tới các điều khiển cấu trúc không chọn được, trong khi độ đậm/kiểu chữ thông thường hay ghi đè bảng chữ toán chỉ đổi thuộc tính run kế thừa tương ứng. Một bảng hồ sơ Microsoft 365 đóng nuôi một bộ phân tích và AST chung, rồi một bộ phát tạo và kiểm chứng cấu trúc từ vựng OMML hẹp dùng bởi cả đường khối và nội dòng. Bộ biên dịch xuôi phủ mọi đầu vào và chuẩn hóa native được ghi tài liệu tường minh trong hồ sơ LaTeX và mhchem Microsoft 365 đã ghim; đầu vào không xác định, nêu rõ không hỗ trợ, không hợp lệ hoặc tràn tài nguyên thất bại có kiểm soát. Bộ nhập PPTX áp dụng phép ngược hẹp hơn lên cùng từ vựng OMML sạch với bộ kiểm chứng, thuộc dự án đó: nó phát dấu hiệu công thức khối/nội dòng chuẩn kèm bản xem trước SVG nhìn thấy, không phải cách viết LaTeX gốc của tác giả. OMML bên thứ ba không xác định vẫn là phương án dự phòng đọc được/đục có chẩn đoán thay vì tuyên bố dựng lại native. Ma trận, suy diễn nhiều dòng và biểu thức cấu trúc cao khác vẫn là khối. Cả hai dạng giữ nội dung xem trước SVG thông thường vì LaTeX thô không hiển thị trong SVG. PowerPoint 2010+ là đích gói, không có PNG công thức, quan hệ đa phương tiện hay phương án dự phòng ảnh cho ứng dụng không phải PowerPoint. Hồ sơ thực thi được ghim theo các phiên bản tài liệu Microsoft 365 nêu; kiểm chứng của repo ở cấp bộ biên dịch, OMML và gói, không phải chứng nhận đầy đủ hiển thị/chỉnh sửa giao diện Microsoft 365.

**Siêu liên kết native dùng một sự thật soạn SVG cộng quan hệ gói.** `<a href>` chuẩn bọc hoặc một đối tượng/nhóm nhìn thấy hoàn chỉnh hoặc một hay nhiều run `<tspan>` nội dòng. URI ngoài tuyệt đối thành quan hệ siêu liên kết ngoài; đích `#slide-N` đánh số từ 1 chính xác thành quan hệ Slide nội bộ với `ppaction://hlinksldjump`. Bộ nhập PPTX dựng lại cùng các neo cho nhấp hình khối và run được hỗ trợ. Edit Native PPTX giữ nguyên XML siêu liên kết và quan hệ trên các trang không đổi và, với kế hoạch trang, chỉ ánh xạ lại một lần nhảy nội bộ khi đích đầu ra rõ ràng. Di chuột, custom show, lệnh điều hướng, chương trình/macro/OLE/tệp và thiết lập hành động tùy ý vẫn nằm ngoài hợp đồng. Một ngoại lệ truyền tải chỉ-nguồn bảo toàn hình khối PowerPoint có cả nhấp cả hình khối lẫn liên kết run bên trong: PPTX-sang-SVG ghi `data-pptx-shape-hyperlink` trên nhóm logic và giữ các neo nội dòng chuẩn, vì SVG không thể lồng hai cấp `<a>`. Soạn sinh ra không bao giờ ghi thuộc tính đó.

**Ngữ cảnh lập kế hoạch được giữ** mang tính liên tục; bộ chiếu trang theo yêu cầu chỉ là chẩn đoán mô tả bên dưới.

---

## Kỷ luật thực thi

Định tuyến Generate chọn một thẩm quyền runtime trước khi nạp thủ tục của nó: [`workflows/generate-pptx.md`](../../skills/ppt-master/workflows/generate-pptx.md) sở hữu Bước 1–7 của Default, trong khi [`quick-generate.md`](../../skills/ppt-master/workflows/profiles/quick-generate.md) sở hữu vòng đời Quick khép kín. [`image-to-pptx.md`](../../skills/ppt-master/workflows/profiles/image-to-pptx.md) và [`beautify-pptx.md`](../../skills/ppt-master/workflows/profiles/beautify-pptx.md) là các hồ sơ độ trung thực loại trừ nhau. Image to PPTX hiện đòi Codex và kích hoạt Quick trực tiếp mà không cần tín hiệu Quick riêng; các agent host khác không được điều chỉnh hay hỗ trợ. Beautify tiếp tục chọn giữa Default và Quick từ ý định Quick tường minh. [`SKILL.md`](../../skills/ppt-master/SKILL.md) chỉ sở hữu kỷ luật thực thi toàn cục và bàn giao bắt buộc tới `routing.md`. Cùng nhau, các quy tắc này có thể trông quan liêu nhưng tồn tại vì LLM mặc định "để tôi giải cả bài toán trong lượt này", chính là hình dạng sai cho một quy trình tuần tự nơi đầu ra mỗi bước có giới hạn, có điểm kiểm và được bước kế tiếp tiêu thụ. Chúng đóng các kiểu lỗi xuất hiện lặp lại trong thực tế: thực thi sai thứ tự, AI làm thay quyết định thiết kế của người dùng, gộp đa giai đoạn, thiếu tiền đề, làm trước suy đoán, mất ngữ cảnh sub-agent, lệch do tạo trang theo lô, lệch màu/phông bộ slide dài, lệch SVG do tạo theo lô/script, và mơ hồ định tuyến.

Chính sách dừng/tiếp tục toàn cục có thẩm quyền ở [`failure-recovery.md`](../../skills/ppt-master/workflows/governance/failure-recovery.md); ma trận khôi phục cụ thể và con trỏ tiếp tục của nó hiện phủ Generate PPTX. Mục này không lặp lại các quy tắc đó.

Ba ranh giới đặc biệt quan trọng với kiến trúc. Thứ nhất, SVG trang phải được agent chính hiện tại soạn tay, từng trang một; viết bộ sinh Python/Node/shell để phát trang bị cấm vì bộ slide thu được mất phán đoán liên trang và sự liên tục thị giác. Thứ hai, nhịp quy trình là `P01–P05 → cổng sớm (bỏ với danh sách sáu trang trở xuống) → các trang còn lại → cổng cuối`. Năm trang đầu là mẫu phương pháp: thực thi phát `gate-signal`, rồi mang các quy tắc phương pháp đã xác định sang các trang sau; không có lô trang hay lần gọi bộ kiểm tra giữa chừng nào ngắt các trang còn lại, và mọi lần gọi bộ kiểm tra theo sau một điểm cổng hoặc một lượt sửa gộp. `quick-generate` giữ việc soạn tay tuần tự, dùng P01 làm đường cơ sở hiệu chuẩn hệ thống thị giác, dùng chung cổng sớm với danh sách bảy trang trở lên, và chạy một cổng cuối không khóa sau khi có đủ danh sách. Thứ ba, định tuyến là xác định: yêu cầu PPTX thô làm mẫu, yêu cầu hồ sơ beautify, yêu cầu Edit Native PPTX, giai đoạn hiệu ứng tùy chỉnh, giai đoạn xem trước trực tiếp và các kích hoạt đã đăng ký khác không bị biến thành câu hỏi đường mở cho người dùng khi repo đã định nghĩa ranh giới.

Ở luồng mặc định, Role Switching Protocol (bắt buộc đọc `references/<role>.md` trước khi đổi chế độ) phục vụ hai mục đích bổ trợ: ép chỉ dẫn vai trò mới vào ngữ cảnh ghi đè độ lệch từ chế độ trước, và dấu hiệu nhìn thấy trong bản ghi hội thoại tạo vết kiểm toán để người dùng thấy khi nào agent chuyển giữa các chế độ — quan trọng khi rà soát vì sao một quyết định cụ thể được đưa ra.

---

## Lan truyền spec: spec_lock.md như hợp đồng thực thi theo ngữ cảnh

Ở luồng mặc định, giai đoạn Strategist tạo hai sản phẩm trông thừa nhưng phục vụ hai chủ khác nhau:

- `design_spec.md` — tự sự đọc được bởi con người; "vì sao" của bộ slide (ý định truyền đạt, kết quả khán giả, lý lẽ mạch kể / mẫu / thị giác, dàn ý trang)
- `spec_lock.md` — hợp đồng thực thi đọc được bởi máy; các neo truyền đạt gọn `audience` / `objective` / `core_message` cùng vai trò bản sắc/tái sử dụng ổn định và giá trị định tuyến (vai trò HEX/phông cốt lõi, thư viện biểu tượng, tài nguyên ảnh và ánh xạ cấu trúc)

Vì sao cả hai? `design_spec.md` bảo toàn giải pháp và lý lẽ đã xác nhận hoàn chỉnh; `spec_lock.md` nêu tập con phải ổn định hoặc định tuyến được qua các trang. Nó được soạn từ Design Spec đó cộng ngữ cảnh trang/tài nguyên/mẫu, không sao chép từng trường từ JSON UI thô hay tải tóm tắt chat. [Bước 6 của Generate PPTX](../../skills/ppt-master/workflows/generate-pptx.md#step-6-executor-phase) giữ cả hai sản phẩm một lần cho mỗi ngữ cảnh thực thi hợp lệ. Thực thi mới/tiếp tục/khởi động lại, nén gọn hay khôi phục chỉ-từ-tóm-tắt nạp lại cả hai một lần; ngữ cảnh liên tục không đổi không đọc lại tệp nào. Sắc độ theo ngữ cảnh, sơn gradient/hiệu ứng và điểm nhấn phông hiển thị không-cấu-trúc thưa vẫn là quyết định theo trang; sự lặp lại hoặc vai trò ngữ nghĩa ổn định đòi một vai trò lock thượng nguồn.

Góc nhìn bỏ các cấm đoán SVG/biểu tượng phổ quát đã do lõi Executor luôn nạp sở hữu và chỉ giữ các hàng cấm riêng của dự án. Nó chọn ảnh từ bản tóm tắt trang hiện tại, gán trang tài nguyên ảnh tường minh và tham chiếu nguyên mẫu mirror. Ảnh được gán ở nơi khác bị loại trừ; mọi ảnh cũ chưa phân giải vẫn nằm trong tập con tương thích, và `confirmed-none` chỉ xuất hiện khi mọi ảnh bị khóa đều có gán xác định ở nơi khác.

Lock cũng là bảng định tuyến theo trang. Ngoài màu và kiểu chữ toàn cục, nó mang `page_rhythm` (`anchor` / `dense` / `breathing`), `page_visualizations` (tham chiếu `chart|table/<key>` cục bộ theo trang đã chọn, kích hoạt việc đọc SVG họ tương ứng và §VII Usage nhưng không khóa mô hình thông tin, loại hay hình học cuối), các hàng ảnh với hợp đồng vị trí/cắt, và giá trị `mode` / `visual_style` bị khóa. Mỗi chủ sở hữu quyết định trước hết đọc bản đồ khả năng gọn hoàn chỉnh của mình: lập kế hoạch Biểu đồ đọc từ vựng biểu đạt khách quan 33 mục thay vì chỉ dẫn soạn, lập kế hoạch Bảng đọc sổ đăng ký nhỏ của nó, và Executor đọc từ vựng 187 tên hình preset đầy đủ trước khi chọn đường viền cục bộ. Sau khi một tham chiếu được chọn, chỉ tệp chi tiết hoặc nguồn triển khai chính xác của nó mới vào ngữ cảnh vai trò sở hữu. Cấu trúc định tính được mô tả trực tiếp trong §IX và sinh từ các quan hệ đó; nó không có hàng §VII, khóa `page_visualizations` hay SVG danh mục. `page_charts` cũ vẫn đọc được nhưng không do kế hoạch mới ghi; khóa trần Cấu trúc lịch sử chỉ được giữ làm ý định ngữ nghĩa không có tham chiếu SVG. Một hướng tùy chỉnh đã chọn cũng mang `mode_behavior` / `visual_style_behavior` đã xác định của nó. Nó có thể dùng không, một hay nhiều nền danh mục; khi dùng bất kỳ nền nào, lock ghi id chính xác của chúng trong `mode_references` / `visual_style_references` / `image_rendering_references` tùy chọn. Số tham chiếu không có trần cố định. Một id được liệt kê có thể mang nguyên hành vi preset hoàn chỉnh của nó; với nhiều id, mỗi cái đóng góp một việc thực thi riêng. Các id đó giữ nguồn gốc, ràng buộc việc thực hiện theo các nền đã khai báo và định tuyến các lần đọc tệp chi tiết duy nhất được phép. Một tùy chỉnh thật sự mới bỏ trường tham chiếu tương ứng. Lock `template_reuse_scope: mirror|layout` còn mang `page_layouts` (SVG mẫu đầu vào nào mỗi trang kế thừa), định nghĩa `pptx_masters` / `pptx_layouts` duy nhất và gán `page_pptx_layouts`. `template_reuse_scope: style`, thiết kế tự do và dự án chỉ-thương-hiệu dùng `pptx_structure.mode: flat` và bỏ hoàn toàn các mục đó thay vì ghi giá trị rỗng. Mục rỗng ở nơi khác là tín hiệu có ý nghĩa: không có tham chiếu danh mục hay không có ảnh thường là quyết định thiết kế chứ không phải dữ liệu thiếu.

`page-context v2` vẫn là bộ chiếu theo yêu cầu. Mỗi lần gọi phát một bộ neo toàn cục gọn gắn với `lock_source.sha256`, delta §IX/tài nguyên/định tuyến hiện tại, và dấu vân tay đường dẫn/SHA có phạm vi cho tham chiếu lớn; phép chiếu không phải danh sách cho phép màu/phông hay thẩm quyền thay thế. Nó chỉ dùng cho chẩn đoán/đo lường tường minh hoặc một câu hỏi path-SHA trang/mẫu/trực quan hóa chưa giải quyết. Một sửa chữa chính xác có giới hạn trong ngữ cảnh hợp lệ chưa nén có thể dùng đọc lại mảnh có đích cộng kiểm chứng; thay đổi ở ngữ cảnh mới, đã nén, ngoài, không rõ, cấu trúc hay không khớp đòi một lần đọc Design Spec và lock hoàn chỉnh. Trang phẳng không có tham chiếu nguyên mẫu; trang có cấu trúc dùng SVG hoàn chỉnh có thẩm quyền. Manifest và tệp phụ slot chữ vẫn là chẩn đoán công cụ suy ra và không bao giờ được đưa vào việc soạn trang.

`--record-usage` ghi một ảnh chụp đầu ra gọn suy ra, băm đầu vào, cho một trang được gọi dưới `analysis/page-context/`. Đếm token dùng lazy `o200k_base`; thiếu cài `tiktoken` ghi `tokens: null` mà không chặn thực thi. `page-context-report` loại các ảnh chụp cũ, báo cáo ảnh chụp hiện có và liệt kê dấu vân tay tham chiếu duy nhất; đo lường có thể không đầy đủ. Tải tham chiếu nạp một lần và ngữ cảnh phiên khác cố ý không được đo.

`update_spec.py` lan truyền một thay đổi neo toàn bộ slide có chủ ý theo hai bước phối hợp: lập kế hoạch và thay thế nghĩa đen giá trị qua mọi `svg_output/*.svg`, rồi chỉ ghi `spec_lock.md` có thẩm quyền sau khi các cập nhật SVG đó thành công. Phạm vi của công cụ cố ý hẹp — chỉ `colors.*` (giá trị HEX, thay thế không phân biệt hoa thường) và `typography.font_family` phổ quát (phạm vi theo thuộc tính). Thay phông phổ quát cũng đặt mọi hàng lock `typography.*_family` hiện có cùng giá trị trong một lần ghi tệp lock, để lock tiêu đề/nội dung/vai trò không giữ giá trị mà lệnh đã bỏ khỏi mọi SVG. Các trường khác (cỡ chữ, đổi phông theo vai trò, biểu tượng, ảnh, khung) cố ý **không được hỗ trợ** vì việc thay thế chúng cần nhận biết theo thuộc tính hoặc ngữ nghĩa mà rủi ro/lợi ích không biện minh cho lan truyền hàng loạt. Cập nhật lock ngược này cũng hợp lệ khi việc dùng lặp lại theo ngữ cảnh được cố ý nâng thành vai trò ngữ nghĩa có tên; không được dùng nó chỉ để làm rỗng một so sánh thông tin của bộ kiểm tra. Với trường không được hỗ trợ, hãy sửa sản phẩm sở hữu và soạn lại các trang bị ảnh hưởng.

Công cụ từ chối sao lưu: nó dựa vào git để hoàn tác. Thêm cơ chế sao lưu chỉ lặp lại việc của git và tạo ảnh chụp cũ.

---

## Materials → Plan → Realization: hợp đồng nhà bếp

Phép ví von nấu ăn là mô hình sở hữu chuẩn cho quy trình Generate mặc định, không chỉ là văn xuôi giải thích. `quick-generate` bỏ lớp Strategist và xác nhận riêng; nó không bỏ phần chuẩn bị.

| Nhà hàng | HugoPPTPilot | Thẩm quyền |
|---|---|---|
| Khách hàng và nguyên liệu ban đầu | Xác nhận của người dùng và nguồn/tài nguyên được cung cấp | Xác định dữ kiện, ý định, loại trừ, quyền lấy tài nguyên và độ cụ thể của kết quả được yêu cầu |
| Điều phối viên phục vụ | Quy trình Generate | Sắp trình tự các giai đoạn, cổng, chuyển vai trò và bàn giao đã khai báo mà không tiếp quản quyết định của vai trò nào hay kiểm tra của công cụ xác định |
| Người lập thực đơn và trưởng chuẩn bị | Strategist, `design_spec.md`, `spec_lock.md` và các giai đoạn lấy tài nguyên do Strategist sở hữu | Đánh giá mức đủ; lấp khoảng trống dữ kiện được phép; chọn nội dung, tài nguyên, danh sách trang, khóa tham chiếu biểu đồ / layout mẫu, phông, neo bảng màu, hệ thống biểu tượng và kho tuyển chọn, và ranh giới cắt; ghi khuyến nghị khả năng/biểu đạt tùy chọn; chuẩn bị sẵn kiểm kê cục bộ dự án hoàn chỉnh trước khi thực thi |
| Đầu bếp | Executor | Chỉ dùng tài nguyên cục bộ dự án đã chuẩn bị và hiện thực kế hoạch qua hình học, bố cục, thứ bậc, khoảng cách và xử lý mà không đổi "món" đã chọn hay lấy/thay nguyên liệu; chọn biểu tượng đã chuẩn bị phù hợp theo trang và có thể điều chỉnh các trường được gắn nhãn rõ là gợi ý hoặc Tham chiếu |
| Người kiểm tra chất lượng | `svg_quality_checker.py` | Đọc trạng thái soạn và báo cáo phát hiện hợp đồng; nó không sửa trang, sở hữu danh sách trang hay đóng gói bộ slide |
| Người đóng gói | `svg_to_pptx.py` | Sau khi báo cáo cuối khớp đạt, biên dịch SVG đã soạn, kiểm chứng gói và công bố biên nhận; nó không sửa SVG hay chạy lại bộ kiểm tra |
| Người ghi chép lần chạy | `workflow_transcript.py`, `workflow_log.py` và `validation/workflow.log` | Ghi phong bì lệnh Python, kết quả có gắn thẻ vật chất, mẫu trạng thái có giới hạn và số bị bỏ, rồi nhận các sự kiện quan trọng không phải Python được chọn tường minh; nó không quyết định quy trình có được tiến lên không |

**Tạo nhanh gộp việc lập kế hoạch vào agent hiện tại.** Chuyển đổi nguồn, nghiên cứu khoảng trống dữ kiện và chuẩn bị tài nguyên vẫn chạy khi cần. Agent tự động chọn nội dung, danh sách trang, chế độ, phong cách hình ảnh và nhu cầu tài nguyên trong ngữ cảnh hoạt động; quét ảnh, biểu tượng, Cấu trúc định tính, hình khối native, biểu đồ/bảng, công thức, và kiểu chữ/hình học đơn giản như các thẻ mang khả dụng; chuẩn bị các ảnh và biểu tượng được cung cấp/trích xuất/AI/web/cắt lát đã chọn cùng manifest vận hành hay bản ghi nguồn gốc cần thiết; rồi soạn tay SVG cộng mọi dấu hiệu công thức native. Nó không gọi Strategist, Confirm UI, `design_spec.md`, `spec_lock.md` hay sản phẩm lập kế hoạch thay thế. Các quyết định này không khôi phục được sau khi mất ngữ cảnh. Một agent vì vậy có thể thực hiện nhiều giai đoạn sáng tạo liên tiếp, nhưng ranh giới sở hữu của chúng không gộp lại; bộ kiểm tra, bộ xuất và bộ ghi bản ghi vẫn là các công cụ xác định riêng biệt.

**Chuẩn bị mặc định có hai đồng hồ.** Topic Research cung cấp dữ kiện và xác định các trang web được chọn trước xác nhận cuối: nó bắt đầu ngay với đầu vào chỉ-chủ-đề, hoặc sau khi tài liệu được cung cấp được chuyển/đọc khi còn khoảng trống dữ kiện quan trọng cho lập kế hoạch. Nó chỉ bổ sung các khoảng trống đó. Sau khi khởi tạo dự án, `project_manager.py import-sources` nhập cặp nghiên cứu/nguồn gốc như tệp thông thường và không bao giờ mở rộng các giá trị `source_url` của JSON dữ kiện v1. Khi trình soạn thảo AI hiện tại cung cấp một worker biệt lập có quyền web/fetch và ghi vào đầu ra khai báo, agent chính định nghĩa các khoảng trống và worker ghi các sản phẩm nghiên cứu/nguồn gốc hiện có, chỉ trả biên nhận; nếu không nghiên cứu chạy trong ngữ cảnh chính. Việc lấy ảnh AI / web / cắt lát độc lập chỉ chạy sau xác nhận cuối và `design_spec.md §VIII` / `spec_lock.md` hoàn chỉnh, rồi đạt trạng thái cuối trước khi Executor bắt đầu. Nếu tìm ảnh thông thường cạn, một URL được chọn liên quan có thể được tải thành gói nguồn Markdown + ảnh đồng hành; chủ sở hữu ảnh rà soát gói đó và chỉ đưa các tệp được chấp nhận vào kho ảnh runtime. Strategist cũng xác định, đồng bộ và kiểm chứng kho biểu tượng dự án tuyển chọn trong khi soạn kế hoạch cuối. Image_Generator, Image_Searcher và công cụ đồng bộ biểu tượng là cơ chế chuẩn bị dưới quyền sở hữu của Strategist, không phải chủ sở hữu quyết định độc lập. Tạo nhanh dùng các cơ chế chuẩn bị đó khi cần theo quyết định trong ngữ cảnh của agent hiện tại, không chèn cổng xác nhận.

**Tài nguyên cục bộ dự án đã chuẩn bị là ranh giới.** Ở luồng mặc định, ảnh và tài nguyên khai báo khác chỉ khả dụng khi Strategist đã chọn chúng, ghi vào sản phẩm lập kế hoạch và làm cho đường dẫn dự án của chúng phân giải được hoặc `Needs-Manual` tường minh. Biểu tượng được chuẩn bị khi tệp SVG của chúng tồn tại dưới `<project>/icons/`; `spec_lock.icons.inventory` lập chỉ mục kho gói đồng bộ đã tuyển chọn của Strategist nhưng không gán cách dùng theo trang cũng không là danh sách cho phép thực thi toàn diện. Executor chọn giữa các biểu tượng đã chuẩn bị theo trang. Ở tạo nhanh, quyết định tài nguyên trong ngữ cảnh hoạt động và các tệp/manifest cục bộ dự án của chúng thay cho phép chiếu lập kế hoạch đó; không ghi danh sách chung hay gán theo trang. Agent hiện tại có thể lấy và chuẩn bị các tài nguyên đó trước khi soạn SVG. Tệp ở nơi khác trên đĩa không được ủy quyền. Tài liệu thiếu quay về bước chuẩn bị sở hữu; soạn SVG không bao giờ lặng lẽ thay thế.

**Độ cụ thể kiểm soát tự do.** "Làm đậu phụ Ma Bà" cố định danh tính kết quả: kỹ thuật và cách bày có thể đổi, nhưng cà chua trứng hay canh đậu phụ là thay thế. "Làm một món đậu phụ" để lại một lựa chọn trong cùng nhóm. Ở luồng mặc định, Strategist có thể giải quyết lựa chọn đó; nếu Design Spec cố ý để một chiều rộng, Executor có thể hiện thực trong phạm vi đó. Một khi Design Spec nêu lựa chọn ràng buộc, thực thi không thể mở lại. Ở tạo nhanh, agent hiện tại giải quyết lựa chọn tương đương trong ngữ cảnh hoạt động và giữ nó ổn định trong khi soạn. Các trường được gắn nhãn rõ là gợi ý hoặc Tham chiếu — gồm cả mẫu ảnh cục bộ theo trang ưu tiên — vẫn là hướng dẫn biểu đạt có thể điều chỉnh mà không đổi nội dung, tài nguyên, bản sắc hay ràng buộc tường minh.

**Món trang trí vẫn cục bộ.** Điểm nhấn phông hay màu thưa cục bộ theo trang có thể thêm thứ bậc, khác biệt hay bầu không khí mà không thành hệ thống thị giác thứ hai. Ở luồng mặc định, phông cấu trúc/lặp lại, vai trò bảng màu, tài nguyên hay khuôn mẫu bản sắc lặp lại liên trang vẫn là quyết định của Strategist và đòi cập nhật Design Spec/lock thượng nguồn trước khi dùng lại; ở tạo nhanh, agent hiện tại thiết lập các neo đó trong ngữ cảnh hoạt động và bảo toàn chúng qua các trang. Mẫu ảnh §VIII cục bộ theo trang ở luồng mặc định vẫn là tham chiếu bố cục ưu tiên.

**Bất biến tái cấu trúc prompt.** Ở luồng mặc định, nén phải bảo toàn nguyên liệu ban đầu, xác nhận của người dùng, chuẩn bị do Strategist sở hữu, quyền sở hữu lập kế hoạch và tự do thực thi như các tầng riêng biệt. Chuyển việc lấy tài nguyên sang Executor, biến sự cho phép thành hạn ngạch, biến hiện thực linh hoạt thành chọn lại lặng lẽ tài nguyên/bản sắc, hoặc biến kế hoạch ràng buộc chính xác thành mục tiêu xấp xỉ đều là hồi quy ngữ nghĩa. Hồ sơ quick tường minh hợp nhất các tầng đầu dưới agent hiện tại; nó không xóa khả năng nguồn, tài nguyên, thẩm mỹ, trực quan hóa dữ liệu, Cấu trúc định tính hay hình khối native. Thẩm quyền runtime mặc định nằm trong [`strategist.md`](../../skills/ppt-master/references/strategist.md) và [`executor-base.md`](../../skills/ppt-master/references/executor-base.md); thẩm quyền runtime Quick bắt đầu ở [`quick-generate.md`](../../skills/ppt-master/workflows/profiles/quick-generate.md) và nạp trực tiếp các tham chiếu thực thi chung và có điều kiện áp dụng được mà không kế thừa điều kiện tiên quyết kế hoạch lưu bền của Default. Quản trị viết prompt nằm trong [`prompt-style.md`](../rules/prompt-style.md).

---

## Lấy ảnh & nhúng

Nhiều quyết định kiến trúc định hình giai đoạn này:

**Khóa cấu hình riêng của nhà cung cấp, không phải `IMAGE_API_KEY` chung.** Mỗi backend dùng `OPENAI_API_KEY` / `MINIMAX_API_KEY` / v.v. của riêng nó và backend đang dùng được chọn bằng `IMAGE_BACKEND=<name>` tường minh. Một trường `IMAGE_API_KEY` thống nhất thoạt nhìn gọn hơn nhưng gây nhầm lẫn âm thầm khi người dùng cấu hình nhiều nhà cung cấp cùng lúc và không chắc cái nào đang hoạt động — kiểu lỗi chỉ lộ ra là "tạo ảnh cho kết quả lạ" mà không có điểm hỏng rõ ràng. Ép khóa theo từng nhà cung cấp làm "tôi đang dùng backend nào" thành một dữ kiện đọc được từ cấu hình, không phải suy luận.

**Bộ lọc giấy phép mặc định thoáng, với chế độ nghiêm ngặt cho bố cục không tương thích ghi công.** Tìm ảnh web mặc định cho phép ảnh CC BY / CC BY-SA kèm ghi công nội dòng — phần lớn slide có chỗ thị giác cho một phần tử ghi công. `--strict-no-attribution` là lối thoát cho ảnh anh hùng toàn khung và bố cục chặt nơi không có chỗ đặt dòng ghi công mà không phá thiết kế. Giấy phép phi thương mại (CC BY-NC*) và cấm dẫn xuất (CC BY-ND*) bị tự động từ chối vì đầu ra HugoPPTPilot điển hình được chia sẻ trong ngữ cảnh thương mại hoặc có chỉnh sửa; mặc định thoáng với mức sàn đó là kiểu lỗi người dùng thực sự muốn.

**Lấy tài nguyên theo manifest trước.** Tạo AI trong quy trình luôn ghi `images/image_prompts.json` và dựng tệp phụ `image_prompts.md`, kể cả với một ảnh. Dạng định vị `image_gen.py "prompt"` cố ý giới hạn cho gỡ lỗi một lần vì nó không để lại vết kiểm toán manifest/tệp phụ. Lấy từ web phản chiếu điều này bằng `images/image_queries.json` cho lô nhiều hàng và `image_sources.json` cho theo dõi ghi công/nguồn.

**Design Spec sở hữu đường thực thi ảnh.** Xác nhận cuối từ UI hoặc chat trước hết được lưu thành `AI Image Acquisition Path` trong `design_spec.md §I`; Image_Generator chọn API, host-native hoặc thủ công từ giá trị đó và không được mở lại quyết định trong lúc thực thi. `image_gen.py --manifest` chỉ thuộc API Path A. Với manifest dưới `<project>/images/` khi `<project>/design_spec.md` tồn tại, guard của CLI đọc trực tiếp giá trị đã lưu đó: `api` / `auto` cho phép Path A, trong khi `host-native` / `manual` và giá trị thiếu hay không hợp lệ chặn nó. Guard không mở lại hay tiêu thụ kênh xác nhận nào.

**Một tờ nhất quán cho mỗi họ thị giác tương thích.** Tờ AI chuẩn bị các phần tử minh họa hoặc chữ trang trí trong suốt chứ không phải bố cục trang hoàn chỉnh. Một họ có thể gồm khung tiêu đề/góc lặp lại, điểm neo chủ đạo, hình phụ và điểm nhấn với hình bóng và trọng lượng thị giác khác nhau; các phần tử tương thích dùng chung một tờ và chỉ tách khi hình học ô, chi tiết, chất lượng hay nhu cầu ngữ nghĩa xung đột. SVG có thể kết hợp các lát với nền, hình khối native, chữ chỉnh sửa được, ảnh chụp, lát khác và chữ trang trí trên bất kỳ trang phù hợp nào, và một lát có thể lặp lại qua nhiều trang. Chữ trang trí vẫn được nhóm theo danh tính thị giác, với biểu đạt bản địa glyph có kiểm soát theo mặc định và biểu đạt mạnh hay chữ-cộng-minh-họa chỉ sau yêu cầu tường minh hoặc hướng đã xác nhận. Mỗi tờ dùng khóa sắc phẳng đỏ/lục/lam thuần tường minh mà kênh hoạt động không chi phối các phần tử của nó; cùng HEX được truyền cho `slice_images.py --bg`, mà đường chroma của nó loại bỏ tràn màu khóa và khôi phục alpha hiệu ứng một phần. `--strict-alpha` sau đó từ chối mọi ranh giới ô không trong suốt hoặc hiệu ứng vượt biên trước khi ghi tệp suy ra. Các lát trong suốt thành công vào `images/`, rồi `analyze_images.py` làm mới kích thước của chúng.

**Trạng thái cuối trước Executor.** Các hàng cần lấy tài nguyên phải kết thúc ở `Generated`, `Sourced` hoặc `Needs-Manual`; `Pending` và `Failed` không được rò sang Executor. Hàng `Needs-Manual` có thể tiếp tục qua việc tạo SVG chỉ như một placeholder/phụ thuộc đã biết, và Bước 7 kiểm tra lại tệp bắt buộc trước khi xuất cuối.

**Tham chiếu ngoài khi phát triển, hai chiến lược nhúng phân kỳ cho đầu ra khâu sau.** Khi chỉnh sửa trong `svg_output/`, ảnh là tham chiếu tệp ngoài để lặp nhanh và thay thế điểm đơn. `svg_final/` sau đó nhúng Base64 bitmap thông thường và tài nguyên SVG được hỗ trợ, trong khi giữ tham chiếu ngoài EMF/WMF cho truyền thẳng PPTX native; một lỗi nhúng riêng lẻ tăng số lỗi xử lý, nhưng không viết lại nguồn đã soạn hay làm hỏng cả bộ hoàn tất. PPTX native thay vào đó sao chép bitmap hoặc vector Office vào thư mục phương tiện của gói và dùng `<a:srcRect>` cho cắt bitmap được hỗ trợ. Việc tách tồn tại vì bản xem trước và bộ biên dịch phục vụ trách nhiệm khác nhau: một là tham chiếu thị giác suy ra, cái kia tạo DrawingML chỉnh sửa được qua bộ chuyển đổi dự án. `svg_final/` không phải định dạng trao đổi không phụ thuộc ngoài, di động vô điều kiện, cũng không phải nguồn tương thích cho Convert to Shape của PowerPoint.

**Một khóa kỹ thuật dựng, neo bộ slide kế thừa và bố cục theo từng ảnh.** Trước khi quyết định có khuyên dùng ảnh AI không, Giai đoạn 2 soạn một ứng viên kỹ thuật dựng toàn bộ slide tùy chỉnh hoàn chỉnh bên trong mỗi hướng trong ba hướng thiết kế phối hợp của nó. Nó dùng chỉ mục kỹ thuật dựng để đóng băng mọi nền trước khi chỉ đọc các tệp chi tiết đã chọn đó; một kỹ thuật dựng đã chọn có thể cung cấp trọn xử lý không đổi mà không bịa delta. Quyết định nguồn tách riêng: UI ẩn điều khiển kỹ thuật dựng cho đến khi chọn AI, rồi mới hiện ba ứng viên tùy chỉnh chỉnh sửa được theo sau là danh mục kỹ thuật dựng cố định mà không có lượt đề xuất khác. Chỉ việc dùng AI đã xác nhận mới nâng giá trị hiện tại đã chọn thành hợp đồng thực thi. Màu ảnh không phải quyết định thứ hai của người dùng: Image_Generator bắt đầu từ các vai trò HEX cốt lõi trong `spec_lock.md colors`, chỉ đọc mục kỹ thuật dựng đã chọn hay nền tùy chỉnh chính xác, rồi diễn giải chúng với Design Spec hoàn chỉnh và `type` của mỗi tài nguyên hoặc bố cục trang anh hùng. Kỹ thuật dựng có thể suy ra sắc độ nhất quán, màu vật liệu, chuyển ánh sáng và sắc khí quyển trong khi giữ ý nghĩa vai trò cốt lõi; nó không được thay bản sắc bộ slide bằng bảng màu chỉ-có-ảnh không liên quan. Một tông suy ra lặp lại có thể được nâng thành vai trò lock có tên.

---

## Bố cục ảnh - chữ: P / M / A / C

Bất cứ khi nào nhánh ảnh hoạt động, từ vựng vị trí gọn của nó trong [`references/image-layout-patterns.md`](../../skills/ppt-master/references/image-layout-patterns.md) được đọc cùng toán bố cục. Công thức native dùng bố cục trang thông thường cộng biên dấu hiệu của chúng, không dùng mẫu tài nguyên ảnh. Các mẫu ảnh hiện tại được tổ chức theo trách nhiệm bố cục:

- **P · Cấu trúc chính** — bộ khung trang đơn-hình, ảnh-là-khung-vẽ và đa-hình.
- **M · Lớp điều chỉnh** — xử lý cắt/lộ, tông/tiêu điểm và khung/vị trí/chiều sâu áp lên bộ khung có sẵn.
- **A · Xử lý phụ thuộc tài nguyên** — các bố cục đòi một tài nguyên hợp thành hoặc diện mạo đã chuẩn bị, cắt rời hoặc dẫn xuất đã đăng ký.
- **C · Liên tục liên trang** — quan hệ trạng thái bền, camera và khung hình khớp giữa các slide.

**Vì sao danh mục gồm một sách chiến thuật kết hợp.** Chỉ khám phá khả năng thì chưa dạy bố cục lặp lại được. Sách chiến thuật biến công việc của trang thành một chuỗi gọn: chọn bộ khung `P`, nêu nhu cầu tích hợp hoặc vai trò phong cách, thêm `M` nhỏ nhất phục vụ nó, chỉ dùng `A` khi tài nguyên đã chuẩn bị của nó tồn tại, chỉ thêm `C` cho quan hệ liên trang có chủ ý, rồi dừng khi một lớp khác không còn xứng đáng. Các tổ hợp năng suất cao của nó là gợi nhớ, không phải công thức mọi bộ slide đều phải phủ.

**Vì sao luôn đọc thư viện không áp đặt hạn ngạch danh mục hay lớp.** Nó mở rộng lựa chọn bố cục thay vì định nghĩa đầu ra hợp lệ. Một trang có thể dùng một hoặc nhiều cấu trúc `P` và bất kỳ mẫu `M`, `A` đã chuẩn bị hay `C` liên trang hữu ích nào, không trích dẫn id nào, hoặc dùng bố cục tự do khi điều đó phục vụ mạch kể và thứ bậc tốt hơn.

**Vì sao danh mục dùng id hai cấp.** Các tay cầm như `#P2-01` và `#M1-01` phơi cả trách nhiệm bố cục lẫn họ cục bộ, nên các tổ hợp vẫn đọc được. Số cuối theo thứ tự duyệt hiện tại thay vì giữ đánh số lịch sử. Đây là từ vựng prompt, không phải mã hiệu ứng runtime: Executor hiện thực hướng dẫn bố cục đi kèm, và bộ xuất không ánh xạ id sang DrawingML cố định.

**Vì sao ý định bố cục chảy qua danh sách tài nguyên của Strategist.** Cột `Image pattern` trong `§VIII Image Resource List` mang một gợi ý tự do không rỗng và có thể tùy chọn trích id phân cấp từ thư viện; một hàng `adaptive` dẫn dắt bằng ảnh cũng nêu công việc trang mà ảnh giải quyết, để bố cục đến Executor kèm lý do nó được chọn. `Crop Policy` ghi riêng `adaptive` hoặc `no-crop`. Điều này giữ một điểm khởi đầu hữu ích qua việc vào lại phiên mà không biến mục danh mục hay id nào thành bắt buộc. Executor có thể đổi kích thước, ngắt dòng lại, định vị lại, cân bằng lại, thay gợi ý, hoặc dùng bố cục khác khi điều đó truyền đạt tốt hơn. Danh tính tài nguyên, nghĩa vụ phải dùng/nội dung, `no-crop` và ràng buộc tường minh của người dùng/mẫu vẫn ràng buộc; chỉ đổi những thứ đó mới đòi cập nhật Design Spec thượng nguồn.

**Vì sao ràng buộc cứng thực sự ở thượng nguồn.** Các ngoại lệ soạn SVG xuyên suốt và tương thích PPTX nằm trong tập thẩm quyền do [`shared-standards.md`](../../skills/ppt-master/references/shared-standards.md) định tuyến. Tệp mẫu bố cục trỏ tới bộ định tuyến đó thay vì nhắc lại hợp đồng, nên mỗi quy tắc vẫn có một mô-đun sở hữu duy nhất và không có bản sao cũ trùng lặp trong danh mục mẫu.

---

## SVG chuẩn của dự án và ranh giới tương thích

SVG và DrawingML không phải mô hình biểu đạt tương đương, nên đường biên dịch chính không coi "trình duyệt dựng được" là "dự án xuất được". Đầu vào chỉ được chấp nhận khi mô-đun áp dụng được do [`references/shared-standards.md`](../../skills/ppt-master/references/shared-standards.md) chọn đăng ký một biểu đạt chuẩn của dự án hoặc một dạng tương thích tường minh với ánh xạ DrawingML xác định. Tập thẩm quyền được tách sở hữu cú pháp, cấu trúc, đơn vị, siêu dữ liệu, bí danh tương thích, độ trung thực và điều kiện từ chối; tài liệu kiến trúc này định nghĩa nguyên tắc phân tầng mà không lặp lại từng quy tắc.

**Vì sao tái sử dụng cục bộ là tái sử dụng lúc biên dịch, không phải đối tượng PowerPoint được giữ lại.** Hợp đồng chuẩn định nghĩa các dạng soạn được chấp nhận, và bộ kiểm chứng dùng chung thực thi chúng. Sau khi kiểm chứng, quy trình đệ quy hiện thực hóa từng cây con được tham chiếu và viết lại ID cục bộ của bản sao trước khi xuất. Nhập PPTX-sang-SVG vì vậy trả primitive đã bung thay vì dựng lại đồ thị tái sử dụng lúc soạn.

Những lý do kiến trúc đáng biết ở đây:

- **Vì sao ánh xạ là đóng thay vì mặc định chấp nhận SVG thông thường.** SVG chuẩn của dự án là ngôn ngữ trung gian của bộ biên dịch, không phải lớp tương thích trình duyệt. Thêm một phần tử, thuộc tính hay giá trị đòi ngữ nghĩa đầu vào tương ứng, ánh xạ đầu ra, kiểm chứng và xác minh hồi quy; khả năng chưa đăng ký không vào đường biên dịch chính.
- **Vì sao đầu vào tương thích không phải sự cho phép soạn.** Một bí danh lịch sử được ghi có thể được chuẩn hóa xác định và nhận cảnh báo không chặn của bộ kiểm tra; prompt, mẫu và ví dụ vẫn chỉ sinh cách viết chuẩn của dự án. Tương thích di trú và đầu vào thủ công không được mở rộng cú pháp sinh ra.
- **Vì sao cảnh báo có thể đi qua.** Cảnh báo giới hạn ở cách viết khuyến nghị, chuẩn hóa xác định, giảm độ trung thực đã biết, hoặc rủi ro chất lượng thị giác khi đầu ra hợp lệ vẫn được đảm bảo. Nó không đổi ngữ nghĩa trang hay đòi Executor soạn lại; mọi điều kiện phải sửa để bàn giao là lỗi.
- **Vì sao thực nghiệm, không suy từ spec.** Ranh giới tương thích lớn lên từ lỗi xuất PPT thật, không từ việc đọc đặc tả OOXML. Một số hiệu ứng biểu diễn được về lý thuyết vẫn không đáng tin qua các phiên bản PowerPoint, nên hợp đồng phản ánh tập con thực sự giao được.
- **XML đúng định dạng vẫn là điều kiện tiên quyết.** SVG sai định dạng thất bại trước khi tương thích DrawingML quan trọng. Hợp đồng chuẩn sở hữu các dạng soạn được chấp nhận để hướng dẫn XML không lệch giữa kiến trúc và tài liệu prompt.
- **Kiểm chứng tương thích chạy trước hậu xử lý.** `svg_quality_checker.py` đánh giá `svg_output/`; hậu xử lý viết lại SVG và có thể che vi phạm cấp nguồn. Lỗi chặn được Executor soạn lại, còn cảnh báo không kích hoạt viết lại. Generate chỉ tiến tới xuất sau khi bộ kiểm tra cuối báo không lỗi. Bộ chuyển đổi không chạy lại toàn bộ bộ kiểm tra đó; nó kiểm chứng độc lập ánh xạ bộ biên dịch, tính toàn vẹn ZIP, số slide và cấu trúc gói, rồi ghi giai đoạn báo cáo thượng nguồn, số lỗi chặn và dấu vân tay nguồn SVG vào postflight.

---

## Cổng chất lượng

**Vì sao cần bộ kiểm tra.** SVG do LLM sinh ra không xác định — vi phạm tương thích len vào qua bộ slide dài và chỉ lộ ra khi `svg_to_pptx` dừng giữa chừng hoặc PowerPoint lặng lẽ bỏ phần tử. Bộ kiểm tra biến "xuất PowerPoint thất bại ở trang 14" thành "trang 14 vi phạm hợp đồng tương thích SVG" — vòng chẩn đoán nhanh hơn một bậc độ lớn, điều làm bộ slide dài lặp lại được về mặt kinh tế.

**Vì sao đặt trước hậu xử lý, không phải sau.** Hậu xử lý viết lại SVG (nhúng biểu tượng, nhúng ảnh), sẽ che vi phạm cấp nguồn. Đọc trực tiếp `svg_output/` bắt đúng đầu ra thật của Executor, trước mọi bước dọn có thể che lỗi.

**Vì sao quy trình có kiểm tra sớm và cuối.** Cổng sớm coi năm trang đầu là mẫu phương pháp: nó tách khả năng cấp phương pháp, cục bộ theo trang và chưa được thử, rà soát toàn bộ tập vấn đề, rồi sửa mọi lỗi chặn và cảnh báo tư vấn được chọn trong một vòng gộp; danh sách sáu trang trở xuống bỏ nó và đi thẳng tới cổng cuối. Sau khi nó đạt, các trang còn lại được tạo liên tục mà không gọi bộ kiểm tra, và chỉ cổng cuối kiểm tra toàn bộ tập đã soạn trước khi phát hành. Cái đầu hiệu chuẩn phương pháp, cái sau xác minh cả bộ slide, nên không cái nào thay thế cái kia.

**Mô hình mức độ nghiêm trọng: lỗi chặn, cảnh báo không chặn, và cố ý không có tự sửa.** Mức độ được xác định bằng việc đầu vào có ánh xạ xác định và hợp lệ không, không chỉ bằng việc nó có dùng cách viết khuyến nghị không:

| Mức độ | Phân loại | Hành vi quy trình |
|---|---|---|
| `error` | Hợp đồng cấu trúc bị vỡ; đầu vào không có ánh xạ hoặc mơ hồ; thiếu siêu dữ liệu bắt buộc; giá trị không hợp lệ; chuyển đổi có thể vi phạm ràng buộc DrawingML/PPTX; hoặc PowerPoint có thể cần sửa tệp | Executor phải soạn lại và kiểm chứng lại; Generate không được vào xuất khi báo cáo cuối còn lỗi chặn. Xuất phát hành chính thức cũng độc lập từ chối báo cáo như vậy trước khi tạo PPTX |
| `warning` | Tồn tại phép chuyển đổi duy nhất, an toàn, hợp lệ, nhưng đầu vào không phải chuẩn của dự án hoặc mang chuẩn hóa, giảm độ trung thực hay rủi ro chất lượng thị giác đã ghi | Ghi chẩn đoán và cho phép phát hành; không đòi xác nhận hay viết lại bắt buộc |

Cổng theo trách nhiệm ba tầng định nghĩa trong triết lý thiết kế. Nó cố ý không có tự sửa: một bản vá cơ học có thể lặng lẽ ghi đè ý định thiết kế hợp lệ và giao một trang tệ hơn.

**Ranh giới triển khai hiện tại.** Xuất phát hành mặc định chính thức và `--quick-generate` mỗi cái tính dấu vân tay nguồn SVG chính xác và từ chối báo cáo cuối thiếu, không đọc được, không hỗ trợ, không phải cuối, chặn, cũ hoặc không xác minh được trước khi tạo PPTX. Một dự án hiện có không có `validation/svg_quality_report.json` thoát khác không với trạng thái cổng `not-provided`; hãy chạy bộ kiểm tra cuối với `svg_output/` hiện tại trước khi xuất phát hành. Một báo cáo khớp vẫn có thể chứa cảnh báo không chặn; việc phát hành tiếp tục và postflight ghi `passed-with-warnings` khi áp dụng. `--source` không phải `output` tường minh vẫn là ghi đè chẩn đoán và bỏ qua cổng phát hành này, nên sự tồn tại của tệp chẩn đoán một mình không phải bằng chứng bàn giao; postflight vẫn ghi mọi liên kết báo cáo xác minh được.

Nếu cùng một cảnh báo lặp lại ở các trang mới tạo, hãy sửa prompt, ví dụ mẫu hay đặc tả để đầu ra mặc định quay về cách viết chuẩn của dự án. Đó là vấn đề chất lượng tạo, không phải lý do biến đầu vào tương thích an toàn thành lỗi. Ngược lại, nếu thực tế cho thấy một cảnh báo có thể tạo tệp không hợp lệ hay nghĩa mơ hồ, hãy cập nhật hợp đồng và bộ kiểm tra cùng nhau để phân loại nó là lỗi.

**Vì sao kiểm chứng tọa độ biểu đồ nằm cùng cổng.** Trang biểu đồ có yêu cầu đúng đắn hình học (chiều cao cột / góc quét tròn / vị trí vạch trục) không thuộc cấu trúc và không bị quy tắc hợp lệ SVG bắt. Nơi tự nhiên để bắt chúng là cùng cổng nơi AI được yêu cầu xem lại đầu ra của mình — gộp ngữ cảnh nhận thức "nhìn những gì bạn đã tạo và sửa" vào một giai đoạn, thay vì tách rà soát cấu trúc và hình học thành các vòng rà soát riêng.

---

## Quy trình hậu xử lý

> Vì sao mỗi sản phẩm và mô-đun tồn tại trong giai đoạn chuyển đổi kỹ thuật, và quy trình nào sẽ hỏng nếu xóa nó. Hãy đọc điều này trước khi cân nhắc bất kỳ đơn giản hóa nào với `svg_final/` / `finalize_svg.py` / `svg_to_pptx.py`.

### Sản phẩm hậu xử lý và quy trình

Các giai đoạn hậu xử lý và xuất giữ các sản phẩm soạn, kiểm chứng, xem trước, bàn giao và lưu trữ riêng biệt. Mỗi cái phục vụ một quy trình mà không gì khác trong quy trình thay thế được. Mọi mục PPTX dưới đây là biến thể của cùng đường `svg_output/` → DrawingML native, không phải bộ chuyển đổi dựa trên ảnh song song.

| Sản phẩm | Quy trình nó phục vụ | Vì sao không gì khác thay thế được |
| --- | --- | --- |
| `svg_output/` | nguồn sự thật, chỉnh sửa tay, `update_spec.py`, `svg_quality_checker.py` | thư mục duy nhất có nội dung được soạn, không phải suy ra |
| `svg_final/` | kiểm tra bằng IDE/trình duyệt và chèn thủ công dưới dạng ảnh SVG | `.pptx` không mở được trong IDE, còn `svg_output/` có thể hiển thị không đầy đủ vì tham chiếu biểu tượng/ảnh là ngoài. Tài nguyên thông thường được nhúng khi có thể và EMF/WMF ở ngoài; Convert to Shape của PowerPoint không được hỗ trợ |
| `exports/<name>_<ts>.pptx` (native) | sản phẩm bàn giao chính mặc định — chỉnh sửa được trong PowerPoint dưới dạng hình khối DrawingML | mô hình đối tượng DrawingML mặc định; biến thể Chart/Table native và thuyết minh vẫn chỉnh sửa được nhưng có hành vi đối tượng hoặc phát khác |
| `validation/svg_quality_report.json` | cổng SVG cuối đọc được bằng máy | tách lỗi chặn, khuyến nghị mới đưa vào, phát hiện nguyên mẫu kế thừa và mất mát nhập nguồn, và lấy dấu vân tay các byte SVG đã kiểm tra |
| `validation/<output_stem>.report.json` | postflight PPTX đã phát hành và kiểm toán tài nguyên | ghi số phần ZIP/gói thực tế; chạy lại kiểm tra ZIP và số Slide; gắn nhãn kiểm chứng quan hệ, gói có cấu trúc, chuyển trang và hiệu ứng là thực thi lúc dựng; chỉ chấp nhận liên kết báo cáo chất lượng khi dấu vân tay SHA-256 của nó khớp đầu vào xuất; và nêu token chưa phân giải, ảnh ngoài và ngăn xếp phông chỉ-chung |
| `exports/<name>_<ts>_native_charts_tables.pptx` (bật qua `--native-charts-and-tables`) | khi dấu hiệu `data-pptx-replace-with` nên thay biểu đồ/bảng dạng hình khối sinh từ SVG bằng đối tượng Chart/Table native của PowerPoint | đối tượng có dữ liệu với điều khiển riêng của biểu đồ/bảng; hình khối DrawingML mặc định vẫn chỉnh sửa được độc lập |
| `exports/<name>_<ts>_narrated.pptx` (qua `--recorded-narration` hoặc `--narration-audio-dir`) | nhúng âm thanh thuyết minh khớp; chế độ ghi sẵn đầy đủ hỗ trợ trực tiếp tự phát và xuất video PowerPoint | `--recorded-narration` đòi âm thanh khớp cho mọi slide và ghi tự chuyển slide theo thời lượng cộng khoảng đệm; `--narration-audio-dir` cấp thấp cho phép phủ một phần hoặc không và chỉ ghi tự chuyển slide với `--use-narration-timings` |
| `exports/<narrated_stem>.mp4` (tùy chọn qua `powerpoint_video.py`) | video hiệu ứng thị giác native thô và thuyết minh trên PowerPoint Windows 2016+ | giao cho bộ mã hóa native của PowerPoint và chờ hoàn tất; nó là bản cuối khi không có cue âm thanh hiệu ứng native, nhưng bộ mã hóa không đảm bảo đưa các cue đó vào rãnh âm thanh |
| `exports/<raw_stem>_sfx.wav`, `<raw_stem>_mixed.mp4`, `<raw_stem>_sound_mix.json` (kích hoạt qua `video_sound_mix.py`) | bàn giao MP4 trực tiếp có âm thanh khi chuyển động cuối đã chốt chứa cue chuyển trang/đối tượng | suy thời gian từ trace thuyết minh cuối cộng hiệu chuẩn video thô ở cấp trang, trích byte quan hệ PPTX chính xác, sao chép luồng video, và kiểm chứng âm thanh phối thực tế thay vì coi cấu hình PPTX là chấp nhận MP4 |
| `exports/<capture_name>.mp4` (bản quay trình chiếu thời gian thực do người vận hành cung cấp tường minh) | hình ảnh PowerPoint thời gian thực cộng thuyết minh và cue native thực sự được phát qua một đường âm thanh ứng dụng/hệ thống | bỏ qua `CreateVideo` nhưng không bỏ PowerPoint; đòi con người chấp nhận hình ảnh/âm thanh/mọi cue, không có biên nhận phối âm, và không bao giờ được vào `video_sound_mix.py` |
| `backup/<ts>/svg_output/` (chỉ đường xuất mặc định; sao chép cố gắng hết sức sau khi tạo thư mục) | xuất lại từ nguồn SVG đóng băng mà không chạy lại LLM | sau khi chuyển đổi thành công, bộ xuất tạo thư mục sao lưu và cố sao chép; `-o` tường minh không tạo gì, sao chép thất bại không chặn xuất, in cảnh báo ngoài chế độ im lặng, và để `backup_path` của postflight trống, trong khi tạo thư mục thất bại vẫn là lỗi nặng |

Tệp JSON kiểm chứng và `validation/workflow.log` là sản phẩm kiểm toán lạnh, không phải đầu vào mô hình thường nhật. Nhật ký quy trình chỉ được mở khi người dùng yêu cầu tường minh rà soát lần chạy. Nó dựng lại các lệnh quan sát được và một lựa chọn kết quả vật chất có giới hạn — không phải toàn bộ luồng console — cộng các chi tiết không phải Python được chọn như bàn giao giai đoạn quan trọng hay lý do làm lại, ngoại lệ đã được người dùng phê duyệt, hoặc lựa chọn khôi phục thủ công. Chân mỗi lệnh báo số dòng đầu ra được giữ hoặc bỏ. Các mục thủ công này là tùy chọn và không bao giờ lặp lại sản phẩm, tiến độ thường lệ hay lập luận riêng tư; sản phẩm hiện tại vẫn xác lập giai đoạn và mức sẵn sàng. Bộ xuất đọc báo cáo chất lượng SVG bằng chương trình và, ở luồng mặc định không im lặng, in một biên nhận `[POSTFLIGHT]` gọn với trạng thái, kết quả cổng chất lượng, số Slide, số cảnh báo theo nhóm và đường dẫn sản phẩm. Agent thành công dùng biên nhận đó thay vì nạp cả hai JSON hoàn chỉnh; chỉ điều tra lỗi hoặc kiểm toán tường minh mới trích các trường báo cáo có đích.

### Bộ tiền xử lý SVG có HAI dạng dùng

Điều này dễ bỏ sót khi đọc mã. Các mô-đun dọn dẹp dùng chung, bộ mở rộng tham chiếu cục bộ và bộ hiện thực hóa hình học nội dòng được dùng cả để ghi `svg_final/` và trong bộ nhớ khi chuyển đổi native. Bộ kiểm tra, trình chỉnh sửa và bộ phân tích cấu trúc cũng dùng chung các phần diễn giải hình học, nhưng chúng không phải bên tiêu thụ sản phẩm trong mục này.

**Bên tiêu thụ trên đĩa** — ở luồng Generate mặc định, `finalize_svg.py` ghi `svg_output/` → `svg_final/` một lần mỗi lần chạy, mở rộng cả placeholder biểu tượng dự án lẫn tham chiếu `<use>` cục bộ đủ điều kiện. Đầu ra bắt buộc của luồng mặc định này nuôi xem trước IDE/trình duyệt và có thể được chèn thủ công dưới dạng ảnh SVG; nó không được chuyển thành sản phẩm PPTX riêng. Quick-generate bỏ bên tiêu thụ trên đĩa.

**Bên tiêu thụ trong bộ nhớ** — tạo pptx native đọc `svg_output/` trực tiếp (không qua đĩa). Nó hiện thực hóa hình học nội dòng của SVG soạn, mở rộng placeholder biểu tượng dự án, hiện thực hóa hình học do các biểu tượng đó chèn vào, mở rộng tham chiếu `<use>` cục bộ đủ điều kiện, và cuối cùng xử lý các run chữ định vị:

| Điểm gọi trong bộ nhớ | Bộ tiền xử lý | Vì sao pptx native cần nó |
|---|---|---|
| `svg_to_pptx/drawingml/converter.py` | `svg_to_pptx.geometry_properties` | hình học kiểu nội dòng phải thành thuộc tính XML trước khi dịch và phải chạy lại sau khi mở rộng biểu tượng |
| `svg_to_pptx/use_expander.py` | `svg_finalize.embed_icons` | DrawingML không nhận `<use data-icon="...">`; không mở rộng thì mọi biểu tượng lặng lẽ biến mất |
| `svg_to_pptx/use_expander.py` | mở rộng tham chiếu cục bộ tĩnh | DrawingML không bảo toàn đồ thị thể hiện `<use>` của SVG; cây con đủ điều kiện phải được hiện thực hóa với ID cục bộ thể hiện |
| `svg_to_pptx/tspan_flattener.py` | `svg_finalize.flatten_tspan` | run chữ DrawingML không thể đổi vị trí giữa đoạn; một khối `<tspan>` xếp chồng theo dy sẽ rơi về một đường cơ sở, và một tspan neo theo x sẽ hiển thị sai cột |

### Bảng bên tiêu thụ theo mô-đun

| Mô-đun | Bên tiêu thụ trên đĩa | Bên tiêu thụ trong bộ nhớ | Tác động khi xóa |
|---|---|---|---|
| `geometry_properties.py` | `finalize_svg.py` sau khi sao chép và lần nữa sau khi mở rộng biểu tượng | `drawingml/converter.py`; bộ kiểm tra, trình chỉnh sửa và bộ phân tích cấu trúc mẫu dùng chung cách diễn giải đó | hình học kiểu nội dòng không còn ánh xạ nhất quán vào hình học XML, nên xem trước, kiểm chứng và chuyển đổi native có thể phân kỳ |
| `embed_icons.py` | bước `embed-icons` của `finalize_svg` (theo sau là mở rộng use cục bộ) | `svg_to_pptx/use_expander.py` | pptx native mất mọi biểu tượng, và `svg_final/` mất sự khép kín thị giác cho biểu tượng được hỗ trợ |
| `svg_to_pptx/use_expander.py` (tham chiếu cục bộ) | bước `embed-icons` của `finalize_svg` | tiền kiểm bộ chuyển đổi native | finalize/xuất native không còn hiện thực hóa được tái sử dụng cục bộ đủ điều kiện |
| `flatten_tspan.py` | bước `flatten-text` của `finalize_svg` | `svg_to_pptx/tspan_flattener.py` | **chữ nhiều dòng xếp chồng theo `dy` của pptx native gộp thành một dòng** |
| `align_embed_images.py` | bước `align-images` của `finalize_svg` | — | `svg_final/` mất việc nhúng ảnh thông thường, nên xem trước IDE/trình duyệt và ảnh SVG chèn thủ công mất các ảnh đó |
| `crop_images.py` / `embed_images.py` / `fix_image_aspect.py` | được `align_embed_images.py` import | — | `align_embed_images` báo `ImportError`, cả chuỗi hỏng |
| `svg_rect_to_path.py` | — (tiện ích độc lập cũ; không có bên tiêu thụ trong quy trình được hỗ trợ) | — | không sản phẩm xem trước hay PPTX native được hỗ trợ nào phụ thuộc nó; lệnh Convert to Shape thủ công của PowerPoint nằm ngoài hợp đồng dự án |

---

## Chỉnh sửa PPTX native

Không phải mọi yêu cầu liên quan PPTX đều nên tạo lại từng slide. Edit Native PPTX là đường bảo toàn hiện tại: nó nhập bộ slide nguồn bằng `pptx_to_svg.py --roundtrip`, tham chiếu các trang không đổi đến từng byte, chỉ sửa các trang SVG gọn đã lên kế hoạch, và xuất qua `svg_to_pptx.py --roundtrip`. `page_plan.json` có thể chọn, sắp xếp lại, lặp hoặc bỏ trang; ghi chú, thuyết minh, thời gian và chuyển trang vẫn là lớp phủ trên slide được bảo toàn.

---

## Nội bộ chuyển đổi PPTX native

`svg_to_pptx.py` triển khai tầng phòng thủ cuối được định nghĩa trong triết lý thiết kế; mục này chỉ giải thích cấu trúc nội bộ của đường biên dịch có ràng buộc đó.

**Vì sao phân phối theo từng phần tử, không dịch cả tệp.** Mô hình phân cấp của SVG ánh xạ gọn lên các kiểu nhóm / hình / ảnh của DrawingML — không cần bộ tối ưu tổng thể lập kế hoạch lại slide. Mỗi loại hình có bộ dịch hẹp riêng, giữ mỗi bộ dịch đủ đơn giản để gỡ lỗi và kiểm thử đơn vị riêng biệt. Chất lượng đầu ra của một slide là tổng các chuyển đổi cục bộ độc lập; đặc tính đó mong manh với dịch cả tệp nhưng vững với phân phối theo phần tử.

**Vì sao siêu dữ liệu hình khối nhập và soạn tách biệt.** Một SVG nhập không mất mát có thể cần siêu dữ liệu hình khối native, thẻ mang ẩn và dấu vân tay xem trước để mô tả hình khối PowerPoint nâng cao. Biểu diễn đó vẫn bất biến làm bằng chứng nguồn/gói và hậu thuẫn cho tải không-nhìn-thấy được hỗ trợ. `svg_authoring_view.py` tạo SVG gọn chỉnh sửa được mới với ref nguồn cục bộ theo tài liệu cộng một `authoring_manifest.json` chứa đường dẫn và hash ban đầu. `standard` / `fidelity` soạn SVG chuẩn của dự án. Mirror cũng rà soát/soạn SVG gọn đã phân tích, bảo toàn cấu trúc, ý nghĩa và cách trình bày tương tự mà không đòi đồng cấu mã. Bộ hiện thực hóa của nó kiểm chứng/ghép cây nhìn thấy hiện hành và không bao giờ khôi phục các cây con không mất mát thông thường; ref chỉ-IR không vào mẫu cuối.

**Vì sao round-trip PPTX dùng workspace ngữ nghĩa thay vì cây có hình dạng ZIP.** Nguồn trang chỉnh sửa được là `authoring-svg-flat/`; phương tiện ảnh PowerPoint, vector tái sử dụng nhập, cue, âm thanh, video, ghi chú và tải đục nằm dưới `images/`, `icons/imported/`, `sounds/`, `audio/`, `video/`, `notes/` và `native-payloads/`. Gói hậu thuẫn chính xác ở tại `sources/source.pptx`, hợp đồng cấu trúc và sở hữu ở dưới `analysis/`, chẩn đoán ở dưới `validation/`, và bộ slide đã phát hành ở dưới `exports/`. Điều này giữ đường dẫn soạn khớp với dự án thông thường trong khi `analysis/roundtrip_manifest.json` ánh xạ tệp ngữ nghĩa trở lại quyền sở hữu gói. Nhập và xuất dùng một hợp đồng này: `source_template.pptx`, `native_structure.json`, `conversion-report.json` và `assets/` ở gốc là không hợp lệ chứ không phải đầu vào tương thích.

**Vì sao SVG gọn bung thành PPTX dài dòng.** Cả tạo trực tiếp lẫn nhập PPTX đều công bố nguồn SVG chuẩn ngay từ đầu: phần tử SVG chuẩn, nhóm mô tả, siêu dữ liệu ngữ nghĩa đọc được, mặc định kiểu chữ gốc và mặc định sơn cục bộ nhóm. Nguồn không bao giờ dùng lớp CSS, bí danh riêng, tải mã hóa hay rút gọn số gây mất mát. Bộ kiểm tra chất lượng xác minh dạng này mà không viết lại nó. Khi xuất, bộ biên dịch xác định giá trị kế thừa và bung bảng ngữ nghĩa, hình khối và đối tượng được hỗ trợ khác trong bộ nhớ thành DrawingML lặp lại mà PowerPoint cần; sự dài dòng đó chỉ giới hạn trong sản phẩm đã biên dịch được nén ZIP.

Bảng native nhập được hỗ trợ vẫn là một dấu hiệu ngữ nghĩa thay vì hàng nghìn nút SVG hướng mô hình. Tải `ppt-master.semantic-table.v2` của chúng tách định dạng ô, đoạn và run lặp lại thành mặc định và kiểu ô có tên; xuất native bung các giá trị đó trong bộ nhớ. Đối tượng nhập khai báo `data-pptx-native-authority="json"`: JSON nội dòng có thẩm quyền và bản xem trước trình duyệt gọn có thể gần đúng. Nhóm và bảng mang ý nghĩa ngoài lược đồ ngữ nghĩa đóng vẫn nằm nội dòng dưới dạng SVG đọc được và báo khoảng trống chuyển đổi tường minh; chúng không bao giờ ẩn sau tài nguyên nhập. Chỉ một đồ trang trí nguồn không được hỗ trợ, không chữ, không lược đồ mới có thể được nguồn hậu thuẫn dưới dạng một proxy ảnh `native-restore` gọn cộng tham chiếu nguồn ngoài của nó. Proxy không đổi khôi phục lại toàn bộ đối tượng OOXML nguồn; xóa proxy cục bộ Slide xóa đối tượng đó. Proxy Master/Layout kế thừa phải còn lại vì một trang phẳng không thể xóa cấu trúc dùng chung. Sửa proxy hoặc bản xem trước của nó thất bại có kiểm soát vì lặng lẽ biên dịch nó thành ảnh hay hình khối sinh từ SVG sẽ vi phạm ý định round-trip.

**Vì sao chỉ có một đường biên dịch PPTX.** Xuất native đọc các SVG đã soạn và dịch phần tử SVG được hỗ trợ thành hình khối DrawingML. Đường bộ slide thông thường đọc `svg_output/`; khi được yêu cầu, create-template gọi cùng bộ biên dịch có cấu trúc trên nguyên mẫu mẫu đã kiểm chứng để tạo `exports/<id>_template_preview.pptx` làm bằng chứng rà soát. Dự án không đóng gói phương tiện SVG cả slide hay dựng hình raster thay thế vào PPTX thứ hai. `svg_final/` vẫn được tạo ở mỗi lần chạy bộ slide chuẩn, nhưng nó chỉ là sản phẩm xem trước thị giác / ảnh SVG suy ra chứ không phải nguồn PPTX; lệnh Convert to Shape thủ công của PowerPoint vẫn nằm ngoài hợp đồng được hỗ trợ.

**Vì sao cấu trúc được soạn trước khi tạo hình ảnh trên các đường tái sử dụng có cấu trúc.** Master và Layout không phải phát hiện hậu xử lý. Với `template_reuse_scope: mirror|layout`, Strategist viết định nghĩa Master/Layout duy nhất và gán trang hoàn chỉnh trước khi tạo SVG; Executor ghi các định danh, nguyên tử cố định và slot đó trong khi soạn từng trang, và bộ xuất chỉ biên dịch cấu trúc đã khai báo. Bộ slide `template_reuse_scope: style`, thiết kế tự do và chỉ-thương-hiệu đánh đổi ngược lại: chúng ở `mode: flat`, giữ mọi đối tượng cục bộ Slide, không soạn siêu dữ liệu cấu trúc, và chỉ nhận một vỏ Master/Blank-Layout sạch thuộc dự án khi xuất. Đầu vào cũ có thể cung cấp thông tin cho workspace `create-template` mới, nhưng không bao giờ vào đường nâng cấp cấu trúc tại chỗ; cả hai chế độ tạo đều không kích hoạt nâng Master/Layout bằng heuristic hay suy placeholder.

**Vì sao hình ảnh Master/Layout là nguyên tử.** Một đối tượng Master hoặc Layout cố định phải là một con gốc trực tiếp. Transform, độ mờ, kiểu và z-order cấp nhóm từ đối tượng PPTX nhập được đẩy xuống từng nguyên tử trong lúc dựng lại. Điều này cố ý từ bỏ phân cấp chỉnh sửa nhóm của nguồn để đổi lấy mô hình sở hữu đơn giản, xác định có thể so sánh qua các trang và dựng lại thành phần native mà không có mơ hồ cấu trúc lồng.

**Vì sao slot Layout dùng nhóm.** Một slot tái sử dụng là một `<g>` cấp cao nhất với kiểu ngữ nghĩa và biên vùng thiết kế. Một slot bình thường chứa đúng một thẻ mang tương thích; bộ xuất bung nó thành ràng buộc placeholder Slide thật. Một vùng `object` hỗn hợp thực sự dùng hạ cấp proxy tường minh: nhóm nhìn thấy vẫn thông thường và một placeholder trong suốt ẩn cung cấp ràng buộc PowerPoint. Layout cũng có thể có không slot, nên trang thị giác cố định không cần placeholder toàn trang giả.

**Vì sao biên tái sử dụng là vùng thiết kế, không phải hộp chữ đo được.** Biên slot đến từ vùng an toàn dự định, cột, thụt vào của bảng, hoặc khung ảnh — không phải độ rộng glyph, số dòng hay hộp khít của nội dung hiện tại. Slide hiện tại giữ hình học thẻ mang đã soạn của riêng nó, nên các thể hiện 4:6, 3:7 và 5:5 có thể dùng chung một Layout khi chúng biểu đạt cùng bố cục ngữ nghĩa. Vì vậy độ dài chữ không thể vô tình tách hay làm biến đổi hợp đồng Layout tái sử dụng.

**Vì sao kế hoạch áp dụng nội bộ giữ hai trường.** Strategist suy ra `template_reuse_scope` để ghi tái sử dụng mirror theo nghĩa đen, tái sử dụng layout cấu trúc, hay tham chiếu style phẳng. Kế hoạch có cấu trúc sau đó suy ra `template_adherence: strict|adaptive`: `page_layouts` ghi nguyên mẫu soạn hoàn chỉnh, `pptx_masters` / `pptx_layouts` ghi định nghĩa tái sử dụng duy nhất, và `page_pptx_layouts` ghi gán trang. Strict bảo toàn hợp đồng nguyên mẫu đã khai báo. Adaptive giữ Master của nó, và Strategist chỉ có thể khai báo Layout mới khi nguyên tử Layout cố định hoặc topo/biên slot đổi. Nếu lúc dựng phát hiện nhu cầu đó, thực thi quay ngược thượng nguồn và chỉ tiếp tục sau khi Strategist cập nhật, đọc lại và kiểm chứng định nghĩa và việc gán; bộ xuất không bao giờ suy ra nó về sau. Đây là giá trị của bộ xuất, không phải tùy chọn xác nhận của người dùng. Một định nghĩa dựa trên mẫu có thể không được dùng mà vẫn đăng ký trong gói cuối. Skin Layout vẫn do dự án kiểm soát, trong khi mirror bảo toàn cấu trúc nguyên mẫu đã soạn và cách trình bày tương đương; con xem trước Chart/Table JSON-first có thể được tạo lại mà không có đồng nhất cây theo nghĩa đen. `style` không có giá trị tuân thủ hay ánh xạ cấu trúc.

**Vì sao mặc định chữ của Layout tường minh được chia giữa Master và Layout.** Cả xuất phẳng lẫn có cấu trúc đều ghi một neo tiêu đề và hệ thống phân cấp nội dung chín cấp xác định vào mặc định Master trong khi giữ thụt lề và thiết lập dấu đầu dòng. Default đọc các neo đó từ hợp đồng kiểu chữ đã khóa; xuất có cấu trúc của Quick không khóa suy chúng từ thẻ mang slot ngữ nghĩa qua toàn bộ danh sách SVG, với dự phòng xác định khi thiếu cỡ chữ của thẻ mang. Trên các đường có cấu trúc, mỗi slot chữ Layout sinh ra còn sao chép cỡ run đầu của thẻ mang vào mặc định cấp một trong khi giữ cỡ trực tiếp của prompt. Điều này bảo toàn thang riêng của Layout khi chữ placeholder được chèn hoặc đặt lại; run trực tiếp trên Slide sinh ra không đổi.

**Vì sao đầu ra có cấu trúc được đọc lại trước khi phát hành.** Tiền kiểm siêu dữ liệu không chứng minh được việc tuần tự hóa gói bảo toàn mọi quan hệ và đăng ký. Vì vậy bộ xuất mở lại PPTX tạm và kiểm chứng riêng các Slide đã phát hành so với danh sách Master/Layout hoàn chỉnh, gồm cả định nghĩa mà mọi Slide đều không dùng. Nó kiểm tra đăng ký Presentation → Master → Layout → Slide, danh sách phần vật lý / content-type, định danh bộ chọn, thứ tự đối tượng tĩnh chính xác, loại/chỉ số hiệu lực/biên của placeholder, ràng buộc thẻ mang, proxy ẩn và Layout không slot trước khi công bố tệp.

**Vì sao Create Layout / Create Deck có chế độ soạn và bảo toàn.** `pptx_template_import.py` phát SVG Master/Layout/Slide chỉnh sửa gọn mới cùng dữ kiện cấu trúc native. `standard` / `fidelity` kiểm tra toàn bộ bằng chứng nguồn, rồi soạn nguyên mẫu và topo gọn hoặc rộng hơn hữu ích. Mirror rà soát/soạn từng Slide nguồn gọn đã phân tích và chỉ chuỗi Layout/Master truy cập được của nó một-một. Nó bảo toàn cấu trúc, ý nghĩa và cách trình bày tương tự mà không đòi đồng nhất mã SVG; bộ hiện thực hóa kiểm chứng/ghép cây soạn hiện hành và không bao giờ khôi phục các cây con không mất mát nhìn thấy thông thường. Cấu trúc nguồn không được tham chiếu không phải đầu ra mirror. PPTX gốc vẫn là bằng chứng kiểm chứng bất biến, không phải phụ thuộc được đóng gói. Create Brand không có chiến lược nhân bản cấu trúc.

**Vì sao create-template dùng một đường workspace ở cả hai phạm vi.** `create-template` giữ `library` làm đầu ra có chỉ mục mặc định và có thể thay vào đó ghi dưới một dự án đã khởi tạo. Cả hai thư mục gốc đòi `templates/`; `images/`, `icons/` và `exports/` theo yêu cầu chỉ xuất hiện khi chúng chứa tệp thật, và tham chiếu tài nguyên SVG sẵn có theo cùng quy tắc. Library dùng một spec trần bên trong thư mục một loại; project dùng spec định danh trong một thư mục gốc dùng chung. Lược đồ và đường tài nguyên vẫn di động, trong khi cách đặt spec và đăng ký chỉ mục toàn cục là theo phạm vi. Chỉ Layout / Deck sở hữu hợp đồng SVG có cấu trúc; Brand và Style vẫn không có danh sách.

**Vì sao mỗi SVG mẫu vẫn hoàn chỉnh mà vẫn biên dịch thành cấu trúc native.** Một SVG mẫu lặp lại hình ảnh Master/Layout kế thừa cùng nội dung Slide mẫu để nó mở như một trang độc lập hoàn chỉnh. Khi tạo, `page_layouts` chọn nguyên mẫu đó và SVG đầu ra vẫn hoàn chỉnh. Bộ xuất loại bỏ các nguyên tử kế thừa lặp lại, phát các phần Master/Layout thật, và để thẻ mang slot thật cùng nội dung cục bộ Slide trên Slide.

**Vì sao dựng lại Chart/Table native của PowerPoint dùng dấu hiệu thay thế tường minh, không phải thay thế đối tượng tự động.** Bộ nhập độc lập `pptx_to_svg.py` phát bản xem trước SVG nhìn thấy cộng `data-pptx-replace-with`, `data-pptx-native-authority="json"` và `<metadata type="application/json">` nội dòng chỉ cho các tập con bảng/biểu đồ đã kiểm chứng. Đối tượng nhập/thuộc mẫu là JSON-first; bản xem trước của chúng là suy ra và có thể gần đúng. Đối tượng thiết kế tự do bỏ dấu hiệu thẩm quyền, vẫn là SVG-first, và chỉ đóng dấu đường cơ sở dự phòng sau khi SVG nhìn thấy và JSON đã đồng bộ. Bộ slide sinh ra chỉ chuẩn bị cặp cho các khóa đối tượng ngữ nghĩa được ghi là `<object-key>=yes` trong bản đồ `Native-ready` của §IX. Dấu hiệu cha xác định lược đồ tải; hình khối và đường nối thông thường không bao giờ dùng hợp đồng này. Dấu hiệu bảng đòi `ppt-master.semantic-table.v2`: nhập tách giá trị ô/đoạn/run lặp lại chính xác thành mặc định và kiểu ô có tên, trong khi xuất bung chúng trước khi kiểm chứng native. Nhập bảng phủ topo hàng/lưới vật lý chính xác, gộp chữ nhật chuẩn với ô nô lệ rỗng, viền từng cạnh đặc/không tô an toàn, ô nhiều đoạn chữ thuần, và dạng đoạn run-phong-phú đóng. Một đoạn phong phú chứa `runs` không rỗng; mỗi run đòi `text` và chỉ có thể dùng `bold`, `italic`, `underline`, `strike`, `color`, `font_size`, một `font_family`, `lang` và `alt_lang`. XML run chỉ-trình-bày nguồn không xác định không có `effectLst` / `effectDag` không rỗng được chuẩn hóa vào lược đồ đó; hiệu ứng run trong ô bảng thay vào đó tắt thay thế native và thêm chẩn đoán hiệu ứng chặn. Chữ mang quan hệ, phần mở rộng, ngắt dòng, trường, tab, dấu đầu dòng, topo chữ sai định dạng, gộp không chuẩn, viền không an toàn và tô không đặc vẫn chỉ là phương án dự phòng.

Với biểu đồ cột/thanh/đường/vùng, tròn/vành khuyên, phân tán và bong bóng đã phân tích được hỗ trợ, bản xem trước dựng sẵn bị thiếu được thay bằng phương án dự phòng SVG đọc được, xác định, gắn dấu `data-pptx-fallback-kind="normalized"`. Bộ nhập cũng phủ tập con kết hợp cột/đường/vùng đã kiểm chứng, OHLC cổ phiếu bốn chuỗi chuẩn, biểu đồ vùng với trục ngày số, biểu đồ phân tán/bong bóng đã kiểm chứng với hợp đồng `axes.x` / `axes.y` đóng, radar, `serLines` an toàn của `of_pie`, chuẩn hóa trục/tiêu đề/chú giải, và các trường hợp khe/chồng thanh/cột có giới hạn. `gapWidth` chỉ được chấp nhận là một số nguyên trong `0..500`, và `overlap` chỉ là một số nguyên trong `-100..100`; các giá trị trình bày này cố ý được chuẩn hóa trong đầu ra native, trong khi đầu vào sai định dạng, trùng lặp hoặc ngoài khoảng thất bại có kiểm soát. Biểu đồ kết hợp có thể giữ bộ nhớ đệm danh mục và dải sổ làm việc chính/phụ độc lập. Nhập XY suy `scatter_style` từ trạng thái đường/dấu/làm mượt hiệu lực đồng nhất của chuỗi. Các hợp đồng trục danh mục/giá trị và XY đóng giữ loại, vị trí, hiển thị, vị trí nhãn, định dạng số, min/max/đơn vị chính, đảo ngược và đường lưới chính để đọc lại native; phương án dự phòng XY chuẩn hóa chỉ tiêu thụ hai cờ `major_gridlines`.

Nhập ChartEx cố ý đóng với bảy mô hình dữ liệu đã kiểm chứng: `treemap`, `sunburst`, `histogram`, `pareto`, `box_whisker`, `waterfall` và `funnel`. Topo dữ liệu thứ bậc/danh mục/giá trị/chuỗi/tổng phụ được hỗ trợ của chúng round-trip qua đầu ra native và nhập lại. Bộ nhớ đệm số phải không rỗng và hữu hạn, với số đếm/chỉ số không âm chuẩn và topo điểm liên tục chính xác. Kiểu, trục, nhãn và chia khoảng ChartEx nguồn có thể được chuẩn hóa; đây không phải nhập ChartEx tùy ý hay độ trung thực trình bày. C4/C5 không mở rộng bộ dựng chuẩn hóa, nên loại đang hoạt động hợp lệ nằm ngoài nó vẫn dùng `data-pptx-fallback-kind="placeholder"` mà không có xem trước nguồn. `AxisSpec` đầy đủ, họ ChartEx tùy ý, OOXML phong phú tùy ý, biểu đồ xoay/lật/3D, biến thể kết hợp/cổ phiếu/trục ngày chưa kiểm chứng và các ngữ nghĩa chưa mô hình hóa khác vẫn nằm ngoài tập con nhập đang hoạt động. Thay thế native có thể chuẩn hóa chi tiết trình bày nằm ngoài tải và giữ cảnh báo mô-hình-dữ-liệu-trước. Xuất mặc định giữ con xem trước làm hình khối DrawingML chỉnh sửa được; chỉ `--native-charts-and-tables` tường minh mới kích hoạt đối tượng Chart/Table native của PowerPoint. JSON-first bỏ qua độ mới của bản xem trước; SVG-first đòi `data-pptx-fallback-sha256` hiện diện, hợp lệ, mới hoặc thay thế native thất bại có kiểm soát. Sự hiện diện dấu hiệu, bảng ngữ nghĩa và gói biểu đồ nhập không bao giờ kích hoạt thay thế ngầm. Cặp nhập/xuất này là công cụ hỗ trợ dựng lại, không thay thế đường round-trip bảo toàn nguồn Edit Native PPTX.

---

## Mô hình hiệu ứng & chuyển trang

Lựa chọn thiết kế thú vị là **neo** hiệu ứng, không phải danh sách hiệu ứng.

**Vì sao neo hiệu ứng đối tượng trên nhóm `<g>` cấp cao nhất.** Dòng thời gian hiệu ứng của PowerPoint dựa trên hình khối — mỗi đối tượng được tạo hiệu ứng cần một ID hình khối ổn định. Tạo hiệu ứng cho từng primitive sẽ cho 30+ nguyên tử chuyển động riêng biệt mỗi slide, trong khi chỉ tạo hiệu ứng cho cả slide thì mất khả năng kể chuyện thị giác. Nhóm cấp cao nhất là độ chi tiết tự nhiên: Executor vốn dùng `<g id="...">` để đánh dấu khối nội dung logic, nên hiệu ứng vào, nhấn mạnh, đường đi và thoát dùng chung các đơn vị ngữ nghĩa. Nhóm xác định một đích hình khối PowerPoint chứ không phải một bản ghi dòng thời gian: đối tượng đơn hiệu ứng cũ tạo một hàng Animation Pane, còn `effects[]` có thể tạo nhiều hàng có thứ tự đều nhắm cùng một hình khối.

**Vì sao cấu trúc trang tự động bị bỏ qua.** Bất kỳ nhóm cấp cao nhất nào có `data-pptx-layer` là cấu trúc tĩnh, và bộ quét hiện tại cũng coi mọi `data-pptx-placeholder` tường minh là khung trang tĩnh; các vai trò `background` / `header` / `footer` / `decoration` / `watermark` / `page-number` phủ phần khung còn lại. Phương án dự phòng theo token ID không được bật hay tắt theo từng SVG: nó áp dụng cho mỗi nhóm cấp cao nhất thiếu dấu lớp, vai trò và placeholder, nên một SVG hỗn hợp mới/cũ vẫn có thể dùng heuristic ID cũ chỉ trên các nhóm chưa đánh dấu. Riêng, khi một SVG không có nhóm cấp cao nhất, chưa tìm thấy đích hiệu ứng nào, và chỉ một đến tám primitive gốc đủ điều kiện, các primitive đó tạo thành phương án dự phòng tương thích có giới hạn. Đây là phạm vi thực tế của bộ quét.

**Vì sao hiệu ứng cấp đối tượng dùng tệp phụ, không phải thuộc tính SVG.** SVG vẫn là nguồn sự thật thị giác tĩnh. Hiệu ứng PPTX tùy chỉnh là chính sách xuất, nên ghi đè theo từng đối tượng nằm trong `animations.json` tùy chọn, khóa theo stem slide và id nhóm cấp cao nhất. Một nhóm đã điền dùng hoặc các trường đơn hiệu ứng cũ hoàn toàn tương thích hoặc phong bì `effects[]` không rỗng, không bao giờ cả hai. Mỗi hàng đã xác định sở hữu hiệu ứng, thứ tự trình tự, độ trễ, thời lượng, chế độ Start và `trigger_shape` tùy chọn của riêng nó; trigger hiệu ứng cấp slide chỉ cung cấp chế độ Start kế thừa. Giàn sinh ra là trung tính (`effect: none`) và để nhóm là `{}` cho đến khi chuyển động được chấp nhận. Điều này giữ siêu dữ liệu riêng của PowerPoint ngoài SVG mà không ép một đối tượng ngữ nghĩa chỉ có một pha chuyển động.

**Vì sao chế độ tự động chỉ là hiệu ứng vào.** `auto`, `mixed` và `random` trả lời một câu hỏi có giới hạn: một lần hiện chung chung vào bằng cách nào. Chúng không bịa ý định nhấn mạnh, di chuyển hay thoát. Ba nhóm đó, và một hiệu ứng vào được chọn tường minh, dùng hiệu ứng chuẩn trong tệp phụ để quyết định soạn vẫn kiểm tra được.

**Vì sao mô hình đích dừng ở hiệu ứng hình khối cấp cao nhất.** Mô hình sinh ra không suy ra dựng theo đoạn/vùng chữ, không soạn đường chuyển động tự do tùy chỉnh, không sắp trình tự nội bộ Chart/SmartArt native, và không phát lệnh phát đa phương tiện. Preset đường chuyển động native vẫn là hiệu ứng đối tượng hợp lệ; việc phát đa phương tiện vẫn ở quy trình âm thanh/video.

**Vì sao thuyết minh ghi sẵn điều khiển tự chuyển slide từ thời lượng clip.** Chế độ thuyết minh ghi sẵn nhắm tới xuất video, nơi không ai nhấp qua bộ slide. Nó đo thời lượng thật của từng clip và đặt tự chuyển slide thành `thời lượng âm thanh + --narration-padding`; khoảng đệm mặc định 0,5 giây để đuôi không bị cắt. Nó không dùng tốc độ đọc ước lượng hay thời lượng cố định mỗi slide.

**Vì sao thuyết minh ghi sẵn từ chối hiệu ứng đối tượng on-click.** PowerPoint có thể ghi thời gian nhấp trong buổi diễn tập thật, nhưng HugoPPTPilot không tổng hợp sự kiện nhấp cấp đối tượng. Đường thuyết minh ghi sẵn chỉ ghi âm thanh cấp trang và thời gian tự chuyển slide, nên hiệu ứng đối tượng điều khiển bằng nhấp sẽ khiến bản xuất phụ thuộc vào diễn tập PowerPoint thủ công bổ sung. Bộ slide xuất bằng `--recorded-narration` vì vậy phải dùng hiệu ứng đối tượng không cần nhấp (`after-previous` hoặc `with-previous`) trên mọi hàng đã xác định; điều này cũng loại `trigger_shape`.

**Vì sao xuất video native là lệnh riêng.** Tổng hợp âm thanh và đóng gói PPTX là thao tác dự án đa nền tảng; mã hóa video PowerPoint là tích hợp máy tính Windows. `powerpoint_video.py` vì vậy nhận PPTX thuyết minh cuối, gọi `CreateVideo`, và thăm dò `CreateVideoStatus` để trình bày kết quả CLI đồng bộ mà không ghép tự động hóa Office với các backend TTS. Khi có âm chuyển trang/đối tượng native, `video_sound_mix.py` vẫn là ranh giới tường minh thứ hai vì PowerPoint có thể bỏ chúng khỏi âm thanh đã mã hóa. Nó hiệu chuẩn MP4 thô, dựng stem SFX tái sử dụng được, và công bố biên nhận xác minh đầu ra đã phối trong khi để nguyên PPTX chuẩn. Việc quay trình chiếu thời gian thực được chọn tường minh là ranh giới thủ công riêng: PowerPoint máy tính vẫn dựng hình và phát bộ slide chuẩn trong khi trình ghi bên ngoài quay hình ảnh và một đường âm thanh hệ thống của nó. Nó không phải tự động hóa đa nền tảng hay headless, và các cue đã được quay sẵn làm bộ phối sau xuất không hợp lệ cho tệp đó.

---

## Ranh giới bảo trì: điều không nên gộp

Những đơn giản hóa hấp dẫn dưới đây có chi phí tường minh. Hãy coi chúng là hợp đồng phủ định trừ khi kiến trúc xung quanh được thiết kế lại có chủ ý.

| Đừng gộp hay thêm | Vì sao |
|---|---|
| Đừng khớp mờ tên mẫu hay cụm phong cách với đường dẫn thư viện | Việc chọn mẫu phải xác định; áp dụng sai workspace khó khôi phục hơn thiết kế tự do |
| Đừng coi PPTX thô làm mẫu Bước 3 | khi dùng làm mẫu/khung trang, nó thuộc nhân bản/điền native; dùng làm nguồn, beautify 1:1 và tái cấu trúc thay vào đó theo ranh giới Generate của chúng thay vì truyền PPTX thẳng vào Bước 3 |
| Gộp điền và nâng cấp native vào Edit Native PPTX; giữ `beautify-pptx` riêng | điền và nâng cấp dùng chung một workspace round-trip bảo toàn nguồn và bộ xuất `svg_to_pptx.py --roundtrip`; beautify thiết kế lại mọi trang qua Generate thay vì bảo toàn slide nguồn |
| Đừng dùng script tạo hàng loạt trang SVG của Executor | phán đoán thiết kế liên trang phụ thuộc việc agent chính soạn tuần tự |
| Đừng biến `image_analysis.csv` thành bộ nhớ đệm bền | `images/` là thư mục sống; dữ kiện phải được tạo lại khi dùng |
| Đừng biến `svg_final/` thành đầu vào PPTX native mặc định | `svg_final/` viết lại tài nguyên cho xem trước thị giác, trong khi chuyển đổi native cần ngữ nghĩa độ trung thực cao của `svg_output/` |
| Đừng coi `svg_final/` là định dạng trao đổi khôi phục được hình khối hay không phụ thuộc ngoài | nó phục vụ xem trước thị giác và chèn ảnh SVG, nhưng EMF/WMF giữ ngoại lệ tham chiếu ngoài; Convert to Shape của PowerPoint không được hỗ trợ |
| Đừng tự động bật hiệu ứng cấp đối tượng | chuyển trang là mặc định; chuyển động đối tượng là chính sách xuất tường minh |
| Đừng mặc định bật rà soát thị giác, thuyết minh, kiểm chứng biểu đồ hay tùy chỉnh hiệu ứng trong mọi lần chạy | các quy trình này có kích hoạt hẹp và phụ thuộc bổ sung |
| Đừng thay `finalize_svg.py` bằng sao chép tệp | hoàn tất nhúng biểu tượng/ảnh, làm phẳng chữ đặc biệt và chuẩn bị sản phẩm xem trước |
| Đừng dùng `analysis/<stem>.slide_library.json` làm nguồn giá trị biểu đồ thứ hai trong đường chính | Markdown sở hữu giá trị nội dung; mục biểu đồ/bảng của tiếp nhận là bản tóm tắt cấu trúc trừ khi hồ sơ beautify sở hữu toàn bộ dữ kiện đối tượng native |

---

## Các đường và sổ tay hỗ trợ

[`workflows/index.md`](../../skills/ppt-master/workflows/index.md) là bản kiểm kê chỉ-cho-người-bảo-trì và không vào chuỗi nạp tác vụ. Việc chọn đường lúc chạy có thẩm quyền ở [`workflows/routing.md`](../../skills/ppt-master/workflows/routing.md). HugoPPTPilot có đúng ba đường sản phẩm cấp cao nhất: Generate PPTX, Create Template và Edit Native PPTX. Một yêu cầu của người dùng vào một trong các đường đó; không sổ tay hỗ trợ nào cạnh tranh với chúng.

Các tệp hỗ trợ ở riêng chỉ để giữ hợp đồng đường tập trung và nạp ngữ cảnh tùy chọn theo yêu cầu:

| Nhóm | Sổ tay | Đường sở hữu |
|---|---|---|
| Hồ sơ tạo | `image-to-pptx`, `beautify-pptx`, `quick-generate` | Image to PPTX hiện đòi Codex, luôn kích hoạt Quick, chuẩn hóa khung trang, dựng lại chữ thông thường ở dạng native, dựng lại đồ họa nhận diện/trang trí độ phân giải thấp dưới khóa thị giác nghiêm ngặt khi cần, giữ biểu đồ/bảng/đồ họa dữ liệu ở dạng native và kiểm chứng được, nguồn chính xác, hoặc `manual_required`, và dựng cảnh thành ít nhất lớp nền sạch cộng lớp chủ thể/tiền cảnh; Beautify bảo toàn câu chữ/trang trong khi thiết kế lại bố cục và chỉ chọn Quick từ ý định tường minh; Quick sở hữu vòng đời SVG-sang-PPTX trực tiếp |
| Quy trình con mẫu | `create-brand`, `create-style`, `create-layout`, `create-deck` | Create Template điều phối đúng một cho bản sắc-thuần, hướng/phương pháp không danh sách, cấu trúc trung lập thương hiệu/ứng dụng, hoặc ứng dụng lặp lại với bản sắc/cấu trúc tích hợp |
| Giai đoạn đầu vào mẫu | `apply-template-workspace` | Chạy sau khi Giai đoạn 1 mặc định xác nhận ít nhất một workspace và trước Giai đoạn 2; thiết kế tự do bỏ việc cài, trong khi Quick có thể cung cấp đầu vào thư mục gốc chính xác trực tiếp |
| Giai đoạn tạo | `topic-research`, `resume-execute`, `refine-spec`, `verify-charts`, `visual-review`, `live-preview`, `customize-animations` | Generate PPTX tại các điểm tiếp nhận, lập kế hoạch, chỉnh sửa, chất lượng hoặc hậu xử lý đã định nghĩa của chúng |
| Giai đoạn dùng chung | `generate-audio` | Hậu xử lý Generate PPTX hoặc tích hợp thuyết minh Edit Native PPTX |
| Quản trị | `failure-recovery` | Chính sách dừng/tiếp tục toàn cục cho cả ba đường; ma trận khôi phục cụ thể và con trỏ tiếp tục cho Generate PPTX |

Phân loại này là ranh giới trách nhiệm, không phải sở thích tên tệp. Một đường cấp cao nhất mới chỉ được biện minh bởi vòng đời sản phẩm và mô hình biến đổi riêng biệt; thực thi theo loại bên trong Create Template vẫn là quy trình con, hành vi đường tùy chọn vẫn là hồ sơ hay giai đoạn, và chính sách xuyên đường vẫn là quản trị.
