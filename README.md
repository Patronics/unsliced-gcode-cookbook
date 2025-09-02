# Unsliced Gcode Cookbook (aka Cookbook-Slicer)
This project presents a simple scratch-like interface, intended for experimenting with GCode generation, especially for use with CNC machines (especially simple ones like pen plotters), or with [Prusa's Master Chef Upgrade for the Mk3](https://blog.prusa3d.com/new-upgrade-for-original-prusa-i3-mk3-is-here_7955/).


## Usage

Run the localhost server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser, then click gcode entries in the sidebar to create the gcode routines you want. The parameters of many blocks can be customized by editing the contents of their contained textbox. The final gcode output is produced in real-time and updated continously with changes.