# Chuyển trang & hiệu ứng phần tử

[Tiếng Việt](./animations.md)

---

HugoPPTPilot ghi **chuyển trang** và (tùy chọn) **hiệu ứng đối tượng của từng phần tử** dưới dạng OOXML PowerPoint thật, không phải video nhúng. Hiệu ứng đối tượng gồm hiệu ứng vào, nhấn mạnh, đường chuyển động và thoát. Hướng dẫn này nêu các lựa chọn và lệnh người dùng cần; ánh xạ hiệu ứng chính xác, lược đồ tệp phụ đầy đủ, quy tắc neo và kiểm chứng gói nằm trong [tài liệu tham chiếu thực thi hiệu ứng](../../skills/ppt-master/references/animations.md).

## Hành vi mặc định

| Tầng | Mặc định | Ý nghĩa |
|---|---|---|
| Chuyển trang | `fade`, 0,4 giây | Slide chuyển bằng hiệu ứng thị giác tiết chế |
| Hiệu ứng đối tượng của phần tử | **`none` (tắt)** | Mỗi slide hiện nguyên trang; chỉ bật khi chuyển động giúp ích cho bài thuyết trình |

Đổi cài đặt hiệu ứng không cần tạo lại slide. Dùng lại cùng `svg_output/`; việc xuất bản phát hành mặc định vẫn cần báo cáo chất lượng SVG cuối cùng hiện hành đã đạt. Khi không có báo cáo cuối khớp, đạt, hiện hành, hãy chạy bộ kiểm tra cuối và xử lý các lỗi chặn trước khi chạy lại `svg_to_pptx.py`.

## Công thức thông dụng

| Mục tiêu | Lệnh |
|---|---|
| Giữ mặc định | `python3 skills/ppt-master/scripts/svg_to_pptx.py <project>` |
| Đổi chuyển trang | `python3 skills/ppt-master/scripts/svg_to_pptx.py <project> -t push` |
| Bỏ hiệu ứng chuyển trang | `python3 skills/ppt-master/scripts/svg_to_pptx.py <project> -t none` |
| Tự chuyển slide mỗi 5 giây | `python3 skills/ppt-master/scripts/svg_to_pptx.py <project> --auto-advance 5` |
| Bật hiện dần phần tử tự động | `python3 skills/ppt-master/scripts/svg_to_pptx.py <project> -a auto` |
| Dùng một hiệu ứng vào cho toàn bộ | `python3 skills/ppt-master/scripts/svg_to_pptx.py <project> --animation entrance_fade` |
| Hiện phần tử khi nhấp chuột | `python3 skills/ppt-master/scripts/svg_to_pptx.py <project> -a auto --animation-trigger on-click` |
| Cho mọi phần tử chuyển động cùng lúc | `python3 skills/ppt-master/scripts/svg_to_pptx.py <project> -a auto --animation-trigger with-previous` |
| Làm chậm chuỗi hiện dần | `python3 skills/ppt-master/scripts/svg_to_pptx.py <project> -a auto --animation-duration 0.5 --animation-stagger 0.8` |

## Chọn chuyển trang

| Quan hệ giữa hai slide liền kề | Bắt đầu với |
|---|---|
| Tiếp nối thông thường trong cùng một phần | `fade` |
| Đổi ngay, không có tính liên tục cần giữ | `none` hoặc `cut` |
| Các bước có hướng, dòng thời gian, hoặc tiến triển lớp nhìn thấy được | `push`, `wipe`, `cover` hoặc `uncover` với hướng có ý nghĩa |
| Cùng một đối tượng hoặc cảnh đổi vị trí, kích thước, vùng cắt hoặc diện mạo | `morph` |
| Mở đầu một phần, tiết lộ then chốt, hoặc ranh giới trạng thái được đánh dấu | Chọn lọc `split`, `reveal`, `shape`, `flash` hoặc `random_bars` |
| Một tập hợp lặp lại tiến qua cùng một khung không gian | `pan`, `conveyor` hoặc `ferris_wheel`; dùng Morph khi từng đối tượng phải giữ danh tính |
| Điểm nhìn di chuyển quanh hoặc xuyên qua một không gian liên tục | `rotate`, `window`, `orbit` hoặc `fly_through` |
| Chủ đề hợp với ẩn dụ sân khấu, giấy hoặc trang vật lý | Chọn lọc `fall_over`, `drape`, `curtains`, `wind`, `prestige`, `peel_off`, `page_curl`, `airplane`, `origami` hoặc `doors` |
| Một nhịp gây xáo trộn biểu thị vỡ, sụp đổ hoặc tản ra | Chọn lọc `fracture`, `crush`, `dissolve`, `vortex` hoặc `shred` |
| Một lần tiết lộ được đánh dấu hưởng lợi từ họa tiết hình học, theo thời gian hoặc có kết cấu | Chọn lọc `checkerboard`, `blinds`, `clock`, `ripple`, `honeycomb`, `glitter` hoặc `comb` |
| Một thẻ, bảng, thư viện hoặc điểm nhìn lật hoặc đổi mặt nhìn thấy được | Chọn lọc `switch`, `flip`, `gallery`, `cube`, `box` hoặc `zoom` |

Hãy giữ `fade` hoặc `none` khi không hiệu ứng nào khác thêm ý nghĩa. Đừng đổi hiệu ứng chỉ để tạo sự đa dạng; `random` chỉ phù hợp khi sự khó đoán là chủ ý.

48 khóa chuyển trang chuẩn bao phủ cả ba mục trong thư viện PowerPoint hiện hành:

- Subtle (tinh tế): `morph`, `fade`, `push`, `wipe`, `split`, `reveal`, `cut`, `random_bars`, `shape`, `uncover`, `cover`, `flash`.
- Exciting (ấn tượng): `fall_over`, `drape`, `curtains`, `wind`, `prestige`, `fracture`, `crush`, `peel_off`, `page_curl`, `airplane`, `origami`, `dissolve`, `checkerboard`, `blinds`, `clock`, `ripple`, `honeycomb`, `glitter`, `vortex`, `shred`, `switch`, `flip`, `gallery`, `cube`, `doors`, `box`, `comb`, `zoom`, `random`.
- Dynamic Content (nội dung động): `pan`, `ferris_wheel`, `conveyor`, `rotate`, `window`, `orbit`, `fly_through`.

Các tên cũ `strips`, `circle`, `diamond`, `newsflash`, `plus`, `pull`, `wedge` và `wheel` vẫn được chấp nhận chỉ làm đầu vào tương thích. Tệp phụ, kế hoạch, dấu vết và đầu ra mới dùng khóa chuẩn. Đầu vào tương thích được rút gọn thành một hiệu ứng native cộng Effect Options của nó — ví dụ `diamond` thành `shape` với `shape: diamond`, và `wedge` thành `clock` với `style: wedge`.

Đặt các tùy chọn PowerPoint riêng của hiệu ứng trong `transition.effect_options`. Hướng, hình dạng, họa tiết, phạm vi Morph, màn hình đen, số trang và độ nảy được kiểm chứng theo hiệu ứng đã chọn. Chạy `python3 skills/ppt-master/scripts/pptx_animations.py --describe-transition <effect>` để xem giá trị chính xác. `-t none` bỏ hiệu ứng thị giác nhưng không bỏ bộ hẹn giờ tự chuyển slide đã cấu hình tường minh.

## Chọn chế độ Start

| Chế độ Start | Hành vi | Phù hợp nhất |
|---|---|---|
| `on-click` | Mỗi lần nhấp hiện một nhóm nội dung | Buổi trình bày trực tiếp nơi người nói kiểm soát nhịp |
| `with-previous` | Mọi nhóm nội dung cùng chuyển động khi slide xuất hiện | Một màn xuất hiện phối hợp duy nhất |
| `after-previous` (mặc định) | Các nhóm hiện tuần tự không cần nhấp | Phát tại quầy, hướng dẫn từng bước và bộ slide có thuyết minh |

`--recorded-narration` không hỗ trợ `on-click`; hãy dùng `after-previous` hoặc `with-previous` cho đầu ra có thuyết minh hoặc sẵn sàng làm video.

## Chọn hiệu ứng đối tượng

Bắt đầu với `none`. Khi chuyển động đối tượng có nhiệm vụ truyền đạt, hãy chọn vòng đời của nó trước hiệu ứng thị giác:

| Nhiệm vụ truyền đạt | Lựa chọn | Ranh giới |
|---|---|---|
| Hiện thông tin theo thứ tự đọc hoặc thuyết minh | `auto` hoặc một khóa `entrance_*` native | Đây là trường hợp hiệu ứng đối tượng thông thường |
| Chuyển sự chú ý sang một đối tượng đã hiện | Một khóa `emphasis_*` tường minh | Đừng dùng nó làm lần hiện đầu tiên của đối tượng |
| Thể hiện chuyển động không gian hoặc nhân quả có ý nghĩa | Một khóa `path_*` tường minh, hoặc Morph giữa các slide liền kề | Bản thân đường đi nên mang ý nghĩa; không khí nền có chủ ý là ngoại lệ nâng cao |
| Gỡ, thay thế hoặc nhường chỗ cho nội dung trên cùng slide | Một khóa `exit_*` tường minh | Việc chuyển slide bình thường đã gỡ trang cũ |
| Thêm biến thể xác định hoặc theo hạt giống cho các hiệu ứng vào chung | `mixed` hoặc `random` | Các chế độ này vẫn chỉ chọn hiệu ứng vào |
| Không có nhiệm vụ chuyển động rõ ràng | `none` | Giữ slide tĩnh |

Kho chuẩn chứa 203 khóa native của PowerPoint: 53 hiệu ứng vào, 33 nhấn mạnh, 64 đường chuyển động và 53 thoát. Các lựa chọn mới, tệp phụ, lựa chọn tự động, dấu vết và ví dụ dùng các khóa có tiền tố theo nhóm này. `auto`, `mixed` và `random` chỉ chọn hiệu ứng vào. Dùng khóa chuẩn tường minh cho hành vi nhấn mạnh, đường chuyển động hoặc thoát. 29 tên ngắn đã có chỉ còn được chấp nhận làm đầu vào tương thích; chúng được chuẩn hóa trước khi ghi và không giữ động cơ hành vi thứ hai. Mọi tên hướng Fly cũ đều chuẩn hóa thành `entrance_fly`, và mọi tên hướng Wipe cũ thành `entrance_wipe`; hướng của chúng được giữ làm tùy chọn thay vì một preset chuẩn khác. `wheel` cũ giữ bốn nan. Chạy `python3 skills/ppt-master/scripts/pptx_animations.py --list` để xem danh sách đầy đủ theo nhóm. Bốn lệnh phát đa phương tiện do quy trình âm thanh/video xử lý vì chúng cần đích đa phương tiện hoặc dấu trang.

## Thêm âm thanh sau khi chọn chuyển động

Hiệu ứng âm thanh mặc định tắt. HugoPPTPilot kèm một thư viện âm thanh CC0 toàn cục, nhưng nó không được sao chép trong giai đoạn chiến lược hay thiết lập dự án thông thường. Trước hết hoàn tất các trang SVG và chọn chuyển trang / chuyển động đối tượng. Chỉ khi một nhịp đã chốt có nhiệm vụ thính giác cụ thể, bạn mới nên đọc toàn bộ [từ vựng âm thanh](../../skills/ppt-master/templates/sounds/sound-vocabulary.md) khách quan, chọn đúng một id, và đồng bộ âm đó:

```bash
python3 skills/ppt-master/scripts/sound_sync.py \
  <project> bigsoundbank/1797 kenney-interface/click_001
```

Lệnh chỉ sao chép các tệp đã chọn vào `<project>/sounds/<namespace>/`. Khi không chọn âm nào, HugoPPTPilot không tạo thư mục âm thanh dự án và không sao chép gì. Sau khi xem từ vựng, CLI có thể thu hẹp một nhãn, thẻ hoặc ngữ cảnh đã cân nhắc mà không quyết định sự phù hợp:

```bash
python3 skills/ppt-master/scripts/sound_sync.py list --query whoosh
```

Cấu hình luôn tham chiếu đường dẫn dự án cục bộ đã sao chép, không bao giờ là đường dẫn `templates/sounds/` toàn cục hay id thư viện:

```json
{
  "version": 1,
  "slides": {
    "02_process": {
      "transition": {
        "effect": "push",
        "sound": "sounds/bigsoundbank/1797.wav"
      },
      "groups": {
        "next-step": {
          "effect": "entrance_fade",
          "sound": "sounds/kenney-interface/click_001.wav"
        }
      }
    }
  }
}
```

`transition.sound` dùng WAV. `sound` của hiệu ứng đối tượng cũng chấp nhận đầu vào `.m4a`, `.mp3` hoặc `.wav` có sẵn theo đường dẫn tương đối dự án hoặc tuyệt đối; các lựa chọn đi kèm là WAV và nên dùng đường dẫn tương đối dự án đã sao chép. Một âm chỉ cho chuyển trang có thể dùng `animations.json` thưa; `transition.sound: null` ở cấp slide xóa âm mặc định được kế thừa. Hãy kiểm chứng trước khi xuất. Đừng thêm âm thanh chỉ để chứng minh tính năng tồn tại.

Việc kiểm chứng này chứng minh PPTX chỉnh sửa được chứa âm native; nó không chứng minh rằng rãnh âm thanh MP4 của PowerPoint có âm đó. Với video thuyết minh trực tiếp có các âm đã chốt, hãy theo [Thuyết minh & xuất video](./audio-narration.md) và chọn hoặc phối âm xuất native đã được kiểm chứng, hoặc quay trình chiếu PowerPoint tường minh kèm âm thanh hệ thống. Đừng kết hợp hai đường.

## Tùy chỉnh từng đối tượng

Chỉ dùng `animations.json` khi cài đặt toàn bộ slide chưa đủ — ví dụ một đối tượng vào, di chuyển, thu hút sự chú ý rồi rời đi. Liệt kê các nhóm thật, viết ghi đè thưa chỉ cho các slide và đối tượng bị ảnh hưởng, kiểm chứng rồi xuất. `scaffold` là bản khởi đầu chỉnh sửa trung tính tùy chọn: nó đặt hiệu ứng đối tượng mặc định là `none`, và các mục nhóm `{}` chưa chạm tới không bật hiệu ứng.

```bash
python3 skills/ppt-master/scripts/animation_config.py list-groups <project>
python3 skills/ppt-master/scripts/animation_config.py validate <project>
python3 skills/ppt-master/scripts/svg_to_pptx.py <project>
```

Tệp phụ nhắm tới các nhóm nội dung cấp cao nhất `<g id="...">` ổn định. ID nhóm là neo đích hình khối của PowerPoint, không phải một hàng trong Animation Pane. Đối tượng đơn hiệu ứng tương thích vẫn tạo một hàng; mảng `effects[]` có thể tạo nhiều hàng có thứ tự, đều nhắm tới cùng một hình khối:

```json
{
  "version": 1,
  "slides": {
    "03_threshold": {
      "animation": { "trigger": "after-previous" },
      "groups": {
        "risk-marker": {
          "effects": [
            { "effect": "entrance_fade", "order": 1, "duration": 0.25 },
            { "effect": "path_right", "order": 2, "delay": 0.1, "duration": 0.7 },
            { "effect": "emphasis_teeter", "order": 3, "trigger": "with-previous", "duration": 0.45 },
            { "effect": "exit_fade", "order": 4, "trigger_shape": "details-button", "duration": 0.3 }
          ]
        }
      }
    }
  }
}
```

Một nhóm đã điền dùng hoặc các trường đơn hiệu ứng cũ hoặc dạng `{ "effects": [...] }`, không bao giờ cả hai. `effects` phải không rỗng, và mỗi hàng nêu một `effect` tường minh. Các tệp phụ đơn hiệu ứng hiện có vẫn hoàn toàn tương thích.

Các trường hàng thông dụng:

| Trường | Mục đích |
|---|---|
| `effect` | Chọn một hiệu ứng tường minh; dạng cũ có thể dùng `none` để giữ đối tượng đó tĩnh |
| `trigger` | Ghi đè chế độ Start của hàng này; nếu không thì kế thừa trigger hiệu ứng của slide |
| `order` | Sắp thứ tự các hàng thường trên slide mà không đổi lớp slide; hàng trigger-shape nằm trong các chuỗi tương tác riêng |
| `delay` | Đặt độ trễ theo nhịp hoặc theo trigger-shape của hàng này; xem [tham chiếu trường thời gian](../../skills/ppt-master/scripts/docs/pptx-animations.md#8-sidecar-field-reference) về mặc định và `animation.stagger` |
| `duration` | Ghi đè thời lượng hiệu ứng đã lên lịch của hàng này |
| `effect_options` | Đặt `direction`, `amount`, `color`, `font_name`, `relative` hoặc `size` riêng của hiệu ứng |
| `trigger_shape` | Kích hoạt hàng này khi nhấp vào một nhóm cấp cao nhất khác (PowerPoint **On Click of**) |
| Bộ điều chỉnh thời gian | `repeat_count`/`repeat_duration`, `auto_reverse`, `rewind`, `accelerate`, `decelerate`, `bounce_end` và `restart` |
| Hoàn tất | `after_effect` (`none`, làm mờ, ẩn, hoặc ẩn ở lần nhấp kế tiếp) |
| Âm thanh | Đường dẫn `sound` cục bộ dự án tùy chọn; lựa chọn đi kèm theo bước đồng bộ theo yêu cầu ở trên |

`order`, `delay`, `duration`, `trigger` và `trigger_shape` được xác định theo từng hàng. Trigger hiệu ứng cấp slide chỉ để kế thừa. `trigger_shape` ngụ ý `on-click`; nếu hàng đó cũng khai báo `trigger`, nó phải là `on-click`.

Dùng `python3 skills/ppt-master/scripts/pptx_animations.py --describe <canonical_effect>` để xem chính xác hiệu ứng đó chấp nhận tùy chọn nào. Tốc độ do `duration` điều khiển; khởi động/kết thúc mượt do `accelerate`/`decelerate`. `font_name` của Change Font là một phông PowerPoint cụ thể đã cài trên máy đích, không bao giờ là chuỗi phông CSS.

`trigger_shape` trỏ tới id nhóm khác trên cùng slide và chỉ ảnh hưởng hàng của nó. Thuyết minh ghi sẵn từ chối mọi hàng xác định là `on-click`, kể cả hàng trigger-shape.

Khi người dùng nhờ AI tinh chỉnh từng đối tượng, hãy dùng giai đoạn [`customize-animations`](../../skills/ppt-master/workflows/stages/customize-animations.md). Lược đồ tệp phụ đầy đủ và quy tắc kiểm chứng đích vẫn nằm trong [tài liệu tham chiếu thực thi hiệu ứng](../../skills/ppt-master/references/animations.md).

## Kiểm chứng & tương thích

HugoPPTPilot kiểm chứng cài đặt hiệu ứng nghiêm ngặt: hiệu ứng hoặc chế độ Start không xác định, giá trị thời gian không hợp lệ, tham chiếu slide/nhóm bị thiếu, và cố gắng tạo hiệu ứng cho đối tượng cấu trúc đều thất bại thay vì lặng lẽ đổi hành vi. Việc xuất cũng đọc lại PPTX ứng viên trước khi thay thế đầu ra hiện có.

| Ranh giới | Hệ quả với người dùng |
|---|---|
| Đích hiệu ứng | Hiệu ứng phần tử hoạt động trên các neo nhóm nội dung cấp cao nhất theo logic; một neo có thể sở hữu nhiều hàng Animation Pane |
| Cấu trúc tĩnh | Nền, nội dung Master/Layout, placeholder và khung trang vẫn tĩnh |
| Dựng đối tượng không hỗ trợ | Không suy ra dựng theo đoạn/vùng chữ, soạn đường chuyển động tự do tùy chỉnh, chuỗi dựng Chart/SmartArt native, hay lệnh phát đa phương tiện từ nội dung SVG đã nhóm |
| Đường đầu ra | Hiệu ứng tồn tại trong PPTX native sinh từ `svg_output/`; `svg_final/` là bản xem trước tĩnh |
| Edit Native PPTX | Bảo toàn hiệu ứng đối tượng nguồn qua workspace round-trip thay vì dịch nó sang mô hình bộ slide sinh ra này |
| Nhập PPTX sang SVG | Chỉ dựng lại các hàng thuộc kho hiện tại có thời lượng native chính xác và đích nhóm cấp cao nhất duy nhất; thời gian nâng cao/dựng/đa phương tiện vẫn được chẩn đoán |
| Tương thích phát | Microsoft PowerPoint bản máy tính là đích kiểm chứng chính; Keynote, WPS, LibreOffice và các bản Office cũ có thể ánh xạ lại hoặc bỏ qua từng hiệu ứng |

Về tham chiếu CLI đầy đủ, xem [`svg-pipeline.md`](../../skills/ppt-master/scripts/docs/svg-pipeline.md). Về định nghĩa hiệu ứng chính xác, yêu cầu tệp phụ, logic dự phòng neo và quy tắc đọc lại OOXML, xem [tài liệu tham chiếu thực thi hiệu ứng](../../skills/ppt-master/references/animations.md).
