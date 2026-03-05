from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import Base,get_db
from app.schemas.Cart_schema import CartItemCreate, CartOut
from app.Crud.Cart_Crud import (
    get_or_create_cart,
    add_to_cart
)
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/cart", tags=["Cart"])


@router.get("/me", response_model=CartOut)
def get_my_cart(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    return get_or_create_cart(db, current_user.id)


@router.post("/add", response_model=CartOut)
def add_item_to_cart(
    cart_item: CartItemCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):

    cart = get_or_create_cart(db, current_user.id)

    return add_to_cart(db, cart.id, cart_item)