from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.user_schema import (
    UserCreate,
    UserLogin,
    UserUpdate,
    UserOut,
)
from app.Crud.User_Crud import (
    create_user,
    authenticate_user,
    get_user_by_id,
    update_user,
    get_all_users,
    delete_user,
)
from app.database import get_db

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/", response_model=list[UserOut])
def get_users(db: Session = Depends(get_db)):
    return get_all_users(db)


@router.post("/register", response_model=UserOut)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)


@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.email, user.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "user_id": db_user.id,
    }


@router.get("/{user_id}", response_model=UserOut)
def get_user_by_id_api(user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/{user_id}", response_model=UserOut)
def update_user_api(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db),
):
    updated_user = update_user(db, user_id, user)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user


@router.delete("/{user_id}")
def remove_user(user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    delete_user(db, user)
    return {"message": "User deleted successfully"}
