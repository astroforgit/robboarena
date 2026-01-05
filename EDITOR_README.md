# 🎮 Robbo Level Editor

A comprehensive level editor for creating and editing Robbo game maps of any size!

## ⚠️ Important: Run via HTTP Server

For best results, run the editor via a local HTTP server instead of opening the file directly:

```bash
# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# Node.js (if you have http-server installed)
npx http-server -p 8080

# PHP
php -S localhost:8080
```

Then open: `http://localhost:8080/editor.html`

This ensures all features work correctly, especially loading existing levels.

## 🚀 Features

### ✨ Core Features
- **Visual Map Editor** - Click to place tiles on a grid
- **Any Map Size** - Create maps from 8×8 to 100×100 cells
- **Full Tile Palette** - All 25 game objects available
- **Multiple Tools**:
  - ✏️ Draw - Place tiles one by one
  - 🧹 Erase - Remove tiles
  - 🪣 Fill - Flood fill areas
  - 🎯 Pick - Pick tile from map

### 📦 Import/Export
- **Export** - Generate level data for `js/levels.js`
- **Import** - Load level data from text
- **Load Level** - Edit any existing level (0-59)
- **Test** - Play your level instantly

### 🎨 Customization
- **Color Schemes** - 4 built-in color palettes
- **Resizable Canvas** - Adjust map dimensions on the fly
- **Grid View** - Clear visual grid for precise editing

## 🎯 How to Use

### Creating a New Map

1. **Open the Editor**
   ```
   Open: editor.html
   ```

2. **Set Map Size**
   - Default: 16×31 (standard level)
   - Arena: 48×31 (3× wider)
   - Custom: Any size from 8×8 to 100×100

3. **Select a Tile**
   - Click any tile in the palette on the left
   - Selected tile is highlighted in green

4. **Draw on the Map**
   - Click on the canvas to place tiles
   - Hold and drag to draw continuously
   - Use tools for faster editing

5. **Export Your Level**
   - Click "💾 Export"
   - Copy the generated level data
   - Paste into `js/levels.js`

### Editing Existing Levels

1. Click "📂 Load Level"
2. Enter level number (0-59)
3. Click "Load"
4. Edit as needed
5. Export when done

### Testing Your Map

1. Click "▶️ Test"
2. A new window opens with your level
3. Play to test gameplay
4. Close window to return to editor
5. Make adjustments as needed

## 🎨 Available Tiles

| Tile | Character | Description |
|------|-----------|-------------|
| · | `.` | Empty space |
| R | `R` | Robbo (player) |
| Q | `Q` | Wall (solid) |
| # | `#` | Stone (pushable) |
| ~ | `~` | Pushable stone |
| H | `H` | Ground (destructible) |
| D | `D` | Door (needs key) |
| % | `%` | Key |
| T | `T` | Screw (collectible) |
| ' | `'` | Ammo |
| ! | `!` | Spaceship (goal) |
| ? | `?` | Question mark |
| b | `b` | Bomb |
| & | `&` | Teleport |
| } | `}` | Gun turret |
| ^ | `^` | Bird (enemy) |
| V | `V` | Butterfly (enemy) |
| @ | `@` | Bear (enemy) |
| = | `=` | Lava |
| M | `M` | Magnet |

## 🛠️ Tools Guide

### Draw Tool (✏️)
- Click to place selected tile
- Hold and drag to draw continuously
- Default tool

### Erase Tool (🧹)
- Click to remove tiles (replace with empty)
- Hold and drag to erase multiple tiles

### Fill Tool (🪣)
- Click to flood fill connected area
- Fills all connected tiles of the same type
- Great for creating large areas quickly

### Pick Tool (🎯)
- Click any tile to select it
- Useful for copying existing tiles
- Automatically switches to that tile

## 📋 Workflow Example

### Creating a Standard Level (16×31)

1. Open editor
2. Keep default size (16×31)
3. Select Wall tile (Q)
4. Draw border around the map
5. Select Robbo (R) and place starting position
6. Add obstacles, enemies, collectibles
7. Place Spaceship (!) as goal
8. Test the level
9. Export and add to game

### Creating an Arena Map (48×31)

1. Open editor
2. Change width to 48, height to 31
3. Click "Resize Map"
4. Design large multiplayer arena
5. Add multiple spawn points
6. Create interesting terrain
7. Test and export

## 💾 Exporting to Game

After exporting, you'll get level data like this:

```
[level]
NEW_LEVEL
[colour]
21670E,989898,A27240,1C2783,101010
[size]
16.31
[author]
Your Name
[level_notes]
Created with Robbo Level Editor
[data]
QQQQQQQQQQQQQQQQ
Q..............Q
Q.R..........!.Q
Q..............Q
QQQQQQQQQQQQQQQQ
[additional]
0
[end]
```

**To add to game:**
1. Open `js/levels.js`
2. Find the end of the file
3. Paste your level data before the closing backtick
4. Update the level number
5. Save and test!

## 🎮 Tips & Tricks

- **Start with borders** - Draw walls around the edge first
- **Test frequently** - Use the Test button often
- **Use Fill tool** - Great for creating large empty areas
- **Pick tool is handy** - Quickly copy tiles from your map
- **Save your work** - Export regularly to save progress
- **Arena maps** - Use 48×31 or larger for multiplayer

## 🐛 Troubleshooting

**Editor doesn't load?**
- Make sure all JS files are present in `js/` folder
- Required files: `shim.js`, `base.js`, `common.js`, `ascii.js`, `parseMaps.js`, `levels.js`
- Check browser console for errors
- Try opening via HTTP server (not file://) - some browsers restrict file:// access

**"R is not defined" error?**
- This is fixed! Make sure you have the latest version of `editor.html`
- The editor now properly loads `js/shim.js` and `js/base.js` first

**Test doesn't work?**
- Ensure `test_editor.html` is in the same directory
- Check that localStorage is enabled in your browser
- Try opening via HTTP server

**Export doesn't copy?**
- Manually select and copy the text
- Some browsers block clipboard access
- The text is still available in the textarea

**Load Level doesn't work?**
- Make sure you're running via HTTP server (not file://)
- Check that `js/levels.js` is loaded correctly
- Level numbers are 0-59 (Level 0 is the arena map)

## 📁 Files

- `editor.html` - Main editor interface
- `test_editor.html` - Test level player
- `js/levels.js` - Level data storage
- `js/ascii.js` - Tile definitions
- `js/parseMaps.js` - Level parser

## 🎯 Next Steps

1. Create your first level
2. Test it thoroughly
3. Share with others
4. Create arena maps for multiplayer
5. Build a full campaign!

Happy level editing! 🎮✨

