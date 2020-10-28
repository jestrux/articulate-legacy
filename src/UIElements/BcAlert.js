class BcAlert {
    static props = {
        type: {
            defaultValue: 'info',
            type: 'choice',
            choices: ['info', 'warning', 'error']
        },
        title: {
            defaultValue: null,
            type: 'text'
        },
        text: {
            defaultValue: 'Alert text goes here',
            type: 'text'
        }
    }

    constructor(values) {
        this.props = BcAlert.props;
        this.values = values;
        this.render = () => BcAlert.doRender(this.values);
    }

    static doRender(options) {
        let caption = '';
        if (options.caption && options.caption.length)
            caption = `<small>${options.caption}</small>`;

        let icon = `<svg width="24px" height="24px" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;

        if (options.type !== 'info')
            icon = `<svg v-else width="24px" height="24px" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;

        let title = '';
        if (options.title)
            title = `<strong>${options.title}</strong>`;

        return `
            <div class="alert-box ${options.type}">
                ${icon}
                <div>
                    ${title}
                    ${options.text}
                </div>
            </div>
        `;
    }

    static label = 'Alert';
    static icon = '<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';

    static preview = function () {
        return BcAlert.doRender({
            type: 'info',
            title: 'Pssst',
            text: 'Due to many requests from loyalties, we\'re moving our services out of town.'
        });
    }
}

export default BcAlert;