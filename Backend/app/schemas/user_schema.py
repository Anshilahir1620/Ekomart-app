from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    name: Optional[str] = None
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    mobile: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    address: Optional[str] = None
    profile_photo: Optional[str] = None

    
class UserOut(BaseModel):
    id: int
    name: Optional[str]
    email: str
    role_id: int
    mobile: Optional[str]
    city: Optional[str]
    state: Optional[str]
    pincode: Optional[str]
    address: Optional[str]
    profile_photo: Optional[str]
    status: int

    class Config:
        from_attributes = True
