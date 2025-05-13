import matplotlib.pyplot as plt
import matplotlib.animation as animation
import numpy as np

# Network structure: 3 input, 4 hidden, 2 output
layers = [3, 4, 2]
layer_positions = [1, 3, 5]
node_radius = 0.2

def draw_network(ax, activations=None):
    ax.clear()
    ax.axis('off')
    ax.set_xlim(0, 6)
    ax.set_ylim(0, 6)
    # Draw nodes
    for l, (n_nodes, x) in enumerate(zip(layers, layer_positions)):
        y_positions = np.linspace(1, 5, n_nodes)
        for i, y in enumerate(y_positions):
            color = "#007BFF" if activations and activations[l][i] else "#e0e0e0"
            circle = plt.Circle((x, y), node_radius, color=color, ec="#333", zorder=3)
            ax.add_patch(circle)
            if l == 0:
                ax.text(x-0.5, y, f"In {i+1}", va="center", fontsize=8)
            elif l == len(layers)-1:
                ax.text(x+0.5, y, f"Out {i+1}", va="center", fontsize=8)
    # Draw edges
    for l in range(len(layers)-1):
        x0, x1 = layer_positions[l], layer_positions[l+1]
        y0s = np.linspace(1, 5, layers[l])
        y1s = np.linspace(1, 5, layers[l+1])
        for i, y0 in enumerate(y0s):
            for j, y1 in enumerate(y1s):
                color = "#007BFF" if activations and activations[l][i] and activations[l+1][j] else "#aaa"
                ax.plot([x0, x1], [y0, y1], color=color, lw=1, zorder=1)

# Prepare activations for animation
frames = []
for step in range(3):
    acts = [np.zeros(n, dtype=bool) for n in layers]
    if step == 0:
        acts[0][:] = True  # Input layer active
    elif step == 1:
        acts[0][:] = True
        acts[1][:] = True  # Hidden layer active
    elif step == 2:
        acts[0][:] = True
        acts[1][:] = True
        acts[2][:] = True  # Output layer active
    frames.append(acts)

fig, ax = plt.subplots(figsize=(6, 6))

def animate(i):
    draw_network(ax, frames[i])
    ax.set_title("Neural Network Forward Pass Step {}".format(i+1), fontsize=14)

ani = animation.FuncAnimation(fig, animate, frames=len(frames), interval=1000, repeat_delay=2000)
ani.save("neural_network_simulation.gif", writer="pillow")
plt.close()
