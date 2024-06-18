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

		this.registerMarkdownCodeBlockProcessor("timer", (source, el, context) => {
			const timer = createTimerObject(source.split("\n"), this);
			embeddedTimerElement(el, this, timer, context.sourcePath);
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