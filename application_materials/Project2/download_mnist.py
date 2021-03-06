import numpy as np
from sklearn.datasets import fetch_mldata

# Step 1: download MNIST from sklearn.datasets
mnist = fetch_mldata('MNIST original', data_home=".")

X = mnist.data
y = mnist.target
print "The original MNIST has {} images, each has {} pixels".format(X.shape[0], X.shape[1])
print "The number of labes for the original MNIST is {}".format(y.shape[0])

# Step 2: pick out 100 images from each class (shrink the data)
num_of_class = 10
num_dgt_for_each_class = 100
select = []
for digit in range(num_of_class):
	num_dgt = 0
	for i in xrange(len(y)):
	  if y[i] == digit:
	    select.append(i)
	    num_dgt += 1
	    if num_dgt == num_dgt_for_each_class:
	    	break
X = X[select]
y = y[select]
print "The new MNIST has {} images, each has {} pixels".format(X.shape[0], X.shape[1])
print "The number of labes for the new MNIST is {}".format(y.shape[0])

# Step 3: save the data as numpy array
np.save("./mnist_X.npy", X)
np.save("./mnist_y.npy", y)