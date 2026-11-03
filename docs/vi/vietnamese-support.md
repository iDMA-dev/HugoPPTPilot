# Hỗ trợ tiếng Việt

[English](../README.md) | Tiếng Việt

---

HugoPPTPilot không bị buộc vào một ngôn ngữ: AI viết nội dung bằng ngôn ngữ bạn yêu cầu, và bộ xuất PPTX gắn thẻ ngôn ngữ vào file. Trang này nói rõ **điều gì đã được hỗ trợ cho tiếng Việt**, **điều gì bạn nên làm** để có kết quả tốt nhất, và **những giới hạn còn lại**.

## 1. Cách yêu cầu để ra bộ slide tiếng Việt

Hãy nói rõ ngôn ngữ ngay trong yêu cầu đầu tiên:

```
Tạo PPT từ projects/bao-cao/sources/bao-cao.pdf. Toàn bộ nội dung trên slide và ghi chú người trình bày viết bằng tiếng Việt.
```

- Nếu tài liệu nguồn bằng tiếng Anh/Trung nhưng bạn muốn slide tiếng Việt, hãy nói rõ *"dịch và trình bày bằng tiếng Việt"*; nếu không agent có thể giữ ngôn ngữ nguồn.
- Thẻ ngôn ngữ của bộ slide là `vi-VN` (BCP-47). Script chấp nhận `vi`, `vi-VN`, `vi_vn` — nhưng **không** chấp nhận tên tự nhiên như `Vietnamese`.
- Trong giao diện xác nhận thiết kế, ô *Phông chữ cho ngôn ngữ chính* sẽ lọc theo tiếng Việt.

## 2. Giao diện tiếng Việt (bản Việt hóa này bổ sung)

| Thành phần | Trạng thái |
|---|---|
| Trang **Xác nhận thiết kế** (`confirm_ui`) | Có ngôn ngữ **Tiếng Việt** trong menu chọn ngôn ngữ; tự nhận theo ngôn ngữ trình duyệt `vi*` |
| Trang **Duyệt Design Spec** (`spec_review`) | Có tiếng Việt, tự nhận theo trình duyệt |
| Nhãn danh mục (phong cách, bảng màu, biểu tượng…) | Hiện **bằng tiếng Anh** nếu chưa có bản dịch Việt; thứ tự dự phòng là `vi → en → zh → ja` |
| Tài liệu người dùng | `README.md` và thư mục `docs/vi/` |
| Tài liệu dành cho AI (`SKILL.md`, `references/`, `workflows/`) | **Giữ tiếng Anh có chủ đích** — xem [`docs/rules/language.md`](../rules/language.md): chỉ dẫn viết bằng một ngôn ngữ sẽ làm lệch ngôn ngữ đầu ra của mô hình |

## 3. Phông chữ cho tiếng Việt

Tiếng Việt dùng chữ Latinh mở rộng (có thêm `ă â ê ô ơ ư đ` và 5 dấu thanh), nên cần phông có đủ khối *Latin Extended-A/B* và *Latin Extended Additional*. Các phông Office/Windows sau hiển thị đầy đủ dấu và có trong danh mục phông của HugoPPTPilot:

| Kiểu | Phông khuyên dùng |
|---|---|
| Không chân (sans-serif) | **Segoe UI**, **Arial**, **Calibri**, **Tahoma**, **Verdana**, **Trebuchet MS**, Aptos |
| Có chân (serif) | **Times New Roman**, **Cambria**, **Georgia** |
| Đơn cách (mã nguồn) | **Consolas**, **Courier New** |

Lưu ý:

- Máy người xem phải **có sẵn phông** thì PowerPoint mới hiển thị đúng. Dùng phông Office-safe ở trên là an toàn nhất.
- Tránh các phông trang trí/thư pháp không hỗ trợ tiếng Việt: chữ có dấu sẽ rơi sang phông thay thế và lệch nét. Nếu thấy dấu "vỡ" hoặc khác kiểu chữ, đổi sang một phông trong bảng.
- Nếu cần phông riêng của thương hiệu, nhập tên chính xác ở ô *Phông chữ khác đã cài…* và kiểm tra bằng đoạn mẫu có dấu (ví dụ "Ệ Ấ Ữ Ở Ẫ").

## 4. Dấu chồng và khoảng cách dòng

Chữ Việt có thể chồng 2 dấu (ví dụ `ệ`, `ấ`, `ữ`, `Ẫ`) nên cao hơn chữ Latinh thường. Quy chuẩn thiết kế của HugoPPTPilot (`shared-standards-core.md`, mục *Natural wrapping*) đã yêu cầu các hệ chữ có dấu chồng — **tiếng Việt được nêu đích danh** — dành khoảng cách dòng nghiêng về phía trên. Bạn có thể kiểm tra:

- Tiêu đề lớn in hoa có dấu (vd. "TỔNG KẾT QUÝ III") không bị cắt đỉnh.
- Dòng đầu trong ô văn bản không chạm mép khung trên.
- Với ô văn bản nhỏ, hãy để dư chiều cao thay vì ép sát.

**Chuẩn hóa Unicode:** văn bản dán từ một số nguồn (macOS, PDF cũ) có thể ở dạng *tổ hợp* (NFD: chữ + dấu rời) thay vì *dựng sẵn* (NFC). Bộ đo văn bản của HugoPPTPilot đo hai dạng này **cho cùng một độ rộng**, nên việc ngắt dòng/kiểm tra tràn không lệch. Tuy vậy, nếu bạn thấy dấu bị tách khỏi chữ trong PowerPoint, hãy chuẩn hóa văn bản nguồn về NFC.

## 5. Ngắt dòng

Tiếng Việt viết tách từng âm tiết bằng dấu cách, nên quy tắc ngắt dòng của chữ Latinh áp dụng bình thường (khác với tiếng Thái, Lào, Khmer, Myanmar). Một vài mẹo biên tập:

- Tránh để một từ ghép bị tách ở cuối dòng khi có thể (ví dụ "chuyển đổi số", "trí tuệ nhân tạo", "Thành phố Hồ Chí Minh"). Có thể dùng dấu cách không ngắt (U+00A0) giữa các âm tiết của cụm đó.
- Giữ nguyên số + đơn vị trên một dòng: `1.250 tỷ đồng`, `15%`. Lưu ý định dạng số kiểu Việt: dấu **chấm** ngăn cách hàng nghìn, dấu **phẩy** ngăn cách thập phân (`1.250,5`).

## 6. Thuyết minh giọng đọc (TTS)

Backend `edge-tts` đã được bổ sung hai giọng Việt trong danh sách giọng thông dụng:

| Giọng | Mô tả |
|---|---|
| `vi-VN-HoaiMyNeural` | Giọng nữ, tự nhiên, khuyên dùng |
| `vi-VN-NamMinhNeural` | Giọng nam, trầm ấm |

```bash
python3 skills/ppt-master/scripts/notes_to_audio.py --list-voices --locale vi-VN
python3 skills/ppt-master/scripts/notes_to_audio.py <project_path> --voice vi-VN-HoaiMyNeural
```

Lưu ý khi viết ghi chú để đọc: viết số, ngày, đơn vị thành dạng đọc được ("hai nghìn không trăm hai mươi sáu", "ba mươi phần trăm") nếu giọng đọc sai; tránh viết tắt khó đọc (ví dụ "TP.HCM" nên viết "Thành phố Hồ Chí Minh").

Các backend khác (ElevenLabs, MiniMax, Qwen, CosyVoice) có hỗ trợ tiếng Việt hay không tùy nhà cung cấp — hãy tra danh sách giọng của nhà cung cấp đó.

## 7. Tên file và nguồn web

Khi nhập một trang web làm nguồn, tiêu đề tiếng Việt được chuyển thành tên file không dấu có gạch dưới (ví dụ *Thành phố cà phê* → `Thanh_pho_ca_phe`). Điều này chỉ ảnh hưởng tên file, không ảnh hưởng nội dung slide.

## 8. Giới hạn đã biết

- Nhãn danh mục trong giao diện xác nhận (tên phong cách, bảng màu, biểu tượng, ví dụ xem trước) chưa dịch hết sang tiếng Việt.
- Các hướng dẫn nội bộ cho AI vẫn bằng tiếng Anh (có chủ đích, xem mục 2).
- `docs/vi/` hiện chưa có bản dịch của mọi tài liệu chuyên sâu; mục lục ở [README](./README.md) ghi rõ tài liệu nào đã dịch, tài liệu còn lại dẫn về bản tiếng Anh.
- Giọng đọc và phông chữ phụ thuộc môi trường của bạn; hãy nghe thử và xem lại bằng PowerPoint thật trước khi trình bày.

## 9. Kiểm thử

Các kiểm thử hồi quy tiếng Việt nằm ở `skills/ppt-master/scripts/tests/test_vietnamese_support.py`:

```bash
cd skills/ppt-master/scripts && python3 -m unittest tests.test_vietnamese_support
```

Nó kiểm tra: chuẩn hóa thẻ `vi`/`vi-VN`, độ rộng đo NFC = NFD, bộ khóa giao diện `vi` khớp hoàn toàn với `en`, và hai giọng Edge tiếng Việt.
