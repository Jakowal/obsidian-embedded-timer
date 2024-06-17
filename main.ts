import { TimerFinishedModal } from 'src/components/TimerFinishedModal';
import { DEFAULT_SETTINGS, TimerSettingTab, TimerSettings } from 'src/components/TimerSettingsTab';
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { SetupTimerModal } from 'src/components/SetupTimerModal';
import { TimerModel } from 'src/models/timer.model';
import { embeddedTimerElement } from 'src/components/EmbeddedTimerElement';
import { createTimerObject } from 'src/utils/timer.utils';

export default class Timer extends Plugin {
	settings: TimerSettings;
	startTimerModal: SetupTimerModal;
	timerFinishedModal: TimerFinishedModal;

	runningTimers: TimerModel[];

	async onload() {
		await this.loadSettings();
		this.runningTimers = [];
		this.startTimerModal = new SetupTimerModal(this.app);
		this.timerFinishedModal = new TimerFinishedModal(this.app);

		// This creates an icon in the left ribbon.
		if (this.settings.showRibbon) {
			this.addRibbonIcon('alarm-clock', 'Start Timer', (evt: MouseEvent) => {
				// Called when the user clicks the icon.
				this.startTimerModal.open();
			});
		}

		// TODO: This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		// const statusBarItemEl = this.addStatusBarItem();
		// statusBarItemEl.setText('Status Bar Text');

		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'start-timer',
			name: 'Start a timer',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						this.startTimerModal.open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new TimerSettingTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

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