import Timer from 'main';
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export interface TimerSettings {
	timeFormat: string;
	muteAlert: boolean;
	showInStatusBar: boolean;
}

export const DEFAULT_SETTINGS: TimerSettings = {
	timeFormat: 'HH:mm:ss',
	muteAlert: false,
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
			.setName('Mute')
			.setDesc('Mutes the notification sound for a finished timer.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.muteAlert)
				.onChange(async (value) => {
					this.plugin.settings.muteAlert = value;
					await this.plugin.saveSettings();
				}));
	}
}
