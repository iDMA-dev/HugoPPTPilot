# Thuyết minh bằng giọng đọc & xuất video

[Tiếng Việt](./audio-narration.md)

---

HugoPPTPilot có thể biến ghi chú người trình bày thành thuyết minh cho từng slide, mặc định qua [`edge-tts`](https://github.com/rany2/edge-tts) (giọng nơ-ron trực tuyến của Microsoft Edge), hoặc qua ElevenLabs, MiniMax, Qwen TTS và CosyVoice khi bạn cần thuyết minh đám mây chất lượng cao hơn hoặc giọng nhân bản. Edge, ElevenLabs, MiniMax và các giọng CosyVoice hỗ trợ dấu thời gian tạo SRT cục bộ theo từng trang từ thời gian do nhà cung cấp trả về trong cùng lần tổng hợp. Qwen vẫn chỉ có âm thanh vì API TTS hiện tại của nó không cung cấp dấu thời gian. Âm thanh sau đó có thể được nhúng trở lại PPTX để dùng tính năng xuất video native của PowerPoint.

## Bạn nhận được gì

- Một tệp âm thanh cho mỗi slide trong `<project_path>/audio/`, đặt tên khớp với SVG (`01_cover.mp3`, `02_market_landscape.mp3`, …).
- Với phụ đề có thời gian từ nhà cung cấp, một tệp phụ đề tương ứng cho mỗi slide trong cùng thư mục `<project_path>/audio/` (`01_cover.srt`, `02_market_landscape.srt`, …). Mỗi tệp dùng trục thời gian cục bộ theo trang với gốc `00:00:00,000`. Thời gian từ/ký tự của nhà cung cấp được gom lại thành cùng định dạng cue gọn.
- Một tệp `<project_path>/audio/manifest.json` gọn sau khi chạy thành công trọn vẹn. Nó chỉ ghi nhà cung cấp/mô hình, định dạng âm thanh/phụ đề, các thiết lập giọng liên quan và dấu vân tay SHA-256 thay vì ID giọng đám mây thô. Nó không chứa danh mục từng slide, hash từng sản phẩm hay khóa API, và không được nạp trong quá trình tạo thông thường.
- Khi chọn đồng bộ theo cue thuyết minh, `animations.json` chuẩn cùng SRT từng trang sinh ra `narration_animations.json`, trong đó các hiệu ứng đối tượng không cần nhấp chuột sẽ chờ cue phụ đề liên quan. Chuyển động tùy chỉnh không phụ thuộc thuyết minh giữ thời gian chuẩn. Khi cả hai tệp phụ hiệu ứng đều không tồn tại, bản xuất có thuyết minh không tạo tệp phụ nào và kế thừa chuyển động đã chốt của bản xuất gốc. Với SRT từng trang, các đường này có thể tạo `<project_path>/audio/total.srt` toàn bộ slide, căn theo trục thời gian PPTX cuối cùng; sau khi PowerPoint xuất video, `video_subtitles.py` có thể căn văn bản thuyết minh đã đóng băng với rãnh âm thanh thực tế để có SRT phụ cho bản giao.
- Xuất lại tùy chọn: một PPTX mới trong `exports/` với mỗi tệp `m4a` / `mp3` / `wav` nhúng vào slide tương ứng và thời gian tự chuyển slide đặt theo ngưỡng bắt đầu trang có thể cấu hình, độ dài âm thanh và khoảng đệm cuối trang, để phát tự động / xuất video chạy được mà không phải chỉnh thời gian bằng tay. Thuyết minh không bao giờ bắt đầu trước khi chuyển trang kết thúc.
- Xuất video native tùy chọn trên Windows: `powerpoint_video.py` giao PPTX thuyết minh cuối cùng cho PowerPoint 2016+ và chờ đến khi bộ mã hóa MP4 native của nó thành công hoặc thất bại. MP4 thô này giữ đường hình ảnh hiệu ứng/thuyết minh, nhưng PowerPoint không đảm bảo đưa âm thanh chuyển trang hay hiệu ứng đối tượng native vào rãnh âm thanh của nó.
- Trên đường xuất native, khi bàn giao MP4 trực tiếp có các cue âm thanh hiệu ứng đã chốt, `video_sound_mix.py` tạo một WAV SFX float độc lập, một MP4 phối cuối cùng và một biên nhận JSON chứng minh stem đã vào rãnh âm thanh cuối trong khi luồng video không đổi.
- Như một phương án thủ công tường minh, PowerPoint Windows bản máy tính có thể phát bộ slide thuyết minh cuối cùng toàn màn hình trong khi trình ghi quay hình ảnh trình chiếu và một nguồn âm thanh ứng dụng/hệ thống. Cách này ghi lại thuyết minh và các cue native mà PowerPoint thực sự phát, nên không được theo sau bằng `video_sound_mix.py`.
- Ghi chú người trình bày gốc được giữ nguyên.

## Cách hoạt động

1. **Ghi chú người trình bày được viết thành lời thuyết minh thuần.** Đặc tả ghi chú của HugoPPTPilot cố ý tạo văn xuôi thân thiện với TTS — không có dấu hiệu sân khấu trong ngoặc, không có dòng meta `Key points:` / `Duration:` — để điều được đọc to đúng là điều có trên trang.
2. **AI chọn giọng cho bạn.** Khi bạn yêu cầu thuyết minh, AI kiểm tra ngôn ngữ chính của bộ slide (`vi-VN` / `en-US` / `ja-JP` / `ko-KR` / …), lấy danh mục giọng của nhà cung cấp đã chọn (chỉ Edge và ElevenLabs có danh mục; với MiniMax, Qwen và CosyVoice nó làm việc từ ID giọng bạn cung cấp hoặc các giọng hệ thống có ghi tài liệu của nhà cung cấp), và đề xuất 3–6 ứng viên kèm mô tả giọng một dòng cho mỗi giọng (ví dụ "giọng nam điềm đạm cho báo cáo tài chính"). Nó cũng đề xuất tốc độ nói hoặc mặc định của nhà cung cấp tùy mật độ ghi chú.
3. **Thiết lập chốt một lần.** Default Generate và Edit Native PPTX hỏi một lần về nhà cung cấp, giọng, tốc độ, việc nhúng và xuất video tùy chọn. Quick dùng các giá trị tường minh và tự chốt các lựa chọn nhà cung cấp, giọng, tốc độ, nhúng chưa nêu; video vẫn tắt trừ khi có yêu cầu bàn giao video trực tiếp.
4. **Chạy tạo.** Edge, ElevenLabs, MiniMax và các giọng CosyVoice hỗ trợ dấu thời gian ghi âm thanh và SRT của từng trang từ thời gian nhà cung cấp trả về trong cùng lần tổng hợp; Qwen và chế độ CosyVoice chỉ-âm-thanh tường minh chỉ ghi âm thanh. Một lần chạy trọn vẹn ghi nguyên tử `audio/manifest.json` để lưu nguồn gốc. Với Generate PPTX có đồng bộ theo cue thuyết minh, SRT từng trang và hiệu ứng tùy chỉnh chuẩn cho phép AI ánh xạ các nhóm nội dung SVG hiện tại với các cue SRT được đánh số và sinh `narration_animations.json` không cần nhấp chuột; chuyển động tùy chỉnh không phụ thuộc thuyết minh giữ thời gian chuẩn, còn không có tệp phụ hiệu ứng thì kế thừa chuyển động đã chốt của bản xuất gốc. Sau đó nó xuất lại bộ slide kèm âm thanh và, khi có SRT từng trang, gộp nó bằng giá trị thời gian đọc từ PPTX cuối. Bàn giao video tự động tiếp tục qua bộ mã hóa native của PowerPoint và, khi có cue, qua bước phối âm đã kiểm chứng. Việc quay trình chiếu được chọn tường minh thì thay vào đó ghi hình ảnh toàn màn hình thời gian thực của PowerPoint cùng âm thanh hệ thống, bỏ qua bộ phối đó, và căn mọi SRT bàn giao với bản quay đã chấp nhận. Không hỗ trợ nhập âm thanh dài và tự động chia âm thanh dài.

Phụ đề vẫn là sản phẩm bên ngoài: HugoPPTPilot không nhúng chúng vào PPTX hay ghi cứng vào MP4. Xuất video tự động giao cho PowerPoint Windows đã cài; nó không phải một bộ dựng hình riêng.

Giai đoạn dùng chung được ghi ở [`workflows/stages/generate-audio.md`](../../skills/ppt-master/workflows/stages/generate-audio.md).

## Hai đường nhúng

| Lệnh | Mục đích |
|---|---|
| `--recorded-narration audio` | Chuẩn bị thời gian và thuyết minh ghi sẵn của PowerPoint. Yêu cầu âm thanh đầy đủ cho từng slide và ghi thời gian tự chuyển trang. Dùng cho xuất thuyết minh/video. Bản xuất lại được lưu thành `exports/<name>_<timestamp>_narrated.pptx`. |
| `--narration-audio-dir audio` | Nhúng âm thanh cấp thấp hơn. Nhúng các tệp khớp và cho phép phủ một phần. Dùng để kiểm thử hoặc hoàn thiện thủ công trong PowerPoint. Bản xuất cũng có hậu tố tên `_narrated`. |
| `--narration-start-floor 0.8` | Số giây tối thiểu tùy chọn từ lúc bắt đầu chuyển trang đến lúc thuyết minh. Mặc định là `0.8`; `0` nghĩa là bắt đầu ngay khi chuyển trang hoàn tất. |
| `--narration-padding 0.5` | Khoảng lặng tùy chọn sau khi thuyết minh kết thúc và trước khi slide chuyển. Mặc định là `0.5`. |

Hai tùy chọn thời gian có thể bỏ qua hoặc ghi đè độc lập. Khoảng lặng thực tế sau chuyển trang là `max(0, narration_start_floor - transition_duration)`; đổi ngưỡng không bao giờ kéo giãn bản thân chuyển trang.

## Kích hoạt

Chỉ cần nói trong chat sau khi bộ slide đã xuất:

```
Bạn: Tạo âm thanh thuyết minh bằng tiếng Việt cho bộ slide này
Bạn: Tạo thuyết minh cho bộ slide này và xuất lại với âm thanh nhúng.
Bạn: Thêm thuyết minh giọng Nhật; chọn giọng nữ điềm tĩnh.
```

Đường Generate cũng chạy giai đoạn này khi Giai đoạn 2 cuối cùng chốt Narration Audio hiệu lực là bật. Một yêu cầu tường minh về sau vẫn thắng mặc định chủ động. AI lo phần còn lại.

## Ngôn ngữ

Bất cứ thứ gì `edge-tts` hỗ trợ — khoảng 90 ngôn ngữ/vùng, gồm tiếng Việt (`vi-VN`), mọi biến thể tiếng Trung chính (`zh-CN` / `zh-TW` / `zh-HK` Quảng Đông), tiếng Anh (Mỹ/Anh/Úc/Ấn), Nhật, Hàn, Pháp, Đức, Tây Ban Nha, Bồ Đào Nha, Nga, Ả Rập, v.v. Tự liệt kê giọng cho bất kỳ locale nào bằng:

```bash
python3 skills/ppt-master/scripts/notes_to_audio.py --list-voices --locale vi-VN
```

Giọng tiếng Việt Edge có sẵn: `vi-VN-HoaiMyNeural` (nữ) và `vi-VN-NamMinhNeural` (nam).

## Dùng thủ công (nâng cao)

Nếu muốn bỏ qua luồng AI và gọi trực tiếp script:

```bash
# 1. Đảm bảo ghi chú người trình bày đã được tách (hậu xử lý Bước 7.1):
python3 skills/ppt-master/scripts/total_md_split.py <project_path>

# 2A. Tạo cặp MP3/SRT bằng edge-tts (mặc định, không cần khóa API)
python3 skills/ppt-master/scripts/notes_to_audio.py <project_path> \
  --voice vi-VN-NamMinhNeural --rate +0%

# 2B. Hoặc tạo cặp MP3/SRT bằng ElevenLabs (cần ELEVENLABS_API_KEY)
export ELEVENLABS_API_KEY="your-elevenlabs-api-key"
python3 skills/ppt-master/scripts/notes_to_audio.py <project_path> \
  --provider elevenlabs \
  --voice-id <elevenlabs-voice-id> \
  --elevenlabs-model eleven_multilingual_v2

# 2C. Hoặc tạo cặp MP3/SRT bằng MiniMax (hỗ trợ voice_id hệ thống và nhân bản)
export MINIMAX_API_KEY="your-minimax-api-key"
# Mặc định dùng endpoint Trung Quốc. Để truy cập quốc tế, đặt MINIMAX_TTS_BASE_URL=https://api.minimax.io/v1/t2a_v2.
python3 skills/ppt-master/scripts/notes_to_audio.py <project_path> \
  --provider minimax \
  --voice-id <minimax-voice-id> \
  --minimax-model speech-2.8-hd

# 2D. Hoặc chỉ tạo âm thanh bằng Qwen TTS (giọng hệ thống hoặc giọng nhân bản)
export DASHSCOPE_API_KEY="your-dashscope-api-key"
python3 skills/ppt-master/scripts/notes_to_audio.py <project_path> \
  --provider qwen \
  --voice-id <qwen-voice> \
  --qwen-model qwen3-tts-flash \
  --qwen-language-type Chinese

# 2E. Hoặc tạo cặp MP3/SRT bằng giọng CosyVoice hỗ trợ dấu thời gian
export COSYVOICE_API_KEY="your-dashscope-api-key"
python3 skills/ppt-master/scripts/notes_to_audio.py <project_path> \
  --provider cosyvoice \
  --voice-id <cosyvoice-voice> \
  --cosyvoice-model cosyvoice-v3-flash

# 3-4. Chỉ khi chọn đồng bộ theo cue thuyết minh và đã có SRT từng trang cùng
#    animations.json chuẩn, in dấu vân tay bộ SRT, rồi soạn
#    <project_path>/narration_timing.json bằng cách so sánh từng
#    nhóm nội dung SVG hiện tại với các cue đánh số trong SRT của trang đó.
#    Thiếu cue nghĩa là nhóm không có đoạn lời tương ứng và dùng trình tự thông thường.
#    Với chuyển động tùy chỉnh không phụ thuộc thuyết minh hoặc không có tệp phụ, nhảy tới bước 5.
python3 skills/ppt-master/scripts/narration_sync.py fingerprint <project_path>

# 4. Sinh narration_animations.json không cần nhấp chuột từ animations.json chuẩn
python3 skills/ppt-master/scripts/narration_sync.py animations <project_path> \
  --narration-start-floor 0.8 --narration-padding 0.5 --force

# 5A. Chuyển động tùy chỉnh đồng bộ theo cue: dùng tệp phụ được sinh ra
python3 skills/ppt-master/scripts/svg_to_pptx.py <project_path> \
  -o <final_narrated_pptx> --recorded-narration audio \
  --narration-start-floor 0.8 --narration-padding 0.5 \
  --animation-config narration_animations.json \
  --inherit-motion-from "<base_postflight_report>"

# 5B. Chuyển động tùy chỉnh không phụ thuộc thuyết minh: dùng thời gian chuẩn
python3 skills/ppt-master/scripts/svg_to_pptx.py <project_path> \
  -o <final_narrated_pptx> --recorded-narration audio \
  --narration-start-floor 0.8 --narration-padding 0.5 \
  --animation-config animations.json \
  --inherit-motion-from "<base_postflight_report>"

# 5C. Không có tệp phụ hiệu ứng: kế thừa chuyển động gốc đã chốt, gồm cả -a auto
python3 skills/ppt-master/scripts/svg_to_pptx.py <project_path> \
  -o <final_narrated_pptx> --recorded-narration audio \
  --narration-start-floor 0.8 --narration-padding 0.5 \
  --inherit-motion-from "<base_postflight_report>"

# Quick Generate thêm --quick-generate --with-notes vào lệnh được chọn.
# Với nhánh phối âm xuất native có cue âm thanh đã chốt, cũng thêm
# --conversion-trace <final_narrated_trace>. Quay trình chiếu không cần
# trace đó để bàn giao âm thanh.

# 6. Khi có SRT từng trang, gộp nó bằng thời gian PowerPoint cuối cùng
python3 skills/ppt-master/scripts/narration_sync.py subtitles <project_path> \
  --pptx <final_narrated_pptx> --force

# 7. Tùy chọn trên Windows: xuất video thô qua PowerPoint và chờ
#    hoàn tất
python3 skills/ppt-master/scripts/powerpoint_video.py --check
python3 skills/ppt-master/scripts/powerpoint_video.py \
  <final_narrated_pptx> -o exports/<raw_powerpoint_video>.mp4

# 8. Trên nhánh xuất native, khi chuyển động cuối cùng đã chốt có cue âm thanh,
#    dựng stem SFX độc lập và video phối đã kiểm chứng. Mặc định:
#    chuyển trang khoảng 35%, cue đối tượng khoảng 25%, bộ giới hạn cuối -1 dBFS.
python3 skills/ppt-master/scripts/video_sound_mix.py <project_path> \
  --pptx <final_narrated_pptx> \
  --trace <final_narrated_trace> \
  --video exports/<raw_powerpoint_video>.mp4 \
  -o exports/<final_mixed_video>.mp4 --force

# 9. Khi có SRT từng trang, căn văn bản thuyết minh đã đóng băng với
#    rãnh âm thanh của video cuối: video phối nếu đã chạy bước 8, bản quay
#    đã chấp nhận nếu chọn quay trình chiếu, nếu không thì video thô.
python3 skills/ppt-master/scripts/video_subtitles.py <project_path> \
  --video "<final_delivery_video>" --language <language> --force
```

Trước khi gửi bất kỳ yêu cầu TTS nào, `notes_to_audio.py` kiểm tra rằng mọi trang SVG của Generate hoặc trang đầu ra của Edit Native PPTX đều có ghi chú từng slide đọc được, không rỗng. Ghi chú thiếu hoặc rỗng trả về mã thoát `2`; hãy tạo các ghi chú đó trước rồi chạy lại việc tạo âm thanh.

Với edge, `--voice` là bắt buộc. Dùng `--list-voices --locale <locale>` để xem những gì khả dụng. Edge mặc định tạo đồng thời tới ba cặp âm thanh/SRT cấp slide. Dùng `--concurrency <N>` để điều chỉnh hoặc `--concurrency 1` để gỡ lỗi tuần tự. Các nhà cung cấp đám mây vẫn chạy tuần tự.

Lệnh edge tạo `audio/<stem>.mp3` và `audio/<stem>.srt` từ cùng một yêu cầu streaming. Dấu câu kết thúc câu đóng một cue. Một cue dài hơn 20 ký tự nhìn thấy trước hết tách ở dấu phẩy, chấm phẩy hoặc hai chấm, rồi mới tách ở ranh giới từ gần nhất nếu vẫn còn quá dài. Dùng `--subtitle-max-chars` để đổi giới hạn. Chồng thời gian giữa các cue liền kề tới 100 ms được chấp nhận bằng cách dời điểm bắt đầu cue sau tới điểm kết thúc cue trước; chồng lớn hơn sẽ thất bại. Mỗi SRT dùng trục thời gian cục bộ theo trang với gốc bằng không và giữ thời gian `WordBoundary` của edge, gồm cả khoảng lặng đầu trước cue đầu tiên.

MiniMax yêu cầu phụ đề mức từ trên cùng một yêu cầu T2A không streaming và tải về tệp JSON thời gian được trả. ElevenLabs dùng endpoint `/with-timestamps` và đọc căn chỉnh theo ký tự của văn bản gốc từ cùng phản hồi JSON. CosyVoice bật HTTP streaming cộng `word_timestamp_enabled`, rồi dùng URL âm thanh hoàn chỉnh và thời gian từ trả về trong lần tổng hợp đó. Cả bốn đường có thời gian từ nhà cung cấp đều áp dụng cùng cách gom lại ưu tiên dấu câu, giới hạn bởi `--subtitle-max-chars`, và công bố nguyên tử một cặp âm thanh/SRT đã kiểm chứng. Các cue gọn của chúng là đơn vị ánh xạ hiệu ứng theo ngữ nghĩa.

Hỗ trợ dấu thời gian của CosyVoice phụ thuộc mô hình/giọng: giọng nhân bản từ `cosyvoice-v3.5-plus`, `cosyvoice-v3.5-flash`, `cosyvoice-v3-plus`, `cosyvoice-v3-flash` và `cosyvoice-v2` được hỗ trợ, cũng như các giọng hệ thống được đánh dấu rõ là hỗ trợ dấu thời gian trong [danh sách giọng CosyVoice](https://help.aliyun.com/en/model-studio/cosyvoice-voice-list). Mô hình và họ giọng phải khớp nhau. Nếu giọng được chọn không trả được thời gian và chủ ý chỉ lấy âm thanh, hãy truyền `--cosyvoice-audio-only`.

Phản hồi HTTP và thời gian thực TTS hiện tại của Qwen trả âm thanh nhưng không có căn chỉnh từ hay ký tự. Vì vậy HugoPPTPilot giữ Qwen chỉ-âm-thanh thay vì ước tính thời gian SRT. Hãy chọn Edge, ElevenLabs, MiniMax hoặc giọng CosyVoice hỗ trợ dấu thời gian khi cần phụ đề từng trang.

### Khả năng nhà cung cấp và lựa chọn tham số

| Nhà cung cấp | SRT từng trang | Thời gian từ nhà cung cấp | Quyết định mặc định hiện tại |
|---|---|---|---|
| Edge | Có | Mức từ | Giữ giọng nơ-ron đã chọn và `+0%` trừ khi mật độ ghi chú đòi điều chỉnh nhẹ tốc độ. |
| ElevenLabs | Có | Căn chỉnh ký tự của văn bản gốc | Giữ `eleven_multilingual_v2` và `mp3_44100_128` cho thuyết minh dài ổn định. Dùng `--elevenlabs-speed 0.7-1.2` để ghi đè nhịp tường minh; `eleven_v3` giàu biểu cảm hơn nhưng biến thiên hơn, còn Flash v2.5 ưu tiên độ trễ/chi phí. |
| MiniMax | Có | Mức từ | Giữ mặc định hiện có `speech-2.8-hd`, MP3 mono 32 kHz trừ khi giọng đã chọn hoặc đích bàn giao đòi khác. |
| Qwen | Không | Không có trong phản hồi TTS hiện tại | Giữ `qwen3-tts-flash` ổn định; nêu chính xác `--qwen-language-type` cho bộ slide một ngôn ngữ. Endpoint hiện tại tự quyết đầu ra WAV và không có điều khiển định dạng/tần số lấy mẫu/tốc độ số; mô hình Instruct vẫn có thể điều khiển cách đọc qua chỉ dẫn. Đừng đổi mô hình chỉ để đòi dấu thời gian không có. |
| CosyVoice | Có điều kiện | Mức từ | Giữ `cosyvoice-v3-flash` cộng MP3 24 kHz làm mặc định tương thích giọng hệ thống. Chọn mô hình sở hữu giọng nhân bản/thiết kế; giọng v3.5 đòi một mô hình v3.5 khớp tường minh. |

CLI từ chối các giá trị stability/similarity/style của ElevenLabs ngoài khoảng, tốc độ ElevenLabs ngoài `0.7-1.2`, và volume/rate/pitch hoặc tần số lấy mẫu của CosyVoice ngoài khoảng được ghi tài liệu của nhà cung cấp trước khi gửi bất kỳ yêu cầu nào.

Các quyết định này theo [API giọng nói kèm thời gian của ElevenLabs](https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps), [hướng dẫn mô hình ElevenLabs](https://elevenlabs.io/docs/overview/capabilities/text-to-speech), [Qwen TTS API](https://www.alibabacloud.com/help/en/model-studio/qwen-tts-api) và [Qwen-Audio-TTS/CosyVoice HTTP API](https://help.aliyun.com/en/model-studio/cosyvoice-tts-http-api) hiện hành. Alibaba Cloud hiện khuyến nghị một tên miền Bắc Kinh riêng theo workspace cho endpoint HTTP CosyVoice; hãy truyền nó qua `--cosyvoice-base-url` khi có. Tên miền cũ vẫn hoạt động.

[Hướng dẫn mô hình TTS](https://www.alibabacloud.com/help/en/model-studio/tts-model/) hiện hành của Alibaba Cloud khuyến nghị Qwen-Audio 3.0 cho quy trình giọng dựng sẵn/nhân bản mới. Các ID mô hình đó dùng API Qwen-Audio-TTS/CosyVoice và một hợp đồng giọng khác, và vẫn không cung cấp dấu thời gian. Vì vậy HugoPPTPilot không lặng lẽ thay mặc định tương thích `qwen3-tts-flash`; hãy chuyển mô hình cùng giọng khớp của nó một cách tường minh khi lý do là chất lượng âm thanh, không phải ngang bằng phụ đề.

`audio/` là bộ thuyết minh hoạt động duy nhất. Manifest ghi nguồn của nó, nên mặc định không tạo thư mục con theo nhà cung cấp. Trước khi tạo lại, script xóa `manifest.json` và `total.srt` cũ; các nhà cung cấp chỉ-âm-thanh cũng xóa các SRT trang cũ cùng stem. Chỉ dùng một thư mục đầu ra tường minh riêng khi bạn chủ ý cần giữ lần chạy của nhà cung cấp khác.

Khi chọn đồng bộ theo cue thuyết minh cùng hiệu ứng tùy chỉnh chuẩn, `narration_timing.json` được cố ý giữ tách khỏi `animations.json` chỉ-đọc. Nó ghi SHA-256 có thứ tự của bộ SRT, ngưỡng bắt đầu thuyết minh tùy chọn, khoảng đệm thuyết minh, các ID nhóm SVG có thứ tự và số cue (đánh số từ 1) tùy chọn. `narration_sync.py animations` từ chối dấu vân tay cũ, kiểm chứng ID nhóm với các SVG hiện tại, và ghi `narration_animations.json` được sinh chỉ với các trường PowerPoint được hỗ trợ. Điểm bắt đầu hiệu ứng gắn cue dùng cùng ngưỡng bắt đầu trang với âm thanh nhúng; hiệu ứng tiêu đề hoặc trang trí không gắn cue giữ thời gian tương đối chuẩn. Một nhóm có `effects[]` vẫn ánh xạ tới một cue: hàng hoạt động đầu tiên của nó neo vào cue đó, còn các hàng sau giữ độ trễ tương đối. Chuyển động tùy chỉnh không phụ thuộc thuyết minh truyền thẳng `animations.json` chuẩn; không có tệp phụ thì kế thừa chuyển động đã chốt của báo cáo gốc. `narration_sync.py subtitles` đọc thứ tự trình chiếu thực tế của PPTX cuối cùng cộng giá trị chuyển trang, độ trễ thuyết minh và chuyển slide ở mức mili giây, nên `total.srt` theo trục thời gian PPTX native. Đường `--pptx` tương đối được phân giải dưới `<project_path>`.

Bộ mã hóa video của PowerPoint có thể lượng tử hóa mỗi đoạn slide/đa phương tiện theo đồng hồ khung hình đầu ra của nó. Những chênh lệch nhỏ theo trang đó có thể cộng dồn dù giá trị thời gian của PPTX đúng. `video_sound_mix.py` dùng lại tương quan thuyết minh ở cấp trang để dời mọi cue chuyển trang/đối tượng từ đồng hồ PPTX lý thuyết sang đồng hồ MP4 thô; nó không trực tiếp cộng hai trục thời gian độc lập. `video_subtitles.py` sau đó dùng `stable-ts` để ép căn văn bản thuyết minh đã đóng băng chính xác với rãnh âm thanh của `.mp4` / `.wmv` / `.mov` đã hoàn thành. Nó có thể tách các cue bàn giao dài để hiển thị, ghi SRT cùng stem, và không ghi lại video, ghi chú hay phụ đề từng trang.

Hãy dùng chế độ dòng chữ mặc định cho bản xuất SVG thuyết minh cuối cùng. Nó giữ ngắt dòng do tác giả đặt trong một khung chữ chỉnh sửa được, không ngắt dòng tự động; thuyết minh không đòi khung chữ riêng cho từng dòng.

```json
{
  "version": 1,
  "srt_sha256": "<sha256 của bộ SRT từng trang có thứ tự>",
  "narration_start_floor": 0.8,
  "narration_padding": 0.5,
  "slides": {
    "01_title": {
      "groups": [
        { "id": "page-title", "cue": 1 },
        { "id": "supporting-visual" }
      ]
    }
  }
}
```

Với ElevenLabs, `--voice-id` là bắt buộc. Liệt kê giọng từ tài khoản ElevenLabs của bạn bằng:

```bash
export ELEVENLABS_API_KEY="your-elevenlabs-api-key"
python3 skills/ppt-master/scripts/notes_to_audio.py --provider elevenlabs --list-voices
```

Với MiniMax, Qwen và CosyVoice, truyền giọng hệ thống hoặc ID/tên giọng nhân bản riêng của nhà cung cấp bằng `--voice-id`. Việc nhân bản giọng tự nó được thực hiện trước trong bảng điều khiển/API của nhà cung cấp; `notes_to_audio.py` dùng ID giọng thu được để tạo thuyết minh cho từng slide.

Âm thanh nhúng vào PPTX phải dùng định dạng PowerPoint đáng tin cậy: `m4a` (AAC), `mp3` hoặc `wav`. Việc tạo tích hợp mặc định là `mp3`; hãy chuyển mã đầu ra nhà cung cấp như `pcm`, `opus` hoặc `flac` trước khi nhúng.

## Dùng giọng nhân bản

Bốn nhà cung cấp đám mây — **ElevenLabs**, **MiniMax**, **Qwen**, **CosyVoice** — cho phép bạn nhân bản một giọng từ mẫu ngắn rồi tổng hợp lời nói mới bằng giọng đó. HugoPPTPilot thuyết minh toàn bộ slide bằng giọng nhân bản của bạn miễn là bạn đưa được cho nó một `voice_id`. (`edge` không hỗ trợ nhân bản.)

**Phân chia trách nhiệm**: bản thân việc nhân bản giọng diễn ra ở bảng điều khiển hay API của nhà cung cấp — bạn tải lên một mẫu (thường từ 10 giây đến vài phút âm thanh sạch) và nhà cung cấp trả về một `voice_id`. HugoPPTPilot đứng ở phía *tiêu thụ*: nó nhận `voice_id` đó và đọc ghi chú của mọi slide bằng giọng ấy. HugoPPTPilot không bao giờ tải mẫu của bạn đi đâu cả.

| Nhà cung cấp | Nơi nhân bản | Độ dài mẫu |
|---|---|---|
| ElevenLabs | [elevenlabs.io](https://elevenlabs.io) → Voices → Add Voice → Instant / Professional Voice Cloning | 1 phút (Instant) / 30 phút+ (Professional) |
| MiniMax | [platform.minimaxi.com](https://platform.minimaxi.com) → Voice Clone | ~10 giây – 5 phút |
| Qwen TTS | [Bảng điều khiển DashScope](https://dashscope.console.aliyun.com) → Speech Synthesis → Voice Replica | ~10 giây – 5 phút |
| CosyVoice | [Bảng điều khiển DashScope](https://dashscope.console.aliyun.com) → Speech Synthesis → Voice Replica | ~10 giây – 5 phút |

**Cách dùng sau khi nhân bản** — trong chat, chỉ cần nói. AI sẽ bỏ bước đề xuất giọng và dùng thẳng `voice_id` của bạn:

```
Bạn: Tạo thuyết minh bằng giọng MiniMax nhân bản của tôi; voice_id là xxxxxxx
Bạn: Tạo thuyết minh bằng giọng ElevenLabs nhân bản của tôi, voice id là abc123
```

Hoặc gọi trực tiếp script:

```bash
python3 skills/ppt-master/scripts/notes_to_audio.py <project_path> \
  --provider minimax --voice-id <your-cloned-voice-id> \
  --minimax-model speech-2.8-hd
```

Thay `--provider minimax` bằng `elevenlabs` / `qwen` / `cosyvoice` khi cần; `--voice-id` nhận giọng nhân bản giống như nhận giọng hệ thống.

**Lưu ý**:

- **Ủy quyền** — chỉ nhân bản những giọng bạn sở hữu hoặc có sự cho phép rõ ràng. Điều khoản của mỗi nhà cung cấp đều cấm mạo danh.
- **Phủ ngôn ngữ** — giọng nhân bản thừa hưởng giọng địa phương của người nói. Với bộ slide đa ngôn ngữ (ví dụ tiếng Việt xen thuật ngữ tiếng Anh), hãy chọn nhà cung cấp có mô hình xử lý được hỗn hợp ngôn ngữ trong mẫu của bạn; ElevenLabs `eleven_multilingual_v2` và CosyVoice thường dễ tính nhất.
- **Khả năng phụ đề** — giọng ElevenLabs nhân bản và CosyVoice được hỗ trợ có thể tạo SRT có thời gian từ nhà cung cấp; giọng Qwen nhân bản vẫn chỉ-âm-thanh theo API hiện tại.
- **Lưu giữ của nhà cung cấp** — hãy dùng lại `voice_id` chừng nào giọng đó còn khả dụng trong tài khoản nhà cung cấp của bạn. Chính sách lưu giữ, xóa và hết hạn do từng nhà cung cấp quy định.

## Phụ thuộc

```bash
python3 -m pip install edge-tts
```

Đã có trong `skills/ppt-master/requirements.txt`. `edge-tts` gọi dịch vụ TTS trực tuyến của Microsoft — cần kết nối internet lúc tạo. Bản thân các MP3 là tệp cục bộ; việc phát hay xuất PowerPoint sau đó không phụ thuộc mạng.

Các nhà cung cấp TTS đám mây không cần thêm gói Python; chúng dùng HTTPS trực tiếp. Cấu hình khóa API liên quan trong shell hiện tại hoặc trong `.env` dựa theo `.env.example`.

Xuất MP4 tự động không thêm gói Python nào. Nó cần PowerPoint Windows 2016+ và Windows PowerShell; macOS và các hệ thống không có PowerPoint tương thích giữ PPTX thuyết minh và dùng xuất thủ công.

Quay trình chiếu thời gian thực không thêm gói HugoPPTPilot nào. Nó cần PowerPoint Windows bản máy tính cùng một trình ghi có thể quay hình ảnh trình chiếu và âm thanh ứng dụng/hệ thống. [OBS Studio](https://obsproject.com/kb/quick-start-guide) và [Windows Game Bar](https://support.microsoft.com/en-us/accessibility/windows/use-a-screen-reader-to-record-your-screen-with-xbox-game-bar) là các ví dụ, không phải phụ thuộc của dự án.

Việc phối âm hiệu ứng sau khi xuất cần `ffmpeg` / `ffprobe` trong `PATH` và `numpy`. Căn phụ đề trên video cuối cần riêng `stable-ts`:

```bash
python3 -m pip install numpy stable-ts
```

## Mẹo

- **Nhịp độ**: Trên đường Generate PPTX, ghi chú người trình bày tăng theo các nhóm thông tin độc lập trong SVG cuối; 2–5 câu là nhịp điển hình, không phải mức trần. Bắt đầu với `+0%`; với kịch bản dày, chi tiết có chủ ý, thử `-5%`.
- **Tạo lại giữa chừng**: đổi `notes/<page>.md` của một slide, chạy lại `notes_to_audio.py` (nó ghi đè mọi MP3, nên chạy lại cho cả bộ — chi phí nhỏ).
- **Bộ slide đa ngôn ngữ** (tiếng Việt xen thuật ngữ tiếng Anh, v.v.): giọng nơ-ron `edge-tts` xử lý các từ nước ngoài xen vào khá tốt ở đa số locale — hãy chọn giọng của ngôn ngữ chủ đạo và thử một slide trước.

## Xuất thành video

Chọn một đường bàn giao:

| Đường | Dùng khi | Kết quả âm thanh |
|---|---|---|
| `CreateVideo` native | Bạn muốn đường tự động, tái lập được | Thuyết minh là native; các cue chuyển trang/đối tượng đã chốt cần `video_sound_mix.py`. |
| Quay trình chiếu PowerPoint thời gian thực | Bạn muốn rõ ràng video chứa đúng những gì PowerPoint phát | Bản quay đã chứa thuyết minh và cue native; không bao giờ chạy `video_sound_mix.py` trên nó. |
| Giao diện **Create a Video** thủ công | Không dùng được tự động hóa nhưng chấp nhận bộ mã hóa của PowerPoint | Cùng ranh giới âm thanh với `CreateVideo` native; đây không phải quay màn hình. |

Khi PPTX thuyết minh đã nằm trong `exports/`, PowerPoint Windows 2016+ có thể xuất tự động qua:

```bash
python3 skills/ppt-master/scripts/powerpoint_video.py \
  <final_narrated_pptx> -o <raw_powerpoint_video.mp4>
```

Lệnh dùng thời gian và thuyết minh ghi sẵn, mặc định 1080p/30 fps, và chỉ trả về sau khi PowerPoint báo thành công hoặc thất bại. Âm thanh nhúng phát như thuyết minh của từng slide, trong khi thời gian tự chuyển từng slide điều khiển nhịp của video. `--recorded-narration` từ chối hiệu ứng đối tượng `on-click` vì nó không tạo thời gian nhấp ở cấp đối tượng.

MP4 thô của PowerPoint không đảm bảo chứa âm thanh gắn vào chuyển trang hay hàng Animation Pane, kể cả khi `animations.json` và gói PPTX hợp lệ. Với dự án Generate có trace thuyết minh cuối cùng chứa các cue đó, hãy chạy `video_sound_mix.py` như trên. Nó giữ các âm native trong PPTX chỉnh sửa được, sao chép luồng hình ảnh video không đổi, phối thuyết minh ở mức đơn vị với mức cue giảm, áp bộ giới hạn đỉnh, và công bố một stem SFX độc lập cùng biên nhận kiểm chứng đọc được bằng máy. Hãy căn phụ đề với MP4 đã phối, không phải bản thô trung gian.

### Quay trình chiếu PowerPoint trực tiếp

Đây là đường quay thời gian thực tường minh. PowerPoint vẫn là bộ dựng hình và trình phát âm thanh; trình ghi chỉ quay đầu ra của nó.

1. Mở PPTX thuyết minh cuối cùng trong PowerPoint Windows bản máy tính và bắt đầu Slide Show từ đầu. Dùng thời gian slide tự động và hiệu ứng đối tượng không nhấp của bộ slide; đừng quay chế độ chỉnh sửa hay Presenter View.
2. Chỉ quay phần trình chiếu toàn màn hình theo tỷ lệ khung của bộ slide. Ẩn thông báo và giữ con trỏ ngoài khung hình. Đích thông thường là 1920x1080 ở 30 fps ổn định.
3. Bật đúng một nguồn thu âm thanh ứng dụng/hệ thống và tắt micro trừ khi có yêu cầu rõ về lời nói trực tiếp. Đừng thu cả âm thanh máy tính lẫn ứng dụng, sẽ gây vang; 48 kHz là thiết lập ưa thích của trình ghi, không bắt buộc.
4. Bắt đầu trước slide đầu tiên và dừng sau đuôi âm thanh cuối. Giữ bản quay thô đó, rồi chỉ cắt các đoạn dư đầu và cuối.
5. Xác nhận tệp cuối có luồng video và âm thanh, thuyết minh nghe rõ, mọi cue đã cấu hình nghe đúng một lần, hiệu ứng/chuyển trang hoàn tất, và không thấy khung bị rớt hay giao diện máy tính.
6. Khi có SRT từng trang, chạy `video_subtitles.py` với bản quay đã cắt cuối cùng. Nó căn văn bản thuyết minh đã đóng băng với âm thanh thực tế đã ghi.

Việc chấp nhận bản quay hiện do con người kiểm định; HugoPPTPilot không tuyên bố có biên nhận cue bằng máy cho nó. Nếu mức cue che thuyết minh hoặc bị méo, hãy sửa PPTX/tài nguyên cue rồi quay lại, hoặc dùng xuất native cộng phối gain/limiter xác định. Máy chủ Linux có thể chuẩn bị PPTX thuyết minh hoàn chỉnh, âm thanh, thời gian và phụ đề, nhưng bước quay này vẫn cần một điểm phát PowerPoint Windows bản máy tính thật.

### Phương án thủ công Create a Video (Windows / Mac, Office 2016+)

1. Mở `.pptx` thuyết minh từ `exports/`.
2. **File → Export → Create a Video**.
3. Chọn chất lượng và "Use Recorded Timings and Narrations".
4. Lưu thành `.mp4` (`.wmv` cũng có trên Windows).
5. Nếu đã cấu hình âm thanh chuyển trang/đối tượng native, chạy lệnh phối âm ở trên; nếu không thì bản xuất của PowerPoint là video cuối.
6. Chạy lệnh căn `video_subtitles.py` tùy chọn với video cuối; nó ghi SRT cùng stem bên cạnh.

PowerPoint cho Mac có thể xuất MP4/MOV thủ công, nhưng Microsoft ghi tài liệu rằng hiệu ứng không phát trong xuất phim của nó. Hãy dùng đường tự động trên Windows khi độ trung thực hiệu ứng quan trọng.

**Keynote (Mac)**: mở bộ slide → **File → Export To → Movie…** — Keynote có thể tôn trọng thuyết minh nhúng và thời gian từng slide, xuất `.m4v` / `.mov`; điều này không bảo đảm có âm thanh hiệu ứng PowerPoint.

**Mẹo**:

- **Thuyết minh tạo ra không cần micro** — xuất native không cần phiên ghi âm. Quay trình chiếu thời gian thực thu âm thanh ứng dụng/hệ thống với micro tắt. Chạy lại dùng cùng ghi chú và thiết lập, nhưng mô hình đám mây vẫn có thể cho khác biệt nhỏ không xác định.
- **Độ trung thực hiệu ứng trên Windows** — xuất video Windows của PowerPoint giữ chuyển trang hình ảnh native và hiệu ứng đối tượng không nhấp của HugoPPTPilot. Âm thanh hiệu ứng dùng hoặc bước phối đã kiểm chứng sau xuất, hoặc đường quay trình chiếu thời gian thực loại trừ nhau ở trên. Xuất phim trên Mac có giới hạn nêu trên. Xem [Chuyển trang & hiệu ứng](./animations.md).
- **Muốn chỉnh âm thanh của riêng một slide?** Sửa `notes/<page>.md`, chạy lại `notes_to_audio.py` và bước nhúng, rồi xuất lại video — tổng thời gian thường dưới một phút cho mỗi slide.
- **Kích thước tệp**: bộ 20 trang Full HD thường nặng 30–80 MB tùy hình ảnh. Giảm xuống HD nếu cần tệp nhỏ hơn để chia sẻ.
