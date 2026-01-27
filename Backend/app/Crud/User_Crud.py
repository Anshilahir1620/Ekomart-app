from sqlalchemy.orm import Session
from app.models.users import User
from app.schemas.user_schema import UserCreate, UserUpdate
from app.core.security import verify_password
from app.core.security import hash_password




def get_all_users(db: Session):
    return db.query(User).all()


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user: UserCreate):
    db_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role_id=2,
        status=1,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db, email, password):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    return user


def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user = get_user_by_id(db, user_id)
    if not db_user:
        return None

    for key, value in user.model_dump(exclude_unset=True).items():
        setattr(db_user, key, value)  # no hashing

    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user: User):
    db.delete(user)
    db.commit()
