"""Vietnamese support: language tags, diacritic measurement, UI locale parity, voices."""

from __future__ import annotations

import re
import sys
import unicodedata
import unittest
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parents[1]
if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))

import text_measure  # noqa: E402
from language_tags import normalize_language_tag  # noqa: E402

SAMPLE = "Thành phố Hồ Chí Minh — chuyển đổi số, Đà Nẵng, ưu tiên"


class VietnameseLanguageTagTests(unittest.TestCase):
    def test_tags_normalize(self) -> None:
        self.assertEqual(normalize_language_tag("vi"), "vi")
        self.assertEqual(normalize_language_tag("vi_vn"), "vi-VN")


class VietnameseMeasureTests(unittest.TestCase):
    def test_precomposed_and_decomposed_text_measure_equally(self) -> None:
        nfc = unicodedata.normalize("NFC", SAMPLE)
        nfd = unicodedata.normalize("NFD", SAMPLE)
        self.assertNotEqual(nfc, nfd)
        self.assertAlmostEqual(
            text_measure.measure_text(nfc, size=24, family="Segoe UI"),
            text_measure.measure_text(nfd, size=24, family="Segoe UI"),
            places=3,
        )


class VietnameseUiLocaleTests(unittest.TestCase):
    @staticmethod
    def _keys(source: str, block: str) -> set[str]:
        start = re.search(rf"^\s*{re.escape(block)}: \{{\n", source, re.M)
        assert start, block
        end = source.index("\n        }", start.end())
        return set(re.findall(r"^\s+(\w+): ", source[start.end():end], re.M))

    def test_confirm_ui_vi_covers_every_english_key(self) -> None:
        source = (SCRIPTS_DIR / "confirm_ui" / "static" / "app.js").read_text(encoding="utf-8")
        self.assertEqual(self._keys(source, "en"), self._keys(source, "vi"))

    def test_edge_voices_include_vietnamese(self) -> None:
        source = (SCRIPTS_DIR / "tts_backends" / "backend_edge.py").read_text(encoding="utf-8")
        self.assertIn("vi-VN-HoaiMyNeural", source)
        self.assertIn("vi-VN-NamMinhNeural", source)

