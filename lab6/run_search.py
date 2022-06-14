import pickle
import numpy as np
from tqdm import tqdm
from datasets import load_dataset
import scipy.sparse.linalg as sln



dataset_dict = load_dataset("wikipedia", "20220301.simple")
dataset = dataset_dict['train']
DOCUMENT_COUNT = 2000

def similarity_metric_1(q, matrix, i):
    return (matrix.getrow(i).dot(q[0]) / sln.norm(matrix.getrow(i)))[0]


def search(query, metric , k=10):
    with open("tokenizer_2K", "rb") as d:
        tokenizer = pickle.load(d)

    with open("vTBD_matrix_IDF_2K", "rb") as d:
        matrix = pickle.load(d)

    cos = []
    q = tokenizer.texts_to_matrix([query], mode="binary")
    q_norm = np.linalg.norm(q[0])
    q = q / q_norm

    for i in tqdm(range(DOCUMENT_COUNT)):
        cos.append(metric(q, matrix, i))

    # top_k = np.argpartition(cos, -k)[-k:]
    top_k = np.argsort(cos)[-k:][::-1]
    for i in top_k:
        print("Title: {:<35} close: {:<20} url: {:<34}".format(dataset[int(i)]['title'], cos[int(i)], dataset[int(i)]['url']))


search("roman", similarity_metric_1)