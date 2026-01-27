from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.Products_schema import ProductCreate, ProductOut, ProductUpdate
from app.Crud.Products_Crud import (
    get_all_products,
    get_product_by_id,
    create_product,
    update_product,
    delete_product,
)
from app.database import get_db

router = APIRouter(prefix="/product", tags=["Product"])


@router.get("/", response_model=list[ProductOut])
def get_products(db: Session = Depends(get_db)):
    return get_all_products(db)


@router.get("/{product_id}", response_model=ProductOut)
def get_product_by_id_api(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("/add", response_model=ProductOut)
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, product)


@router.put("/update/{product_id}", response_model=ProductOut)
def update_product_api(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
):
    updated_product = update_product(db, product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product


@router.delete("/{product_id}")
def remove_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    delete_product(db, product)
    return {"message": "Product deleted successfully"}
