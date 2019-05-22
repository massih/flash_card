from database import DataBase, Vocab


def main():
    db = DataBase()
    vo = Vocab(word_swd='hej', word_eng='hello', counter=0, counter_incorrect=0)
    db.add_vocab(vo)


if __name__ == '__main__':
    main()
