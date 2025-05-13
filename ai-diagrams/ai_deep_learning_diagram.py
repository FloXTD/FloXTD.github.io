import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, ArrowStyle

def draw_box(ax, xy, text, boxstyle="round,pad=0.3", color="#007BFF"):
    box = FancyBboxPatch(
        (xy[0], xy[1]), 2, 1,
        boxstyle=boxstyle,
        linewidth=2,
        edgecolor=color,
        facecolor="#e6f0fa"
    )
    ax.add_patch(box)
    ax.text(xy[0]+1, xy[1]+0.5, text, ha="center", va="center", fontsize=12, color="#222")

def draw_arrow(ax, start, end):
    ax.annotate(
        "",
        xy=(end[0], end[1]),
        xytext=(start[0], start[1]),
        arrowprops=dict(arrowstyle="->", lw=2, color="#333")
    )

fig, ax = plt.subplots(figsize=(10, 4))
ax.set_xlim(0, 12)
ax.set_ylim(0, 3)
ax.axis("off")

# Draw boxes for each step
steps = [
    ("Data Collection", (0.5, 1)),
    ("Data Preprocessing", (3.5, 1)),
    ("Neural Network\n(Model)", (6.5, 1)),
    ("Training\n(Backpropagation)", (9.5, 1)),
]
for text, pos in steps:
    draw_box(ax, pos, text)

# Draw arrows between steps
arrow_positions = [
    ((2.5, 1.5), (3.5, 1.5)),
    ((5.5, 1.5), (6.5, 1.5)),
    ((8.5, 1.5), (9.5, 1.5)),
]
for start, end in arrow_positions:
    draw_arrow(ax, start, end)

# Add input/output labels
ax.text(0.5, 2.2, "Input Data", fontsize=11, ha="left", color="#555")
ax.text(11.5, 1.5, "Trained Model\n(Predictions)", fontsize=11, ha="right", color="#555")

plt.tight_layout()
plt.savefig("deep_learning_process.png", dpi=150)
plt.close()
