from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.Banner_schema import BannerCreate, BannerOut, BannerUpdate
from app.Crud.Banners_Crud import (
    get_all_banners,
    get_banner_by_id,
    create_banner,
    update_banner,
    delete_banner,
)
from app.database import get_db

router = APIRouter(prefix="/banner", tags=["Banner"])


@router.get("/", response_model=list[BannerOut])
def get_banners(db: Session = Depends(get_db)):
    return get_all_banners(db)


@router.get("/{banner_id}", response_model=BannerOut)
def get_banner_by_id_api(banner_id: int, db: Session = Depends(get_db)):
    banner = get_banner_by_id(db, banner_id)
    if not banner:
        raise HTTPException(status_code=404, detail="Banner not found")
    return banner


@router.post("/add", response_model=BannerOut)
def create_banner_api(banner: BannerCreate, db: Session = Depends(get_db)):
    db_banner = create_banner(db, banner)
    db.commit()
    db.refresh(db_banner)
    return db_banner


@router.put("/update/{banner_id}", response_model=BannerOut)
def update_banner_api(
    banner_id: int,
    banner: BannerUpdate,
    db: Session = Depends(get_db),
):
    db_banner = update_banner(db, banner_id, banner)
    if not db_banner:
        raise HTTPException(status_code=404, detail="Banner not found")
    db.commit()
    db.refresh(db_banner)
    return db_banner


@router.delete("/{banner_id}")
def remove_banner(banner_id: int, db: Session = Depends(get_db)):
    banner = get_banner_by_id(db, banner_id)
    if not banner:
        raise HTTPException(status_code=404, detail="Banner not found")
    delete_banner(db, banner)
    db.commit()
    return {"message": "Banner deleted successfully"}
