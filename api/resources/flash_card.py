import logging

from api.databasehandler import DataBaseHandler


class FlashCardResource:
    def __init__(self, db: DataBaseHandler):
        self.db = db
        self.logger = logging.getLogger(__name__)

    def on_get(self, req, resp):
        self.logger.debug(f'received GET call {req} flash cards')
        card = self.db.get_card_latest_used()
        resp.media = card.to_json()

    # @validate(load_schema('card_creation'))
    # def on_post(self, req, resp):
    #     self.logger.debug(f'received POST call {req} for flash card')
    #     data = req.media
    #     card = Card(
    #         word_original=data.get('word_original'),
    #         word_meaning=data.get('word_meaning')
    #     )
    #     self.db.add_card(card)
    #     resp.status = falcon.HTTP_201
    #     resp.media = card.to_json()
