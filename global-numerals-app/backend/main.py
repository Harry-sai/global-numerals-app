from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import json
import os

from models import (
    NumeralSystem,
    ConversionRequest,
    ConversionResponse,
    ConversionStep,
    Puzzle,
    CheckPuzzleRequest,
    CheckPuzzleResponse,
)
from converters import convert_arabic, convert_to_arabic

app = FastAPI(title="Global Numeral Systems API")

# CORS for frontend during dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "data")

with open(os.path.join(DATA_DIR, "numeral_systems.json"), "r", encoding="utf-8") as f:
    SYSTEMS_RAW = json.load(f)
SYSTEMS = [NumeralSystem(**s) for s in SYSTEMS_RAW]
SYSTEM_MAP = {s.id: s for s in SYSTEMS}

with open(os.path.join(DATA_DIR, "puzzles.json"), "r", encoding="utf-8") as f:
    PUZZLES_RAW = json.load(f)
PUZZLES = [Puzzle(**p) for p in PUZZLES_RAW]
PUZZLE_MAP = {p.id: p for p in PUZZLES}


@app.get("/api/systems", response_model=List[NumeralSystem])
def list_systems():
    return SYSTEMS


@app.get("/api/systems/{system_id}", response_model=NumeralSystem)
def get_system(system_id: str):
    system = SYSTEM_MAP.get(system_id)
    if not system:
        raise HTTPException(status_code=404, detail="System not found")
    return system


@app.post("/api/convert", response_model=ConversionResponse)
def convert(req: ConversionRequest):
    if req.system_id not in SYSTEM_MAP:
        raise HTTPException(status_code=404, detail="System not found")

    if req.arabic is not None and req.representation is not None:
        raise HTTPException(
            status_code=400,
            detail="Provide either 'arabic' or 'representation', not both.",
        )

    if req.arabic is None and req.representation is None:
        raise HTTPException(
            status_code=400,
            detail="Provide one of 'arabic' or 'representation'.",
        )

    try:
        if req.arabic is not None:
            rep, steps_raw = convert_arabic(req.system_id, req.arabic)
            steps = [ConversionStep(**s) for s in steps_raw]
            return ConversionResponse(
                system_id=req.system_id,
                direction="arabic_to_system",
                input_value=str(req.arabic),
                output_value=rep,
                steps=steps,
            )
        else:
            value, steps_raw = convert_to_arabic(req.system_id, req.representation)
            steps = [ConversionStep(**s) for s in steps_raw]
            return ConversionResponse(
                system_id=req.system_id,
                direction="system_to_arabic",
                input_value=req.representation,
                output_value=str(value),
                steps=steps,
            )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/puzzles", response_model=List[Puzzle])
def list_puzzles():
    return PUZZLES


@app.get("/api/puzzles/{puzzle_id}", response_model=Puzzle)
def get_puzzle(puzzle_id: str):
    p = PUZZLE_MAP.get(puzzle_id)
    if not p:
        raise HTTPException(status_code=404, detail="Puzzle not found")
    return p


@app.post("/api/puzzles/{puzzle_id}/check", response_model=CheckPuzzleResponse)
def check_puzzle(puzzle_id: str, req: CheckPuzzleRequest):
    p = PUZZLE_MAP.get(puzzle_id)
    if not p:
        raise HTTPException(status_code=404, detail="Puzzle not found")

    given = req.answer
    expected = p.expected

    correct = False

    if p.answer_type == "arabic":
        try:
            correct = int(given) == int(expected)
        except Exception:
            correct = False
    elif p.answer_type == "representation":
        if isinstance(given, str):
            correct = given.strip().upper() == str(expected).strip().upper()
    elif p.answer_type == "mapping":
        # naive deep equality for now
        correct = given == expected
    else:
        correct = False

    feedback = (
        "Correct! 🎉"
        if correct
        else "Not quite. Re-read the pattern and compare carefully to the examples."
    )

    return CheckPuzzleResponse(
        correct=correct, feedback=feedback, expected=expected
    )
