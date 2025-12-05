from .roman import arabic_to_roman, roman_to_arabic
from .mayan import arabic_to_mayan, mayan_to_arabic
from .chinese import arabic_to_chinese

from typing import Tuple, List, Dict


def convert_arabic(system_id: str, n: int) -> Tuple[str, List[Dict]]:
    """
    Arabic → system representation + step list.
    """
    if system_id == "roman":
        return arabic_to_roman(n)
    elif system_id == "mayan":
        return arabic_to_mayan(n)
    elif system_id == "chinese":
        return arabic_to_chinese(n)
    else:
        raise ValueError(f"Unknown system_id '{system_id}'")


def convert_to_arabic(system_id: str, rep: str) -> Tuple[int, List[Dict]]:
    """
    System representation → Arabic + step list.
    """
    if system_id == "roman":
        return roman_to_arabic(rep)
    elif system_id == "mayan":
        return mayan_to_arabic(rep)
    elif system_id == "chinese":
        # TODO: implement if needed; for now:
        raise ValueError("Chinese → Arabic not implemented yet.")
    else:
        raise ValueError(f"Unknown system_id '{system_id}'")
