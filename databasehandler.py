from datetime import datetime

from sqlalchemy import create_engine, Column, Integer, Sequence, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


class Card(Base):
    __tablename__ = 'cards'
    id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    word_original = Column(String(250), nullable=False)
    word_meaning = Column(String(250), nullable=False)
    counter = Column(Integer, nullable=False)
    counter_incorrect = Column(Integer, nullable=False)
    last_visit = Column(DateTime, nullable=False)

    def __repr__(self) -> str:
        return self.__dict__.__str__()


class DataBaseHandler:
    DB_FILE = 'vocab.db'

    def __init__(self, file_name=DB_FILE):
        engine = create_engine(f'sqlite:///{file_name}', echo=True)
        Base.metadata.create_all(engine)
        self.session = sessionmaker(bind=engine)

    def add_vocab(self, card_entity: Card):
        session = self.session()
        card_entity.last_visit = datetime.now()
        session.add(card_entity)
        session.commit()

    def get_all_words(self):
        session = self.session()
        return session.query(Card).order_by(Card.last_visit.desc()).all()