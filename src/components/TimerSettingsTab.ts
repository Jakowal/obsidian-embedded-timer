import Timer from 'main';
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export interface TimerSettings {
	timeFormat: string;
	showModalOnCompletion: boolean;
	muteAlert: boolean;
	showRibbon: boolean;
	showInStatusBar: boolean;
}

export const DEFAULT_SETTINGS: TimerSettings = {
	timeFormat: 'HH:mm:ss',
	showModalOnCompletion: false,
	muteAlert: false,
	showRibbon: true,
	showInStatusBar: true,
}

export class TimerSettingTab extends PluginSettingTab {
	plugin: Timer;

	constructor(app: App, plugin: Timer) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Default Time Format')
			.setDesc('What type of format you would like to use to define your times. Cannot contain letters or numbers other than those used for the formatting.')
			.addText(text => text
				.setPlaceholder('ex. HH:mm:ss')
				.setValue(this.plugin.settings.timeFormat)
				.onChange(async (value) => {
					this.plugin.settings.timeFormat = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Modal Popup')
			.setDesc('When enabled, a modal will pop up to inform you whenever a timer is finished.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.showModalOnCompletion)
				.onChange(async (value) => {
					this.plugin.settings.showModalOnCompletion = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Mute')
			.setDesc('Mutes the notification sound for a finished timer.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.muteAlert)
				.onChange(async (value) => {
					this.plugin.settings.muteAlert = value;
					await this.plugin.saveSettings();
				}));
		
		new Setting(containerEl)
		.setName('Ribbon')
		.setDesc('Shows a button to add a timer as a ribbon in the left bar')
		.addToggle(toggle => toggle
			.setValue(this.plugin.settings.showRibbon)
			.onChange(async (value) => {
				this.plugin.settings.showRibbon = value;
				await this.plugin.saveSettings();
			}));

		// TODO
		// new Setting(containerEl)
		// 	.setName('Status bar')
		// 	.setDesc('If active timers should be visible in the status bar. (Limited to a single timer at a time)')
		// 	.addToggle(toggle => toggle
		// 		.setValue(this.plugin.settings.showInStatusBar)
		// 		.onChange(async (value) => {
		// 			this.plugin.settings.showInStatusBar = value;
		// 			await this.plugin.saveSettings();
		// 		}));
	}
}
