import numpy as np
import matplotlib.pyplot as plt
import matplotlib.colors
from sklearn.decomposition import PCA
import pandas as pd

# Step 1: load MNIST data (the smaller version)
X = np.load('./mnist_X.npy')
y = np.load('./mnist_y.npy')

# Step 2: layout the data with t-SNE
X_PCA = PCA(n_components=1).fit_transform(X)
print "The {} dims images have be projected to {}D space".format(X.shape[1], X_PCA.shape[1])

# Step 3: visualize with scatterplot (do this in D3)
color = ['black', 'red', 'green', 'blue', 'gold', 
		'purple','deeppink', 'orchid', 'teal', 'yellow']
label = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
fig, ax = plt.subplots()
# declare the pandas column names
X_columns = ['x_coord']
# ignore the index
df1 = pd.DataFrame(X_PCA,columns=X_columns)

color_list = []
label_list = []
for i in range(len(label)):
	# each digit has 100 images in the smaller version MNIST (sorted in order)
    # ax.scatter(X_2D[i*100:(i+1)*100,0], X_2D[i*100:(i+1)*100:,1], 
    # 	c=color[i], label=label[i], alpha=0.3, edgecolors='none')
    for j in range(100):
    	color_list.append(color[i])
    	label_list.append(label[i])

df2 = pd.DataFrame({'color' : color_list, 'label': label_list})
df3 = df1.join(df2)
df3.to_csv('PCA_coords.csv',index = False)
# store all the data into a csv file.

# ax.legend()
# plt.show()