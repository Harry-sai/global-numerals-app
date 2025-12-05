ROMAN_DIGITS = [
    (1000, "M"),
    (900, "CM"),
    (500, "D"),
    (400, "CD"),
    (100, "C"),
    (90, "XC"),
    (50, "L"),
    (40, "XL"),
    (10, "X"),
    (9, "IX"),
    (5, "V"),
    (4, "IV"),
    (1, "I"),
]


def arabic_to_roman(n: int):
    if not (0 < n < 4000):
        raise ValueError("Roman converter here supports 1–3999 only.")

    result = []
    steps = []
    remaining = n

    for value, symbol in ROMAN_DIGITS:
        count = remaining // value
        if count > 0:
            result.append(symbol * count)
            steps.append(
                {
                    "step": f"Use {symbol}",
                    "details": f"Take {count} × {value} from {remaining}, append '{symbol * count}'.",
                }
            )
            remaining = remaining % value

    return "".join(result), steps


def roman_to_arabic(s: str):
    s = s.upper()
    value_map = {sym: val for val, sym in ROMAN_DIGITS}
    i = 0
    total = 0
    steps = []

    while i < len(s):
        # Try two-character symbol
        if i + 1 < len(s) and s[i : i + 2] in value_map:
            sym = s[i : i + 2]
            val = value_map[sym]
            total += val
            steps.append(
                {
                    "step": f"Read '{sym}'",
                    "details": f"Add {val}, total = {total}.",
                }
            )
            i += 2
        else:
            sym = s[i]
            if sym not in value_map:
                raise ValueError(f"Invalid Roman symbol '{sym}'")
            val = value_map[sym]
            total += val
            steps.append(
                {
                    "step": f"Read '{sym}'",
                    "details": f"Add {val}, total = {total}.",
                }
            )
            i += 1

    return total, steps
