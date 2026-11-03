/* HugoPPTPilot - Strategist confirmation UI
 * Stage 1 confirms the communication contract and the free-design/template
 * choice together. Stage 2 combines the coherent deck solution and production
 * mechanics, then writes the final result.
 * Finite fields use /static/catalogs.json; coordinated design directions seed
 * mode, visual style, color, typography, icons, and generated-image rendering,
 * while template-application prose stays conditional. Final confirm saves the
 * flattened current values to result.json.
 */
(function () {
    "use strict";

    // ---- i18n ------------------------------------------------------------
    var MESSAGES = {
        en: {
            page_title: "HugoPPTPilot - Confirm Design",
            topbar_hint: "Answer the open questions, or pick and customize recommendations, then continue.",
            stage_anchors: "Stage 1 · Communication contract",
            stage_final_plan: "Stage 2 · Final plan & production",
            loading: "Loading…",
            load_error: "Could not load the current recommendation stage. The AI must write it before launch.",
            btn_confirm: "Confirm",
            btn_confirm_contract: "Confirm contract & continue →",
            btn_confirm_final_plan: "Confirm final plan →",
            deriving: "Preparing the final plan and verifying your selected templates…",
            template_selection_required: "Choose free design or use templates. When using templates, select at least one workspace.",
            template_selection_conflict: "Choose at most one workspace per kind.",
            connection_lost: "Connection to the confirm server was interrupted; retrying. If this keeps failing, return to the chat for confirmation.",
            confirmed_title: "✓ Confirmed",
            confirmed_hint: "Your choices are saved. You can close this page and return to the chat.",
            lang_toggle_title: "Switch language",
            sec_template_choice: "Design basis",
            template_choice_hint: "Choose how this deck should establish its design system.",
            template_free_title: "Design from the current content",
            template_free_desc: "Use no reusable template workspace. The Strategist will derive the visual system from this project.",
            template_use_title: "Use templates",
            template_use_desc: "Select one or more reusable Brand, Style, Layout, Deck, or specified workspaces.",
            template_library_hint: "Choose at most one workspace per kind. All four kinds can combine; Layout takes structural precedence over Deck.",
            template_explicit_hint: "Choose exact workspaces supplied for this run with non-overlapping kinds; every kind in each selected root is applied. Source paths are shown for verification.",
            template_kind_brand: "Brand",
            template_kind_style: "Style",
            template_kind_layout: "Layout",
            template_kind_deck: "Deck",
            template_source_explicit: "Specified path",
            template_select_none: "None",
            template_none_explicit: "No specified templates for this run",
            sec_canvas: "Canvas format",
            sec_pages: "Page count",
            sec_audience: "Target audience",
            sec_communication: "What this presentation must accomplish",
            sec_delivery: "How it will be used and what must remain",
            sec_narrative: "Narrative direction",
            sec_visual: "Visual direction",
            sec_color: "Color scheme",
            sec_icons: "Icon usage",
            sec_type: "Typography",
            sec_images: "Image usage",
            sec_image_production: "Image production",
            sec_proactive_execution: "Proactive execution",
            sec_mode: "Generation mode",
            sec_refine: "Review the Design Spec first",
            sec_design_spec_depth: "Design Spec depth",
            design_spec_depth_brief: "Brief",
            design_spec_depth_brief_desc: "A short block list per page; no full page copy.",
            design_spec_depth_complete: "Complete",
            design_spec_depth_complete_desc: "Full page briefs with complete wording.",
            design_spec_depth_locked: "Locked to Complete because split mode or Design Spec refinement is enabled.",
            sec_design_directions: "Coherent design directions",
            design_directions_hint: "The recommended complete direction is applied first. Choose another or fine-tune the projected fields below; use Restore to return an adjusted direction to its authored bundle.",
            direction_active: "Applied",
            direction_adjusted: "Adjusted",
            direction_apply_hint: "Click to apply this complete direction.",
            direction_restore: "Restore authored direction",
            scheme_component_options: "Project-specific custom choices · select a card to edit",
            sec_template_application: "Template application",
            template_application_hint: "After reading every installed template SVG, the AI proposes one natural-language application plan. Edit it directly; this is not a mode selector.",
            placeholder_template_application: "Name exact SVG files for page-specific rules; describe what to use, skip, repeat, or reorder, what stays fixed, and what may be replaced or reorganized.",
            sub_visual: "Visual style",
            sub_divergence: "Material divergence (how freely to reshape vs. stay close to the source)",
            placeholder_divergence: "In your words — e.g. \"stick closely to the document\" / \"freely restructure and expand within the source\". Leave blank for a balanced default.",
            communication_intent: "What should this presentation accomplish?",
            communication_intent_hint: "Open answer — combine any that apply: inform, explain, persuade, decide, align, teach, report/account, mobilize, or leave a record/hand-off. Describe priority or sequence when useful; do not choose labels.",
            placeholder_communication_intent: "e.g. Report progress and surface risk first, then secure a decision on the next investment.",
            audience_outcome: "Desired audience outcome / success condition",
            placeholder_audience_outcome: "What should the audience know, understand, believe, decide, or do afterward?",
            core_message: "Core message / decision ask / action",
            placeholder_core_message: "Which claims, requests, or actions must land even if little else is remembered?",
            delivery_context: "Delivery context (name the primary)",
            delivery_context_hint: "Distinguish presenter-led, reader-led, hybrid, or recorded/self-running. For hybrid use, state which mode leads and what secondary use must still work.",
            placeholder_delivery_context: "e.g. Primary: presenter-led 20-minute leadership review. Secondary: reader-led approval copy shared afterward.",
            artifact_afterlife: "Artifact afterlife",
            placeholder_artifact_afterlife: "e.g. approval, review, audit, archive, hand-off, or reuse; leave blank when no later use is expected.",
            stage1_current_value_hint: "Editable fields contain recommendations. Keep, revise, or clear them; confirmation saves the current text exactly, including blank values.",
            content_divergence_locked_hint: "This profile preserves the source wording and page structure, so this field is fixed.",
            custom: "Custom",
            custom_placeholder: "Type your own…",
            ai_custom_candidate: "AI custom proposal",
            ai_custom_candidate_hint: "Always visible for comparison. It is not selected by default; select it to edit.",
            custom_behavior_required: "The selected AI custom proposal cannot be blank.",
            custom_color_required: "Describe the custom color scheme before continuing.",
            design_system_required: "Choose a complete palette and typography system before continuing.",
            mode_behavior_placeholder: "Describe the act sequence, title voice, page rhythm, and presentation posture.",
            visual_style_behavior_placeholder: "Describe shape language, composition, decoration density, whitespace, typography character, and texture.",
            recommended: "Recommended",
            placeholder_audience: "Who is this deck for?",
            placeholder_pages: "e.g. 12-15",
            hex_override: "Custom HEX override:",
            image_ai_path: "AI image path",
            image_strategy: "Generated image style",
            image_strategy_empty: "No preset style references are available. You can still use a custom style.",
            image_strategy_required: "Choose a generated-image preset or describe a custom style.",
            image_strategy_invalid: "The selected generated-image preset is not available.",
            image_strategy_select_placeholder: "Choose a generated-image preset…",
            image_strategy_recommended_group: "Recommended for this deck",
            image_strategy_all_group: "All preset styles",
            image_strategy_rendering: "Rendering",
            image_strategy_visual: "Visual",
            image_strategy_mood: "Mood",
            image_strategy_ai_custom: "AI custom proposal",
            image_strategy_ai_custom_desc: "A novel or multi-reference rendering proposal. Select it to edit.",
            image_strategy_custom_placeholder: "Describe the exact generated-image direction, subjects, composition, style cues, or things to avoid.",
            image_strategy_reference_hint: "Reference images show rendering only. Final AI images inherit the deck color scheme selected above.",
            image_strategy_no_reference: "No reference image for this custom choice.",
            image_source_summary: "Selected image sources",
            image_production_hint: "Image sources and rendering are selected above. Resolve only the production path here.",
            image_usage_notes: "Additional image requirements",
            image_usage_notes_placeholder: "e.g. realistic handwashing scenes; avoid cartoon germs; keep product photos untouched.",
            image_usage_required: "Select at least one image usage option.",
            image_usage_none_exclusive: "No images cannot be combined with other image options.",
            proactive_execution_hint: "These defaults apply only when you have not explicitly instructed otherwise. Your latest explicit instruction always takes priority.",
            proactive_speaker_notes: "Proactively generate speaker notes",
            proactive_speaker_notes_desc: "On by default. The agent generates speaker notes without a separate request.",
            proactive_custom_animations: "Proactively create custom animations",
            proactive_custom_animations_desc: "Off by default. Strategist motion suggestions remain available; turn this on to have the agent create custom animations without a separate request.",
            proactive_narration_audio: "Proactively generate narration audio",
            proactive_narration_audio_desc: "Off by default. This raw choice does not rewrite the speaker-notes toggle; the Strategist resolves narration's effective notes dependency in the Design Spec.",
            font_heading: "Heading",
            font_body: "Body",
            font_selection: "Font selection",
            primary_language_font: "Primary-language font",
            english_font: "English font",
            font_picker_hint: "Choosing a recommendation fills these selectors. Changing any font marks the typography as customized.",
            other_installed_font: "Other installed font…",
            other_font_placeholder: "Exact installed font name",
            customized: "Customized",
            font_body_size: "Body baseline size",
            font_body_size_hint: "All type sizes derive from this body baseline.",
            body_size_unit_relation: "SVG px to PPT pt: 1px = 0.75pt.",
            body_size_pt_hint: "Approximately {pt} pt (1px = 0.75pt; saved as px).",
            role_size_pt_hint: "≈ {pt} pt",
            body_size_hint_canvas: "This canvas suggests ~{lo}–{hi}px (from its effective canvas span).",
            body_size_hint_purpose: "This reading mode recommends {def}px — one fixed size, not a range.",
            body_size_hint_oor: "(Current value is outside the usual range for this canvas — check the unit is right and that it fits.)",
            delivery_purpose: "Reading mode",
            delivery_purpose_hint: "Choose where the meaning lives: read-close decks explain themselves with complete sentences and detail; presenter-led decks use one idea, concise claims, and visual evidence.",
            size_override: "Per-role size override:",
            size_role_title: "title",
            size_role_subtitle: "subtitle",
            size_role_annotation: "annotation",
            custom_typography: "Custom typography",
            custom_color: "Custom color",
            custom_color_placeholder: "Describe your colors in words, e.g. deep navy primary, warm orange accent, white background — or paste HEX values…",
            role_background: "bg",
            role_secondary_bg: "2nd bg",
            role_primary: "primary",
            role_accent: "accent",
            role_secondary_accent: "2nd accent",
            role_body_text: "body text",
            style_preview_label: "Overall impression (color + typography + icons)",
            style_preview_body: "· rough feel only, not the actual slide layout",
            preview_big_title: "Big Title",
            preview_latin_title: "Section Title",
            preview_body_intro: "Body copy shows the baseline text rhythm and contrast.",
            preview_latin_body: "Body text sample for checking Latin typography.",
            preview_point_1_title: "Body content",
            preview_point_1_text: "Use this area to judge paragraph density and line spacing.",
            preview_point_2_title: "Key point",
            preview_point_2_text: "Icons are placed next to real text instead of floating alone.",
            preview_point_3_title: "Conclusion",
            preview_point_3_text: "The combination should stay readable at presentation scale.",
            mode_continuous_desc: "Generate the whole deck in one pass.",
            mode_split_desc: "Stop after the spec; resume SVG generation in a fresh window.",
            refine_off_desc: "Write the Design Spec and execution lock in sequence, then auto-proceed.",
            refine_on_desc: "Stop after the Design Spec. A review page opens: edit any page directly or leave comments; approval in chat then creates the execution lock and continues generation.",
            off_default: "Off",
            on: "On",
            option_prefix: "Option",
            error_retry: "Error - retry"
        },
        ja: {
            page_title: "HugoPPTPilot - デザイン確認",
            topbar_hint: "自由記述の質問に答えるか、提案を選択・調整して次へ進んでください。",
            stage_anchors: "ステージ1 · コミュニケーション方針",
            stage_final_plan: "ステージ2 · 最終プランと制作",
            loading: "読み込み中…",
            load_error: "現在のステージの提案を読み込めませんでした。起動前にAIが書き込んでおく必要があります。",
            btn_confirm: "確定",
            btn_confirm_contract: "方針を確定して次へ →",
            btn_confirm_final_plan: "最終プランを確定 →",
            deriving: "最終プランを準備し、選択したテンプレートを確認しています…",
            template_selection_required: "自由デザインまたはテンプレート利用を選んでください。テンプレート利用時は、1つ以上のワークスペースを選択してください。",
            template_selection_conflict: "種類ごとにワークスペースを1件まで選択してください。",
            connection_lost: "確認サーバーへの接続が中断されました。再試行しています。失敗が続く場合は、チャットに戻って確定してください。",
            confirmed_title: "✓ 確定しました",
            confirmed_hint: "選択内容を保存しました。このページを閉じてチャットに戻れます。",
            lang_toggle_title: "言語を切り替え",
            sec_template_choice: "デザインの基準",
            template_choice_hint: "この資料のデザインシステムをどう決めるか選択します。",
            template_free_title: "現在の内容からデザインする",
            template_free_desc: "再利用可能なテンプレートワークスペースを使わず、Strategist がこのプロジェクトの内容からビジュアルシステムを組み立てます。",
            template_use_title: "テンプレートを使用",
            template_use_desc: "再利用可能な Brand、Style、Layout、Deck、または指定ワークスペースを1つ以上選択します。",
            template_library_hint: "種類ごとにワークスペースを1件まで選択できます。4種類はすべて組み合わせ可能で、構造は Layout が Deck より優先されます。",
            template_explicit_hint: "今回の実行で指定されたワークスペースを、種類が重複しない範囲で複数選択できます。選択したワークスペースに含まれるすべての種類が適用されます。確認用に参照元パスを表示します。",
            template_kind_brand: "Brand",
            template_kind_style: "Style",
            template_kind_layout: "Layout",
            template_kind_deck: "Deck",
            template_source_explicit: "指定パス",
            template_select_none: "なし",
            template_none_explicit: "今回の実行で指定されたテンプレートはありません",
            sec_canvas: "キャンバス形式",
            sec_pages: "ページ数",
            sec_audience: "対象者",
            sec_communication: "このプレゼンで何を実現するか",
            sec_delivery: "どう使い、何を残すか",
            sec_narrative: "ナラティブ方針",
            sec_visual: "ビジュアル方針",
            sec_color: "配色",
            sec_icons: "アイコンの使用",
            sec_type: "タイポグラフィ",
            sec_images: "画像の使用",
            sec_image_production: "画像制作",
            sec_proactive_execution: "自動で行う作業",
            sec_mode: "生成モード",
            sec_refine: "先に設計仕様をレビュー",
            sec_design_spec_depth: "設計仕様の詳細度",
            design_spec_depth_brief: "簡潔",
            design_spec_depth_brief_desc: "各ページを短いブロック一覧で記し、全文は書きません。",
            design_spec_depth_complete: "詳細",
            design_spec_depth_complete_desc: "各ページの詳細な内容を、文言まで含めて記載します。",
            design_spec_depth_locked: "分割モードまたは設計仕様のレビューが有効なため、「詳細」に固定されています。",
            sec_design_directions: "統合デザイン方針",
            design_directions_hint: "おすすめの全体案が最初に適用されています。別案を選ぶか、下の各項目を微調整できます。調整後は「元の案に戻す」で最初の組み合わせを復元できます。",
            direction_active: "適用中",
            direction_adjusted: "調整済み",
            direction_apply_hint: "クリックすると、この全体案を適用します。",
            direction_restore: "元の案に戻す",
            scheme_component_options: "プロジェクト専用カスタム案 · カードを選んで編集",
            sec_template_application: "テンプレートの適用方法",
            template_application_hint: "AIがインストール済みテンプレートの全SVGを確認し、自然言語の適用方針を1段落で提案します。モード選択ではなく、文章を直接修正できます。",
            placeholder_template_application: "ページ固有の規則は正確なSVGファイル名で示し、使用・省略・反復・並べ替え、固定する要素、差し替え・再構成できる内容を記述してください。",
            sub_visual: "ビジュアルスタイル",
            sub_divergence: "元資料からの自由度（どこまで自由に再構成するか、原文に忠実か）",
            placeholder_divergence: "自分の言葉で入力してください（例：「文書に忠実に」「元資料の範囲内で自由に再構成・展開」）。空欄の場合はバランス型になります。",
            communication_intent: "このプレゼンで何を実現したいですか？",
            communication_intent_hint: "自由記述です。情報共有・説明・説得・意思決定・合意形成・教育・報告と説明責任・行動喚起・記録と引き継ぎのうち、当てはまるものを組み合わせてください。必要なら優先順位や順序も書いてください。ラベルを選ぶ必要はありません。",
            placeholder_communication_intent: "例：まず進捗とリスクを報告し、そのうえで次の投資判断を得る。",
            audience_outcome: "対象者に期待する変化・成功条件",
            placeholder_audience_outcome: "終了後、対象者は何を知り、理解し、信じ、決め、行動できる状態になるべきですか？",
            core_message: "コアメッセージ／意思決定の依頼／行動",
            placeholder_core_message: "ほかの内容が忘れられても、必ず残すべき主張・依頼・行動は何ですか？",
            delivery_context: "利用状況（主な使い方を明記）",
            delivery_context_hint: "発表者主導、読者主導、ハイブリッド、録画／自動再生を区別してください。ハイブリッドの場合は、主となる使い方と、あわせて成り立たせたい副次的な用途も明記してください。",
            placeholder_delivery_context: "例：主な用途は発表者主導の20分の経営レビュー。副次的な用途は、会議後に共有する読者主導の承認資料。",
            artifact_afterlife: "資料の利用後の扱い",
            placeholder_artifact_afterlife: "例：承認、レビュー、監査、保管、引き継ぎ、再利用。後で使う予定がなければ空欄で構いません。",
            stage1_current_value_hint: "編集できる欄には提案が入っています。そのまま使う、修正する、空にするのいずれも可能です。確定すると、空欄も含めて現在の入力内容がそのまま保存されます。",
            content_divergence_locked_hint: "このプロファイルは原文とページ構成を保持するため、この項目は固定されています。",
            custom: "カスタム",
            custom_placeholder: "自由に入力…",
            ai_custom_candidate: "AIカスタム案",
            ai_custom_candidate_hint: "比較できるよう常に全文を表示します。初期選択はされず、選択後に編集できます。",
            custom_behavior_required: "選択したAIカスタム案を空欄にはできません。",
            custom_color_required: "続行する前に、カスタム配色の説明を入力してください。",
            design_system_required: "続行する前に、配色とタイポグラフィをすべて選択してください。",
            mode_behavior_placeholder: "構成の流れ、タイトルの語り口、ページのリズム、プレゼンのスタンスを記述してください。",
            visual_style_behavior_placeholder: "形状の特徴、構図、装飾の密度、余白、書体の性格、質感を記述してください。",
            recommended: "おすすめ",
            placeholder_audience: "この資料は誰に向けたものですか？",
            placeholder_pages: "例：12-15",
            hex_override: "カスタムHEXで上書き：",
            image_ai_path: "AI画像の生成経路",
            image_strategy: "生成画像のスタイル",
            image_strategy_empty: "プリセットのスタイル見本を利用できません。カスタムスタイルは引き続き使用できます。",
            image_strategy_required: "生成画像のプリセットを選ぶか、カスタムスタイルを記述してください。",
            image_strategy_invalid: "選択した生成画像プリセットは利用できません。",
            image_strategy_select_placeholder: "生成画像のプリセットを選択…",
            image_strategy_recommended_group: "この資料へのおすすめ",
            image_strategy_all_group: "すべてのプリセットスタイル",
            image_strategy_rendering: "表現スタイル",
            image_strategy_visual: "ビジュアル",
            image_strategy_mood: "ムード",
            image_strategy_ai_custom: "AIカスタム案",
            image_strategy_ai_custom_desc: "新規、または複数の既存スタイルを組み合わせた表現案です。選択後に編集できます。",
            image_strategy_custom_placeholder: "生成画像の方向性、被写体、構図、スタイル要素、避けたい要素を具体的に入力してください。",
            image_strategy_reference_hint: "参照画像が示すのは表現スタイルのみです。最終的なAI画像の配色は、上で選んだ資料の配色を引き継ぎます。",
            image_strategy_no_reference: "このカスタム選択には参照画像がありません。",
            image_source_summary: "選択中の画像ソース",
            image_production_hint: "画像ソースと表現スタイルは上で選択済みです。ここでは制作経路だけを決めます。",
            image_usage_notes: "画像に関する補足要件",
            image_usage_notes_placeholder: "例：リアルな手洗いシーンを優先、漫画調の菌のイラストは避ける、製品写真はそのまま使う。",
            image_usage_required: "画像の使用方法を少なくとも1つ選択してください。",
            image_usage_none_exclusive: "「画像なし」は他の画像オプションと同時に選択できません。",
            proactive_execution_hint: "これらの初期設定は、明示的な指示がない場合にのみ適用されます。最新の明示的な指示が常に優先されます。",
            proactive_speaker_notes: "発表者ノートを自動で生成",
            proactive_speaker_notes_desc: "初期設定はオンです。別途依頼しなくても、エージェントが発表者ノートを生成します。",
            proactive_custom_animations: "カスタムアニメーションを自動で作成",
            proactive_custom_animations_desc: "初期設定はオフです。Strategist によるアニメーションの提案は引き続き利用できます。オンにすると、別途依頼しなくてもエージェントがカスタムアニメーションを作成します。",
            proactive_narration_audio: "ナレーション音声を自動で生成",
            proactive_narration_audio_desc: "初期設定はオフです。ここでの選択は発表者ノートの設定を書き換えません。ナレーションに実際に必要なノートの扱いは、Strategist が設計仕様の中で決定します。",
            font_heading: "見出し",
            font_body: "本文",
            font_selection: "フォント選択",
            primary_language_font: "主要言語のフォント",
            english_font: "英語フォント",
            font_picker_hint: "提案を選ぶと下の選択欄に反映されます。いずれかのフォントを変更するとカスタマイズ済みになります。",
            other_installed_font: "その他のインストール済みフォント…",
            other_font_placeholder: "インストール済みフォントの正確な名前",
            customized: "カスタマイズ済み",
            font_body_size: "本文の基準サイズ",
            font_body_size_hint: "すべての文字サイズは、この本文の基準サイズをもとに決まります。",
            body_size_unit_relation: "SVGのpxとPPTのptの換算：1px = 0.75pt。",
            body_size_pt_hint: "約{pt}pt（1px = 0.75ptで換算。保存はpx単位）。",
            role_size_pt_hint: "約{pt}pt",
            body_size_hint_canvas: "このキャンバスの目安は約{lo}〜{hi}px（キャンバスの実効サイズから算出）。",
            body_size_hint_purpose: "この閲覧モードの推奨値は{def}pxです（範囲ではなく固定値）。",
            body_size_hint_oor: "（現在の値はこのキャンバスの通常の範囲外です。単位が正しいか、サイズが適切かを確認してください。）",
            delivery_purpose: "閲覧モード",
            delivery_purpose_hint: "情報をページと発表者のどちらに担わせるかを決めます。文書型は完結した文と必要な細部でページ単体で理解できるようにし、プレゼン型は1枚1メッセージで、短い主張と視覚的な根拠を中心にします。",
            size_override: "役割ごとのサイズ上書き：",
            size_role_title: "タイトル",
            size_role_subtitle: "サブタイトル",
            size_role_annotation: "注釈",
            custom_typography: "カスタムタイポグラフィ",
            custom_color: "カスタム配色",
            custom_color_placeholder: "配色を言葉で入力（例：濃紺をメインに、暖色オレンジをアクセントに、背景は白）、またはHEX値を貼り付け…",
            role_background: "背景",
            role_secondary_bg: "第2背景",
            role_primary: "メイン",
            role_accent: "アクセント",
            role_secondary_accent: "第2アクセント",
            role_body_text: "本文テキスト",
            style_preview_label: "全体の印象（配色・タイポグラフィ・アイコン）",
            style_preview_body: "· 雰囲気の確認用で、実際のレイアウトではありません",
            preview_big_title: "大見出し",
            preview_latin_title: "Section Title",
            preview_body_intro: "本文の基準サイズとコントラストを確認するための文です。",
            preview_latin_body: "Body text sample for checking Latin typography.",
            preview_point_1_title: "本文内容",
            preview_point_1_text: "段落密度と行間の見え方をここで確認します。",
            preview_point_2_title: "要点",
            preview_point_2_text: "アイコンは単独ではなく、実際の文章の横に配置します。",
            preview_point_3_title: "結論",
            preview_point_3_text: "投影時にも読みやすい組み合わせかを判断します。",
            mode_continuous_desc: "資料全体を一括で生成します。",
            mode_split_desc: "設計仕様の作成後に停止し、新しいチャットでSVG生成を再開します。",
            refine_off_desc: "設計仕様と実行ロックを順番に作成し、そのまま自動で進みます。",
            refine_on_desc: "設計仕様の作成後に停止します。レビューページが開き、各ページを直接編集するかコメントを残せます。チャットで承認すると実行ロックを作成して生成を続けます。",
            off_default: "オフ",
            on: "オン",
            option_prefix: "案",
            error_retry: "エラーが発生しました。再試行してください"
        },
        vi: {
            page_title: "HugoPPTPilot - Xác nhận thiết kế",
            topbar_hint: "Trả lời các câu hỏi mở, hoặc chọn và tùy chỉnh các đề xuất, rồi tiếp tục.",
            stage_anchors: "Giai đoạn 1 · Cam kết truyền đạt",
            stage_final_plan: "Giai đoạn 2 · Kế hoạch cuối & sản xuất",
            loading: "Đang tải…",
            load_error: "Không thể tải giai đoạn đề xuất hiện tại. AI phải ghi nội dung này trước khi khởi chạy.",
            btn_confirm: "Xác nhận",
            btn_confirm_contract: "Xác nhận cam kết & tiếp tục →",
            btn_confirm_final_plan: "Xác nhận kế hoạch cuối →",
            deriving: "Đang chuẩn bị kế hoạch cuối và kiểm tra các mẫu bạn đã chọn…",
            template_selection_required: "Hãy chọn thiết kế tự do hoặc dùng mẫu. Khi dùng mẫu, cần chọn ít nhất một workspace.",
            template_selection_conflict: "Mỗi loại chỉ được chọn tối đa một workspace.",
            connection_lost: "Kết nối tới máy chủ xác nhận bị gián đoạn; đang thử lại. Nếu vẫn lỗi, hãy quay lại cuộc trò chuyện để xác nhận.",
            confirmed_title: "✓ Đã xác nhận",
            confirmed_hint: "Lựa chọn của bạn đã được lưu. Bạn có thể đóng trang này và quay lại cuộc trò chuyện.",
            lang_toggle_title: "Chuyển ngôn ngữ",
            sec_template_choice: "Nền tảng thiết kế",
            template_choice_hint: "Chọn cách bộ slide này thiết lập hệ thống thiết kế.",
            template_free_title: "Thiết kế theo nội dung hiện tại",
            template_free_desc: "Không dùng workspace mẫu tái sử dụng. Strategist sẽ tự suy ra hệ thống hình ảnh từ dự án này.",
            template_use_title: "Dùng mẫu",
            template_use_desc: "Chọn một hoặc nhiều workspace tái sử dụng: Brand, Style, Layout, Deck hoặc workspace chỉ định.",
            template_library_hint: "Mỗi loại chọn tối đa một workspace. Cả bốn loại có thể kết hợp; Layout được ưu tiên về cấu trúc hơn Deck.",
            template_explicit_hint: "Chọn đúng các workspace được cung cấp cho lần chạy này, với các loại không chồng lấn; mọi loại trong mỗi thư mục gốc đã chọn đều được áp dụng. Đường dẫn nguồn được hiển thị để đối chiếu.",
            template_kind_brand: "Thương hiệu",
            template_kind_style: "Phong cách",
            template_kind_layout: "Bố cục",
            template_kind_deck: "Bộ slide",
            template_source_explicit: "Đường dẫn chỉ định",
            template_select_none: "Không chọn",
            template_none_explicit: "Lần chạy này không có mẫu chỉ định",
            sec_canvas: "Định dạng khung slide",
            sec_pages: "Số trang",
            sec_audience: "Đối tượng mục tiêu",
            sec_communication: "Bài thuyết trình này phải đạt được điều gì",
            sec_delivery: "Cách sử dụng và những gì cần được lưu giữ",
            sec_narrative: "Hướng mạch trình bày",
            sec_visual: "Hướng hình ảnh",
            sec_color: "Bảng màu",
            sec_icons: "Cách dùng biểu tượng",
            sec_type: "Kiểu chữ",
            sec_images: "Cách dùng hình ảnh",
            sec_image_production: "Sản xuất hình ảnh",
            sec_proactive_execution: "Thực thi chủ động",
            sec_mode: "Chế độ tạo",
            sec_refine: "Duyệt Design Spec trước",
            sec_design_spec_depth: "Độ chi tiết của Design Spec",
            design_spec_depth_brief: "Ngắn gọn",
            design_spec_depth_brief_desc: "Danh sách khối ngắn cho mỗi trang; không có toàn bộ nội dung trang.",
            design_spec_depth_complete: "Đầy đủ",
            design_spec_depth_complete_desc: "Bản mô tả trang đầy đủ, kèm toàn bộ câu chữ.",
            design_spec_depth_locked: "Bị khóa ở mức Đầy đủ vì đang bật chế độ tách bước hoặc duyệt Design Spec.",
            sec_design_directions: "Các hướng thiết kế đồng bộ",
            design_directions_hint: "Hướng thiết kế trọn gói được đề xuất sẽ được áp dụng trước. Hãy chọn hướng khác hoặc tinh chỉnh các trường bên dưới; dùng Khôi phục để đưa hướng đã chỉnh về bản gốc.",
            direction_active: "Đang áp dụng",
            direction_adjusted: "Đã chỉnh sửa",
            direction_apply_hint: "Nhấp để áp dụng hướng thiết kế trọn gói này.",
            direction_restore: "Khôi phục hướng gốc",
            scheme_component_options: "Lựa chọn tùy chỉnh theo dự án · chọn một thẻ để chỉnh sửa",
            sec_template_application: "Cách áp dụng mẫu",
            template_application_hint: "Sau khi đọc mọi SVG mẫu đã cài, AI đề xuất một kế hoạch áp dụng bằng ngôn ngữ tự nhiên. Hãy chỉnh sửa trực tiếp; đây không phải bộ chọn chế độ.",
            placeholder_template_application: "Nêu đúng tên các tệp SVG cho quy tắc riêng của từng trang; mô tả cái gì dùng, bỏ qua, lặp lại hay đổi thứ tự, cái gì giữ cố định, cái gì có thể thay thế hoặc sắp xếp lại.",
            sub_visual: "Phong cách hình ảnh",
            sub_divergence: "Mức độ tự do với tài liệu (tái cấu trúc thoải mái hay bám sát nguồn)",
            placeholder_divergence: "Bằng lời của bạn — ví dụ: \"bám sát tài liệu\" / \"tự do tái cấu trúc và mở rộng trong phạm vi nguồn\". Để trống sẽ dùng mức cân bằng mặc định.",
            communication_intent: "Bài thuyết trình này cần đạt được điều gì?",
            communication_intent_hint: "Câu trả lời mở — có thể kết hợp: cung cấp thông tin, giải thích, thuyết phục, ra quyết định, thống nhất, đào tạo, báo cáo/giải trình, huy động hành động, hoặc lưu hồ sơ/bàn giao. Nêu thứ tự ưu tiên nếu cần; không cần chọn nhãn.",
            placeholder_communication_intent: "Ví dụ: Báo cáo tiến độ và nêu rủi ro trước, sau đó xin quyết định về khoản đầu tư tiếp theo.",
            audience_outcome: "Kết quả mong muốn ở khán giả / điều kiện thành công",
            placeholder_audience_outcome: "Sau buổi trình bày, khán giả cần biết, hiểu, tin, quyết định hoặc làm gì?",
            core_message: "Thông điệp cốt lõi / đề nghị quyết định / hành động",
            placeholder_core_message: "Những luận điểm, đề nghị hoặc hành động nào phải được ghi nhớ dù khán giả quên mọi thứ khác?",
            delivery_context: "Bối cảnh trình bày (nêu rõ hình thức chính)",
            delivery_context_hint: "Phân biệt: người trình bày dẫn dắt, người đọc tự xem, kết hợp, hoặc ghi hình/tự chạy. Với hình thức kết hợp, hãy nêu hình thức nào là chính và hình thức phụ nào vẫn phải dùng được.",
            placeholder_delivery_context: "Ví dụ: Chính: người trình bày dẫn dắt, buổi duyệt 20 phút với ban lãnh đạo. Phụ: bản đọc để phê duyệt, gửi sau buổi họp.",
            artifact_afterlife: "Vòng đời của tài liệu sau buổi trình bày",
            placeholder_artifact_afterlife: "Ví dụ: phê duyệt, rà soát, kiểm toán, lưu trữ, bàn giao hoặc tái sử dụng; để trống nếu không dự kiến dùng lại.",
            stage1_current_value_hint: "Các trường có thể chỉnh sửa đang chứa đề xuất. Hãy giữ, sửa hoặc xóa; khi xác nhận, hệ thống lưu đúng nội dung hiện tại, kể cả giá trị để trống.",
            content_divergence_locked_hint: "Hồ sơ này giữ nguyên câu chữ và cấu trúc trang của nguồn, nên trường này bị cố định.",
            custom: "Tùy chỉnh",
            custom_placeholder: "Nhập nội dung của bạn…",
            ai_custom_candidate: "Đề xuất tùy chỉnh của AI",
            ai_custom_candidate_hint: "Luôn hiển thị để so sánh. Không được chọn mặc định; hãy chọn để chỉnh sửa.",
            custom_behavior_required: "Đề xuất tùy chỉnh của AI đã chọn không được để trống.",
            custom_color_required: "Hãy mô tả bảng màu tùy chỉnh trước khi tiếp tục.",
            design_system_required: "Hãy chọn một hệ thống bảng màu và kiểu chữ hoàn chỉnh trước khi tiếp tục.",
            mode_behavior_placeholder: "Mô tả trình tự các hồi, giọng tiêu đề, nhịp trang và tư thế trình bày.",
            visual_style_behavior_placeholder: "Mô tả ngôn ngữ hình khối, bố cục, mật độ trang trí, khoảng trắng, đặc tính kiểu chữ và chất liệu bề mặt.",
            recommended: "Khuyên dùng",
            placeholder_audience: "Bộ slide này dành cho ai?",
            placeholder_pages: "Ví dụ: 12-15",
            hex_override: "Ghi đè mã HEX tùy chỉnh:",
            image_ai_path: "Đường dẫn ảnh AI",
            image_strategy: "Phong cách ảnh do AI tạo",
            image_strategy_empty: "Chưa có phong cách tham chiếu dựng sẵn. Bạn vẫn có thể dùng phong cách tùy chỉnh.",
            image_strategy_required: "Hãy chọn một phong cách ảnh AI dựng sẵn hoặc mô tả phong cách tùy chỉnh.",
            image_strategy_invalid: "Phong cách ảnh AI dựng sẵn đã chọn hiện không khả dụng.",
            image_strategy_select_placeholder: "Chọn phong cách ảnh AI dựng sẵn…",
            image_strategy_recommended_group: "Khuyên dùng cho bộ slide này",
            image_strategy_all_group: "Tất cả phong cách dựng sẵn",
            image_strategy_rendering: "Kỹ thuật dựng hình",
            image_strategy_visual: "Hình ảnh",
            image_strategy_mood: "Tâm trạng",
            image_strategy_ai_custom: "Đề xuất tùy chỉnh của AI",
            image_strategy_ai_custom_desc: "Đề xuất dựng hình mới lạ hoặc kết hợp nhiều tham chiếu. Chọn để chỉnh sửa.",
            image_strategy_custom_placeholder: "Mô tả chính xác hướng ảnh AI: chủ thể, bố cục, gợi ý phong cách hoặc những điều cần tránh.",
            image_strategy_reference_hint: "Ảnh tham chiếu chỉ thể hiện kỹ thuật dựng hình. Ảnh AI cuối cùng sẽ kế thừa bảng màu của bộ slide đã chọn ở trên.",
            image_strategy_no_reference: "Lựa chọn tùy chỉnh này không có ảnh tham chiếu.",
            image_source_summary: "Nguồn ảnh đã chọn",
            image_production_hint: "Nguồn ảnh và kỹ thuật dựng hình đã được chọn ở trên. Ở đây chỉ chọn đường dẫn sản xuất.",
            image_usage_notes: "Yêu cầu bổ sung về hình ảnh",
            image_usage_notes_placeholder: "Ví dụ: cảnh rửa tay chân thực; tránh vi khuẩn hoạt hình; giữ nguyên ảnh sản phẩm.",
            image_usage_required: "Hãy chọn ít nhất một tùy chọn dùng hình ảnh.",
            image_usage_none_exclusive: "\"Không dùng hình ảnh\" không thể kết hợp với các tùy chọn ảnh khác.",
            proactive_execution_hint: "Các mặc định này chỉ áp dụng khi bạn chưa có chỉ dẫn rõ ràng khác. Chỉ dẫn rõ ràng gần nhất của bạn luôn được ưu tiên.",
            proactive_speaker_notes: "Chủ động tạo ghi chú người trình bày",
            proactive_speaker_notes_desc: "Mặc định bật. Agent tạo ghi chú người trình bày mà không cần yêu cầu riêng.",
            proactive_custom_animations: "Chủ động tạo hiệu ứng chuyển động tùy chỉnh",
            proactive_custom_animations_desc: "Mặc định tắt. Các gợi ý chuyển động của Strategist vẫn khả dụng; bật mục này để agent tự tạo hiệu ứng tùy chỉnh mà không cần yêu cầu riêng.",
            proactive_narration_audio: "Chủ động tạo âm thanh thuyết minh",
            proactive_narration_audio_desc: "Mặc định tắt. Lựa chọn thô này không ghi đè công tắc ghi chú người trình bày; Strategist sẽ xác định phụ thuộc ghi chú thực tế của phần thuyết minh trong Design Spec.",
            font_heading: "Tiêu đề",
            font_body: "Nội dung",
            font_selection: "Chọn phông chữ",
            primary_language_font: "Phông chữ cho ngôn ngữ chính",
            english_font: "Phông chữ tiếng Anh",
            font_picker_hint: "Chọn một đề xuất sẽ điền vào các bộ chọn này. Thay đổi bất kỳ phông chữ nào sẽ đánh dấu kiểu chữ là đã tùy chỉnh.",
            other_installed_font: "Phông chữ khác đã cài…",
            other_font_placeholder: "Tên chính xác của phông chữ đã cài",
            customized: "Đã tùy chỉnh",
            font_body_size: "Cỡ chữ nội dung cơ sở",
            font_body_size_hint: "Mọi cỡ chữ đều được suy ra từ cỡ chữ nội dung cơ sở này.",
            body_size_unit_relation: "Từ px SVG sang pt PPT: 1px = 0,75pt.",
            body_size_pt_hint: "Khoảng {pt} pt (1px = 0,75pt; lưu theo px).",
            role_size_pt_hint: "≈ {pt} pt",
            body_size_hint_canvas: "Khung slide này gợi ý khoảng {lo}–{hi}px (theo chiều rộng hiệu dụng của khung).",
            body_size_hint_purpose: "Chế độ đọc này khuyên dùng {def}px — một cỡ cố định, không phải khoảng.",
            body_size_hint_oor: "(Giá trị hiện tại nằm ngoài khoảng thông thường của khung này — hãy kiểm tra đơn vị và mức độ vừa vặn.)",
            delivery_purpose: "Chế độ đọc",
            delivery_purpose_hint: "Chọn nơi ý nghĩa nằm ở đâu: bộ slide đọc gần tự giải thích bằng câu đầy đủ và chi tiết; bộ slide có người trình bày dùng một ý, luận điểm ngắn gọn và bằng chứng trực quan.",
            size_override: "Ghi đè cỡ chữ theo vai trò:",
            size_role_title: "tiêu đề",
            size_role_subtitle: "phụ đề",
            size_role_annotation: "chú thích",
            custom_typography: "Kiểu chữ tùy chỉnh",
            custom_color: "Màu tùy chỉnh",
            custom_color_placeholder: "Mô tả màu sắc bằng lời, ví dụ: chủ đạo xanh navy đậm, điểm nhấn cam ấm, nền trắng — hoặc dán mã HEX…",
            role_background: "nền",
            role_secondary_bg: "nền phụ",
            role_primary: "chủ đạo",
            role_accent: "điểm nhấn",
            role_secondary_accent: "nhấn phụ",
            role_body_text: "chữ nội dung",
            style_preview_label: "Ấn tượng chung (màu sắc + kiểu chữ + biểu tượng)",
            style_preview_body: "· chỉ là cảm nhận sơ bộ, không phải bố cục slide thực tế",
            preview_big_title: "Tiêu đề lớn",
            preview_latin_title: "Tiêu đề mục",
            preview_body_intro: "Đoạn nội dung cho thấy nhịp chữ và độ tương phản cơ bản.",
            preview_latin_body: "Đoạn mẫu để kiểm tra chữ Việt có dấu: Hà Nội, Đà Nẵng, Thành phố Hồ Chí Minh.",
            preview_point_1_title: "Nội dung chính",
            preview_point_1_text: "Dùng khu vực này để đánh giá mật độ đoạn văn và khoảng cách dòng.",
            preview_point_2_title: "Điểm chính",
            preview_point_2_text: "Biểu tượng được đặt cạnh chữ thật thay vì đứng lẻ loi.",
            preview_point_3_title: "Kết luận",
            preview_point_3_text: "Tổ hợp này phải đủ dễ đọc ở quy mô trình chiếu.",
            mode_continuous_desc: "Tạo toàn bộ bộ slide trong một lượt.",
            mode_split_desc: "Dừng sau khi có spec; tiếp tục tạo SVG trong một cửa sổ mới.",
            refine_off_desc: "Lần lượt viết Design Spec và khóa thực thi, rồi tự động tiếp tục.",
            refine_on_desc: "Dừng sau Design Spec. Một trang duyệt sẽ mở ra: sửa trực tiếp từng trang hoặc để lại nhận xét; sau khi bạn phê duyệt trong cuộc trò chuyện, hệ thống sẽ tạo khóa thực thi và tiếp tục.",
            off_default: "Tắt",
            on: "Bật",
            option_prefix: "Phương án",
            error_retry: "Lỗi - hãy thử lại"
        }
    };

    var LANG = (function () {
        try {
            var stored = window.localStorage.getItem("ppt_lang");
            if (stored === "en" || stored === "ja" || stored === "vi") return stored;
        } catch (e) { /* ignore */ }
        return "vi";
    })();

    function t(key) {
        var dict = MESSAGES[LANG] || MESSAGES.en;
        return dict[key] != null ? dict[key] : key;
    }

    // zh / zh-TW / ja text takes a full-width colon and no space between sentences.
    function isCjkUi() {
        return LANG === "zh" || LANG === "zh-TW" || LANG === "ja";
    }

    function labelSep() {
        return isCjkUi() ? "：" : ": ";
    }

    // Preserve the existing locale order, then accept zh_tw-only candidate
    // prose from any persisted UI language so browser and server validation agree.
    // Entries are FIELD SUFFIXES, not BCP-47 tags: "zh-TW" data lives in
    // `<base>_zh_tw` keys, so a hyphenless suffix is used here and in langField().
    var LANG_FALLBACK = {
        en: ["en", "ja", "zh", "zh_tw"],
        ja: ["ja", "en", "zh", "zh_tw"],
        vi: ["vi", "en", "ja", "zh", "zh_tw"]
    };
    // Suffix used to look up localized catalog/recommendation fields.
    var LANG_FIELD = { "zh-TW": "zh_tw" };

    function langField(lang) {
        return LANG_FIELD[lang] || lang;
    }
    var IMAGE_COMPARISON_LABELS = {
        rendering: {
            "vector-illustration": { zh: "矢量插画", zh_tw: "向量插畫", en: "Vector illustration", ja: "ベクターイラスト" },
            flat: { zh: "扁平插画", zh_tw: "扁平插畫", en: "Flat illustration", ja: "フラットイラスト" },
            "3d-isometric": { zh: "3D 等距", zh_tw: "3D 等距", en: "3D isometric", ja: "3Dアイソメトリック" },
            "digital-dashboard": { zh: "数字仪表盘", zh_tw: "數位儀表板", en: "Digital dashboard", ja: "デジタルダッシュボード" },
            "corporate-photo": { zh: "企业摄影", zh_tw: "企業攝影", en: "Corporate photo", ja: "ビジネス写真" },
            blueprint: { zh: "蓝图线稿", zh_tw: "藍圖線稿", en: "Blueprint", ja: "ブループリント" },
            editorial: { zh: "杂志编辑风", zh_tw: "編輯雜誌", en: "Editorial", ja: "エディトリアル" },
            "sketch-notes": { zh: "手绘笔记", zh_tw: "手繪筆記", en: "Sketch notes", ja: "スケッチノート" },
            "ink-notes": { zh: "墨迹笔记", zh_tw: "墨跡筆記", en: "Ink notes", ja: "インクノート" },
            chalkboard: { zh: "粉笔黑板", zh_tw: "粉筆黑板", en: "Chalkboard", ja: "黒板" },
            watercolor: { zh: "水彩", zh_tw: "水彩", en: "Watercolor", ja: "水彩" },
            "warm-scene": { zh: "暖调场景", zh_tw: "暖調場景", en: "Warm scene", ja: "暖色シーン" },
            "screen-print": { zh: "丝网印刷", zh_tw: "絲網印刷", en: "Screen print", ja: "スクリーンプリント" },
            "fantasy-animation": { zh: "幻想动画", zh_tw: "幻想動畫", en: "Fantasy animation", ja: "ファンタジーアニメ" },
            "pixel-art": { zh: "像素艺术", zh_tw: "像素藝術", en: "Pixel art", ja: "ピクセルアート" },
            nature: { zh: "自然有机", zh_tw: "自然有機", en: "Nature", ja: "自然・オーガニック" },
            "minimalist-swiss": { zh: "瑞士极简", zh_tw: "瑞士極簡", en: "Minimalist Swiss", ja: "スイス・ミニマル" },
            glassmorphism: { zh: "玻璃拟态", zh_tw: "玻璃擬態", en: "Glassmorphism", ja: "グラスモーフィズム" },
            "vintage-poster": { zh: "复古海报", zh_tw: "復古海報", en: "Vintage poster", ja: "ヴィンテージポスター" },
            "paper-cut": { zh: "剪纸拼贴", zh_tw: "剪紙拼貼", en: "Paper cut", ja: "切り絵" }
        }
    };

    function localized(obj, base) {
        if (!obj) return "";
        var langKey = base + "_" + langField(LANG);
        if (obj[langKey] != null) return obj[langKey];
        var order = LANG_FALLBACK[LANG] || LANG_FALLBACK.en;
        var i;
        if (obj[base] != null) {
            if (typeof obj[base] === "object") {
                for (i = 0; i < order.length; i++) {
                    if (obj[base][order[i]]) return obj[base][order[i]];
                }
                return "";
            }
            return obj[base];
        }
        for (i = 0; i < order.length; i++) {
            if (obj[base + "_" + order[i]]) return obj[base + "_" + order[i]];
        }
        return "";
    }

    function optionLabel(option) {
        return localized(option, "label") || String(option && option.id);
    }

    function optionDesc(option) {
        return localized(option, "desc");
    }

    function groupLabel(group) {
        return localized(group, "group");
    }

    function humanizeId(value) {
        return String(value || "")
            .replace(/[_-]+/g, " ")
            .replace(/\b[a-z]/g, function (match) { return match.toUpperCase(); });
    }

    function langMappedLabel(kind, id) {
        if (!id) return "";
        if (id === "custom") return t("custom");
        var entry = IMAGE_COMPARISON_LABELS[kind] && IMAGE_COMPARISON_LABELS[kind][id];
        if (!entry) return "";
        var order = LANG_FALLBACK[LANG] || LANG_FALLBACK.en;
        for (var i = 0; i < order.length; i += 1) {
            if (entry[order[i]]) return entry[order[i]];
        }
        return entry.en || "";
    }

    function comparisonValueLabel(kind, id) {
        return langMappedLabel(kind, id) || humanizeId(id);
    }

    function applyStaticTranslations() {
        document.documentElement.setAttribute("lang", LANG === "ja" ? "ja" : (LANG === "en" ? "en" : "vi"));
        document.querySelectorAll("[data-i18n]").forEach(function (node) {
            node.textContent = t(node.getAttribute("data-i18n"));
        });
    }

    var LANG_NAMES = { vi: "Tiếng Việt", en: "English", ja: "日本語" };

    function refreshLangToggle(toggleBtn) {
        // Custom dropdown (OS-independent): button shows the CURRENT language.
        var cur = document.getElementById("lang-current");
        if (cur) cur.textContent = LANG_NAMES[LANG] || LANG;
        toggleBtn.title = t("lang_toggle_title");
        document.querySelectorAll("#lang-menu li").forEach(function (li) {
            var selected = li.getAttribute("data-lang") === LANG;
            li.classList.toggle("selected", selected);
            li.setAttribute("aria-selected", selected ? "true" : "false");
        });
    }

    // ---- state -----------------------------------------------------------
    var CAT = null;     // catalogs.json — finite option universe
    var REC = null;     // current recommendation stage — AI picks + candidates
    var ICON_PREVIEWS = {};  // /api/icon-previews — real SVG samples from templates/icons
    var AI_IMAGE_COMPARISON = {};  // /api/ai-image-comparison — preset rendering catalog
    var STATE = {};
    var ACTIVE_DIRECTION_ID = "";
    var ACTIVE_DIRECTION_BASELINE = "";
    var ACTIVE_COMPONENT_DIRECTION_IDS = {};
    var refreshDesignDirectionState = function () {};
    var DIRECTION_COMPONENT_PAINTERS = [];

    function refreshDirectionComponentStates() {
        DIRECTION_COMPONENT_PAINTERS.forEach(function (paint) { paint(); });
    }
    var TEMPLATE_KINDS = ["brand", "style", "layout", "deck"];
    var TEMPLATE_OPTIONS = null;
    var TEMPLATE_CANDIDATES = [];
    var TEMPLATE_SELECTED_KEYS = [];
    var TEMPLATE_SELECTIONS = { brand: "", style: "", layout: "", deck: "", explicit: "" };
    var TEMPLATE_MODE = "";
    var REC_ALIASES = {
        icons: {
            line: "tabler-outline",
            filled: "tabler-filled",
            monochrome: "chunk-filled"
        },
        image_usage: {
            search: "web"
        },
        image_ai_path: {
            default: "auto",
            builtin: "host-native"
        }
    };

    // ---- DOM helpers -----------------------------------------------------
    function el(tag, cls, text) {
        var node = document.createElement(tag);
        if (cls) node.className = cls;
        if (text != null) node.textContent = text;
        return node;
    }

    function fitTextareaToContent(input) {
        if (!input) return;
        window.requestAnimationFrame(function () {
            if (!input.isConnected || input.offsetParent === null) return;
            input.style.height = "auto";
            var borderHeight = input.offsetHeight - input.clientHeight;
            input.style.height = (input.scrollHeight + borderHeight) + "px";
        });
    }

    function previewNode(kind, id) {
        var node = el("div", "option-preview option-preview-" + kind);
        node.setAttribute("aria-hidden", "true");
        if (kind === "visual_style") {
            appendVisualStyleImage(node, id);
            return node;
        }
        var markup = kind === "icons" ? iconStylePreview(id) : "";
        if (!markup) return null;
        node.innerHTML = markup;
        return node;
    }

    function visualStylePreviewSrc(id) {
        return "/static/style_previews/" + encodeURIComponent(id || "") + ".svg";
    }

    function appendVisualStyleImage(parent, id) {
        var img = document.createElement("img");
        img.alt = "";
        img.loading = "lazy";
        img.src = visualStylePreviewSrc(id);
        img.onerror = function () {
            parent.innerHTML = visualStylePreview(id);
        };
        parent.appendChild(img);
    }

    function escapeHtml(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function visualStylePreview(id) {
        var label = escapeHtml(humanizeId(id) || t("sub_visual"));
        var fallback = escapeHtml(t("error_retry"));
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">' +
            '<rect width="1280" height="720" fill="#F8FAFC"/>' +
            '<path d="M0 160H1280M0 360H1280M0 560H1280M220 0V720M640 0V720M1060 0V720" stroke="#E2E8F0" stroke-width="2"/>' +
            '<rect x="116" y="96" width="1048" height="528" rx="28" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3"/>' +
            '<rect x="164" y="148" width="360" height="34" rx="17" fill="#111827"/>' +
            '<rect x="164" y="228" width="520" height="20" rx="10" fill="#CBD5E1"/>' +
            '<rect x="164" y="274" width="440" height="20" rx="10" fill="#E2E8F0"/>' +
            '<rect x="760" y="188" width="292" height="236" rx="22" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="3"/>' +
            '<path d="M808 378L874 308L942 348L1012 258" fill="none" stroke="#2563EB" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>' +
            '<circle cx="1012" cy="258" r="22" fill="#0F172A"/>' +
            '<rect x="164" y="464" width="220" height="24" rx="12" fill="#94A3B8"/>' +
            '<text x="164" y="548" fill="#475569" font-family="Arial, sans-serif" font-size="34">' + label + '</text>' +
            '<text x="164" y="594" fill="#94A3B8" font-family="Arial, sans-serif" font-size="24">' + fallback + '</text>' +
            '</svg>';
    }

    function iconStylePreview(id) {
        var common = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100"';
        var samples = ICON_PREVIEWS[id] || [];
        if (samples.length) {
            var sample = samples[0] || {};
            return '<div class="real-icon-preview real-icon-preview-' + escapeHtml(id) + '">' +
                '<div class="real-icon-sample"><div class="real-icon-mark">' +
                (sample.svg || "") +
                '</div><span class="real-icon-label">' + escapeHtml(sample.name || "") + '</span></div>' +
                '</div>';
        }
        if (id === "emoji") return '<svg ' + common + '><rect width="160" height="100" rx="10" fill="#FFF7ED"/><text x="80" y="60" text-anchor="middle" font-size="34">📊</text></svg>';
        if (id === "none") return '<svg ' + common + '><rect width="160" height="100" rx="10" fill="#FFFFFF"/><rect x="22" y="20" width="116" height="9" rx="4.5" fill="#111827"/><rect x="22" y="42" width="90" height="6" rx="3" fill="#CBD5E1"/><rect x="22" y="56" width="104" height="6" rx="3" fill="#CBD5E1"/><rect x="22" y="70" width="70" height="6" rx="3" fill="#CBD5E1"/><path d="M118 42l24 24M142 42l-24 24" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/></svg>';
        return "";
    }

    function comparisonImageUrl(kind, id) {
        var value = String(id || "").trim();
        if (!value || value === "custom") return "";
        if (!/^[A-Za-z0-9_.-]+$/.test(value)) return "";
        return "/ai-image-comparison/" + kind + "/" + encodeURIComponent(value) + ".webp";
    }

    function appendImageStrategyPreviews(card, candidate) {
        if (candidate.rendering === "custom") return;
        var previews = [
            [t("image_strategy_rendering"), comparisonImageUrl("rendering", candidate.rendering)]
        ].filter(function (item) { return item[1]; });
        if (!previews.length) return;
        var row = el("div", "image-strategy-previews");
        previews.forEach(function (item) {
            var frame = el("div", "image-strategy-preview");
            var img = document.createElement("img");
            img.alt = item[0];
            img.loading = "lazy";
            img.src = item[1];
            img.onerror = function () {
                frame.remove();
                if (!row.childElementCount) row.remove();
            };
            frame.appendChild(img);
            frame.appendChild(el("span", "image-strategy-preview-label", item[0]));
            row.appendChild(frame);
        });
        card.appendChild(row);
        return row;
    }

    // Section numbers run 1..N within the stage currently rendered; the counter is
    // reset at the top of renderForStage. The legacy `num` arg is ignored so each
    // stage numbers its own sections cleanly (stage 2 is not a continuation of 1).
    var _secCounter = 0;
    function section(num, titleKey, noteText) {
        _secCounter += 1;
        var sec = el("div", "section");
        var head = el("div", "section-head");
        head.appendChild(el("span", "section-num", String(_secCounter)));
        head.appendChild(el("span", "section-title", t(titleKey)));
        if (noteText) head.appendChild(el("span", "section-note", noteText));
        sec.appendChild(head);
        return sec;
    }

    function setSectionNote(sec, text) {
        var head = sec.querySelector(".section-head");
        var note = head.querySelector(".section-note");
        if (!note) {
            note = el("span", "section-note");
            head.appendChild(note);
        }
        note.textContent = text;
    }

    // ---- Stage 1 template selection --------------------------------------
    function normalizeTemplateCandidates(raw, source, kind) {
        if (!Array.isArray(raw)) return [];
        return raw.filter(function (candidate) {
            return candidate && candidate.key != null && String(candidate.key).trim();
        }).map(function (candidate) {
            var normalized = Object.assign({}, candidate);
            normalized.key = String(candidate.key);
            normalized.source = source;
            if (kind) normalized.kind = kind;
            return normalized;
        });
    }

    function initTemplateOptions(data) {
        var library = data && data.library && typeof data.library === "object"
            ? data.library : {};
        var defaultMode = data && data.default_mode;
        if (defaultMode !== "free_design" && defaultMode !== "templates") {
            throw new Error("template_options.default_mode must be free_design or templates");
        }
        var normalized = {
            options_sha256: data && data.options_sha256,
            lang: data && data.lang,
            default_mode: defaultMode,
            library: {},
            explicit: [],
            preselected_keys: Array.isArray(data && data.preselected_keys)
                ? data.preselected_keys.map(String) : []
        };
        TEMPLATE_CANDIDATES = [];
        TEMPLATE_KINDS.forEach(function (kind) {
            var candidates = normalizeTemplateCandidates(library[kind], "library", kind);
            normalized.library[kind] = candidates;
            TEMPLATE_CANDIDATES = TEMPLATE_CANDIDATES.concat(candidates);
        });
        normalized.explicit = normalizeTemplateCandidates(data && data.explicit, "explicit", "");
        TEMPLATE_CANDIDATES = TEMPLATE_CANDIDATES.concat(normalized.explicit);
        var candidatesByKey = Object.create(null);
        TEMPLATE_CANDIDATES.forEach(function (candidate) {
            if (candidatesByKey[candidate.key]) {
                throw new Error("Duplicate template option key: " + candidate.key);
            }
            candidatesByKey[candidate.key] = candidate;
        });
        TEMPLATE_SELECTIONS = emptyTemplateSelections();
        normalized.preselected_keys.filter(function (key, index, all) {
            return all.indexOf(key) === index;
        }).forEach(function (key) {
            var candidate = candidatesByKey[key];
            var slot = templateSelectionSlot(candidate);
            if (!candidate || !slot) {
                throw new Error("Invalid preselected template key: " + key);
            }
            if (slot === "explicit") {
                if (TEMPLATE_SELECTIONS.explicit.indexOf(candidate.workspace_root) < 0) {
                    TEMPLATE_SELECTIONS.explicit.push(candidate.workspace_root);
                }
                return;
            }
            if (TEMPLATE_SELECTIONS[slot] && TEMPLATE_SELECTIONS[slot] !== key) {
                throw new Error("Multiple preselected templates for slot: " + slot);
            }
            TEMPLATE_SELECTIONS[slot] = key;
        });
        // Publish options before syncing: expanding an explicit root into its
        // kinds reads TEMPLATE_OPTIONS, so a preselected root would otherwise
        // resolve to zero keys on first load.
        TEMPLATE_OPTIONS = normalized;
        syncTemplateSelectionState();
        TEMPLATE_MODE = normalized.default_mode;
    }

    function emptyTemplateSelections() {
        return { brand: "", style: "", layout: "", deck: "", explicit: [] };
    }

    function templateSelectionSlot(candidate) {
        if (!candidate) return "";
        if (candidate.source === "explicit") return "explicit";
        if (candidate.source === "library" && TEMPLATE_KINDS.indexOf(candidate.kind) >= 0) {
            return candidate.kind;
        }
        return "";
    }

    function templateCandidateByKey(key) {
        key = String(key || "");
        for (var i = 0; i < TEMPLATE_CANDIDATES.length; i += 1) {
            if (TEMPLATE_CANDIDATES[i].key === key) return TEMPLATE_CANDIDATES[i];
        }
        return null;
    }

    function explicitCandidatesForRoot(workspaceRoot) {
        var root = String(workspaceRoot || "");
        if (!root) return [];
        return ((TEMPLATE_OPTIONS && TEMPLATE_OPTIONS.explicit) || [])
            .filter(function (candidate) { return candidate.workspace_root === root; });
    }

    // One supplied path is one workspace, and its kinds compose rather than
    // compete. Selecting that root therefore takes every kind it exposes.
    function explicitRootOptions() {
        var roots = [];
        var seen = Object.create(null);
        ((TEMPLATE_OPTIONS && TEMPLATE_OPTIONS.explicit) || []).forEach(function (candidate) {
            var root = candidate.workspace_root || "";
            if (!root || seen[root]) return;
            seen[root] = true;
            var kinds = explicitCandidatesForRoot(root).map(function (item) {
                return templateKindLabel(item.kind);
            });
            roots.push({
                key: root,
                label: candidate.label || root,
                summary: kinds.join(" + "),
                workspace_root: root
            });
        });
        return roots;
    }

    function syncTemplateSelectionState() {
        TEMPLATE_SELECTED_KEYS = TEMPLATE_KINDS.map(function (kind) {
            return TEMPLATE_SELECTIONS[kind];
        });
        TEMPLATE_SELECTIONS.explicit.forEach(function (root) {
            explicitCandidatesForRoot(root).forEach(function (candidate) {
                TEMPLATE_SELECTED_KEYS.push(candidate.key);
            });
        });
        TEMPLATE_SELECTED_KEYS = TEMPLATE_SELECTED_KEYS.filter(Boolean);
    }

    function templateCandidateTitle(candidate) {
        return localized(candidate, "label") || candidate.label || candidate.id || candidate.key;
    }

    function templateCandidateSummary(candidate) {
        return localized(candidate, "summary") || candidate.summary || "";
    }

    function templateKindLabel(kind) {
        return t("template_kind_" + kind);
    }

    function chooseFreeDesign() {
        TEMPLATE_SELECTIONS = emptyTemplateSelections();
        syncTemplateSelectionState();
        TEMPLATE_MODE = "free_design";
        updateTemplateSelectionControls();
    }

    function chooseTemplateMode() {
        TEMPLATE_MODE = "templates";
        updateTemplateSelectionControls();
    }

    function chooseTemplateForSlot(slot, key) {
        TEMPLATE_SELECTIONS[slot] = String(key || "");
        syncTemplateSelectionState();
        TEMPLATE_MODE = "templates";
        updateTemplateSelectionControls();
    }

    function chooseExplicitTemplateRoot(root, selected) {
        TEMPLATE_SELECTIONS.explicit = TEMPLATE_SELECTIONS.explicit.filter(function (value) {
            return value !== root;
        });
        if (selected) TEMPLATE_SELECTIONS.explicit.push(root);
        syncTemplateSelectionState();
        TEMPLATE_MODE = "templates";
        updateTemplateSelectionControls();
    }

    function templateOptionTitle(candidate) {
        var details = [];
        var summary = templateCandidateSummary(candidate);
        if (summary) details.push(summary);
        if (candidate.workspace_root) details.push(candidate.workspace_root);
        return details.join(" · ");
    }

    function renderTemplateSelectField(slot, label, candidates) {
        var field = el("div", "template-select-field template-select-field-" + slot);
        var selectId = "template-select-" + slot;
        var fieldLabel = el("label", "template-select-label", label);
        fieldLabel.setAttribute("for", selectId);
        field.appendChild(fieldLabel);

        var select = el("select", "template-select");
        select.id = selectId;
        select.setAttribute("data-template-slot", slot);
        var none = el("option", "", t("template_select_none"));
        none.value = "";
        select.appendChild(none);
        candidates.forEach(function (candidate) {
            var option = el("option", "", templateCandidateTitle(candidate));
            option.value = candidate.key;
            var title = templateOptionTitle(candidate);
            if (title) option.title = title;
            select.appendChild(option);
        });
        select.value = TEMPLATE_SELECTIONS[slot] || "";
        select.disabled = !candidates.length;
        select.addEventListener("change", function () {
            chooseTemplateForSlot(slot, select.value);
        });
        field.appendChild(select);

        return field;
    }

    function renderExplicitTemplateChoices() {
        var field = el("div", "template-select-field template-select-field-explicit");
        field.appendChild(el("div", "template-select-label", t("template_source_explicit")));
        var roots = explicitRootOptions();
        field.appendChild(el("div", "template-select-help",
            roots.length ? t("template_explicit_hint") : t("template_none_explicit")));
        roots.forEach(function (candidate) {
            var label = el("label", "template-select-help");
            var checkbox = el("input", "template-explicit-choice");
            checkbox.type = "checkbox";
            checkbox.value = candidate.workspace_root;
            checkbox.checked = TEMPLATE_SELECTIONS.explicit.indexOf(checkbox.value) >= 0;
            checkbox.addEventListener("change", function () {
                chooseExplicitTemplateRoot(checkbox.value, checkbox.checked);
            });
            label.appendChild(checkbox);
            label.appendChild(el("span", "", templateCandidateTitle(candidate) + " · " + candidate.summary));
            label.appendChild(el("code", "template-selected-path-value", candidate.workspace_root));
            field.appendChild(label);
        });
        return field;
    }

    function renderTemplateModeChoice(id, mode, titleKey, descKey, onSelect) {
        var selected = TEMPLATE_MODE === mode;
        var choice = el("button", "template-mode-choice" + (selected ? " selected" : ""));
        choice.id = id;
        choice.type = "button";
        choice.setAttribute("aria-pressed", selected ? "true" : "false");
        choice.appendChild(el("span", "template-choice-radio"));
        var copy = el("span", "template-choice-copy");
        copy.appendChild(el("span", "template-choice-title", t(titleKey)));
        copy.appendChild(el("span", "template-choice-desc", t(descKey)));
        choice.appendChild(copy);
        choice.addEventListener("click", onSelect);
        return choice;
    }

    function renderTemplateSelection(host) {
        if (!TEMPLATE_OPTIONS) return;
        var sec = section("T", "sec_template_choice", t("template_choice_hint"));
        var choices = el("div", "template-mode-choices");
        choices.appendChild(renderTemplateModeChoice(
            "template-free-choice", "free_design", "template_free_title",
            "template_free_desc", chooseFreeDesign
        ));
        var useChoice = renderTemplateModeChoice(
            "template-use-choice", "templates", "template_use_title",
            "template_use_desc", chooseTemplateMode
        );
        useChoice.setAttribute("aria-controls", "template-selector-panel");
        choices.appendChild(useChoice);
        sec.appendChild(choices);

        var panel = el("div", "template-selector-panel");
        panel.id = "template-selector-panel";
        panel.appendChild(el("div", "template-selector-hint", t("template_library_hint")));
        var grid = el("div", "template-select-grid");
        TEMPLATE_KINDS.forEach(function (kind) {
            var candidates = TEMPLATE_OPTIONS.library[kind] || [];
            grid.appendChild(renderTemplateSelectField(kind, templateKindLabel(kind), candidates));
        });
        grid.appendChild(renderExplicitTemplateChoices());
        panel.appendChild(grid);
        sec.appendChild(panel);
        host.appendChild(sec);
        updateTemplateSelectionControls();
    }

    function updateTemplateSelectionControls() {
        var freeChoice = document.getElementById("template-free-choice");
        var useChoice = document.getElementById("template-use-choice");
        var selectorPanel = document.getElementById("template-selector-panel");
        var freeSelected = TEMPLATE_MODE === "free_design";
        var templatesSelected = TEMPLATE_MODE === "templates";
        if (freeChoice) {
            freeChoice.classList.toggle("selected", freeSelected);
            freeChoice.setAttribute("aria-pressed", freeSelected ? "true" : "false");
        }
        if (useChoice) {
            useChoice.classList.toggle("selected", templatesSelected);
            useChoice.setAttribute("aria-pressed", templatesSelected ? "true" : "false");
            useChoice.setAttribute("aria-expanded", templatesSelected ? "true" : "false");
        }
        if (selectorPanel) selectorPanel.hidden = !templatesSelected;
        TEMPLATE_KINDS.forEach(function (slot) {
            var select = document.getElementById("template-select-" + slot);
            if (select) select.value = TEMPLATE_SELECTIONS[slot] || "";
        });
        document.querySelectorAll(".template-explicit-choice").forEach(function (checkbox) {
            checkbox.checked = TEMPLATE_SELECTIONS.explicit.indexOf(checkbox.value) >= 0;
        });
        var status = document.getElementById("confirm-status");
        if (status) status.textContent = "";
    }

    function normalizeRecId(field, value) {
        if (Array.isArray(value)) return normalizeRecId(field, value[0]);
        if (value == null || value === "") return value;
        var aliases = REC_ALIASES[field] || {};
        return aliases[value] || value;
    }

    function normalizeRecIds(field, value) {
        if (Array.isArray(value)) {
            return value.map(function (item) { return normalizeRecId(field, item); })
                .filter(function (item, idx, arr) { return item && arr.indexOf(item) === idx; });
        }
        var normalized = normalizeRecId(field, value);
        return normalized ? [normalized] : [];
    }

    function legacyRecId(field) {
        if (!REC) return null;
        if (field === "canvas") return REC.canvas && REC.canvas.value;
        if (field === "visual_style") return REC.visual_style || (REC.style && REC.style.value);
        if (field === "icons") return REC.icons && REC.icons.value;
        if (field === "image_usage") return REC.images && REC.images.value;
        if (field === "image_ai_path") return REC.image_ai_path || (REC.images && REC.images.ai_path);
        if (field === "generation_mode") return REC.generation_mode && REC.generation_mode.value;
        return REC[field] && REC[field].value;
    }

    function recId(field) {
        var value = (REC && REC.recommend && REC.recommend[field]) || legacyRecId(field);
        return normalizeRecId(field, value || null);
    }

    function recValue(field) {
        return (REC && REC.recommend && REC.recommend[field]) || legacyRecId(field);
    }

    function booleanRecommendation(field, fallback) {
        if (!REC || !Object.prototype.hasOwnProperty.call(REC, field)) return fallback;
        var spec = REC[field];
        var value = spec && typeof spec === "object" ? spec.value : spec;
        return typeof value === "boolean" ? value : fallback;
    }

    function recommendationFieldLocked(field) {
        return !!(REC && REC[field] && typeof REC[field] === "object" && REC[field].locked === true);
    }

    // Guaranteed recommendation: the AI's pick, or the first catalog option as a
    // fallback so an enumerable field ALWAYS shows a badged recommendation.
    function recOrFirst(field, list) {
        var r = recId(field);
        if (r == null || r === "") r = normalizeRecId(field, directionField(field));
        if (r != null && r !== "") return r;
        return firstId(list);
    }
    // Render an enumerable field: ALL options from the catalog, recommended one
    // badged, current selection from STATE, plus an optional Custom box. An
    // AI-authored custom candidate stays fully visible while unselected and
    // becomes editable only after selection; legacy custom inputs keep their
    // compact free-text behavior.
    // `list` is either a flat array of {id,label,desc,dim,viewbox} or a grouped array
    // of {group, items:[...]}.
    function enumField(parent, list, recommendedId, getVal, setVal, opts2) {
        list = list || [];
        opts2 = opts2 || {};
        var disabled = opts2.disabled === true;
        var grouped = list.length && list[0] && list[0].items;
        var flat = grouped ? list.reduce(function (a, g) { return a.concat(g.items || []); }, []) : list;
        var ids = flat.map(function (o) { return o.id; });
        // Optional legacy spectrum: marks several catalog ids with localized
        // tags and notes instead of one recommendation badge.
        var spectrum = (opts2.spectrum && opts2.spectrum.length) ? opts2.spectrum : null;
        var specById = {};
        if (spectrum) spectrum.forEach(function (s) {
            if (s && s.id) specById[s.id] = { tag: localized(s, "tag"), note: localized(s, "note") };
        });
        var allowCustom = opts2.allowCustom === true;  // only for fields not fully enumerable
        var aiCustom = opts2.aiCustom || null;
        var customSentinel = opts2.customSentinel || (aiCustom ? "custom" : "");
        var customInvalidValues = opts2.customInvalidValues || [];
        var cur = getVal();
        var isCustom = cur != null && cur !== "" &&
            (cur === customSentinel || ids.indexOf(cur) === -1);
        if (!allowCustom && isCustom && opts2.preserveCustom !== true) {
            // closed field with an out-of-catalog value → snap to recommended/first
            cur = ids.indexOf(recommendedId) >= 0 ? recommendedId : ids[0];
            setVal(cur);
            isCustom = false;
        }

        var allChips = [];
        var customInput = el(aiCustom ? "textarea" : "input", "text-input custom-input");
        setNaturalInputDirection(customInput);
        if (opts2.inputClass) customInput.classList.add(opts2.inputClass);
        if (aiCustom) customInput.rows = aiCustom.rows || 4;
        else customInput.type = "text";
        customInput.placeholder = opts2.placeholder || t("custom_placeholder");
        customInput.style.display = "none";
        var customPreview = null;

        function customText() {
            if (!aiCustom) return customInput.value || "";
            return String(aiCustom.getText ? aiCustom.getText() : (aiCustom.text || ""));
        }

        function syncAiCustom(selected) {
            if (!aiCustom || !customPreview) return;
            var value = customText();
            customPreview.textContent = value;
            customPreview.style.display = selected ? "none" : "block";
            customInput.style.display = selected ? "block" : "none";
            if (selected && customInput.value !== value) customInput.value = value;
        }

        function deselect() {
            allChips.forEach(function (c) { c.classList.remove("selected"); });
            if (aiCustom) syncAiCustom(false);
        }
        function makeChip(o) {
            var label = optionLabel(o);
            var desc = optionDesc(o);
            var spec = specById[o.id];
            var chip = el("div", "chip");
            var preview = previewNode(opts2.preview, o.id);
            if (preview) {
                chip.classList.add("chip-with-preview");
                chip.classList.add("chip-preview-" + opts2.preview);
                chip.appendChild(preview);
            }
            var copy = el("div", "chip-copy");
            if (o.viewbox) {
                label = label + (o.dim ? " · " + o.dim : "");
            } else {
                if (o.dim) label += " · " + o.dim;
                if (desc) label += (isCjkUi() ? "：" : " — ") + desc;
                if (spec && spec.note) label += " · " + spec.note;
            }
            copy.appendChild(el("span", "chip-text", label));
            if (spec) {
                // spectrum pick: badge shows its temperament tag, not the generic ★
                chip.classList.add("recommended");
                copy.appendChild(el("span", "rec-badge", "★ " + (spec.tag || t("recommended"))));
            } else if (!spectrum && o.id === recommendedId) {
                chip.classList.add("recommended");
                copy.appendChild(el("span", "rec-badge", "★ " + t("recommended")));
            }
            chip.appendChild(copy);
            if (!isCustom && o.id === cur) chip.classList.add("selected");
            if (disabled) {
                chip.setAttribute("aria-disabled", "true");
                chip.style.cursor = "not-allowed";
                chip.style.opacity = "0.65";
            }
            chip.addEventListener("click", function () {
                if (disabled) return;
                deselect();
                chip.classList.add("selected");
                if (!aiCustom) customInput.style.display = "none";
                setVal(o.id);
            });
            allChips.push(chip);
            return chip;
        }

        var chipsClass = "chips" + (opts2.chipsClass ? " " + opts2.chipsClass : "");
        if (grouped) {
            list.forEach(function (g) {
                if (groupLabel(g)) parent.appendChild(el("div", "group-label", groupLabel(g)));
                var row = el("div", chipsClass);
                (g.items || []).forEach(function (o) { row.appendChild(makeChip(o)); });
                parent.appendChild(row);
            });
            if (allowCustom) {
                var lastRow = el("div", aiCustom ? "chips custom-chip-row" : "chips");
                lastRow.appendChild(buildCustomChip());
                parent.appendChild(lastRow);
            }
        } else {
            var wrap = el("div", chipsClass);
            var ownRowIds = opts2.ownRowIds || [];
            flat.filter(function (o) { return ownRowIds.indexOf(o.id) === -1; })
                .forEach(function (o) { wrap.appendChild(makeChip(o)); });
            if (allowCustom && !opts2.customOnOwnRow) wrap.appendChild(buildCustomChip());
            parent.appendChild(wrap);
            flat.filter(function (o) { return ownRowIds.indexOf(o.id) >= 0; })
                .forEach(function (o) {
                    var ownRow = el("div", "chips standalone-chip-row");
                    ownRow.appendChild(makeChip(o));
                    parent.appendChild(ownRow);
                });
            if (allowCustom && opts2.customOnOwnRow) {
                var customRow = el("div", "chips custom-chip-row");
                customRow.appendChild(buildCustomChip());
                parent.appendChild(customRow);
            }
        }
        if (allowCustom && !aiCustom) parent.appendChild(customInput);

        function buildCustomChip() {
            var customChip = el("div", aiCustom ? "chip ai-custom-candidate" : "chip");
            if (aiCustom) {
                var customHead = el("div", "ai-custom-candidate-head");
                customHead.appendChild(el("span", "chip-text",
                    aiCustom.label || t("ai_custom_candidate")));
                customHead.appendChild(el("span", "ai-custom-candidate-hint",
                    aiCustom.hint || t("ai_custom_candidate_hint")));
                customChip.appendChild(customHead);
                customPreview = el("div", "ai-custom-candidate-copy", customText());
                customChip.appendChild(customPreview);
                customChip.appendChild(customInput);
            } else {
                customChip.appendChild(el("span", "chip-text", t("custom")));
            }
            if (recommendedId === customSentinel ||
                    (recommendedId && ids.indexOf(recommendedId) === -1 && isCustom)) {
                customChip.classList.add("recommended");
                customChip.appendChild(el("span", "rec-badge", "★ " + t("recommended")));
            }
            if (isCustom) {
                customChip.classList.add("selected");
                if (aiCustom) syncAiCustom(true);
                else {
                    customInput.style.display = "block";
                    customInput.value = customInvalidValues.indexOf(cur) >= 0 ? "" : cur;
                }
            } else if (aiCustom) {
                syncAiCustom(false);
            }
            customChip.addEventListener("click", function () {
                deselect();
                customChip.classList.add("selected");
                if (aiCustom) syncAiCustom(true);
                else customInput.style.display = "block";
                customInput.focus();
                setVal(aiCustom ? customSentinel : (customInput.value || customSentinel));
            });
            allChips.push(customChip);
            return customChip;
        }
        customInput.addEventListener("click", function (event) { event.stopPropagation(); });
        customInput.addEventListener("input", function () {
            if (aiCustom) {
                if (aiCustom.setText) aiCustom.setText(customInput.value);
                setVal(customSentinel);
            } else {
                setVal(customInput.value || customSentinel);
            }
        });
    }

    function textField(parent, getVal, setVal, placeholderKey, numeric) {
        var input = el("input", numeric ? "num-input" : "text-input");
        input.type = "text";
        if (!numeric) setNaturalInputDirection(input);
        input.value = getVal() || "";
        input.placeholder = t(placeholderKey);
        input.addEventListener("input", function () { setVal(input.value); });
        parent.appendChild(input);
    }

    function textareaField(parent, getVal, setVal, placeholderKey, rows) {
        var input = el("textarea", "text-input");
        setNaturalInputDirection(input);
        input.rows = rows || 2;
        input.value = getVal() || "";
        input.placeholder = t(placeholderKey);
        input.addEventListener("input", function () { setVal(input.value); });
        parent.appendChild(input);
        return input;
    }

    function labeledTextarea(parent, labelKey, getVal, setVal, placeholderKey, hintKey, rows) {
        var field = el("div", "subfield");
        field.appendChild(el("div", "subfield-label", t(labelKey)));
        if (hintKey) field.appendChild(el("div", "toggle-desc", t(hintKey)));
        textareaField(field, getVal, setVal, placeholderKey, rows);
        parent.appendChild(field);
        return field;
    }

    function normPalette(c) {
        function read(src, keys) {
            if (!src) return undefined;
            for (var i = 0; i < keys.length; i += 1) {
                if (src[keys[i]] != null) return src[keys[i]];
            }
            return undefined;
        }
        function collect(src) {
            return {
                background: read(src, ["background", "bg"]),
                secondary_bg: read(src, ["secondary_bg", "secondary_background", "card_bg", "card_background"]),
                primary: read(src, ["primary"]),
                accent: read(src, ["accent"]),
                secondary_accent: read(src, ["secondary_accent", "secondary"]),
                body_text: read(src, ["body_text", "text"])
            };
        }
        if (c && c.palette) {
            return collect(c.palette);
        }
        if (!c) return {};
        return collect(c);
    }

    function recommendationLanguage() {
        // `lang` controls the Confirm UI language; it is not evidence of the
        // deck's content language. New staged files carry `primary_language`.
        var raw = REC && (REC.primary_language || REC.content_language || REC.language);
        if (raw && typeof raw === "object") {
            raw = raw.value || raw.id || raw.code || "";
        }
        // The API is the single normalizer; the browser consumes its canonical
        // value instead of maintaining a second alias table.
        return String(raw || "und").trim().replace(/_/g, "-");
    }

    function isEnglishProject() {
        return /^en(?:-|$)/i.test(recommendationLanguage());
    }

    function setEnglishLanguageAttributes(node) {
        node.lang = "en";
        node.dir = "ltr";
    }

    function setUiLanguageAttributes(node) {
        node.lang = LANG === "zh" ? "zh-CN" : (LANG === "zh-TW" ? "zh-TW" : (LANG === "ja" ? "ja-JP" : "en-US"));
        node.dir = "ltr";
    }

    function setNaturalInputDirection(node) {
        node.dir = "auto";
    }

    function stringList(value) {
        if (Array.isArray(value)) return value.map(String);
        if (value == null || value === "") return [];
        return [String(value)];
    }

    function normalizedFontToken(value) {
        return String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    }

    function fontScriptTokens(language) {
        var parts = normalizedFontToken(language).split("-");
        var base = parts[0];
        if (!base || base === "und") return [];
        var explicitScript = parts.filter(function (part) {
            return /^[a-z]{4}$/.test(part);
        })[0];
        if (explicitScript) return [explicitScript];
        if (base === "en") return ["latin", "latn", "english"];
        if (base === "zh") {
            if (parts.indexOf("cn") >= 0 || parts.indexOf("sg") >= 0) {
                return ["han", "hans", "cjk", "chinese", "zh"];
            }
            if (parts.indexOf("tw") >= 0 || parts.indexOf("hk") >= 0 ||
                    parts.indexOf("mo") >= 0) {
                return ["han", "hant", "cjk", "chinese", "zh"];
            }
            return ["han", "hans", "cjk", "chinese", "zh"];
        }
        if (base === "ja") return ["han", "jpan", "kana", "hiragana", "katakana", "cjk", "japanese", "ja"];
        if (base === "ko") return ["hangul", "kore", "han", "cjk", "korean", "ko"];
        if (["ru", "uk", "bg", "sr", "mk"].indexOf(base) >= 0) return ["cyrl", "cyrillic"];
        if (["ar", "fa", "ur"].indexOf(base) >= 0) return ["arab", "arabic"];
        if (base === "he" || base === "iw") return ["hebr", "hebrew"];
        if (base === "el") return ["grek", "greek"];
        if (base === "th") return ["thai"];
        if (base === "hi" || base === "mr" || base === "ne") return ["deva", "devanagari"];
        // Most remaining presentation locales use Latin script. Locale metadata
        // still wins before this fallback.
        return ["latin", "latn"];
    }

    function fontSupportsLanguage(font, language) {
        var target = normalizedFontToken(language);
        var targetBase = target.split("-")[0];
        var locales = stringList(font && font.locales).map(normalizedFontToken);
        if (locales.some(function (locale) {
            return locale === "*" || locale === target ||
                (target !== targetBase && locale === targetBase);
        })) return true;

        var supportedScripts = stringList(font && font.scripts).map(normalizedFontToken);
        var wantedScripts = fontScriptTokens(language);
        if (supportedScripts.some(function (script) {
            return wantedScripts.indexOf(script) >= 0;
        })) return true;

        // A catalog entry without language metadata remains usable. Once either
        // metadata field is present, filtering follows it.
        return !locales.length && !supportedScripts.length;
    }

    function fontCatalogEntries(field) {
        var fonts = (CAT && Array.isArray(CAT.fonts)) ? CAT.fonts : [];
        var language = field === "english" ? "en" : recommendationLanguage();
        if (field === "primary" && language === "und") {
            return fonts.filter(function (font) { return font && font.id; });
        }
        var matching = fonts.filter(function (font) {
            return font && font.id && fontSupportsLanguage(font, language);
        });
        return matching;
    }

    function findFontCatalogEntry(id) {
        var fonts = (CAT && Array.isArray(CAT.fonts)) ? CAT.fonts : [];
        var target = String(id || "").trim().toLowerCase();
        for (var i = 0; i < fonts.length; i += 1) {
            if (String(fonts[i].id || "").trim().toLowerCase() === target) return fonts[i];
        }
        return null;
    }

    function derivedFontCss(font) {
        var primary = findFontCatalogEntry(font && font.primary);
        return String((primary && primary.css) || "sans-serif").trim() ||
            "sans-serif";
    }

    function normalizedFontRole(font, samples) {
        font = (font && typeof font === "object") ? Object.assign({}, font) : {};
        samples = samples || {};
        var primary = font.primary;
        var english = font.english;
        if (isEnglishProject()) {
            primary = primary || font.latin || font.cjk || "";
            english = "";
        } else {
            primary = primary || font.cjk || "";
            english = english || font.latin || "";
        }
        font.primary = primary;
        if (isEnglishProject()) delete font.english;
        else font.english = english;
        font.sample_primary = font.sample_primary ||
            (isEnglishProject() ? font.sample_latin : font.sample_cjk) ||
            samples.primary || "";
        if (isEnglishProject()) {
            delete font.sample_english;
        } else {
            font.sample_english = font.sample_english || font.sample_latin ||
                samples.english || "";
        }
        delete font.cjk;
        delete font.latin;
        delete font.sample_cjk;
        delete font.sample_latin;
        if (!String(font.css || "").trim()) font.css = derivedFontCss(font);
        return font;
    }

    function normTypography(c) {
        c = c || {};
        var normalized = Object.assign({}, c);
        var objectShape = c.heading && typeof c.heading === "object" &&
            c.body && typeof c.body === "object";
        var heading = objectShape ? c.heading : {
            primary: isEnglishProject() ? (c.heading_latin || c.heading || "") : (c.heading || ""),
            english: isEnglishProject() ? "" : (c.heading_latin || ""),
            css: c.heading_css || ""
        };
        var body = objectShape ? c.body : {
            primary: isEnglishProject() ? (c.body_latin || c.body || "") : (c.body || ""),
            english: isEnglishProject() ? "" : (c.body_latin || ""),
            css: c.body_css || ""
        };
        normalized.name = c.name || "";
        normalized.note = c.note || "";
        normalized.custom = c.custom || "";
        normalized.body_size = typographyBodySize(c);
        normalized.heading = normalizedFontRole(heading, {
            primary: isEnglishProject()
                ? (c.sample_heading_latin || c.sample_heading || "")
                : (c.sample_heading || ""),
            english: c.sample_heading_latin || ""
        });
        normalized.body = normalizedFontRole(body, {
            primary: isEnglishProject()
                ? (c.sample_body_latin || c.sample_body || "")
                : (c.sample_body || ""),
            english: c.sample_body_latin || ""
        });
        delete normalized.heading_latin;
        delete normalized.body_latin;
        delete normalized.heading_css;
        delete normalized.body_css;
        delete normalized.sample_heading;
        delete normalized.sample_heading_latin;
        delete normalized.sample_body;
        delete normalized.sample_body_latin;
        return normalized;
    }

    function typographyBodySize(c) {
        c = c || {};
        var value = c.body_size || c.body_baseline || c.body_px ||
            (c.sizes && c.sizes.body) ||
            (c.size && c.size.body) ||
            (c.body && typeof c.body === "object" && (c.body.size || c.body.font_size));
        return value == null ? "" : String(value).replace(/px$/i, "");
    }

    function designDirectionSpec() {
        return (REC && REC.design_directions) ||
            (REC && REC.design && REC.design.directions) ||
            {};
    }

    function designDirectionCandidates() {
        var spec = designDirectionSpec();
        return spec.candidates || spec.options || [];
    }

    function selectedDesignDirectionIndex() {
        var candidates = designDirectionCandidates();
        var selected = Number(designDirectionSpec().selected);
        if (!isFinite(selected) || selected < 0) selected = 0;
        return Math.min(Math.floor(selected), Math.max(candidates.length - 1, 0));
    }

    function designDirectionId(candidate, index) {
        var value = candidate && candidate.id;
        return String(value || ("direction-" + (Number(index) + 1)));
    }

    function selectedDesignDirection() {
        var candidates = designDirectionCandidates();
        return candidates[selectedDesignDirectionIndex()] || {};
    }

    function directionField(field) {
        var candidate = selectedDesignDirection();
        return candidate[field] != null ? candidate[field] : null;
    }

    function directionBehavior(candidate, field) {
        return String(localized(candidate, field + "_behavior") ||
            (candidate && candidate[field + "_behavior"]) || "");
    }

    function directionStateSignature(candidate) {
        candidate = candidate || {};
        var out = {};
        if (candidate.mode) {
            out.mode = STATE.mode || "";
            out.mode_behavior = STATE.mode === "custom" ? (STATE.mode_behavior || "") : "";
        }
        if (candidate.visual_style) {
            out.visual_style = STATE.visual_style || "";
            out.visual_style_behavior = STATE.visual_style === "custom" ?
                (STATE.visual_style_behavior || "") : "";
        }
        if (candidate.color) {
            var palette = normPalette(STATE.color || {});
            out.color = {
                custom: (STATE.color && STATE.color.custom) || "",
                palette: {}
            };
            PALETTE_ROLES.forEach(function (role) {
                out.color.palette[role] = normHex(palette[role]) || "";
            });
        }
        if (candidate.typography) {
            var typography = normTypography(STATE.typography || {});
            out.typography = {
                heading: typography.heading || {},
                body: typography.body || {},
                body_size: String(typography.body_size || ""),
                sizes: {}
            };
            ["title", "subtitle", "annotation"].forEach(function (role) {
                out.typography.sizes[role] = String(
                    (STATE.typography && STATE.typography.sizes && STATE.typography.sizes[role]) || ""
                );
            });
        }
        if (candidate.icons) out.icons = STATE.icons || "";
        if (candidate.image_strategy) {
            out.image_strategy = comparableImageStrategy(STATE.image_strategy || {});
        }
        return JSON.stringify(out);
    }

    function activeDirectionAdjusted(candidate, index) {
        return designDirectionId(candidate, index) === ACTIVE_DIRECTION_ID &&
            directionStateSignature(candidate) !== ACTIVE_DIRECTION_BASELINE;
    }

    function customCandidateSpec(field) {
        var candidates = REC && REC.custom_candidates;
        var candidate = candidates && candidates[field];
        if (typeof candidate === "string") return { behavior: candidate };
        if (candidate && typeof candidate === "object") return candidate;
        var legacy = REC && REC[field + "_behavior"];
        if (legacy && typeof legacy === "object") legacy = legacy.value;
        return legacy ? { behavior: legacy } : {};
    }

    function customCandidateBehavior(field) {
        var candidate = customCandidateSpec(field);
        return String(localized(candidate, "behavior") || candidate.value || candidate.custom || "");
    }

    function creativeCustomOptions(field, stateKey, placeholderKey) {
        var candidate = customCandidateSpec(field);
        var current = String(STATE[stateKey] || customCandidateBehavior(field) || "");
        if (!current.trim()) return null;
        STATE[stateKey] = current;
        return {
            label: localized(candidate, "name") || t("ai_custom_candidate"),
            hint: t("ai_custom_candidate_hint"),
            getText: function () { return STATE[stateKey] || ""; },
            setText: function (value) { STATE[stateKey] = value; },
            rows: 4,
            placeholder: t(placeholderKey)
        };
    }

    function colorRecommendationCandidates() {
        var direct = (REC.color && REC.color.candidates) || [];
        if (direct.length) return direct;
        return designDirectionCandidates().map(function (candidate) {
            return candidate && candidate.color;
        }).filter(Boolean);
    }

    function typographyRecommendationCandidates() {
        var direct = (REC.typography && REC.typography.candidates) || [];
        if (direct.length) return direct;
        return designDirectionCandidates().map(function (candidate) {
            return candidate && candidate.typography;
        }).filter(Boolean);
    }

    function imageStrategySpec() {
        return (REC && REC.image_strategy) ||
            (REC && REC.images && REC.images.strategy) ||
            (REC && REC.images && REC.images.ai_strategy) ||
            {};
    }

    function imageStrategyCandidates() {
        var spec = imageStrategySpec();
        var direct = spec.candidates || spec.options || [];
        if (direct.length) return direct;
        return designDirectionCandidates().map(function (candidate) {
            return candidate && candidate.image_strategy;
        }).filter(Boolean);
    }

    function imageStrategyRecommendationCandidates() {
        return imageStrategyCandidates().filter(function (candidate) {
            return candidate && candidate.rendering !== "custom";
        }).slice(0, 3);
    }

    function imageStrategyCatalogCandidates() {
        var items = AI_IMAGE_COMPARISON && AI_IMAGE_COMPARISON.rendering;
        if (!Array.isArray(items)) return [];
        return items.map(function (item) {
            return item && item.id ? { rendering: item.id } : null;
        }).filter(Boolean);
    }

    function imageStrategySelectableCandidates() {
        var recommended = imageStrategyRecommendationCandidates();
        var seen = {};
        recommended.forEach(function (candidate) { seen[candidate.rendering] = true; });
        return recommended.concat(imageStrategyCatalogCandidates().filter(function (candidate) {
            return !seen[candidate.rendering];
        }));
    }

    function imageStrategyCustomCandidate() {
        var candidate = customCandidateSpec("image_strategy");
        if (!customCandidateBehavior("image_strategy")) return null;
        if (!candidate || typeof candidate !== "object") candidate = {};
        candidate = Object.assign({}, candidate, { rendering: "custom" });
        return normalizedImageStrategy(candidate);
    }

    function normalizedImageStrategy(candidate) {
        candidate = candidate || {};
        var out = {
            name: localized(candidate, "name") || candidate.name || "",
            rendering: candidate.rendering || "",
            visual: localized(candidate, "visual") || "",
            mood: localized(candidate, "mood") || ""
        };
        var behavior = localized(candidate, "behavior") || candidate.behavior || candidate.custom || "";
        if (behavior) out.behavior = behavior;
        return out;
    }

    function comparableImageStrategy(candidate) {
        var strategy = normalizedImageStrategy(candidate);
        return {
            rendering: strategy.rendering || "",
            visual: strategy.visual || "",
            mood: strategy.mood || "",
            behavior: strategy.behavior || ""
        };
    }

    function directionCardSummary(candidate) {
        candidate = candidate || {};
        var strategy = normalizedImageStrategy(candidate.image_strategy || {});
        return String(
            localized(candidate, "note") ||
            directionBehavior(candidate, "visual_style") ||
            directionBehavior(candidate, "mode") ||
            strategy.visual ||
            strategy.behavior ||
            ""
        );
    }

    function usesCustomImagePlanValue(value) {
        var ids = (CAT.image_usage || []).map(function (item) { return item.id; });
        if (Array.isArray(value)) return false;
        return value && ids.indexOf(value) === -1;
    }

    function customImagePlanHasAiSignal() {
        return imageStrategyRecommendationCandidates().length > 0 || !!recId("image_ai_path");
    }

    function needsGeneratedImagesForUsage(value) {
        if (Array.isArray(value)) return value.indexOf("ai") >= 0;
        return value === "ai" || (usesCustomImagePlanValue(value) && customImagePlanHasAiSignal());
    }

    function selectedImageUsageIds(value) {
        var validIds = (CAT.image_usage || []).map(function (item) { return item.id; });
        return normalizeRecIds("image_usage", value).filter(function (id) {
            return validIds.indexOf(id) >= 0;
        });
    }

    function imageUsageNotesRecommendation(rawUsage) {
        var notes = (REC && REC.image_notes && REC.image_notes.value) ||
            (REC && REC.image_notes) ||
            (REC && REC.images && REC.images.notes) ||
            "";
        if (!notes && usesCustomImagePlanValue(rawUsage)) notes = rawUsage;
        return typeof notes === "string" ? notes : "";
    }

    function defaultImageUsageId() {
        return firstId(CAT.image_usage);
    }

    function imageStrategySelectedIndex() {
        var spec = imageStrategySpec();
        var direct = spec.candidates || spec.options || [];
        var idx = direct.length ? Number(spec.selected || 0) : selectedDesignDirectionIndex();
        if (!isFinite(idx) || idx < 0) idx = 0;
        return Math.min(
            Math.floor(idx),
            Math.max(imageStrategyRecommendationCandidates().length - 1, 0)
        );
    }

    // ---- section renderers ----------------------------------------------
    function renderCanvas(host) {
        var sec = section(1, "sec_canvas");
        enumField(sec, CAT.canvas, recOrFirst("canvas", CAT.canvas),
            function () { return STATE.canvas; },
            function (v) {
                STATE.canvas = v;
                if (!STATE.typography) STATE.typography = { name: "", heading: {}, body: {} };
                // Canvas changes dimensions only — never silently rewrite font sizes
                // the user can see / edit. The size hint re-renders with the new
                // canvas; a default body is filled only when none is set yet.
                if (!STATE.typography.body_size) {
                    STATE.typography.body_size = defaultBodySizeForCanvas(v, STATE.delivery_purpose);
                }
                renderAll();
            }, { allowCustom: true });
        host.appendChild(sec);
    }

    function renderPages(host) {
        var sec = section(2, "sec_pages");
        textField(sec, function () { return STATE.page_count; },
            function (v) { STATE.page_count = v; }, "placeholder_pages", true);
        host.appendChild(sec);
    }

    function templateApplicationRecommendation() {
        if (!REC || REC.template_application == null) return null;
        var field = REC.template_application;
        if (typeof field === "object") {
            return field.value == null ? "" : String(field.value);
        }
        return String(field);
    }

    function renderTemplateApplication(host) {
        if (templateApplicationRecommendation() == null) return;
        var sec = section("T", "sec_template_application");
        setSectionNote(sec, t("template_application_hint"));
        textareaField(sec,
            function () { return STATE.template_application; },
            function (v) { STATE.template_application = v; },
            "placeholder_template_application", 4);
        host.appendChild(sec);
    }

    function renderCommunication(host) {
        var sec = section(1, "sec_communication");
        var audienceField = el("div", "subfield");
        audienceField.appendChild(el("div", "subfield-label", t("sec_audience")));
        textField(audienceField, function () { return STATE.audience; },
            function (v) { STATE.audience = v; }, "placeholder_audience", false);
        sec.appendChild(audienceField);
        labeledTextarea(sec, "communication_intent",
            function () { return STATE.communication_intent; },
            function (v) { STATE.communication_intent = v; },
            "placeholder_communication_intent", "communication_intent_hint", 3);
        labeledTextarea(sec, "audience_outcome",
            function () { return STATE.audience_outcome; },
            function (v) { STATE.audience_outcome = v; },
            "placeholder_audience_outcome", null, 2);
        labeledTextarea(sec, "core_message",
            function () { return STATE.core_message; },
            function (v) { STATE.core_message = v; },
            "placeholder_core_message", null, 2);
        host.appendChild(sec);
    }

    function renderDelivery(host) {
        var sec = section(2, "sec_delivery");
        labeledTextarea(sec, "delivery_context",
            function () { return STATE.delivery_context; },
            function (v) { STATE.delivery_context = v; },
            "placeholder_delivery_context", "delivery_context_hint", 2);
        labeledTextarea(sec, "artifact_afterlife",
            function () { return STATE.artifact_afterlife; },
            function (v) { STATE.artifact_afterlife = v; },
            "placeholder_artifact_afterlife", null, 2);
        // Material divergence remains open prose: it controls how source material
        // may be reshaped, independently of communication intent and template reuse.
        var divergenceField = labeledTextarea(sec, "sub_divergence",
            function () { return STATE.content_divergence; },
            function (v) { STATE.content_divergence = v; },
            "placeholder_divergence", null, 2);
        if (recommendationFieldLocked("content_divergence")) {
            var divergenceInput = divergenceField.querySelector("textarea");
            if (divergenceInput) {
                divergenceInput.readOnly = true;
                divergenceInput.classList.add("locked-field");
            }
            divergenceField.appendChild(el("div", "toggle-desc locked-field-hint", t("content_divergence_locked_hint")));
        }
        host.appendChild(sec);
    }

    function renderReadingMode(host) {
        if (!isPptCanvas(STATE.canvas)) return;
        var sec = section("D", "delivery_purpose");
        setSectionNote(sec, t("delivery_purpose_hint"));
        enumField(sec, CAT.delivery_purpose,
            recOrFirst("delivery_purpose", CAT.delivery_purpose),
            function () { return STATE.delivery_purpose; },
            function (v) {
                STATE.delivery_purpose = v;
                // Same-stage dependency, resolved entirely in the browser: do
                // not ask the backend to author Stage 2 again. Manual size
                // overrides remain authoritative.
                syncUnpinnedTypographySizes(true);
            });
        host.appendChild(sec);
    }

    function applyDesignDirection(candidate, index, shouldRender) {
        candidate = candidate || {};
        var directionId = designDirectionId(candidate, index);
        if (candidate.mode) {
            STATE.mode = candidate.mode;
            STATE.mode_behavior = candidate.mode === "custom" ?
                directionBehavior(candidate, "mode") : "";
            ACTIVE_COMPONENT_DIRECTION_IDS.mode = directionId;
        }
        if (candidate.visual_style) {
            STATE.visual_style = candidate.visual_style;
            STATE.visual_style_behavior = candidate.visual_style === "custom" ?
                directionBehavior(candidate, "visual_style") : "";
            ACTIVE_COMPONENT_DIRECTION_IDS.visual_style = directionId;
        }
        if (candidate.color) {
            STATE.color = {
                name: localized(candidate.color, "name") || candidate.color.name || "",
                palette: Object.assign({}, normPalette(candidate.color))
            };
        }
        if (candidate.typography) {
            var typography = normTypography(candidate.typography);
            resetTypographySizeOverrides();
            STATE.typography = typography;
            STATE.typography.name = localized(candidate.typography, "name") || typography.name || "";
            STATE.typography.body_size = typography.body_size ||
                defaultBodySizeForCanvas(STATE.canvas, STATE.delivery_purpose);
            STATE.typography.sizes = Object.assign({}, typography.sizes || {});
            syncUnpinnedTypographySizes(false);
        }
        if (candidate.icons) STATE.icons = normalizeRecId("icons", candidate.icons);
        if (candidate.image_strategy) {
            STATE.image_strategy = normalizedImageStrategy(candidate.image_strategy);
            ACTIVE_COMPONENT_DIRECTION_IDS.image_strategy = directionId;
        }
        ACTIVE_DIRECTION_ID = directionId;
        ACTIVE_DIRECTION_BASELINE = directionStateSignature(candidate);
        if (shouldRender !== false) renderAll();
    }

    function renderDesignDirections(host) {
        var candidates = designDirectionCandidates();
        if (!candidates.length) return;
        var sec = section("B", "sec_design_directions", t("design_directions_hint"));
        var grid = el("div", "font-grid design-direction-grid");
        var cardStates = [];
        var recommendedIndex = selectedDesignDirectionIndex();
        candidates.forEach(function (candidate, idx) {
            var card = el("div", "font-card design-direction-card");
            card.title = t("direction_apply_hint");
            var head = el("div", "font-card-head");
            head.appendChild(el("span", "font-card-name",
                localized(candidate, "name") || (t("option_prefix") + " " + (idx + 1))));
            if (idx === recommendedIndex) {
                head.appendChild(el("span", "rec-badge", "★ " + t("recommended")));
            }
            var status = el("span", "rec-badge direction-status");
            status.style.display = "none";
            head.appendChild(status);
            card.appendChild(head);
            var customVisual = candidate.visual_style === "custom";
            if (candidate.visual_style) {
                var preview = el("div", "design-direction-preview");
                if (customVisual) {
                    preview.classList.add("design-direction-custom-preview");
                    preview.appendChild(
                        el("div", "design-direction-custom-label", t("custom"))
                    );
                    preview.appendChild(el(
                        "div",
                        "design-direction-custom-copy",
                        directionCardSummary(candidate) || t("custom")
                    ));
                } else {
                    appendVisualStyleImage(preview, candidate.visual_style);
                }
                card.appendChild(preview);
            }
            var meta = [];
            if (candidate.mode && candidate.mode !== "custom") {
                meta.push(directionComponentValueLabel(candidate, "mode"));
            }
            if (candidate.visual_style && !customVisual) {
                meta.push(directionComponentValueLabel(candidate, "visual_style"));
            }
            var typographyName = candidate.typography &&
                (localized(candidate.typography, "name") || candidate.typography.name);
            if (typographyName) meta.push(typographyName);
            if (candidate.icons) meta.push(humanizeId(candidate.icons));
            if (candidate.image_strategy && candidate.image_strategy.rendering &&
                    candidate.image_strategy.rendering !== "custom") {
                meta.push(comparisonValueLabel("rendering", candidate.image_strategy.rendering));
            }
            if (meta.length) card.appendChild(el("div", "font-card-meta", meta.join(" · ")));
            var palette = normPalette(candidate.color || {});
            var swatches = el("div", "palette-swatches design-direction-swatches");
            PALETTE_ROLES.forEach(function (role) {
                var value = normHex(palette[role]);
                if (!value) return;
                var swatch = el("span", "swatch");
                swatch.style.background = value;
                swatch.title = role + ": " + value;
                swatches.appendChild(swatch);
            });
            if (swatches.childElementCount) card.appendChild(swatches);
            var note = localized(candidate, "note");
            if (note && !customVisual) card.appendChild(el("div", "color-note", note));
            var restore = el("button", "direction-reset-button", t("direction_restore"));
            restore.type = "button";
            restore.hidden = true;
            restore.addEventListener("click", function (event) {
                event.stopPropagation();
                applyDesignDirection(candidate, idx);
            });
            card.appendChild(restore);
            card.addEventListener("click", function () {
                if (designDirectionId(candidate, idx) === ACTIVE_DIRECTION_ID) return;
                applyDesignDirection(candidate, idx);
            });
            cardStates.push({
                candidate: candidate,
                index: idx,
                card: card,
                status: status,
                restore: restore
            });
            grid.appendChild(card);
        });
        refreshDesignDirectionState = function () {
            cardStates.forEach(function (entry) {
                var active = designDirectionId(entry.candidate, entry.index) === ACTIVE_DIRECTION_ID;
                var adjusted = active && activeDirectionAdjusted(entry.candidate, entry.index);
                entry.card.classList.toggle("selected", active && !adjusted);
                entry.card.classList.toggle("adjusted", adjusted);
                entry.status.style.display = active ? "inline-block" : "none";
                entry.status.textContent = adjusted ? t("direction_adjusted") : t("direction_active");
                entry.restore.hidden = !(active && adjusted);
                entry.card.title = active ? "" : t("direction_apply_hint");
            });
        };
        refreshDesignDirectionState();
        sec.appendChild(grid);
        host.appendChild(sec);
    }

    function directionComponentMatchesAuthored(candidate, field) {
        if (field === "mode") {
            return STATE.mode === candidate.mode &&
                (candidate.mode !== "custom" ||
                    String(STATE.mode_behavior || "") === directionBehavior(candidate, "mode"));
        }
        if (field === "visual_style") {
            return STATE.visual_style === candidate.visual_style &&
                (candidate.visual_style !== "custom" ||
                    String(STATE.visual_style_behavior || "") ===
                        directionBehavior(candidate, "visual_style"));
        }
        if (field === "image_strategy") {
            return JSON.stringify(comparableImageStrategy(STATE.image_strategy || {})) ===
                JSON.stringify(comparableImageStrategy(candidate.image_strategy || {}));
        }
        return false;
    }

    function directionComponentSelected(candidate, field, index) {
        var activeId = ACTIVE_COMPONENT_DIRECTION_IDS[field];
        if (activeId) return activeId === designDirectionId(candidate, index);
        return directionComponentMatchesAuthored(candidate, field);
    }

    function applyDirectionComponent(candidate, field, index) {
        if (field === "mode") {
            STATE.mode = candidate.mode;
            STATE.mode_behavior = candidate.mode === "custom" ?
                directionBehavior(candidate, "mode") : "";
        } else if (field === "visual_style") {
            STATE.visual_style = candidate.visual_style;
            STATE.visual_style_behavior = candidate.visual_style === "custom" ?
                directionBehavior(candidate, "visual_style") : "";
        } else if (field === "image_strategy") {
            STATE.image_strategy = normalizedImageStrategy(candidate.image_strategy || {});
        }
        ACTIVE_COMPONENT_DIRECTION_IDS[field] = designDirectionId(candidate, index);
        renderAll();
    }

    function directionComponentIsCustom(candidate, field) {
        if (field === "image_strategy") {
            return candidate && candidate.image_strategy &&
                candidate.image_strategy.rendering === "custom";
        }
        return candidate && candidate[field] === "custom";
    }

    function setDirectionComponentBehavior(field, value) {
        if (field === "mode") {
            STATE.mode = "custom";
            STATE.mode_behavior = value;
        } else if (field === "visual_style") {
            STATE.visual_style = "custom";
            STATE.visual_style_behavior = value;
        } else if (field === "image_strategy") {
            STATE.image_strategy = normalizedImageStrategy(STATE.image_strategy || {});
            STATE.image_strategy.rendering = "custom";
            STATE.image_strategy.behavior = value;
        }
    }

    function directionComponentValueLabel(candidate, field) {
        var value = candidate && candidate[field];
        if (field === "image_strategy") {
            value = value && value.rendering;
            return comparisonValueLabel("rendering", value);
        }
        var catalog = field === "mode" ? CAT.modes : CAT.visual_styles;
        var option = findCatalogOption(catalog, value);
        return option ? optionLabel(option) : (value === "custom" ? t("custom") : humanizeId(value));
    }

    function directionComponentNote(candidate, field) {
        if (field === "image_strategy") {
            var strategy = normalizedImageStrategy(candidate.image_strategy || {});
            return [strategy.visual, strategy.mood, strategy.behavior].filter(Boolean).join(" · ");
        }
        if (candidate[field] === "custom") return directionBehavior(candidate, field);
        return localized(candidate, "note") || "";
    }

    function directionComponentEditableBehavior(candidate, field) {
        if (field === "image_strategy") {
            return normalizedImageStrategy(candidate.image_strategy || {}).behavior || "";
        }
        return directionBehavior(candidate, field);
    }

    function renderDirectionComponentCandidates(parent, field) {
        var candidates = designDirectionCandidates().filter(function (candidate) {
            return candidate && candidate[field];
        });
        if (!candidates.length) return;
        var block = el("div", "subfield scheme-component-options");
        block.appendChild(el("div", "subfield-label", t("scheme_component_options")));
        var grid = el("div", "font-grid scheme-component-grid");
        var entries = [];
        candidates.forEach(function (candidate, index) {
            var card = el("div", "font-card scheme-component-card");
            card.dataset.candidateId = designDirectionId(candidate, index) + ":" + field;
            var head = el("div", "font-card-head");
            head.appendChild(el("span", "font-card-name",
                localized(candidate, "name") || (t("option_prefix") + " " + (index + 1))));
            head.appendChild(el("span", "font-card-meta",
                directionComponentValueLabel(candidate, field)));
            card.appendChild(head);
            if (field === "visual_style" && candidate.visual_style !== "custom") {
                var preview = el("div", "design-direction-preview");
                appendVisualStyleImage(preview, candidate.visual_style);
                card.appendChild(preview);
            }
            var note = directionComponentNote(candidate, field);
            var noteNode = note ? el("div", "color-note", note) : null;
            if (noteNode) card.appendChild(noteNode);
            var editor = null;
            if (directionComponentIsCustom(candidate, field)) {
                editor = el("textarea", "text-input scheme-component-editor");
                setNaturalInputDirection(editor);
                editor.rows = 4;
                editor.value = directionComponentEditableBehavior(candidate, field);
                editor.placeholder = t(field === "mode" ? "mode_behavior_placeholder" :
                    (field === "visual_style" ? "visual_style_behavior_placeholder" :
                        "image_strategy_custom_placeholder"));
                editor.style.display = "none";
                editor.addEventListener("click", function (event) {
                    event.stopPropagation();
                });
                editor.addEventListener("input", function () {
                    setDirectionComponentBehavior(field, editor.value);
                    if (field === "image_strategy") refreshImageStrategyPreview();
                    refreshDesignDirectionState();
                    refreshDirectionComponentStates();
                });
                card.appendChild(editor);
            }
            card.addEventListener("click", function () {
                applyDirectionComponent(candidate, field, index);
            });
            entries.push({
                candidate: candidate,
                index: index,
                card: card,
                note: noteNode,
                editor: editor
            });
            grid.appendChild(card);
        });
        var paint = function () {
            entries.forEach(function (entry) {
                var selected = directionComponentSelected(
                    entry.candidate, field, entry.index
                );
                var adjusted = selected &&
                    !directionComponentMatchesAuthored(entry.candidate, field);
                entry.card.classList.toggle("selected", selected);
                entry.card.classList.toggle("adjusted", adjusted);
                if (entry.editor) {
                    entry.editor.style.display = selected ? "block" : "none";
                    if (selected && document.activeElement !== entry.editor) {
                        var current = field === "mode" ? STATE.mode_behavior :
                            (field === "visual_style" ? STATE.visual_style_behavior :
                                ((STATE.image_strategy || {}).behavior || ""));
                        entry.editor.value = current;
                    }
                    if (selected) fitTextareaToContent(entry.editor);
                }
                if (entry.note) entry.note.style.display = selected ? "none" : "block";
            });
        };
        DIRECTION_COMPONENT_PAINTERS.push(paint);
        paint();
        block.appendChild(grid);
        parent.appendChild(block);
    }

    function currentDirectionCustomCandidate(field, stateKey) {
        if (STATE[field] !== "custom") return null;
        return designDirectionCandidates().filter(function (candidate) {
            return candidate && candidate[field] === "custom" &&
                directionBehavior(candidate, field) === String(STATE[stateKey] || "");
        })[0];
    }

    function renderCurrentDirectionCustomEditor(parent, field, stateKey, placeholderKey) {
        if (STATE[field] !== "custom") return null;
        if (ACTIVE_COMPONENT_DIRECTION_IDS[field]) return null;
        var source = currentDirectionCustomCandidate(field, stateKey);
        if (!source && customCandidateBehavior(field)) return null;
        var block = el("div", "subfield direction-custom-editor");
        var label = t("custom");
        if (source && localized(source, "name")) {
            label = localized(source, "name") + " · " + label;
        }
        block.appendChild(el("div", "subfield-label", label));
        var input = el("textarea", "text-input custom-input");
        setNaturalInputDirection(input);
        input.rows = 4;
        input.placeholder = t(placeholderKey);
        input.value = STATE[stateKey] || "";
        input.style.display = "block";
        input.addEventListener("input", function () {
            STATE[stateKey] = input.value;
            refreshDesignDirectionState();
            refreshDirectionComponentStates();
        });
        block.appendChild(input);
        parent.appendChild(block);
        return block;
    }

    function renderNarrativeDirection(host) {
        var sec = section(4, "sec_narrative");
        renderDirectionComponentCandidates(sec, "mode");
        var directionCustomEditor = null;
        var custom = currentDirectionCustomCandidate("mode", "mode_behavior") ? null :
            creativeCustomOptions("mode", "mode_behavior", "mode_behavior_placeholder");
        enumField(sec, CAT.modes, recOrFirst("mode", CAT.modes),
            function () { return STATE.mode; }, function (v) {
                STATE.mode = v;
                ACTIVE_COMPONENT_DIRECTION_IDS.mode = "";
                if (v !== "custom") STATE.mode_behavior = "";
                refreshDesignDirectionState();
                refreshDirectionComponentStates();
                if (directionCustomEditor) {
                    directionCustomEditor.style.display = v === "custom" ? "block" : "none";
                }
            },
            {
                allowCustom: !!custom,
                customOnOwnRow: true,
                customSentinel: "custom",
                preserveCustom: true,
                placeholder: t("mode_behavior_placeholder"),
                aiCustom: custom
            });
        directionCustomEditor = renderCurrentDirectionCustomEditor(
            sec, "mode", "mode_behavior", "mode_behavior_placeholder"
        );
        host.appendChild(sec);
    }

    function renderVisualDirection(host) {
        var sec = section(5, "sec_visual");
        renderDirectionComponentCandidates(sec, "visual_style");
        var directionCustomEditor = null;
        var custom = currentDirectionCustomCandidate(
            "visual_style", "visual_style_behavior"
        ) ? null : creativeCustomOptions(
                "visual_style", "visual_style_behavior", "visual_style_behavior_placeholder"
        );
        enumField(sec, CAT.visual_styles, recOrFirst("visual_style", CAT.visual_styles),
            function () { return STATE.visual_style; }, function (v) {
                STATE.visual_style = v;
                ACTIVE_COMPONENT_DIRECTION_IDS.visual_style = "";
                if (v !== "custom") STATE.visual_style_behavior = "";
                refreshDesignDirectionState();
                refreshDirectionComponentStates();
                if (directionCustomEditor) {
                    directionCustomEditor.style.display = v === "custom" ? "block" : "none";
                }
            },
            {
                allowCustom: !!custom,
                customOnOwnRow: true,
                customSentinel: "custom",
                preserveCustom: true,
                placeholder: t("visual_style_behavior_placeholder"),
                aiCustom: custom,
                preview: "visual_style",
                chipsClass: "visual-style-grid"
            });
        directionCustomEditor = renderCurrentDirectionCustomEditor(
            sec, "visual_style", "visual_style_behavior",
            "visual_style_behavior_placeholder"
        );
        host.appendChild(sec);
    }

    var PALETTE_ROLES = [
        "background",
        "secondary_bg",
        "primary",
        "accent",
        "secondary_accent",
        "body_text"
    ];

    function normHex(val) {
        var v = (val || "").trim();
        if (!/^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(v)) return null;
        return v.charAt(0) === "#" ? v : "#" + v;
    }
    function hexOr(val, fallback) {
        return normHex(val) || fallback;
    }
    // Replaced when the combined color+typography preview mounts; the color and
    // typography sections call it after every change so the preview stays live.
    var refreshStylePreview = function () {};
    // Replaced when the selected generated-image preview mounts.
    var refreshImageStrategyPreview = function () {};
    // Replaced when the final plan's image-production section mounts; image-use
    // edits call it so the conditional AI path stays synchronized on the page.
    var refreshImageProduction = function () {};
    // Replaced when the Design Spec depth section mounts; generation/refinement
    // edits call it so the forced-complete coupling stays synchronized.
    var refreshDesignSpecDepth = function () {};
    // Replaced when the typography section mounts; the canvas section calls it so
    // the body-size hint tracks the chosen canvas dimensions.
    var refreshBodySizeHint = function () {};
    // Replaced when the typography section mounts; body-size / reading-mode
    // changes call it so unpinned per-role values update locally.
    var refreshSizeInputs = function () {};

    // Per-role size slots the user can edit directly (parallel to color roles).
    // Defaults derive from `body` via mid-band ramp ratios (strategist.md §g);
    // values are px (the system's only unit).
    var SIZE_ROLES = ["title", "subtitle", "annotation"];
    var SIZE_RATIO = { title: 1.75, subtitle: 1.35, annotation: 0.78 };
    var TYPOGRAPHY_SIZE_OVERRIDES = {
        body: false,
        title: false,
        subtitle: false,
        annotation: false
    };

    function resetTypographySizeOverrides() {
        Object.keys(TYPOGRAPHY_SIZE_OVERRIDES).forEach(function (role) {
            TYPOGRAPHY_SIZE_OVERRIDES[role] = false;
        });
    }

    function deriveSize(role, bodyVal) {
        var raw = (bodyVal || 0) * (SIZE_RATIO[role] || 1);
        // All px. On PPT, snap the recommended role size to a clean even number so
        // the user sees conventional sizes (body 24 → title 42, subtitle 32), not
        // ratio leftovers. Non-PPT keeps a plain integer — large px, snapping moot.
        if (isPptCanvas(STATE.canvas)) return Math.round(raw / 2) * 2;
        return Math.round(raw);
    }

    // Canvas dimensions (viewBox user units) parsed from a catalog `dim` like
    // "1242×1660" or from a custom canvas string containing WxH; null if unknown.
    function canvasDimensions(canvasVal) {
        var dim = null;
        (CAT.canvas || []).forEach(function (o) { if (o.id === canvasVal) dim = o.dim; });
        var m = String(dim || canvasVal || "").match(/(\d{2,5})\s*[×xX*]\s*(\d{2,5})/);
        return m ? { width: parseInt(m[1], 10), height: parseInt(m[2], 10) } : null;
    }

    // PPT canvases (16:9 / 4:3) take the fixed per-reading-mode body px;
    // other canvases use the canvas-owned effective-span rule below.
    function isPptCanvas(canvasVal) {
        var id = String(canvasVal || "").toLowerCase();
        return id === "ppt169" || id === "ppt43";
    }

    // Body baseline in **px** per reading mode (legacy key:
    // delivery_purpose). The system is px-only — these mirror the registered-PPT
    // values in references/canvas-formats.md. No pt layer, no conversion. `def` is the fixed
    // recommendation; lo/hi are a sanity envelope for the out-of-range flag only.
    function deliveryBodyPx(purposeId) {
        if (purposeId === "text") return { lo: 18, hi: 21, def: 20 };
        if (purposeId === "presentation") return { lo: 28, hi: 32, def: 32 };
        return { lo: 22, hi: 25, def: 24 }; // balanced — the default
    }

    // Mirrors references/canvas-formats.md § "Typography Scale Start". The
    // 3× short-side cap keeps extreme aspect ratios from inflating the scale;
    // lo/hi remain advisory and def is the initial anchor, never a hard floor.
    function bodySizeBandForCanvas(canvasVal, purposeId) {
        if (isPptCanvas(canvasVal)) return deliveryBodyPx(purposeId);
        var dims = canvasDimensions(canvasVal);
        if (!dims) return { lo: 32, hi: 48, def: 40 }; // legacy invalid-custom fallback
        var shortSide = Math.min(dims.width, dims.height);
        var longSide = Math.max(dims.width, dims.height);
        var span = Math.min(longSide, 3 * shortSide);
        return {
            lo: Math.round(span * 0.025),
            hi: Math.round(span * 0.033),
            def: Math.round(span * 0.029)
        };
    }

    function defaultBodySizeForCanvas(canvasVal, purposeId) {
        return bodySizeBandForCanvas(canvasVal, purposeId).def;
    }

    // Resolve the only deterministic same-stage size dependency locally. The
    // backend authors Stage 2 once; changing reading mode or body size updates
    // only unpinned values already visible in this page.
    function syncUnpinnedTypographySizes(resetBodyFromReadingMode) {
        if (!STATE.typography) STATE.typography = { name: "", heading: {}, body: {} };
        if (!STATE.typography.sizes) STATE.typography.sizes = {};
        if (resetBodyFromReadingMode && !TYPOGRAPHY_SIZE_OVERRIDES.body) {
            STATE.typography.body_size = defaultBodySizeForCanvas(
                STATE.canvas, STATE.delivery_purpose
            );
        }
        var body = parseFloat(STATE.typography.body_size);
        if (!isFinite(body)) {
            body = defaultBodySizeForCanvas(STATE.canvas, STATE.delivery_purpose);
        }
        SIZE_ROLES.forEach(function (role) {
            if (!TYPOGRAPHY_SIZE_OVERRIDES[role]) {
                STATE.typography.sizes[role] = deriveSize(role, body);
            }
        });
        refreshSizeInputs();
        refreshBodySizeHint();
        refreshStylePreview();
    }

    function roundSize(value) {
        return Math.round(value * 100) / 100;
    }

    function formatPtFromPx(value) {
        var px = parseFloat(value);
        if (!isFinite(px)) return "";
        var pt = Math.round(px * 0.75 * 10) / 10;
        return pt % 1 === 0 ? String(Math.round(pt)) : String(pt);
    }

    function normalizeTypographyForSubmit(payload) {
        if (!payload.typography || typeof payload.typography !== "object") return;
        var typ = normTypography(payload.typography);
        payload.typography = typ;
        if (isEnglishProject()) {
            ["heading", "body"].forEach(function (role) {
                delete typ[role].english;
                delete typ[role].sample_english;
            });
        }
        var body = parseFloat(typ.body_size);
        if (!isFinite(body)) {
            // Cleared / invalid body field — fall back so role sizes never submit
            // against an empty anchor.
            body = defaultBodySizeForCanvas(payload.canvas, payload.delivery_purpose);
        }
        // px is the only unit — round and submit as-is. No pt conversion, no
        // body_size_pt / sizes_pt provenance (the system never carries pt).
        typ.body_size = roundSize(body);
        typ.body_size_unit = "px";
        if (typ.sizes && typeof typ.sizes === "object") {
            Object.keys(typ.sizes).forEach(function (role) {
                var raw = parseFloat(typ.sizes[role]);
                if (isFinite(raw)) typ.sizes[role] = roundSize(raw);
            });
        }
        if (typographyFamiliesComplete(typ)) delete typ.custom;
        // delivery_purpose is PPT-only; drop it on non-PPT canvases where it has
        // no meaning and was never shown.
        if (!isPptCanvas(payload.canvas)) delete payload.delivery_purpose;
    }

    function renderColor(host) {
        var cands = colorRecommendationCandidates();
        var sec = section(5, "sec_color");
        var grid = el("div", "color-grid");
        var hexInputs = {};
        var hexSwatches = {};
        var cardSwatchRefs = [];   // idx -> {role: swatchEl}, for live override feedback
        var selectedIdx = -1;

        function paintSwatch(elem, val) {
            var n = normHex(val);
            elem.style.background = n || "transparent";
            elem.classList.toggle("hex-swatch-empty", !n);
        }
        function applyHexInputs(pal) {
            PALETTE_ROLES.forEach(function (role) {
                if (hexInputs[role]) hexInputs[role].value = pal[role] || "";
                if (hexSwatches[role]) paintSwatch(hexSwatches[role], pal[role]);
            });
        }
        var customInput = el("textarea", "text-input custom-color-input");
        setNaturalInputDirection(customInput);
        customInput.rows = 2;
        customInput.placeholder = t("custom_color_placeholder");
        customInput.style.display = "none";

        function selectCard(idx) {
            var c = cands[idx] || {};
            selectedIdx = idx;
            STATE.color = {
                name: localized(c, "name") || c.name || "",
                palette: Object.assign({}, normPalette(c))
            };
            grid.querySelectorAll(".color-card").forEach(function (card, i) { card.classList.toggle("selected", i === idx); });
            customInput.style.display = "none";
            applyHexInputs(STATE.color.palette);
            refreshStylePreview();
        }

        function selectCustomColor() {
            selectedIdx = -1;
            STATE.color = { name: "custom", custom: customInput.value || "", palette: {} };
            grid.querySelectorAll(".color-card").forEach(function (card) { card.classList.remove("selected"); });
            customCard.classList.add("selected");
            customInput.style.display = "block";
            customInput.focus();
            refreshStylePreview();
        }

        cands.forEach(function (c, idx) {
            var pal = normPalette(c);
            var refs = {};
            var card = el("div", "color-card");
            var sw = el("div", "swatches");
            PALETTE_ROLES.forEach(function (role) {
                if (!pal[role]) return;
                var col = el("div", "swatch-col");
                var s = el("div", "swatch"); s.style.background = pal[role];
                refs[role] = s;
                col.appendChild(s);
                col.appendChild(el("div", "swatch-role", t("role_" + role)));
                col.appendChild(el("div", "color-hex", normHex(pal[role]) || pal[role]));
                sw.appendChild(col);
            });
            cardSwatchRefs[idx] = refs;
            card.appendChild(sw);
            card.appendChild(el("div", "color-name", localized(c, "name") || (t("option_prefix") + " " + (idx + 1))));
            if (localized(c, "note")) card.appendChild(el("div", "color-note", localized(c, "note")));
            card.addEventListener("click", function () { selectCard(idx); });
            grid.appendChild(card);
        });
        var customCard = el("div", "color-card color-card-custom");
        customCard.appendChild(el("div", "color-name", t("custom_color")));
        customCard.addEventListener("click", selectCustomColor);
        grid.appendChild(customCard);
        sec.appendChild(grid);
        customInput.addEventListener("input", function () {
            if (!STATE.color || STATE.color.name !== "custom") selectCustomColor();
            STATE.color.custom = customInput.value;
            refreshStylePreview();
        });
        sec.appendChild(customInput);

        var override = el("div", "hex-override");
        override.appendChild(el("div", "subfield-label", t("hex_override")));
        var row = el("div", "hex-row");
        PALETTE_ROLES.forEach(function (role) {
            var wrap = el("div", "hex-cell");
            wrap.appendChild(el("div", "hex-cell-label", t("role_" + role)));
            var line = el("div", "hex-input-line");
            var sw = el("div", "hex-swatch hex-swatch-empty");
            var inp = document.createElement("input");
            inp.type = "text"; inp.placeholder = "#";
            inp.addEventListener("input", function () {
                if (!STATE.color) STATE.color = { name: "custom", palette: {} };
                if (!STATE.color.palette) STATE.color.palette = {};
                STATE.color.palette[role] = inp.value;
                paintSwatch(sw, inp.value);
                // Reflect a valid override straight onto the selected card so the
                // user sees the change in context, not just in the input row.
                var n = normHex(inp.value);
                if (n && selectedIdx >= 0 && cardSwatchRefs[selectedIdx] && cardSwatchRefs[selectedIdx][role]) {
                    cardSwatchRefs[selectedIdx][role].style.background = n;
                }
                refreshStylePreview();
            });
            hexInputs[role] = inp; hexSwatches[role] = sw;
            line.appendChild(sw); line.appendChild(inp);
            wrap.appendChild(line); row.appendChild(wrap);
        });
        override.appendChild(row);
        sec.appendChild(override);
        host.appendChild(sec);

        var selIdx = -1;
        if (STATE.color && STATE.color.name && STATE.color.name !== "custom") {
            cands.forEach(function (c, i) {
                if ((localized(c, "name") || c.name) === STATE.color.name) selIdx = i;
            });
        }
        if (STATE.color && STATE.color.name === "custom") {
            customInput.value = STATE.color.custom || "";
            selectCustomColor();
        } else if (selIdx >= 0) {
            selectCard(selIdx);
        } else {
            applyHexInputs((STATE.color && STATE.color.palette) || {});
        }
    }

    function renderIcons(host) {
        var sec = section(6, "sec_icons");
        enumField(sec, CAT.icons, recOrFirst("icons", CAT.icons),
            function () { return STATE.icons; }, function (v) { STATE.icons = v; refreshStylePreview(); },
            { allowCustom: true, customOnOwnRow: true, ownRowIds: ["none"] });
        host.appendChild(sec);
    }

    function previewFontStack(primary, fallback) {
        if (!primary) return fallback || "";
        if (!fallback) return primary;
        return primary + ", " + fallback;
    }

    function typographyFamiliesComplete(typography) {
        typography = normTypography(typography || {});
        return ["heading", "body"].every(function (role) {
            var font = typography[role] || {};
            var fields = isEnglishProject() ? ["primary", "css"] :
                ["primary", "english", "css"];
            return fields.every(function (field) {
                return !!String(font[field] || "").trim();
            });
        });
    }

    function sampleText(role, field) {
        // Keep comparison copy stable: choices change visual treatment, not content.
        var useEnglish = field === "english" || isEnglishProject();
        if (role === "heading") {
            return t(useEnglish ? "preview_latin_title" : "preview_big_title");
        }
        return t(useEnglish ? "preview_latin_body" : "preview_body_intro");
    }

    function fontSample(box, slot, css, role) {
        var line = el("div", "font-sample-line");
        var primary = el("span", "fs-primary", sampleText(role, "primary"));
        setUiLanguageAttributes(primary);
        var primaryStack = previewFontStack(slot.primary, css);
        if (primaryStack) primary.style.fontFamily = primaryStack;
        if (primaryStack) primary.title = primaryStack;
        line.appendChild(primary);
        if (!isEnglishProject()) {
            var english = el("span", "fs-english", sampleText(role, "english"));
            setEnglishLanguageAttributes(english);
            var englishStack = previewFontStack(slot.english, css);
            if (englishStack) english.style.fontFamily = englishStack;
            if (englishStack) english.title = englishStack;
            line.appendChild(english);
        }
        box.appendChild(line);
    }

    function fontChoiceLabel(font) {
        var label = localized(font, "label") || font.id;
        if (String(label).toLowerCase() === String(font.id).toLowerCase()) {
            return String(font.id);
        }
        return label + " · " + font.id;
    }

    function typographyFieldLabel(field) {
        if (field === "english") return t("english_font");
        return t("primary_language_font");
    }

    function typographyChoiceConfigs() {
        var configs = [];
        ["heading", "body"].forEach(function (role) {
            configs.push([role, "primary"]);
            if (!isEnglishProject()) configs.push([role, "english"]);
        });
        return configs;
    }

    function typographySignature(typography) {
        typography = normTypography(typography || {});
        var fields = isEnglishProject() ? ["primary"] : ["primary", "english"];
        var values = [];
        ["heading", "body"].forEach(function (role) {
            fields.forEach(function (field) {
                values.push(String((typography[role] || {})[field] || "")
                    .trim().toLowerCase());
            });
        });
        return values.join("\u0000");
    }

    function renderTypography(host) {
        var cands = typographyRecommendationCandidates().filter(typographyFamiliesComplete);
        var sec = section(7, "sec_type");
        var grid = el("div", "font-grid");
        var customFields = el("div", "custom-typography-fields font-picker-fields");
        var customInputs = {};
        var customLegacyNote = el("div", "toggle-desc custom-typography-legacy");
        var pickerHead = el("div", "font-picker-head");
        pickerHead.appendChild(el("span", "subfield-label", t("font_selection")));
        var customStatus = el("span", "font-custom-status", t("customized"));
        pickerHead.appendChild(customStatus);
        customFields.appendChild(pickerHead);
        customFields.appendChild(el("div", "toggle-desc font-picker-hint", t("font_picker_hint")));
        customFields.appendChild(customLegacyNote);

        function syncCustomInputs() {
            var typography = STATE.typography || {};
            customLegacyNote.textContent = String(typography.custom || "").trim();
            customLegacyNote.style.display = customLegacyNote.textContent ? "block" : "none";
            customStatus.style.display = typography.name === "custom" ? "inline-flex" : "none";
            typographyChoiceConfigs().forEach(function (config) {
                var role = config[0], field = config[1];
                var control = customInputs[role + "_" + field];
                if (!control) return;
                var value = String((typography[role] || {})[field] || "");
                var matchingFont = control.options.filter(function (font) {
                    return String(font.id).toLowerCase() === value.toLowerCase();
                })[0];
                control.select.value = matchingFont ? matchingFont.id : "__other__";
                control.other.value = matchingFont ? "" : value;
                control.other.style.display = matchingFont ? "none" : "block";
            });
        }

        function markCustomTypography() {
            if (!STATE.typography) {
                STATE.typography = { name: "custom", heading: {}, body: {} };
            }
            STATE.typography.name = "custom";
            grid.querySelectorAll(".font-card").forEach(function (card) {
                card.classList.remove("selected");
            });
            customCard.classList.add("selected");
            customStatus.style.display = "inline-flex";
        }

        function updateRoleCss(role) {
            if (!STATE.typography[role]) STATE.typography[role] = {};
            STATE.typography[role].css = derivedFontCss(STATE.typography[role]);
        }

        function selectFont(idx) {
            var c = normTypography(cands[idx] || {});
            var prev = STATE.typography || {};
            STATE.typography = {
                name: localized(c, "name") || c.name || "",
                heading: c.heading || {},
                body: c.body || {},
                // Font cards choose family and character. Reading mode and
                // explicit size inputs own the sizing state.
                body_size: prev.body_size ||
                    defaultBodySizeForCanvas(STATE.canvas, STATE.delivery_purpose),
                sizes: Object.assign({}, prev.sizes || {})
            };
            if (sizeInput) sizeInput.value = STATE.typography.body_size || "";
            grid.querySelectorAll(".font-card").forEach(function (card, i) { card.classList.toggle("selected", i === idx); });
            syncCustomInputs();
            refreshSizeInputs();   // fill any role with no value yet; never overwrites existing values
            refreshStylePreview();
        }

        function selectCustomTypography() {
            var prev = STATE.typography || {};
            STATE.typography = normTypography(prev);
            STATE.typography.name = "custom";
            STATE.typography.body_size = prev.body_size || "";
            // Switching font family must not drop any explicit size.
            STATE.typography.sizes = Object.assign({}, prev.sizes || {});
            markCustomTypography();
            syncCustomInputs();
            var firstControl = customInputs.heading_primary;
            if (firstControl) firstControl.select.focus();
            refreshSizeInputs();
            refreshStylePreview();
        }

        cands.forEach(function (c, idx) {
            c = normTypography(c);
            var head = c.heading || {}, body = c.body || {};
            var card = el("div", "font-card");
            var top = el("div", "font-card-head");
            top.appendChild(el("span", "font-card-name", localized(c, "name") || (t("option_prefix") + " " + (idx + 1))));
            var metaFields = isEnglishProject() ? ["primary"] : ["primary", "english"];
            var meta = ["heading", "body"].map(function (role) {
                var slot = role === "heading" ? head : body;
                return t("font_" + role) + " " + metaFields.map(function (field) {
                    return typographyFieldLabel(field) + ": " + (slot[field] || "—");
                }).join(" / ");
            }).join("  ·  ");
            top.appendChild(el("span", "font-card-meta", meta));
            card.appendChild(top);
            var hbox = el("div", "font-sample-heading-box"); fontSample(hbox, head, head.css, "heading"); card.appendChild(hbox);
            var bbox = el("div", "font-sample-body-box"); fontSample(bbox, body, body.css, "body"); card.appendChild(bbox);
            if (localized(c, "note")) card.appendChild(el("div", "color-note", localized(c, "note")));
            card.addEventListener("click", function () { selectFont(idx); });
            grid.appendChild(card);
        });
        var customCard = el("div", "font-card font-card-custom");
        customCard.appendChild(el("div", "font-card-name", t("custom_typography")));
        customCard.addEventListener("click", selectCustomTypography);
        grid.appendChild(customCard);
        sec.appendChild(grid);
        typographyChoiceConfigs().forEach(function (config) {
            var role = config[0], fieldName = config[1];
            var field = el("label", "custom-typography-field");
            field.appendChild(el("span", "hex-cell-label",
                t("font_" + role) + " · " + typographyFieldLabel(fieldName)));
            var options = fontCatalogEntries(fieldName);
            var select = el("select", "font-select");
            options.forEach(function (font) {
                var option = document.createElement("option");
                option.value = font.id;
                option.textContent = fontChoiceLabel(font);
                select.appendChild(option);
            });
            var otherOption = document.createElement("option");
            otherOption.value = "__other__";
            otherOption.textContent = t("other_installed_font");
            select.appendChild(otherOption);
            var input = el("input", "text-input other-font-input");
            input.type = "text";
            input.placeholder = t("other_font_placeholder");
            select.addEventListener("change", function () {
                markCustomTypography();
                if (!STATE.typography[role]) {
                    STATE.typography[role] = { css: "sans-serif" };
                }
                if (select.value === "__other__") {
                    input.value = "";
                    input.style.display = "block";
                    STATE.typography[role][fieldName] = "";
                    input.focus();
                } else {
                    input.value = "";
                    input.style.display = "none";
                    STATE.typography[role][fieldName] = select.value;
                }
                updateRoleCss(role);
                refreshStylePreview();
            });
            input.addEventListener("input", function () {
                markCustomTypography();
                if (!STATE.typography[role]) {
                    STATE.typography[role] = { css: "sans-serif" };
                }
                STATE.typography[role][fieldName] = input.value;
                updateRoleCss(role);
                refreshStylePreview();
            });
            customInputs[role + "_" + fieldName] = {
                select: select,
                other: input,
                options: options
            };
            field.appendChild(select);
            field.appendChild(input);
            customFields.appendChild(field);
        });
        sec.appendChild(customFields);

        var sizeField = el("div", "subfield");
        sizeField.appendChild(el("div", "subfield-label", t("font_body_size")));
        sizeField.appendChild(el("div", "toggle-desc body-size-relation", t("body_size_unit_relation")));
        var sizeRow = el("div", "font-size-row");
        var sizeInput = el("input", "num-input font-size-input");
        sizeInput.type = "number";
        sizeInput.min = "8";
        sizeInput.max = "256";
        sizeInput.step = "1";
        sizeInput.value = (STATE.typography && STATE.typography.body_size) || "";
        sizeInput.placeholder = isPptCanvas(STATE.canvas)
            ? "20 / 24 / 32"
            : String(bodySizeBandForCanvas(STATE.canvas, STATE.delivery_purpose).def);
        sizeInput.addEventListener("input", function () {
            if (!STATE.typography) STATE.typography = { name: "", heading: {}, body: {} };
            STATE.typography.body_size = sizeInput.value;
            TYPOGRAPHY_SIZE_OVERRIDES.body = sizeInput.value !== "";
            // Body is an explicit local anchor. Recompute only role values the
            // user has not edited; no request leaves the browser.
            syncUnpinnedTypographySizes(false);
        });
        sizeRow.appendChild(sizeInput);
        sizeRow.appendChild(el("span", "font-size-unit", "px"));
        var sizePtHint = el("div", "toggle-desc body-size-pt");
        var sizeHint = el("div", "toggle-desc body-size-hint");
        // PPT body is one fixed px value per reading mode (not a range); non-PPT
        // canvases use the canvas-owned effective span. A manually pinned value is never
        // overwritten by later reading-mode changes.
        // Everything is px — lo/hi are only a sanity envelope for the OOR flag.
        refreshBodySizeHint = function () {
            var txt = t("font_body_size_hint");
            var sep = isCjkUi() ? "" : " ";
            var lo, hi;
            if (isPptCanvas(STATE.canvas)) {
                var pb = deliveryBodyPx(STATE.delivery_purpose);
                lo = pb.lo; hi = pb.hi;
                txt += sep + t("body_size_hint_purpose").replace("{def}", pb.def);
            } else {
                var band = bodySizeBandForCanvas(STATE.canvas, STATE.delivery_purpose);
                lo = band.lo; hi = band.hi;
                txt += sep + t("body_size_hint_canvas")
                    .replace("{lo}", lo).replace("{hi}", hi);
            }
            // Flag (hint only) a value far outside the
            // canvas's usual px range, so an accidental extreme value is visible
            // instead of silently submitting it.
            var cur = parseFloat(STATE.typography && STATE.typography.body_size);
            sizePtHint.textContent = isFinite(cur)
                ? t("body_size_pt_hint").replace("{pt}", formatPtFromPx(cur))
                : "";
            if (isFinite(cur) && isFinite(lo) && isFinite(hi) && (cur < lo || cur > hi)) {
                txt += sep + t("body_size_hint_oor");
            }
            sizeHint.textContent = txt;
        };
        refreshBodySizeHint();
        sizeField.appendChild(sizeRow);
        sizeField.appendChild(sizePtHint);
        sizeField.appendChild(sizeHint);

        // Reading mode and typography are both confirmed in Stage 2. Its
        // compatibility key remains delivery_purpose; the dependency is a local
        // deterministic update, not a second Stage-2 recommendation.
        sec.appendChild(sizeField);

        // Per-role size override (parallel to color's per-role HEX override): the
        // ramp derives title / subtitle / annotation from body, but the user may
        // set each explicitly. Values are px (the system's only unit).
        var sizeOverride = el("div", "hex-override");
        sizeOverride.appendChild(el("div", "subfield-label", t("size_override")));
        var srow = el("div", "hex-row");
        var sizeInputs = {};
        var sizePtHints = {};
        function refreshRolePtHint(role) {
            var input = sizeInputs[role];
            var hint = sizePtHints[role];
            if (!input || !hint) return;
            var pt = formatPtFromPx(input.value);
            hint.textContent = pt ? t("role_size_pt_hint").replace("{pt}", pt) : "";
        }
        SIZE_ROLES.forEach(function (role) {
            var wrap = el("div", "hex-cell");
            wrap.appendChild(el("div", "hex-cell-label", t("size_role_" + role)));
            var inputLine = el("div", "role-size-line");
            var inp = document.createElement("input");
            inp.type = "number"; inp.min = "6"; inp.max = "512"; inp.step = "1";
            inp.addEventListener("input", function () {
                if (!STATE.typography) STATE.typography = { name: "", heading: {}, body: {} };
                if (!STATE.typography.sizes) STATE.typography.sizes = {};
                STATE.typography.sizes[role] = inp.value;
                TYPOGRAPHY_SIZE_OVERRIDES[role] = true;
                refreshRolePtHint(role);
                refreshStylePreview();
            });
            sizeInputs[role] = inp;
            inputLine.appendChild(inp);
            inputLine.appendChild(el("span", "font-size-unit", "px"));
            wrap.appendChild(inputLine);
            sizePtHints[role] = el("div", "role-size-pt");
            wrap.appendChild(sizePtHints[role]);
            srow.appendChild(wrap);
        });
        sizeOverride.appendChild(srow);
        sec.appendChild(sizeOverride);

        // Reflect state into the controls. Derivation itself happens only through
        // syncUnpinnedTypographySizes(); a re-render preserves the visible state.
        refreshSizeInputs = function () {
            if (!STATE.typography) STATE.typography = { name: "", heading: {}, body: {} };
            if (!STATE.typography.sizes) STATE.typography.sizes = {};
            sizeInput.value = STATE.typography.body_size || "";
            var bodyVal = parseFloat(STATE.typography.body_size) ||
                defaultBodySizeForCanvas(STATE.canvas, STATE.delivery_purpose);
            SIZE_ROLES.forEach(function (role) {
                var cur = STATE.typography.sizes[role];
                var hasVal = cur !== undefined && cur !== null && cur !== "";
                if (!hasVal) STATE.typography.sizes[role] = deriveSize(role, bodyVal);
                if (sizeInputs[role]) sizeInputs[role].value = STATE.typography.sizes[role];
                refreshRolePtHint(role);
            });
        };
        refreshSizeInputs();

        host.appendChild(sec);

        var nameMatch = -1;
        var signatureMatch = -1;
        var stateSignature = typographySignature(STATE.typography || {});
        if (STATE.typography && STATE.typography.name !== "custom") cands.forEach(function (c, i) {
            var sameName = [localized(c, "name"), c.name_zh, c.name_zh_tw, c.name_en, c.name_ja]
                .some(function (name) { return name === STATE.typography.name; });
            if (!sameName && c.name && typeof c.name === "object") {
                sameName = Object.keys(c.name).some(function (key) {
                    return c.name[key] === STATE.typography.name;
                });
            }
            if (sameName && nameMatch < 0) nameMatch = i;
            if (typographySignature(c) === stateSignature && signatureMatch < 0) signatureMatch = i;
        });
        // Names preserve the selected candidate when several recommendations share
        // one font stack. Signature matching is only a first-match legacy fallback.
        var selIdx = nameMatch >= 0 ? nameMatch : signatureMatch;
        if (selIdx >= 0) selectFont(selIdx);
        else if (STATE.typography && STATE.typography.name === "custom") {
            ["heading", "body"].forEach(function (role) {
                if (!STATE.typography[role]) STATE.typography[role] = {};
                if (!STATE.typography[role].css) updateRoleCss(role);
            });
            customCard.classList.add("selected");
            syncCustomInputs();
        } else {
            syncCustomInputs();
        }
    }

    // Combined color + typography + icon preview — not a separate confirmation, just a
    // live "overall impression" of the style choices made above. Kept
    // deliberately abstract (a style chip, not a slide layout); page layout
    // preview is the live-preview server's job (Step 6).
    function renderStylePreview(host) {
        var wrap = el("div", "style-preview");
        var label = el("div", "style-preview-label");
        label.appendChild(el("span", "spl-title", t("style_preview_label")));
        // The "rough feel, not a slide layout" caveat sits in the label in the
        // UI font — never rendered in the candidate's body font, so it cannot
        // pose as sample content.
        label.appendChild(el("span", "spl-note", t("style_preview_body")));
        wrap.appendChild(label);
        var card = el("div", "style-preview-card");
        var textcol = el("div", "sp-textcol");
        var title = el("div", "sp-title");
        var titlePrimary = el("span", "sp-title-primary");
        var titleEnglish = el("span", "sp-title-english");
        title.appendChild(titlePrimary); title.appendChild(titleEnglish);
        var bodyRow = el("div", "sp-body");
        var accentBar = el("span", "sp-accent-bar");
        var bodyWrap = el("div", "sp-body-wrap");
        var bodyPrimary = el("span", "sp-body-primary");
        var bodyEnglish = el("span", "sp-body-english");
        setEnglishLanguageAttributes(titleEnglish);
        setEnglishLanguageAttributes(bodyEnglish);
        bodyWrap.appendChild(bodyPrimary); bodyWrap.appendChild(bodyEnglish);
        bodyRow.appendChild(accentBar); bodyRow.appendChild(bodyWrap);
        textcol.appendChild(title); textcol.appendChild(bodyRow);
        var content = el("div", "sp-content");
        var chip = el("div", "sp-chip");
        var chipDot = el("span", "sp-chip-dot");
        var chipLabel = el("span", "sp-chip-label");
        chip.appendChild(chipDot); chip.appendChild(chipLabel);
        card.appendChild(textcol); card.appendChild(content); card.appendChild(chip);
        wrap.appendChild(card);
        host.appendChild(wrap);
        // The strip is mounted inside the top bar on Stage 2, so it stays visible
        // while the center form scrolls.
        wrap.style.top = "0px";

        function paint() {
            var pal = (STATE.color && STATE.color.palette) || {};
            var typ = STATE.typography || {};
            var head = typ.heading || {}, body = typ.body || {};
            var bg = hexOr(pal.background, "#ffffff");
            var sbg = hexOr(pal.secondary_bg, bg);
            var pri = hexOr(pal.primary, "#1a3a6b");
            var acc = hexOr(pal.accent, pri);
            var sacc = hexOr(pal.secondary_accent, acc);
            var txt = hexOr(pal.body_text, "#1d2430");
            // body_size is px everywhere — preview it directly, no conversion.
            var rawSize = parseFloat(typ.body_size) ||
                defaultBodySizeForCanvas(STATE.canvas, STATE.delivery_purpose);
            var bodyPx = Math.max(12, Math.min(34, rawSize));
            var headPrimaryStack = previewFontStack(head.primary, head.css);
            var headEnglishStack = previewFontStack(head.english, head.css);
            var bodyPrimaryStack = previewFontStack(body.primary, body.css);
            var bodyEnglishStack = previewFontStack(body.english, body.css);

            card.style.background = bg;
            titlePrimary.textContent = sampleText("heading", "primary");
            setUiLanguageAttributes(titlePrimary);
            titleEnglish.textContent = sampleText("heading", "english");
            title.style.color = pri;
            title.style.fontSize = Math.round(bodyPx * 1.7) + "px";
            titlePrimary.style.fontFamily = headPrimaryStack || "";
            titleEnglish.style.fontFamily = headEnglishStack || "";
            bodyPrimary.textContent = sampleText("body", "primary");
            setUiLanguageAttributes(bodyPrimary);
            bodyEnglish.textContent = sampleText("body", "english");
            bodyWrap.style.color = txt;
            bodyWrap.style.fontSize = bodyPx + "px";
            bodyPrimary.style.fontFamily = bodyPrimaryStack || "";
            bodyEnglish.style.fontFamily = bodyEnglishStack || "";
            titleEnglish.style.display = isEnglishProject() ? "none" : "";
            bodyEnglish.style.display = isEnglishProject() ? "none" : "";
            accentBar.style.background = acc;
            content.style.color = txt;
            content.style.fontFamily = bodyPrimaryStack || "";
            content.innerHTML = stylePreviewContentMarkup(STATE.icons);
            setUiLanguageAttributes(content);
            chip.style.background = sbg;
            chipDot.style.background = sacc;
            chipLabel.textContent = t("role_secondary_bg");
            chipLabel.style.color = txt;
            chipLabel.style.fontFamily = bodyPrimaryStack || "";
        }
        refreshStylePreview = paint;
        paint();
    }

    function renderImageStrategyPreview(host) {
        var wrap = el("div", "style-preview image-strategy-left-preview");
        var label = el("div", "style-preview-label");
        label.appendChild(el("span", "spl-title", t("image_strategy")));
        label.appendChild(el("span", "spl-note", t("image_strategy_reference_hint")));
        wrap.appendChild(label);
        var card = el("div", "style-preview-card image-strategy-preview-card");
        var visual = el("div", "image-strategy-preview-visual");
        var copy = el("div", "direction-preview-copy");
        var title = el("div", "direction-preview-title");
        var desc = el("div", "direction-preview-desc");
        copy.appendChild(title);
        copy.appendChild(desc);
        card.appendChild(visual);
        card.appendChild(copy);
        wrap.appendChild(card);
        host.appendChild(wrap);
        function paint() {
            var show = needsGeneratedImagesForUsage(STATE.image_usage);
            wrap.hidden = !show;
            if (!show) return;
            var strategy = STATE.image_strategy || {};
            visual.innerHTML = "";
            var row = appendImageStrategyPreviews(visual, strategy);
            visual.classList.toggle("image-strategy-preview-empty", !row);
            if (!row) visual.appendChild(el("div", "toggle-desc",
                strategy.rendering === "custom" ? t("image_strategy_no_reference") :
                    t("image_strategy_select_placeholder")));
            title.textContent = strategy.name ||
                (strategy.rendering === "custom" ? t("image_strategy_ai_custom") :
                    (strategy.rendering ? comparisonValueLabel("rendering", strategy.rendering) :
                        t("image_strategy_select_placeholder")));
            var parts = [];
            if (strategy.rendering) {
                parts.push(t("image_strategy_rendering") + labelSep() +
                    comparisonValueLabel("rendering", strategy.rendering));
            }
            if (strategy.visual) parts.push(t("image_strategy_visual") + labelSep() + strategy.visual);
            if (strategy.mood) parts.push(t("image_strategy_mood") + labelSep() + strategy.mood);
            if (strategy.behavior) parts.push(strategy.behavior);
            desc.textContent = parts.join(" · ") || t("image_strategy_reference_hint");
        }
        refreshImageStrategyPreview = paint;
        paint();
    }

    function findCatalogOption(list, id) {
        var flat = [];
        (list || []).forEach(function (item) {
            if (item && item.items) flat = flat.concat(item.items);
            else flat.push(item);
        });
        for (var i = 0; i < flat.length; i += 1) {
            if (flat[i] && flat[i].id === id) return flat[i];
        }
        return null;
    }

    function stylePreviewRows() {
        return [
            [t("preview_point_1_title"), t("preview_point_1_text")],
            [t("preview_point_2_title"), t("preview_point_2_text")],
            [t("preview_point_3_title"), t("preview_point_3_text")]
        ];
    }

    function stylePreviewContentMarkup(iconId) {
        var rows = stylePreviewRows();
        var icons = stylePreviewIconSamples(iconId, rows.length);
        return rows.map(function (row, idx) {
            return '<div class="sp-content-row">' +
                '<span class="sp-content-icon">' + icons[idx] + '</span>' +
                '<span class="sp-content-copy"><b>' + escapeHtml(row[0]) + '</b><small>' + escapeHtml(row[1]) + '</small></span>' +
                '</div>';
        }).join("");
    }

    function stylePreviewIconSamples(iconId, count) {
        if (iconId === "emoji") return ["📊", "💡", "✅"].slice(0, count).map(function (x) {
            return '<span class="sp-icon-emoji">' + x + '</span>';
        });
        if (iconId === "none") return new Array(count).fill('<span class="sp-icon-none-dot"></span>');
        var samples = ICON_PREVIEWS[iconId] || [];
        var out = [];
        for (var i = 0; i < count; i += 1) {
            var sample = samples[i % Math.max(samples.length, 1)];
            out.push(sample ? '<span class="sp-icon-mark" title="' + escapeHtml(sample.name || "") + '">' + (sample.svg || "") + '</span>' : '<span class="sp-icon-none-dot"></span>');
        }
        return out;
    }

    function renderImageDirection(host) {
        var sec = section(8, "sec_images");
        var usageChips = el("div", "chips");
        var usageNote = el("div", "subfield");
        usageNote.appendChild(el("div", "subfield-label", t("image_usage_notes")));
        var usageNoteInput = el("textarea", "text-input image-usage-notes-input");
        setNaturalInputDirection(usageNoteInput);
        usageNoteInput.placeholder = t("image_usage_notes_placeholder");
        usageNoteInput.value = STATE.image_notes || "";
        usageNoteInput.addEventListener("input", function () { STATE.image_notes = usageNoteInput.value; });
        usageNote.appendChild(usageNoteInput);

        var strategySub = el("div", "subfield image-strategy-subfield");
        strategySub.appendChild(el("div", "subfield-label", t("image_strategy")));
        strategySub.appendChild(el("div", "toggle-desc", t("image_strategy_reference_hint")));
        renderDirectionComponentCandidates(strategySub, "image_strategy");
        var recommendedStrategies = imageStrategyRecommendationCandidates();
        var strategyCands = imageStrategySelectableCandidates();
        var hasRecommendedStrategies = recommendedStrategies.length > 0;
        var customStrategy = STATE.image_strategy_custom || imageStrategyCustomCandidate();
        var presetPicker = el("div", "image-strategy-picker");
        var presetSelect = el("select", "font-select image-strategy-select");
        var customCard = null;
        var currentCustomEditor = null;
        var syncCustomStrategy = function () {};
        var selectCustomImageStrategy = function () {};

        function selectImageStrategy(idx) {
            if (!strategyCands[idx]) return;
            STATE.image_strategy = normalizedImageStrategy(strategyCands[idx]);
            ACTIVE_COMPONENT_DIRECTION_IDS.image_strategy = "";
            presetSelect.value = String(idx);
            if (customCard) customCard.classList.remove("selected");
            if (currentCustomEditor) currentCustomEditor.style.display = "none";
            syncCustomStrategy(false);
            refreshImageStrategyPreview();
            refreshDesignDirectionState();
            refreshDirectionComponentStates();
        }

        function imageStrategyCandidateIndex(strategy) {
            if (!strategy) return -1;
            var normalized = JSON.stringify(comparableImageStrategy(strategy));
            for (var i = 0; i < strategyCands.length; i += 1) {
                if (JSON.stringify(comparableImageStrategy(strategyCands[i])) === normalized) return i;
            }
            for (var fallback = 0; fallback < strategyCands.length; fallback += 1) {
                if (strategyCands[fallback] &&
                        strategyCands[fallback].rendering === strategy.rendering) return fallback;
            }
            return -1;
        }

        function strategyOptionLabel(candidate, idx) {
            var renderingLabel = comparisonValueLabel("rendering", candidate.rendering);
            var candidateName = localized(candidate, "name") || renderingLabel ||
                (t("option_prefix") + " " + (idx + 1));
            return candidateName !== renderingLabel ?
                candidateName + " · " + renderingLabel : candidateName;
        }

        function appendStrategyOptions(label, start, end) {
            if (start >= end) return;
            var group = document.createElement("optgroup");
            group.label = label;
            for (var idx = start; idx < end; idx += 1) {
                var option = document.createElement("option");
                option.value = String(idx);
                option.textContent = strategyOptionLabel(strategyCands[idx], idx);
                group.appendChild(option);
            }
            presetSelect.appendChild(group);
        }

        var placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.textContent = t("image_strategy_select_placeholder");
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        presetSelect.appendChild(placeholderOption);
        appendStrategyOptions(t("image_strategy_recommended_group"), 0, recommendedStrategies.length);
        appendStrategyOptions(t("image_strategy_all_group"), recommendedStrategies.length, strategyCands.length);
        presetSelect.disabled = !strategyCands.length;
        presetSelect.addEventListener("change", function () {
            selectImageStrategy(parseInt(presetSelect.value, 10));
        });
        presetPicker.appendChild(presetSelect);
        if (!strategyCands.length) {
            presetPicker.appendChild(el("div", "toggle-desc", t("image_strategy_empty")));
        }
        strategySub.appendChild(presetPicker);

        if (customStrategy) {
            customStrategy = normalizedImageStrategy(customStrategy);
            STATE.image_strategy_custom = customStrategy;
            customCard = el("div", "font-card image-strategy-custom-card ai-custom-candidate");
            var customTop = el("div", "font-card-head");
            customTop.appendChild(el("span", "font-card-name",
                customStrategy.name || t("image_strategy_ai_custom")));
            customTop.appendChild(el("span", "font-card-meta", t("image_strategy_ai_custom_desc")));
            customCard.appendChild(customTop);
            [
                ["image_strategy_visual", customStrategy.visual],
                ["image_strategy_mood", customStrategy.mood]
            ].forEach(function (row) {
                if (row[1]) customCard.appendChild(el("div", "color-note", t(row[0]) + labelSep() + row[1]));
            });
            var customCopy = el("div", "ai-custom-candidate-copy",
                customStrategy.behavior || t("image_strategy_custom_placeholder"));
            customCard.appendChild(customCopy);
            var customInput = el("textarea", "text-input image-strategy-custom-input");
            setNaturalInputDirection(customInput);
            customInput.rows = 4;
            customInput.placeholder = t("image_strategy_custom_placeholder");
            customInput.value = customStrategy.behavior;
            customInput.style.display = "none";
            customCard.appendChild(customInput);

            syncCustomStrategy = function (selected) {
                customCopy.textContent = customStrategy.behavior || t("image_strategy_custom_placeholder");
                customCopy.style.display = selected ? "none" : "block";
                customInput.style.display = selected ? "block" : "none";
                if (selected && customInput.value !== customStrategy.behavior) {
                    customInput.value = customStrategy.behavior || "";
                }
            };

            selectCustomImageStrategy = function () {
                STATE.image_strategy = normalizedImageStrategy(customStrategy);
                ACTIVE_COMPONENT_DIRECTION_IDS.image_strategy = "";
                presetSelect.value = "";
                customCard.classList.add("selected");
                syncCustomStrategy(true);
                refreshImageStrategyPreview();
                refreshDesignDirectionState();
                refreshDirectionComponentStates();
            };

            customInput.addEventListener("click", function (event) { event.stopPropagation(); });
            customInput.addEventListener("input", function () {
                customStrategy.behavior = customInput.value;
                STATE.image_strategy_custom = normalizedImageStrategy(customStrategy);
                selectCustomImageStrategy();
            });
            customCard.addEventListener("click", function () {
                selectCustomImageStrategy();
                customInput.focus();
            });
            syncCustomStrategy(false);
            strategySub.appendChild(customCard);
        }

        if (!customCard && !ACTIVE_COMPONENT_DIRECTION_IDS.image_strategy &&
                STATE.image_strategy &&
                STATE.image_strategy.rendering === "custom") {
            var customEditorField = el("div", "subfield image-strategy-current-custom");
            customEditorField.appendChild(el("div", "subfield-label", t("custom")));
            currentCustomEditor = el("textarea", "text-input image-strategy-custom-input");
            setNaturalInputDirection(currentCustomEditor);
            currentCustomEditor.rows = 4;
            currentCustomEditor.placeholder = t("image_strategy_custom_placeholder");
            currentCustomEditor.value = STATE.image_strategy.behavior || "";
            currentCustomEditor.addEventListener("input", function () {
                STATE.image_strategy.behavior = currentCustomEditor.value;
                refreshImageStrategyPreview();
                refreshDesignDirectionState();
                refreshDirectionComponentStates();
            });
            customEditorField.appendChild(currentCustomEditor);
            strategySub.appendChild(customEditorField);
        }

        var recommendedIds = selectedImageUsageIds(recValue("image_usage"));
        if (!recommendedIds.length) recommendedIds = [defaultImageUsageId()];
        var usageChipById = {};
        function refreshUsageChips() {
            Object.keys(usageChipById).forEach(function (id) {
                usageChipById[id].classList.toggle("selected", STATE.image_usage.indexOf(id) >= 0);
            });
            var noImages = STATE.image_usage.indexOf("none") >= 0;
            usageNote.style.display = noImages ? "none" : "block";
            strategySub.style.display = needsGeneratedImagesForUsage(STATE.image_usage) ? "block" : "none";
            refreshImageStrategyPreview();
        }
        function toggleImageUsage(id) {
            var current = STATE.image_usage.slice();
            if (id === "none") {
                current = current.indexOf("none") >= 0 ? [] : ["none"];
            } else {
                current = current.filter(function (item) { return item !== "none"; });
                if (current.indexOf(id) >= 0) {
                    current = current.filter(function (item) { return item !== id; });
                } else {
                    current.push(id);
                }
            }
            STATE.image_usage = current;
            refreshUsageChips();
            refreshImageProduction();
        }
        (CAT.image_usage || []).forEach(function (option) {
            var label = optionLabel(option);
            var desc = optionDesc(option);
            if (desc) label += (isCjkUi() ? "：" : " — ") + desc;
            var chip = el("div", "chip");
            chip.appendChild(el("span", "chip-text", label));
            if (recommendedIds.indexOf(option.id) >= 0) {
                chip.classList.add("recommended");
                chip.appendChild(el("span", "rec-badge", "★ " + t("recommended")));
            }
            chip.addEventListener("click", function () { toggleImageUsage(option.id); });
            usageChipById[option.id] = chip;
            usageChips.appendChild(chip);
        });
        sec.appendChild(usageChips);
        sec.appendChild(usageNote);
        sec.appendChild(strategySub);

        var currentStrategyIndex = imageStrategyCandidateIndex(STATE.image_strategy);
        if (STATE.image_strategy && STATE.image_strategy.rendering === "custom" && customCard) {
            selectCustomImageStrategy();
        } else if (STATE.image_strategy && STATE.image_strategy.rendering === "custom") {
            presetSelect.value = "";
        } else if (currentStrategyIndex >= 0) {
            presetSelect.value = String(currentStrategyIndex);
            if (customCard) customCard.classList.remove("selected");
            syncCustomStrategy(false);
        } else if ((!STATE.image_strategy || !STATE.image_strategy.rendering) &&
                needsGeneratedImagesForUsage(STATE.image_usage) &&
                hasRecommendedStrategies && strategyCands.length) {
            selectImageStrategy(imageStrategySelectedIndex());
        }
        refreshUsageChips();
        host.appendChild(sec);
    }

    function renderImageProduction(host) {
        var sec = section("P", "sec_image_production", t("image_production_hint"));
        var body = el("div", "image-production-body");
        sec.appendChild(body);
        refreshImageProduction = function () {
            body.innerHTML = "";
            var summary = el("div", "subfield");
            summary.appendChild(el("div", "subfield-label", t("image_source_summary")));
            var chips = el("div", "chips locked-summary-chips");
            (STATE.image_usage || []).forEach(function (id) {
                var option = findCatalogOption(CAT.image_usage, id);
                chips.appendChild(el("div", "chip selected locked-summary-chip",
                    option ? optionLabel(option) : humanizeId(id)));
            });
            summary.appendChild(chips);
            body.appendChild(summary);
            if (needsGeneratedImagesForUsage(STATE.image_usage)) {
                var pathField = el("div", "subfield");
                pathField.appendChild(el("div", "subfield-label", t("image_ai_path")));
                enumField(pathField, CAT.image_ai_path, recOrFirst("image_ai_path", CAT.image_ai_path),
                    function () { return STATE.image_ai_path; }, function (value) { STATE.image_ai_path = value; });
                body.appendChild(pathField);
            }
        };
        refreshImageProduction();
        host.appendChild(sec);
    }

    function renderMode(host) {
        var sec = section("M", "sec_mode");
        function refresh() {
            setSectionNote(sec, STATE.generation_mode === "split" ? t("mode_split_desc") : t("mode_continuous_desc"));
        }
        enumField(sec, CAT.generation_mode, recOrFirst("generation_mode", CAT.generation_mode),
            function () { return STATE.generation_mode; }, function (v) {
                STATE.generation_mode = v;
                refresh();
                refreshDesignSpecDepth();
            });
        refresh();
        host.appendChild(sec);
    }

    function renderProactiveExecution(host) {
        var sec = section("A", "sec_proactive_execution", t("proactive_execution_hint"));
        var opts = [{ id: "off", label: t("off_default") }, { id: "on", label: t("on") }];

        function addToggle(labelKey, descKey, stateKey, fallback) {
            var field = el("div", "subfield");
            field.appendChild(el("div", "subfield-label", t(labelKey)));
            field.appendChild(el("div", "toggle-desc", t(descKey)));
            var recommended = booleanRecommendation(stateKey, fallback);
            enumField(field, opts, recommended ? "on" : "off",
                function () { return STATE[stateKey] ? "on" : "off"; },
                function (value) {
                    STATE[stateKey] = value === "on";
                });
            sec.appendChild(field);
        }

        addToggle(
            "proactive_speaker_notes",
            "proactive_speaker_notes_desc",
            "proactive_speaker_notes",
            true
        );
        addToggle(
            "proactive_custom_animations",
            "proactive_custom_animations_desc",
            "proactive_custom_animations",
            false
        );
        addToggle(
            "proactive_narration_audio",
            "proactive_narration_audio_desc",
            "proactive_narration_audio",
            false
        );
        host.appendChild(sec);
    }

    function renderRefine(host) {
        var sec = section("R", "sec_refine");
        var opts = [{ id: "off", label: t("off_default") }, { id: "on", label: t("on") }];
        function refresh() {
            setSectionNote(sec, STATE.refine_spec ? t("refine_on_desc") : t("refine_off_desc"));
        }
        enumField(sec, opts, STATE.refine_spec ? "on" : "off",
            function () { return STATE.refine_spec ? "on" : "off"; },
            function (v) {
                STATE.refine_spec = (v === "on");
                refresh();
                refreshDesignSpecDepth();
            });
        refresh();
        host.appendChild(sec);
    }

    function designSpecDepthCatalog() {
        if (CAT.design_spec_depth && CAT.design_spec_depth.length) {
            return CAT.design_spec_depth;
        }
        return [
            {
                id: "brief",
                label: t("design_spec_depth_brief"),
                desc: t("design_spec_depth_brief_desc")
            },
            {
                id: "complete",
                label: t("design_spec_depth_complete"),
                desc: t("design_spec_depth_complete_desc")
            }
        ];
    }

    function renderDesignSpecDepth(host) {
        var sec = section("D", "sec_design_spec_depth");
        var body = el("div", "design-spec-depth-body");
        var recommended = REC.design_spec_depth && REC.design_spec_depth.value;
        if (recommended !== "brief" && recommended !== "complete") recommended = "brief";
        sec.appendChild(body);
        refreshDesignSpecDepth = function () {
            var locked = STATE.generation_mode === "split" || STATE.refine_spec;
            if (locked) STATE.design_spec_depth = "complete";
            body.innerHTML = "";
            enumField(
                body,
                designSpecDepthCatalog(),
                locked ? null : recommended,
                function () { return STATE.design_spec_depth; },
                function (value) { STATE.design_spec_depth = value; },
                { disabled: locked }
            );
            setSectionNote(sec, locked ? t("design_spec_depth_locked") : "");
        };
        refreshDesignSpecDepth();
        host.appendChild(sec);
    }

    // Two-stage confirmation: communication contract, then complete final plan.
    var STAGE = 1;

    function stageNumber(data) {
        var raw = data && data.stage;
        raw = String(raw == null ? "" : raw).toLowerCase();
        if (raw === "stage1") return 1;
        if (raw === "stage2") return 2;
        return 0;
    }

    function stageTitle(stage) {
        if (stage === 1) return t("stage_anchors");
        if (stage === 2) return t("stage_final_plan");
        return t("page_title");
    }

    function renderForStage(stage) {
        var host = document.getElementById("sections");
        host.innerHTML = "";
        _secCounter = 0;
        var heading = document.querySelector("#topbar .topbar-titles h1");
        if (heading) heading.textContent = stageTitle(stage);
        var hint = document.getElementById("topbar-hint");
        if (hint) hint.textContent = stage === 1 ? t("stage1_current_value_hint") : t("topbar_hint");
        // Detach the previous preview's repaint closures before the sections
        // re-render: color/typography auto-select would otherwise call them and
        // write to now-detached nodes until renderStylePreview remounts them.
        refreshStylePreview = function () {};
        refreshImageStrategyPreview = function () {};
        refreshImageProduction = function () {};
        refreshDesignSpecDepth = function () {};
        refreshBodySizeHint = function () {};
        refreshSizeInputs = function () {};
        DIRECTION_COMPONENT_PAINTERS = [];
        var previewHost = document.getElementById("topbar-preview");
        if (previewHost) previewHost.innerHTML = "";
        if (stage === 1) {
            // Stage 1 closes the communication contract and its design basis in
            // one submission. Detailed template controls stay hidden until the
            // user explicitly chooses template-backed design.
            renderCommunication(host);
            renderDelivery(host);
            renderCanvas(host);
            renderTemplateSelection(host);
        } else if (stage === 2) {
            if (previewHost) renderStylePreview(previewHost);
            if (previewHost) renderImageStrategyPreview(previewHost);
            // Stage 2 confirms one coherent deck solution. Bundles provide a
            // coordinated starting point; individual controls remain editable.
            renderTemplateApplication(host);
            renderDesignDirections(host);
            renderNarrativeDirection(host);
            renderVisualDirection(host);
            renderReadingMode(host);
            renderPages(host);
            var styleGroup = el("div", "style-group");
            renderColor(styleGroup);
            renderIcons(styleGroup);
            renderTypography(styleGroup);
            host.appendChild(styleGroup);
            renderImageDirection(host);
            renderImageProduction(host);
            renderProactiveExecution(host);
            renderMode(host);
            renderRefine(host);
            renderDesignSpecDepth(host);
            var refreshDirectionIndicators = function () {
                window.setTimeout(function () {
                    refreshDesignDirectionState();
                    refreshDirectionComponentStates();
                }, 0);
            };
            host.oninput = refreshDirectionIndicators;
            host.onchange = refreshDirectionIndicators;
            host.onclick = refreshDirectionIndicators;
        }
        updateActionBar(stage);
    }

    function renderAll() { renderForStage(STAGE); }

    function updateActionBar(stage) {
        var btn = document.getElementById("btn-confirm");
        btn.disabled = false;
        if (stage === 1) btn.textContent = t("btn_confirm_contract");
        else if (stage === 2) btn.textContent = t("btn_confirm_final_plan");
        else btn.textContent = t("btn_confirm");
    }

    // ---- state init (once) ----------------------------------------------
    function firstId(list) {
        if (!list || !list.length) return undefined;
        if (list[0].items) return (list[0].items[0] || {}).id;
        return list[0].id;
    }
    function pick(field, catList) {
        var recommended = recId(field);
        if (recommended == null || recommended === "") {
            recommended = normalizeRecId(field, directionField(field));
        }
        return recommended != null && recommended !== "" ? recommended : firstId(catList);
    }

    function initCreativeSelection(field, catalog, behaviorKey) {
        var value = pick(field, catalog);
        var behavior = customCandidateBehavior(field);
        if (value && value !== "custom" && !findCatalogOption(catalog, value)) {
            behavior = String(value);
            value = "custom";
        }
        STATE[field] = value;
        STATE[behaviorKey] = behavior;
    }

    function initStage1State() {
        STATE.primary_language = recommendationLanguage();
        STATE.canvas = pick("canvas", CAT.canvas);
        STATE.audience = (REC.audience && REC.audience.value) || "";
        STATE.communication_intent = (REC.communication_intent && REC.communication_intent.value) || "";
        STATE.audience_outcome = (REC.audience_outcome && REC.audience_outcome.value) || "";
        STATE.core_message = (REC.core_message && REC.core_message.value) || "";
        STATE.delivery_context = (REC.delivery_context && REC.delivery_context.value) || "";
        STATE.artifact_afterlife = (REC.artifact_afterlife && REC.artifact_afterlife.value) || "";
        STATE.content_divergence = (REC.content_divergence && REC.content_divergence.value) || "";  // free text; blank = balanced default
    }

    // Stage-2 fields are (re-)read from the recommendations. At boot they come from
    // the active stage file; after a stage-1 confirm enterStage() calls this again
    // with the newly authored candidates. Stage-1 STATE is preserved
    // across the single-session transition — this never resets the contract.
    function initStage2State() {
        [
            "audience",
            "communication_intent",
            "audience_outcome",
            "core_message",
            "delivery_context",
            "artifact_afterlife",
            "content_divergence"
        ].forEach(function (field) {
            var value = recValue(field);
            if (value && typeof value === "object") value = value.value;
            if (value != null) STATE[field] = String(value);
        });
        STATE.primary_language = recommendationLanguage();
        resetTypographySizeOverrides();
        var templateApplication = templateApplicationRecommendation();
        if (templateApplication != null) {
            STATE.template_application = templateApplication;
        } else if (stageNumber(REC) === 2) {
            delete STATE.template_application;
        }
        // Reading mode is a design-density tool, not part of the communication
        // purpose. Keep the legacy delivery_purpose key for JSON compatibility.
        STATE.delivery_purpose = recId("delivery_purpose") ||
            directionField("delivery_purpose") || STATE.delivery_purpose || "balanced";
        STATE.page_count = (REC.page_count && REC.page_count.value != null) ? String(REC.page_count.value) : (STATE.page_count || "");
        initCreativeSelection("mode", CAT.modes, "mode_behavior");
        initCreativeSelection("visual_style", CAT.visual_styles, "visual_style_behavior");
        var cc = colorRecommendationCandidates();
        var csel = (REC.color && REC.color.selected != null) ? REC.color.selected :
            selectedDesignDirectionIndex();
        var c0 = cc[Math.min(csel, Math.max(cc.length - 1, 0))] || {};
        STATE.color = {
            name: localized(c0, "name") || c0.name || "",
            palette: Object.assign({}, normPalette(c0))
        };

        STATE.icons = pick("icons", CAT.icons);

        var tc = typographyRecommendationCandidates();
        var tsel = (REC.typography && REC.typography.selected != null) ? REC.typography.selected :
            selectedDesignDirectionIndex();
        var t0 = normTypography(tc[Math.min(tsel, Math.max(tc.length - 1, 0))] || {});
        STATE.typography = {
            name: localized(t0, "name") || t0.name || "",
            heading: t0.heading || {},
            body: t0.body || {},
            body_size: t0.body_size || typographyBodySize(REC.typography),
            sizes: Object.assign({}, t0.sizes || {})
        };
        if (t0.custom) STATE.typography.custom = t0.custom;

        // Guarantee a body baseline even when a candidate omitted body_size, on
        // any canvas (PPT → px default by purpose, non-PPT → px from effective span),
        // so role sizes never derive from an empty anchor.
        if (STATE.typography && !STATE.typography.body_size) {
            STATE.typography.body_size = defaultBodySizeForCanvas(STATE.canvas, STATE.delivery_purpose);
        }
        // Preserve an authored positive candidate anchor; derive only the roles
        // that remain unpinned. A user reading-mode change may reset it later.
        if (stageNumber(REC) === 2) syncUnpinnedTypographySizes(false);
        var rawImageUsage = recValue("image_usage");
        STATE.image_usage = selectedImageUsageIds(rawImageUsage);
        if (!STATE.image_usage.length) {
            STATE.image_usage = [defaultImageUsageId()];
        }
        STATE.image_notes = imageUsageNotesRecommendation(rawImageUsage);
        STATE.image_strategy_custom = imageStrategyCustomCandidate();
        var strategyCandidates = imageStrategyRecommendationCandidates();
        var directionStrategy = directionField("image_strategy");
        var customStrategyRecommended = recId("image_strategy") === "custom";
        if (customStrategyRecommended && STATE.image_strategy_custom) {
            STATE.image_strategy = normalizedImageStrategy(STATE.image_strategy_custom);
        } else if (directionStrategy) {
            STATE.image_strategy = normalizedImageStrategy(directionStrategy);
        } else if (strategyCandidates.length) {
            STATE.image_strategy = normalizedImageStrategy(
                strategyCandidates[imageStrategySelectedIndex()] || strategyCandidates[0]
            );
        }
        var directions = designDirectionCandidates();
        if (directions.length) {
            var selected = selectedDesignDirectionIndex();
            applyDesignDirection(directions[selected], selected, false);
        }
    }

    function initProductionState() {
        STATE.image_ai_path = pick("image_ai_path", CAT.image_ai_path);
        STATE.proactive_speaker_notes = booleanRecommendation("proactive_speaker_notes", true);
        STATE.proactive_custom_animations = booleanRecommendation("proactive_custom_animations", false);
        STATE.proactive_narration_audio = booleanRecommendation("proactive_narration_audio", false);

        STATE.generation_mode = pick("generation_mode", CAT.generation_mode);
        STATE.refine_spec = !!((REC.refine_spec && REC.refine_spec.value) || (REC.recommend && REC.recommend.refine_spec));
        var designSpecDepth = REC.design_spec_depth && REC.design_spec_depth.value;
        STATE.design_spec_depth = designSpecDepth === "complete" ? "complete" : "brief";
        if (STATE.generation_mode === "split" || STATE.refine_spec) {
            STATE.design_spec_depth = "complete";
        }
    }

    function initState() {
        initStage1State();
    }

    // ---- confirm + close -------------------------------------------------
    function showConfirmedOverlay() {
        var ov = document.getElementById("confirmed-overlay");
        ov.querySelector(".cf-title").textContent = t("confirmed_title");
        ov.querySelector(".cf-hint").textContent = t("confirmed_hint");
        ov.style.display = "flex";
    }

    // ---- staged submit + next-stage transitions -------------------------
    function communicationPayload() {
        var payload = {
            canvas: STATE.canvas,
            audience: STATE.audience,
            communication_intent: STATE.communication_intent,
            audience_outcome: STATE.audience_outcome,
            core_message: STATE.core_message,
            delivery_context: STATE.delivery_context,
            artifact_afterlife: STATE.artifact_afterlife,
            content_divergence: STATE.content_divergence
        };
        if (STATE.primary_language && STATE.primary_language !== "und") {
            payload.primary_language = STATE.primary_language;
        }
        return payload;
    }

    function stage1Payload() {
        var payload = communicationPayload();
        payload.stage = "stage1";
        payload.options_sha256 = TEMPLATE_OPTIONS.options_sha256;
        payload.template_selection = {
            mode: TEMPLATE_MODE,
            selection_keys: TEMPLATE_MODE === "templates"
                ? TEMPLATE_SELECTED_KEYS.slice() : []
        };
        return payload;
    }

    function normalizeCreativePayload(payload) {
        if (payload.mode !== "custom") delete payload.mode_behavior;
        if (payload.visual_style !== "custom") delete payload.visual_style_behavior;
        var imageStrategy = payload.image_strategy;
        if (imageStrategy && imageStrategy.rendering === "custom") {
            if (!imageStrategy.behavior && imageStrategy.custom) {
                imageStrategy.behavior = imageStrategy.custom;
            }
            delete imageStrategy.custom;
        } else if (imageStrategy) {
            delete imageStrategy.behavior;
            delete imageStrategy.custom;
        }
        delete payload.image_strategy_custom;
        return payload;
    }

    function customSelectionsValid(payload) {
        var imageStrategy = payload.image_strategy || {};
        var valid = payload.mode !== "custom" || String(payload.mode_behavior || "").trim();
        valid = valid && (payload.visual_style !== "custom" ||
            String(payload.visual_style_behavior || "").trim());
        valid = valid && (imageStrategy.rendering !== "custom" ||
            String(imageStrategy.behavior || "").trim());
        if (!valid) {
            document.getElementById("confirm-status").textContent = t("custom_behavior_required");
        }
        return !!valid;
    }

    function imageStrategyValid(payload) {
        if (!needsGeneratedImagesForUsage(payload.image_usage)) return true;
        var imageStrategy = payload.image_strategy || {};
        var rendering = String(imageStrategy.rendering || "").trim();
        if (!rendering) {
            document.getElementById("confirm-status").textContent = t("image_strategy_required");
            return false;
        }
        var presetIds = imageStrategyCatalogCandidates().map(function (candidate) {
            return candidate.rendering;
        });
        if (rendering !== "custom" && presetIds.length && presetIds.indexOf(rendering) < 0) {
            document.getElementById("confirm-status").textContent = t("image_strategy_invalid");
            return false;
        }
        return true;
    }

    function positiveNumber(value) {
        var number = parseFloat(value);
        return isFinite(number) && number > 0;
    }

    function designSystemValid(payload) {
        var color = payload.color || {};
        var palette = color.palette || {};
        var completePalette = PALETTE_ROLES.every(function (role) {
            return !!normHex(palette[role]);
        });
        var customPalette = color.name === "custom" && String(color.custom || "").trim();

        var typography = payload.typography || {};
        var completeFamilies = typographyFamiliesComplete(typography);
        var sizes = typography.sizes || {};
        var completeSizes = positiveNumber(typography.body_size) &&
            ["title", "subtitle", "annotation"].every(function (role) {
                return positiveNumber(sizes[role]);
            });
        var valid = (completePalette || customPalette) &&
            completeFamilies && completeSizes;
        if (!valid) {
            var message = color.name === "custom" && !customPalette
                ? t("custom_color_required")
                : t("design_system_required");
            document.getElementById("confirm-status").textContent = message;
        }
        return !!valid;
    }

    function submitStage(payload, nextStage) {
        var btn = document.getElementById("btn-confirm");
        btn.disabled = true;
        fetch("/api/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).then(function (r) {
            if (!r.ok) throw new Error("stage submit failed");
            showDeriving();
            pollForStage(nextStage);
        }).catch(function () {
            btn.disabled = false;
            document.getElementById("confirm-status").textContent = t("error_retry");
        });
    }

    function imageUsageValid(value) {
        var ids = selectedImageUsageIds(value);
        if (!ids.length) {
            document.getElementById("confirm-status").textContent = t("image_usage_required");
            return false;
        }
        if (ids.indexOf("none") >= 0 && ids.length > 1) {
            document.getElementById("confirm-status").textContent = t("image_usage_none_exclusive");
            return false;
        }
        return true;
    }

    function templateSelectionValid() {
        var valid = TEMPLATE_MODE === "free_design" ||
            (TEMPLATE_MODE === "templates" && TEMPLATE_SELECTED_KEYS.length > 0);
        if (!valid) {
            document.getElementById("confirm-status").textContent =
                t("template_selection_required");
            return false;
        }
        if (TEMPLATE_MODE === "templates") {
            var seenKinds = Object.create(null);
            for (var i = 0; i < TEMPLATE_SELECTED_KEYS.length; i += 1) {
                var candidate = templateCandidateByKey(TEMPLATE_SELECTED_KEYS[i]);
                if (!candidate) continue;
                if (seenKinds[candidate.kind]) {
                    document.getElementById("confirm-status").textContent =
                        t("template_selection_conflict");
                    return false;
                }
                seenKinds[candidate.kind] = true;
            }
        }
        return true;
    }

    function submitStage1() {
        if (!templateSelectionValid()) return;
        submitStage(stage1Payload(), 2);
    }

    function submitStage2() {
        confirm();
    }

    function showDeriving() {
        document.getElementById("sections").style.display = "none";
        document.getElementById("actionbar").style.display = "none";
        var l = document.getElementById("loading");
        l.setAttribute("data-i18n", "deriving");
        l.textContent = t("deriving");
        l.style.display = "block";
    }

    // Poll session state first. It is derived from recommendation stage files
    // and result.json, so a recovered server can tell the existing page exactly when
    // the next stage is ready.
    function pollForStage(nextStage) {
        fetchJson("/api/session", "session")
            .then(function (session) {
                var readyStage = Number(session && session.recommendation_stage_number || 0);
                if (readyStage < nextStage) {
                    setTimeout(function () { pollForStage(nextStage); }, 1200);
                    return null;
                }
                return fetchJson("/api/recommendations", "recommendations").then(function (data) {
                    var serverStage = stageNumber(data);
                    if (data && typeof serverStage === "number" && serverStage >= nextStage) {
                        enterStage(data, serverStage);
                    }
                    else { setTimeout(function () { pollForStage(nextStage); }, 1200); }
                    return null;
                });
            }).catch(function (err) {
                var l = document.getElementById("loading");
                if (l) l.textContent = t("connection_lost") + " " + (err && err.message ? err.message : "");
                setTimeout(function () { pollForStage(nextStage); }, 1500);
            });
    }

    function enterStage(data, stage) {
        REC = data;
        if (stage === 2) {
            initStage2State();
            initProductionState();
        }
        STAGE = stage;
        document.getElementById("loading").style.display = "none";
        document.getElementById("sections").style.display = "block";
        document.getElementById("actionbar").style.display = "flex";
        document.getElementById("confirm-status").textContent = "";
        renderForStage(stage);
    }

    function confirm() {
        var btn = document.getElementById("btn-confirm");
        var payload = JSON.parse(JSON.stringify(STATE));
        normalizeTypographyForSubmit(payload);
        payload.stage = "final";
        payload.image_usage = selectedImageUsageIds(payload.image_usage);
        if (!imageUsageValid(payload.image_usage)) return;
        if (!String(payload.image_notes || "").trim()) delete payload.image_notes;
        if (!needsGeneratedImagesForUsage(payload.image_usage)) {
            delete payload.image_ai_path;
            delete payload.image_strategy;
        } else {
            payload.image_strategy = normalizedImageStrategy(payload.image_strategy);
        }
        normalizeCreativePayload(payload);
        if (!imageStrategyValid(payload)) return;
        if (!designSystemValid(payload)) return;
        if (!customSelectionsValid(payload)) return;
        btn.disabled = true;
        fetch("/api/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).then(function (r) {
            if (!r.ok) throw new Error("confirm failed");
            showConfirmedOverlay();
            fetch("/api/shutdown", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason: "confirmed" })
            }).catch(function () { /* server already gone — fine */ });
            setTimeout(function () { try { window.close(); } catch (e) { /* ignore */ } }, 400);
        }).catch(function () {
            btn.disabled = false;
            document.getElementById("confirm-status").textContent = t("error_retry");
        });
    }

    // ---- boot ------------------------------------------------------------
    function showError(msg) {
        document.getElementById("loading").style.display = "none";
        var e = document.getElementById("error");
        e.style.display = "block";
        e.textContent = msg;
    }

    function fetchJson(url, label) {
        return fetch(url, { cache: "no-store" }).then(function (r) {
            return r.text().then(function (text) {
                var data = null;
                if (text) {
                    try { data = JSON.parse(text); }
                    catch (e) {
                        if (r.ok) throw new Error((label || url) + ": invalid JSON");
                    }
                }
                if (!r.ok) {
                    var serverMsg = data && data.error ? data.error : (text || r.statusText || r.status);
                    throw new Error((label || url) + ": " + serverMsg);
                }
                return data || {};
            });
        });
    }

    function loadCatalogs() {
        return fetchJson("/api/catalogs", "catalogs")
            .catch(function () { return fetchJson("/static/catalogs.json", "static catalogs"); });
    }

    function loadIconPreviews() {
        return fetchJson("/api/icon-previews", "icon previews")
            .catch(function () { return {}; });
    }

    function loadAiImageComparison() {
        return fetchJson("/api/ai-image-comparison", "AI image comparison")
            .catch(function () { return {}; });
    }

    function applyServerLanguage(data) {
        var requested = data && data.lang;
        if (requested !== "en" && requested !== "ja" && requested !== "vi") return;
        var hasStored = false;
        try { hasStored = ["en", "ja", "vi"].indexOf(window.localStorage.getItem("ppt_lang")) >= 0; } catch (e) { /* ignore */ }
        if (hasStored) return;
        LANG = requested;
        applyStaticTranslations();
        var toggleBtn = document.getElementById("btn-lang-toggle");
        if (toggleBtn) refreshLangToggle(toggleBtn);
    }

    function loadStrategistUi(forceStage) {
        return Promise.all([
            loadCatalogs(),
            fetchJson("/api/recommendations", "recommendations"),
            loadIconPreviews(),
            loadAiImageComparison()
        ]).then(function (res) {
            CAT = res[0];
            REC = res[1];
            ICON_PREVIEWS = res[2] || {};
            AI_IMAGE_COMPARISON = res[3] || {};
            applyServerLanguage(REC);
            var activeStage = forceStage || stageNumber(REC);
            if (activeStage === 1) {
                if (!REC.template_options || typeof REC.template_options !== "object" ||
                        Array.isArray(REC.template_options)) {
                    throw new Error("Stage 1 recommendations must include template_options");
                }
                initTemplateOptions(REC.template_options);
            }
            initState();
            enterStage(REC, activeStage);
            return REC;
        });
    }

    function boot() {
        applyStaticTranslations();
        var toggleBtn = document.getElementById("btn-lang-toggle");
        var langMenu = document.getElementById("lang-menu");
        refreshLangToggle(toggleBtn);
        var setMenuOpen = function (open) {
            langMenu.hidden = !open;
            toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
            if (open) {
                var sel = langMenu.querySelector("li.selected") || langMenu.querySelector("li[data-lang]");
                if (sel) sel.focus();
            }
        };
        var chooseLang = function (v) {
            setMenuOpen(false);
            toggleBtn.focus();
            if (v !== "ja" && v !== "en" && v !== "vi") return;
            try { window.localStorage.setItem("ppt_lang", v); } catch (e2) { /* ignore */ }
            if (v === LANG) return;
            LANG = v;
            applyStaticTranslations();
            refreshLangToggle(toggleBtn);
            document.getElementById("confirm-status").textContent = "";
            if (REC && CAT) {
                renderAll();   // STATE persists → selections preserved
            }
        };
        toggleBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            setMenuOpen(langMenu.hidden);
        });
        toggleBtn.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && !langMenu.hidden) {
                e.stopPropagation();
                setMenuOpen(false);
            } else if ((e.key === "ArrowDown" || e.key === "ArrowUp") && langMenu.hidden) {
                e.preventDefault();
                e.stopPropagation();
                setMenuOpen(true);
            }
        });
        langMenu.addEventListener("click", function (e) {
            e.stopPropagation();
            var li = e.target && e.target.closest ? e.target.closest("li[data-lang]") : null;
            if (li) chooseLang(li.getAttribute("data-lang"));
            else setMenuOpen(false);
        });
        langMenu.addEventListener("keydown", function (e) {
            e.stopPropagation();   // page-level shortcuts must not fire while the menu is open
            var items = Array.prototype.slice.call(langMenu.querySelectorAll("li[data-lang]"));
            var idx = items.indexOf(document.activeElement);
            if (e.key === "Escape") {
                setMenuOpen(false);
                toggleBtn.focus();
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                (items[idx + 1] || items[0]).focus();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                (items[idx - 1] || items[items.length - 1]).focus();
            } else if (e.key === "Home") {
                e.preventDefault();
                items[0].focus();
            } else if (e.key === "End") {
                e.preventDefault();
                items[items.length - 1].focus();
            } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                e.preventDefault();
            } else if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (idx >= 0) chooseLang(items[idx].getAttribute("data-lang"));
            }
        });
        toggleBtn.parentElement.addEventListener("focusout", function (e) {
            if (!langMenu.hidden && !toggleBtn.parentElement.contains(e.relatedTarget)) setMenuOpen(false);
        });
        document.addEventListener("click", function () {
            if (!langMenu.hidden) setMenuOpen(false);
        });
        document.getElementById("btn-confirm").addEventListener("click", function () {
            if (STAGE === 1) submitStage1();
            else if (STAGE === 2) submitStage2();
            else confirm();
        });

        // Session remains the first network read so completed runs can close
        // cleanly. Active runs always load the current Strategist stage; Stage 1
        // carries its template catalog inside the recommendation payload.
        fetchJson("/api/session", "session").catch(function () {
            return { phase: "strategist" };
        }).then(function (session) {
            if (session && session.status === "done") {
                document.getElementById("loading").style.display = "none";
                showConfirmedOverlay();
                return null;
            }
            return loadStrategistUi().catch(function (err) {
                showError(t("load_error") + " " + (err && err.message ? err.message : ""));
                return null;
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
