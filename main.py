from databasehandler import DataBaseHandler, Card
import logging
from wsgiref import simple_server

import falcon

from logs.setup import setup_logging
from resources.word import WordResources, WordsResources

logger = logging.getLogger(__name__)


def test(db):
    vo = Card(word_original='hej', word_meaning='hello', counter=0, counter_incorrect=0)
    db.add_vocab(vo)
    all_words = db.get_all_words()
    [print(word) for word in all_words]


def main():
    setup_logging()
    db = DataBaseHandler()
    test(db)
    word_resource = WordResources(db)
    words_resource = WordsResources(db)
    app = falcon.API()
    app.add_route('/api/words', words_resource)
    app.add_route('/api/word/{word_id}', word_resource)
    logger.info('Starting the app')

    httpd = simple_server.make_server('127.0.0.1', 8000, app)
    httpd.serve_forever()


if __name__ == '__main__':
    main()
