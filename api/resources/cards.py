import logging

import falcon
from falcon.media.validators.jsonschema import validate

from api.databasehandler import DataBaseHandler, Card
from api.schemas import load_schema


class CardsResources:
    def __init__(self, db: DataBaseHandler):
        self.db = db
        self.logger = logging.getLogger(__name__)

    def on_get(self, req, resp):
        self.logger.info('received GET call')
        all_cards = self.db.get_all_cards()
        response = []
        for card in all_cards:
            response.append(card.to_json())
        resp.media = response

    @validate(load_schema('card_creation'))
    def on_post(self, req, resp):
        self.logger.info('received POST call')
        data = req.media
        card = Card(
            word_original=data.get('word_original'),
            word_meaning=data.get('word_meaning')
        )
        self.db.add_card(card)
        resp.status = falcon.HTTP_201
        resp.media = card.to_json()
