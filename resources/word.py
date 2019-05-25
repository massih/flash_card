import logging


class WordResources:
    def __init__(self, db):
        self.db = db
        self.logger = logging.getLogger(__name__)

    def on_get(self, req, resp, word_id):
        self.logger.info(f'received GET call for {word_id}')
        pass

    def on_put(self, req, resp, word_id):
        self.logger.info(f'received PUT call for {word_id}')
        pass

    def on_delete(self, req, resp, word_id):
        self.logger.info(f'received DELETE call for {word_id}')
        pass


class WordsResources:
    def __init__(self, db):
        self.db = db
        self.logger = logging.getLogger(__name__)

    def on_get(self, req, resp):
        self.logger.info('received GET call')
        pass

    def on_put(self, req, resp):
        self.logger.info('received PUT call')
        pass
