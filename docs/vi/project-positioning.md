# Định vị dự án và ranh giới khả năng

[Tiếng Việt](./project-positioning.md)

---

Tài liệu này xác định vị thế sản phẩm dài hạn của HugoPPTPilot và phép thử để thêm, giữ hoặc bỏ một khả năng. Đây là chính sách sản phẩm, không phải danh sách tính năng hay sổ tay thực thi.

[`workflows/routing.md`](../../skills/ppt-master/workflows/routing.md) vẫn là thẩm quyền cho việc chọn đường hiện tại. Tài liệu này trả lời câu hỏi nền tảng hơn: một hướng đi được đề xuất có thuộc về HugoPPTPilot hay không.

## 1. Định vị

> **HugoPPTPilot là một quy trình mã nguồn mở, điều khiển bằng chat, để AI lập luận cho mạch nội dung thành hình trước, rồi mới thiết kế và tạo ra một bộ PowerPoint thật, chỉnh sửa được — không phải ảnh slide hay một lớp vỏ mỏng chỉnh sửa được. Trục xác định của nó là độ sâu native: soạn hoặc bảo toàn nhiều hơn mô hình đối tượng, hành vi và cấu trúc tái sử dụng của chính PowerPoint, bản phát hành này nối bản phát hành khác.**

Đầu vào có thể là một chủ đề, tài liệu nguồn, dữ liệu, tham chiếu thiết kế, tài sản thương hiệu hoặc một file `.pptx` có sẵn. Đường chính tạo bộ slide mới; các đường và hồ sơ tường minh khác có thể chưng cất workspace Brand / Style / Layout / Deck tái sử dụng, điền nội dung mới vào một PowerPoint có sẵn, thiết kế lại nó, hoặc thêm hành vi trình chiếu native trong khi bảo toàn những gì hợp đồng của chúng hứa giữ.

Độ sâu native đó là một hướng đi, không phải danh sách cố định. Kim chỉ nam của HugoPPTPilot là tiếp tục tiệm cận chính PowerPoint, thu hẹp khoảng cách giữa thứ AI có thể tạo và thứ một người dùng thành thạo có thể dựng tay. [Hướng dẫn ánh xạ PowerPoint ↔ SVG](./powerpoint-svg-mapping.md) ghi lại ranh giới hiện tại một cách trung thực, từng tính năng một.

Về hình thức, HugoPPTPilot là một quy trình — một "skill" — chạy trong bất kỳ công cụ AI nào có khả năng agent. Nó không phải một mô hình, không phải SaaS trình bày lưu trữ trên đám mây, cũng không thay thế PowerPoint. Quy trình cung cấp lập luận riêng cho trình bày, các hợp đồng và cổng chất lượng; các công cụ xác định lo chuyển đổi, kiểm chứng, đóng gói và các thao tác tệp lặp lại được; mô hình được chọn vẫn đặt trần chất lượng.

Sản phẩm chính là một bản nháp PowerPoint chất lượng cao mà người dùng có thể trình bày và tiếp tục tinh chỉnh, không phải bộ slide cuối đã niêm phong. Workspace mẫu tái sử dụng, nguồn dự án, đặc tả thiết kế, bản xem trước và sản phẩm kiểm chứng là các sản phẩm hỗ trợ hạng nhất vì chúng làm bộ slide đó kiểm soát được, tái lập được và tái sử dụng được.

## 2. Luận đề sản phẩm

Một bộ slide hữu ích có hai tầng: lập luận làm nó thuyết phục, và việc dựng PowerPoint làm kết quả dùng được. HugoPPTPilot sở hữu cả hai.

| Trục | Vị thế | Hệ quả sản phẩm |
|---|---|---|
| Logic trước | Chốt thông điệp cốt lõi, chế độ kể, dàn ý, thứ bậc và bằng chứng trước khi vẽ slide | Cấu trúc bộ slide được suy xét, không thừa kế mù quáng theo thứ tự nguồn |
| Độ sâu native | Chỉnh sửa được là điều tối thiểu; câu hỏi thật là kết quả thực sự chứa bao nhiêu PowerPoint | Soạn hoặc bảo toàn hình khối, chữ, ảnh, biểu đồ, bảng, slide master và layout, ghi chú, chuyển trang, hiệu ứng và hành vi gói PowerPoint thật nơi đường được chọn hỗ trợ |
| Chỉnh sửa trung thực | Đầu ra là bản nháp người dùng tiếp tục chỉnh, không phải ảnh phẳng và không phải lời hứa hoàn hảo một lần | Các đánh đổi giữa độ trung thực hình ảnh, đối tượng có dữ liệu, hiển thị đa ứng dụng và bảo toàn luôn tường minh |
| Người dùng kiểm soát | Quy trình, trạng thái dự án và đầu ra thuộc về người dùng | Chi phí minh bạch, dữ liệu ở lại máy trừ các lần gọi nhà cung cấp đã chọn, và không trình soạn thảo, mô hình hay nền tảng nào trở thành bắt buộc |

OOXML trực tiếp quá dài dòng và mong manh để làm ngôn ngữ soạn hình ảnh chung cho AI, còn ảnh phẳng thì vứt bỏ mô hình đối tượng native. Vì vậy HugoPPTPilot kết hợp việc soạn hình ảnh thân thiện với mô hình với biên dịch xác định và thao tác gói trực tiếp, chọn hợp đồng biến đổi khớp với ý định của người dùng.

Việc của dự án không chỉ là ghi một file `.pptx`. Đó là làm cho một agent AI đa dụng có năng lực và đáng tin cậy với công việc trình bày, đồng thời giữ cho người dùng khả năng kiểm tra, chỉnh sửa và làm chủ kết quả.

## 3. Người dùng mục tiêu và mô hình sử dụng

HugoPPTPilot chủ yếu dành cho những người:

- Có chủ đề, tài liệu, dữ liệu, tham chiếu hình ảnh, tài sản thương hiệu hoặc bộ slide có sẵn cần trở thành bài thuyết trình.
- Quan tâm đến logic của bộ slide và độ sâu chỉnh sửa PowerPoint của nó, không chỉ việc file mở được dưới dạng `.pptx`.
- Thích thiết kế nhất quán và bàn giao đáng tin cậy hơn là tạo tức thì.
- Cần quyền sở hữu dự án cục bộ, chi phí minh bạch và tự do chọn agent AI, mô hình và nhà cung cấp.
- Chấp nhận mô hình đặt trần và sẵn sàng rà soát hướng đi, hoàn thiện chặng cuối trong PowerPoint khi cần.
- Dùng được công cụ AI điều khiển bằng chat và môi trường Python cục bộ, dù không tự viết code.

HugoPPTPilot không được tối ưu cho người dùng chủ yếu cần tạo ngay trên trình duyệt không cài đặt, slide tức thì, đồng chỉnh sửa nhóm thời gian thực, hoặc bộ slide cuối được đảm bảo mà không cần phán đoán hay chỉnh sửa của con người.

## 4. Cam kết sản phẩm

| Cam kết | Ý nghĩa | Ranh giới |
|---|---|---|
| Độ sâu native | Soạn hoặc bảo toàn đối tượng PowerPoint thật, cấu trúc tái sử dụng và hành vi trình chiếu nơi đường được chọn hỗ trợ | Không bao giờ dùng ảnh chụp cả slide làm PPTX sinh ra chuẩn; ngữ nghĩa không hỗ trợ và đánh đổi gây mất mát phải tường minh |
| Logic trước bố cục | Suy xét thông điệp, mạch kể, thứ tự trang và thứ bậc thông tin trước khi soạn hình ảnh | Một đường có hợp đồng giữ nguyên câu chữ hay cấu trúc phải giữ lời hứa đó thay vì lặng lẽ đặt lại khung bộ slide |
| Bản nháp chỉnh sửa được chất lượng cao | Bỏ phần lớn công việc giữa tài liệu thô và bộ slide nhất quán, được thiết kế mà vẫn mở cho tinh chỉnh | Không hứa bản cuối hoàn hảo một lần; mô hình và phán đoán của người dùng vẫn quyết định trần |
| Trung thành với nguồn và ý định | Giữ phân biệt được dữ kiện có nguồn, quyết định của người dùng, khuyến nghị thiết kế và sản phẩm suy ra | Không bịa bằng chứng hay lặng lẽ hiểu yêu cầu bảo toàn thành thiết kế lại |
| Chi phí minh bạch, dễ dự đoán | Giữ HugoPPTPilot miễn phí và mã nguồn mở; người dùng chỉ trả cho AI và các nhà cung cấp tùy chọn mình chọn | Không thêm tín dụng độc quyền, phí theo người dùng hay tầng thuê bao nền tảng trình bày |
| Dữ liệu ở lại máy | Chuyển đổi, soạn, kiểm chứng và xuất ngay trên máy người dùng | Nhà cung cấp mô hình AI, tìm kiếm, ảnh và giọng nói vẫn có thể nhận đầu vào cần cho các lần gọi người dùng chọn |
| Không bị khóa nền tảng | Để mọi công cụ AI có khả năng agent và mô hình tương thích điều khiển quy trình, và giữ đầu ra di động | Không hứa chất lượng giống nhau giữa các mô hình hay hiển thị giống nhau giữa các ứng dụng trình chiếu |
| Độ tin cậy kỹ thuật | Dùng đường rõ ràng, hợp đồng bảo toàn, cổng kiểm chứng, kiểm tra đọc lại và trạng thái dự án khôi phục được | Không giấu lỗi sau các phương án dự phòng lặng lẽ hay phát hành sản phẩm vi phạm một cổng bắt buộc |
| Chất lượng hơn tốc độ | Ưu tiên sự nhất quán của bộ slide, khả năng chỉnh sửa native và độ tin cậy bàn giao hơn đầu ra nhanh nhất | Cải thiện hiệu suất nơi chất lượng còn nguyên; không đặt việc tạo song song chất lượng thấp làm mặc định |

## 5. Mô hình khả năng sản phẩm

Mô hình khả năng rộng hơn một quy trình tạo duy nhất, nhưng cố ý hẹp hơn một trợ lý văn phòng đa dụng.

| Miền khả năng | Trách nhiệm |
|---|---|
| Lập luận trình bày | Biến chủ đề hoặc gói nguồn thành thông điệp nhận biết khán giả, chế độ kể, dàn ý, kế hoạch trang và hướng thiết kế tường minh |
| Soạn trình bày native | Tạo hình ảnh slide mới và biên dịch chúng thành bộ PowerPoint thật, chỉnh sửa được ở dạng native |
| Thiết kế trình bày tái sử dụng | Chưng cất, tạo, kết hợp, kiểm chứng và áp dụng workspace Brand, Style, Layout và Deck |
| Điều chỉnh bộ slide có sẵn | Thiết kế lại bộ slide có sẵn, điền nội dung mới vào khung slide native, hoặc thêm hành vi native theo các hợp đồng bảo toàn riêng biệt |
| Biểu đạt PowerPoint | Dùng ảnh, sơ đồ, biểu đồ, bảng, công thức, ghi chú, thuyết minh, chuyển trang và hiệu ứng khi chúng phục vụ mục tiêu truyền đạt |
| Rà soát và bàn giao | Xem trước, kiểm tra, kiểm chứng, sửa, xuất, đọc lại và giữ đủ trạng thái dự án cục bộ để tinh chỉnh hoặc xuất lại về sau |

Đây là trách nhiệm sản phẩm, không phải lệnh buộc phải phơi mỗi trách nhiệm thành một đường cấp cao nhất hay một tệp quy trình riêng. Đường chỉ tồn tại khi đầu vào, quy tắc biến đổi, bất biến hoặc vòng đời đầu ra thực sự khác nhau.

## 6. Dự án sở hữu gì so với tích hợp gì

HugoPPTPilot có thể tích hợp các khả năng đa dụng mà không trở thành nền tảng đa dụng cho chúng.

| Lĩnh vực | HugoPPTPilot sở hữu | HugoPPTPilot không sở hữu |
|---|---|---|
| Nghiên cứu | Quyết định bộ slide cần bằng chứng gì, giữ nguồn gốc và biến phát hiện thành nội dung trình bày | Công cụ nghiên cứu web đa dụng cho các việc không liên quan đến trình bày |
| Hình ảnh | Quyết định có cần một ảnh không và sở hữu vai trò, phong cách, nguồn, vị trí đặt, nguồn gốc và mức sẵn sàng của nó | Nền tảng tạo ảnh hay quản lý ảnh đa dụng |
| Âm thanh | Sở hữu ghi chú người trình bày, chọn giọng trong bối cảnh trình bày, thuyết minh từng slide, thời gian và nhúng vào PowerPoint | Studio âm thanh đa dụng, nền tảng podcast hay chợ nhà cung cấp giọng nói |
| Trực quan hóa dữ liệu | Chọn hình thức trực quan, bảo toàn giá trị, kiểm chứng hình học và phơi bày đánh đổi giữa chỉnh sửa / độ trung thực | Sản phẩm business intelligence hay bảng tính đa dụng |
| Mẫu và thương hiệu | Định nghĩa nhận diện trình bày tái sử dụng, cấu trúc Master / Layout, slot, tài nguyên và hợp đồng bố cục | Khôi phục ý định thiết kế lịch sử vắng mặt trong file nguồn |
| Chỉnh sửa PowerPoint | Sở hữu việc tạo, điền, thiết kế lại và nâng cấp native có phạm vi dành riêng cho trình bày | Thay thế toàn bộ bề mặt chỉnh sửa của PowerPoint hay hỗ trợ biến đổi OOXML tùy ý |

Sự đa dạng nhà cung cấp có thể được đóng gói kèm để giữ tính mở và tiện dụng, nhưng hành vi riêng của từng nhà cung cấp nằm sau các ranh giới tích hợp ổn định. Quy trình trình bày sở hữu việc chọn lựa và ngữ nghĩa đầu ra; không nhà cung cấp riêng lẻ nào được định nghĩa lại ranh giới sản phẩm.

## 7. Chiến lược kỹ thuật ổn định

Kiến trúc kỹ thuật phục vụ định vị; nó không phải bản thân định vị.

- **SVG có ràng buộc → DrawingML** là đường soạn và biên dịch chính cho slide thiết kế mới: AI làm việc bằng ngôn ngữ hình ảnh thân thiện với mô hình, còn công cụ xác định dựng đối tượng PowerPoint native.
- **Thao tác OOXML trực tiếp** bảo toàn một gói PowerPoint có sẵn khi chính gói đó — chứ không phải một thiết kế hình ảnh được tạo lại — là sản phẩm người dùng muốn giữ.
- **Workspace mẫu** khai báo nhận diện thương hiệu tái sử dụng và, nếu áp dụng, cấu trúc Master / Layout, slot và tài nguyên trước khi soạn slide mới; cấu trúc không bị đoán sau khi đã xong.
- **Tệp phụ và giai đoạn cấp gói** sở hữu ghi chú, thuyết minh, chuyển trang, hiệu ứng và hành vi trình chiếu khác không thuộc về SVG trang tĩnh.
- **Sản phẩm dự án và cổng kiểm chứng** giữ cho quy trình kiểm tra được, tiếp tục được, kiểm thử được và an toàn để xuất lại.

Cách triển khai có thể tiến hóa, nhưng các bất biến này vẫn ổn định:

1. Không làm phẳng bộ slide sinh ra chuẩn thành một ảnh cho mỗi slide.
2. Giữ toàn bộ thiết kế trang nhìn thấy trong nguồn soạn đã khai báo của nó; không bịa hình ảnh còn thiếu khi xuất.
3. Làm tường minh các đánh đổi giữa khả năng chỉnh sửa native, độ trung thực hình ảnh, đối tượng có dữ liệu và bảo toàn.
4. Chọn hợp đồng soạn hoặc biến đổi trước khi thay đổi sản phẩm.
5. Giữ phân biệt được nguồn, sản phẩm đã soạn, sản phẩm suy ra và sản phẩm bàn giao.
6. Thất bại có kiểm soát khi ngữ nghĩa bắt buộc không thể biểu diễn an toàn; không tuyên bố độ trung thực không được hỗ trợ hay lặng lẽ thay bằng hành vi khác.

## 8. Điều không phải mục tiêu

HugoPPTPilot không định trở thành:

- Một SaaS trình duyệt tức thì, không cần cài đặt.
- Sự thay thế hoàn toàn tự động cho phán đoán trình bày của con người, hay hệ thống hứa một bộ slide cuối hoàn hảo trong một lần.
- Trợ lý văn phòng đa dụng, nền tảng nghiên cứu, nền tảng ảnh, nền tảng âm thanh hay chợ nhà cung cấp.
- Bản sao PowerPoint hoàn chỉnh, khung vẽ tự do đầy đủ trên trình duyệt, hay dịch vụ cộng tác thời gian thực.
- Dịch vụ chuyển đổi SVG-sang-PPTX tùy ý hay OOXML tùy ý.
- Hệ thống dựng lại ý định Master / Layout lịch sử còn thiếu từ một PPTX hoặc SVG đã hoàn thành.
- Công cụ nâng cấp tại chỗ ghép cấu trúc mẫu suy ra lên các file có sẵn.
- Một mặc định ưu tiên tốc độ toàn sản phẩm làm hy sinh sự nhất quán của bộ slide, khả năng chỉnh sửa native hay độ tin cậy bàn giao.

Những điều không phải mục tiêu này không cấm việc dùng nghiên cứu, ảnh, âm thanh, đối tượng native hay bộ slide có sẵn dành riêng cho trình bày. Chúng ngăn hạ tầng hỗ trợ trở thành một sản phẩm độc lập với lời hứa người dùng khác.

## 9. Phép thử chấp nhận và giảm bớt khả năng

Đánh giá mọi khả năng được đề xuất theo thứ tự này:

1. **Việc của người dùng** — Nó hoàn thành nhiệm vụ trình bày thật nào?
2. **Đóng góp cốt lõi** — Nó có làm sâu hơn đầu ra PowerPoint native, cải thiện lập luận trình bày, tăng cường quyền kiểm soát của người dùng hay làm bàn giao đáng tin cậy hơn không?
3. **Kết quả sở hữu** — Nó tạo ra hoặc bảo vệ sản phẩm trình bày, quyết định hay thuộc tính chất lượng nào?
4. **Bất biến** — Cái gì phải giữ nguyên, và cái gì được phép đổi?
5. **Tầng sản phẩm** — Nó là khả năng cốt lõi, phần mở rộng trình bày tích hợp, bộ chuyển đổi nhà cung cấp thay thế được, hay bảo trì repo?
6. **Kiểm chứng** — Thành công và thất bại có kiểm tra được mà không dựa vào tuyên bố mơ hồ không?
7. **Bằng chứng** — Có nhu cầu người dùng thật, quy trình lặp lại hoặc lỗi đã chứng minh để biện minh cho chi phí bảo trì không?

| Quyết định | Dùng khi |
|---|---|
| Thêm hoặc giữ làm cốt lõi | Khả năng trực tiếp thúc đẩy nhiệm vụ trình bày hoặc tăng cường độ sâu native, lập luận, quyền kiểm soát của người dùng hay độ tin cậy, và đòi hỏi hợp đồng hay kiểm chứng riêng cho trình bày |
| Giữ làm phần mở rộng tích hợp | Khả năng là tùy chọn, nhưng ngữ nghĩa lập kế hoạch và đầu ra của nó đặc thù cho trình bày |
| Đặt sau ranh giới tích hợp ổn định | Dịch vụ bên dưới là đa dụng hoặc riêng của nhà cung cấp, còn HugoPPTPilot sở hữu hợp đồng chọn lựa và đầu ra riêng cho trình bày |
| Chuyển sang công cụ của repo | Khả năng bảo trì repo, ví dụ, cài đặt hay quy trình đóng góp thay vì tạo bài thuyết trình |
| Gỡ bỏ | Nó trùng lặp thẩm quyền khác, không còn người dùng nào, đưa ra lời hứa không kiểm chứng được, hoặc thêm chi phí bảo trì nhiều hơn giá trị trình bày |

Số lượng tệp hay quy trình tự nó không phải lý do để thêm hay bỏ một khả năng. Yếu tố quyết định là quyền sở hữu và giá trị sản phẩm có rõ ràng hay không.

## 10. Kết quả kim chỉ nam

Một phiên HugoPPTPilot thành công nên trông như sau:

> Người dùng đưa cho một agent AI một chủ đề, tài liệu nguồn, tham chiếu thiết kế, mẫu tái sử dụng hoặc một PowerPoint có sẵn. AI lập luận cho mạch nội dung thành hình trước khi thiết kế, người dùng xác nhận các lựa chọn quan trọng, và quy trình trả về một PowerPoint nhất quán, đã được kiểm chứng, có khả năng chỉnh sửa native sâu, cùng đủ trạng thái dự án cục bộ để trình bày, tinh chỉnh, tái sử dụng hoặc xuất lại.

Công việc tương lai nên cải thiện kết quả này theo thứ tự ưu tiên sau:

1. Độ sâu native, tính đúng đắn của đầu ra và độ tin cậy bàn giao.
2. Lập luận nội dung, chất lượng mạch kể và sự nhất quán hình ảnh.
3. Tái sử dụng thương hiệu, phong cách, bố cục, bộ slide và tài sản PowerPoint có sẵn.
4. Con người rà soát, sửa và lặp có kiểm soát.
5. Định dạng, nhà cung cấp và tính năng tiện lợi bổ sung giúp củng cố bốn ưu tiên đầu.

## 11. Quan hệ với các tài liệu khác

| Tài liệu | Trách nhiệm |
|---|---|
| [`what-is-ppt.md`](./what-is-ppt.md) | Định nghĩa phương tiện trình bày, nhiệm vụ người dùng, vòng đời, mô hình đối tượng native, mẫu và các tầng chất lượng; tiền đề thượng nguồn của tài liệu này |
| Tài liệu này | Vị thế sản phẩm dài hạn, cam kết, ranh giới khả năng và phép thử chấp nhận |
| [`why-ppt-master.md`](./why-ppt-master.md) | Sự khác biệt hướng người dùng và lý do chọn dự án |
| [`technical-design.md`](./technical-design.md) | Kiến trúc hiện tại và các bất biến triển khai |
| [`workflows/routing.md`](../../skills/ppt-master/workflows/routing.md) | Việc chọn đường thực thi hiện tại |
| [`roadmap.md`](./roadmap.md) | Công việc đã giao, ưu tiên đang chạy và các hướng bị hoãn tường minh |
