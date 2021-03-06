import logging
from datetime import datetime

import falcon.response
from falcon.media.validators.jsonschema import validate

from api.databasehandler import DataBaseHandler, Card
from api.schemas import load_schema


class CardResource:
    def __init__(self, db: DataBaseHandler):
        self.db = db
        self.logger = logging.getLogger(__name__)

    def on_get(self, req, resp, card_id):
        self.logger.debug(f'received GET call for {card_id}')
        card = self.db.get_card_by_id(card_id)
        resp.media = card.to_json()

    @validate(load_schema('card_update'))
    def on_put(self, req, resp, card_id):
        self.logger.debug(f'received PUT call for {card_id}')
        data = req.media
        card = Card(
            id=data.get('id'),
            word_original=data.get('word_original'),
            word_meaning=data.get('word_meaning'),
            counter=data.get('counter'),
            counter_incorrect=data.get('counter_incorrect'),
        )
        if data.get('update_last_visit'):
            card.last_visit = datetime.now()
        updated_card = self.db.update_card(card)
        resp.media = updated_card.to_json()

    def on_delete(self, req, resp, card_id):
        self.logger.debug(f'received DELETE call for {card_id}')
        self.db.delete_card(card_id)
        resp.status = falcon.HTTP_200
