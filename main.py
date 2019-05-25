from databasehandler import DataBaseHandler, Card
import logging
from wsgiref import simple_server

import falcon

from logs.setup import setup_logging
from resources.card import CardsResources, CardResource

logger = logging.getLogger(__name__)


def test(db: DataBaseHandler):
    # TODO remove later
    card = Card(word_original='hej', word_meaning='hello', counter=0, counter_incorrect=0)
    db.add_card(card)
    all_words = db.get_all_cards()
    [print(word) for word in all_words]


def main():
    setup_logging()
    db = DataBaseHandler()
    # test(db)
    card_resource = CardResource(db)
    cards_resource = CardsResources(db)
    app = falcon.API()
    app.add_route('/api/cards', cards_resource)
    app.add_route('/api/card/{card_id}', card_resource)
    logger.info('Starting the app')

    httpd = simple_server.make_server('127.0.0.1', 8000, app)
    httpd.serve_forever()


if __name__ == '__main__':
    main()
