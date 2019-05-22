from databasehandler import DataBaseHandler, Card


def main():
    db = DataBaseHandler()
    vo = Card(word_original='hej', word_meaning='hello', counter=0, counter_incorrect=0)
    db.add_vocab(vo)
    all_words = db.get_all_words()
    [print(word) for word in all_words]


if __name__ == '__main__':
    main()
