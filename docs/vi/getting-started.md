# Bắt đầu

[English](./getting-started.md) | Tiếng Việt

---

Con đường ngắn nhất tới bộ slide đầu tiên, cách dùng mọi thứ xung quanh nó — mẫu, xem trước trực tiếp, hiệu ứng, thuyết minh, giọng nhân bản — và nơi tra cứu khi có sự cố. Các mục xếp gần đúng thứ tự bạn gặp trong một lần chạy thực tế. Mỗi mục là bản rút gọn; theo liên kết **Hướng dẫn đầy đủ →** để đi sâu.

- [Thiết lập thư mục cài đặt và làm việc](#thiết-lập-thư-mục-cài-đặt-và-làm-việc)
- [Bắt đầu từ một mẫu](#bắt-đầu-từ-một-mẫu)
- [Tạo bộ slide đầu tiên](#tạo-bộ-slide-đầu-tiên)
- [Chế độ Quick](#quick-mode)
- [Xem trước trực tiếp & chỉnh sửa trực quan](#xem-trước-trực-tiếp--chỉnh-sửa-trực-quan)
- [Hiệu ứng & chuyển trang](#hiệu-ứng--chuyển-trang)
- [Thuyết minh & video](#thuyết-minh--video)
- [Dùng giọng nhân bản](#dùng-giọng-nhân-bản)
- [Khi có sự cố](#khi-có-sự-cố)

> 🇻🇳 **Làm bộ slide tiếng Việt?** Hãy nói rõ ngôn ngữ trong yêu cầu ("viết toàn bộ bằng tiếng Việt") và xem [Hỗ trợ tiếng Việt](./vietnamese-support.md) về phông chữ, dấu chồng và giọng đọc.

---

## Thiết lập thư mục cài đặt và làm việc

Trước khi khởi động agent, hãy giữ ba thư mục này tách biệt:

| Thư mục | Là gì | Từ đâu ra |
|---|---|---|
| **Thư mục skill đã cài** | Gói HugoPPTPilot chứa `SKILL.md`, `requirements.txt`, các workflow và script | Khi clone toàn bộ repo hoặc dùng ZIP của repo, đây là `skills/ppt-master/`; cài qua marketplace/plugin hoặc ZIP chỉ chứa skill thì có vị trí cài/giải nén riêng |
| **Thư mục làm việc** | Thư mục ghi được, lâu dài, bạn mở trong agent | Với clone/ZIP toàn repo, thường là thư mục gốc repo; với cài chỉ skill, bạn tự chọn một thư mục — không nhất thiết là thư mục skill đã cài |
| **Dự án đang chạy** | Nguồn, SVG đã soạn, báo cáo, bản sao lưu và file xuất của một lần tạo | Agent khởi tạo trong `<thư-mục-làm-việc>/projects/<tên-dự-án-được-sinh>/` và báo đúng đường dẫn |

Mọi cách cài đều cần Python 3.10–3.14 và một agent host đã cài, đã đăng nhập, có thể đọc/ghi thư mục làm việc và chạy lệnh shell. Với clone/ZIP toàn repo, cài thư viện từ thư mục gốc repo:

```bash
python3 -m pip install -r requirements.txt
```

Với cài chỉ skill, trước hết tìm thư mục đã cài hoặc giải nén có chứa `SKILL.md` và `requirements.txt` của skill, rồi cài từ đường dẫn đó:

```bash
python3 -m pip install -r "<thư-mục-skill-đã-cài>/requirements.txt"
```

Sau khi cài, hãy khởi động agent trong **thư mục làm việc**, không phải trong bộ nhớ đệm skill do host quản lý. Điểm vào thực thi tự xác định skill đã cài. Các cách cài xem ở [Bắt đầu nhanh](../../README.md#bắt-đầu-nhanh); kỷ luật vận hành được định nghĩa trong [`SKILL.md`](../../skills/ppt-master/SKILL.md).

---

## Bắt đầu từ một mẫu

**Tùy chọn.** Mặc định HugoPPTPilot dùng **thiết kế tự do** — bạn không cần mẫu, có thể nhảy sang mục kế tiếp. Chỉ dùng mẫu khi bộ slide phải tái sử dụng nhận diện thương hiệu, một phương pháp truyền đạt/thiết kế, bộ bố cục cố định, hoặc một ứng dụng bộ slide lặp lại.

**Hai cách tái sử dụng một file `.pptx` có sẵn, tùy thứ bạn muốn nhận lại:**

| Bạn muốn… | Đường | Điều xảy ra |
|---|---|---|
| **Dùng nguyên các khung slide native của bộ này với nội dung mới** | Edit Native PPTX | Nhập thành workspace round-trip; trang không đổi được khôi phục đến từng byte, `page_plan.json` có thể chọn/sắp xếp lại/lặp/bỏ trang, và chỉ các trang đã lên kế hoạch mới được sửa. |
| **Xây một hệ thống thiết kế tái sử dụng rồi tạo bộ slide mới** | Create Template → Generate PPTX | Tạo workspace Brand, Style, Layout hoặc Deck đã được kiểm chứng từ tài liệu tham chiếu, rồi soạn bộ slide mới. Câu chuyện, cấu trúc và số trang mới có thể khác nguồn. |

Với cách thứ nhất, đưa AI file `.pptx` cùng tài liệu (hoặc chủ đề) và yêu cầu "điền bộ slide này bằng nội dung mới" — xem [quy trình Edit Native PPTX](../../skills/ppt-master/workflows/edit-native-pptx.md). Phần còn lại của mục này nói về create-template.

**Để xây workspace tái sử dụng từ một PowerPoint có sẵn, hãy yêu cầu rõ đường Create Template.** Một `.pptx` thô cộng tài liệu mới thì thuộc Edit Native PPTX; nó không phải workspace mẫu của Generate. Hãy tạo workspace trước:

```
Bạn: Tạo mẫu Deck tái sử dụng từ projects/brand/bo_slide_cua_chung_toi.pptx bằng /create-template
```

Create Template phân tích tài liệu tham chiếu, xác nhận kết quả là Brand, Style, Layout hay Deck, rồi soạn hoặc hiện thực hóa một workspace mới đã kiểm chứng. Bộ nhập cung cấp bằng chứng nguồn; workspace thư viện sở hữu `templates/design_spec.md`, còn thư mục gốc dự án dùng chung sở hữu `templates/design_spec.<kind>.<id>.md`, cùng các nguyên mẫu và tài nguyên mà loại đó cần. Brand và Style không có danh sách trang; Layout và Deck có các nguyên mẫu SVG có cấu trúc. Nếu muốn file PowerPoint để duyệt Layout hoặc Deck, chạy bước xuất xem trước tùy chọn; nó tạo `exports/<id>_template_preview.pptx` theo yêu cầu. Thư mục gốc workspace là thứ bạn trỏ tới khi tạo bộ slide.

Trong bản tóm tắt create-template, chọn `library` (mặc định hiện có) hoặc `project`. Cả hai đều cần `templates/` và dùng tùy chọn `images/`, `icons/` cùng `exports/` theo yêu cầu; thư mục tùy chọn rỗng sẽ bị bỏ. Phạm vi project cần một dự án đích đã khởi tạo; chỉ phạm vi library mới thêm đăng ký toàn cục.

Mẫu đã tạo nằm ở một trong hai nơi:

| Vị trí | Đường dẫn | Ghi chú |
|---|---|---|
| **Đăng ký trong thư viện skill** | `skills/ppt-master/templates/<kind>/<id>/` | Workspace di động cộng đăng ký toàn cục, nên xuất hiện khi bạn hỏi "có những mẫu nào?" |
| **Trong projects** | `projects/<tên>/` | Thư mục gốc spec đạt chuẩn dùng chung, không đăng ký toàn cục; cả bốn loại có thể cùng tồn tại, Layout được ưu tiên về cấu trúc hơn Deck |

Generate mặc định hiển thị lựa chọn mẫu ngay trong Giai đoạn 1, cạnh cam kết truyền đạt. Mẫu không bao giờ viết lại mục tiêu truyền đạt; các sự kiện về mẫu đã có trong ngữ cảnh, như loại và khung slide của một thư mục gốc chính xác, chỉ được dùng để gợi ý khung slide và khoảng số trang. Yêu cầu thông thường bắt đầu bằng thiết kế tự do; ý định dùng mẫu rõ ràng hoặc bất kỳ thư mục gốc chính xác nào sẽ bắt đầu ở chế độ mẫu, và bạn luôn có thể chuyển đổi. Để đưa thêm một kết quả khác vào lựa chọn, cung cấp **đường dẫn thư mục gốc workspace** chính xác trong chat: thư mục gốc chưa đăng ký sẽ hiện trong danh sách thả xuống "thư mục gốc chỉ định", còn khớp chính xác với mẫu đã đăng ký sẽ quay về danh sách theo loại. Chỉ đúng một thư mục gốc được cung cấp mới có thể được chọn sẵn; nhiều thư mục gốc vẫn là ứng viên chưa chọn. Mỗi loại chỉ xuất hiện một lần; Layout và Deck có thể cùng tồn tại, Layout quyết định cấu trúc. Thư mục gốc dự án nhiều loại được chọn nguyên khối. Một lần xác nhận đóng cả truyền đạt và lựa chọn mẫu. Chỉ sau đó các thư mục gốc đã chọn mới được kiểm chứng và cài; việc lập kế hoạch có nhận biết mẫu bắt đầu ở Giai đoạn 2 cuối. Một tên mẫu trống không không bao giờ được phân giải thành workspace. Một thư mục gốc dự án có thể được dự án khác dùng trực tiếp; chuyển một phần đóng góp vào thư viện sẽ đổi vị trí tên file spec và thêm đăng ký.

```
Bạn: Tạo bộ slide từ sources/bao-cao.pdf với mẫu skills/ppt-master/templates/layouts/presentation_core/
```

Hướng dẫn đầy đủ → [Hướng dẫn về mẫu](./templates-guide.md) (tiếng Anh)

---

## Tạo bộ slide đầu tiên

Khi môi trường và thư mục làm việc ở trên đã sẵn sàng, cả vòng lặp chỉ có ba bước:

1. **Đưa cho agent tài liệu nguồn nó đọc được** — PDF, DOCX, file Markdown, một URL, hoặc văn bản dán vào chat. Một thư mục như `<thư-mục-làm-việc>/inputs/` là đủ; bạn không cần tạo trước thư mục `projects/<tên>/` cuối cùng.
2. **Nói trong chat** cần biến gì thành bộ slide. [Bước 2 của Generate mặc định](../../skills/ppt-master/workflows/generate-pptx.md) hoặc [khởi tạo Quick](../../skills/ppt-master/workflows/profiles/quick-generate.md) tạo dự án đang chạy dưới thư mục `projects/` của thư mục làm việc và báo đúng đường dẫn. Tài liệu dạng file được nhập vào nếu có; văn bản dán nằm trong ngữ cảnh hội thoại và không cần nhập. Chế độ mặc định sau đó mở Giai đoạn 1 để xác nhận cam kết truyền đạt cùng với lựa chọn thiết kế tự do hoặc dùng mẫu; Quick bỏ qua các giai đoạn xác nhận đó. Với chế độ mặc định, thêm đúng một thư mục gốc workspace khi bạn muốn chế độ mẫu và chọn sẵn đường dẫn đó:
   ```
   Bạn: Tạo bộ slide tiếng Việt từ <đường-dẫn-bao-cao.pdf>
   Bạn: Biến văn bản này thành bộ slide tiếng Việt: <dán văn bản>
   ```
3. **Nhận file `.pptx` chỉnh sửa được** tại `<dự-án-đang-chạy>/exports/<tên-dự-án>_<thời-gian>.pptx` trừ khi bạn yêu cầu đường xuất khác. Với clone/ZIP toàn repo, thường là `<thư-mục-gốc-repo>/projects/<tên-dự-án-được-sinh>/exports/...`; với cài chỉ skill là `<thư-mục-làm-việc>/projects/<tên-dự-án-được-sinh>/exports/...`. Hãy dùng đúng đường dẫn dự án mà agent báo, đừng tìm một thư mục `exports/` ở gốc repo không có tiền tố.

Các thuật ngữ trong luồng đó không phải thư mục bổ sung bạn phải tự tạo. **Giai đoạn 1** xác nhận cam kết truyền đạt — mục đích, đối tượng, tình huống đọc, khung/định dạng — và lựa chọn thiết kế tự do/mẫu. **Thư mục gốc workspace** là thư mục gốc của một gói Brand, Style, Layout hoặc Deck tùy chọn tái sử dụng; nó không phải dự án đang chạy. AI cài workspace đã chọn, rồi **Giai đoạn 2** xác nhận số trang, hệ thống hình ảnh, cách áp dụng mẫu và các lựa chọn sản xuất. Từ đó nó lo phân tích nội dung, bố cục, lấy ảnh, tạo SVG và xuất file. Để bỏ qua xác nhận tương tác, xem [Chế độ Quick](#quick-mode) bên dưới.

---

<a id="quick-mode"></a>

## Chế độ Quick

Luồng mặc định chạy lựa chọn truyền đạt/mẫu gộp ở Giai đoạn 1 rồi tới Giai đoạn 2 cuối. Để bỏ qua tương tác đó, hãy yêu cầu rõ **tạo nhanh**:

```
Bạn: Tạo nhanh bộ slide từ sources/bao-cao.pdf bằng tiếng Việt — không cần hỏi lại tôi
Bạn: Biến cái này thành bộ slide, bỏ qua xác nhận, khoảng 8 trang, phong cách doanh nghiệp tối màu, tiếng Việt
```

**Điều gì bạn nêu rõ thì được làm theo; điều gì bạn bỏ ngỏ thì agent tự quyết, không quay lại hỏi.** Số trang và phong cách trong ví dụ thứ hai vẫn được giữ — chế độ nhanh bỏ vòng hỏi đáp chứ không bỏ quyền của bạn. Thay vì hiện thực ba hướng của chế độ mặc định, Quick thực thi thẳng hướng mà chế độ mặc định sẽ khuyên dùng: hướng phù hợp tổng thể nhất cho thiết kế tự do, hoặc hướng khả thi thể hiện đầy đủ nhất ngữ cảnh mẫu đã cài. Không nêu gì, agent quyết mọi thứ.

Chế độ Quick không bao giờ mở bộ chọn mẫu của Confirm UI. Đưa cho nó tối đa một thư mục gốc workspace Brand / Style / Layout / Deck chính xác cho mỗi loại, nó sẽ kiểm chứng, cài và dùng thẳng; không đưa thư mục gốc chính xác nào thì dùng thiết kế tự do. Một tên mẫu trống không hay một cụm từ phong cách vẫn chỉ là bản tóm tắt thiết kế. Quick giữ quy trình không khóa nhưng bảo toàn khả năng mẫu: thiết kế tự do và đầu ra chỉ Brand / Style vẫn phẳng, còn workspace Layout / Deck được cung cấp giữ siêu dữ liệu Master / Layout / slot tường minh trong các SVG đã soạn và biên dịch thành cấu trúc native tái sử dụng. Trước P01, agent đọc mọi SVG mẫu đã cài và chốt một đoạn mô tả cách áp dụng bằng ngôn ngữ tự nhiên trong ngữ cảnh hoạt động; không tạo tệp xác nhận/spec nào.

Nó không bỏ khả năng: chuyển đổi nguồn, tra cứu các khoảng trống dữ kiện đã nhận diện, hướng dẫn thẩm mỹ chung, chuẩn bị ảnh / biểu tượng, và soạn hình khối native / biểu đồ / bảng vẫn chạy khi cần. Công thức cấu trúc được soạn thẳng thành dấu hiệu PowerPoint native thay vì chuẩn bị thành ảnh. Thiếu tài nguyên thủ công đã được chọn rõ ràng hoặc phụ thuộc tệp không thể thay thế khác thì sẽ dừng chờ bạn cung cấp. Nếu việc tạo bằng AI tự động hoặc việc cắt phụ thuộc bắt buộc đã cạn, Quick loại bỏ các tác vụ lỗi và mục manifest cũ, lập lại kế hoạch bằng văn bản/SVG native chỉnh sửa được hoặc tài nguyên không phải AI đã chuẩn bị, tiếp tục cùng lần chạy và báo việc thay thế trong bàn giao cuối.

Quick là hồ sơ một lượt, không phải quy trình rút gọn có thể tiếp tục. Nó không tạo bản ghi Strategist, `design_spec.md`, `spec_lock.md` hay kế hoạch trang thay thế; các quyết định về nội dung/thiết kế/tài nguyên chỉ tồn tại trong ngữ cảnh AI đang chạy. Nếu ngữ cảnh đó mất trước khi bàn giao, hãy bắt đầu lại Quick. Manifest vận hành, báo cáo chất lượng, postflight và nhật ký kiểm toán Python lạnh có thể còn lại, nhưng không thể tái dựng lý do AI thiết kế bộ slide như vậy. Hồ sơ này giảm tương tác và việc lập kế hoạch lâu dài, không giảm bộ công cụ trình bày hay mức chất lượng mong muốn.

Hướng dẫn đầy đủ → [hồ sơ quick-generate](../../skills/ppt-master/workflows/profiles/quick-generate.md) (tiếng Anh)

---

## Xem trước trực tiếp & chỉnh sửa trực quan

Trình duyệt xem trước mở tại URL mà bộ khởi chạy báo trong khi bộ slide đang được tạo. Nó ưu tiên `http://localhost:5050` và dùng cổng trống kế tiếp nếu `5050` đang bận.

- **Xem các trang hiển thị trực tiếp** ngay khi AI tạo ra.
- **Sửa trực tiếp, không cần AI** — chọn một phần tử để đổi chữ, màu, phông hay cỡ ở bảng bên; kéo để đổi vị trí, hoặc nhích bằng phím mũi tên (`Shift` = 10px). `Ctrl+Z` hoàn tác. Chỉnh sửa hiển thị tức thì và ghi vào `svg_output/` khi bạn nhấn **Apply changes**.
- **Hoặc chú thích cho AI** — nhấp một phần tử, gõ điều muốn đổi, nhấn **Add annotation** để xếp hàng, rồi nhấn **Apply changes** để ghi các dấu chú thích vào `svg_output/`. Quay lại chat và nói "áp dụng các chú thích của tôi"; AI viết lại vùng đó và xuất lại PPTX.

HugoPPTPilot ban đầu chỉ dùng chat; chỉnh sửa trực quan được thêm sau khi đủ người dùng đề nghị.

Hướng dẫn đầy đủ → [Giai đoạn xem trước trực tiếp](../../skills/ppt-master/workflows/stages/live-preview.md) (tiếng Anh)

---

## Hiệu ứng & chuyển trang

Bộ slide xuất ra mang theo hiệu ứng chuyển trang và (tùy chọn) hiệu ứng từng phần tử dưới dạng OOXML thật — không phải video nhúng. Mặc định là chuyển trang `fade` và **không có hiệu ứng phần tử**; bật bằng `-a auto`, một trong 203 preset native `entrance_*` / `emphasis_*` / `path_*` / `exit_*`, hoặc một tệp phụ `animations.json`. 29 tên ngắn cũ chỉ còn được chấp nhận làm đầu vào tương thích; lựa chọn hiệu ứng mới dùng tên có tiền tố chuẩn.

Cài đặt hiệu ứng rất nghiêm ngặt: hiệu ứng hoặc chế độ Start không xác định, giá trị thời gian không hợp lệ và đích tệp phụ bị thiếu sẽ báo lỗi thay vì lặng lẽ biến thành hiệu ứng khác. Trước khi kết quả thay thế đầu ra hiện có, HugoPPTPilot đọc lại gói ứng viên và kiểm tra vị trí timing, ID, đích hình khối, hiệu ứng, thời lượng và chế độ Start. Microsoft PowerPoint là đích kiểm chứng chuyển động chính; ứng dụng trình chiếu khác có thể mở PPTX nhưng ánh xạ từng hiệu ứng có thể khác.

Hướng dẫn đầy đủ → [Hiệu ứng & chuyển trang](./animations.md) (tiếng Anh)

---

## Thuyết minh & video

Biến ghi chú người trình bày thành giọng thuyết minh cho từng slide, nhúng âm thanh trở lại PPTX, và để PowerPoint xuất bộ slide thành video MP4 đồng bộ thuyết minh — không cần công cụ bên thứ ba.

```
Bạn: Tạo thuyết minh cho bộ slide này và xuất lại với âm thanh nhúng.
Bạn: Tạo âm thanh thuyết minh bằng giọng tiếng Việt cho bộ slide này
```

Thuyết minh mặc định dùng `edge-tts` (khoảng 90 ngôn ngữ/vùng); các nhà cung cấp đám mây tùy chọn cho giọng chất lượng cao hơn. AI gợi ý một giọng phù hợp ngôn ngữ của bộ slide và hỏi một lần trước khi tạo. Với tiếng Việt có sẵn `vi-VN-HoaiMyNeural` (nữ) và `vi-VN-NamMinhNeural` (nam) — xem [Hỗ trợ tiếng Việt](./vietnamese-support.md#6-thuyết-minh-giọng-đọc-tts).

Hướng dẫn đầy đủ → [Thuyết minh & xuất video](./audio-narration.md) (tiếng Anh)

---

## Dùng giọng nhân bản

Mang giọng nhân bản của riêng bạn từ ElevenLabs / MiniMax / Qwen / CosyVoice để toàn bộ bộ slide được thuyết minh bằng giọng *của bạn* (hoặc của người trình bày, khi có sự cho phép). Nhân bản một lần trong bảng điều khiển của nhà cung cấp, rồi truyền `voice_id` — HugoPPTPilot đọc ghi chú của mọi slide bằng giọng đó và nhúng kết quả trở lại PPTX.

Hướng dẫn đầy đủ → [Dùng giọng nhân bản](./audio-narration.md#use-a-cloned-voice) (tiếng Anh)

---

## Khi có sự cố

[FAQ](./faq.md) là tài liệu xử lý sự cố luôn được cập nhật từ phản hồi thực tế. Gợi ý nhanh cho các tình huống phổ biến:

| Tình huống | Thử trước tiên |
|---|---|
| AI lạc hướng hoặc quên một bước | Bảo nó đọc lại `skills/ppt-master/SKILL.md`, `skills/ppt-master/workflows/routing.md` và tài liệu của đường đã chọn. |
| Chất lượng hình ảnh chưa như ý | Chuyển sang mô hình Claude ngữ cảnh lớn + `gpt-image-2.5-sunburst` — harness đặt sàn, mô hình đặt trần. |
| Chữ tràn hoặc các phần tử chồng nhau | Chạy lại trang đó, hoặc sửa trong xem trước trực tiếp; xem [FAQ](./faq.md). |
| Chữ Việt mất dấu hoặc dấu lệch trong PowerPoint | Đổi sang phông Office-safe có đủ dấu (Segoe UI, Arial, Calibri…), chuẩn hóa văn bản về NFC; xem [Hỗ trợ tiếng Việt](./vietnamese-support.md). |
| Không có khóa API tạo ảnh | Dùng công cụ ảnh gốc của host nếu có; nếu không, tìm ảnh web không cấu hình vẫn chạy. Xem [FAQ](./faq.md). |
| Hiệu ứng hoặc vài hiệu ứng lạ trên ứng dụng khác | Microsoft PowerPoint là đích kiểm chứng chuyển động chính. Keynote / WPS / LibreOffice mở được `.pptx` nhưng có thể ánh xạ lại hoặc bỏ qua từng hiệu ứng hay ngữ nghĩa Start; hãy kiểm chứng bản giao có chuyển động quan trọng trong PowerPoint. |
| Bộ slide dài có thể tràn cửa sổ ngữ cảnh | Việc tạo có thể chạy ở chế độ tách bước; chi tiết trong [FAQ](./faq.md). |

Về chọn mô hình, chi phí, khả năng chỉnh sửa biểu đồ, mẫu tùy chỉnh và hơn thế, hãy xem [FAQ](./faq.md).
