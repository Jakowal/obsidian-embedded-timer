# Embedded Timers Obsidian Plugin
This is a plugin for [Obsidian.md](https://obsidian.md/) that enables the user to insert timers into their notes. The intent is for these timers to be embeddable in templates or repeatabe steps such as cooking recipes.

## Use
To create a timer, simply annotate a code block in a markdown document with `timer` and write the desired timings on the line below, using the format defined in the settings. (By default this is HH:mm:ss).

```timer
01:20:40
```
Will create a timer of one hour, 20 minutes and 40 seconds by default.

```timer
03:50
MM:ss
```
Will create a timer of three minutes and 50 seconds, regardless of what the default time format is set to.

It is also possible to override the time format on a per-timer basis. Simply add another line below the time string with the desired format. Accepted symbols are `HH` for hour, `mm` for minute and `ss` for seconds. Beyond those symbols, you cannot use any other letters A to Z in the format. Nor is it allowed to use numbers. This is a restriction for clarity, both with how the formats are defined, and how the timers are read. Any other symbols are allowed as separators and the hours, minutes or seconds can be in any order. Each of them can also be omitted.

## Themes
The timers use default variables for most of the styling and should be compatible with most themes.

## Limitations
- As of V1.0.0, the timers do not persist between closing notes or reloading the timer by editing the markdown code block.
- Reloading the timer through opening the code block will keep the timer running in the background.
- Currently, there is no sound notification when a timer completes.

## License
The plugin is licensed under the [MIT License](https://mit-license.org/).