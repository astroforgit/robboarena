# 🚀 Quick Start Guide - Robbo Level Editor

## Step 1: Start the Server

Open a terminal in the robbo directory and run:

```bash
python3 -m http.server 8080
```

## Step 2: Open the Editor

Open your browser and go to:

```
http://localhost:8080/editor.html
```

## Step 3: Create Your First Level

### A. Draw the Border

1. Click the **Wall (Q)** tile in the palette (gray square)
2. Click around the edges of the canvas to create a border
3. Or use the **Fill tool** to quickly fill areas

### B. Place Robbo

1. Click the **Robbo (R)** tile in the palette (yellow)
2. Click somewhere inside the border to place the player start position

### C. Add Collectibles

1. Click the **Screw (T)** tile in the palette (cyan)
2. Click several places on the map to add screws
3. These are what the player needs to collect!

### D. Place the Goal

1. Click the **Spaceship (!)** tile in the palette (green)
2. Click where you want the level exit to be

### E. Add Some Obstacles (Optional)

1. Try adding:
   - **Stones (#)** - Pushable blocks
   - **Ground (H)** - Destructible terrain
   - **Enemies (^, V, @)** - Moving obstacles
   - **Bombs (b)** - Explosives

## Step 4: Test Your Level

1. Click the **▶️ Test** button at the top
2. A new window opens with your level
3. Play it!
   - Arrow keys to move
   - X to shoot
   - ESC to pause
4. Close the window when done

## Step 5: Make Adjustments

1. Back in the editor, make changes:
   - Move things around
   - Add more obstacles
   - Adjust difficulty
2. Test again until it's perfect!

## Step 6: Export Your Level

1. Click the **💾 Export** button
2. A window appears with level data
3. Click **📋 Copy to Clipboard**
4. Paste it into `js/levels.js` to add it to the game!

## 🎨 Editor Layout

```
┌─────────────────────────────────────────────────────────┐
│                    🎮 Robbo Level Editor                │
├──────────────┬──────────────────────────────────────────┤
│              │  📄 New  🗑️ Clear  💾 Export  📥 Import  │
│  🎨 Palette  │  📂 Load  ▶️ Test                        │
│              ├──────────────────────────────────────────┤
│  [·][R][Q]   │                                          │
│  [O][I][-]   │                                          │
│  [#][~][H]   │         Canvas (Click to Draw)           │
│  [D][%][T]   │                                          │
│  [x]['][!]   │                                          │
│  [?][b][&]   │                                          │
│  [}][^][V]   │                                          │
│  [@][*][=]   │                                          │
│  [M]         │                                          │
│              │                                          │
│  🛠️ Tools    │                                          │
│  [✏️ Draw]   │                                          │
│  [🧹 Erase]  │                                          │
│  [🪣 Fill]   │                                          │
│  [🎯 Pick]   │                                          │
│              │                                          │
│  📐 Size     │                                          │
│  Width: 16   │                                          │
│  Height: 31  │                                          │
│  [Resize]    │                                          │
└──────────────┴──────────────────────────────────────────┘
```

## 🎯 Tool Guide

### ✏️ Draw Tool (Default)
- Click to place the selected tile
- Hold and drag to draw continuously
- Great for drawing walls and borders

### 🧹 Erase Tool
- Click to remove tiles (replace with empty)
- Hold and drag to erase multiple tiles
- Quick way to clear areas

### 🪣 Fill Tool
- Click to flood fill connected areas
- Fills all connected tiles of the same type
- Perfect for creating large empty spaces or filling rooms

### 🎯 Pick Tool
- Click any tile on the map to select it
- Automatically switches to that tile in the palette
- Useful for copying existing tiles

## 💡 Pro Tips

1. **Use keyboard shortcuts** - Click tools quickly
2. **Test early, test often** - Don't wait until the end
3. **Start simple** - Make a basic level first, then add complexity
4. **Use the grid** - Align things nicely
5. **Save your work** - Export regularly to save progress
6. **Learn from existing levels** - Load levels 1-59 to see how they're made

## 🎮 Example: Simple Level

Here's a simple level you can create in 2 minutes:

```
QQQQQQQQQQQQQQQQ
Q..............Q
Q.R............Q
Q..T...T...T...Q
Q..............Q
Q...###...###..Q
Q..............Q
Q..T...T...T...Q
Q..............Q
Q..............Q
Q............!.Q
QQQQQQQQQQQQQQQQ
```

This level has:
- Border walls (Q)
- Robbo at the start (R)
- 6 screws to collect (T)
- Some pushable stones (###)
- Spaceship goal (!)

## 🏟️ Example: Arena Map

For a larger multiplayer arena (48×31):

1. Change width to **48**, height to **31**
2. Click **Resize Map**
3. Create a large open space with:
   - Border walls
   - Some obstacles in the middle
   - Multiple spawn points
   - Interesting terrain

## 📚 What's Next?

1. ✅ Create your first level
2. ✅ Test it thoroughly
3. ✅ Export and save it
4. Create more levels!
5. Share with friends
6. Build a full campaign!

## 🆘 Need Help?

- Check `EDITOR_README.md` for full documentation
- Check `EDITOR_SUMMARY.md` for troubleshooting
- Look at existing levels for inspiration
- Experiment and have fun!

Happy level editing! 🎉

