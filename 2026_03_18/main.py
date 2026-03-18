def z4_1(filename):
    with open(filename) as f:
        words = f.read().split()
    message = ""
    for i in range(39, len(words), 40):
        message += words[i][9]
    print(message)


def z4_2(filename):
    with open(filename) as f:
        words = f.read().split()

    result_word = ""
    result_count = 0
    for word in words:
        count = len(set(word))
        if count > result_count:
            result_count = count
            result_word = word
    print(result_word, result_count)

def z4_3(filename):
    with open(filename) as f:
        words = f.read().split()

    for word in words:
        ok = True
        for i in range(len(word)):
            for j in range(i + 1, len(word)):
                if ord(word[j]) - ord(word[i]) > 10:
                    ok = False
        if ok:
            print(word)



def main():
    z4_1("przyklad.txt")
    z4_2("przyklad.txt")
    z4_3("przyklad.txt")

if __name__ == '__main__':
    main()