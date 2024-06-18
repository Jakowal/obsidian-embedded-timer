import { App, Editor, MarkdownPostProcessorContext, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, setIcon } from 'obsidian';

export class TimerCompletedModal extends Modal {
    timerPath: string;

	constructor(app: App, context: string) {
		super(app);
        this.timerPath = context;
		this.setTitle('Timer Completed');
	}

	onOpen() {
        const {contentEl} = this;
        contentEl.setText(`The timer in ${this.timerPath.replace(".md", "")} has completed its countdown!`);
	}

	onClose() {
        const {contentEl} = this;
        contentEl.empty();
	}
}