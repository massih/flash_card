import logging

import falcon.response
from falcon.media.validators.jsonschema import validate

from databasehandler import DataBaseHandler
from schemas import load_schema


class CardResource:
    def __init__(self, db: DataBaseHandler):
        self.db = db
        self.logger = logging.getLogger(__name__)

    def on_get(self, req, resp, card_id):
        self.logger.info(f'received GET call for {card_id}')
        card = self.db.get_card_by_id(card_id)
        resp.media = card.to_json()

    def on_put(self, req, resp, card_id):
        self.logger.info(f'received PUT call for {card_id}')
        pass

    def on_delete(self, req, resp, card_id):
        self.logger.info(f'received DELETE call for {card_id}')
        self.db.delete_card(card_id)
        resp.status = falcon.HTTP_200


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
        self.logger.info(all_cards)
        resp.media = response
        pass

    @validate(load_schema('card_creation'))
    def on_post(self, req, resp):
        self.logger.info('received POST call')
        print(req.media)
