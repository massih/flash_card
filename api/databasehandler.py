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
    counter = Column(Integer, nullable=False, default=0)
    counter_incorrect = Column(Integer, nullable=False, default=0)
    last_visit = Column(DateTime, nullable=False)

    def __repr__(self) -> str:
        return self.__dict__.__str__()

    def to_json(self):
        return {
            'id': self.id,
            'word_original': self.word_original,
            'word_meaning': self.word_meaning,
            'counter': self.counter,
            'counter_incorrect': self.counter_incorrect,
            'last_visit': self.last_visit.__str__()
        }


class DataBaseHandler:
    DB_FILE = 'vocab.db'

    def __init__(self, file_name=DB_FILE):
        engine = create_engine(f'sqlite:///{file_name}', echo=False)
        Base.metadata.create_all(engine)
        self.session = sessionmaker(bind=engine)

    def add_card(self, card_entity: Card):
        session = self.session()
        card_entity.last_visit = datetime.now()
        session.add(card_entity)
        session.commit()
        return card_entity

    def get_all_cards(self) -> [Card]:
        session = self.session()
        return session.query(Card).order_by(Card.last_visit.desc()).all()

    def get_card_by_id(self, card_id) -> Card:
        session = self.session()
        return session.query(Card).get(card_id)

    def delete_card(self, card_id):
        session = self.session()
        session.query(Card).filter(Card.id == card_id).delete()
        session.commit()

    def update_card(self, card):
        session = self.session()
        current_card = session.query(Card).get(card.id)
        current_card.word_original = card.word_original
        current_card.word_meaning = card.word_meaning
        current_card.counter = card.counter
        current_card.counter_incorrect = card.counter_incorrect
        current_card.last_visit = card.last_visit
        session.add(current_card)
        session.commit()
        return current_card
