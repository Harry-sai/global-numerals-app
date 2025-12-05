from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class NumeralExample(BaseModel):
    arabic: int
    representation: str
    explanation: Optional[str] = None


class NumeralSystem(BaseModel):
    id: str
    name: str
    region: str
    base: Optional[int] = None
    description: str
    morphology: str
    construction_rules: str
    recursive_logic: Optional[str] = None
    cultural_context: str
    examples: List[NumeralExample]


class ConversionRequest(BaseModel):
    system_id: str
    arabic: Optional[int] = None
    representation: Optional[str] = None


class ConversionStep(BaseModel):
    step: str
    details: str


class ConversionResponse(BaseModel):
    system_id: str
    direction: str  # "arabic_to_system" or "system_to_arabic"
    input_value: str
    output_value: str
    steps: List[ConversionStep]


class Puzzle(BaseModel):
    id: str
    system_id: str
    title: str
    difficulty: str
    prompt: str
    hints: List[str]
    solution_explanation: str
    # For auto-checking: expected answer patterns
    answer_type: str  # "arabic", "representation", "mapping"
    expected: Any


class CheckPuzzleRequest(BaseModel):
    answer: Any


class CheckPuzzleResponse(BaseModel):
    correct: bool
    feedback: str
    expected: Any
