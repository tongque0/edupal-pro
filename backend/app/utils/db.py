from typing import TypeVar, Generic, Type, List, Optional
from sqlmodel import SQLModel, Session, select
from datetime import datetime, timezone

T = TypeVar("T", bound=SQLModel)


class BaseService(Generic[T]):
    model: Type[T]

    def __init__(self, model: Type[T]):
        self.model = model

    def get_all(self, db: Session) -> List[T]:
        stmt = select(self.model).where(self.model.is_deleted == False)
        return db.exec(stmt).all()

    def get_by_id(self, db: Session, id_: int) -> Optional[T]:
        stmt = select(self.model).where(
            self.model.id == id_, self.model.is_deleted == False
        )
        return db.exec(stmt).first()

    def create(self, db: Session, obj: T) -> T:
        now = datetime.now(timezone.utc)
        obj.created_at = now
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

    def update(self, db: Session, obj: T, data: dict) -> T:
        for key, value in data.items():
            setattr(obj, key, value)
        obj.updated_at = datetime.now(timezone.utc)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

    def soft_delete(self, db: Session, obj: T) -> None:
        obj.is_deleted = True
        obj.deleted_at = datetime.now(timezone.utc)
        db.add(obj)
        db.commit()
