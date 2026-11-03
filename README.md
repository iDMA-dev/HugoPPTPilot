# HugoPPTPilot — AI tạo PowerPoint gốc (native) từ mọi loại tài liệu

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


> 🇻🇳 Giao diện, tài liệu và giọng đọc mặc định bằng tiếng Việt. Xem [Hỗ trợ tiếng Việt](./docs/vi/vietnamese-support.md).

> **"Chỉnh sửa được" nay là điều tối thiểu — điểm khác biệt của HugoPPTPilot là độ sâu "native".** Bạn nhận được một file PowerPoint thật: slide master, hình khối native, biểu đồ và bảng có dữ liệu bên trong — không phải các ô văn bản phẳng, cũng không phải một mẫu điền sẵn. Nó không chỉ dàn trang đẹp: nó lập luận để định hình mạch nội dung trước, rồi mới thiết kế. Về hình thức, đây là một quy trình chạy bên trong bất kỳ công cụ AI nào có khả năng agent: đưa chủ đề hoặc tài liệu cho AI, và nó tạo slide ngay trên máy của bạn — dữ liệu ở lại máy bạn, không bị khóa vào một nền tảng hay mô hình nào.

<p align="center">
  <a href="#bắt-đầu-nhanh"><strong>Bắt đầu nhanh</strong></a> ·
  <a href="./docs/vi/faq.md"><strong>Hỏi đáp (FAQ)</strong></a> ·
  <a href="./docs/vi/vietnamese-support.md"><strong>Hỗ trợ tiếng Việt</strong></a>
</p>

---

## Định vị sản phẩm

**"Chỉnh sửa được" giờ là điều hiển nhiên — câu hỏi thật sự là bạn nhận được bao nhiêu phần của PowerPoint.** HugoPPTPilot xuất ra chính mô hình đối tượng native của PowerPoint, và đi sâu: hình khối và đường nối native có tay nắm điều chỉnh hoạt động, biểu đồ và bảng có dữ liệu khi cần, cùng toàn bộ mô hình văn bản / hình ảnh / tô màu / hiệu ứng — nhấp vào bất kỳ phần tử nào và tiếp tục chỉnh sửa như một đối tượng PowerPoint gốc; qua đường mẫu / có cấu trúc, nó còn có thể trao cho bạn bộ slide với slide master và layout thật (kế thừa `p:sldMaster` / `p:sldLayout`).

Về hình thức, đây là một quy trình (một "skill") chạy trong bất kỳ công cụ AI nào có khả năng agent: bạn nói trong khung chat — "tạo bộ slide từ file PDF này" — và nó chạy quy trình ngay trên máy bạn rồi xuất file `.pptx` chỉnh sửa được hoàn toàn. Bạn không cần viết code; chỉ làm đúng ba việc — cài Python, cài một công cụ AI, thả tài liệu vào.

Tạo bộ slide mới từ tài liệu nguồn là đường chính, nhưng không phải đường duy nhất. HugoPPTPilot còn có thể chắt lọc mẫu thương hiệu / phong cách / bố cục / bộ slide tái sử dụng từ tài liệu tham chiếu của bạn, điền nội dung mới vào một file `.pptx` có sẵn mà vẫn giữ nguyên thiết kế, và thêm hiệu ứng chuyển trang, chuyển động, thuyết minh bằng giọng đọc cho bộ slide đã hoàn thành. Hướng dẫn từng khả năng → [Bắt đầu](./docs/vi/getting-started.md).

Ba cam kết đi kèm:

- **Chi phí minh bạch, dễ dự đoán** — miễn phí và mã nguồn mở; chi phí duy nhất là phần dùng mô hình AI, không phải trả thêm thuê bao PPT nào
- **Dữ liệu ở lại máy bạn** — ngoài các lần gọi mô hình AI và những dịch vụ tìm ảnh, tạo ảnh, giọng nói bạn tự bật, toàn bộ quy trình chạy trên máy của bạn
- **Không bị khóa nền tảng** — mọi IDE AI có khả năng agent đều điều khiển được; Claude, GPT, Gemini, Kimi và các mô hình khác đều dùng được

> [!IMPORTANT]
> ### Đây là công cụ, không phải giếng ước
> `harness + mô hình = agent` — HugoPPTPilot chỉ sở hữu quy trình; mô hình quyết định trần chất lượng. Khuyến nghị: **Kimi K3 (hoặc Claude) với ngữ cảnh lớn (~1M token) + tạo ảnh bằng AI (`gpt-image-2.5-sunburst` hoặc Google `gemini-nano-banana-2.1`)**; các mô hình khác vẫn chạy được quy trình nhưng chất lượng kém hơn.
>
> Đừng kỳ vọng có ngay một bộ slide hoàn hảo sau một lần chạy. Giá trị của công cụ là gánh phần lớn việc lặt vặt; phần tinh chỉnh còn lại là của bạn — bộ slide chỉnh sửa được chính là để bạn tiếp tục hoàn thiện, chứ không phải một bức ảnh phẳng không sửa được. Mô hình càng rẻ thì việc còn lại càng nhiều; nếu kết quả chưa như ý, hãy nâng cấp mô hình trước, rồi đối chiếu cách dùng của bạn với [Bắt đầu](./docs/vi/getting-started.md).

---

## Bắt đầu nhanh

### 1. Chuẩn bị

**Bạn chỉ cần cài [Python](https://www.python.org/downloads/) 3.10–3.14.** Mọi thứ còn lại chỉ cần một dòng — `pip install -r requirements.txt` — sau khi tải dự án ở Bước 3.

<details>
<summary><strong>Windows</strong> — xem <a href="./docs/vi/windows-installation.md">hướng dẫn từng bước</a> ⚠️</summary>

Windows cần thêm vài bước (thiết lập PATH, chính sách thực thi, v.v.). Có sẵn **hướng dẫn từng bước** dành riêng cho người dùng Windows:

**📖 [Hướng dẫn cài đặt trên Windows](./docs/vi/windows-installation.md)** — từ con số 0 đến bộ slide đầu tiên trong 10 phút.

Bản rút gọn: tải Python từ [python.org](https://www.python.org/downloads/) → **tích "Add to PATH"** khi cài → xong; các thư viện phụ thuộc được cài ở Bước 3.
</details>

<details>
<summary><strong>macOS / Linux</strong> — cài là chạy</summary>

```bash
# macOS
brew install python

# Ubuntu / Debian
sudo apt install python3 python3-pip
```
</details>

<details>
<summary><strong>Trường hợp đặc biệt</strong> — 99% người dùng không cần</summary>

**Pandoc** — chỉ cần cho các định dạng tài liệu cũ: `.doc`, `.odt`, `.rtf`, `.tex`, `.rst`, `.org`, `.typ`. Các định dạng `.docx`, `.html`, `.epub`, `.ipynb` do Python xử lý trực tiếp — không cần pandoc.

```bash
# macOS
brew install pandoc

# Ubuntu / Debian
sudo apt install pandoc
```
</details>

### 2. Chọn một Agent

HugoPPTPilot chạy trong **mọi công cụ có khả năng agent** — đọc/ghi file, chạy lệnh và duy trì hội thoại nhiều lượt.

Chưa từng dùng? Đừng lo — trong dự án này chúng chỉ đóng đúng một vai: một khung chat AI có thể đọc và ghi file. Chọn một công cụ trong bảng, cài đặt, và bạn chỉ dùng khung chat của nó. Không cần lập trình.

> **Gợi ý của tác giả: [Claude Code](https://claude.ai/code)** — môi trường được phát triển và kiểm thử kỹ nhất, dưới dạng CLI hoặc tiện ích mở rộng VS Code / JetBrains.

| Loại | Ví dụ | Ghi chú |
|---|---|---|
| **Agent tích hợp sẵn trong IDE** | • Họ VS Code ([VS Code](https://code.visualstudio.com/) và các bản fork): [Cursor](https://cursor.sh/), Trae, Codebuddy IDE, [Windsurf](https://codeium.com/windsurf), v.v.<br>• Kiến trúc khác: [Zed](https://zed.dev/), v.v. | Trình soạn thảo có sẵn agent |
| **Plugin / tiện ích mở rộng IDE** | [Claude Code](https://claude.ai/code) (VS Code / JetBrains), [GitHub Copilot](https://github.com/features/copilot), [Cline](https://cline.bot/), v.v. | Cài trong VS Code hoặc JetBrains |
| **Agent dòng lệnh (CLI)** | [Claude Code](https://claude.ai/code) CLI, [Codex CLI](https://github.com/openai/codex), Gemini CLI, v.v. | Chạy trong terminal; phù hợp script, từ xa hoặc máy chủ |

> **Mô hình khuyên dùng**: để có kết quả tốt nhất, dùng **Kimi K3** (hoặc Claude) điều khiển quy trình, kết hợp tạo ảnh AI — **`gpt-image-2.5-sunburst`** (OpenAI) hoặc **`gemini-nano-banana-2.1`** (Google).

### 3. Cài đặt

**Cách A — Git clone** (khuyên dùng; cần cài [Git](https://git-scm.com/downloads)): có thể cập nhật bản mới bất cứ lúc nào.

```bash
git clone https://github.com/iDMA-dev/HugoPPTPilot.git
cd HugoPPTPilot
```

Sau đó cài thư viện:

```bash
pip install -r requirements.txt
```

**Cách B — Tải ZIP** (không cần Git; hợp để dùng thử nhanh): nhấn **Code → Download ZIP** trên trang GitHub của dự án, giải nén rồi chạy `pip install -r requirements.txt`. Bản ZIP không có lịch sử Git nên không thể `git pull` — xem phần Cập nhật bên dưới.

#### Cập nhật về sau

**Cài bằng Git clone:**

```bash
python3 skills/ppt-master/scripts/update_repo.py
```

Script sẽ kéo bản mới nhất và đồng bộ thư viện Python khi `requirements.txt` thay đổi.

**Cài bằng ZIP:**

Thư mục ZIP không có lịch sử Git nên không `git pull` được. Để cập nhật, tải ZIP mới nhất, giải nén vào thư mục mới, chép `.env` và thư mục `projects/` cũ sang, rồi chạy:

```bash
pip install -r requirements.txt
```


### 4. Tạo slide

**Trước hết, mở thư mục dự án trong agent:** hãy trỏ AI vào thư mục `HugoPPTPilot` bạn vừa giải nén / clone. Với công cụ kiểu IDE, dùng **File → Open Folder** — khung chat AI thường nằm ở thanh bên; với agent CLI, `cd HugoPPTPilot` rồi mới khởi chạy. Từ đây mọi thứ diễn ra trong khung chat.

**Cung cấp tài liệu nguồn (khuyên dùng):** Đặt file PDF, DOCX, ảnh,… vào thư mục `projects/`, rồi cho AI biết dùng file nào. Cách lấy đường dẫn nhanh nhất: nhấp phải vào file trong trình quản lý file hoặc thanh bên IDE → **Copy Path** (hoặc **Copy Relative Path**) rồi dán thẳng vào chat.

```
Bạn: Hãy tạo PPT từ projects/bao-cao-q3/sources/bao-cao.pdf, nội dung bằng tiếng Việt
```

**Dán nội dung trực tiếp:** bạn cũng có thể dán văn bản thẳng vào khung chat để AI tạo PPT từ đó.

```
Bạn: Hãy chuyển nội dung sau thành PPT tiếng Việt: [dán nội dung của bạn...]
```

Mặc định — trừ khi bạn yêu cầu tạo nhanh — AI sẽ xác nhận bản thiết kế trước:

```
AI:  Được. Cùng xác nhận bản thiết kế nhé:
     [Mẫu]      B) Thiết kế tự do
     [Định dạng] PPT 16:9
     [Số trang]  8-10 trang
     ...
```

AI lo toàn bộ — phân tích nội dung, thiết kế hình ảnh, tạo SVG và xuất PPTX.

> 💡 **Mẹo cho tiếng Việt:** hãy nói rõ *"nội dung và ngôn ngữ của bộ slide là tiếng Việt"*. Agent sẽ gắn thẻ ngôn ngữ `vi-VN` cho bộ slide, chọn phông có đủ dấu (Segoe UI, Arial, Calibri, Tahoma, …) và để dư khoảng cách dòng cho các dấu chồng như `ệ`, `ấ`, `ữ`. Chi tiết → [Hỗ trợ tiếng Việt](./docs/vi/vietnamese-support.md).

**Tạo nhanh (bỏ vòng xác nhận):** nói rõ ý đó, AI sẽ đi thẳng tới soạn nội dung và xuất file.

```
Bạn: Tạo nhanh bộ slide 5 trang từ projects/bao-cao-q3/sources/bao-cao.pdf bằng tiếng Việt — không cần hỏi lại tôi
```

Điều gì bạn nói rõ thì được làm theo; điều gì bạn bỏ ngỏ thì agent tự quyết thay vì hỏi. Nó vẫn chuyển đổi nguồn, bổ sung thông tin còn thiếu, áp dụng nền tảng hình ảnh chung và dùng ảnh / biểu tượng / hình khối native / biểu đồ / bảng / công thức PowerPoint khi cần — chỉ bỏ phần tương tác và lập kế hoạch lâu dài, không bỏ khả năng trình bày. Chế độ này chạy một lượt, không thể tiếp tục giữa chừng, và không có bản xem trước `svg_final/`. Hướng dẫn đầy đủ → [Chế độ Quick](./docs/vi/getting-started.md#quick-mode).

> **Kết quả:** bộ slide nằm ở `exports/<tên>_<thời gian>.pptx` dưới dạng DrawingML chỉnh sửa được hoàn toàn; luồng mặc định còn ghi các bản xem trước từng trang vào `svg_final/`. Biểu đồ và bảng mặc định là hình khối chỉnh sửa được; thêm `--native-charts-and-tables` để có đối tượng Chart / Table của PowerPoint có dữ liệu bên trong với **Edit Data**, lưu thành file riêng `_native_charts_tables.pptx`. Công thức được biên dịch thành OMML chỉnh sửa được cho PowerPoint 2010+. Sao lưu, ghi chú, công tắc hiệu ứng và thuyết minh, cùng các giới hạn ngoài PowerPoint → [FAQ](./docs/vi/faq.md).

> **Đã có sẵn file `.pptx` muốn tái sử dụng?** Đưa AI bộ slide đó cùng tài liệu và yêu cầu "điền bộ slide này bằng nội dung mới" — Edit Native PPTX giữ nguyên thiết kế và các trang không đổi (đến từng byte), sửa các trang được chọn, hỗ trợ chọn/sắp xếp lại, và có thể thêm ghi chú hoặc thuyết minh. Xem [FAQ](./docs/vi/faq.md) và [quy trình](./skills/ppt-master/workflows/edit-native-pptx.md).

> **Gặp sự cố?** Nếu AI mất ngữ cảnh, hãy bảo nó đọc `skills/ppt-master/SKILL.md`; các vấn đề khác xem **[FAQ](./docs/vi/faq.md)** — gồm chọn mô hình, lỗi bố cục, lỗi xuất file,… và được cập nhật liên tục từ phản hồi thực tế.

### 5. Lấy hình ảnh (tùy chọn)

Có hai đường lấy ảnh không do người dùng cung cấp, có thể trộn theo từng ảnh trong cùng bộ slide:

**A) Tạo ảnh bằng AI** — dùng công cụ tạo ảnh có sẵn của agent host nếu có, hoặc `image_gen.py` với `IMAGE_BACKEND` cùng `*_API_KEY` của nhà cung cấp. Tạo ảnh bằng host không cần khóa API riêng; hãy bảo agent dùng công cụ ảnh của chính nó. Chạy `python3 skills/ppt-master/scripts/image_gen.py --list-backends` để xem đường dùng nhà cung cấp đã cấu hình. `gpt-image-2.5-sunburst` là mặc định hiện tại của OpenAI.

**B) Tìm ảnh trên web** — `image_search.py`. **Chạy được ngay không cần cấu hình**; cấu hình `PEXELS_API_KEY` / `PIXABAY_API_KEY` (đều miễn phí) để có kết quả chất lượng ổn định hơn:

- Không có khóa: chỉ tìm trên Openverse / Wikimedia Commons — hữu ích làm phương án dự phòng, nhưng chất lượng ảnh không đồng đều vì nhiều ảnh là ảnh người dùng tải lên thông thường
- Có khóa: chuỗi nhà cung cấp mặc định bổ sung Pexels / Pixabay, cải thiện rõ rệt ảnh stock hiện đại, con người, nơi làm việc, đời sống và minh họa
- Giấy phép được xử lý tự động: CC0, Public Domain, giấy phép không cần ghi nguồn của Pexels / Pixabay, CC BY và CC BY-SA đều được cân nhắc, và Executor thêm một dòng ghi công nhỏ khi ảnh được chọn yêu cầu. Chỉ dùng `--strict-no-attribution` khi slide không chấp nhận bất kỳ dòng ghi công nào
- Với ảnh bìa, ảnh sản phẩm, chân dung, cảnh thương hiệu quan trọng, thứ tự ưu tiên: ảnh độ phân giải cao do người dùng cung cấp / tạo bằng AI > tìm web có khóa Pexels / Pixabay > tìm web không cấu hình

Các khóa API nói trên đều nằm trong `.env`. Bản cài bằng clone có thể dùng `cp .env.example .env`; bản cài qua skill marketplace nên dùng cấu hình người dùng cố định:

```bash
mkdir -p ~/.ppt-master
cp /path/to/installed/ppt-master/.env.example ~/.ppt-master/.env
```

HugoPPTPilot đọc biến môi trường của tiến trình hiện tại trước, rồi tới file `.env` đầu tiên tìm thấy theo thứ tự: thư mục làm việc hiện tại, thư mục skill (vd. `~/.agents/skills/ppt-master/.env`), thư mục gốc repo đã clone, `~/.ppt-master/.env`.

> Tài liệu đầy đủ: [`image-generator.md`](./skills/ppt-master/references/image-generator.md) (AI) · [`image-searcher.md`](./skills/ppt-master/references/image-searcher.md) (web).

---

## Tài liệu

| | Tài liệu | Mô tả |
|---|----------|-------|
| 📘 | [Bắt đầu](./docs/vi/getting-started.md) | Bộ slide đầu tiên trong 3 bước, cùng cách dùng mẫu, xem trước trực tiếp, hiệu ứng, thuyết minh (**người mới bắt đầu từ đây**) |
| 🇻🇳 | [Hỗ trợ tiếng Việt](./docs/vi/vietnamese-support.md) | Phông chữ, dấu chồng, giọng đọc, giao diện tiếng Việt và mẹo viết yêu cầu |
| 🪟 | [Cài đặt trên Windows](./docs/vi/windows-installation.md) | Hướng dẫn từng bước cho người dùng Windows |
| 📖 | [SKILL.md](./skills/ppt-master/SKILL.md) | Quy trình và quy tắc cốt lõi (tiếng Anh) |
| 📐 | [Định dạng khung slide](./skills/ppt-master/references/canvas-formats.md) | PPT 16:9, Xiaohongshu, WeChat và 10+ định dạng |
| 🛠️ | [Script & công cụ](./skills/ppt-master/scripts/README.md) | Toàn bộ script và lệnh |
| ❓ | [FAQ](./docs/vi/faq.md) | Chọn mô hình, chi phí, xử lý lỗi bố cục, mẫu tùy chỉnh |

---

## Đóng góp

Xem [CONTRIBUTING.md](./CONTRIBUTING.md) để biết cách tham gia.

## Giấy phép

[MIT](LICENSE) — giữ nguyên bản quyền của tác giả gốc.

## Ghi nhận

[SVG Repo](https://www.svgrepo.com/) · [Tabler Icons](https://github.com/tabler/tabler-icons) · [Simple Icons](https://github.com/simple-icons/simple-icons) · [Phosphor Icons](https://github.com/phosphor-icons/core) · [Robin Williams](https://en.wikipedia.org/wiki/Robin_Williams_(author)) (nguyên tắc CRAP)

Xem [thông báo bên thứ ba về biểu tượng](./skills/ppt-master/templates/icons/THIRD_PARTY_NOTICES.md) để biết phiên bản, giấy phép và ranh giới thương hiệu.

Bộ chuyển đổi PDF tùy chọn phụ thuộc [PyMuPDF](https://pymupdf.readthedocs.io/), theo giấy phép AGPL-3.0 chứ không phải MIT; chỉ cần khi nguồn là PDF. Xem [conversion.md](./skills/ppt-master/scripts/docs/conversion.md) trước khi phân phối lại gói có kèm nó.

## Liên hệ

- 💬 **Hỏi đáp & chia sẻ** — [GitHub Discussions](https://github.com/iDMA-dev/HugoPPTPilot/discussions)
- 🐛 **Báo lỗi & đề xuất tính năng** — [GitHub Issues](https://github.com/iDMA-dev/HugoPPTPilot/issues)

<p align="right"><sub>Dựa trên PPT Master của Hugo He · MIT</sub></p>
