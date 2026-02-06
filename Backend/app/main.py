from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models.users import User
from app.models.roles import Role
from app.models.brands import Brand
from app.models.banners import Banner
from app.models.categories import Category
from app.models.products import Product
from app.models.subcategories import SubCategory

from app.api.user import router as user_router
from app.api.Categories import router as category_router
from app.api.Subcategories import router as subcategory_router
from app.api.Brand import router as brand_router
from app.api.Banners import router as banner_router
from app.api.Products import router as product_router
from app.api.Roles import router as roles_router
from app.api.auth import router as auth_router


Base.metadata.create_all(bind=engine)

app = FastAPI(title="My Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"

    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(category_router)
app.include_router(subcategory_router)
app.include_router(brand_router)
app.include_router(banner_router)
app.include_router(product_router)
app.include_router(roles_router)
app.include_router(auth_router)



# /// cd E:\Ekomart\Backend\ venv\Scripts\activate
# python -m uvicorn app.main:app --reload
