import logging
import os
from wsgiref import simple_server

import falcon

from api.databasehandler import DataBaseHandler, Card
from api.logs.setup import setup_logging
from api.resources.card import CardResource
from api.resources.cards import CardsResources
from api.resources.flash_card import FlashCardResource

logger = logging.getLogger(__name__)
CWD = os.path.dirname(os.path.realpath(__file__))
HOST = '127.0.0.1'
PORT = 8000


def test(db: DataBaseHandler):
    # TODO remove later
    card = Card(word_original='hej', word_meaning='hello')
    db.add_card(card)
    card2 = Card(word_original='jätte', word_meaning='gigantic')
    db.add_card(card2)
    all_words = db.get_all_cards()
    [print(word) for word in all_words]


def main():
    setup_logging()
    logger.info('Starting the app')

    db = DataBaseHandler()
    build_directory = os.path.join(CWD, 'ui/build')
    index_file = os.path.join(build_directory, 'index.html')
    static_files = os.path.join(build_directory, 'static')

    # test(db)
    card_resource = CardResource(db)
    cards_resource = CardsResources(db)
    flash_card_resource = FlashCardResource(db)
    app = falcon.API()
    app.add_static_route('/', build_directory, fallback_filename=index_file)
    app.add_static_route('/static', static_files)
    app.add_route('/api/cards', cards_resource)
    app.add_route('/api/card/{card_id}', card_resource)
    app.add_route('/api/flashcard', flash_card_resource)
    logger.info('Setup is completed!')

    httpd = simple_server.make_server(HOST, PORT, app)
    httpd.serve_forever()


if __name__ == '__main__':
    main()
