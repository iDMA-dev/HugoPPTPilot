# FAQ (Hỏi đáp)

[English](./faq.md) | Tiếng Việt

---

> Bản dịch tiếng Việt của [FAQ gốc](./faq.md). Các liên kết tới tài liệu kỹ thuật chưa dịch (`SKILL.md`, `references/`, `workflows/`, `animations.md`, …) dẫn tới bản tiếng Anh, vì đó là tài liệu vận hành cho AI hoặc chuyên sâu. Câu hỏi riêng về tiếng Việt xem [Hỗ trợ tiếng Việt](./vietnamese-support.md).

## H: HugoPPTPilot chấp nhận những định dạng nguồn nào?

Gần như mọi thứ: **PDF**, **DOCX**, **PPTX**, **EPUB**, **HTML**, **LaTeX**, **RST**, **URL** (kể cả bài viết WeChat), **Markdown**, hoặc chỉ là văn bản dán vào cuộc trò chuyện. Agent AI tự động chuyển tài liệu nguồn của bạn sang Markdown trước khi tạo slide.

## H: Ảnh nhúng trong DOCX được xử lý thế nào?

Khi chuyển đổi DOCX, ảnh nhúng được trích vào một thư mục tài nguyên đi kèm và ghi vào một manifest ảnh; khi nguồn cung cấp thông tin, bản ghi đó gồm kích thước hiển thị, kích thước điểm ảnh và tỷ lệ khung. Bước nhập dự án làm các tài nguyên đi kèm này khả dụng cho dự án đang chạy. Khâu lập kế hoạch dùng vị trí trong nguồn, văn bản xung quanh, chú thích, văn bản thay thế, tên file và hình học để quyết định có dùng một ảnh đã trích hay không; nó không bắt buộc phải xem hay dùng mọi ảnh đã trích. Một ảnh được chọn có thể hiển thị nguyên vẹn hoặc đặt với phần cắt giữ được trọng tâm. Việc trích xuất và đăng ký **không** có nghĩa là ảnh được tạo lại.

Xem [hợp đồng đầu ra chuyển đổi nguồn](../../skills/ppt-master/scripts/docs/conversion.md) về tài nguyên đi kèm, và [hợp đồng lập kế hoạch ảnh](../../skills/ppt-master/references/strategist-image.md) về bằng chứng chọn ảnh và hình học.

## H: HugoPPTPilot có thể vẽ lại hàng loạt mọi ảnh trong DOCX về một tỷ lệ và một phong cách không?

Không. Hiện chưa có đường Generate nào hướng tới người dùng để vẽ lại theo tham chiếu mọi ảnh nhúng trong DOCX theo lô và tự động thay thế bản gốc. Chế độ manifest có thể chạy theo lô các tác vụ ảnh **mới** từ prompt, nhưng tính năng chỉnh sửa `--reference-image` của CLI tích hợp là một đường hẹp cho từng ảnh, không phải chế độ manifest, và chỉ có ở các backend ảnh được hỗ trợ. Hồ sơ Image to PPTX cũng không lấp khoảng trống này: nó áp dụng khi đầu vào raster đại diện cho cả trang slide cần dựng lại, không phải khi ảnh chụp hay minh họa thông thường là tài nguyên nguồn trong tài liệu Word.

Các ranh giới này được định nghĩa bởi [hợp đồng tạo ảnh](../../skills/ppt-master/references/image-generator.md), [Bước 5 của Generate](../../skills/ppt-master/workflows/generate-pptx.md) và [hồ sơ Image to PPTX](../../skills/ppt-master/workflows/profiles/image-to-pptx.md).

## H: Khác nhau giữa cắt ảnh và tạo ảnh theo một tỷ lệ yêu cầu là gì?

Chúng thay đổi những thứ khác nhau. `crop=adaptive` cho phép nhưng không bao giờ bắt buộc phải cắt. Executor có thể dùng `meet` để hiển thị nguyên ảnh nguồn hoặc `slice` giữ trọng tâm để lấp đầy khung chứa; cả hai đều dùng lại điểm ảnh nguồn. `aspect_ratio` của một tác vụ AI yêu cầu một khung vẽ mới được tạo với bất kỳ tỷ lệ `W:H` nào; backend xuất kích thước gần nhất mà mô hình của nó cho phép, và khi đặt vào slide sẽ cắt về đúng hình dạng yêu cầu. Chỉnh sửa theo tham chiếu biến đổi một ảnh được cung cấp qua đường đơn ảnh riêng; đó không phải thao tác theo lô của manifest. Xem [quy tắc danh sách tài nguyên ảnh](../../skills/ppt-master/references/strategist-image.md), [chính sách cắt của Executor](../../skills/ppt-master/references/executor-image.md), [hợp đồng đặt ảnh SVG](../../skills/ppt-master/references/svg-image-embedding.md) và [lược đồ manifest ảnh](../../skills/ppt-master/references/image-generator.md).

## H: Tôi có thể tạo bộ slide chỉ với một chủ đề, không có tài liệu nguồn không?

Có. Hãy nói cho AI chủ đề hoặc tình huống của bạn (ví dụ "làm PPT về Hayao Miyazaki", "giới thiệu sản phẩm mới của chúng tôi"). Đường Generate PPTX sẽ chạy **giai đoạn nghiên cứu chủ đề** để thu thập nền dữ kiện và nguồn gốc cần cho việc lập kế hoạch. Nếu bạn cung cấp một phần tài liệu, cùng giai đoạn đó có thể chỉ bù những khoảng trống dữ kiện mà kết quả bạn yêu cầu cần đến, trừ khi bạn yêu cầu kết quả chỉ dựa trên nguồn. Bước nhập dự án không tải hàng loạt các URL trang web đã chọn được ghi trong nguồn gốc. Sau khi tìm ảnh thông thường thất bại, có thể tải một trang liên quan cùng ảnh đi kèm để xem xét, và chỉ các file được chọn mới vào kho ảnh của bộ slide.

Chất lượng phụ thuộc vào những gì có trên web mở. Nếu bạn đã có tài liệu chuyên ngành (bài báo, tài liệu nội bộ), đưa thẳng các file đó cho AI sẽ cho kết quả tốt hơn so với chỉ nghiên cứu web.

## H: HugoPPTPilot có tạo được định dạng nào khác ngoài PowerPoint không?

Có. Ngoài các định dạng trình chiếu chuẩn **16:9** và **4:3**, HugoPPTPilot hỗ trợ sẵn các định dạng mạng xã hội và tiếp thị:

| Định dạng | Trường hợp dùng |
|--------|----------|
| Xiaohongshu (RED) 3:4 | Chia sẻ ảnh-chữ, bài kiến thức |
| WeChat Moments / IG 1:1 | Poster vuông, giới thiệu thương hiệu |
| Story / TikTok 9:16 | Story dọc, ảnh bìa video ngắn |
| Ảnh đầu bài WeChat | Ảnh bìa bài viết WeChat |
| A4 in ấn | Poster in, tờ rơi |

Khi khung slide khớp chính xác một định dạng đã đăng ký, hãy truyền khóa đó lúc khởi tạo (ví dụ `--format xhs`). Với mọi khung khác, bỏ `--format`; Default Generate ghi viewBox đã xác nhận vào `spec_lock.md`, còn Quick Generate lấy SVG đầu tiên làm căn cứ khung. Đầu ra vẫn là một file `.pptx` chứa các hình khối native.

## H: Những công cụ AI nào dùng được với HugoPPTPilot?

HugoPPTPilot chạy trong mọi công cụ AI có khả năng agent, đọc được file và chạy được lệnh shell — **Claude Code** (CLI / VS Code / JetBrains / Web), **VS Code Copilot**, **Codex** và các công cụ khác. Việc cài đặt và xác thực do host đã chọn xử lý; [hướng dẫn Bắt đầu](./getting-started.md) định nghĩa mô hình thư mục làm việc dùng sau khi cài.

## H: Tôi tải một bản cũ. Làm sao cập nhật lên bản mới nhất?

Tùy cách bạn đã cài HugoPPTPilot:

| Cách cài | Cách cập nhật |
|---|---|
| Git clone | Chạy `python3 skills/ppt-master/scripts/update_repo.py` trong thư mục `ppt-master` |
| Tải ZIP | Tải ZIP mới nhất, giải nén vào thư mục mới, chép `.env` và thư mục `projects/` cũ sang thư mục mới, rồi chạy `pip install -r requirements.txt` |
| Skill marketplace | Cài lại hoặc cập nhật qua công cụ marketplace / skills tương ứng |

Để dùng lâu dài nên dùng Git clone. ZIP thích hợp để dùng thử nhanh, nhưng không có lịch sử Git và không chạy được `git pull`.

Nếu không chắc mình đã cài bằng cách nào, hãy nhờ AI chạy lệnh này từ thư mục dự án:

```bash
python3 skills/ppt-master/scripts/update_repo.py
```

Nếu thư mục không phải bản Git clone, script sẽ hướng dẫn cách di chuyển từ bản cài ZIP.

## H: Tôi cài từ skill marketplace. Cần điều kiện tiên quyết và thư mục làm việc nào?

Mọi đường cài đều cần Python 3.10–3.14 và một agent host đã cài, đã xác thực, có thể đọc/ghi file và chạy lệnh shell.

Thư mục skill đã cài và thư mục làm việc của bạn là hai vai trò khác nhau. Hãy cài thư viện Python từ thư mục chứa `SKILL.md` và `requirements.txt` của skill đã cài, nhưng khởi động agent trong một thư mục làm việc riêng, lâu dài, ghi được do bạn chọn. Agent tạo thư mục `projects/` của nó khi cần; bạn không cần chạy từ bộ nhớ đệm skill do host quản lý. Xem [Bắt đầu: Thiết lập thư mục cài đặt và làm việc](./getting-started.md#thiết-lập-thư-mục-cài-đặt-và-làm-việc) và [điểm vào thực thi](../../skills/ppt-master/SKILL.md) của skill.

## H: Làm sao chạy cùng bước kiểm tra cài đặt tối thiểu trên macOS hoặc Linux?

Sau khi cài thư viện Python, chạy cùng phép kiểm tra import cốt lõi dùng trong hướng dẫn Windows:

```bash
python3 -c "import pptx; import fitz; print('All core dependencies OK')"
```

Sau đó nhờ agent tạo bộ slide "Hello World" 3 trang ở chế độ Quick, không có file nguồn. Lệnh import kiểm tra các gói Python cốt lõi; lần chạy Quick kiểm tra cùng lúc việc khởi tạo dự án, soạn SVG, kiểm chứng và xuất file. Thành công nghĩa là một PPTX xuất hiện trong thư mục `exports/` của dự án đang chạy và file mở được trong một ứng dụng trình chiếu. Xem [bài kiểm tra nhanh trên Windows](./windows-installation.md) và [hồ sơ Quick](../../skills/ppt-master/workflows/profiles/quick-generate.md).

## H: Tôi có phải tự tạo `projects/<tên>` không, và thư mục `exports/` nào chứa bộ slide của tôi?

Không. Trong một lần chạy do agent điều khiển, Bước 2 của Default Generate hoặc khởi tạo Quick tạo dự án đang chạy, thường dưới `<thư-mục-làm-việc>/projects/<tên-dự-án-được-sinh>/`, và báo đúng đường dẫn. Với đường xuất mặc định, bộ slide thuộc dự án đó:

```text
<dự-án-đang-chạy>/exports/<tên-dự-án>_<thời-gian>.pptx
```

Đó không phải một thư mục `exports/` trơ trọi ở gốc repo. Đường xuất do bạn chỉ định rõ là ngoại lệ. Xem [khởi tạo dự án và xuất của Generate](../../skills/ppt-master/workflows/generate-pptx.md), [hồ sơ Quick](../../skills/ppt-master/workflows/profiles/quick-generate.md) và [giải thích về thư mục làm việc](./getting-started.md#thiết-lập-thư-mục-cài-đặt-và-làm-việc).

## H: Tôi có thể dùng ảnh do AI tạo trong bài thuyết trình không?

Có. Khi agent host cung cấp công cụ tạo ảnh gốc, HugoPPTPilot có thể dùng nó mà không cần khóa API tạo ảnh riêng của nhà cung cấp. Nó cũng có thể dùng `image_gen.py` tích hợp qua một nhà cung cấp đã cấu hình. Chọn "Tạo bằng AI" cho cách làm ảnh; bạn có thể yêu cầu rõ agent dùng công cụ ảnh của chính nó. Bạn cũng có thể đặt ảnh của mình vào thư mục `images/` của dự án.

## H: Sao không có biểu tượng (icon)? Có phải mỗi slide đều phải có icon không?

Không yêu cầu phủ icon cho từng slide. Ở chế độ Default, `No base icons` (không dùng icon cơ sở) là một lựa chọn hợp lệ đã xác nhận, bên cạnh emoji, icon SVG tích hợp và icon tùy chỉnh của dự án. `icons.inventory` của Default chỉ lập chỉ mục kho đã chuẩn bị được tuyển chọn mà không gán icon cho trang. Cả hai hồ sơ đều có thể dùng icon đã chuẩn bị trong dự án; Quick không tạo danh sách tài nguyên chung lẫn việc gán icon-cho-trang. Người soạn chỉ dùng icon khi nó phục vụ nhiệm vụ truyền đạt của trang đó, nên một bộ slide hay một trang có thể không dùng icon nào. Các lát icon minh họa do AI tạo là tài nguyên ảnh theo đường riêng và cũng là tùy chọn.

Xem [lựa chọn icon của Strategist](../../skills/ppt-master/references/strategist.md), [cách dùng icon của Executor](../../skills/ppt-master/references/executor-base.md) và [chuẩn bị tài nguyên của Quick](../../skills/ppt-master/workflows/profiles/quick-generate.md).

## H: Tôi không có khóa API tạo ảnh — vẫn có ảnh được không?

Có. Nếu agent host có tạo ảnh gốc, hãy chọn "Tạo bằng AI" và nhờ nó dùng công cụ ảnh của chính nó; cách này không cần khóa API ảnh của nhà cung cấp. Nếu không, chọn "Lấy từ web" ở bước Image Usage của Strategist. HugoPPTPilot có sẵn `image_search.py` không cần cấu hình, tìm ảnh có giấy phép mở trên Openverse và Wikimedia Commons. Tìm không cấu hình là phương án dự phòng: dùng được ngay nhưng chất lượng có thể không đồng đều vì nhiều kết quả là ảnh người dùng tải lên thông thường.

Để có ảnh stock hiện đại tốt hơn, đặt `PEXELS_API_KEY` và/hoặc `PIXABAY_API_KEY` trong `.env` (cả hai đều miễn phí). Việc tìm kiếm sẽ tự động gồm Pexels / Pixabay, thường cải thiện ảnh con người, nơi làm việc, đời sống, sản phẩm và minh họa. Bạn có thể trộn các đường trong cùng một bộ slide (ví dụ AI cho minh họa chính, web cho ảnh đội ngũ). Nếu ảnh được chọn yêu cầu ghi công, Executor thêm một dòng ghi công nhỏ trên slide liên quan.

Hãy hiểu đúng điều này mang lại gì: **tìm ảnh web chỉ tìm được *một* ảnh liên quan, tải được và sạch giấy phép — không đảm bảo ảnh đó tốt hay phù hợp với trang**, vì thứ hạng chỉ nhìn siêu dữ liệu văn bản, không nhìn bức ảnh. Trong lúc tạo, một mô hình đa phương thức xem ảnh thu nhỏ để kiểm tra sơ bộ và tìm lại khi ảnh không hợp, nhưng **cách đáng tin cậy nhất để có chất lượng cao là tự tìm**: tìm một ảnh tốt hơn ở bất kỳ đâu, đưa URL cho AI, và nó tải về rồi thay vào bằng `image_search.py --from-url <url>` (được ghi là nguồn thủ công; bản quyền bạn tự chịu trách nhiệm xác minh). Việc thay có thể diễn ra bất cứ lúc nào — giữa lúc tạo hoặc từ xem trước trực tiếp — mà không cần dừng lần chạy. Tóm lại: coi tìm ảnh web là phương án dự phòng tạm thời và chọn tay là bước hoàn thiện.

## H: Có thể biến mockup hoặc ảnh chụp màn hình slide do AI tạo thành slide PowerPoint chỉnh sửa được không?

Có. Cung cấp một hoặc nhiều ảnh và yêu cầu dựng lại các trang được thể hiện thành PPTX chỉnh sửa được; HugoPPTPilot chuyển yêu cầu đó vào hồ sơ **Image to PPTX** ([`image-to-pptx`](../../skills/ppt-master/workflows/profiles/image-to-pptx.md)). Hiện hồ sơ này yêu cầu Codex. Các agent host khác chưa được điều chỉnh cho hồ sơ này, nên hành vi của chúng không được hỗ trợ hay cam kết. Image to PPTX luôn kích hoạt Quick; bạn không cần yêu cầu Quick riêng. Trước hết nó chuẩn hóa mọi đầu vào thành một danh sách khung trang có thứ tự, nên số slide theo số trang được thể hiện chứ không theo số file.

Văn bản thông thường nhìn thấy được dựng lại thành văn bản native chỉnh sửa được. Logo, icon, huy hiệu và đồ họa trang trí dùng trực tiếp nguồn khi nó đủ tốt; khi độ phân giải quá thấp, Codex có thể dựng lại từ tham chiếu, nhưng danh tính, hình bóng, tỷ lệ, màu sắc và chữ thương hiệu phải giữ cố định, và cấm dùng một bản thay thế chỉ giống. Biểu đồ, bảng và đồ họa dữ liệu không bao giờ được dựng lại bằng cách tạo sinh: chúng phải là đối tượng native có giá trị kiểm chứng được, tài nguyên nguồn chính xác, hoặc được đánh dấu `manual_required`. Cảnh ảnh chụp và minh họa được dựng lại thành ít nhất một lớp nền sạch cộng các lớp chủ thể hoặc tiền cảnh. Nhiều đối tượng không chồng lấn có khung bao đã đệm có thể dùng chung một tấm nền được tạo rồi trở thành các đối tượng ảnh PowerPoint độc lập qua cắt lưới hoặc cắt theo khung bao SVG. AI có thể dựng lại điểm ảnh bị che bởi các lớp đã tách, nhưng không được thiết kế lại bố cục nhìn thấy. Một "lớp da" ảnh chụp cả slide phủ vài lớp chữ chỉnh sửa tượng trưng không được tính là dựng lại.

## H: Tôi có thể chỉnh sửa các bài thuyết trình đã tạo không?

Có. Bộ chuyển đổi PPTX duy nhất trong đường SVG là phép chuyển `svg_output/` → DrawingML của chính HugoPPTPilot. Nó lưu một bộ PowerPoint native có đóng dấu thời gian vào `exports/` của dự án đang chạy, với chữ, đồ họa và màu sắc chỉnh sửa trực tiếp được như các đối tượng PowerPoint. Với đường xuất mặc định, cả Default Generate lẫn Quick Generate sao chép `svg_output/` đã soạn vào `backup/<timestamp>/svg_output/`, nên cùng bộ slide đó có thể xuất lại mà không cần chạy lại LLM. Với Quick, đây là việc dựng lại gói, không phải bản ghi khôi phục được các quyết định thiết kế của AI.

`finalize_svg.py` vẫn là thao tác Bước 7 bắt buộc trong luồng Generate mặc định, dù việc xuất PPTX native đọc `svg_output/`. Nó tạo các file khép kín trong `svg_final/` để kiểm tra bằng mắt và để chèn thủ công vào bộ slide khác dưới dạng ảnh SVG. Hồ sơ quick-generate tường minh bỏ qua sản phẩm xem trước này, nhưng vẫn giữ báo cáo postflight thông thường và bản sao lưu ở đường mặc định sau bước kiểm tra chất lượng cuối không khóa. Lệnh **Convert to Shape** thủ công của PowerPoint không phải đường round-trip được hỗ trợ; hãy dùng PPTX native đã tạo khi bạn cần hình khối chỉnh sửa được.

## H: Văn bản nhiều dòng được xuất thế nào? PowerPoint có tự ngắt dòng lại được không?

Mặc định, một khối nhiều dòng có thể gộp được xuất thành một khung văn bản PowerPoint chỉnh sửa được. Các ngắt dòng do tác giả đặt được giữ lại và tính năng tự ngắt dòng của PowerPoint bị tắt, nên đổi cỡ khung không viết lại bố cục dòng đã soạn. Một khung thông thường do hệ thống tạo dùng hành vi **Resize shape to fit text** gốc của PowerPoint: xóa một ngắt dòng được giữ sẽ làm khung giãn ra thay vì để chữ tràn ngoài. Khung nhập khẩu chính xác và các thẻ giữ chỗ nhiều dòng có cấu trúc giữ hành vi kích thước cố định.

Để PowerPoint tự ngắt dòng lại với phần nội dung đủ điều kiện, dùng `--reflow-text`:

```bash
python3 skills/ppt-master/scripts/svg_to_pptx.py <project_path> --reflow-text
```

Chế độ này khôi phục việc tự ngắt dòng theo đoạn và có thể làm đổi số dòng. Cờ cũ `--merge-paragraphs` là bí danh tương thích của `--reflow-text`.

Chỉ dùng `--no-merge` khi mỗi dòng nhìn thấy phải là một khung văn bản PowerPoint độc lập:

```bash
python3 skills/ppt-master/scripts/svg_to_pptx.py <project_path> --no-merge
```

Chế độ đó giữ vị trí đối tượng độc lập cho từng dòng, nhưng một đoạn 12 dòng sẽ thành 12 hộp văn bản. Khi trò chuyện với AI, hãy yêu cầu "tự ngắt dòng lại văn bản" hoặc "một hộp văn bản độc lập cho mỗi dòng hiển thị" để chọn chế độ xuất tương ứng.

> 🇻🇳 Với tiếng Việt, `--reflow-text` ngắt dòng theo dấu cách giữa các âm tiết, nên một cụm như "chuyển đổi số" có thể bị tách ở cuối dòng. Xem mẹo dùng dấu cách không ngắt ở [Hỗ trợ tiếng Việt](./vietnamese-support.md#5-ngắt-dòng).

## H: Sao cỡ chữ tính bằng px chứ không phải pt? Chúng có đổi khi xuất không?

HugoPPTPilot làm việc bằng **px không đơn vị từ đầu đến cuối** — trang xác nhận, `spec_lock.md` và SVG đều mang px; không có tầng pt nào. Khung SVG đúng nghĩa là 1280×720 px, nên px là đơn vị bố cục / thực thi thật, và giữ một đơn vị duy nhất tránh được sai lệch cỡ chữ khi một giá trị "được xác nhận là 20pt" nhưng được viết vào SVG bằng một con số khác.

PowerPoint hiển thị pt, nên việc **xuất** tự động đổi px → pt (`pt = px × 0.75`, giữ một chữ số thập phân). Ví dụ nội dung `24px` thành `18pt`, tiêu đề `42px` thành `31.5pt`. Vì vậy một giá trị không nguyên như `13.5pt` hay `31.5pt` trong PowerPoint là **bình thường và có chủ đích**, không phải lỗi — cỡ chữ là bất kể px quy đổi ra bao nhiêu, không còn bị ép vào số nguyên hay nửa điểm.

Cỡ chữ nội dung cơ sở là một giá trị cố định theo từng **chế độ đọc** (không phải một khoảng). Nó điều khiển khoảng cách đọc và mật độ; tách biệt với ý định truyền đạt mở:

| Chế độ đọc | Nội dung (px) | ≈ pt khi xuất |
|---|---|---|
| `text` (đọc gần: báo cáo / tài liệu để lại) | 20px | 15pt |
| `balanced` (mặc định: roadshow / rà soát) | 24px | 18pt |
| `presentation` (trình chiếu / ra mắt) | 32px | 24pt |

Tiêu đề, phụ đề, chú thích cuối và các vai trò khác được suy ra từ cỡ nội dung theo tỷ lệ và làm tròn về px chẵn gọn. Bạn có thể ghi đè giá trị px của bất kỳ vai trò nào trên trang xác nhận.

## H: HugoPPTPilot quyết định phong cách bộ slide thế nào?

Hai lựa chọn độc lập, được khóa ở bước xác nhận `d`:

- **Chế độ (Mode)** (cách bộ slide lập luận): `pyramid` / `narrative` / `instructional` / `showcase` / `briefing` — xem `references/modes/`
- **Phong cách hình ảnh (Visual style)** (trông thế nào): `swiss-minimal` / `editorial` / `soft-rounded` / `dark-tech` … + `custom` — xem `references/visual-styles/`

Chế độ nào cũng ghép được với phong cách hình ảnh nào.

## H: Kết quả trông chỉ toàn khung và đường kẻ. Nên kiểm tra những dữ kiện nào của lần chạy trước?

HugoPPTPilot không có chế độ chạy `wireframe` nào được ghi tài liệu và không có cam kết tương đương hình ảnh giữa các bản phát hành, nên chỉ nhìn vẻ ngoài không xác định được là lỗi hồi quy phiên bản. Trước hết hãy ghi lại lần chạy dùng Default hay Quick, cùng chế độ thực tế, phong cách hình ảnh, lựa chọn dùng ảnh, lựa chọn icon cơ sở, thiết lập Custom Animations và trạng thái tài nguyên đã chuẩn bị. Quick giữ các quyết định này trong ngữ cảnh agent đang chạy thay vì ghi `design_spec.md` hay `spec_lock.md`.

Tiếp theo so sánh cùng trang đó trong `svg_output/` của dự án đang chạy với PPTX đã xuất. Nếu bản thân SVG đã thưa, hãy kiểm tra tầng lập kế hoạch, tài nguyên và soạn SVG. Nếu SVG có đủ các đối tượng dự định nhưng PPTX làm mất hoặc đổi chúng, hãy kiểm tra tầng chuyển đổi hoặc dựng hình. Ranh giới này theo [Materials → Plan → Realization](./technical-design.md#materials--plan--realization-the-kitchen-contract), [quy trình Default Generate](../../skills/ppt-master/workflows/generate-pptx.md) và [hồ sơ Quick](../../skills/ppt-master/workflows/profiles/quick-generate.md).

## H: HugoPPTPilot tính giá thế nào, và tái sử dụng mẫu có giảm lượng token không?

Bạn trả theo mức dùng AI của mình; HugoPPTPilot không thu phí thuê bao nào.

Repo mô tả việc tái sử dụng mẫu là tái sử dụng nhận diện, phương pháp, cấu trúc hoặc hợp đồng ứng dụng lặp lại. Không có mối quan hệ nào giữa tái sử dụng mẫu và lượng token được đo đạc hay cam kết. Xem [định vị sản phẩm](../../README.md#định-vị-sản-phẩm) và [ranh giới của mẫu](./templates-guide.md#3-template-boundaries).

## H: Biểu đồ trong PPTX đã tạo có chỉnh sửa được không?

Mặc định, biểu đồ được dựng thành **đồ họa SVG thiết kế riêng** rồi chuyển thành hình khối PowerPoint native — chỉnh sửa hoàn toàn như hình khối (di chuyển, đổi màu, đổi nội dung, đổi kiểu). Đây là mặc định có chủ đích thay vì đối tượng biểu đồ chạy bằng Excel: biểu đồ mặc định của PowerPoint trông chung chung, lỗi thời và nhốt bộ slide vào các mẫu cứng nhắc. Biểu đồ SVG cho hình ảnh chất lượng xuất bản mà bạn có thể tinh chỉnh trực tiếp trong PowerPoint. Microsoft PowerPoint là đích kiểm chứng; ứng dụng khác có thể hiển thị khác.

Nếu quy trình của bạn đặc biệt cần chỉnh dữ liệu qua Excel hoặc các điều khiển riêng của biểu đồ/bảng PowerPoint, hãy xuất bằng `--native-charts-and-tables`: các biểu đồ dữ liệu được hỗ trợ và bảng lưới chữ thuần khi đó được xuất thành **đối tượng Chart / Table native của PowerPoint có dữ liệu bên trong** (lưu thành `<dự-án-đang-chạy>/exports/<tên>_<thời-gian>_native_charts_tables.pptx`, giữ màu của chính bộ slide thay vì giao diện mặc định của PowerPoint). Phương án SVG mặc định cũng thành hình khối DrawingML chỉnh sửa được, nhưng không có sổ dữ liệu biểu đồ hay mô hình đối tượng bảng/biểu đồ. Đối tượng native có thể trông hơi khác giữa PowerPoint / Keynote / LibreOffice / WPS, nên đường dựa trên hình khối vẫn là mặc định ổn định về thị giác.

## H: Công thức có chỉnh sửa được không?

Có, trong PowerPoint. HugoPPTPilot xuất cả phương trình khối độc lập lẫn công thức nội dòng cùng đoạn văn thành OMML chỉnh sửa được, không phải ảnh chụp hay tài nguyên ảnh. Một khối dùng nhóm công thức; toán nội dòng dùng một `<tspan data-pptx-inline-formula="...">preview</tspan>` lá nằm giữa các đoạn chữ thường. Ma trận, suy diễn nhiều dòng và các biểu thức có cấu trúc cao khác vẫn là khối. LaTeX thô không hiển thị trong SVG, nên mỗi dấu hiệu mang một bản xem trước hiển thị thông thường; khi xuất native nó được giữ làm phương án dự phòng dạng hình khối native cho các ứng dụng không có Office Math, không bao giờ là ảnh.

Việc biên dịch xuôi bao phủ mọi đầu vào được nêu tên trong hồ sơ LaTeX Microsoft 365 2606 / Mac 16.110 và hồ sơ mhchem 2605 / 16.109 được Microsoft ghi tài liệu: ký hiệu, cấu trúc, môi trường, macro, hóa học, màu công thức cục bộ và các chuẩn hóa native đã ghi. Đầu vào không xác định và đầu vào được nêu rõ là không hỗ trợ sẽ thất bại có kiểm soát thay vì xuất hiện như LaTeX thô. Với nhập PPTX, cùng bộ kiểm chứng OMML đóng đó hỗ trợ một đường ngược hẹp: toán khối và nội dòng do HugoPPTPilot sở hữu trở thành các dấu hiệu công thức chuẩn tắc kèm bản xem trước SVG nhìn thấy. Việc này khôi phục ngữ nghĩa đã chuẩn hóa, không phải cách viết LaTeX gốc của tác giả và không phải OMML bên thứ ba tùy ý. OMML không xác định được báo cáo và giữ lại làm phương án dự phòng đọc được/đục ở chế độ khoan dung.

OMML sinh ra giữ mục tiêu gói PowerPoint 2010+, và hồ sơ nguồn thực thi được ghim theo các phiên bản tài liệu Microsoft nêu trên. Việc kiểm chứng của repo bao phủ hành vi biên dịch, cấu trúc OMML và đóng gói PPTX chứ không phải chứng nhận đầy đủ về hiển thị/chỉnh sửa trên giao diện Microsoft 365. Hiển thị và chỉnh sửa công thức trong Keynote, WPS, LibreOffice và các ứng dụng không phải PowerPoint khác không được hỗ trợ; các ứng dụng đó hiện bản xem trước SVG dự phòng như hình khối và chữ thông thường, không phải toán chỉnh sửa được.

## H: Slide đã tạo có chứa liên kết bấm được không?

Có. HugoPPTPilot hỗ trợ liên kết gốc của PowerPoint trên cả đối tượng hoặc trên một đoạn chữ nội dòng. Đích bên ngoài dùng URI tuyệt đối như `https:` hay `mailto:`; nhảy trong cùng bộ slide dùng đúng dạng `#slide-N` đánh số từ 1. Cả hai được biên dịch từ thẻ neo `<a href>` SVG chuẩn thành quan hệ nhấp chuột native, và việc nhập PPTX được hỗ trợ dựng lại đúng dạng SVG đó.

Đây là hợp đồng siêu liên kết, không phải API hành động PowerPoint tổng quát. Di chuột, custom-show, lệnh điều hướng, chương trình/macro/OLE/file và các thiết lập hành động tùy ý không được soạn. Xem [Hướng dẫn ánh xạ PowerPoint ↔ SVG](./powerpoint-svg-mapping.md#10-powerpoint-playback-and-package-features) về thẻ mang liên kết và ranh giới bảo toàn.

## H: Sao không có hiệu ứng phần tử? Hiệu ứng đã bị bỏ à?

Hiệu ứng không bị bỏ. Chuyển trang bật mặc định (`fade` 0,4s); hiệu ứng đối tượng từng phần tử **tắt mặc định** — một trang xuất hiện nguyên vẹn thay vì các phần tử tự động hiện dần từng cái. Cả hai được điều khiển bằng cờ của `svg_to_pptx.py`: `-t/--transition` cho cấp trang và `-a/--animation` cho cấp phần tử. Kho đối tượng gồm các hiệu ứng vào, nhấn mạnh, đường chuyển động và thoát. `pptx_to_svg.py` cũng dựng lại các chuyển trang khớp chính xác kho hiện tại và các hàng hiệu ứng đối tượng hữu hạn có thời lượng chính xác vào `animations.json`; thời gian nguồn không được hỗ trợ vẫn là chẩn đoán tường minh.

Dùng `-a auto` cho hiệu ứng vào tự động toàn bộ slide, một hiệu ứng chuẩn cho một hiệu ứng toàn bộ slide, hoặc `animations.json` cấp dự án cho thời gian từng trang/đối tượng tường minh. Default chạy giai đoạn tùy chỉnh khi có tệp phụ sẵn, khi có yêu cầu từng slide/từng đối tượng tường minh, hoặc khi kết quả Custom Animations hiệu lực được bật. Quick chạy nó khi có tệp phụ hoặc quyết định chuyển động trong ngữ cảnh hoạt động đòi hỏi việc ở cấp đối tượng; bản giao ghi hình, tự chạy hoặc có hướng video của Quick yêu cầu giai đoạn này trừ khi người dùng yêu cầu rõ phát tĩnh hoặc chỉ chuyển trang. Yêu cầu chỉ ở cấp toàn bộ slide có thể vẫn là cờ của bộ xuất. Nếu không điều kiện nào áp dụng, mặc định `fade`/`none` vẫn giữ. [Quy trình Generate](../../skills/ppt-master/workflows/generate-pptx.md) và [hồ sơ Quick](../../skills/ppt-master/workflows/profiles/quick-generate.md) định nghĩa các điều kiện kích hoạt đó.

```bash
python3 skills/ppt-master/scripts/svg_to_pptx.py <project> -t push       # chuyển trang khác
python3 skills/ppt-master/scripts/svg_to_pptx.py <project> -t none       # tắt chuyển trang
python3 skills/ppt-master/scripts/svg_to_pptx.py <project> -a auto       # bật hiệu ứng vào cho từng phần tử (hiệu ứng ánh xạ từ id của nhóm)
python3 skills/ppt-master/scripts/svg_to_pptx.py <project> --animation entrance_fade # bật với một hiệu ứng chuẩn
python3 skills/ppt-master/scripts/svg_to_pptx.py <project> --animation emphasis_spin # nhấn mạnh native
python3 skills/ppt-master/scripts/pptx_animations.py --list             # danh sách hiệu ứng đầy đủ theo nhóm
python3 skills/ppt-master/scripts/svg_to_pptx.py <project> -a auto --animation-trigger on-click   # hiện theo nhịp người trình bày
```

`on-click` dành cho buổi trình bày trực tiếp. Xuất thuyết minh/video bằng `--recorded-narration` từ chối nó vì HugoPPTPilot ghi thời gian theo trang chứ không theo cú nhấp ở cấp đối tượng; hãy dùng `after-previous` hoặc `with-previous` cho bộ slide có thuyết minh.

Về các lệnh thông dụng, hướng dẫn chế độ Start và tùy chỉnh cấp đối tượng, xem [Hiệu ứng & chuyển trang](./animations.md). Hành vi hiệu ứng và kiểm chứng chính xác nằm trong tài liệu thực thi được liên kết.

## H: Mô hình AI nào hoạt động tốt nhất?

**Claude** (Opus / Sonnet) là mô hình được khuyên dùng và được kiểm thử nhiều nhất. Bố cục SVG đòi hỏi tính toán tọa độ tuyệt đối chính xác (cỡ chữ × số ký tự × chiều rộng khung chứa), và Claude xử lý việc này tốt hơn đáng kể so với các lựa chọn khác.

Các phiên bản **dòng GPT** cũ hơn có xu hướng gây nhiều lỗi bố cục hơn — chữ tràn khung, phần tử lệch hàng, tính sai tọa độ. Các phiên bản mới hơn (ví dụ GPT-5.5) đã cải thiện rõ rệt và dùng được trong thực tế; nếu có vấn đề, hãy nói cho AI biết trang nào cần sửa.

Các mô hình khác (Gemini, GLM, MiniMax, v.v.) chất lượng khác nhau. Nói chung, mô hình có khả năng frontend/thị giác mạnh hơn cho kết quả tốt hơn.

## H: Có người nói HugoPPTPilot "chỉ là đồ chơi" — có công bằng không?

Không. HugoPPTPilot là một quy trình trình bày, không phải một mô hình hay một agent hoàn chỉnh. Nó cung cấp lập luận riêng cho trình bày, các hợp đồng, trạng thái dự án, phép chuyển đổi xác định và các cổng chất lượng; mô hình được chọn vẫn đặt trần chất lượng. Đánh giá quy trình bằng một mô hình yếu hoặc ngữ cảnh nhỏ cũng như lái thử xe thể thao ở số một rồi kết luận nó chậm.

**Tổ hợp phát huy hết sức mạnh:**

- **Claude với ngữ cảnh lớn** (lý tưởng ~1M token): ngữ cảnh lớn cho phép Executor thấy mọi trang đã tạo trước đó trong cùng phiên, giữ sự nhất quán hình ảnh trên toàn bộ slide mà không phải tách lần chạy. Cửa sổ nhỏ hơn buộc phải chạy chế độ tách bước, gây lệch phong cách thấy được giữa các giai đoạn.
- **Tạo ảnh AI với `gpt-image-2.5-sunburst`** (hoặc tương tự): ảnh stock giữ chỗ là nguyên nhân lớn nhất khiến bộ slide trông chung chung. Thay chúng bằng minh họa do AI tạo đúng thương hiệu làm đổi cảm nhận về chất lượng ngay lập tức.

Nếu kết quả bạn thấy tầm thường, hãy kiểm tra thiết lập trước khi kết luận về công cụ: Mô hình nào? Ngữ cảnh bao lớn? Đã bật tạo ảnh chưa? HugoPPTPilot + Claude Opus ngữ cảnh 1M + ảnh `gpt-image-2.5-sunburst` là một trải nghiệm thật sự khác so với HugoPPTPilot + một mô hình mã nguồn mở nhỏ không cấu hình API ảnh.

Một điều cuối: đây là dự án mã nguồn mở miễn phí do một người duy trì. Nếu nó phù hợp nhu cầu, cứ dùng — tác giả vui vì nó có ích; nếu không, hãy chọn công cụ khác. Phản hồi và góp ý chân thành luôn được hoan nghênh, vì dự án tốt lên từng chút nhờ vậy.

## H: Chữ bị tràn hoặc phần tử lệch — tôi có thể làm gì?

Nguyên nhân tùy thuộc chỗ xuất hiện sai lệch. Nếu bản thân SVG nguồn đã tràn hoặc lệch, thường đó là vấn đề soạn/bố cục: mô hình phải tính đúng tọa độ, số đo phông và kích thước khung chứa. Nếu bản xem trước SVG đúng nhưng PPTX xuất ra khác, đó có thể là lỗi bộ chuyển đổi hoặc dựng hình và nên được báo cáo kèm cả hai sản phẩm.

**Cách thử**:
1. So sánh trang trong `svg_output/` với PPTX đã xuất để tách lỗi soạn khỏi lỗi chuyển đổi
2. Nói cho AI biết trang cụ thể nào có vấn đề và mô tả lỗi — nó có thể tạo lại từng trang riêng lẻ
3. Nếu bản thân SVG liên tục sai, dùng mô hình mạnh hơn hoặc nhờ AI sửa trực tiếp tọa độ
4. Hãy nhớ: PPTX đã tạo là một **bản nháp chỉnh sửa được chất lượng cao**, không phải sản phẩm cuối đã niêm phong — việc hoàn thiện nhỏ trong PowerPoint là điều bình thường

> 🇻🇳 Với chữ Việt: nếu dấu bị cắt đỉnh hoặc lệch, hãy dùng phông có đủ dấu (Segoe UI, Arial, Calibri…) và chừa thêm chiều cao khung chữ; xem [Hỗ trợ tiếng Việt](./vietnamese-support.md#4-dấu-chồng-và-khoảng-cách-dòng).

## H: Tạo một bài thuyết trình mất bao lâu?

Một bài 10–15 trang điển hình mất khoảng **10–20 phút** với mô hình nhanh. Việc tạo **cố ý chạy tuần tự** (từng trang một) để giữ nhất quán hình ảnh giữa các slide — tạo song song đã được thử và cho phong cách không đồng nhất.

Nếu thấy tạo chậm, hãy kiểm tra tốc độ token của mô hình. Điểm nghẽn thường là tốc độ xuất của mô hình, không phải các script.

Nếu điều bạn muốn là ít quy trình hơn chứ không phải mô hình khác, hãy yêu cầu rõ tạo nhanh: nó bỏ phân tích của Strategist và điểm dừng xác nhận, còn việc soạn SVG từng trang vẫn còn. Repo không cam kết mức giảm thời gian cố định cho Quick. Xem câu hỏi kế tiếp, "Tôi không muốn xác nhận bản thiết kế trước — có thể tạo thẳng không?".

## H: Tôi không muốn xác nhận bản thiết kế trước — có thể tạo thẳng không?

Có. Hãy yêu cầu rõ **tạo nhanh**, và đường Generate sẽ dùng [hồ sơ `quick-generate`](../../skills/ppt-master/workflows/profiles/quick-generate.md).

**Nó bỏ qua phân tích của Strategist, các sản phẩm `design_spec.md` / `spec_lock.md` và điểm dừng xác nhận theo giai đoạn: điều gì bạn nêu rõ thì được làm theo, điều gì bạn bỏ ngỏ thì agent hiện tại tự quyết và tiếp tục, không quay lại xin phê duyệt.** Không nêu gì, agent quyết mọi thứ. Nó cũng bỏ `finalize_svg.py`, nên Quick không tạo bản xem trước `svg_final/`.

Nó không bỏ khả năng chuẩn bị hay thiết kế. Chuyển đổi nguồn, nghiên cứu các khoảng trống dữ kiện đã nhận diện, tham chiếu thẩm mỹ chung và mọi tài nguyên bộ slide cần vẫn chạy khi cần: ảnh được cung cấp hoặc đã trích, ảnh AI/web/cắt lát, icon dự án, hình khối native, biểu đồ/bảng, và các manifest vận hành hay bản ghi nguồn gốc bắt buộc. Công thức được soạn thẳng thành dấu hiệu PowerPoint native trong SVG liên quan, không chuẩn bị thành tài nguyên ảnh. Một đường thủ công được chọn rõ ràng hoặc phụ thuộc file không thể thay thế khác vẫn dừng chờ cho đến khi bạn cung cấp file cần thiết. Nếu việc tạo bằng AI tự động hoặc việc cắt lát bắt buộc của nó đã cạn, Quick thay vào đó loại các tác vụ lỗi và mục manifest cũ, lập lại vai trò truyền đạt của chúng bằng văn bản/SVG native chỉnh sửa được hoặc tài nguyên không-AI đã chuẩn bị, tiếp tục cùng lần chạy và công bố việc thay thế trong bàn giao cuối. Nó không bao giờ lấp khoảng trống bằng tài liệu không liên quan. Sau khi chuẩn bị, agent hiện tại soạn tay `svg_output/` theo các tiêu chuẩn chung, chạy bộ kiểm tra chất lượng cuối Quick không khóa, sửa mọi lỗi chặn, và chỉ khi đó mới xuất PPTX cuối.

Các khả năng thông thường của bộ xuất vẫn dùng được khi cần, gồm thay thế biểu đồ/bảng native, ghi chú, chuyển động, thuyết minh và chẩn đoán. Ghi chú, hiệu ứng đối tượng tùy chỉnh và thuyết minh bắt đầu ở trạng thái tắt; agent có thể bật khi yêu cầu hay bộ slide cần, mà không mở luồng xác nhận. Xuất ở đường mặc định ghi báo cáo postflight thông thường và chụp lại `svg_output/` vào `backup/`; đường xuất do bạn chỉ định giữ hành vi không sao lưu thông thường. Số trang tự nó không kích hoạt cũng không chặn tạo nhanh.

Quick bỏ giai đoạn lập kế hoạch riêng, nhưng repo không ghi nhận mức giảm token được đo đạc hay cam kết; việc soạn SVG từng trang vẫn còn. Quick giữ cùng khả năng soạn hình ảnh và tài nguyên ở cấp trang và các tiêu chuẩn chặn SVG/tài nguyên chung. Nó không chạy kiểm tra căn chỉnh Spec Lock hay suy ra Theme dự án hiện tại từ một lock. Quick phẳng giữ phần dàn Theme mặc định của bộ chuyển đổi; Quick có cấu trúc giữ các Theme nguồn theo từng Master đã cài khi có và suy ra mặc định cỡ chữ tiêu đề/nội dung của Master từ các thẻ khe ngữ nghĩa. Nó không hứa cùng các quyết định thiết kế hay thời gian thực tế như Default vì không có hợp đồng thiết kế đã xác nhận hay lịch sử quyết định có thể tiếp tục.

## H: Bộ slide dài có làm tràn cửa sổ ngữ cảnh trong một lượt không?

Khuyến nghị mặc định: **tạo liên tục một lượt**. Bộ slide 10–15 trang vừa thoải mái trong cửa sổ 200K, và sự nhất quán hình ảnh giữa các trang tốt nhất khi Executor thấy được các trang trước trong cùng phiên (nó chủ động căn chỉnh phong cách, cỡ chữ và nhịp điệu).

Khi trình soạn thảo AI hiện tại hỗ trợ một worker nghiên cứu biệt lập, `topic-research` giữ các lần tải thô ở đó và cuộc trò chuyện chính chỉ đọc phần bổ sung nghiên cứu đã lưu cùng file nguồn gốc dữ kiện.

Chỉ khi các tín hiệu nặng (≥ 18 trang, tài liệu nguồn dày, hoặc còn nhiều tài liệu nghiên cứu trong cuộc trò chuyện chính sau phương án dự phòng cục bộ hay phần bổ sung nhập vào quá lớn) AI mới đưa ra gợi ý **chế độ tách bước** tùy chọn ở giai đoạn Strategist: phiên lập kế hoạch (giai đoạn xác nhận của Strategist + lấy ảnh) kết thúc ở cuộc trò chuyện hiện tại; bạn mở một cửa sổ chat mới và gõ `resume execution projects/<tên_dự_án>` để vào phiên thực thi (tạo SVG + xuất). Phiên mới tải lại `design_spec` / `spec_lock` / `sources` / `images` từ đĩa và tiếp tục từ đó.

Chế độ tách bước là một **thỏa hiệp** — phiên mới phải trả chi phí cố định để tải lại thẩm quyền Generate và các tham chiếu thực thi bắt buộc, nhưng loại bỏ nhiễu của phiên lập kế hoạch và dùng lại ngân sách giải phóng được để đọc lại `sources/` cho nội dung slide phong phú hơn. **Không cần khi các tín hiệu bình thường**; gợi ý sẽ không xuất hiện, và bạn luôn có thể bỏ qua nó và ở lại chế độ liên tục.

## H: Tôi có thể xem trước hoặc sửa từng trang trước khi xuất toàn bộ không?

Có. Bạn có thể **ngắt quy trình bất cứ lúc nào** — sau khi vài trang đầu được tạo, hãy xem và phản hồi. AI có thể tạo lại các trang cụ thể dựa trên nhận xét của bạn. Bạn không cần đợi đến cuối mới sửa.

Với việc sửa sau khi tạo, chỉ cần nói với AI: "Trang 3 có lỗi bố cục — tiêu đề đè lên biểu đồ" và nó sẽ sửa đúng SVG đó.

## H: Tôi có một PPT sẵn và muốn xây tiếp trên đó — nên dùng đường nào?

Hãy coi "dùng một PPT có sẵn" là hai câu hỏi: **giữ nội dung hay không**, và **giữ thiết kế (bố cục + hình ảnh) hay không**. Bốn tổ hợp ứng với ba đường xử lý cộng với lựa chọn giữ nguyên bản gốc:

| Ý định | Đường | Cái gì được giữ cố định |
|---|---|---|
| Giữ nội dung + làm lại bố cục | **Generate PPTX + hồ sơ beautify** | Số trang, thứ tự trang, câu chữ từng slide, dữ liệu biểu đồ/bảng |
| Thay nội dung + giữ thiết kế | **Edit Native PPTX** | Thiết kế native của nguồn; trang không đổi giữ nguyên từng byte, còn trang được chọn có thể sửa, sắp xếp lại, lặp hoặc bỏ |
| Chỉ giữ nội dung, làm lại thiết kế và phân trang | **Generate PPTX** | Dữ kiện nguồn; cấu trúc câu chuyện và số trang có thể đổi |
| Giữ nội dung + giữ thiết kế | Không cần tạo | Dùng file gốc |

Dùng **hồ sơ beautify** khi cách chia trang của bộ slide nguồn là một phần của đầu ra được yêu cầu: chữ giữ nguyên văn, số trang và thứ tự được bảo toàn 1:1, còn bố cục / thứ bậc / khoảng trắng được làm lại. Bảng màu và phông của nguồn là mặc định được khuyên dùng, chọn sẵn; một yêu cầu rõ ràng hoặc xác nhận cuối có thể ghi đè các trường hình ảnh, nhưng Beautify không bao giờ lặng lẽ rời bản sắc của nguồn. Hãy nói "làm bộ slide này đẹp hơn" / "bố cục lại cái này, giữ nguyên câu chữ". Xem [hồ sơ beautify](../../skills/ppt-master/workflows/profiles/beautify-pptx.md).

Dùng **đường chính** khi PPT nguồn chỉ là tài liệu: trích nó sang Markdown bằng `ppt_to_md`, đọc các dữ kiện tiếp nhận PPTX từ `analysis/`, rồi để Strategist tự do tái kiến trúc dàn ý (gộp / tách / sắp xếp lại trang). Hãy nói "xây bộ slide tốt hơn từ nội dung của bộ này" hoặc "biến cái này thành bản tóm tắt điều hành 10 trang".

Phép thử một dòng giữa beautify và Generate thông thường áp dụng khi thiết kế nhìn thấy sẽ được tạo lại: **cách chia trang của nguồn là thông tin cần giữ, hay chỉ là cấu trúc của tác giả trước cần cải thiện?** Giữ → beautify; cải thiện → Generate thông thường. Beautify nghiêm ngặt 1:1. Nếu thiết kế native phải được giữ, hãy dùng Edit Native PPTX; `page_plan.json` của nó có thể chọn, sắp xếp lại, lặp hoặc bỏ các trang có sẵn mà không thiết kế lại.

Nếu yêu cầu của bạn mơ hồ, ví dụ "làm PPT này chuyên nghiệp hơn" hay "tối ưu bộ slide này", AI nên hỏi làm rõ một lần trước khi định tuyến: **giữ nguyên số trang/thứ tự và câu chữ của từng slide, hay coi PPT là tài liệu nguồn và tái cấu trúc thành một câu chuyện mới?**

Còn một đường trực giao: nếu bạn chưa muốn tạo bộ slide ngay mà muốn **thu hoạch thiết kế thành mẫu tái sử dụng** cho sau này, hãy dùng **create-template** (xem "Làm sao tạo mẫu tùy chỉnh?" bên dưới).

---

## H: Tôi đã có một file `.pptx` hoàn chỉnh — có thể tái sử dụng thiết kế và chỉ điền nội dung mới không?

Có — đây là đường **Edit Native PPTX**, tách biệt với Generate. Đưa AI file `.pptx` có sẵn cùng tài liệu (hoặc chủ đề) và yêu cầu "điền bộ slide này bằng nội dung mới" hay "điền lại vào mẫu này". Nó nhập bộ slide thành một workspace round-trip giữ nguồn dưới `projects/`, coi các trang nguồn như một thư viện slide native, và cho bạn chọn, sắp xếp lại, lặp hoặc bỏ các trang trước khi sửa nội dung được chọn.

Trang đầu ra không đổi được tham chiếu và khôi phục đến từng byte. Trên một trang được sửa, đối tượng không đổi khôi phục ở dạng native và chỉ đối tượng thay đổi được dựng lại. Danh sách `pages` có thứ tự trong `page_plan.json` dùng `source_slide` cùng tên file `svg` sao chép tùy chọn để chọn, sắp xếp lại, lặp hoặc bỏ các trang nguồn. Ghi chú, thuyết minh, thời gian và chuyển trang là các lớp phủ trên slide được bảo toàn. Cấu trúc trang của một bộ slide mã hóa logic của nó (dẫn trước rồi chi tiết, so sánh, tiến triển), nên hãy chọn các trang có cấu trúc vốn đã hợp nội dung của bạn thay vì ép vào. Khi thư viện nguồn thiếu cấu trúc mới cần thiết, hãy dùng Generate thông thường, hoặc chạy Create Template trước rồi Generate từ workspace thu được. Các bước đầy đủ: [quy trình Edit Native PPTX](../../skills/ppt-master/workflows/edit-native-pptx.md).

---

## H: Nội dung rơi vào chỗ không ngờ — làm sao xem HugoPPTPilot đã nhận diện gì trong `.pptx` của tôi?

Edit Native PPTX và Create Template đều ghi ra một bản kiểm kê đọc được trước khi bắt đầu soạn. Hãy đọc nó để biết những trang và đối tượng nào đã được nhận diện.

Với **Edit Native PPTX**:

```bash
python3 skills/ppt-master/scripts/pptx_to_svg.py <deck.pptx> \
  -o projects/<slug> --inheritance-mode both --roundtrip
```

`authoring-svg-flat/authoring_summary.json` liệt kê danh sách trang nguồn và số lượng chữ, ảnh, vector, placeholder, tham chiếu nguồn theo từng trang. Chỉ mở các trang SVG gọn đã chọn mà bạn cần kiểm tra hay sửa.

Với **Create Template**:

```bash
python3 skills/ppt-master/scripts/pptx_template_import.py <deck.pptx> --manifest-only -o <workspace>
```

`manifest.json` báo cáo theo từng slide đường dẫn layout và master, placeholder (`type`, `idx`, `semanticRole`, `shapeName`), tài nguyên ảnh, số lượng chữ và loại trang; `native_structure.json` thêm đánh giá cấu trúc nguồn. `--manifest-only` bỏ qua xuất SVG, nên chạy chỉ để xem rất nhẹ.

Lưu ý Create Template tạo ra một workspace mẫu tái sử dụng, không phải bộ slide đã điền: các trang tiếp theo do Generate soạn mới, nên nội dung chính và ghi chú người trình bày của nguồn cố ý không được chép sang đó. Nếu một hình khối bạn mong dùng được lại thiếu trong các báo cáo này, đó chính là điều cụ thể cần đưa vào báo lỗi.

---

## H: Tôi có thể biến `.pptx` của công ty thành workspace tái sử dụng không? Nên chọn loại nào?

Có, qua yêu cầu `/create-template` tường minh. Một bộ slide hoàn chỉnh tự nó không ngụ ý `Deck`; hãy chọn loại theo thứ cần được tái sử dụng:

| Loại | Hợp đồng tái sử dụng |
|---|---|
| **Brand** | Chỉ bản sắc: màu, kiểu chữ, logo, giọng điệu và ngôn ngữ icon; không có danh sách trang |
| **Style** | Phương pháp truyền đạt và mặc định hình ảnh, không có sự thật về bản sắc, nguyên mẫu trang hay cấu trúc native |
| **Layout** | Cấu trúc Master/Layout/slot trung lập thương hiệu và trung lập ứng dụng |
| **Deck** | Một ứng dụng lặp lại hoặc cấu trúc thương hiệu tích hợp bản sắc, cấu trúc và danh sách SVG |

Create Template xác nhận bản tóm tắt trước khi ghi một workspace `library` có chỉ mục hoặc một workspace `project` đã khởi tạo, không đăng ký. Cho các lần Generate sau, hãy truyền thư mục gốc workspace thu được — không phải `.pptx` nguồn hay thư mục `templates/` bên trong nó. Xem [đường Create Template](../../skills/ppt-master/workflows/create-template.md) và [Hướng dẫn về mẫu](./templates-guide.md).

---

## H: Đăng ký một mẫu có khiến mọi bộ slide sau này tự dùng nó không?

Không. Đăng ký làm workspace có thể được tìm thấy; nó không chọn nó. Trong Default Generate, mẫu vẫn phải được xác nhận ở Giai đoạn 1. Cung cấp đúng một thư mục gốc workspace có thể chọn sẵn nó ở đó, nhưng không bỏ qua xác nhận; cung cấp nhiều thư mục gốc để chúng là các ứng viên chưa chọn. Quick không có bộ chọn mẫu, nên một thư mục gốc chính xác được kiểm chứng và dùng trực tiếp, còn không có thư mục gốc chính xác nghĩa là thiết kế tự do. Một `.pptx` thô, thư mục `templates/` bên trong, tên mẫu trống không hay cụm từ phong cách đều không phải lựa chọn workspace. Xem [Cách chọn hoạt động](./templates-guide.md#how-selection-works) và [ranh giới mẫu của Quick](../../skills/ppt-master/workflows/profiles/quick-generate.md).

---

## H: Làm sao tạo mẫu tùy chỉnh?

Muốn biến một PPT bạn thích thành mẫu tái sử dụng cho HugoPPTPilot? Làm như sau:

**Bước 1 — Chuẩn bị tài liệu tham chiếu**

Đầu vào khuyên dùng là `.pptx` gốc. HugoPPTPilot trích bản sắc giao diện, topo Master/Layout đã khai báo, siêu dữ liệu placeholder, bằng chứng hình khối native và các tài nguyên tái sử dụng thực sự có mặt và được hỗ trợ. `standard` và `fidelity` xem toàn bộ kiểm kê nguồn như bằng chứng và soạn một danh sách SVG mới cùng hệ thống Master/Layout/slot mới; chúng không bảo toàn cũng không chưng cất topo nguồn. `mirror` thì hiện thực hóa một nguyên mẫu cho mỗi Slide nguồn cùng chỉ những dữ kiện Layout/Master truy cập được của danh sách Slide đó, không tổng hợp ngữ nghĩa hay lấp khoảng trống. Layout/Master nguồn không được tham chiếu vẫn là bằng chứng phân tích thay vì đầu ra mirror. Các lớp bọc nhóm cố định của Master/Layout được bung cơ học thành các nguyên tử trực tiếp vì các lớp cấu trúc không thể là `<g>`.

SVG nhập lớn có thể chứa siêu dữ liệu hình khối native, thẻ mang ẩn và dấu vân tay xem trước. Biểu diễn không mất mát đó vẫn bất biến như bằng chứng nguồn/gói. Việc tạo mẫu dùng một IR chỉnh sửa nhẹ với tham chiếu nguồn cục bộ theo tài liệu và manifest đường dẫn/hash gọn. `standard` / `fidelity` soạn SVG chuẩn tắc của dự án và chỉ dùng nhóm preset đã soạn gọn cho các khớp preset đã đăng ký chính xác. Mirror xuất bản IR hiện tại đã duyệt làm cây nhìn thấy; nó chỉ dùng tham chiếu nguồn để kiểm chứng danh tính và khôi phục ngữ nghĩa không nhìn thấy được hỗ trợ, không bao giờ để khôi phục các cây con nhìn thấy không mất mát thông thường. Đối tượng không được hỗ trợ hoặc đã sửa giữ phương án dự phòng SVG.

Nếu không có PPTX nguồn, ảnh chụp các loại trang chính vẫn dùng được — bìa, mục lục, chương, nội dung và kết — nhưng khi đó hình học, phông và kế thừa phải được suy ra bằng mắt. Đường này trích một hệ thống mẫu tái sử dụng; khi đầu ra mong muốn là một slide nhiều lớp chỉnh sửa được cho mỗi khung trang được thể hiện, hãy dùng Image to PPTX (`image-to-pptx`).

**Bước 2 — Để AI tạo mẫu**

Dùng một công cụ AI có khả năng agent (Claude Code, Codex, v.v.) và nhờ nó dùng **quy trình `/create-template` của HugoPPTPilot** để chuyển tài liệu tham chiếu của bạn thành mẫu. Bạn cung cấp càng nhiều ngữ cảnh, kết quả càng tốt — ví dụ:

- Tên mẫu và trường hợp dùng dự kiến (vd. báo cáo cơ quan nhà nước, tư vấn cao cấp)
- Giọng điệu và bảng màu mong muốn (vd. "hiện đại và tiết chế, chủ đạo xanh navy")
- Ưu tiên danh mục (`brand` / `general` / `scenario` / `government` / `special`)
- Định dạng khung slide, nếu không phải 16:9 mặc định
- Phạm vi đầu ra: `library` có chỉ mục (mặc định) hoặc một `project` đã khởi tạo; cả hai dùng chung một lược đồ spec và định tuyến tài nguyên, còn library dùng spec trần và project dùng spec định danh

Bạn không cần cung cấp mọi chi tiết ngay từ đầu — agent AI sẽ hỏi tiếp để điền những gì còn thiếu (phạm vi đầu ra, ID mẫu, chế độ giao diện, v.v.).

**Bước 3 — Chờ kết quả**

Agent AI lo phần còn lại — phân tích tài liệu tham chiếu, viết đặc tả theo từng loại, dựng định nghĩa bố cục có cấu trúc chỉ cho Layout/Deck, và kiểm chứng workspace. Brand/Style không bao giờ tạo PPTX xem trước; Layout/Deck tạo `exports/<id>_template_preview.pptx` theo yêu cầu và bắt buộc có nó khi có nhiều Master. Cả hai phạm vi đều cần `templates/`; Brand/Layout/Deck có thể dùng `images/` và `icons/` thuộc gói, còn Style chỉ đóng góp Design Spec của nó. Phạm vi library ghi `templates/design_spec.md` trần dưới `skills/ppt-master/templates/<kind>/<id>/` và đăng ký nó; phạm vi project ghi `templates/design_spec.<kind>.<id>.md` dưới `projects/<tên>/` và bỏ qua đăng ký, cho phép mỗi loại có một đóng góp cùng tồn tại. Layout sở hữu danh sách SVG đang dùng khi cả Layout và Deck cùng có. Thư mục tùy chọn rỗng bị bỏ. Hãy đưa thư mục gốc workspace đó cho Bước 3; một thư mục gốc project đóng góp mọi spec của nó theo nguyên khối, và việc cài không bao giờ sao chép `exports/`. Các gói phẳng hoặc ngữ nghĩa cũ chỉ là đầu vào tham chiếu và phải được dựng lại qua `create-template` trước khi Generate có thể chọn chúng.

> **Mẹo**: Bạn càng cụ thể về phong cách và trường hợp dùng, mẫu tạo ra càng khớp mong đợi của bạn.

---

> Muốn biết thêm, xem [SKILL.md](../../skills/ppt-master/SKILL.md) và [AGENTS.md](../../AGENTS.md)
