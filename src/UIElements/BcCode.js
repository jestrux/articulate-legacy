import Prism from 'prismjs';
import 'prismjs/themes/prism-solarizedlight.css';

class BcCode {
    static skeleton = {
        language: {
            defaultValue: null,
            type: 'choice',
            choices: ['HTML', 'CSS', 'Javascript']
        },
        code: {
            defaultValue: 'Write code here',
            type: 'long-text'
        }
    }

    constructor(values) {
        this.skeleton = BcCode.skeleton;
        this.values = values;
        this.render = () => BcCode.doRender(this.values);
    }

    static doRender(options, preview) {
        const language = options.language.toLowerCase();

        const code = Prism.highlight(options.code, Prism.languages[language], language);
        const margin = preview ? 'margin: -2rem;' : 'padding: 0 2rem';

        return `
            <div style="background: #f5f5f5;">
                <div style="white-space: pre-wrap; ${margin}">
                    ${code}
                </div>
            </div>
        `;

        return `
            <pre>
                <code class="language-${language}">
                    ${options.code}
                </code>
            </pre>
        `;
    }

    static label = 'Code';
    static icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>';

    static preview = function () {
        return BcCode.doRender({
            language: 'CSS',
            code: `
            .blog-content blockquote {
                margin: 1.5em 0;
                padding: 0 1rem;
                font-size: 1.3rem;
                font-family: Alegreya;
            }
            `
        }, true);
    }
}

export default BcCode;