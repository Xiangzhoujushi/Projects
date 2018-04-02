import numpy as np
import random
from math import sqrt
import matplotlib.pyplot as plt
import matplotlib.image as img

# Step 1: loading MNIST data
X = np.load('./mnist_X.npy')
y = np.load('./mnist_y.npy')
dim = int(sqrt(X.shape[1]))
print "MNIST has {} images, each has {} pixels".format(X.shape[0], X.shape[1]) 
print "The size of each image is {}x{}".format(dim, dim)

# Step 2: Data Verificiation: randomly pick one digit and vis it

for idx in  range(X.shape[0]):
# print "The id of the current image is {}, its label is {}".format(idx, int(y[idx]))
	dgt = X[idx, :].reshape(dim, dim)
	plt.imshow(dgt.astype(np.uint8), cmap='gray')
	# save image
	filename = "pictures/img"+str(idx)+".png"
	plt.savefig(filename)
# img.imsave('pciture.png', dgt.astype(np.uint8))
	# plt.show()