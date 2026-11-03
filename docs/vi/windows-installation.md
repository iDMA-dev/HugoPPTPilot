# Hướng dẫn cài đặt trên Windows

[English](./windows-installation.md) | Tiếng Việt

---

Hướng dẫn này giúp bạn cài HugoPPTPilot trên Windows từng bước một. Làm theo, bạn sẽ có môi trường chạy được trong chưa đầy 10 phút.

---

## Bước 1 — Cài Python (bắt buộc)

Python là yêu cầu cứng duy nhất.

1. Vào **[python.org/downloads](https://www.python.org/downloads/)** và tải bộ cài **Python 3.10–3.14**. Bản mới nhất ở đó có thể mới hơn các gói dựng sẵn của một số thư viện phụ thuộc, khi đó `pip install` sẽ cố biên dịch chúng và thất bại (xem [Xử lý sự cố](#pip-install-lỗi-khi-biên-dịch-gói-từ-mã-nguồn)).

2. **⚠️ QUAN TRỌNG: tích "Add python.exe to PATH"** khi cài — đây là lỗi phổ biến nhất trên Windows. Bỏ qua bước này sẽ làm hỏng mọi bước sau.

3. Cài xong, mở **PowerShell** (gõ "PowerShell" ở menu Start) và kiểm tra:

   ```powershell
   python --version
   ```

   Bạn sẽ thấy `Python 3.12.x` hoặc tương tự. Nếu thấy "Python was not found" hoặc nó mở Microsoft Store, xem [Xử lý sự cố](#python-was-not-found-hoặc-mở-microsoft-store).

> **💡 Mẹo**: Python cài qua Anaconda hoặc Miniconda cũng dùng được — chỉ cần `python --version` hiển thị 3.10–3.14.

---

## Bước 2 — Tải dự án

**Cách A — Tải ZIP** (dễ nhất):

1. Vào [github.com/iDMA-dev/HugoPPTPilot](https://github.com/iDMA-dev/HugoPPTPilot)
2. Nhấn nút **Code** màu xanh → **Download ZIP**
3. Giải nén vào `C:\Users\TenCuaBan\ppt-master`

**Cách B — Git Clone** (cần cài [Git](https://git-scm.com/downloads)):

```powershell
git clone https://github.com/iDMA-dev/HugoPPTPilot.git
```

Sau đó vào thư mục vừa clone:

```powershell
cd ppt-master
```

---

## Bước 3 — Cài thư viện phụ thuộc

```powershell
cd C:\Users\TenCuaBan\ppt-master   # ← sửa cho đúng đường dẫn thực tế
pip install -r requirements.txt
```

> Nếu `pip` không được nhận diện, thử `python -m pip install -r requirements.txt`.

Chờ cài xong. Cuối cùng bạn sẽ thấy `Successfully installed ...`.

---

## Bước 4 — Kiểm tra môi trường

```powershell
python -c "import pptx; import fitz; print('All core dependencies OK')"
```

✅ Kết quả `All core dependencies OK` → bạn đã sẵn sàng.

❌ Báo lỗi → xem [Xử lý sự cố](#xử-lý-sự-cố) bên dưới.

---

## Bước 5 — Chạy một ví dụ nhỏ

Mở thư mục `ppt-master` trong một công cụ AI có khả năng agent (Claude Code, Codex, Cursor, agent trong VS Code, …) và gõ vào khung chat:

```
Tạo nhanh một bộ PPT thử nghiệm 3 trang tiếng Việt gồm trang bìa, một trang nội dung và trang kết. Chủ đề: "Xin chào Việt Nam". Không cần hỏi lại tôi.
```

Yêu cầu **tạo nhanh** giúp bài kiểm tra ngắn gọn: AI bỏ qua phân tích của Strategist và các vòng xác nhận thiết kế, đi thẳng tới soạn nội dung và xuất file. Luồng mặc định sẽ xác nhận bản thiết kế với bạn trước — rất phù hợp cho bộ slide thật, nhưng chậm khi bạn chỉ muốn kiểm tra môi trường. Hướng dẫn đầy đủ → [Chế độ Quick](./getting-started.md#quick-mode).

Khi xong, bạn sẽ có:

- Một file `.pptx` DrawingML native trong `exports/`, được tạo từ `svg_output/`, mở được trong PowerPoint và chỉnh sửa được từng phần tử.

Đó là phép thử quan trọng — nếu file có mặt và mở được thì **bạn đã xong.** Lưu ý tạo nhanh bỏ qua `finalize_svg.py`, nên không có thư mục xem trước `svg_final/`; luồng mặc định có thư mục này, chứa các SVG xem trước khép kín. Có thể chèn thủ công chúng như ảnh SVG, nhưng thao tác "Convert to Shape" thủ công nằm ngoài phạm vi được hỗ trợ.

---

## Bước 6 — Tùy chọn bổ sung (đa số người dùng có thể bỏ qua)

Có Python và `requirements.txt` là bạn đã đủ mọi thứ để tạo bài thuyết trình. Việc xuất PPTX ghi các hình khối DrawingML native nên không cần CairoSVG, GTK hay bộ dựng ảnh SVG riêng. Mục dưới đây là **phương án dự phòng cho trường hợp đặc biệt** — chỉ cài khi gặp đúng tình huống.

| Bổ sung | Chỉ cài nếu… | Cách cài | Kiểm tra |
|---------|-------------|----------|----------|
| **Pandoc** — định dạng tài liệu cũ | Bạn cần chuyển đổi `.doc`, `.odt`, `.rtf`, `.tex`, `.rst`, `.org` hoặc `.typ`. `.docx`/`.html`/`.epub`/`.ipynb` chạy trực tiếp bằng Python. | Tải `.msi` từ [pandoc.org](https://pandoc.org/installing.html) | `pandoc --version` |

---

## Xử lý sự cố

### `python` was not found hoặc mở Microsoft Store

**Nguyên nhân**: Python chưa nằm trong PATH hệ thống.

**Cách 1** — Chạy lại bộ cài Python → **Modify** → tích **"Add Python to environment variables"**.

**Cách 2** — Thêm vào PATH thủ công:
1. Chạy `where python` trong PowerShell để tìm đường dẫn thật (vd. `C:\Users\TenCuaBan\AppData\Local\Programs\Python\Python312\python.exe`)
2. Gõ "Environment Variables" ở menu Start
3. Tìm `Path` → **Edit** → thêm **thư mục** ở bước 1 và thư mục con `Scripts` của nó:
   ```
   C:\Users\TenCuaBan\AppData\Local\Programs\Python\Python312
   C:\Users\TenCuaBan\AppData\Local\Programs\Python\Python312\Scripts
   ```
4. Nhấn OK rồi **khởi động lại PowerShell**

**Cách 3** — Thử `python3` hoặc `py` thay thế.

### Lệnh `python3` lỗi (mã thoát 49 / mở Microsoft Store)

Bộ cài từ python.org có `python.exe` nhưng không có `python3.exe`. **Chỉ cần thay `python3` bằng `python` trong lệnh** (agent AI thường cũng tự chuyển sang `python` và chạy tiếp).

### `pip install` lỗi quyền truy cập

```powershell
pip install --user -r requirements.txt
```

Hoặc chạy PowerShell với quyền Administrator.

### `pip install` lỗi do mạng

```powershell
# Dùng proxy
pip install -r requirements.txt --proxy http://your-proxy:port

# Hoặc dùng mirror PyPI gần bạn, ví dụ:
pip install -r requirements.txt -i https://pypi.org/simple
```

### `pip install` lỗi khi biên dịch gói từ mã nguồn

Thông báo điển hình: `No matching distribution found for Cython>=3.0`, `Microsoft Visual C++ 14.0 or greater is required`, `Failed building wheel for PyYAML`.

Python của bạn mới hơn các gói dựng sẵn của ít nhất một thư viện, nên pip quay sang biên dịch từ mã nguồn. Hãy gỡ bản Python đó (Settings → Apps), cài Python 3.14 như ở [Bước 1](#bước-1--cài-python-bắt-buộc), xác nhận `python --version` hiển thị 3.14, rồi chạy lại Bước 3.

### `ModuleNotFoundError`

`pip` đã cài vào một bản Python khác. Dùng `python -m pip install -r requirements.txt` để khớp.

### `import fitz` lỗi

1. Nâng cấp pip: `python -m pip install --upgrade pip`
2. Dùng gói dựng sẵn: `pip install PyMuPDF --only-binary :all:`
3. Vẫn lỗi → cài [Visual C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

### PowerShell báo "running scripts is disabled"

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Vẫn chưa được?

- 📖 [FAQ](./faq.md)
- 🐛 [GitHub Issues](https://github.com/iDMA-dev/HugoPPTPilot/issues) — kèm phiên bản Python, phiên bản Windows và toàn văn thông báo lỗi
- 💬 [GitHub Discussions](https://github.com/iDMA-dev/HugoPPTPilot/discussions)
