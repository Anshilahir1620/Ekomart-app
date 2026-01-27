from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.category_schema import CategoryCreate, CategoryOut, CategoryUpdate
from app.Crud.Categories_Crud import (
    get_all_categories,
    get_category_by_id,
    create_category,
    update_category,
    delete_category,
)
from app.database import get_db

router = APIRouter(prefix="/category", tags=["Category"])


@router.get("/", response_model=list[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    return get_all_categories(db)


@router.get("/{category_id}", response_model=CategoryOut)
def get_category_by_id_api(category_id: int, db: Session = Depends(get_db)):
    category = get_category_by_id(db, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.post("/add", response_model=CategoryOut)
def insert_category(category: CategoryCreate, db: Session = Depends(get_db)):
    return create_category(db, category)


@router.put("/update/{category_id}", response_model=CategoryOut)
def update_category_api(
    category_id: int,
    category: CategoryUpdate,
    db: Session = Depends(get_db),
):
    updated_category = update_category(db, category_id, category)
    if not updated_category:
        raise HTTPException(status_code=404, detail="Category not found")
    return updated_category


@router.delete("/{category_id}")
def remove_category(category_id: int, db: Session = Depends(get_db)):
    category = get_category_by_id(db, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    delete_category(db, category)
    return {"message": "Category deleted successfully"}
