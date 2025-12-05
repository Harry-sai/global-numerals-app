MAYAN_ZERO = "𝍠"  # you can replace with plain "0" or "shell" if font issues
DOT = "•"
BAR = "—"


def _digit_to_mayan(d: int) -> str:
    if d == 0:
        return MAYAN_ZERO
    bars = d // 5
    dots = d % 5
    return BAR * bars + DOT * dots


def _mayan_to_digit(chunk: str) -> int:
    if MAYAN_ZERO in chunk:
        return 0
    bars = chunk.count(BAR)
    dots = chunk.count(DOT)
    return bars * 5 + dots


def arabic_to_mayan(n: int):
    if n < 0:
        raise ValueError("Mayan here only for non-negative integers.")
    if n == 0:
        return MAYAN_ZERO, [
            {
                "step": "Zero",
                "details": f"Represent 0 as the shell sign '{MAYAN_ZERO}'.",
            }
        ]

    steps = []
    digits = []
    value = n
    pos = 0
    while value > 0:
        value, rem = divmod(value, 20)
        digits.append((pos, rem))
        steps.append(
            {
                "step": f"Compute base-20 digit at position {pos}",
                "details": f"{n} in base-20 has remainder {rem} at position {pos}.",
            }
        )
        pos += 1

    glyphs = []
    for pos, rem in reversed(digits):
        glyph = _digit_to_mayan(rem)
        glyphs.append(glyph)
        steps.append(
            {
                "step": f"Convert digit {rem} to Mayan glyph",
                "details": f"Position {pos} → '{glyph}'.",
            }
        )

    rep = " / ".join(glyphs)  # top (most significant) to bottom
    return rep, steps


def mayan_to_arabic(s: str):
    chunks = [c.strip() for c in s.split("/") if c.strip()]
    steps = []
    total = 0
    power = len(chunks) - 1
    for chunk in chunks:
        d = _mayan_to_digit(chunk)
        value = d * (20 ** power)
        total += value
        steps.append(
            {
                "step": f"Chunk '{chunk}'",
                "details": f"Digit {d} at position {power} → {d}×20^{power} = {value}. Running total {total}.",
            }
        )
        power -= 1

    return total, steps
