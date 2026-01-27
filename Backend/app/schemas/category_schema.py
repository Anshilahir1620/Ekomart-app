from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CategoryCreate(BaseModel):
    name: str
    slug: Optional[str] = None

class CategoryOut(BaseModel):
    id: int
    name: str
    slug: str | None
    status: int
    created_at: datetime

    class Config:
        from_attributes = True

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    status: Optional[int] = None
