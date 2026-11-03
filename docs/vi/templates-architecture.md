# Kiến trúc mẫu: Brand / Style / Layout / Deck

[Tiếng Việt](./templates-architecture.md)

---

> Đây là **tài liệu thống nhất kiến trúc**. Nó định nghĩa bốn loại mẫu ở tầng mô hình dữ liệu, tập trường của từng `design_spec.md`, và các quy tắc cài đặt đa đường + sở hữu phân đoạn. Đối tượng đọc: người đóng góp và các quy trình AI; trả lời "thư mục mẫu nên / không nên chứa gì; chúng kết hợp thế nào khi cung cấp nhiều cái".
>
> Về cách dùng hướng người dùng (cách kích hoạt, cách chọn), xem [`templates-guide.md`](./templates-guide.md); không lặp lại ở đây.

---

## 1. Bốn loại

| Loại | Thư mục gốc workspace thư viện | Ghi gì | KHÔNG ghi gì | Quy trình khởi nguồn |
|---|---|---|---|---|
| **Brand** | `templates/brands/<id>/` | Chỉ phân đoạn bản sắc: màu / kiểu chữ / logo / giọng điệu / phong cách biểu tượng | Không khung, cấu trúc trang, danh sách SVG | `workflows/create-template/create-brand.md` |
| **Style** | `templates/styles/<id>/` | Hướng/phương pháp di động: phương pháp truyền đạt, từ vựng vai trò trang, cách thể hiện bằng chứng/dữ liệu, mặc định hình ảnh, hướng ảnh/biểu tượng, trọng tâm rà soát mang tính tư vấn | Không sự thật bản sắc, hợp đồng ứng dụng, khung, cấu trúc trang hay danh sách SVG | `workflows/create-template/create-style.md` |
| **Layout** | `templates/layouts/<id>/` | Chỉ phân đoạn cấu trúc trung lập thương hiệu: khung / cấu trúc trang / vai trò chữ ngữ nghĩa / loại trang / danh sách SVG | Không bản sắc thương hiệu và không ứng dụng truyền đạt lặp lại | `workflows/create-template/create-layout.md` |
| **Deck** | `templates/decks/<id>/` | Một họ bài thuyết trình lặp lại: bối cảnh ứng dụng mô tả + bản sắc tích hợp + cấu trúc | — | `workflows/create-template/create-deck.md` |

Mọi SVG Layout/Deck mới tạo đều là bản xem trước hoàn chỉnh với khóa Master/Layout gốc và tên bộ chọn, các phần tử nguyên tử Master/Layout trực tiếp, và các nhóm slot ngữ nghĩa cấp cao nhất. Một slot bình thường có biên vùng thiết kế dương và đúng một thẻ mang tương thích; vùng `object` hỗn hợp dùng ràng buộc proxy tường minh, và Layout không có slot vẫn hợp lệ. Các dấu hiệu chuyên biệt này có thẩm quyền; gợi ý `data-pptx-role` tối thiểu chỉ được thêm cho hành vi khung trang cấu trúc mà chúng không diễn đạt được. Create Template suy ra `standard` / `fidelity` / `mirror` nội bộ từ ý định ngôn ngữ tự nhiên và bằng chứng nguồn. Các chiến lược soạn tạo SVG và cấu trúc mới; mirror hiện thực hóa dữ kiện nguồn đã kiểm chứng. Strategist về sau suy ra hành vi bộ xuất nghiêm ngặt/thích nghi từ các nguyên mẫu thực tế và nội dung hiện tại. Không giá trị triển khai nào trong số này là lựa chọn bắt buộc của người dùng. Generate chỉ chấp nhận hợp đồng workspace lồng hiện hành; các gói phẳng hoặc ngữ nghĩa cũ phải được dựng lại qua Create Template và không bao giờ được nâng cấp tại chỗ.

Bốn loại là **các bó quy tắc tái sử dụng song song**, không phải kiểu đối tượng gói PowerPoint. Ở phạm vi thư viện, thư mục vật lý và trường frontmatter `kind` tương ứng một-một:

Mỗi spec đã cài giữ `kind` và id riêng của nó; không có spec dự án gộp và không có nhãn khả năng kết hợp. Hệ quả định tuyến được suy ra khi đọc: cấu trúc đến từ Layout hoặc Deck đã cài, bản sắc từ Brand hoặc Deck đã cài, hướng từ Style đã cài. Vì vậy một cặp Brand + Layout cục bộ dự án có cả hai khả năng được cài mà không bị nâng thành Deck thư viện tái sử dụng hay bịa ra bối cảnh ứng dụng. Cam kết truyền đạt Giai đoạn 1 của dự án hiện tại cung cấp bối cảnh đó. Strategist suy ra kế hoạch áp dụng mẫu nội bộ; bước xác nhận phơi ra kế hoạch ngôn ngữ tự nhiên chỉnh sửa được, không phải các điều khiển chế độ tái sử dụng/tuân thủ nội bộ.

```yaml
# templates/brands/anthropic/templates/design_spec.md
---
kind: brand
...
---

# templates/styles/consulting-decision/templates/design_spec.md
---
kind: style
...
---

# templates/layouts/presentation_core/templates/design_spec.md
---
kind: layout
native_structure_mode: structured
...
---

# templates/decks/中国电信/templates/design_spec.md
---
kind: deck
native_structure_mode: structured
...
---
```

### Đối tượng PowerPoint native là đích biên dịch

Các loại mẫu dự án không ánh xạ một-một với đối tượng PresentationML:

| Hợp đồng dự án | Hình chiếu native |
|---|---|
| **Brand** | Màu/phông/hiệu ứng Theme cùng quy tắc logo và tài nguyên bản sắc cố định khác |
| **Style** | Không có cấu trúc gói tái sử dụng; phương pháp và mặc định hình ảnh đã xác nhận dẫn dắt việc soạn phẳng cục bộ theo Slide |
| **Layout** | Topo Master/Layout/Placeholder, hình học tái sử dụng, vai trò chữ ngữ nghĩa và hành vi slot không gian |
| **Deck** | Các hình chiếu Brand và Layout cộng bối cảnh ứng dụng lặp lại mô tả và các nguyên mẫu thực |

Một Slide Master có thể chứa cả hình học cấu trúc lẫn hình ảnh thương hiệu. Quyền sở hữu nguồn vẫn tách biệt — Layout sở hữu topo, vị trí, vai trò chữ ngữ nghĩa và hành vi không gian; Brand sở hữu giá trị bản sắc và tài nguyên. Dưới phạm vi `layout` ở khâu sau, bộ xuất xác định định dạng placeholder cuối từ các quy tắc đó cộng chế độ đọc/thang cỡ chữ đã xác nhận; `mirror` bảo toàn định dạng nguồn và topo chữ theo nghĩa đen. Bộ xuất sau đó biên dịch các quy tắc áp dụng được vào cùng đồ thị Master/Layout native. Do đó Theme là hình chiếu triển khai của bản sắc đã xác định — dù do Brand, Deck hay dự án hiện tại cung cấp — chứ không phải loại mẫu khác. Màu và phông dự phòng của Style là hạt giống đề xuất, không phải sự thật bản sắc của Theme.

### Phạm vi đầu ra tách khỏi loại

`create-template` xác nhận workspace được đặt ở đâu. Lựa chọn thực thi này không thêm loại khác và không thêm chế độ cấu trúc PPTX:

| Phạm vi | Thư mục gốc workspace | Workspace cốt lõi | Khám phá |
|---|---|---|---|
| `library` (mặc định) | `skills/ppt-master/templates/<kind>/<id>/` | Bắt buộc `templates/`; tùy chọn `images/`, `icons/` và `exports/` theo yêu cầu | Đăng ký vào chỉ mục toàn cục tương ứng |
| `project` | `projects/<name>/` | Cùng hợp đồng định tuyến | Không cập nhật chỉ mục toàn cục |

Cả hai thư mục gốc có cùng hình dạng cốt lõi:

```text
<template_workspace>/
├── templates/
│   ├── design_spec.md
│   └── *.svg
├── images/                     # tùy chọn; href SVG dùng ../images/<name>
├── icons/
│   └── imported/               # tùy chọn; tài nguyên vector nhập chuẩn
└── exports/                    # tùy chọn; bản rà soát được yêu cầu hoặc bằng chứng nhiều Master bắt buộc
    └── <id>_template_preview.pptx
```

Thư mục tùy chọn rỗng bị bỏ; đừng thêm tệp giữ chỗ. PPTX xem trước là bằng chứng rà soát suy ra, không phải tài nguyên mẫu nguồn. Nó được tạo theo yêu cầu và là bắt buộc cho cổng gói nhiều Master. Bước 3 ghi thư mục gốc workspace làm đầu vào ứng viên, chỉ đọc phần frontmatter mà một thư mục gốc chính xác cần cho loại và khung. Sau khi Giai đoạn 1 chọn nó, giai đoạn áp dụng tiêu thụ `templates/` cộng mọi `images/` và `icons/` hiện có; nó bỏ qua `exports/`. Thư mục `exports/` của library bị Git bỏ qua.

Vector nhập dùng `data-icon="imported/<name>"` và có một tệp chuẩn tại `icons/imported/<name>.svg`. Kiểm chứng và xuất nhận biết workspace phân giải trực tiếp đường dẫn gốc đó; `templates/icons/` không thuộc hình dạng gói.

Nhập PPTX dùng mô hình siêu dữ liệu hai cấp. SVG không mất mát tạm thời giữ siêu dữ liệu hình khối native, thẻ mang ẩn và bằng chứng xem trước làm bằng chứng nguồn/gói bất biến; `svg_authoring_view.py` tạo bó IR soạn chỉnh sửa được, trong đó các SVG gọn mang ref nguồn cục bộ theo tài liệu và manifest của nó chỉ lưu đường dẫn và hash ban đầu. Các chế độ soạn dùng SVG chuẩn của dự án và nhóm preset đã soạn gọn chỉ cho các khớp preset đã đăng ký chính xác. Mirror xuất bản IR hiện hành đã rà soát làm cây nhìn thấy của nó; ref nguồn kiểm chứng danh tính và chỉ khôi phục ngữ nghĩa không nhìn thấy được hỗ trợ, các lớp cấu trúc cố định vẫn là nguyên tử trực tiếp, đối tượng không được hỗ trợ hoặc đã sửa giữ phương án dự phòng SVG, và mẫu cuối không chứa ref chỉ-IR. Bộ xuất chỉ biên dịch cấu trúc SVG đã khai báo và không bao giờ suy ra quyền sở hữu.

Cả hai phạm vi giữ `kind` đã chọn trong frontmatter di động. `output_scope` và `target_project` nằm trong bản tóm tắt quy trình và không được lưu vào `design_spec.md`.

Trước mọi lần ghi cuối, hãy xác định Design Spec và mọi đích thật. Phạm vi library đòi thư mục gốc `templates/` rỗng. Phạm vi project đòi dự án đã khởi tạo và từ chối spec trần, spec cùng loại, hoặc cách đặt tên định danh không hợp lệ; các loại riêng biệt có thể cùng tồn tại. Thêm Deck cạnh Layout giữ danh sách Layout, còn thêm Layout cạnh Deck dùng kiểm chứng cô lập và thay thế cấu trúc nguyên tử. Cả hai phạm vi từ chối va chạm tài nguyên và xem trước không liên quan trước khi ghi. Không bao giờ để lại đầu ra dở dang.

### Phân đoạn

Để quyền sở hữu đa đường được giải quyết sạch sẽ, mỗi trường thuộc một phân đoạn có tên. **Một phân đoạn đã xác định được áp dụng nguyên khối**:

| Phân đoạn | Các mục nó chứa | Chủ sở hữu ghi đè |
|---|---|---|
| **Bản sắc** | Color Scheme / Typography / Logo / Voice & Tone / Icon Style | brand |
| **Hướng / phương pháp** | Communication Method / Page Role Vocabulary / Evidence & Data Expression / Visual System Defaults / Image & Icon Direction / Review Focus | style; mặc định vẫn phụ thuộc lựa chọn người dùng đã xác nhận và các phân đoạn bản sắc/cấu trúc sở hữu |
| **Cấu trúc** | Siêu dữ liệu khung/loại trang di động, quy tắc Signature do cấu trúc sở hữu, SVG Page Roster và hợp đồng SVG Master/Layout/slot | layout |
| **Ứng dụng** | Template Overview: tình huống lặp lại, khán giả/kết quả, giả định trình bày và vai trò mạch kể/trang tiêu biểu | chỉ deck; brand / layout không ghi mục này |

### Vì sao Deck là một loại riêng

Một Deck mã hóa một **họ bài thuyết trình lặp lại**, không chỉ là sự kết hợp sẵn của Brand và Layout. Nó mô tả các tình huống truyền đạt mà mẫu phục vụ, kết quả khán giả mà nó hỗ trợ, và vai trò mạch kể/trang tiêu biểu. Bản sắc và cấu trúc được tích hợp quanh bối cảnh đó, trong khi Strategist hiện tại quyết định dùng những nguyên mẫu và nội dung nào.

`standard` / `fidelity` kiểm tra toàn bộ kiểm kê nguồn đã xác nhận và soạn một hệ thống hoàn chỉnh mới. Mirror phát ra một nguyên mẫu hoàn chỉnh cho mỗi Slide nguồn và chỉ bảo toàn danh sách Slide đó cộng dòng dõi Layout/Master truy cập được của từng Slide; Layout hoặc Master nguồn mà không Slide nguồn nào tới được nằm ngoài hợp đồng mirror. Các chế độ soạn có thể soạn lại các cấu trúc nguồn không được tham chiếu hữu ích thành nguyên mẫu Slide hoàn chỉnh mới. Mirror bảo toàn các dữ kiện nguồn trong phạm vi đó nhưng không chứng minh rằng nguồn là một Deck tái sử dụng được: việc tạo vẫn phải xác định các quy tắc ứng dụng ổn định. Nguồn chỉ cho ra bản sắc thì thành Brand; phương pháp và hướng hình ảnh tái sử dụng được mà không có nguyên mẫu thì thành Style; cấu trúc tái sử dụng trung lập thương hiệu thì thành Layout; hệ thống cấu trúc có thương hiệu hoặc ngữ pháp nội dung mang kịch bản thì thành Deck.

Điều này cũng ràng buộc chế độ tạo: mirror của Layout chỉ hợp lệ khi hợp đồng nguồn vốn đã trung lập thương hiệu và trung lập ứng dụng. Gỡ sơn thương hiệu, phông chữ, logo, đối tượng bản sắc cố định hay quy tắc ứng dụng tái sử dụng là hành vi sáng tác, nên một nguồn ngoài ranh giới đó phải hoặc dùng `standard` / `fidelity` để tạo Layout mới hoặc giữ các dữ kiện đó dưới dạng mirror của Deck.

---

## 2. Lược đồ `design_spec.md` theo loại

Lược đồ chỉ quy định các trường **bắt buộc**. "Đừng viết thứ không cần thiết" — nếu một trường không được liệt kê ở đây, đừng thêm.

### Lược đồ Brand

**Frontmatter**

```yaml
---
brand_id: <slug>
kind: brand
summary: <trường hợp dùng một dòng, gồm màu chính>
primary_color: "<HEX>"
---
```

**Các mục thân** (phân đoạn bản sắc đầy đủ)

| § | Tiêu đề | Trường bắt buộc |
|---|---|---|
| I | Brand Overview | Brand Name / Use Cases / Tone |
| II | Color Scheme | vai trò / HEX / nguồn gốc (`fact` sự thật chính thức \| `approx` suy ra) / ghi chú |
| III | Typography | vai trò / họ phông / độ đậm |
| IV | Logo | tệp / dạng / cách dùng + quy tắc vùng đệm và lockup |
| V | Voice & Tone | trang trọng / ngôi / emoji / chính sách viết tắt |
| VI | Icon Style | ưu tiên (nét / đặc / hai tông …) + thư viện khuyên dùng |

**Cấm**: viewBox khung, loại trang, danh sách SVG — đó là trách nhiệm của layout.

### Lược đồ Style

**Frontmatter**

```yaml
---
style_id: <slug>
kind: style
summary: <phương pháp di động và hướng hình ảnh một dòng>
keywords: [tag1, tag2, tag3]
---
```

**Các mục thân** (phân đoạn hướng/phương pháp)

| § | Tiêu đề | Nội dung bắt buộc |
|---|---|---|
| I | Style Overview | Tên, phù hợp rộng nhất, ý định tái sử dụng và nguồn; không ràng buộc khán giả/kết quả |
| II | Communication Method | Hạt giống chế độ ưu tiên, mạch lập luận, kỷ luật thông điệp trang và kỷ luật bằng chứng |
| III | Page Role Vocabulary | Vai trò mở với nhiệm vụ truyền đạt, nghĩa vụ bằng chứng và xu hướng bố cục; không có thứ tự/số lượng |
| IV | Evidence & Data Expression | Quy tắc luận điểm/bằng chứng, phân biệt dữ kiện/giả định/hệ quả/khuyến nghị, hướng dẫn biểu đồ/bảng/nguồn |
| V | Visual System Defaults | Hạt giống phong cách hình ảnh, bố cục, mật độ, trang trí, nhịp và mặc định bảng màu/kiểu chữ dự phòng tùy chọn |
| VI | Image & Icon Direction | Hướng dẫn dựng hình, cách dùng và xử lý mà không có kiểm kê hay ánh xạ trang |
| VII | Review Focus | Kiểm tra bổ sung chỉ dùng khi người dùng bật riêng việc rà soát hình ảnh |

Style không ghi SVG và không bao giờ sở hữu bản sắc Brand chính thức, ứng dụng Deck, khung, số trang/thứ tự, cấu trúc Master/Layout/placeholder hay tài nguyên riêng của từng trang. Giá trị bảng màu và kiểu chữ của nó là phương án dự phòng ghi đè được: lựa chọn người dùng đã xác nhận và giá trị bản sắc Brand/Deck được ưu tiên. Review Focus không thể kích hoạt rà soát hình ảnh. `kind: style` xác định gói tái sử dụng này; nó khác với lựa chọn `visual_style` của Giai đoạn 2 cuối và với giá trị xuất phẳng nội bộ `template_reuse_scope: style`.

### Lược đồ Layout

**Frontmatter**

```yaml
---
layout_id: <slug>
kind: layout
category: general | scenario | government | special
native_structure_mode: structured
summary: <trường hợp dùng một dòng>
keywords: [tag1, tag2, tag3]
canvas_format: <ppt169 | ppt43 | a4 | ...>
canvas_width: <pixels>
canvas_height: <pixels>
canvas_viewbox: "0 0 <width> <height>"
source_canvas_width: <pixels>     # khi biết khung PPTX/SVG nguồn
source_canvas_height: <pixels>
source_viewbox: "0 0 <width> <height>"
replication_mode: standard | fidelity | mirror
page_count: <N>
page_types: [<cover, toc, chapter, content, ending, ...>]
---
```

**Các mục thân** (phân đoạn cấu trúc riêng của gói)

| § | Tiêu đề | Trường bắt buộc |
|---|---|---|
| IV | Signature Design Elements | Lưới, vùng, hành vi ảnh, nhịp mật độ, khung trung lập, vai trò chữ ngữ nghĩa, hành vi căn chỉnh/ngắt dòng/sức chứa và quy ước slot riêng của Layout |
| V | Page Roster | Mọi tệp SVG, khóa Layout, tên bộ chọn, nội dung dự định và hành vi slot |

`Placeholder Overrides` là có điều kiện và chỉ xuất hiện khi layout đổi từ vựng soạn chuẩn. `summary` trong frontmatter mang ngữ cảnh chọn gọn. Layout bỏ Template Overview chỉ dành cho deck.

`category: scenario` chỉ là độ phù hợp khám phá. Một Layout có thể được tối ưu cho một hình dạng nội dung hoặc bối cảnh trình bày, nhưng không được quy định mục tiêu truyền đạt, kết quả khán giả, trình tự mạch kể bắt buộc, nội dung khuôn cố định hay nội dung ví dụ. Nếu các quy tắc đó tái sử dụng được, hãy tạo Deck.

**Cấm**: Color Scheme, bản sắc phông/độ đậm thương hiệu, thang cỡ chữ cuối đã xác định, logo thương hiệu, giọng điệu thương hiệu, Icon Style hay màu sự thật chính thức (`provenance: fact`). Layout có thể giữ vai trò chữ ngữ nghĩa, căn chỉnh, ngắt dòng và sức chứa vì chúng thuộc cấu trúc; giá trị sơn/phông/cỡ SVG trung lập chỉ là giàn rà soát. Màu và kiểu chữ cuối được xác định ở giai đoạn xác nhận của Strategist hoặc do loại mẫu khác cung cấp.

### Lược đồ Deck

**Frontmatter**

```yaml
---
deck_id: <slug>
kind: deck
category: brand | general | scenario | government | special
native_structure_mode: structured
summary: <họ bài thuyết trình lặp lại và kết quả dự định một dòng>
keywords: [tag1, tag2, tag3]
canvas_format: <ppt169 | ...>
canvas_width: <pixels>
canvas_height: <pixels>
canvas_viewbox: "0 0 <width> <height>"
source_canvas_width: <pixels>     # khi biết khung PPTX/SVG nguồn
source_canvas_height: <pixels>
source_viewbox: "0 0 <width> <height>"
replication_mode: standard | fidelity | mirror
page_count: <N>
primary_color: "<HEX>"
---
```

**Các mục thân** (ứng dụng + bản sắc/cấu trúc tích hợp)

| § | Tiêu đề | Phân đoạn |
|---|---|---|
| I | Template Overview | Ứng dụng |
| II | Color Scheme | Bản sắc |
| III | Typography | Bản sắc; chỉ bỏ khi dùng ngăn xếp mặc định chung |
| IV | Signature Design Elements | Mô-típ bản sắc riêng của mẫu và ngữ pháp cấu trúc tái sử dụng |
| V | Page Roster | Cấu trúc |
| VI | Assets | Tài nguyên bản sắc/hỗ trợ; bỏ khi không có |
| VII | Placeholder Overrides | Từ vựng cấu trúc; bỏ khi không có |

Template Overview xác định họ bài thuyết trình lặp lại, khán giả và kết quả dự định, giả định trình bày/đọc, và vai trò mạch kể hay trang tiêu biểu. Page Roster mô tả theo dữ kiện hợp đồng Master/Layout/slot, đặc điểm thị giác, vai trò dự định và sức chứa của từng nguyên mẫu. Nó không được gán chính sách bắt buộc/tùy chọn/lặp lại hay cố định/thay thế được/chỉ-làm-ví-dụ; Strategist suy ra các quyết định đó cho nội dung hiện tại.

Các trường khung di động, `page_count` và danh sách SVG tường minh mang phần còn lại của hợp đồng cấu trúc. Các quy tắc chung về khoảng cách, tỷ lệ phông, SVG và placeholder vẫn được tập trung và không sao chép vào từng spec deck. Mục có điều kiện bị bỏ nghĩa là "dùng mặc định chung hoặc không có tài nguyên", không phải "loại khác sở hữu phân đoạn này".

---

## 3. Bốn tệp chỉ mục

Mỗi chỉ mục trong bốn chỉ mục này ánh xạ một-một với thư mục vật lý của nó, và các trường được cắt gọn đến mức Strategist cần để chọn một workspace tái sử dụng. Trực quan hóa dùng ranh giới riêng: việc lập kế hoạch đọc [`chart-vocabulary.md`](../../skills/ppt-master/templates/charts/chart-vocabulary.md) và [`table-vocabulary.md`](../../skills/ppt-master/templates/tables/table-vocabulary.md) khách quan, trong khi [`charts_index.json`](../../skills/ppt-master/templates/charts/charts_index.json) và [`tables_index.json`](../../skills/ppt-master/templates/tables/tables_index.json) vẫn là sổ đăng ký cho máy. Cấu trúc định tính không có chỉ mục vì Executor sinh nó từ quan hệ giữa các trang.

Các chỉ mục này chỉ phủ phạm vi library. Một workspace thư mục gốc project cố ý vắng mặt trong cả bốn chỉ mục và vẫn dùng được qua đường dẫn tường minh `projects/<name>/`. Vì cả hai phạm vi có cùng hình dạng workspace, việc di chuyển hay sao chép workspace cốt lõi hoàn chỉnh giữa chúng không đòi viết lại đường dẫn tài nguyên; chỉ việc đăng ký thư viện thay đổi.

### `templates/brands/brands_index.json`

```json
{
  "<brand_id>": {
    "summary": "Anthropic brand identity — AI/LLM tech talks, developer conferences",
    "primary_color": "#D97757"
  }
}
```

- Giữ `primary_color` — Strategist cần màu chủ đạo ngay từ cái nhìn đầu khi chọn thương hiệu
- Bỏ `keywords` — summary đã mang các từ tương đương; AI khớp qua ngôn ngữ tự nhiên (cùng cách tiếp cận như thư viện biểu đồ)

### `templates/styles/styles_index.json`

```json
{
  "<style_id>": {
    "summary": "Answer-first, evidence-led decision-document defaults without page prototypes or brand identity",
    "keywords": ["consulting", "decision-support", "evidence"]
  }
}
```

- Giữ `keywords` vì việc khám phá hướng/phương pháp là ngữ nghĩa và không có danh sách cấu trúc để tóm tắt
- Không thêm khung, số trang hay màu chính; Style không sở hữu cấu trúc lẫn sự thật bản sắc

### `templates/layouts/layouts_index.json`

```json
{
  "<layout_id>": {
    "summary": "Standard academic defense layout — cover/toc/chapter/content/ending",
    "canvas_format": "ppt169",
    "page_count": 5,
    "page_types": ["cover", "toc", "chapter", "content", "ending"]
  }
}
```

- Thêm `canvas_format` / `page_count` / `page_types` — Strategist cần nhanh chóng đánh giá "bộ khung này có chứa được bộ slide của tôi không?"
- Không có `primary_color` — layout không có bản sắc

### `templates/decks/decks_index.json`

```json
{
  "<deck_id>": {
    "summary": "China Telecom government-enterprise briefing for explaining a plan and aligning next actions",
    "canvas_format": "ppt169",
    "page_count": 5,
    "primary_color": "#XXXXXX"
  }
}
```

- Gồm `primary_color` (deck mang bản sắc) + siêu dữ liệu cấu trúc
- `summary` mở đầu bằng họ bài thuyết trình lặp lại và kết quả, không chỉ giọng thị giác
- Hợp đồng ứng dụng chi tiết nằm trong Template Overview; chỉ mục gọn này không lặp lại

---

## 4. Cài đặt đa đường và sở hữu phân đoạn

### Cài đặt sao chép; không bao giờ gộp

Khi Giai đoạn 1 xác nhận các thư mục gốc workspace đã đăng ký và/hoặc chỉ định, giai đoạn áp dụng sau xác nhận phân tích `kind` thật của từng thư mục gốc và cài mỗi workspace đã chọn thành **tệp cục bộ dự án riêng của nó**:

```
<project>/templates/design_spec.brand.mckinsey.md
<project>/templates/design_spec.style.consulting-decision.md
<project>/templates/design_spec.layout.presentation_core.md
```

Thân của mỗi tệp được sao chép không đổi; chỉ một dòng nguồn gốc được thêm vào dưới H1 của nó:

```markdown
> **Installed from**: `skills/ppt-master/templates/brands/mckinsey/` (library)
```

Không có spec dự án gộp và không có nhãn khả năng kết hợp. `<project>/templates/design_spec.md` trần là hình dạng một-loại cũ: dự án đó tự nó là một workspace và không bao giờ được tiêu thụ như một mẫu đã cài. Create Template phạm vi project hiện hành ghi tên định danh theo loại, nên hai hình dạng không bao giờ dùng chung một thư mục — trộn chúng bị từ chối thay vì lặng lẽ giải quyết.

`library` / `explicit` chỉ ghi nguồn gốc khám phá và không bao giờ đổi quyền sở hữu.

### Sở hữu phân đoạn được giải quyết khi đọc

Vai trò tiêu thụ — Giai đoạn 2 cuối của Default, hoặc agent của Quick trước khi soạn — đọc mọi spec đã cài và, khi Layout/Deck sở hữu cấu trúc, mọi nguyên mẫu SVG đã cài, rồi xác định các phân đoạn này trong ngữ cảnh:

| Phân đoạn | Chủ sở hữu khởi đầu |
|---|---|
| Bản sắc | Brand, nếu không thì Deck, nếu không thì chưa xác định cho tới Giai đoạn 2 cuối; Style chỉ cung cấp ứng viên dự phòng |
| Hướng / phương pháp | Style, nếu không thì chưa xác định cho tới Giai đoạn 2 cuối; nguyên mẫu Deck thực tế và dữ kiện Signature chỉ cho biết khả năng tương thích |
| Cấu trúc | Layout khi có, nếu không thì Deck, nếu không thì chưa xác định / thiết kế tự do cho tới Giai đoạn 2 cuối |
| Bối cảnh ứng dụng tái sử dụng | Chỉ Deck; được giữ để so sánh ở Giai đoạn 2 cuối, không bao giờ dùng làm hợp đồng ứng dụng của dự án hiện tại |

Chỉ dẫn hiện tại của người dùng và xác nhận cuối ghi đè mọi chủ sở hữu khởi đầu. Bản sắc Brand vẫn có thẩm quyền hơn bảng màu/kiểu chữ dự phòng của Style. Style một mình, hoặc Style với Brand, dùng soạn trang phẳng. Style với Layout hoặc Deck theo nguồn cấu trúc đã chọn. Một Style không bao giờ tự nâng hay hạ cấu trúc.

**Một phân đoạn được sở hữu chi phối trọng lượng thị giác, không chỉ giá trị.** Khi chủ sở hữu phân đoạn khai báo rằng một giá trị nên chi phối, lùi lại hay hiếm gặp, chỉ dẫn đó có cùng thẩm quyền với chính giá trị — xu hướng khoảng trắng hay bố cục của một Style không bao giờ hạ màu chủ đạo đã khai báo của Brand xuống thành điểm nhấn tình cờ.

Trước khi kết hợp Style với Layout/Deck, hãy kiểm tra rằng phương pháp truyền đạt và kỳ vọng bố cục của nó có thể được thực hiện bởi ngữ cảnh và cấu trúc tái sử dụng đó. Khi không khớp, hãy nêu các phân đoạn mẫu xung đột; đừng lặng lẽ trộn trường hay giữ lời hứa mà cấu trúc đã chọn không đáp ứng được. Sự phù hợp với dự án hiện tại chỉ bắt đầu ở Giai đoạn 2 cuối sau khi Giai đoạn 1 được xác nhận.

### Áp dụng nguyên khối phân đoạn (độ chi tiết mặc định)

Một phân đoạn đã xác định được áp dụng **nguyên khối** — ví dụ với deck + brand, toàn bộ bộ Color Scheme / Typography / Logo / Voice / Icon Style đến từ brand. **Không có trộn cấp trường ngầm** (bạn sẽ không bao giờ nhận được "màu chính từ brand, màu phụ từ deck").

Vi chỉnh cấp trường đi qua đường giai đoạn xác nhận Strategist hiện có — người dùng nói trong chat "dùng thương hiệu anthropic nhưng đổi màu chính thành #FF0000", và Strategist chỉnh các trường tại chỗ. Việc cài đặt không thêm cú pháp cấp trường.

### Xung đột lựa chọn

Lựa chọn đầy đủ chứa tối đa một đóng góp cho mỗi loại. Layout và Deck có thể cùng tồn tại; Layout sở hữu cấu trúc. Một thư mục gốc chỉ định nhiều loại là nguyên khối và chỉ có thể cùng tồn tại với các thư mục gốc đã đăng ký thuộc loại không chồng lấn. Default từ chối xung đột ở bộ chọn Giai đoạn 1 và biên nhận máy chủ; Quick đòi một tập thư mục gốc chính xác hẹp hơn trong chat. Việc cài đặt không bao giờ lấy trung bình các spec cùng loại hay chọn theo thứ tự đường dẫn.

### Truy vết

Vì không gì bị gộp, tập đã cài tự mô tả: tên tệp mang loại và id, dòng nguồn gốc mang thư mục gốc nguồn, và phần thân còn lại không đổi. Truy vết phân đoạn nào đến từ đâu là một danh sách thư mục, không phải dựng lại phép gộp.

---

## 5. Quan hệ với Giai đoạn 1 của Generate PPTX

[Bước 3](../../skills/ppt-master/workflows/generate-pptx.md#step-3-template-candidate-preparation) của Generate mặc định chỉ chuẩn bị đầu vào ứng viên. Giai đoạn 1 trình bày cam kết truyền đạt cùng lựa chọn thiết kế tự do/mẫu có thể chuyển đổi. Yêu cầu thông thường bắt đầu ở thiết kế tự do với các điều khiển chi tiết thu gọn; ý định dùng mẫu rõ ràng hoặc bất kỳ thư mục gốc chính xác nào bắt đầu ở chế độ mẫu. Đúng một thư mục gốc được cung cấp thì được chọn sẵn, còn nhiều thư mục gốc vẫn là ứng viên chưa chọn. Một tên mẫu/thương hiệu trống không hay cụm từ phong cách không bao giờ phân giải thành hay chọn sẵn một workspace. Với mỗi thư mục gốc đã chọn, giai đoạn áp dụng sau xác nhận phân giải hoặc một spec trần của library hoặc mọi spec định danh của project. Gói thư mục gốc phẳng không phải workspace mẫu. Các gói dùng ngữ nghĩa cũ như `native_structure_mode: template`, thiếu danh tính Master, placeholder nguyên tử trực tiếp hay dấu hiệu thời chưng cất bị từ chối; `create-template` phải tạo workspace mới trước khi việc tạo tiếp tục. Trường `kind` quyết định **AI xử lý đường dẫn đã chọn thế nào**:

| `kind` của đường dẫn người dùng | Hành vi áp dụng sau xác nhận Giai đoạn 1 (nhánh theo loại) |
|---|---|
| `kind: brand` | Cài spec bản sắc định danh và tài nguyên thuộc thư mục gốc; cấu trúc vẫn tự do trừ khi tập cũng chứa Layout hoặc Deck |
| `kind: style` | Cài spec hướng/phương pháp định danh; không đòi danh sách hay tài nguyên do Style sở hữu và giữ trang sinh ra phẳng trừ khi tập chứa Layout hoặc Deck |
| `kind: layout` | Cài spec cấu trúc định danh cùng danh sách SVG và tài nguyên của thư mục gốc đó; nó được ưu tiên cấu trúc hơn Deck |
| `kind: deck` | Cài spec ứng dụng/bản sắc/cấu trúc định danh và tài nguyên; chỉ cài danh sách SVG của nó khi không chọn Layout |
| Thư mục gốc nhiều loại | Bảo toàn mọi spec định danh và ánh xạ tài nguyên dùng chung một lần; giữ đúng danh sách Layout-hoặc-Deck hiệu lực |
| Xung đột lựa chọn | Từ chối loại trùng lặp trước khi cài |

Bitmap dùng chung kho `images/` của workspace và SVG mẫu tham chiếu chúng qua `../images/`. Nếu thư mục gốc đầu vào tường minh chính là thư mục gốc của dự án đích, giai đoạn áp dụng tiêu thụ workspace tại chỗ: đừng sao chép nó lên chính nó và đừng chuyển lại tài nguyên của nó. Nếu không, thư mục gốc project dùng trực tiếp được bởi dự án khác. Chuyển một đóng góp vào thư viện giữ thân spec của nó nhưng đổi cách đặt từ tên tệp project định danh sang spec trần bên trong workspace thư viện một loại, tiếp theo là đăng ký.

### Hành vi giai đoạn xác nhận của Strategist theo loại

Cài một mẫu không thu hẹp câu hỏi truyền đạt. Giai đoạn 1 xác nhận cùng cam kết truyền đạt mở cùng với, nhưng độc lập với, lựa chọn mẫu. Mục tiêu truyền đạt (khán giả, ý định, kết quả, thông điệp cốt lõi, bối cảnh trình bày và vòng đời sau đó) chỉ đến từ yêu cầu hiện tại, dữ kiện nguồn, ràng buộc cuộc trò chuyện và việc khởi tạo dự án; dữ kiện mẫu đã có trong ngữ cảnh chỉ được dùng để gợi ý khung và khoảng số trang, và khung khác với lúc khởi tạo dự án là một quyết định nhìn thấy ở Giai đoạn 1. Chỉ sau khi Giai đoạn 1 đóng và mọi lựa chọn được cài, Giai đoạn 2 cuối mới kiểm tra trạng thái đó và xác nhận giải pháp hoàn chỉnh cùng kế hoạch sản xuất. Brand cung cấp ràng buộc bản sắc trong khi cấu trúc vẫn tự do; Style cung cấp hạt giống phương pháp và mặc định hình ảnh trong khi vẫn phẳng; Layout phơi khả năng cấu trúc; Deck đóng góp bối cảnh ứng dụng tái sử dụng mô tả để so sánh, không phải hợp đồng của dự án hiện tại. Với việc dùng chỉ-Style, Strategist không tìm nguyên mẫu và ghi xác định `template_reuse_scope: style` với cấu trúc phẳng. Nếu không, nó kiểm tra mọi nguyên mẫu hiệu lực — Layout khi có, nếu không thì Deck — và nội dung hiện tại, rồi soạn một kế hoạch trang/nguyên mẫu và ghi `mirror`, `layout` hoặc `style` chỉ như giá trị bộ xuất nội bộ. Vì vậy workspace soạn bằng mirror cho phép tái sử dụng theo nghĩa đen nhưng không bao giờ ép buộc.

Default vẫn trình bày ba hướng thiết kế tuân thủ mẫu. Hướng Khuyên dùng là hướng khả thi thể hiện đầy đủ nhất ngữ cảnh mẫu đã xác định; hai hướng còn lại chỉ biến đổi những chiều mà ngữ cảnh đó và người dùng để mở. Quick không hiện thực hóa tập ứng viên nào và trực tiếp thực thi cùng quy tắc hướng khuyên dùng đó.

Default xác nhận một đoạn ngôn ngữ tự nhiên `template_application`; Quick đóng băng cùng quyết định đó chỉ trong ngữ cảnh hoạt động. Câu chữ tường minh của người dùng thắng, nếu không agent quyết từ nội dung và toàn bộ danh sách SVG, với việc dùng kiểu tham chiếu dẫn dắt làm phương án dự phòng. Tham chiếu, chỉ-bổ-sung và chỉ-thay-thế là các mẫu mô tả chứ không phải trường cố định. Mọi ngoại lệ riêng của nguyên mẫu nêu đúng tên cơ sở SVG. Lựa chọn lúc chạy không đổi khả năng cấu trúc: đầu ra tự do/chỉ-Brand/chỉ-Style là phẳng, còn đầu ra Layout/Deck bảo toàn siêu dữ liệu Master/Layout/slot tường minh trừ khi người dùng yêu cầu rõ chỉ dùng hình ảnh. Confirm UI phơi Thiết kế tự do / Dùng mẫu và trường văn xuôi, nhưng không phơi các trường tái sử dụng/tuân thủ nội bộ. Ngữ nghĩa lập kế hoạch nằm trong `references/strategist.md` và `references/strategist-template.md`; `templates/schemas/spec_lock.schema.json` sở hữu cấu trúc máy bền vững của Default, còn Quick kiểm chứng trực tiếp hợp đồng cấu trúc SVG toàn trang.

---

## 6. Quan hệ với các đường và quy trình con

| Đường hoặc quy trình con | Tạo ra |
|---|---|
| `workflows/create-template.md` | Điểm vào Create Template cố định và hợp đồng chung về phạm vi, xác nhận, kiểm tra sơ bộ, soạn có cấu trúc, đăng ký, hoàn tất và bàn giao; điều phối đúng một quy trình con |
| `workflows/create-template/create-brand.md` | Workspace Brand chỉ-bản-sắc; không có danh sách SVG và thư mục tùy chọn rỗng bị bỏ |
| `workflows/create-template/create-style.md` | Workspace Style chỉ-hướng/phương-pháp; không có danh sách SVG, sự thật bản sắc, hợp đồng ứng dụng, cấu trúc native hay PPTX xem trước |
| `workflows/create-template/create-layout.md` | Workspace Layout cấu trúc trung lập thương hiệu với danh sách SVG có cấu trúc |
| `workflows/create-template/create-deck.md` | Hợp đồng ứng dụng lặp lại với bản sắc/cấu trúc tích hợp và danh sách SVG có cấu trúc; được chọn khi sản phẩm tái sử dụng có thương hiệu hoặc mang kịch bản, không chỉ vì nguồn là PPTX hoàn chỉnh |

**Một lược đồ, hai điểm đáp.** Mẫu là một hợp đồng đơn đáp xuống hai tầng, và khác biệt duy nhất là cái gì đặt tên cho Design Spec:

| Tầng | Vật chứa | Design Spec |
|---|---|---|
| Thư viện skill | `templates/<kind_dir>/<template_id>/` đã đặt tên loại và id | `templates/design_spec.md` |
| Dự án | một `templates/` phẳng dùng chung cho các loại | `templates/design_spec.<kind>.<id>.md` |

Vật chứa phân biệt, và tên tệp chỉ mang những gì vật chứa không thể. Do đó thư mục gốc project chứa tối đa một spec cho mỗi loại trong khi cả bốn loại có thể cùng tồn tại, và `kind`/id trong mỗi tên tệp phải khớp `kind` trong frontmatter và `<kind>_id` tương ứng; hình dạng trần và định danh không bao giờ trộn trong một thư mục. Một `templates/` mang một danh sách SVG đang hoạt động: Layout khi có, nếu không thì Deck. Các phân đoạn khác của Deck vẫn được cài khi danh sách cấu trúc của nó bị che khuất. Vì bản thân lược đồ không đổi theo tầng, một spec project không cần thêm trường nào để vào thư viện và không cần bớt trường nào để rời đi, và một spec đã cài không thể phân biệt với một spec soạn tại chỗ.

Việc chọn theo cùng nguyên tắc: đơn vị là **thư mục gốc** workspace, không phải loại. Một thư mục gốc đóng góp mọi loại nó phơi ra, nên trỏ vào một dự án chứa Brand cộng Style sẽ áp dụng cả hai. Duyệt thư viện theo loại chỉ là cách tìm một thư mục gốc — `library` và `explicit` ghi cách một thư mục gốc được khám phá, không bao giờ ghi nó sở hữu gì.

Ở phạm vi library, trường frontmatter `kind` quyết định thư mục cha workspace nào được dùng dưới `templates/brands/` / `templates/styles/` / `templates/layouts/` / `templates/decks/`. Phạm vi project giữ cùng ngữ nghĩa loại ở thư mục gốc workspace dự án. Tái sử dụng project-sang-project bảo toàn thư mục gốc hoàn chỉnh. Chuyển một đóng góp vào hay ra khỏi thư viện một loại bảo toàn lược đồ spec và tài nguyên của nó nhưng đổi cách đặt tên tệp spec và đăng ký chỉ mục.

---

## 7. Điều không phải mục tiêu (danh sách từ chối đi cùng khung này)

- **Không có cú pháp ghi đè cấp trường ở tầng cài đặt** — chỉnh cấp trường dùng đường giai đoạn xác nhận Strategist hiện có
- **Không chọn loại trùng lặp** — hãy thu hẹp các thư mục gốc đã chọn trước khi cài; Layout cộng Deck được giải quyết bằng ưu tiên cấu trúc
- **Không có bảng ánh xạ tên song ngữ** — mẫu được đặt tên theo ngôn ngữ gốc của thương hiệu / kịch bản của nó (mẫu tiếng Việt dùng tên tiếng Việt; mẫu tiếng Anh dùng snake_case); không ép thống nhất
- **Không có nhánh cấu trúc theo phạm vi đầu ra hay cờ CLI** — phạm vi đầu ra là quyết định trong bản tóm tắt `create-template`; cả hai phạm vi layout/deck khai báo `native_structure_mode: structured`, trong khi Brand/Style vẫn không có danh sách
- **Không có loại Theme** — Theme chiếu bản sắc đã xác định từ Brand, Deck hoặc dự án hiện tại; giá trị dự phòng của Style không phải sự thật bản sắc
- **Không tự động rà soát hình ảnh từ Style** — Review Focus bổ sung cho lượt rà soát đã bật và không bao giờ kích hoạt nó
- **Không tự động nâng Brand + Layout thành Deck thư viện tái sử dụng** — tổ hợp có thể được định tuyến như một bó khả năng deck cục bộ dự án, trong khi Deck tái sử dụng vẫn đòi một hợp đồng ứng dụng
