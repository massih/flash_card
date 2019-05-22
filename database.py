from sqlalchemy import create_engine, Column, Integer, Sequence, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


class Vocab(Base):
    __tablename__ = 'vocab'
    id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    word_swd = Column(String(250), nullable=False)
    word_eng = Column(String(250), nullable=False)
    counter = Column(Integer, nullable=False)
    counter_incorrect = Column(Integer, nullable=False)

    def __repr__(self) -> str:
        return self.__dict__.__str__()


class DataBase:
    DB_FILE = 'vocab.db'

    def __init__(self, file_name=DB_FILE):
        engine = create_engine(f'sqlite:///{file_name}', echo=True)
        Base.metadata.create_all(engine)
        self.session = sessionmaker(bind=engine)

    def add_vocab(self, vocab_entity):
        session = self.session()
        session.add(vocab_entity)
        session.commit()
