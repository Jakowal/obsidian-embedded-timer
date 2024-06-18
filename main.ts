import { DEFAULT_SETTINGS, TimerSettingTab, TimerSettings } from 'src/components/TimerSettingsTab';
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { TimerModel } from 'src/models/timer.model';
import { embeddedTimerElement } from 'src/components/EmbeddedTimerElement';
import { createTimerObject } from 'src/utils/timer.utils';

export default class Timer extends Plugin {
	settings: TimerSettings;

	runningTimers: TimerModel[];

	async onload() {
		await this.loadSettings();
		this.runningTimers = [];

		// TODO: This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		// const statusBarItemEl = this.addStatusBarItem();
		// statusBarItemEl.setText('Status Bar Text');

		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'insert-timer',
			name: 'Insert a timer',
			editorCallback: (editor: Editor) => {
				editor.replaceRange(
				  "```timer\n\n```",
				  editor.getCursor()
				);
			  },
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new TimerSettingTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor("timer", (source, el) => {
			const timer = createTimerObject(source.split("\n"), this);
			embeddedTimerElement(el, this, timer);
		})
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}