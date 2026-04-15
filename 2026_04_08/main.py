AdjacencyList = list[list[int]]
AdjacencyMatrix = list[list[int]]


def read_graph(filename: str) -> tuple[AdjacencyList, int]:
    with open(filename, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip()]

    n: int = int(lines[0])
    adjacency_list: AdjacencyList = [[] for _ in range(n)]

    for line in lines[1:]:
        numbers: list[int] = list(map(int, line.split()))
        if not numbers:
            continue
        vertex: int = numbers[0]
        neighbours: list[int] = numbers[1:]
        adjacency_list[vertex] = neighbours

    return adjacency_list, n


def write_neighbours_list(adjacency_list: AdjacencyList) -> None:
    print("=== Lista sąsiedztwa ===")
    for vertex, neighbours in enumerate(adjacency_list):
        if neighbours:
            neighbours_str: str = ", ".join(map(str, neighbours))
            print(f"Sąsiadami wierzchołka {vertex} są: {neighbours_str}")
        else:
            print(f"Wierzchołek {vertex} nie ma sąsiadów")
    print()


def list_to_matrix(adjacency_list: AdjacencyList) -> AdjacencyMatrix:
    n: int = len(adjacency_list)
    matrix: AdjacencyMatrix = [[0] * n for _ in range(n)]

    for vertex, neighbours in enumerate(adjacency_list):
        for neighbour in neighbours:
            matrix[vertex][neighbour] = 1

    return matrix


def write_matrix(matrix: AdjacencyMatrix) -> None:
    n: int = len(matrix)
    print("=== Macierz sąsiedztwa ===")

    # Nagłówek kolumn
    header: str = "   " + "".join(f"{j:3}" for j in range(n))
    print(header)
    print("   " + "---" * n)

    # Wiersze macierzy
    for i, row in enumerate(matrix):
        row_str: str = f"{i:2} |" + "".join(f"{val:3}" for val in row)
        print(row_str)
    print()


def main() -> None:
    filename: str = "graph.txt"

    print(f"Wczytywanie grafu z pliku: {filename}\n")
    adjacency_list, n = read_graph(filename)
    print(f"Liczba wierzchołków: {n}\n")

    write_neighbours_list(adjacency_list)

    matrix: AdjacencyMatrix = list_to_matrix(adjacency_list)
    write_matrix(matrix)


if __name__ == "__main__":
    main()