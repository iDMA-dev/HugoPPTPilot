# Vì sao chọn HugoPPTPilot

[Tiếng Việt](./why-ppt-master.md)

---

Công cụ AI làm bài thuyết trình không hiếm. Trang này giải thích HugoPPTPilot làm khác đi ở đâu — và khi nào nó không phải lựa chọn phù hợp.

Đây là trang so sánh dành cho người dùng. Các giả định của nó về việc một bài thuyết trình là gì, nó phục vụ những công việc nào và những tầng nào quyết định chất lượng đến từ [PPT là gì?](./what-is-ppt.md). Định vị dài hạn, cam kết sản phẩm và ranh giới khả năng của dự án nằm ở [Định vị dự án](./project-positioning.md).

Chi phí của một bài thuyết trình tốt không thể đo chỉ bằng thời gian vẽ slide. Nó đòi hỏi nhiều loại việc gắn chặt với nhau: xác định khán giả và kết quả mong muốn, chọn và kiểm chứng bằng chứng, định hình lập luận và mạch kể, thiết kế một hệ thống hình ảnh nhất quán, dựng một tài liệu PowerPoint native chỉnh sửa được, và chuẩn bị bộ slide để trình bày, rà soát và tái sử dụng. Đây không phải những lượt làm độc lập. Đổi thông điệp hoặc bối cảnh trình bày, thì dàn ý, thiết kế slide, đối tượng native, ghi chú và kiểm chứng đều có thể phải đổi theo. Phần lớn chi phí nằm ở phối hợp và làm lại, chứ không phải ở việc vẽ thêm một slide.

Đó là khoảng trống mà dự án này giải quyết. Chỉ nén một tầng — soạn chữ, áp giao diện hay dựng những trang đẹp — thì chỉ tiết kiệm được thời gian trong tầng đó. HugoPPTPilot được thiết kế để nối các tầng lập luận, hình ảnh và bàn giao native, để thời gian tiết kiệm ở một khâu không bị tiêu lại vào việc dựng lại kết quả ở khâu sau.

## 1. Độ sâu native — làm chủ bộ tính năng của PowerPoint

**Đây là điểm khác biệt cốt lõi.**

"Chỉnh sửa được" đã là điều tối thiểu — xuất mỗi slide thành `.pptx` chỉnh sửa được không còn gì đặc biệt. Câu hỏi thật là *việc chỉnh sửa sâu đến đâu*: HugoPPTPilot soạn chính mô hình đối tượng native của PowerPoint, không phải một lớp vỏ mỏng chỉnh sửa được phủ lên — và bạn chạm tới nó từ khung chat:

- **Slide master & layout** — cấu trúc `p:sldMaster` / `p:sldLayout` thật với kế thừa (ở đường mẫu / có cấu trúc), không phải cùng một khung viền dán lên mọi trang
- **Hình khối native** — hình học preset với tay nắm điều chỉnh hoạt động (mũi tên khối, chevron, chú thích, nút lưu đồ…), đường nối và đường tự do, không chỉ là hình chữ nhật
- **Biểu đồ & bảng native, theo yêu cầu** — đối tượng biểu đồ và bảng có dữ liệu bên trong cùng sổ Edit-Data khi bạn muốn (ghi chú đánh đổi ở dưới)
- **Phương trình native, dạng khối hoặc nội dòng** — mọi đầu vào LaTeX / mhchem của Microsoft 365 được ghi tài liệu rõ ràng đều biên dịch xuôi thành OMML PowerPoint chỉnh sửa được thay vì ảnh công thức; đầu vào ngoài hồ sơ sẽ thất bại có kiểm soát
- **Toàn bộ mô hình chữ, ảnh, tô màu và hiệu ứng** — định dạng run/đoạn, cắt ảnh và cắt theo hình, gradient, họa tiết, đổ bóng ngoài, phát sáng
- **Chuyển trang, hiệu ứng vào / nhấn mạnh / đường chuyển động / thoát, và ghi chú người trình bày → thuyết minh giọng nói** — timing và các phần gói OOXML thật, không phải video nướng sẵn
- **Chưng cất mẫu ở tầng trên** — đưa tài liệu tham chiếu, nó trích ra mẫu thương hiệu / phong cách / bố cục / bộ slide tái sử dụng; một tầng tái sử dụng xây *phía trên* các nguyên thủy native

Và độ sâu này là **một hướng đi, không phải danh sách cố định.** Kim chỉ nam của dự án là tiếp tục tiệm cận chính PowerPoint — một nỗ lực liên tục xây dựng và tích hợp thêm các khả năng native của nó, bản phát hành này nối bản phát hành khác, thu hẹp khoảng cách giữa thứ AI tạo cho bạn và thứ bạn có thể tự dựng tay trong PowerPoint.

Vì vậy ranh giới trung thực, và nó dịch chuyển. Một số thứ cố ý nằm ngoài — **SmartArt** (mô hình đối tượng đóng và mong manh, nên dựng lại từ hình khối native thông thường), WordArt native và chữ biến dạng (chữ trang trí do AI tạo cộng chữ chỉnh sửa được thông thường đã đáp ứng nhu cầu), vài hiệu ứng trang trí khác (phản chiếu, viền mềm), và đối tượng nhúng hoặc cũ (OLE, video, macro). Phương trình native phủ khối độc lập và toán nội dòng cùng đoạn, với hồ sơ đầu vào thực thi được ghim theo các phiên bản Microsoft 365 đã ghi tài liệu và đích gói PowerPoint 2010+; kiểm chứng của repo ở cấp bộ biên dịch / OMML / gói chứ không phải chứng nhận đầy đủ giao diện Microsoft 365. Ma trận và suy diễn nhiều dòng vẫn ở cấp khối. Nhập PPTX chỉ dựng lại được OMML do HugoPPTPilot sở hữu và sạch với bộ kiểm chứng thành dấu hiệu công thức đã chuẩn hóa; nó không khôi phục Office Math bên thứ ba tùy ý hay cách viết LaTeX gốc của tác giả. Hiển thị/chỉnh sửa trên nhiều ứng dụng không được cam kết. Cái gì trong, cái gì ngoài không bao giờ nói lấp lửng: ranh giới chính xác từng tính năng — native / xấp xỉ / phải nướng / không hỗ trợ — được công bố trong [Hướng dẫn ánh xạ PowerPoint ↔ SVG](./powerpoint-svg-mapping.md).

Và "ngoài phạm vi" hiếm khi có nghĩa là *không thể* — thường là *chưa đến lúc* (thời điểm chưa phù hợp) hoặc *không đáng* (với một hiệu ứng ngách, chỉnh tay nhanh trong PowerPoint rẻ hơn chi phí kỹ thuật). Quyết định đó dễ đưa ra chính vì đầu ra của HugoPPTPilot là một **bản nháp chất lượng cao bạn tiếp tục chỉnh sửa, không phải bộ slide cuối đã niêm phong** — chặng cuối thuộc về bạn theo thiết kế.

Nói thẳng: **những việc tốn công tỉ mỉ khi làm tay trong PowerPoint — dựng master, đặt biểu đồ native, chưng cất mẫu, nối thuyết minh từng slide — bạn có được từ một câu chat.**

> **Vì sao làm được — SVG là ngôn ngữ soạn thảo.** AI tạo một SVG có ràng buộc, rồi script biên dịch SVG → DrawingML. SVG và DrawingML cùng một loại thứ — định dạng vector 2D tọa độ tuyệt đối, nơi hình chữ nhật, đường path, gradient và đổ bóng ánh xạ một-một — nên chuyển đổi là dịch phương ngữ, không phải bắc cầu giữa các định dạng. Thế giới quan chung đó chính là lý do đầu ra có thể là PowerPoint native *sâu* thay vì những ô phẳng. Lý giải đầy đủ trong [Thiết kế kỹ thuật](./technical-design.md).

> **Sự đánh đổi về biểu đồ, nói thẳng.** Mặc định, biểu đồ và bảng xuất thành hình khối DrawingML chỉnh sửa được sinh từ SVG — chọn vậy để chúng hiển thị nhất quán đến từng điểm ảnh trên PowerPoint / Keynote / LibreOffice / WPS. Thêm `--native-charts-and-tables` và những cái đủ điều kiện sẽ thành đối tượng Chart / Table native có dữ liệu. Cả hai đều chỉnh sửa được hoàn toàn; **lựa chọn là của bạn** — tương thích nhiều ứng dụng hay sổ dữ liệu sống, tùy bộ slide này dùng để làm gì, không bị công cụ khóa cứng.

## 2. Logic trước tiên — bộ slide không chỉ để hiển thị; lập luận mới quan trọng hơn

Giá trị của một bộ slide chưa bao giờ chỉ là vẻ ngoài. Thứ thường quyết định nó có thuyết phục không là lập luận bên dưới: luận điểm có đứng vững không, thứ tự có đúng không, thứ bậc có rõ không. Bước đó đi trước bố cục và thường quan trọng hơn — và HugoPPTPilot sở hữu cả nó, không chỉ phần thiết kế theo sau.

Trước khi vẽ một slide nào, Strategist đọc nguồn của bạn, chốt thông điệp cốt lõi và chọn một **chế độ** kể — `pyramid` (thuyết phục kết luận trước), `narrative` (kể chuyện), `instructional` (giảng dạy), `showcase` (gây ấn tượng) hoặc `briefing` (thông tin trung lập) — rồi dựng dàn ý và thứ bậc thông tin để phần hình ảnh phục vụ. Từ cùng một tài liệu, `pyramid` mở bằng kết luận rồi xếp lập luận hỗ trợ bên dưới, còn `briefing` bày dữ kiện đều nhau và không đứng về phía nào — mỗi chế độ cho cả bộ slide một bộ khung khác. Tách, gộp, đổi thứ tự, cắt, đặt lại khung: cấu trúc được suy xét, không thừa kế theo thứ tự bất kỳ của nguồn.

Đây là nửa giá trị ít hiển nhiên hơn. Một bộ slide đẹp dựng trên lập luận rối vẫn rối. HugoPPTPilot làm cả **tầng logic và tầng hình ảnh**, nên đầu ra đọc như được ai đó suy nghĩ chứ không chỉ định dạng — và vì cả hai tầng đều nằm trong tay bạn để chỉnh, bạn kiểm soát lập luận chứ không chỉ điểm ảnh.

## 3. Chi phí minh bạch — bạn trả cho nhà cung cấp AI, không thêm thuê bao nào

Bản thân HugoPPTPilot miễn phí và mã nguồn mở. Chi phí duy nhất là phần dùng mô hình AI của chính bạn.

Nó cũng **được xây có chủ đích để chạy bên trong một coding agent**, và có lý do chi phí đằng sau. Nhiều coding agent đi kèm **gói thuê bao cố định**, mà với gói cố định thì thêm một bộ slide không tốn thêm — nên bạn có thể tạo hàng loạt trên thuê bao bạn vốn đã trả. Thích **API trả theo token** trực tiếp hơn? Đó chỉ là cấu trúc giá khác. Đường nào cũng được và chọn đường nào là tùy bạn — đó là một phần của thiết kế.

Dù thế nào, HugoPPTPilot không thêm tầng chi phí nào của riêng nó lên phần bạn chi cho AI: không thuê bao nền tảng PPT, không tín dụng độc quyền, không phí theo người dùng.

---

## 4. Quyền riêng tư dữ liệu — quy trình chạy cục bộ

File của bạn ở lại máy bạn. Tài liệu nguồn được chuyển đổi cục bộ, SVG được tạo cục bộ, PPTX được xuất cục bộ. Lưu lượng ra ngoài chỉ gồm cuộc trò chuyện của bạn với mô hình AI — không khác cách bạn dùng trình soạn thảo thường ngày — cộng các dịch vụ tùy chọn bạn bật: tạo ảnh AI nhận prompt ảnh, tìm ảnh web nhận từ khóa, nhập URL tải các trang bạn nêu tên, và thuyết minh trực tuyến nhận văn bản ghi chú người trình bày. Với tài liệu nhạy cảm, đừng dùng các dịch vụ đó.

Không có máy chủ bên thứ ba nào lưu tài liệu nguồn hay đầu ra của bạn. Điều này quan trọng với tài chính, cơ quan nhà nước và mọi tổ chức có yêu cầu lưu trú dữ liệu.

---

## 5. Hoàn toàn mở — không bị khóa vào trình soạn thảo hay mô hình

Quy trình làm việc của bạn không nên bị một công ty nào làm con tin. Hôm nay bạn phụ thuộc nền tảng của họ; ngày mai họ tăng giá, đổi luật hay đóng cửa — và mọi thứ bạn xây trên đó biến mất. Mã nguồn mở không nên như vậy.

HugoPPTPilot là một framework, không phải plugin cho một IDE cụ thể. **Về trình soạn thảo:** Claude Code, Codex, Cursor và những gì đến sau đều dùng được. **Về mô hình:** Claude cho kết quả tốt nhất, nhưng GPT, Gemini và các mô hình khác đều có thể điều khiển HugoPPTPilot — khác biệt nằm ở độ chính xác bố cục, và khi mô hình tiến bộ, các khoảng cách này sẽ thu hẹp.

Lựa chọn là của bạn — và không dừng ở trình soạn thảo và mô hình. Đối tượng biểu đồ native hay hình khối ổn định đa ứng dụng, định dạng khung này hay khung khác, dùng mẫu hay thiết kế tự do: những đánh đổi quan trọng nằm trong tay bạn, quyết định theo từng bộ slide. Trao cho bạn những lựa chọn đó thay vì khóa một con đường chính là toàn bộ ý nghĩa của mã nguồn mở.

---

## Tính năng

### Bộ khung kể bất kỳ × Phong cách hình ảnh bất kỳ

Thiết kế của một bộ slide do hai trục độc lập bạn kết hợp tự do quyết định: **bộ khung kể** (chế độ, xem mục trên) quyết định nó lập luận thế nào, còn **phong cách hình ảnh** quyết định nó trông ra sao — 18 phong cách dựng sẵn từ `swiss-minimal` và `editorial` đến `dark-tech`, `brutalist` và `ink-wash`, mỗi loại có thêm tùy chọn `custom`. Cái nào cũng ghép được với cái nào, khóa một lần ở bước xác nhận và giữ ổn định suốt bộ slide.

### Nhận đủ loại tài liệu nguồn

Đưa vào gần như mọi thứ: PDF, DOCX, PPTX, EPUB, HTML, LaTeX, RST, URL web, bài viết WeChat, Markdown hoặc văn bản thuần — tất cả đều dùng được làm tài liệu nguồn cho bộ slide.

### Đầu ra nhiều định dạng

Đầu ra không giới hạn ở tỷ lệ slide chuẩn 16:9 và 4:3. Xiaohongshu 3:4, WeChat/Instagram 1:1, Story dọc 9:16, A4 in ấn — cùng một quy trình, chỉ cần nêu định dạng.

PowerPoint vẫn là sản phẩm trình bày cốt lõi của dự án. Khi cùng quy trình được dùng cho thẻ mạng xã hội hay trang in, đó là các đầu ra khung kề cận — không định nghĩa lại trọng tâm trình bày của dự án.

---

## Khi nào HugoPPTPilot không phải lựa chọn phù hợp

Thẳng thắn về hạn chế:

| Hạn chế | Chi tiết |
|---|---|
| **Cần cài đặt** | Cài Python, clone repo, cấu hình trình soạn thảo AI. Không phải trải nghiệm "mở trình duyệt là dùng". |
| **Tạo chậm hơn** | 10–20 phút cho bộ 10 trang (tuần tự từng trang để giữ nhất quán giữa các slide). Công cụ SaaS mất vài giây. |
| **Không cộng tác** | File cục bộ, không đồng chỉnh sửa thời gian thực, không có link chia sẻ. |
| **Không phải khung vẽ tự do hoàn chỉnh** | Xem trước trực tiếp trên trình duyệt hỗ trợ chỉnh sửa trực tiếp — chọn để đổi chữ/màu/phông/cỡ, kéo hoặc dùng phím mũi tên để đổi vị trí, có hoàn tác — cùng chú thích bằng cách nhấp để AI viết lại. Nó không phải một khung vẽ tự do đầy đủ (trình chỉnh sửa trực quan kéo thả khắp nơi): không có tay nắm đổi kích thước trên khung, và xuất lại PPTX vẫn là một bước trong chat. |

**Nếu bạn muốn slide tức thì, không cần cài đặt, ngay trong trình duyệt** — một công cụ SaaS lưu trữ sẽ hợp hơn.

**Nếu bạn muốn đầu ra PowerPoint native sâu — master và layout, hình khối và đường nối native, biểu đồ và bảng có dữ liệu, gradient / họa tiết / đổ bóng / phát sáng, biểu tượng vector, chuyển trang và hiệu ứng đối tượng đầy đủ, ghi chú người trình bày biến thành thuyết minh giọng nói và video, cùng chưng cất mẫu ở tầng trên — với chi phí dễ dự đoán, dữ liệu cục bộ và không bị khóa** — thì đó là điều HugoPPTPilot được xây để làm.
