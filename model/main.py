import torch
import torchvision
import torchvision.transforms as transforms

import matplotlib.pyplot as plt

import numpy as np
import json

N = 10000
pad = 2
OUT_PATH = './model/weights.json'
EXAMPLES_PATH = './model/examples.json'

# Download training data
train_dataset = torchvision.datasets.MNIST(
    root='./model/data',
    train=True,
    download=True,
)

# create inside/outside mask
mask = np.ones(((28-2*pad)//2, (28-2*pad)//2), dtype=bool)
mask[4:-4, 4:-4] = False
mask = mask.flatten()

# convert data to numpy and reformat
numpy_data = np.array([
    np.array(train_dataset[i][0])[pad:-pad, pad:-pad] for i in range(N)
], dtype=np.float32)
numpy_data = 0.5 * (numpy_data[:,::2,::2]+ numpy_data[:,1::2,::2]+ numpy_data[:,1::2,1::2]+ numpy_data[:,::2,1::2]) / 255.0 - 1
numpy_data = numpy_data.reshape(N, -1)

# mask to create X and Y
X = numpy_data[:, mask]
Y = numpy_data[:, ~mask]

# fit linear model
XTX = X.T @ X
XTXM1 = np.linalg.inv(XTX)
XTY = X.T @ Y
B = XTXM1 @ XTY

# save as json
with open(OUT_PATH, 'w') as f:
    json.dump(B.T.tolist(), f)

# save some examples
with open(EXAMPLES_PATH, 'w') as f:
    json.dump((numpy_data[:20]>-0.2).tolist(), f)

# plot some examples
for i in range(5):
    plt.subplot(5, 2, i*2+1)
    plt.imshow(numpy_data[i].reshape(12, 12), cmap='gray')
    plt.axis('off')

    plt.subplot(5, 2, i*2+2)
    original = numpy_data[i].copy()
    original[~mask] = 0

    predicted = numpy_data[i].copy()
    predicted[~mask] = numpy_data[i][mask] @ B

    new = np.stack([original, predicted, predicted], axis=-1)
    plt.imshow(new.reshape(12, 12, 3)*0.5 + 0.5, cmap='gray')
    plt.axis('off')
plt.savefig('./model/examples.png')