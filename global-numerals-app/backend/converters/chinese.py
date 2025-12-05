CHINESE_DIGITS = {
    0: "零",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
}
UNITS = ["", "十", "百", "千"]


def arabic_to_chinese(n: int):
    if not (0 <= n < 10000):
        raise ValueError("This simplified converter supports 0–9999.")
    if n == 0:
        return CHINESE_DIGITS[0], [
            {
                "step": "Zero",
                "details": f"Represent 0 as '{CHINESE_DIGITS[0]}'.",
            }
        ]

    steps = []
    parts = []
    num_str = str(n)
    length = len(num_str)
    zero_flag = False

    for i, ch in enumerate(num_str):
        digit = int(ch)
        pos = length - i - 1
        unit = UNITS[pos]

        if digit == 0:
            zero_flag = True
            continue

        if zero_flag:
            parts.append(CHINESE_DIGITS[0])
            steps.append(
                {
                    "step": "Insert 零",
                    "details": "Zero between non-zero digits is written as 零.",
                }
            )
            zero_flag = False

        parts.append(CHINESE_DIGITS[digit] + unit)
        steps.append(
            {
                "step": f"Digit {digit} at 10^{pos}",
                "details": f"Write '{CHINESE_DIGITS[digit] + unit}'.",
            }
        )

    rep = "".join(parts)
    # Special: "一十X" often shortened to "十X"
    if rep.startswith("一十") and n >= 10 and n < 20:
        steps.append(
            {
                "step": "Simplify 一十 to 十",
                "details": "For numbers 10–19, leading 一 in 一十 is often omitted.",
            }
        )
        rep = rep[1:]

    return rep, steps
