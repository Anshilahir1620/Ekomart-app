from pydantic import BaseModel
from typing import Optional
from datetime import datetime



class ProductCreate(BaseModel):
    product_name: str

    regular_price: Optional[float] = None
    sale_price: Optional[float] = None

    size: Optional[str] = None
    weight: Optional[float] = None
    rating: Optional[float] = None
    life: Optional[int] = None

    type: Optional[str] = None
    brand: Optional[str] = None

    nutrition_energy_kcal: Optional[float] = None
    nutrition_protein_g: Optional[float] = None
    nutrition_magnetiam_kcal: Optional[float] = None
    nutrition_calory_kcal: Optional[float] = None
    nutrition_vitamine_kcal: Optional[float] = None
    stock:int
    sku: Optional[str] = None
    category: Optional[str] = None
    subcategory_id: Optional[int] = None

    tag: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None


class ProductOut(BaseModel):
    id: int
    product_name: str
    regular_price: Optional[float]
    sale_price: Optional[float]
    size: Optional[str]
    weight: Optional[float]
    life: Optional[int]

    rating: Optional[float]
    stock: int

    type: Optional[str]
    brand: Optional[str]

    category: Optional[str]
    subcategory_id: Optional[int]

    tag: Optional[str]
    description: Optional[str]
    image: Optional[str]

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProductUpdate(BaseModel):
    product_name: Optional[str] = None
    regular_price: Optional[float] = None
    sale_price: Optional[float] = None
    stock: Optional[int] = None
    description: Optional[str] = None
    image: Optional[str] = None

    class Config:
        from_attributes = True
