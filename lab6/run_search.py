from dataclasses import dataclass
import pickle
import numpy as np
from tqdm import tqdm
from datasets import load_dataset
import scipy.sparse.linalg as sln


dataset_dict = load_dataset("wikipedia", "20220301.simple")
dataset = dataset_dict['train']
DOCUMENT_COUNT = 2000


@dataclass
class Article:
    title: str
    url: str
    close: float


def similarity_metric_1(q, matrix, i):
    return (matrix.getrow(i).dot(q[0]) / sln.norm(matrix.getrow(i)))[0]


def search(query, metric=similarity_metric_1, k=10):
    with open("tokenizer_2K", "rb") as d:
        tokenizer = pickle.load(d)

    with open("vTBD_matrix_IDF_2K", "rb") as d:
        matrix = pickle.load(d)

    cos = []
    q = tokenizer.texts_to_matrix([query], mode="binary")
    q_norm = np.linalg.norm(q[0])
    q = q / max(q_norm, 1)

    for i in tqdm(range(DOCUMENT_COUNT)):
        cos.append(metric(q, matrix, i))

    top_k = np.argsort(cos)[-k:][::-1]
    return [
        Article(
            title=dataset[int(i)]['title'],
            close=cos[int(i)],
            url=dataset[int(i)]['url']) for i in top_k
    ]


# search("roman", similarity_metric_1)
